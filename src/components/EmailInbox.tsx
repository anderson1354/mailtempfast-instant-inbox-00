
import { useEffect, useState } from "react";
import { createAccount, login, getMessages } from "@/lib/mailtm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Mail, RefreshCw, Copy, Clock, AlertCircle, CheckCircle2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface EmailInboxProps {
  currentEmail: string;
}

interface Message {
  id: string;
  from?: { address: string };
  subject: string;
  createdAt: string;
}

export default function EmailInbox({ currentEmail }: EmailInboxProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [countdown, setCountdown] = useState(3600);
  const [isCreatingAccount, setIsCreatingAccount] = useState(false);
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  async function initializeAccount() {
    if (isCreatingAccount) return;
    
    try {
      setIsCreatingAccount(true);
      setError(null);
      setLoading(true);
      
      console.log("Iniciando criação de conta...");
      
      const account = await createAccount();
      setEmail(account.username);
      setPassword(account.password);
      
      console.log("Tentando fazer login...");
      const authToken = await login(account.username, account.password);
      setToken(authToken);
      
      toast({
        title: "✅ Conta criada com sucesso!",
        description: "Sua caixa de entrada está pronta para receber e-mails.",
      });
      
      setError(null);
    } catch (error) {
      console.error("Erro ao criar conta:", error);
      const errorMessage = error instanceof Error ? error.message : "Erro desconhecido";
      setError(errorMessage);
      
      toast({
        title: "❌ Erro ao criar conta",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsCreatingAccount(false);
      setLoading(false);
    }
  }

  async function fetchMessages(authToken: string) {
    try {
      console.log("Buscando mensagens com token...");
      const messageList = await getMessages(authToken);
      setMessages(messageList || []);
      setError(null);
    } catch (error) {
      console.error("Erro ao buscar mensagens:", error);
      const errorMessage = error instanceof Error ? error.message : "Erro ao buscar mensagens";
      setError(errorMessage);
    }
  }

  useEffect(() => {
    if (currentEmail) {
      initializeAccount();
    }
  }, [currentEmail]);

  useEffect(() => {
    if (token) {
      fetchMessages(token);
      const interval = setInterval(() => fetchMessages(token), 30000);
      return () => clearInterval(interval);
    }
  }, [token]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  function formatTime(seconds: number) {
    const m = String(Math.floor(seconds / 60)).padStart(2, "0");
    const s = String(seconds % 60).padStart(2, "0");
    return `${m}:${s}`;
  }

  function handleNewEmail() {
    setMessages([]);
    setToken("");
    setError(null);
    setCountdown(3600);
    setCopied(false);
    initializeAccount();
  }

  async function handleCopy() {
    if (!email) return;
    
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      
      toast({
        title: "📋 E-mail copiado!",
        description: "O endereço foi copiado para sua área de transferência.",
      });
    } catch (err) {
      toast({
        title: "❌ Erro ao copiar",
        description: "Não foi possível copiar o e-mail.",
        variant: "destructive",
      });
    }
  }

  return (
    <Card className="shadow-lg border-blue-100">
      <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-t-lg">
        <CardTitle className="flex items-center space-x-2">
          <Mail className="h-5 w-5" />
          <span>Caixa de Entrada - dcpa.net</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6 space-y-4">
        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              {error}
            </AlertDescription>
          </Alert>
        )}

        {email && !error && (
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-xl p-6 shadow-inner">
            <div className="text-center space-y-4">
              <div>
                <p className="text-sm font-medium text-blue-700 mb-2">📧 Seu E-mail Temporário Ativo</p>
                <div className="bg-white border-2 border-blue-300 rounded-lg p-4 shadow-sm">
                  <p className="text-xl font-mono font-bold text-blue-800 break-all tracking-wide">
                    {email}
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <Badge variant="default" className="px-4 py-2 bg-green-500 hover:bg-green-600">
                  <Clock className="h-4 w-4 mr-2" />
                  Expira em {formatTime(countdown)}
                </Badge>
              </div>
            </div>
          </div>
        )}

        <div className="flex flex-wrap gap-3">
          <Button 
            onClick={handleCopy}
            className={`flex-1 min-w-[140px] transition-all duration-200 ${
              copied 
                ? 'bg-green-600 hover:bg-green-700' 
                : 'bg-blue-600 hover:bg-blue-700'
            }`}
            disabled={!email || isCreatingAccount}
          >
            {copied ? (
              <>
                <CheckCircle2 className="h-4 w-4 mr-2" />
                Copiado!
              </>
            ) : (
              <>
                <Copy className="h-4 w-4 mr-2" />
                Copiar E-mail
              </>
            )}
          </Button>
          <Button 
            onClick={handleNewEmail}
            variant="outline"
            className="flex-1 min-w-[140px] border-blue-600 text-blue-600 hover:bg-blue-50"
            disabled={isCreatingAccount}
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${isCreatingAccount ? 'animate-spin' : ''}`} />
            {isCreatingAccount ? 'Criando...' : 'Novo E-mail'}
          </Button>
        </div>

        <div className="border-t pt-4">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">Mensagens Recebidas</h3>
          {loading && !error && <p className="text-sm text-gray-500">Carregando mensagens...</p>}
          {!loading && !error && messages.length === 0 && (
            <div className="text-center py-8">
              <Mail className="h-12 w-12 text-gray-300 mx-auto mb-3" />
              <p className="text-sm text-gray-500 italic">Nenhuma mensagem recebida ainda.</p>
              <p className="text-xs text-gray-400 mt-1">As mensagens aparecerão aqui automaticamente.</p>
            </div>
          )}
          <div className="space-y-3">
            {messages.map((msg) => (
              <div key={msg.id} className="p-4 bg-gray-50 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-800">
                      <strong>De:</strong> {msg.from?.address || "Desconhecido"}
                    </p>
                    <p className="text-sm text-gray-700 mt-1">
                      <strong>Assunto:</strong> {msg.subject || "Sem assunto"}
                    </p>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {new Date(msg.createdAt).toLocaleTimeString()}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
