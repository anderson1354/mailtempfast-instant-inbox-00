import { useEffect, useState, useCallback, useRef } from 'react';
import { mailTmService, type MailTmMessage } from '@/services/mailtm';

interface HybridMessage {
  id: string;
  from: { address: string; name?: string };
  subject: string;
  intro: string;
  text: string;
  createdAt: string;
  seen: boolean;
  source: 'mailtm';
}

export function useHybridInbox(currentEmail: string, emailPassword: string) {
  const [messages, setMessages] = useState<HybridMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<'connected' | 'disconnected' | 'reconnecting'>('disconnected');
  
  // Sistema ultra-otimizado para tempo real instantâneo
  const lastFetchTime = useRef<number>(0);
  const retryCount = useRef<number>(0);
  const lastMessageCount = useRef<number>(0);
  const lastMessageIds = useRef<Set<string>>(new Set());
  const maxRetries = 5;
  const isActiveFetch = useRef<boolean>(false);

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

  const fetchMessages = useCallback(async (forceRefresh: boolean = false) => {
    if (!isAuthenticated || isActiveFetch.current) return;

    const now = Date.now();
    // Cache ultra-agressivo - apenas 500ms entre chamadas (exceto refresh manual)
    if (!forceRefresh && now - lastFetchTime.current < 500) {
      return;
    }

    isActiveFetch.current = true;

    try {
      setConnectionStatus('connected');
      const allMessages: HybridMessage[] = [];

      // Priorizar Mail.tm para tempo real INSTANTÂNEO
      if (currentEmail && emailPassword) {
        console.log('⚡ Verificação INSTANTÂNEA Mail.tm...');
        try {
          const mailTmMessages = await mailTmService.getMessages();
          allMessages.push(...mailTmMessages.map(convertMailTmMessage));
          console.log(`✅ Mail.tm INSTANTÂNEO: ${mailTmMessages.length} mensagens`);
          retryCount.current = 0;
        } catch (error) {
          console.error('❌ Erro Mail.tm:', error);
          setConnectionStatus('reconnecting');
          
          if (retryCount.current < maxRetries) {
            retryCount.current++;
            console.log(`🔄 Reconexão instantânea ${retryCount.current}/${maxRetries}`);
            setTimeout(() => {
              authenticateServices();
            }, 200);
          }
        }
      }

      // Ordenar por data (mais recentes primeiro)
      allMessages.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      
      // Detecção INSTANTÂNEA de novos emails
      const currentMessageIds = new Set(allMessages.map(msg => msg.id));
      const previousMessageIds = lastMessageIds.current;
      
      // Verificar se há mensagens realmente novas
      const newMessages = allMessages.filter(msg => !previousMessageIds.has(msg.id));
      
      setMessages(allMessages);
      lastFetchTime.current = now;
      lastMessageCount.current = allMessages.length;
      lastMessageIds.current = currentMessageIds;

      // Notificação INSTANTÂNEA de novos emails
      if (newMessages.length > 0 && previousMessageIds.size > 0) {
        console.log(`🚀 ${newMessages.length} EMAIL(S) NOVO(S) CHEGOU AGORA MESMO!`);
        
        // Notificação do navegador INSTANTÂNEA
        if ('Notification' in window && Notification.permission === 'granted') {
          newMessages.forEach(msg => {
            new Notification(`📧 Novo email instantâneo!`, {
              body: `De: ${msg.from.name || msg.from.address}\nAssunto: ${msg.subject}`,
              icon: '/favicon.ico',
              tag: `new-email-${msg.id}`
            });
          });
        }
      }

    } catch (error) {
      console.error('❌ Erro geral:', error);
      setConnectionStatus('disconnected');
    } finally {
      isActiveFetch.current = false;
    }
  }, [currentEmail, emailPassword, isAuthenticated]);

  const authenticateServices = useCallback(async () => {
    setIsLoading(true);
    setConnectionStatus('reconnecting');
    
    try {
      console.log('🚀 Autenticação para TEMPO REAL INSTANTÂNEO...');
      
      // Autenticar mail.tm com retry ultra-otimizado
      if (currentEmail && emailPassword) {
        let authSuccess = false;
        for (let attempt = 1; attempt <= maxRetries; attempt++) {
          try {
            await mailTmService.login(currentEmail, emailPassword);
            console.log('✅ Mail.tm INSTANTÂNEO autenticado!');
            authSuccess = true;
            break;
          } catch (error) {
            console.error(`❌ Tentativa ${attempt}/${maxRetries}:`, error);
            if (attempt < maxRetries) {
              await new Promise(resolve => setTimeout(resolve, 100 * attempt));
            }
          }
        }
        
        if (!authSuccess) {
          throw new Error('Falha na autenticação após múltiplas tentativas');
        }
      }

      setIsAuthenticated(true);
      setConnectionStatus('connected');
      retryCount.current = 0;
      
      // Solicitar permissão para notificações INSTANTÂNEAS
      if ('Notification' in window && Notification.permission === 'default') {
        Notification.requestPermission().then(permission => {
          if (permission === 'granted') {
            console.log('🔔 Notificações INSTANTÂNEAS ativadas!');
          }
        });
      }
      
    } catch (error) {
      console.error('❌ Erro na autenticação:', error);
      setConnectionStatus('disconnected');
    } finally {
      setIsLoading(false);
    }
  }, [currentEmail, emailPassword]);

  const refreshMessages = useCallback(() => {
    console.log('🚀 Refresh INSTANTÂNEO solicitado...');
    setIsLoading(true);
    lastMessageIds.current.clear(); // Limpar cache para forçar detecção
    fetchMessages(true).finally(() => setIsLoading(false));
  }, [fetchMessages]);

  const deleteMessage = useCallback(async (messageId: string) => {
    try {
      // Extrair o ID real da mensagem (remover prefixo 'mailtm_')
      const realMessageId = messageId.replace('mailtm_', '');
      
      console.log(`🗑️ Excluindo mensagem: ${realMessageId}`);
      await mailTmService.deleteMessage(realMessageId);
      
      // Remover mensagem do estado local
      setMessages(prevMessages => prevMessages.filter(msg => msg.id !== messageId));
      
      // Atualizar cache
      lastMessageIds.current.delete(messageId);
      
      console.log('✅ Mensagem excluída com sucesso!');
      
      return true;
    } catch (error) {
      console.error('❌ Erro ao excluir mensagem:', error);
      throw error;
    }
  }, []);

  useEffect(() => {
    if (currentEmail && emailPassword) {
      authenticateServices();
    }
  }, [currentEmail, emailPassword, authenticateServices]);

  useEffect(() => {
    if (!isAuthenticated) return;

    // Buscar imediatamente
    fetchMessages();

    // Intervalo ULTRA-AGRESSIVO para tempo real instantâneo (1.5 segundos)
    const interval = setInterval(() => fetchMessages(), 1500);
    
    // Cleanup otimizado
    return () => {
      clearInterval(interval);
      isActiveFetch.current = false;
    };
  }, [isAuthenticated, fetchMessages]);

  return {
    messages,
    isLoading,
    isAuthenticated,
    connectionStatus,
    refreshMessages,
    deleteMessage,
  };
}
