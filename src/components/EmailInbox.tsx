
import React, { useState } from 'react';
import { Mail, Clock, User, RefreshCw } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useToast } from '@/hooks/use-toast';
import { useHybridInbox } from '@/hooks/useHybridInbox';
import HostingerConfigComponent from '@/components/HostingerConfig';

interface EmailInboxProps {
  currentEmail: string;
  emailPassword: string;
}

const EmailInbox: React.FC<EmailInboxProps> = ({ currentEmail, emailPassword }) => {
  const { messages, isLoading, isAuthenticated, hostingerEmail, refreshMessages } = useHybridInbox(currentEmail, emailPassword);
  const [selectedMessage, setSelectedMessage] = useState<any>(null);
  const { toast } = useToast();

  const handleMessageClick = (message: any) => {
    setSelectedMessage(message);
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

  const handleConfigSaved = () => {
    toast({
      title: "✅ Hostinger configurada!",
      description: "O sistema agora receberá emails de ambas as fontes.",
    });
    // Forçar re-autenticação para criar email na Hostinger
    window.location.reload();
  };

  if (!currentEmail) {
    return null;
  }

  const unreadCount = messages.filter(msg => !msg.seen).length;
  const mailTmCount = messages.filter(msg => msg.source === 'mailtm').length;
  const hostingerCount = messages.filter(msg => msg.source === 'hostinger').length;

  return (
    <Card className="shadow-lg border-blue-100">
      <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-t-lg">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center space-x-2">
            <Mail className="h-5 w-5" />
            <span>Caixa de Entrada Híbrida</span>
            {unreadCount > 0 && (
              <Badge variant="secondary" className="bg-white text-blue-700">
                {unreadCount} nova(s)
              </Badge>
            )}
          </CardTitle>
          <div className="flex items-center space-x-2">
            <HostingerConfigComponent onConfigSaved={handleConfigSaved} />
            <Button
              variant="outline"
              size="sm"
              onClick={refreshMessages}
              disabled={isLoading}
              className="bg-white/10 border-white/20 text-white hover:bg-white/20"
            >
              <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
              Atualizar
            </Button>
          </div>
        </div>
        {(hostingerEmail || isAuthenticated) && (
          <div className="text-sm opacity-90 mt-2">
            <div className="flex flex-wrap gap-4">
              <span>📧 Mail.tm: {currentEmail} ({mailTmCount})</span>
              {hostingerEmail && <span>🏢 Hostinger: {hostingerEmail} ({hostingerCount})</span>}
            </div>
          </div>
        )}
      </CardHeader>
      <CardContent className="p-0">
        {!isAuthenticated ? (
          <div className="text-center py-8">
            <Mail className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 mb-2">Conectando às caixas de entrada...</p>
            <p className="text-sm text-gray-500">
              Configurando recebimento híbrido de emails
            </p>
          </div>
        ) : messages.length === 0 ? (
          <div className="text-center py-8">
            <Mail className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 mb-2">Nenhum e-mail recebido ainda</p>
            <p className="text-sm text-gray-500">
              Emails chegarão automaticamente a cada 10 segundos
            </p>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12"></TableHead>
                <TableHead className="w-16">Fonte</TableHead>
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
                      <TableCell>
                        <Badge variant={message.source === 'hostinger' ? 'default' : 'secondary'} className="text-xs">
                          {message.source === 'hostinger' ? '🏢' : '📧'}
                        </Badge>
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
                          <Badge variant={selectedMessage.source === 'hostinger' ? 'default' : 'secondary'}>
                            {selectedMessage.source === 'hostinger' ? 'Hostinger' : 'Mail.tm'}
                          </Badge>
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
                              <span className="font-medium text-gray-700">Recebido em:</span>
                              <p className="text-gray-900">{formatDate(selectedMessage.createdAt)}</p>
                            </div>
                          </div>
                        </div>
                        <div className="bg-white border rounded-lg p-4">
                          <h4 className="font-medium text-gray-700 mb-2">Conteúdo:</h4>
                          <div className="prose max-w-none">
                            <p className="text-gray-900 leading-relaxed whitespace-pre-line">
                              {selectedMessage.text || 'Conteúdo não disponível'}
                            </p>
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
