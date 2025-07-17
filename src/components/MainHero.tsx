
import React from 'react';
import { Mail, Shield, Clock, Zap, Users, Globe, CheckCircle } from 'lucide-react';
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

  return (
    <div className="text-center mb-16 max-w-6xl mx-auto">
      {/* Hero principal */}
      <div className="mb-12">
        <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
          E-mail Temporário{' '}
          <span className="text-blue-600">Instantâneo</span>{' '}
          <span className="text-green-600">e Seguro</span>
        </h1>
        <p className="text-lg sm:text-xl lg:text-2xl text-gray-700 mb-8 max-w-4xl mx-auto leading-relaxed px-4">
          Proteja sua privacidade online com nossos e-mails temporários. 
          Receba mensagens reais sem expor seu endereço pessoal a spam, 
          vazamentos de dados ou golpes de phishing.
        </p>
      </div>

      {/* Estatísticas de confiança */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12 px-4">
        <div className="text-center">
          <div className="text-3xl font-bold text-blue-600 mb-2">100K+</div>
          <div className="text-gray-600">E-mails criados mensalmente</div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold text-green-600 mb-2">99.9%</div>
          <div className="text-gray-600">Tempo de atividade</div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold text-purple-600 mb-2">SSL</div>
          <div className="text-gray-600">Criptografia ativa</div>
        </div>
      </div>

      {/* Botão principal */}
      <div className="mb-12 px-4">
        <Button 
          onClick={handleCreateEmail}
          size="lg"
          className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold text-base sm:text-xl px-8 sm:px-12 py-4 sm:py-6 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 min-h-[60px]"
        >
          <Mail className="h-6 w-6 sm:h-7 sm:w-7 mr-3 flex-shrink-0" />
          <span className="whitespace-nowrap">Criar E-mail Temporário Gratuito</span>
        </Button>
      </div>

      {/* Features principais */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12 px-4">
        <div className="bg-white rounded-xl p-6 shadow-lg border border-blue-100 hover:shadow-xl transition-all duration-300 hover:transform hover:scale-105">
          <div className="flex items-center justify-center w-14 h-14 bg-blue-100 rounded-xl mx-auto mb-4">
            <Zap className="h-7 w-7 text-blue-600" />
          </div>
          <h3 className="font-bold text-gray-900 mb-3 text-lg">Instantâneo</h3>
          <p className="text-gray-600 text-sm leading-relaxed">
            E-mails criados em segundos, prontos para uso imediato sem cadastro ou espera
          </p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg border border-green-100 hover:shadow-xl transition-all duration-300 hover:transform hover:scale-105">
          <div className="flex items-center justify-center w-14 h-14 bg-green-100 rounded-xl mx-auto mb-4">
            <Shield className="h-7 w-7 text-green-600" />
          </div>
          <h3 className="font-bold text-gray-900 mb-3 text-lg">100% Seguro</h3>
          <p className="text-gray-600 text-sm leading-relaxed">
            SSL ativo, zero logs de atividade, dados completamente protegidos e privados
          </p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg border border-purple-100 hover:shadow-xl transition-all duration-300 hover:transform hover:scale-105">
          <div className="flex items-center justify-center w-14 h-14 bg-purple-100 rounded-xl mx-auto mb-4">
            <Clock className="h-7 w-7 text-purple-600" />
          </div>
          <h3 className="font-bold text-gray-900 mb-3 text-lg">Auto-Exclusão</h3>
          <p className="text-gray-600 text-sm leading-relaxed">
            E-mails deletados automaticamente após 60 minutos, garantindo sua privacidade
          </p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg border border-orange-100 hover:shadow-xl transition-all duration-300 hover:transform hover:scale-105">
          <div className="flex items-center justify-center w-14 h-14 bg-orange-100 rounded-xl mx-auto mb-4">
            <Mail className="h-7 w-7 text-orange-600" />
          </div>
          <h3 className="font-bold text-gray-900 mb-3 text-lg">E-mails Reais</h3>
          <p className="text-gray-600 text-sm leading-relaxed">
            Receba mensagens reais de qualquer remetente, não simuladas ou falsas
          </p>
        </div>
      </div>

      {/* Seção de confiança e benefícios */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 mb-12 mx-4">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">
          Por que Escolher o MailTempFast?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
          <div className="flex items-start space-x-3">
            <CheckCircle className="h-6 w-6 text-green-600 mt-1 flex-shrink-0" />
            <div>
              <h4 className="font-semibold text-gray-900 mb-1">Proteção contra Spam</h4>
              <p className="text-gray-600 text-sm">Mantenha sua caixa de entrada principal limpa e organizada</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <CheckCircle className="h-6 w-6 text-green-600 mt-1 flex-shrink-0" />
            <div>
              <h4 className="font-semibold text-gray-900 mb-1">Prevenção de Phishing</h4>
              <p className="text-gray-600 text-sm">Reduza o risco de golpes direcionados ao seu e-mail pessoal</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <CheckCircle className="h-6 w-6 text-green-600 mt-1 flex-shrink-0" />
            <div>
              <h4 className="font-semibold text-gray-900 mb-1">Anonimato Completo</h4>
              <p className="text-gray-600 text-sm">Navegue e cadastre-se sem revelar sua identidade real</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <CheckCircle className="h-6 w-6 text-green-600 mt-1 flex-shrink-0" />
            <div>
              <h4 className="font-semibold text-gray-900 mb-1">Sem Cadastro Necessário</h4>
              <p className="text-gray-600 text-sm">Use imediatamente sem fornecer dados pessoais</p>
            </div>
          </div>
        </div>
      </div>

      {/* Casos de uso */}
      <div className="text-center mb-12">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8">
          Quando Usar E-mails Temporários?
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
          <div className="bg-white rounded-lg p-6 shadow-md border border-gray-100">
            <Users className="h-12 w-12 text-blue-600 mx-auto mb-4" />
            <h4 className="font-semibold text-gray-900 mb-2">Cadastros em Fóruns</h4>
            <p className="text-gray-600 text-sm">Para participar de discussões sem expor seu e-mail principal</p>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-md border border-gray-100">
            <Globe className="h-12 w-12 text-green-600 mx-auto mb-4" />
            <h4 className="font-semibold text-gray-900 mb-2">Testes de Serviços</h4>
            <p className="text-gray-600 text-sm">Experimente novos apps e sites sem comprometer sua privacidade</p>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-md border border-gray-100">
            <Mail className="h-12 w-12 text-purple-600 mx-auto mb-4" />
            <h4 className="font-semibold text-gray-900 mb-2">Downloads Seguros</h4>
            <p className="text-gray-600 text-sm">Baixe arquivos e conteúdos que exigem e-mail para acesso</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainHero;
