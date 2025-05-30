
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Clock, MessageCircle, Users } from "lucide-react";

export default function Contato() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              Entre em Contato
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-600 to-blue-600 mx-auto"></div>
            <p className="text-xl text-gray-600 mt-6">
              Estamos aqui para ajudar você
            </p>
          </div>

          {/* Main Contact Card */}
          <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm mb-8">
            <CardHeader className="text-center bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-t-lg">
              <CardTitle className="text-2xl">
                Fale Conosco
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <div className="text-center mb-8">
                <Mail className="h-16 w-16 text-purple-600 mx-auto mb-4" />
                <p className="text-lg text-gray-700 mb-4">
                  Para dúvidas, sugestões ou parcerias, entre em contato pelo e-mail:
                </p>
                <div className="bg-purple-50 rounded-lg p-4 inline-block">
                  <a 
                    href="mailto:contato@mailtempfast.com" 
                    className="text-2xl font-bold text-purple-600 hover:text-purple-800 transition-colors"
                  >
                    contato@mailtempfast.com
                  </a>
                </div>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
                <Clock className="h-8 w-8 text-green-600 mx-auto mb-2" />
                <p className="text-green-800 font-semibold">
                  Prometemos responder em até 48 horas úteis.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Contact Options */}
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardContent className="p-6 text-center">
                <MessageCircle className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <h3 className="font-bold text-lg text-gray-800 mb-2">Suporte Técnico</h3>
                <p className="text-gray-600 text-sm">
                  Problemas com o serviço ou funcionalidades
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardContent className="p-6 text-center">
                <Users className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <h3 className="font-bold text-lg text-gray-800 mb-2">Parcerias</h3>
                <p className="text-gray-600 text-sm">
                  Oportunidades de colaboração e negócios
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardContent className="p-6 text-center">
                <Mail className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                <h3 className="font-bold text-lg text-gray-800 mb-2">Sugestões</h3>
                <p className="text-gray-600 text-sm">
                  Ideias para melhorar nosso serviço
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
