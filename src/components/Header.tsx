
import React from "react";
import { Link } from "react-router-dom";

export default function Header() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="bg-white shadow-sm border-b border-blue-100">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <Link to="/" onClick={scrollToTop} className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
            <div className="p-2 bg-white border-2 border-white rounded-lg shadow-sm">
              <img 
                src="/lovable-uploads/edc7ce4e-c1dc-4bb6-8bb1-90ee1520903f.png" 
                alt="MailTempFast Logo" 
                className="h-16 w-16 object-contain"
              />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                MailTempFast
              </h1>
              <p className="text-sm text-gray-600">E-mails temporários reais</p>
            </div>
          </Link>
          
          <nav className="hidden md:flex space-x-6">
            <Link 
              to="/blog" 
              onClick={scrollToTop}
              className="text-blue-600 hover:text-blue-800 font-bold text-lg transition-colors hover:underline px-4 py-2 bg-blue-50 hover:bg-blue-100 rounded-lg shadow-sm"
            >
              Blog
            </Link>
            <Link 
              to="/sobre" 
              onClick={scrollToTop}
              className="text-blue-600 hover:text-blue-800 font-medium transition-colors hover:underline"
            >
              Sobre
            </Link>
            <Link 
              to="/contato" 
              onClick={scrollToTop}
              className="text-blue-600 hover:text-blue-800 font-medium transition-colors hover:underline"
            >
              Contato
            </Link>
          </nav>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <Link 
              to="/blog" 
              onClick={scrollToTop}
              className="text-blue-600 hover:text-blue-800 font-bold text-base transition-colors hover:underline px-3 py-1 bg-blue-50 hover:bg-blue-100 rounded-lg"
            >
              Blog
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
