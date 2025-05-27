import { useEffect, useState } from "react";
import { createAccount, login, getMessages } from "@/lib/mailtm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Mail, RefreshCw, Copy, Clock, AlertCircle, CheckCircle2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

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
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [messageBody, setMessageBody] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [countdown, setCountdown] = useState(3600);
  const [copied, setCopied] = useState(false);
  const [isCreatingAccount, setIsCreatingAccount] = useState(false);
  const { toast } = useToast();

  async function initializeAccount() {
    if (isCreatingAccount) return;
    try {
      setIsCreatingAccount(true);
      setError(null);
      setLoading(true);
      const account = await createAccount();
      setEmail(account.username);
      setPassword(account.password);
      const authToken = await login(account.username, account.password);
      setToken(authToken);
      toast({ title: "✅ Conta criada com sucesso!", description: "Caixa de entrada pronta." });
    } catch (error) {
      const msg = error instanceof Error ? error.message : "Erro desconhecido";
      setError(msg);
      toast({ title: "❌ Erro ao criar conta", description: msg, variant: "destructive" });
    } finally {
      setIsCreatingAccount(false);
      setLoading(false);
    }
  }

  async function fetchMessages(authToken: string) {
    try {
      const list = await getMessages(authToken);
      setMessages(list || []);
      setError(null);
    } catch {
      setError("Erro ao buscar mensagens");
    }
  }

  async function fetchMessageBody(id: string) {
    try {
      const res = await fetch(`https://api.mail.tm/messages/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setMessageBody(data.text || data.html || "Sem conteúdo disponível.");
    } catch {
      setMessageBody("Erro ao carregar mensagem.");
    }
  }

  function handleSelectMessage(msg: Message) {
    setSelectedMessage(msg);
    fetchMessageBody(msg.id);
  }

  useEffect(() => {
    if (currentEmail) initializeAccount();
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

  async function handleCopy() {
    if (!email) return;
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      toast({ title: "📋 E-mail copiado!", description: "Copiado com sucesso!" });
    } catch {
      toast({ title: "Erro", description: "Não foi possível copiar.", variant: "destructive" });
    }
  }

  function handleNewEmail() {
    setMessages([]);
    setToken("");
    setCountdown(3600);
    setCopied(false);
    setError(null);
    initializeAccount();
  }

  function formatTime(seconds: number) {
    const m = String(Math.floor(seconds / 60)).padStart(2, "0");
    const s = String(seconds % 60).padStart(2, "0");
    return `${m}:${s}`;
  }

  return (
    <>
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
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {email && !error && (
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-xl p-6 shadow-inner">
              <div className="text-center space-y-4">
                <p className="text-sm font-medium text-blue-700 mb-2">📧 Seu E-mail Temporário</p>
                <div className="bg-white border-2 border-blue-300 rounded-lg p-4 shadow-sm">
                  <p className="text-xl font-mono font-bold text-blue-800 break-all">{email}</p>
                </div>
                <Badge variant="default" className="px-4 py-2 bg-green-500 hover:bg-green-600">
                  <Clock className="h-4 w-4 mr-2" />
                  Expira em {formatTime(countdown)}
                </Badge>
              </div>
            </div>
          )}

          <div className="flex flex-wrap gap-3">
            <Button onClick={handleCopy} disabled={!email || isCreatingAccount}
              className={`flex-1 min-w-[140px] ${copied ? 'bg-green-600 hover:bg-green-700' : 'bg-blue-600 hover:bg-blue-700'}`}>
              {copied ? (<><CheckCircle2 className="h-4 w-4 mr-2" /> Copiado!</>) : (<><Copy className="h-4 w-4 mr-2" /> Copiar E-mail</>)}
            </Button>
            <Button onClick={handleNewEmail} variant="outline"
              className="flex-1 min-w-[140px] border-blue-600 text-blue-600 hover:bg-blue-50"
              disabled={isCreatingAccount}>
              <RefreshCw className={`h-4 w-4 mr-2 ${isCreatingAccount ? 'animate-spin' : ''}`} />
              {isCreatingAccount ? 'Criando...' : 'Novo E-mail'}
            </Button>
          </div>

          <div className="border-t pt-4">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">Mensagens Recebidas</h3>
            {loading && <p className="text-sm text-gray-500">Carregando mensagens...</p>}
            {!loading && messages.length === 0 && (
              <div className="text-center py-8 text-sm text-gray-500 italic">Nenhuma mensagem recebida ainda.</div>
            )}
            <div className="space-y-3">
              {messages.map((msg) => (
                <div key={msg.id}
                  className="p-4 bg-gray-50 border border-gray-200 rounded-lg shadow-sm hover:shadow-md cursor-pointer transition"
                  onClick={() => handleSelectMessage(msg)}>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-800"><strong>De:</strong> {msg.from?.address || "Desconhecido"}</p>
                      <p className="text-sm text-gray-700 mt-1"><strong>Assunto:</strong> {msg.subject || "Sem assunto"}</p>
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

      {/* Modal da mensagem */}
      <Dialog open={!!selectedMessage} onOpenChange={() => setSelectedMessage(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{selectedMessage?.subject || "Sem assunto"}</DialogTitle>
            <DialogDescription>
              De: {selectedMessage?.from?.address} <br />
              Recebido em: {selectedMessage && new Date(selectedMessage.createdAt).toLocaleString()}
            </DialogDescription>
          </DialogHeader>
          <div className="mt-4 text-sm whitespace-pre-wrap">
            {messageBody || "Carregando..."}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
