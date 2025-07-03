
import React, { useState } from 'react';
import { Mail, Clock, User, RefreshCw, Wifi, WifiOff, Zap, Trash2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useToast } from '@/hooks/use-toast';
import { useHybridInbox } from '@/hooks/useHybridInbox';

interface EmailInboxProps {
  currentEmail: string;
  emailPassword: string;
}

const EmailInbox: React.FC<EmailInboxProps> = ({ currentEmail, emailPassword }) => {
  const { messages, isLoading, isAuthenticated, connectionStatus, refreshMessages, deleteMessage } = useHybridInbox(currentEmail, emailPassword);
  const [selectedMessage, setSelectedMessage] = useState<any>(null);
  const [deletingMessageId, setDeletingMessageId] = useState<string | null>(null);
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

  const handleRefreshClick = () => {
    console.log('🚀 Refresh INSTANTÂNEO acionado pelo usuário');
    toast({
      title: "⚡ Verificação instantânea!",
      description: "Buscando emails em tempo real agora mesmo",
    });
    refreshMessages();
  };

  const handleDeleteMessage = async (messageId: string, event: React.MouseEvent) => {
    event.stopPropagation(); // Evitar abrir o modal da mensagem
    
    setDeletingMessageId(messageId);
    
    try {
      await deleteMessage(messageId);
      toast({
        title: "✅ Mensagem excluída!",
        description: "A mensagem foi removida da sua caixa de entrada.",
      });
    } catch (error) {
      toast({
        title: "❌ Erro ao excluir",
        description: "Não foi possível excluir a mensagem. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setDeletingMessageId(null);
    }
  };

  const getConnectionIcon = () => {
    switch (connectionStatus) {
      case 'connected':
        return <Wifi className="h-4 w-4 text-green-500" />;
      case 'reconnecting':
        return <RefreshCw className="h-4 w-4 text-yellow-500 animate-spin" />;
      case 'disconnected':
        return <WifiOff className="h-4 w-4 text-red-500" />;
    }
  };

  const getConnectionText = () => {
    switch (connectionStatus) {
      case 'connected':
        return 'Tempo Real INSTANTÂNEO';
      case 'reconnecting':
        return 'Reconectando...';
      case 'disconnected':
        return 'Desconectado';
    }
  };

  if (!currentEmail) {
    return null;
  }

  const unreadCount = messages.filter(msg => !msg.seen).length;
  const mailTmCount = messages.length;

  return (
    <Card className="shadow-lg border-blue-100">
      <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-t-lg">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center space-x-2">
            <Mail className="h-5 w-5" />
            <span>Caixa de Entrada Ultra-Rápida</span>
            {unreadCount > 0 && (
              <Badge variant="secondary" className="bg-white text-blue-700">
                {unreadCount} nova(s)
              </Badge>
            )}
          </CardTitle>
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-1 bg-white/10 px-2 py-1 rounded text-xs">
              {connectionStatus === 'connected' && <Wifi className="h-4 w-4 text-green-500" />}
              {connectionStatus === 'reconnecting' && <RefreshCw className="h-4 w-4 text-yellow-500 animate-spin" />}
              {connectionStatus === 'disconnected' && <WifiOff className="h-4 w-4 text-red-500" />}
              <Zap className="h-3 w-3 text-yellow-300" />
              <span>
                {connectionStatus === 'connected' && 'Tempo Real INSTANTÂNEO'}
                {connectionStatus === 'reconnecting' && 'Reconectando...'}
                {connectionStatus === 'disconnected' && 'Desconectado'}
              </span>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={handleRefreshClick}
              disabled={isLoading}
              className="bg-white/10 border-white/20 text-white hover:bg-white/20"
            >
              <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
              Verificar Agora
            </Button>
          </div>
        </div>
        {isAuthenticated && (
          <div className="text-sm opacity-90 mt-2">
            <div className="flex flex-wrap gap-4">
              <span>📧 Mail.tm: {currentEmail} ({mailTmCount})</span>
              <span className="text-xs bg-white/10 px-2 py-1 rounded flex items-center gap-1">
                <Zap className="h-3 w-3" />
                Verificação a cada 1.5 segundos - INSTANTÂNEO
              </span>
            </div>
          </div>
        )}
      </CardHeader>
      <CardContent className="p-0">
        {!isAuthenticated ? (
          <div className="text-center py-8">
            <Mail className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 mb-2">Conectando ao sistema INSTANTÂNEO...</p>
            <p className="text-sm text-gray-500">
              Configurando recebimento em tempo real
            </p>
          </div>
        ) : messages.length === 0 ? (
          <div className="text-center py-8">
            <Mail className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 mb-2">Nenhum e-mail recebido ainda</p>
            <p className="text-sm text-gray-500">
              Emails chegarão INSTANTANEAMENTE a cada 1.5 segundos
            </p>
            {connectionStatus === 'connected' && (
              <div className="mt-4 text-green-600 text-sm font-medium flex items-center justify-center gap-2">
                <Zap className="h-4 w-4" />
                Sistema INSTANTÂNEO ativo - Monitoramento em tempo real
              </div>
            )}
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12"></TableHead>
                <TableHead>Remetente</TableHead>
                <TableHead>Assunto</TableHead>
                <TableHead className="w-24">Horário</TableHead>
                <TableHead className="w-20 text-center">Excluir</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {messages.map((message) => (
                <TableRow key={message.id} className="hover:bg-blue-50 transition-colors">
                  <TableCell>
                    <div className={`w-3 h-3 rounded-full ${message.seen ? 'bg-gray-300' : 'bg-blue-600'}`} />
                  </TableCell>
                  <TableCell 
                    className="font-medium cursor-pointer"
                    onClick={() => handleMessageClick(message)}
                  >
                    <div className="flex items-center space-x-2">
                      <User className="h-4 w-4 text-gray-500" />
                      <span className={message.seen ? 'text-gray-600' : 'text-gray-900 font-semibold'}>
                        {message.from.name || message.from.address}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell 
                    className={`cursor-pointer ${message.seen ? 'text-gray-600' : 'text-gray-900 font-semibold'}`}
                    onClick={() => handleMessageClick(message)}
                  >
                    {message.subject || '(sem assunto)'}
                  </TableCell>
                  <TableCell 
                    className="text-sm text-gray-500 cursor-pointer"
                    onClick={() => handleMessageClick(message)}
                  >
                    <div className="flex items-center space-x-1">
                      <Clock className="h-3 w-3" />
                      <span>{formatTime(message.createdAt)}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-center">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => handleDeleteMessage(message.id, e)}
                      disabled={deletingMessageId === message.id}
                      className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
                      title="Excluir mensagem"
                    >
                      {deletingMessageId === message.id ? (
                        <RefreshCw className="h-4 w-4 animate-spin" />
                      ) : (
                        <Trash2 className="h-4 w-4" />
                      )}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}

        {/* Modal para exibir detalhes da mensagem */}
        {selectedMessage && (
          <Dialog open={!!selectedMessage} onOpenChange={() => setSelectedMessage(null)}>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle className="flex items-center space-x-2">
                  <Mail className="h-5 w-5 text-blue-600" />
                  <span>{selectedMessage.subject || '(sem assunto)'}</span>
                  <Badge variant="secondary">Mail.tm</Badge>
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
          </Dialog>
        )}
      </CardContent>
    </Card>
  );
};

export default EmailInbox;
