
import React, { useState, useEffect, useCallback } from 'react';
import { Mail, Clock, User, RefreshCw } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { mailTmService, type MailTmMessage, type MailTmMessageDetail } from '@/services/mailtm';
import { useToast } from '@/hooks/use-toast';

interface EmailInboxProps {
  currentEmail: string;
  emailPassword: string;
}

const EmailInbox: React.FC<EmailInboxProps> = ({ currentEmail, emailPassword }) => {
  const [messages, setMessages] = useState<MailTmMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState<MailTmMessageDetail | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { toast } = useToast();

  const authenticateAndFetchMessages = useCallback(async () => {
    if (!currentEmail || !emailPassword) return;

    setIsLoading(true);
    try {
      // Fazer login na conta
      await mailTmService.login(currentEmail, emailPassword);
      setIsAuthenticated(true);
      
      // Buscar mensagens
      const fetchedMessages = await mailTmService.getMessages();
      setMessages(fetchedMessages);
      
      console.log('Mensagens carregadas:', fetchedMessages);
    } catch (error) {
      console.error('Erro ao autenticar ou buscar mensagens:', error);
      toast({
        title: "❌ Erro de autenticação",
        description: "Não foi possível conectar à caixa de entrada.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }, [currentEmail, emailPassword, toast]);

  const handleMessageClick = async (message: MailTmMessage) => {
    try {
      setIsLoading(true);
      const messageDetail = await mailTmService.getMessageDetail(message.id);
      setSelectedMessage(messageDetail);
      
      // Marcar como lida se não estiver
      if (!message.seen) {
        await mailTmService.markAsRead(message.id);
        // Atualizar o estado local
        setMessages(prev => 
          prev.map(msg => 
            msg.id === message.id ? { ...msg, seen: true } : msg
          )
        );
      }
    } catch (error) {
      console.error('Erro ao carregar detalhes da mensagem:', error);
      toast({
        title: "❌ Erro",
        description: "Não foi possível carregar os detalhes da mensagem.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleString('pt-BR');
  };

  // Efeito para autenticar quando o e-mail muda
  useEffect(() => {
    if (currentEmail && emailPassword) {
      authenticateAndFetchMessages();
    }
  }, [currentEmail, emailPassword, authenticateAndFetchMessages]);

  // Efeito para atualizar mensagens a cada 30 segundos
  useEffect(() => {
    if (!isAuthenticated) return;

    const interval = setInterval(async () => {
      try {
        const fetchedMessages = await mailTmService.getMessages();
        setMessages(fetchedMessages);
      } catch (error) {
        console.error('Erro na atualização automática:', error);
      }
    }, 30000); // 30 segundos

    return () => clearInterval(interval);
  }, [isAuthenticated]);

  if (!currentEmail) {
    return null;
  }

  const unreadCount = messages.filter(msg => !msg.seen).length;

  return (
    <Card className="shadow-lg border-blue-100">
      <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-t-lg">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center space-x-2">
            <Mail className="h-5 w-5" />
            <span>Caixa de Entrada</span>
            {unreadCount > 0 && (
              <Badge variant="secondary" className="bg-white text-blue-700">
                {unreadCount} nova(s)
              </Badge>
            )}
          </CardTitle>
          <Button
            variant="outline"
            size="sm"
            onClick={authenticateAndFetchMessages}
            disabled={isLoading}
            className="bg-white/10 border-white/20 text-white hover:bg-white/20"
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
            Atualizar
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        {!isAuthenticated ? (
          <div className="text-center py-8">
            <Mail className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 mb-2">Conectando à caixa de entrada...</p>
            <p className="text-sm text-gray-500">
              E-mails para <strong>{currentEmail}</strong> aparecerão aqui
            </p>
          </div>
        ) : messages.length === 0 ? (
          <div className="text-center py-8">
            <Mail className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 mb-2">Nenhum e-mail recebido ainda</p>
            <p className="text-sm text-gray-500">
              E-mails enviados para <strong>{currentEmail}</strong> aparecerão aqui
            </p>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12"></TableHead>
                <TableHead>Remetente</TableHead>
                <TableHead>Assunto</TableHead>
                <TableHead className="w-24">Horário</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {messages.map((message) => (
                <Dialog key={message.id}>
                  <DialogTrigger asChild>
                    <TableRow 
                      className="cursor-pointer hover:bg-blue-50 transition-colors"
                      onClick={() => handleMessageClick(message)}
                    >
                      <TableCell>
                        <div className={`w-3 h-3 rounded-full ${message.seen ? 'bg-gray-300' : 'bg-blue-600'}`} />
                      </TableCell>
                      <TableCell className="font-medium">
                        <div className="flex items-center space-x-2">
                          <User className="h-4 w-4 text-gray-500" />
                          <span className={message.seen ? 'text-gray-600' : 'text-gray-900 font-semibold'}>
                            {message.from.name || message.from.address}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className={message.seen ? 'text-gray-600' : 'text-gray-900 font-semibold'}>
                        {message.subject || '(sem assunto)'}
                      </TableCell>
                      <TableCell className="text-sm text-gray-500">
                        <div className="flex items-center space-x-1">
                          <Clock className="h-3 w-3" />
                          <span>{formatTime(message.createdAt)}</span>
                        </div>
                      </TableCell>
                    </TableRow>
                  </DialogTrigger>
                  {selectedMessage && selectedMessage.id === message.id && (
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle className="flex items-center space-x-2">
                          <Mail className="h-5 w-5 text-blue-600" />
                          <span>{selectedMessage.subject || '(sem assunto)'}</span>
                        </DialogTitle>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div className="bg-gray-50 rounded-lg p-4">
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <span className="font-medium text-gray-700">De:</span>
                              <p className="text-gray-900">
                                {selectedMessage.from.name ? 
                                  `${selectedMessage.from.name} <${selectedMessage.from.address}>` : 
                                  selectedMessage.from.address
                                }
                              </p>
                            </div>
                            <div>
                              <span className="font-medium text-gray-700">Para:</span>
                              <p className="text-gray-900">{currentEmail}</p>
                            </div>
                            <div className="col-span-2">
                              <span className="font-medium text-gray-700">Assunto:</span>
                              <p className="text-gray-900">{selectedMessage.subject || '(sem assunto)'}</p>
                            </div>
                            <div className="col-span-2">
                              <span className="font-medium text-gray-700">Recebido em:</span>
                              <p className="text-gray-900">{formatDate(selectedMessage.createdAt)}</p>
                            </div>
                          </div>
                        </div>
                        <div className="bg-white border rounded-lg p-4">
                          <h4 className="font-medium text-gray-700 mb-2">Conteúdo:</h4>
                          <div className="prose max-w-none">
                            {selectedMessage.html && selectedMessage.html.length > 0 ? (
                              <div 
                                className="text-gray-900 leading-relaxed"
                                dangerouslySetInnerHTML={{ __html: selectedMessage.html[0] }}
                              />
                            ) : (
                              <p className="text-gray-900 leading-relaxed whitespace-pre-line">
                                {selectedMessage.text || selectedMessage.intro || 'Conteúdo não disponível'}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    </DialogContent>
                  )}
                </Dialog>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );
};

export default EmailInbox;
