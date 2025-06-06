
import React from 'react';
import { Mail, Shield, Clock, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { mailTmService } from '@/services/mailtm';

interface MainHeroProps {
  onEmailGenerated?: (email: string, password: string) => void;
}

const MainHero = ({ onEmailGenerated }: MainHeroProps) => {
  const { toast } = useToast();

  const generateRandomPassword = () => {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  };

  const handleCreateEmail = async () => {
    try {
      const domains = await mailTmService.getDomains();
      const selectedDomain = domains.includes('dcpa.net') ? 'dcpa.net' : domains[0];
      
      const randomString = Math.random().toString(36).substring(2, 12);
      const newEmail = `${randomString}@${selectedDomain}`;
      const password = generateRandomPassword();
      
      await mailTmService.createAccount(newEmail, password);
      
      if (onEmailGenerated) {
        onEmailGenerated(newEmail, password);
      }
      
      // Scroll para o gerador de e-mail
      const generator = document.querySelector('[data-email-generator]');
      if (generator) {
        generator.scrollIntoView({ behavior: 'smooth' });
      }
      
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
    }
  };

  const scrollToGenerator = () => {
    const generator = document.querySelector('[data-email-generator]');
    if (generator) {
      generator.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="text-center mb-12 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight">
          E-mail Temporário{' '}
          <span className="text-blue-600">Instantâneo</span>
        </h1>
        <p className="text-lg sm:text-xl text-gray-700 mb-8 max-w-3xl mx-auto leading-relaxed px-4">
          Crie endereços de e-mail temporários reais em segundos. 
          Proteja sua privacidade e evite spam com nossa solução gratuita e segura.
        </p>
      </div>

      {/* Botão principal com responsividade melhorada */}
      <div className="mb-8 px-4">
        <Button 
          onClick={handleCreateEmail}
          size="lg"
          className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold text-base sm:text-lg px-6 sm:px-8 py-3 sm:py-4 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 min-h-[48px] sm:min-h-[56px]"
        >
          <Mail className="h-5 w-5 sm:h-6 sm:w-6 mr-2 flex-shrink-0" />
          <span className="whitespace-nowrap">Criar E-mail Temporário Gratuito</span>
        </Button>
      </div>

      {/* Features grid com melhor responsividade */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mt-8 px-4">
        <div className="bg-white rounded-lg p-4 sm:p-6 shadow-md border border-blue-100 hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-lg mx-auto mb-3">
            <Zap className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600" />
          </div>
          <h3 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">Instantâneo</h3>
          <p className="text-xs sm:text-sm text-gray-600">
            E-mails criados em segundos, prontos para uso imediato
          </p>
        </div>

        <div className="bg-white rounded-lg p-4 sm:p-6 shadow-md border border-green-100 hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 bg-green-100 rounded-lg mx-auto mb-3">
            <Shield className="h-5 w-5 sm:h-6 sm:w-6 text-green-600" />
          </div>
          <h3 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">100% Seguro</h3>
          <p className="text-xs sm:text-sm text-gray-600">
            SSL ativo, zero logs, dados completamente protegidos
          </p>
        </div>

        <div className="bg-white rounded-lg p-4 sm:p-6 shadow-md border border-purple-100 hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 bg-purple-100 rounded-lg mx-auto mb-3">
            <Clock className="h-5 w-5 sm:h-6 sm:w-6 text-purple-600" />
          </div>
          <h3 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">Auto-Exclusão</h3>
          <p className="text-xs sm:text-sm text-gray-600">
            E-mails deletados automaticamente após 60 minutos
          </p>
        </div>

        <div className="bg-white rounded-lg p-4 sm:p-6 shadow-md border border-orange-100 hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 bg-orange-100 rounded-lg mx-auto mb-3">
            <Mail className="h-5 w-5 sm:h-6 sm:w-6 text-orange-600" />
          </div>
          <h3 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">E-mails Reais</h3>
          <p className="text-xs sm:text-sm text-gray-600">
            Receba mensagens reais, não simuladas ou falsas
          </p>
        </div>
      </div>
    </div>
  );
};

export default MainHero;
