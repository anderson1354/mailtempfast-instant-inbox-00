
import React from 'react';
import { Mail } from 'lucide-react';
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

      <footer className="bg-gray-900 text-white py-8 mt-16">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Mail className="h-5 w-5 text-blue-400" />
            <span className="font-semibold">MailTempFast</span>
          </div>
          <p className="text-gray-400 text-sm mb-4">
            Proteção de privacidade através de e-mails temporários reais.
          </p>
          
          <div className="flex flex-wrap justify-center gap-6 mb-4">
            <a 
              href="/sobre" 
              onClick={scrollToTop}
              className="text-blue-300 hover:text-blue-200 transition-colors text-sm font-medium hover:underline"
            >
              Sobre
            </a>
            <a 
              href="/privacidade" 
              onClick={scrollToTop}
              className="text-blue-300 hover:text-blue-200 transition-colors text-sm font-medium hover:underline"
            >
              Privacidade
            </a>
            <a 
              href="/contato" 
              onClick={scrollToTop}
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

export default MainLayout;
