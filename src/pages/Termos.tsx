
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, AlertTriangle, Shield, Users } from "lucide-react";
import Header from "@/components/Header";

export default function Termos() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      <Header />
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              Termos de Uso
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-600 to-blue-600 mx-auto"></div>
            <p className="text-xl text-gray-600 mt-6">
              Condições para uso do MailTempFast
            </p>
          </div>

          {/* Main Terms Statement */}
          <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm mb-8">
            <CardHeader className="text-center bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-t-lg">
              <CardTitle className="text-2xl">
                Aceite dos Termos
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <p className="text-lg text-gray-700 leading-relaxed text-center">
                Ao utilizar este serviço, o usuário concorda que os e-mails são temporários e públicos. 
                O MailTempFast não se responsabiliza por perda de dados, e-mails expirados ou uso indevido. 
                É proibido utilizar o serviço para atividades ilegais.
              </p>
            </CardContent>
          </Card>

          {/* Terms Details */}
          <div className="grid gap-6">
            {/* Service Nature */}
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-xl text-gray-800">
                  <FileText className="h-6 w-6 text-purple-600" />
                  Natureza do Serviço
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed mb-4">
                  O MailTempFast oferece e-mails temporários gratuitos com domínio @dcpa.net. 
                  Os e-mails são públicos e temporários, expirando automaticamente.
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>E-mails são temporários e públicos</li>
                  <li>Não há garantia de privacidade nas mensagens</li>
                  <li>Serviço gratuito e sem cadastro necessário</li>
                </ul>
              </CardContent>
            </Card>

            {/* Limitations */}
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-xl text-gray-800">
                  <AlertTriangle className="h-6 w-6 text-orange-600" />
                  Limitações e Responsabilidades
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed mb-4">
                  O MailTempFast não se responsabiliza por:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>Perda de dados ou e-mails expirados</li>
                  <li>Indisponibilidade temporária do serviço</li>
                  <li>Uso indevido por terceiros</li>
                  <li>Conteúdo das mensagens recebidas</li>
                </ul>
              </CardContent>
            </Card>

            {/* Prohibited Uses */}
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-xl text-gray-800">
                  <Shield className="h-6 w-6 text-red-600" />
                  Usos Proibidos
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed mb-4">
                  É estritamente proibido utilizar o serviço para:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>Atividades ilegais ou fraudulentas</li>
                  <li>Spam ou envio de mensagens em massa</li>
                  <li>Violação de direitos de terceiros</li>
                  <li>Tentativas de comprometer a segurança do sistema</li>
                </ul>
              </CardContent>
            </Card>

            {/* User Responsibilities */}
            <Card className="shadow-lg border-0 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-xl">
                  <Users className="h-6 w-6" />
                  Responsabilidades do Usuário
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="leading-relaxed opacity-90">
                  O usuário é totalmente responsável pelo uso que faz do serviço e deve estar ciente 
                  de que os e-mails são temporários e podem ser acessados por qualquer pessoa que 
                  conheça o endereço gerado.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Footer Note */}
          <div className="mt-12 text-center">
            <p className="text-gray-600 text-sm">
              Estes termos podem ser atualizados sem aviso prévio. Última atualização: {new Date().toLocaleDateString('pt-BR')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
