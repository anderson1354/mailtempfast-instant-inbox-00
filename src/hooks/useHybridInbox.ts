
import { useEffect, useState, useCallback } from 'react';
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

    try {
      const allMessages: HybridMessage[] = [];

      // Buscar do mail.tm
      if (currentEmail && emailPassword) {
        try {
          const mailTmMessages = await mailTmService.getMessages();
          allMessages.push(...mailTmMessages.map(convertMailTmMessage));
        } catch (error) {
          console.error('Erro ao buscar do mail.tm:', error);
        }
      }

      // Buscar da Hostinger
      if (hostingerEmail && hostingerService.getConfig()) {
        try {
          const hostingerMessages = await hostingerService.getEmails(hostingerEmail);
          allMessages.push(...hostingerMessages.map(convertHostingerMessage));
        } catch (error) {
          console.error('Erro ao buscar da Hostinger:', error);
        }
      }

      // Ordenar por data (mais recentes primeiro)
      allMessages.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      
      setMessages(allMessages);
    } catch (error) {
      console.error('Erro geral ao buscar mensagens:', error);
    }
  }, [currentEmail, emailPassword, hostingerEmail, isAuthenticated]);

  const authenticateServices = useCallback(async () => {
    setIsLoading(true);
    try {
      // Autenticar mail.tm
      if (currentEmail && emailPassword) {
        await mailTmService.login(currentEmail, emailPassword);
      }

      // Criar email na Hostinger se configurada
      if (hostingerService.getConfig() && !hostingerEmail) {
        try {
          const randomUsername = Math.random().toString(36).substring(2, 12);
          const newHostingerEmail = await hostingerService.createEmailAddress(randomUsername);
          setHostingerEmail(newHostingerEmail);
        } catch (error) {
          console.error('Erro ao criar email na Hostinger:', error);
        }
      }

      setIsAuthenticated(true);
    } catch (error) {
      console.error('Erro na autenticação:', error);
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

    // Atualizar a cada 10 segundos (mais frequente que os 30 segundos originais)
    const interval = setInterval(fetchMessages, 10000);
    return () => clearInterval(interval);
  }, [isAuthenticated, fetchMessages]);

  return {
    messages,
    isLoading,
    isAuthenticated,
    hostingerEmail,
    refreshMessages: fetchMessages,
  };
}
