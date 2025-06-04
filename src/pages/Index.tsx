
import React, { useState, useEffect } from "react";
import { Copy, RefreshCw, Mail, Clock, Shield, Zap, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import AdBanner from "@/components/AdBanner";
import EmailInbox from "@/components/EmailInbox";
import PrivacyNotice from "@/components/PrivacyNotice";

const Index = () => {
  const [currentEmail, setCurrentEmail] = useState("");
  const [timeLeft, setTimeLeft] = useState(3600);
  const [isActive, setIsActive] = useState(false);
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const generateEmail = () => {
    const random = Math.random().toString(36).substring(2, 12);
    const newEmail = `${random}@dcpa.net`;
    setCurrentEmail(newEmail);
    setTimeLeft(3600);
    setIsActive(true);
    setCopied(false);
    scrollToTop();

    toast({
      title: "✅ E-mail gerado com sucesso!",
      description: "Seu e-mail temporário está pronto para uso.",
    });
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(currentEmail);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      scrollToTop();

      toast({
        title: "📋 E-mail copiado!",
        description: "Endereço copiado para a área de transferência.",
      });
    } catch {
      toast({
        title: "❌ Erro ao copiar",
        description: "Não foi possível copiar o e-mail.",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    if (!isActive || timeLeft <= 0) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setIsActive(false);
          setCurrentEmail("");
          toast({
            title: "⏰ E-mail expirado",
            description: "Gere um novo e-mail temporário para continuar.",
            variant: "destructive",
          });
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isActive, timeLeft, toast]);

  useEffect(() => {
    generateEmail();
  }, []);

  const formatTime = (seconds: number) => {
    const m = String(Math.floor(seconds / 60)).padStart(2, "0");
    const s = String(seconds % 60).padStart(2, "0");
    return `${m}:${s}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100">
      <AdBanner type="horizontal" position="top" />

      <header className="bg-white shadow-sm border-b border-blue-100">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg">
                <Mail className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                  MailTempFast
                </h1>
                <p className="text-sm text-gray-600">E-mails temporários com @dcpa.net</p>
              </div>
            </div>
            <nav className="hidden md:flex items-center space-x-6">
              <a 
                href="/blog" 
                onClick={scrollToTop}
                className="text-blue-600 hover:text-blue-800 font-semibold text-lg transition-colors hover:underline"
              >
                Blog
              </a>
              <a 
                href="/sobre" 
                onClick={scrollToTop}
                className="text-gray-700 hover:text-blue-600 transition-colors"
              >
                Sobre
              </a>
              <a 
                href="/contato" 
                onClick={scrollToTop}
                className="text-gray-700 hover:text-blue-600 transition-colors"
              >
                Contato
              </a>
            </nav>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Proteja sua <span className="text-blue-600">Privacidade</span> Online
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Gere e-mails temporários instantaneamente com domínio @dcpa.net. Perfeito para cadastros, testes e proteção contra spam.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <Badge variant="secondary" className="px-4 py-2 text-sm">
              <Zap className="h-4 w-4 mr-2" />
              Instantâneo
            </Badge>
            <Badge variant="secondary" className="px-4 py-2 text-sm">
              <Shield className="h-4 w-4 mr-2" />
              100% Privado
            </Badge>
            <Badge variant="secondary" className="px-4 py-2 text-sm">
              <Clock className="h-4 w-4 mr-2" />
              Auto-Expira
            </Badge>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card className="shadow-lg border-blue-100">
              <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-t-lg">
                <CardTitle className="flex items-center space-x-2">
                  <Mail className="h-5 w-5" />
                  <span>Seu E-mail Temporário</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-6">
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-300 rounded-xl p-6">
                    <div className="text-center space-y-4">
                      <div>
                        <p className="text-sm font-medium text-blue-700 mb-3">📧 Endereço Ativo</p>
                        <div className="bg-white border-2 border-blue-400 rounded-lg p-4">
                          <p className="text-2xl font-mono font-bold text-blue-800 break-all">{currentEmail}</p>
                        </div>
                      </div>
                      <div className="flex justify-center">
                        <Badge variant={isActive ? "default" : "destructive"} className="px-4 py-2 text-sm">
                          <Clock className="h-4 w-4 mr-2" />
                          {isActive ? `Expira em ${formatTime(timeLeft)}` : "Expirado"}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-3">
                    <Button
                      onClick={copyEmail}
                      className={`flex-1 min-w-[140px] ${copied ? "bg-green-600 hover:bg-green-700" : "bg-blue-600 hover:bg-blue-700"}`}
                      disabled={!isActive}
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
                      onClick={generateEmail} 
                      variant="outline" 
                      className="flex-1 min-w-[140px] border-blue-600 text-blue-600 hover:bg-blue-50"
                    >
                      <RefreshCw className="h-4 w-4 mr-2" />
                      Novo E-mail
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <AdBanner type="rectangle" position="sidebar" />
            <PrivacyNotice />
          </div>
        </div>

        {currentEmail && isActive && (
          <div className="mt-12">
            <EmailInbox currentEmail={currentEmail} />
          </div>
        )}

        <div className="mt-12">
          <AdBanner type="horizontal" position="bottom" />
        </div>
      </main>

      <footer className="bg-gray-900 text-white py-8 mt-16">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Mail className="h-5 w-5 text-blue-400" />
            <span className="font-semibold">MailTempFast</span>
          </div>
          <p className="text-gray-400 text-sm mb-4">
            Proteção de privacidade através de e-mails temporários com @dcpa.net.
          </p>
          <p className="text-xs text-gray-500">© 2024 MailTempFast • SSL Ativo • Sem logs • 100% Privado</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
