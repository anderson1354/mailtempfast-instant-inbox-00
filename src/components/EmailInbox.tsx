
import React, { useState, useEffect } from 'react';
import { Mail, Clock, User, RefreshCw } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

interface Email {
  id: string;
  from: string;
  subject: string;
  body: string;
  receivedAt: string;
  isRead: boolean;
}

interface EmailInboxProps {
  currentEmail: string;
}

const EmailInbox: React.FC<EmailInboxProps> = ({ currentEmail }) => {
  const [emails, setEmails] = useState<Email[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedEmail, setSelectedEmail] = useState<Email | null>(null);

  // Simular recebimento de e-mails para demonstração
  const simulateEmailReceipt = () => {
    const sampleEmails: Email[] = [
      {
        id: '1',
        from: 'noreply@exemplo.com',
        subject: 'Bem-vindo ao nosso serviço!',
        body: 'Obrigado por se cadastrar. Este é um e-mail de boas-vindas para confirmar sua conta.',
        receivedAt: new Date().toISOString(),
        isRead: false
      },
      {
        id: '2',
        from: 'suporte@loja.com',
        subject: 'Confirmação de cadastro',
        body: 'Seu cadastro foi realizado com sucesso. Clique no link para ativar sua conta.',
        receivedAt: new Date(Date.now() - 300000).toISOString(),
        isRead: false
      }
    ];
    setEmails(sampleEmails);
  };

  const checkForNewEmails = async () => {
    setIsLoading(true);
    
    // Simular verificação de novos e-mails
    setTimeout(() => {
      // Em uma implementação real, aqui seria feita a chamada para a API
      // que verifica novos e-mails no domínio @dcpa.net
      if (emails.length === 0) {
        simulateEmailReceipt();
      }
      setIsLoading(false);
    }, 1000);
  };

  const markAsRead = (emailId: string) => {
    setEmails(prevEmails =>
      prevEmails.map(email =>
        email.id === emailId ? { ...email, isRead: true } : email
      )
    );
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  useEffect(() => {
    if (currentEmail) {
      checkForNewEmails();
    }
  }, [currentEmail]);

  if (!currentEmail) {
    return null;
  }

  return (
    <Card className="shadow-lg border-blue-100">
      <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-t-lg">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center space-x-2">
            <Mail className="h-5 w-5" />
            <span>Caixa de Entrada</span>
            {emails.filter(e => !e.isRead).length > 0 && (
              <Badge variant="secondary" className="bg-white text-blue-700">
                {emails.filter(e => !e.isRead).length} nova(s)
              </Badge>
            )}
          </CardTitle>
          <Button
            variant="outline"
            size="sm"
            onClick={checkForNewEmails}
            disabled={isLoading}
            className="bg-white/10 border-white/20 text-white hover:bg-white/20"
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
            Atualizar
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        {emails.length === 0 ? (
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
              {emails.map((email) => (
                <Dialog key={email.id}>
                  <DialogTrigger asChild>
                    <TableRow 
                      className="cursor-pointer hover:bg-blue-50 transition-colors"
                      onClick={() => {
                        setSelectedEmail(email);
                        markAsRead(email.id);
                      }}
                    >
                      <TableCell>
                        <div className={`w-3 h-3 rounded-full ${email.isRead ? 'bg-gray-300' : 'bg-blue-600'}`} />
                      </TableCell>
                      <TableCell className="font-medium">
                        <div className="flex items-center space-x-2">
                          <User className="h-4 w-4 text-gray-500" />
                          <span className={email.isRead ? 'text-gray-600' : 'text-gray-900 font-semibold'}>
                            {email.from}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className={email.isRead ? 'text-gray-600' : 'text-gray-900 font-semibold'}>
                        {email.subject}
                      </TableCell>
                      <TableCell className="text-sm text-gray-500">
                        <div className="flex items-center space-x-1">
                          <Clock className="h-3 w-3" />
                          <span>{formatTime(email.receivedAt)}</span>
                        </div>
                      </TableCell>
                    </TableRow>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle className="flex items-center space-x-2">
                        <Mail className="h-5 w-5 text-blue-600" />
                        <span>{email.subject}</span>
                      </DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="bg-gray-50 rounded-lg p-4">
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="font-medium text-gray-700">De:</span>
                            <p className="text-gray-900">{email.from}</p>
                          </div>
                          <div>
                            <span className="font-medium text-gray-700">Para:</span>
                            <p className="text-gray-900">{currentEmail}</p>
                          </div>
                          <div className="col-span-2">
                            <span className="font-medium text-gray-700">Assunto:</span>
                            <p className="text-gray-900">{email.subject}</p>
                          </div>
                          <div className="col-span-2">
                            <span className="font-medium text-gray-700">Recebido em:</span>
                            <p className="text-gray-900">
                              {new Date(email.receivedAt).toLocaleString('pt-BR')}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="bg-white border rounded-lg p-4">
                        <h4 className="font-medium text-gray-700 mb-2">Conteúdo:</h4>
                        <div className="prose max-w-none">
                          <p className="text-gray-900 leading-relaxed whitespace-pre-line">
                            {email.body}
                          </p>
                        </div>
                      </div>
                    </div>
                  </DialogContent>
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
