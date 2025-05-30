
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Mail, CheckCircle } from "lucide-react";

export default function Sobre() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              Sobre o MailTempFast
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-green-600 mx-auto"></div>
          </div>

          {/* Main Content Cards */}
          <div className="grid gap-8 md:gap-12">
            {/* Mission Card */}
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-2xl text-gray-800">
                  <Shield className="h-8 w-8 text-blue-600" />
                  Nossa Missão
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg text-gray-700 leading-relaxed">
                  O MailTempFast foi criado para ajudar usuários a proteger sua privacidade online, 
                  oferecendo e-mails temporários confiáveis com domínio @dcpa.net.
                </p>
              </CardContent>
            </Card>

            {/* Service Features */}
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-2xl text-gray-800">
                  <Mail className="h-8 w-8 text-green-600" />
                  Nosso Compromisso
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  Nosso serviço é gratuito, rápido e seguro — ideal para cadastros temporários e testes. 
                  Trabalhamos continuamente para melhorar a estabilidade e usabilidade do site.
                </p>
                
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="flex items-center gap-2 p-3 bg-blue-50 rounded-lg">
                    <CheckCircle className="h-5 w-5 text-blue-600" />
                    <span className="font-medium text-blue-800">Gratuito</span>
                  </div>
                  <div className="flex items-center gap-2 p-3 bg-green-50 rounded-lg">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span className="font-medium text-green-800">Rápido</span>
                  </div>
                  <div className="flex items-center gap-2 p-3 bg-purple-50 rounded-lg">
                    <CheckCircle className="h-5 w-5 text-purple-600" />
                    <span className="font-medium text-purple-800">Seguro</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Domain Info */}
            <Card className="shadow-lg border-0 bg-gradient-to-r from-blue-600 to-green-600 text-white">
              <CardContent className="pt-6">
                <div className="text-center">
                  <h3 className="text-2xl font-bold mb-2">Domínio Confiável</h3>
                  <p className="text-lg opacity-90 mb-4">
                    Todos os nossos e-mails temporários utilizam o domínio
                  </p>
                  <div className="bg-white/20 rounded-lg px-6 py-3 inline-block">
                    <span className="text-2xl font-mono font-bold">@dcpa.net</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
