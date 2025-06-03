
import React from "react";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="bg-white shadow-sm border-b border-blue-100">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
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
              className="text-blue-600 hover:text-blue-800 font-medium transition-colors hover:underline"
            >
              Blog
            </Link>
            <Link 
              to="/sobre" 
              className="text-blue-600 hover:text-blue-800 font-medium transition-colors hover:underline"
            >
              Sobre
            </Link>
            <Link 
              to="/contato" 
              className="text-blue-600 hover:text-blue-800 font-medium transition-colors hover:underline"
            >
              Contato
            </Link>
          </nav>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <Link 
              to="/blog" 
              className="text-blue-600 hover:text-blue-800 font-medium text-sm transition-colors hover:underline"
            >
              Blog
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
