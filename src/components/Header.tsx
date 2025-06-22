
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-white shadow-lg border-b border-blue-100 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" onClick={scrollToTop} className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
            <div className="p-2 bg-white border-2 border-blue-100 rounded-lg shadow-sm">
              <img 
                src="/lovable-uploads/edc7ce4e-c1dc-4bb6-8bb1-90ee1520903f.png" 
                alt="MailTempFast Logo" 
                className="h-12 w-12 object-contain"
              />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                MailTempFast
              </h1>
              <p className="text-xs text-gray-600">E-mails temporários reais</p>
            </div>
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <Link 
              to="/" 
              onClick={scrollToTop}
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors hover:underline"
            >
              Início
            </Link>
            <a 
              href="https://blog.mailtempfast.com/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 font-bold text-lg transition-colors hover:underline px-4 py-2 bg-blue-50 hover:bg-blue-100 rounded-lg shadow-sm"
            >
              Blog
            </a>
            <Link 
              to="/sobre" 
              onClick={scrollToTop}
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors hover:underline"
            >
              Sobre
            </Link>
            <Link 
              to="/termos" 
              onClick={scrollToTop}
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors hover:underline"
            >
              Termos
            </Link>
            <Link 
              to="/privacidade" 
              onClick={scrollToTop}
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors hover:underline"
            >
              Privacidade
            </Link>
            <Link 
              to="/contato" 
              onClick={scrollToTop}
              className="text-gray-700 hover:text-blue-600 font-medium transition-colors hover:underline"
            >
              Contato
            </Link>
          </nav>
          
          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button
              onClick={toggleMenu}
              className="p-2 text-gray-700 hover:text-blue-600 transition-colors"
              aria-label="Menu"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="lg:hidden mt-4 pb-4 border-t border-gray-200 pt-4">
            <div className="flex flex-col space-y-3">
              <Link 
                to="/" 
                onClick={scrollToTop}
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors hover:underline py-2"
              >
                Início
              </Link>
              <a 
                href="https://blog.mailtempfast.com/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 font-bold transition-colors hover:underline py-2 px-3 bg-blue-50 rounded-lg"
              >
                Blog
              </a>
              <Link 
                to="/sobre" 
                onClick={scrollToTop}
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors hover:underline py-2"
              >
                Sobre
              </Link>
              <Link 
                to="/termos" 
                onClick={scrollToTop}
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors hover:underline py-2"
              >
                Termos
              </Link>
              <Link 
                to="/privacidade" 
                onClick={scrollToTop}
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors hover:underline py-2"
              >
                Privacidade
              </Link>
              <Link 
                to="/contato" 
                onClick={scrollToTop}
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors hover:underline py-2"
              >
                Contato
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
