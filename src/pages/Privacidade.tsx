import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Eye, Database, Trash2, Cookie } from "lucide-react";
import Header from "@/components/Header";

export default function Privacidade() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <Header />
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              Política de Privacidade
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-green-600 to-blue-600 mx-auto"></div>
            <p className="text-xl text-gray-600 mt-6">
              Sua privacidade é nossa prioridade
            </p>
          </div>

          {/* Privacy Features */}
          <div className="grid gap-6">
            {/* No Data Collection */}
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-xl text-gray-800">
                  <Eye className="h-6 w-6 text-green-600" />
                  Não Coletamos Dados Pessoais
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed">
                  O MailTempFast não coleta, armazena ou processa qualquer informação pessoal dos usuários. 
                  Não solicitamos cadastro, senhas ou dados de identificação.
                </p>
              </CardContent>
            </Card>

            {/* No Storage */}
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-xl text-gray-800">
                  <Database className="h-6 w-6 text-blue-600" />
                  Não Armazenamos Informações Privadas
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed">
                  Nenhuma informação privada é armazenada em nossos servidores. Os e-mails temporários 
                  são processados em tempo real e descartados automaticamente.
                </p>
              </CardContent>
            </Card>

            {/* No Sharing */}
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-xl text-gray-800">
                  <Shield className="h-6 w-6 text-purple-600" />
                  Não Compartilhamos com Terceiros
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed">
                  Não compartilhamos, vendemos ou transferimos qualquer dado para terceiros. 
                  Sua privacidade permanece totalmente protegida durante o uso do serviço.
                </p>
              </CardContent>
            </Card>

            {/* Cookies */}
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-xl text-gray-800">
                  <Cookie className="h-6 w-6 text-orange-600" />
                  Uso de Cookies
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed">
                  Utilizamos cookies apenas para fins analíticos básicos e funcionalidade do site. 
                  Nenhum cookie é usado para rastrear informações pessoais ou criar perfis de usuário.
                </p>
              </CardContent>
            </Card>

            {/* Auto Delete */}
            <Card className="shadow-lg border-0 bg-gradient-to-r from-red-500 to-pink-600 text-white">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-xl">
                  <Trash2 className="h-6 w-6" />
                  Exclusão Automática
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="leading-relaxed opacity-90">
                  Todos os e-mails temporários são automaticamente descartados após expirarem. 
                  Não há possibilidade de recuperação ou acesso posterior aos conteúdos.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Footer Note */}
          <div className="mt-12 text-center">
            <p className="text-gray-600 text-sm">
              Esta política pode ser atualizada periodicamente. Última atualização: {new Date().toLocaleDateString('pt-BR')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
