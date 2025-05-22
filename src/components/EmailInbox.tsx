
import React, { useState, useEffect } from 'react';
import { RefreshCw, Mail, Clock, User, FileText, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

interface Email {
  id: string;
  from: string;
  subject: string;
  preview: string;
  content: string;
  timestamp: Date;
  isRead: boolean;
}

interface EmailInboxProps {
  currentEmail: string;
}

const EmailInbox: React.FC<EmailInboxProps> = ({ currentEmail }) => {
  const [emails, setEmails] = useState<Email[]>([]);
  const [selectedEmail, setSelectedEmail] = useState<Email | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [lastRefresh, setLastRefresh] = useState<Date>(new Date());
  const { toast } = useToast();

  // Simulate email fetching (replace with real API call)
  const fetchEmails = async () => {
    setIsLoading(true);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Generate mock emails for demonstration
    const mockEmails: Email[] = [
      {
        id: '1',
        from: 'noreply@exemplo.com',
        subject: 'Bem-vindo ao nosso serviço!',
        preview: 'Obrigado por se cadastrar. Confirme seu e-mail clicando no link...',
        content: `
          <h2>Bem-vindo!</h2>
          <p>Obrigado por se cadastrar em nosso serviço.</p>
          <p>Para ativar sua conta, clique no link abaixo:</p>
          <a href="#" style="background: #007bff; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Confirmar E-mail</a>
          <p>Se você não solicitou este cadastro, ignore este e-mail.</p>
        `,
        timestamp: new Date(Date.now() - 5 * 60 * 1000), // 5 minutes ago
        isRead: false
      },
      {
        id: '2',
        from: 'suporte@loja.com',
        subject: 'Confirmação de pedido #12345',
        preview: 'Seu pedido foi confirmado e será processado em breve...',
        content: `
          <h2>Pedido Confirmado!</h2>
          <p>Número do pedido: <strong>#12345</strong></p>
          <p>Total: R$ 99,90</p>
          <p>Previsão de entrega: 3-5 dias úteis</p>
          <p>Obrigado pela preferência!</p>
        `,
        timestamp: new Date(Date.now() - 15 * 60 * 1000), // 15 minutes ago
        isRead: true
      }
    ];
    
    setEmails(mockEmails);
    setLastRefresh(new Date());
    setIsLoading(false);
    
    if (mockEmails.length > 0) {
      toast({
        title: "📨 E-mails atualizados",
        description: `${mockEmails.length} mensagens encontradas`,
      });
    }
  };

  // Auto-refresh emails every 30 seconds
  useEffect(() => {
    fetchEmails();
    
    const interval = setInterval(() => {
      fetchEmails();
    }, 30000);
    
    return () => clearInterval(interval);
  }, [currentEmail]);

  const markAsRead = (emailId: string) => {
    setEmails(prev => 
      prev.map(email => 
        email.id === emailId ? { ...email, isRead: true } : email
      )
    );
  };

  const deleteEmail = (emailId: string) => {
    setEmails(prev => prev.filter(email => email.id !== emailId));
    if (selectedEmail?.id === emailId) {
      setSelectedEmail(null);
    }
    toast({
      title: "🗑️ E-mail excluído",
      description: "A mensagem foi removida da caixa de entrada.",
    });
  };

  const formatTime = (date: Date) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Agora';
    if (diffInMinutes < 60) return `${diffInMinutes}m atrás`;
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours}h atrás`;
    
    return date.toLocaleDateString('pt-BR');
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Email List */}
      <Card className="shadow-lg border-blue-100">
        <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-t-lg">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center space-x-2">
              <Mail className="h-5 w-5" />
              <span>Caixa de Entrada</span>
            </CardTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={fetchEmails}
              disabled={isLoading}
              className="text-white hover:bg-white/20"
            >
              <RefreshCw className={`h-4 w-4 ${isLoading ? 'animate-spin' : ''}`} />
            </Button>
          </div>
          <div className="flex items-center justify-between text-sm text-blue-100">
            <span>{emails.length} mensagens</span>
            <span>Atualizado: {formatTime(lastRefresh)}</span>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          {emails.length === 0 ? (
            <div className="p-8 text-center">
              <Mail className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 mb-2">Nenhum e-mail recebido</p>
              <p className="text-sm text-gray-400">
                As mensagens aparecerão aqui automaticamente
              </p>
            </div>
          ) : (
            <div className="max-h-96 overflow-y-auto">
              {emails.map((email) => (
                <div
                  key={email.id}
                  className={`p-4 border-b border-gray-100 cursor-pointer transition-colors ${
                    selectedEmail?.id === email.id 
                      ? 'bg-blue-50 border-l-4 border-l-blue-500' 
                      : 'hover:bg-gray-50'
                  } ${!email.isRead ? 'bg-blue-25' : ''}`}
                  onClick={() => {
                    setSelectedEmail(email);
                    markAsRead(email.id);
                  }}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <User className="h-4 w-4 text-gray-400" />
                      <span className="text-sm font-medium text-gray-900 truncate">
                        {email.from}
                      </span>
                      {!email.isRead && (
                        <Badge variant="secondary" className="text-xs">
                          Novo
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs text-gray-500">
                        {formatTime(email.timestamp)}
                      </span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteEmail(email.id);
                        }}
                        className="h-6 w-6 p-0 text-gray-400 hover:text-red-500"
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                  <h4 className="font-medium text-gray-900 mb-1 truncate">
                    {email.subject}
                  </h4>
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {email.preview}
                  </p>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Email Content */}
      <Card className="shadow-lg border-blue-100">
        <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-t-lg">
          <CardTitle className="flex items-center space-x-2">
            <FileText className="h-5 w-5" />
            <span>Conteúdo da Mensagem</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          {selectedEmail ? (
            <div className="space-y-4">
              <div className="border-b border-gray-200 pb-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <User className="h-4 w-4 text-gray-400" />
                    <span className="font-medium text-gray-900">
                      {selectedEmail.from}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <Clock className="h-4 w-4" />
                    <span>{formatTime(selectedEmail.timestamp)}</span>
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {selectedEmail.subject}
                </h3>
              </div>
              <div 
                className="prose prose-sm max-w-none"
                dangerouslySetInnerHTML={{ __html: selectedEmail.content }}
              />
            </div>
          ) : (
            <div className="text-center py-12">
              <FileText className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 mb-2">Selecione um e-mail</p>
              <p className="text-sm text-gray-400">
                Clique em uma mensagem para visualizar seu conteúdo
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default EmailInbox;
