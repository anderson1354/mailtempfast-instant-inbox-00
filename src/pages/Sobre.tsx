import { Mail } from "lucide-react";

export default function Sobre() {
  return (
    <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center space-x-3 mb-6">
          <Mail className="h-6 w-6 text-blue-600" />
          <h1 className="text-3xl font-bold text-gray-900">Sobre o MailTempFast</h1>
        </div>
        <p className="text-gray-700 mb-4 text-lg">
          O <strong>MailTempFast</strong> é uma plataforma gratuita de e-mails temporários com domínio confiável (@dcpa.net).
          Nosso objetivo é oferecer praticidade, privacidade e agilidade para quem precisa de um e-mail rápido, sem spam e sem precisar cadastrar em provedores tradicionais.
        </p>
        <p className="text-gray-700 text-lg">
          Ideal para testes, cadastros rápidos e situações onde você deseja proteger seu e-mail pessoal. Nenhum dado é armazenado após a expiração dos e-mails.
        </p>
      </div>
    </div>
  );
}
