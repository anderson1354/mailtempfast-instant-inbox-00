
import { useEffect, useState, useCallback, useRef } from 'react';
import { mailTmService, type MailTmMessage } from '@/services/mailtm';
import { hostingerService, type HostingerEmail } from '@/services/hostinger';

interface HybridMessage {
  id: string;
  from: { address: string; name?: string };
  subject: string;
  intro: string;
  text: string;
  createdAt: string;
  seen: boolean;
  source: 'mailtm' | 'hostinger';
}

export function useHybridInbox(currentEmail: string, emailPassword: string) {
  const [messages, setMessages] = useState<HybridMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [hostingerEmail, setHostingerEmail] = useState<string>('');
  const [connectionStatus, setConnectionStatus] = useState<'connected' | 'disconnected' | 'reconnecting'>('disconnected');
  
  // Cache para evitar requisições desnecessárias
  const lastFetchTime = useRef<number>(0);
  const retryCount = useRef<number>(0);
  const maxRetries = 3;

  const convertMailTmMessage = (msg: MailTmMessage): HybridMessage => ({
    id: `mailtm_${msg.id}`,
    from: { address: msg.from.address, name: msg.from.name },
    subject: msg.subject,
    intro: msg.intro,
    text: msg.intro,
    createdAt: msg.createdAt,
    seen: msg.seen,
    source: 'mailtm',
  });

  const convertHostingerMessage = (msg: HostingerEmail): HybridMessage => ({
    id: `hostinger_${msg.id}`,
    from: { address: msg.from },
    subject: msg.subject,
    intro: msg.body.substring(0, 100) + '...',
    text: msg.body,
    createdAt: msg.timestamp,
    seen: msg.read,
    source: 'hostinger',
  });

  const fetchMessages = useCallback(async () => {
    if (!isAuthenticated) return;

    const now = Date.now();
    // Evitar requisições muito frequentes (mínimo 3 segundos entre chamadas)
    if (now - lastFetchTime.current < 3000) {
      return;
    }

    try {
      setConnectionStatus('connected');
      const allMessages: HybridMessage[] = [];

      // Priorizar Mail.tm para tempo real
      if (currentEmail && emailPassword) {
        console.log('📧 Buscando emails do Mail.tm...');
        try {
          const mailTmMessages = await mailTmService.getMessages();
          allMessages.push(...mailTmMessages.map(convertMailTmMessage));
          console.log(`✅ Mail.tm: ${mailTmMessages.length} mensagens encontradas`);
          retryCount.current = 0; // Reset retry count on success
        } catch (error) {
          console.error('❌ Erro ao buscar do mail.tm:', error);
          setConnectionStatus('reconnecting');
          
          // Tentar reconectar automaticamente
          if (retryCount.current < maxRetries) {
            retryCount.current++;
            console.log(`🔄 Tentativa de reconexão ${retryCount.current}/${maxRetries}`);
            setTimeout(() => {
              authenticateServices();
            }, 2000 * retryCount.current); // Backoff exponencial
          }
        }
      }

      // Buscar da Hostinger (menos prioritário)
      if (hostingerEmail && hostingerService.getConfig()) {
        try {
          console.log('🏢 Buscando emails da Hostinger...');
          const hostingerMessages = await hostingerService.getEmails(hostingerEmail);
          allMessages.push(...hostingerMessages.map(convertHostingerMessage));
          console.log(`✅ Hostinger: ${hostingerMessages.length} mensagens encontradas`);
        } catch (error) {
          console.error('❌ Erro ao buscar da Hostinger:', error);
        }
      }

      // Ordenar por data (mais recentes primeiro)
      allMessages.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      
      // Verificar se há novas mensagens
      const previousCount = messages.length;
      const newCount = allMessages.length;
      
      setMessages(allMessages);
      lastFetchTime.current = now;

      // Notificar sobre novos emails
      if (newCount > previousCount && previousCount > 0) {
        const newEmailsCount = newCount - previousCount;
        console.log(`🔔 ${newEmailsCount} novo(s) email(s) recebido(s)!`);
        
        // Opcional: Notificação do navegador (se permitida)
        if ('Notification' in window && Notification.permission === 'granted') {
          new Notification(`📧 ${newEmailsCount} novo(s) email(s)`, {
            body: 'Verifique sua caixa de entrada',
            icon: '/favicon.ico'
          });
        }
      }

    } catch (error) {
      console.error('❌ Erro geral ao buscar mensagens:', error);
      setConnectionStatus('disconnected');
    }
  }, [currentEmail, emailPassword, hostingerEmail, isAuthenticated, messages.length]);

  const authenticateServices = useCallback(async () => {
    setIsLoading(true);
    setConnectionStatus('reconnecting');
    
    try {
      console.log('🔐 Autenticando serviços...');
      
      // Autenticar mail.tm com retry automático
      if (currentEmail && emailPassword) {
        let authSuccess = false;
        for (let attempt = 1; attempt <= maxRetries; attempt++) {
          try {
            await mailTmService.login(currentEmail, emailPassword);
            console.log('✅ Mail.tm autenticado com sucesso');
            authSuccess = true;
            break;
          } catch (error) {
            console.error(`❌ Tentativa ${attempt}/${maxRetries} falhou:`, error);
            if (attempt < maxRetries) {
              await new Promise(resolve => setTimeout(resolve, 1000 * attempt));
            }
          }
        }
        
        if (!authSuccess) {
          throw new Error('Falha na autenticação do Mail.tm após múltiplas tentativas');
        }
      }

      // Criar email na Hostinger se configurada
      if (hostingerService.getConfig() && !hostingerEmail) {
        try {
          const randomUsername = Math.random().toString(36).substring(2, 12);
          const newHostingerEmail = await hostingerService.createEmailAddress(randomUsername);
          setHostingerEmail(newHostingerEmail);
          console.log('✅ Email Hostinger criado:', newHostingerEmail);
        } catch (error) {
          console.error('❌ Erro ao criar email na Hostinger:', error);
        }
      }

      setIsAuthenticated(true);
      setConnectionStatus('connected');
      retryCount.current = 0;
      
      // Solicitar permissão para notificações
      if ('Notification' in window && Notification.permission === 'default') {
        Notification.requestPermission();
      }
      
    } catch (error) {
      console.error('❌ Erro na autenticação:', error);
      setConnectionStatus('disconnected');
    } finally {
      setIsLoading(false);
    }
  }, [currentEmail, emailPassword, hostingerEmail]);

  useEffect(() => {
    if (currentEmail && emailPassword) {
      authenticateServices();
    }
  }, [currentEmail, emailPassword, authenticateServices]);

  useEffect(() => {
    if (!isAuthenticated) return;

    // Buscar imediatamente
    fetchMessages();

    // Intervalo mais agressivo para tempo real (5 segundos)
    const interval = setInterval(fetchMessages, 5000);
    
    // Cleanup
    return () => {
      clearInterval(interval);
    };
  }, [isAuthenticated, fetchMessages]);

  return {
    messages,
    isLoading,
    isAuthenticated,
    hostingerEmail,
    connectionStatus,
    refreshMessages: fetchMessages,
  };
}
