
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
  
  // Cache otimizado para requisições mais eficientes
  const lastFetchTime = useRef<number>(0);
  const retryCount = useRef<number>(0);
  const lastMessageCount = useRef<number>(0);
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

  const fetchMessages = useCallback(async (forceRefresh: boolean = false) => {
    if (!isAuthenticated) return;

    const now = Date.now();
    // Cache mais agressivo - apenas 1 segundo entre chamadas (exceto refresh manual)
    if (!forceRefresh && now - lastFetchTime.current < 1000) {
      return;
    }

    try {
      setConnectionStatus('connected');
      const allMessages: HybridMessage[] = [];

      // Priorizar Mail.tm para tempo real máximo
      if (currentEmail && emailPassword) {
        console.log('📧 Buscando emails do Mail.tm (tempo real otimizado)...');
        try {
          const mailTmMessages = await mailTmService.getMessages();
          allMessages.push(...mailTmMessages.map(convertMailTmMessage));
          console.log(`✅ Mail.tm: ${mailTmMessages.length} mensagens encontradas`);
          retryCount.current = 0;
        } catch (error) {
          console.error('❌ Erro ao buscar do mail.tm:', error);
          setConnectionStatus('reconnecting');
          
          if (retryCount.current < maxRetries) {
            retryCount.current++;
            console.log(`🔄 Tentativa de reconexão ${retryCount.current}/${maxRetries}`);
            setTimeout(() => {
              authenticateServices();
            }, 1000 * retryCount.current);
          }
        }
      }

      // Buscar da Hostinger com menos frequência para não sobrecarregar
      if (hostingerEmail && hostingerService.getConfig() && (forceRefresh || now % 15000 < 3000)) {
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
      
      // Detecção inteligente de novos emails
      const newCount = allMessages.length;
      const previousCount = lastMessageCount.current;
      
      setMessages(allMessages);
      lastFetchTime.current = now;
      lastMessageCount.current = newCount;

      // Notificar sobre novos emails com mais eficiência
      if (newCount > previousCount && previousCount > 0) {
        const newEmailsCount = newCount - previousCount;
        console.log(`🔔 ${newEmailsCount} novo(s) email(s) recebido(s) AGORA!`);
        
        // Notificação do navegador otimizada
        if ('Notification' in window && Notification.permission === 'granted') {
          new Notification(`📧 ${newEmailsCount} novo(s) email(s)`, {
            body: `Recebido em tempo real - ${new Date().toLocaleTimeString()}`,
            icon: '/favicon.ico',
            tag: 'new-email'
          });
        }
      }

    } catch (error) {
      console.error('❌ Erro geral ao buscar mensagens:', error);
      setConnectionStatus('disconnected');
    }
  }, [currentEmail, emailPassword, hostingerEmail, isAuthenticated]);

  const authenticateServices = useCallback(async () => {
    setIsLoading(true);
    setConnectionStatus('reconnecting');
    
    try {
      console.log('🔐 Autenticando serviços para tempo real...');
      
      // Autenticar mail.tm com retry otimizado
      if (currentEmail && emailPassword) {
        let authSuccess = false;
        for (let attempt = 1; attempt <= maxRetries; attempt++) {
          try {
            await mailTmService.login(currentEmail, emailPassword);
            console.log('✅ Mail.tm autenticado - Modo tempo real ativo');
            authSuccess = true;
            break;
          } catch (error) {
            console.error(`❌ Tentativa ${attempt}/${maxRetries} falhou:`, error);
            if (attempt < maxRetries) {
              await new Promise(resolve => setTimeout(resolve, 500 * attempt));
            }
          }
        }
        
        if (!authSuccess) {
          throw new Error('Falha na autenticação do Mail.tm após múltiplas tentativas');
        }
      }

      // Configurar Hostinger se disponível
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
      
      // Solicitar permissão para notificações em tempo real
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

  // Função pública para refresh manual
  const refreshMessages = useCallback(() => {
    console.log('🔄 Refresh manual solicitado...');
    setIsLoading(true);
    fetchMessages(true).finally(() => setIsLoading(false));
  }, [fetchMessages]);

  useEffect(() => {
    if (currentEmail && emailPassword) {
      authenticateServices();
    }
  }, [currentEmail, emailPassword, authenticateServices]);

  useEffect(() => {
    if (!isAuthenticated) return;

    // Buscar imediatamente
    fetchMessages();

    // Intervalo ultra-agressivo para tempo real (3 segundos)
    const interval = setInterval(() => fetchMessages(), 3000);
    
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
    refreshMessages,
  };
}
