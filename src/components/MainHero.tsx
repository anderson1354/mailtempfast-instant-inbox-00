
import React from 'react';
import { Mail, Shield, Clock, Zap, Users, Globe, CheckCircle, Award, Cpu, Eye, Server, Rocket, Lock, Gift, Monitor, Lightbulb } from 'lucide-react';
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
        title: "E-mail gerado com sucesso!",
        description: "Seu e-mail temporário está pronto para uso.",
      });
    } catch (error) {
      console.error('Erro ao gerar e-mail:', error);
      toast({
        title: "Erro ao gerar e-mail",
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
          Bem-vindo ao{' '}
          <span className="text-blue-600">MailTempFast</span>{' '}
          – Seu E-mail Temporário{' '}
          <span className="text-green-600">Instantâneo</span>
        </h1>
        <div className="text-lg sm:text-xl lg:text-2xl text-gray-700 mb-8 max-w-4xl mx-auto leading-relaxed px-4 space-y-4">
          <p>
            O MailTempFast é a maneira mais rápida e segura de criar um e-mail temporário para proteger sua privacidade online.
          </p>
          <p>
            Com ele, você recebe e-mails instantaneamente, sem precisar revelar seu endereço pessoal. Ideal para cadastros rápidos, testes de softwares, redes sociais e muito mais.
          </p>
        </div>
      </div>

      {/* Estatísticas de confiança */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12 px-4">
        <div className="text-center">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <Award className="h-8 w-8 text-blue-600" />
          </div>
          <div className="text-3xl font-bold text-blue-600 mb-2">100K+</div>
          <div className="text-gray-600">E-mails criados mensalmente</div>
        </div>
        <div className="text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <Server className="h-8 w-8 text-green-600" />
          </div>
          <div className="text-3xl font-bold text-green-600 mb-2">99.9%</div>
          <div className="text-gray-600">Tempo de atividade</div>
        </div>
        <div className="text-center">
          <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <Cpu className="h-8 w-8 text-purple-600" />
          </div>
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

      {/* Por que usar o MailTempFast? */}
      <div className="mb-12 px-4">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8">
          Por que usar o MailTempFast?
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl p-6 shadow-lg border border-blue-100 hover:shadow-xl transition-all duration-300 hover:transform hover:scale-105">
            <div className="flex items-center justify-center w-14 h-14 bg-blue-100 rounded-xl mx-auto mb-4">
              <Rocket className="h-7 w-7 text-blue-600" />
            </div>
            <h3 className="font-bold text-gray-900 mb-3 text-lg">Rápido</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Seu e-mail fica pronto em segundos
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg border border-green-100 hover:shadow-xl transition-all duration-300 hover:transform hover:scale-105">
            <div className="flex items-center justify-center w-14 h-14 bg-green-100 rounded-xl mx-auto mb-4">
              <Lock className="h-7 w-7 text-green-600" />
            </div>
            <h3 className="font-bold text-gray-900 mb-3 text-lg">Seguro</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Protege sua caixa de entrada contra spam e golpes
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg border border-purple-100 hover:shadow-xl transition-all duration-300 hover:transform hover:scale-105">
            <div className="flex items-center justify-center w-14 h-14 bg-purple-100 rounded-xl mx-auto mb-4">
              <Gift className="h-7 w-7 text-purple-600" />
            </div>
            <h3 className="font-bold text-gray-900 mb-3 text-lg">Gratuito</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Use sempre que precisar, sem limites
            </p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg border border-orange-100 hover:shadow-xl transition-all duration-300 hover:transform hover:scale-105">
            <div className="flex items-center justify-center w-14 h-14 bg-orange-100 rounded-xl mx-auto mb-4">
              <Monitor className="h-7 w-7 text-orange-600" />
            </div>
            <h3 className="font-bold text-gray-900 mb-3 text-lg">Fácil</h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              Funciona direto no navegador, sem cadastro
            </p>
          </div>
        </div>
      </div>

      {/* Como funciona? */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 mb-12 mx-4">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">
          Como funciona?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mt-1 flex-shrink-0">
              <CheckCircle className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-1">Gere um e-mail temporário</h4>
              <p className="text-gray-600 text-sm">Com um clique, seu e-mail está pronto para uso</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mt-1 flex-shrink-0">
              <CheckCircle className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-1">Use o endereço</h4>
              <p className="text-gray-600 text-sm">Para se cadastrar onde quiser, com segurança</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mt-1 flex-shrink-0">
              <CheckCircle className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-1">Receba mensagens</h4>
              <p className="text-gray-600 text-sm">Visualize e-mails em tempo real na nossa plataforma</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mt-1 flex-shrink-0">
              <CheckCircle className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-1">Descarte quando quiser</h4>
              <p className="text-gray-600 text-sm">O e-mail é excluído automaticamente após 60 minutos</p>
            </div>
          </div>
        </div>
      </div>

      {/* Dica sobre o Blog */}
      <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl p-8 mb-12 mx-4 border border-yellow-200">
        <div className="flex items-center justify-center mb-4">
          <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center">
            <Lightbulb className="h-8 w-8 text-yellow-600" />
          </div>
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-4">
          Dica: Quer aprender mais sobre privacidade e segurança digital?
        </h3>
        <p className="text-gray-700 mb-6 text-lg">
          Acesse nosso Blog do MailTempFast e descubra dicas e tutoriais exclusivos.
        </p>
        <Button 
          asChild
          size="lg"
          className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-semibold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
        >
          <a href="https://blog.mailtempfast.com/" target="_blank" rel="noopener noreferrer">
            Visite Nosso Blog
          </a>
        </Button>
      </div>

      {/* Casos de uso */}
      <div className="text-center mb-12">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8">
          Quando Usar E-mails Temporários?
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
          <div className="bg-white rounded-lg p-6 shadow-md border border-gray-100">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="h-8 w-8 text-blue-600" />
            </div>
            <h4 className="font-semibold text-gray-900 mb-2">Cadastros em Fóruns</h4>
            <p className="text-gray-600 text-sm">Para participar de discussões sem expor seu e-mail principal</p>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-md border border-gray-100">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Globe className="h-8 w-8 text-green-600" />
            </div>
            <h4 className="font-semibold text-gray-900 mb-2">Testes de Serviços</h4>
            <p className="text-gray-600 text-sm">Experimente novos apps e sites sem comprometer sua privacidade</p>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-md border border-gray-100">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Mail className="h-8 w-8 text-purple-600" />
            </div>
            <h4 className="font-semibold text-gray-900 mb-2">Downloads Seguros</h4>
            <p className="text-gray-600 text-sm">Baixe arquivos e conteúdos que exigem e-mail para acesso</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainHero;
