
import React from 'react';
import { Mail, Shield, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';
import AdBanner from '@/components/AdBanner';
import Header from '@/components/Header';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100">
      <AdBanner type="horizontal" position="top" />

      <Header />

      <main className="container mx-auto px-4 py-8">
        {children}

        <div className="mt-12">
          <AdBanner type="horizontal" position="bottom" />
        </div>
      </main>

      <footer className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-12 mt-16 border-t-4 border-blue-500">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {/* Logo e Nome */}
            <div className="text-center mb-8">
              <div className="flex items-center justify-center space-x-4 mb-4">
                <div className="p-3 bg-white rounded-xl shadow-lg">
                  <img 
                    src="/lovable-uploads/edc7ce4e-c1dc-4bb6-8bb1-90ee1520903f.png" 
                    alt="MailTempFast Logo" 
                    className="h-12 w-12 object-contain"
                  />
                </div>
                <div>
                  <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-blue-300 bg-clip-text text-transparent">
                    MailTempFast
                  </h3>
                  <p className="text-gray-400 text-sm">E-mails temporários reais</p>
                </div>
              </div>
              <p className="text-gray-300 text-lg max-w-md mx-auto">
                Proteção de privacidade através de e-mails temporários seguros e confiáveis.
              </p>
            </div>
            
            {/* Links de navegação organizados */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
              <div className="text-center">
                <h4 className="text-blue-400 font-semibold mb-4 text-lg">Navegação</h4>
                <div className="space-y-2">
                  <Link 
                    to="/" 
                    onClick={scrollToTop}
                    className="block text-gray-300 hover:text-blue-400 transition-colors duration-300 hover:underline"
                  >
                    Página Inicial
                  </Link>
                  <Link 
                    to="/blog" 
                    onClick={scrollToTop}
                    className="block text-gray-300 hover:text-blue-400 transition-colors duration-300 hover:underline"
                  >
                    Blog
                  </Link>
                </div>
              </div>
              
              <div className="text-center">
                <h4 className="text-blue-400 font-semibold mb-4 text-lg">Institucional</h4>
                <div className="space-y-2">
                  <Link 
                    to="/sobre" 
                    onClick={scrollToTop}
                    className="block text-gray-300 hover:text-blue-400 transition-colors duration-300 hover:underline"
                  >
                    Sobre Nós
                  </Link>
                  <Link 
                    to="/termos" 
                    onClick={scrollToTop}
                    className="block text-gray-300 hover:text-blue-400 transition-colors duration-300 hover:underline"
                  >
                    Termos de Uso
                  </Link>
                </div>
              </div>
              
              <div className="text-center">
                <h4 className="text-blue-400 font-semibold mb-4 text-lg">Privacidade</h4>
                <div className="space-y-2">
                  <Link 
                    to="/privacidade" 
                    onClick={scrollToTop}
                    className="block text-gray-300 hover:text-blue-400 transition-colors duration-300 hover:underline"
                  >
                    Política de Privacidade
                  </Link>
                </div>
              </div>
              
              <div className="text-center">
                <h4 className="text-blue-400 font-semibold mb-4 text-lg">Suporte</h4>
                <div className="space-y-2">
                  <Link 
                    to="/contato" 
                    onClick={scrollToTop}
                    className="block text-gray-300 hover:text-blue-400 transition-colors duration-300 hover:underline"
                  >
                    Entre em Contato
                  </Link>
                </div>
              </div>
            </div>

            {/* Linha divisória */}
            <div className="border-t border-gray-700 pt-6">
              <div className="flex flex-col md:flex-row justify-between items-center">
                <p className="text-sm text-gray-400 mb-4 md:mb-0">
                  © 2025 MailTempFast. Todos os direitos reservados.
                </p>
                <div className="flex items-center space-x-4 text-sm text-gray-400">
                  <span className="flex items-center">
                    <Shield className="h-4 w-4 mr-1 text-green-400" />
                    SSL Ativo
                  </span>
                  <span className="flex items-center">
                    <FileText className="h-4 w-4 mr-1 text-blue-400" />
                    Sem logs
                  </span>
                  <span className="flex items-center">
                    <Mail className="h-4 w-4 mr-1 text-orange-400" />
                    100% Privado
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MainLayout;
