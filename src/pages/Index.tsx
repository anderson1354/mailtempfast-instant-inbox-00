import React, { useState, useEffect } from 'react';
import { Copy, RefreshCw, Mail, Clock, Shield, Zap, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import AdBanner from '@/components/AdBanner';
import EmailInbox from '@/components/EmailInbox';
import PrivacyNotice from '@/components/PrivacyNotice';
import Header from '@/components/Header';
import { mailTmService } from '@/services/mailtm';

const Index = () => {
  const [currentEmail, setCurrentEmail] = useState('');
  const [emailPassword, setEmailPassword] = useState('');
  const [timeLeft, setTimeLeft] = useState(3600);
  const [isActive, setIsActive] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  const generateRandomPassword = () => {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  };

  const generateEmail = async () => {
    setIsGenerating(true);
    try {
      // Buscar domínios disponíveis
      const domains = await mailTmService.getDomains();
      const selectedDomain = domains.includes('dcpa.net') ? 'dcpa.net' : domains[0];
      
      // Gerar e-mail e senha
      const randomString = Math.random().toString(36).substring(2, 12);
      const newEmail = `${randomString}@${selectedDomain}`;
      const password = generateRandomPassword();
      
      // Criar conta na API mail.tm
      await mailTmService.createAccount(newEmail, password);
      
      setCurrentEmail(newEmail);
      setEmailPassword(password);
      setTimeLeft(3600);
      setIsActive(true);
      setCopied(false);
      
      toast({
        title: "✅ E-mail gerado com sucesso!",
        description: "Seu e-mail temporário está pronto para uso.",
      });
    } catch (error) {
      console.error('Erro ao gerar e-mail:', error);
      toast({
        title: "❌ Erro ao gerar e-mail",
        description: "Tente novamente em alguns segundos.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const copyEmail = async () => {
    if (!currentEmail) return;
    try {
      await navigator.clipboard.writeText(currentEmail);
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
  };

  useEffect(() => {
    if (!isActive || timeLeft <= 0) return;
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          setIsActive(false);
          setCurrentEmail('');
          setEmailPassword('');
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

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    generateEmail();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100">
      <AdBanner type="horizontal" position="top" />

      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Proteja sua <span className="text-blue-600">Privacidade</span> Online
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Gere e-mails temporários reais instantaneamente. Perfeito para cadastros, testes e proteção contra spam.
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
            <Card className="shadow-lg border-blue-100 hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-t-lg">
                <CardTitle className="flex items-center space-x-2">
                  <Mail className="h-5 w-5" />
                  <span>Seu E-mail Temporário Real</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                {currentEmail ? (
                  <div className="space-y-6">
                    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-300 rounded-xl p-6 shadow-inner">
                      <div className="text-center space-y-4">
                        <p className="text-sm font-medium text-blue-700 mb-3">📧 Endereço Ativo</p>
                        <div className="bg-white border-2 border-blue-400 rounded-lg p-4 shadow-md">
                          <p className="text-2xl font-mono font-bold text-blue-800 break-all tracking-wide">
                            {currentEmail}
                          </p>
                        </div>
                        <div className="flex items-center justify-center">
                          <Badge 
                            variant={isActive ? "default" : "destructive"}
                            className="px-4 py-2 text-sm"
                          >
                            <Clock className="h-4 w-4 mr-2" />
                            {isActive ? `Expira em ${formatTime(timeLeft)}` : "Expirado"}
                          </Badge>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-3">
                      <Button 
                        onClick={copyEmail}
                        className={`flex-1 min-w-[140px] transition-all duration-200 ${
                          copied 
                            ? 'bg-green-600 hover:bg-green-700' 
                            : 'bg-blue-600 hover:bg-blue-700'
                        }`}
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
                        disabled={isGenerating}
                      >
                        <RefreshCw className={`h-4 w-4 mr-2 ${isGenerating ? 'animate-spin' : ''}`} />
                        {isGenerating ? 'Gerando...' : 'Novo E-mail'}
                      </Button>
                    </div>

                    {isActive && (
                      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                        <div className="flex items-start space-x-3">
                          <div className="p-1 bg-green-100 rounded-full">
                            <div className="w-2 h-2 bg-green-600 rounded-full animate-pulse"></div>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-green-800">
                              E-mail ativo e recebendo mensagens reais
                            </p>
                            <p className="text-xs text-green-600 mt-1">
                              Conectado via mail.tm • Expira em {formatTime(timeLeft)}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Button 
                      onClick={generateEmail}
                      size="lg"
                      className="bg-blue-600 hover:bg-blue-700"
                      disabled={isGenerating}
                    >
                      <Mail className="h-5 w-5 mr-2" />
                      {isGenerating ? 'Gerando...' : 'Gerar E-mail Temporário'}
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Caixa de entrada com API real */}
            {currentEmail && isActive && (
              <div className="mt-8">
                <EmailInbox currentEmail={currentEmail} emailPassword={emailPassword} />
              </div>
            )}
          </div>

          <div className="space-y-6">
            <AdBanner type="rectangle" position="sidebar" />
            <PrivacyNotice />
          </div>
        </div>

        <div className="mt-12">
          <AdBanner type="horizontal" position="bottom" />
        </div>
      </main>

      {/* Footer com links funcionais */}
      <footer className="bg-gray-900 text-white py-8 mt-16">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Mail className="h-5 w-5 text-blue-400" />
            <span className="font-semibold">MailTempFast</span>
          </div>
          <p className="text-gray-400 text-sm mb-4">
            Proteção de privacidade através de e-mails temporários reais.
          </p>
          
          {/* Links de navegação do rodapé */}
          <div className="flex flex-wrap justify-center gap-6 mb-4">
            <a 
              href="/sobre" 
              className="text-blue-300 hover:text-blue-200 transition-colors text-sm font-medium hover:underline"
            >
              Sobre
            </a>
            <a 
              href="/privacidade" 
              className="text-blue-300 hover:text-blue-200 transition-colors text-sm font-medium hover:underline"
            >
              Privacidade
            </a>
            <a 
              href="/contato" 
              className="text-blue-300 hover:text-blue-200 transition-colors text-sm font-medium hover:underline"
            >
              Contato
            </a>
          </div>

          <p className="text-xs text-gray-500 border-t border-gray-700 pt-4">
            © 2024 MailTempFast. Todos os direitos reservados.
            <span className="block sm:inline sm:ml-2 mt-1 sm:mt-0">
              SSL Ativo • Sem logs • 100% Privado
            </span>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
