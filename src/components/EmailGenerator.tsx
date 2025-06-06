import React, { useState, useEffect } from 'react';
import { Copy, RefreshCw, Mail, Clock, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import EmailInbox from '@/components/EmailInbox';
import { mailTmService } from '@/services/mailtm';

interface EmailGeneratorProps {
  heroGeneratedEmail?: {email: string, password: string} | null;
}

const EmailGenerator = ({ heroGeneratedEmail }: EmailGeneratorProps) => {
  const [currentEmail, setCurrentEmail] = useState('');
  const [emailPassword, setEmailPassword] = useState('');
  const [timeLeft, setTimeLeft] = useState(3600);
  const [isActive, setIsActive] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const generateRandomPassword = () => {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  };

  const generateEmail = async () => {
    setIsGenerating(true);
    scrollToTop();
    try {
      const domains = await mailTmService.getDomains();
      const selectedDomain = domains.includes('dcpa.net') ? 'dcpa.net' : domains[0];
      
      const randomString = Math.random().toString(36).substring(2, 12);
      const newEmail = `${randomString}@${selectedDomain}`;
      const password = generateRandomPassword();
      
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

  // Effect para lidar com e-mail gerado pelo MainHero
  useEffect(() => {
    if (heroGeneratedEmail) {
      setCurrentEmail(heroGeneratedEmail.email);
      setEmailPassword(heroGeneratedEmail.password);
      setTimeLeft(3600);
      setIsActive(true);
      setCopied(false);
    }
  }, [heroGeneratedEmail]);

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
    if (!heroGeneratedEmail) {
      generateEmail();
    }
  }, []);

  return (
    <div className="lg:col-span-2" data-email-generator>
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
                    <p className="text-2xl font-semibold text-blue-800 break-all">
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

      {currentEmail && isActive && (
        <div className="mt-8">
          <EmailInbox currentEmail={currentEmail} emailPassword={emailPassword} />
        </div>
      )}
    </div>
  );
};

export default EmailGenerator;
