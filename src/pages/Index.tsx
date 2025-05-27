import React from "react";
import EmailInbox from "@/components/EmailInbox";
import { Mail } from "lucide-react";

export default function Index() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-blue-100">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-center space-x-3">
            <div className="p-2 bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg">
              <Mail className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                MailTempFast
              </h1>
              <p className="text-sm text-gray-600">E-mails temporários com @dcpa.net</p>
            </div>
          </div>
        </div>
      </header>

      {/* Caixa de Entrada Funcional */}
      <main className="container mx-auto px-4 py-8">
        <EmailInbox currentEmail="" />
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 mt-16">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Mail className="h-5 w-5 text-blue-400" />
            <span className="font-semibold">MailTempFast</span>
          </div>
          <p className="text-gray-400 text-sm mb-4">
            Proteção de privacidade através de e-mails temporários com @dcpa.net.
          </p>
          <p className="text-xs text-gray-500">
            © 2024 MailTempFast. Todos os direitos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
}
