
import React from "react";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="bg-white shadow-sm border-b border-blue-100">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-center space-x-3">
          <Link to="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
            <div className="p-2 bg-white border-2 border-white rounded-lg shadow-sm">
              <img 
                src="/lovable-uploads/033ba22b-37c2-4d5b-8309-330e142dec04.png" 
                alt="MailTempFast Logo" 
                className="h-8 w-8 object-contain"
              />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                MailTempFast
              </h1>
              <p className="text-sm text-gray-600">E-mails temporários reais</p>
            </div>
          </Link>
        </div>
      </div>
    </header>
  );
}
