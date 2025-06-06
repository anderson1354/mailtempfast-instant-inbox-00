
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, FileText, AlertTriangle, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";

export default function Termos() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100">
      <Header />
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              Termos de Uso
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-blue-800 mx-auto mb-6"></div>
            <p className="text-xl text-gray-600">
              Regras e condições de uso do MailTempFast
            </p>
          </div>

          {/* Content */}
          <div className="space-y-8">
            {/* Aceitação dos Termos */}
            <Card className="shadow-lg border-blue-100">
              <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-t-lg">
                <CardTitle className="flex items-center space-x-2">
                  <FileText className="h-5 w-5" />
                  <span>1. Aceitação dos Termos</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <p className="text-gray-700 leading-relaxed mb-4">
                  Ao utilizar o MailTempFast, você concorda com todos os termos e condições descritos neste documento. 
                  Se você não concorda com qualquer parte destes termos, não deve utilizar nosso serviço.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  Estes termos podem ser atualizados periodicamente, e é sua responsabilidade verificar 
                  as atualizações regularmente.
                </p>
              </CardContent>
            </Card>

            {/* Descrição do Serviço */}
            <Card className="shadow-lg border-blue-100">
              <CardHeader className="bg-gradient-to-r from-green-600 to-green-700 text-white rounded-t-lg">
                <CardTitle className="flex items-center space-x-2">
                  <Mail className="h-5 w-5" />
                  <span>2. Descrição do Serviço</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <p className="text-gray-700 leading-relaxed mb-4">
                  O MailTempFast oferece um serviço gratuito de e-mails temporários que permite aos usuários 
                  receberem e-mails sem revelar seu endereço de e-mail pessoal.
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>E-mails temporários válidos por tempo limitado</li>
                  <li>Recebimento de mensagens em tempo real</li>
                  <li>Proteção da privacidade do usuário</li>
                  <li>Acesso gratuito sem necessidade de cadastro</li>
                </ul>
              </CardContent>
            </Card>

            {/* Limitações e Responsabilidades */}
            <Card className="shadow-lg border-blue-100">
              <CardHeader className="bg-gradient-to-r from-orange-600 to-red-600 text-white rounded-t-lg">
                <CardTitle className="flex items-center space-x-2">
                  <AlertTriangle className="h-5 w-5" />
                  <span>3. Limitações e Responsabilidades</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">Uso Adequado:</h4>
                    <ul className="list-disc list-inside text-gray-700 space-y-1">
                      <li>O serviço deve ser usado apenas para fins legais</li>
                      <li>Não utilize para atividades fraudulentas ou spam</li>
                      <li>Não compartilhe conteúdo ofensivo ou ilegal</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">Limitações Técnicas:</h4>
                    <ul className="list-disc list-inside text-gray-700 space-y-1">
                      <li>E-mails expiram automaticamente após 1 hora</li>
                      <li>Não garantimos 100% de entrega de mensagens</li>
                      <li>O serviço pode ficar temporariamente indisponível</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Privacidade e Segurança */}
            <Card className="shadow-lg border-blue-100">
              <CardHeader className="bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-t-lg">
                <CardTitle className="flex items-center space-x-2">
                  <Shield className="h-5 w-5" />
                  <span>4. Privacidade e Segurança</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <p className="text-gray-700 leading-relaxed mb-4">
                  Respeitamos sua privacidade e não coletamos informações pessoais. Todos os e-mails 
                  temporários são automaticamente excluídos após o período de expiração.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  Para mais detalhes sobre como protegemos seus dados, consulte nossa 
                  <Link to="/privacidade" className="text-blue-600 hover:text-blue-800 font-medium hover:underline ml-1">
                    Política de Privacidade
                  </Link>.
                </p>
              </CardContent>
            </Card>

            {/* Isenção de Responsabilidade */}
            <Card className="shadow-lg border-blue-100">
              <CardHeader className="bg-gradient-to-r from-gray-600 to-gray-700 text-white rounded-t-lg">
                <CardTitle className="flex items-center space-x-2">
                  <FileText className="h-5 w-5" />
                  <span>5. Isenção de Responsabilidade</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <p className="text-gray-700 leading-relaxed mb-4">
                  O MailTempFast é fornecido "como está" sem garantias de qualquer tipo. Não nos 
                  responsabilizamos por:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>Perda de dados ou mensagens</li>
                  <li>Problemas causados por uso inadequado do serviço</li>
                  <li>Interrupções temporárias do serviço</li>
                  <li>Conteúdo das mensagens recebidas</li>
                </ul>
              </CardContent>
            </Card>

            {/* Contato */}
            <Card className="shadow-lg border-blue-100">
              <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-t-lg">
                <CardTitle className="flex items-center space-x-2">
                  <Mail className="h-5 w-5" />
                  <span>6. Contato</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <p className="text-gray-700 leading-relaxed">
                  Para dúvidas sobre estes termos de uso ou sobre nosso serviço, entre em contato conosco através da nossa 
                  <Link to="/contato" className="text-blue-600 hover:text-blue-800 font-medium hover:underline ml-1">
                    página de contato
                  </Link>.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Data de atualização */}
          <div className="text-center mt-12 pt-8 border-t border-gray-200">
            <p className="text-sm text-gray-500">
              Última atualização: 6 de junho de 2025
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-8 mt-16 border-t-4 border-blue-500">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-6">
              <div className="flex items-center justify-center space-x-3 mb-4">
                <div className="p-2 bg-white rounded-lg shadow-lg">
                  <img 
                    src="/lovable-uploads/edc7ce4e-c1dc-4bb6-8bb1-90ee1520903f.png" 
                    alt="MailTempFast Logo" 
                    className="h-8 w-8 object-contain"
                  />
                </div>
                <div>
                  <h3 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-blue-300 bg-clip-text text-transparent">
                    MailTempFast
                  </h3>
                  <p className="text-gray-400 text-xs">E-mails temporários reais</p>
                </div>
              </div>
            </div>
            
            <div className="grid md:grid-cols-4 gap-6 mb-6">
              <div className="text-center">
                <h4 className="text-blue-400 font-semibold mb-3">Navegação</h4>
                <div className="space-y-2">
                  <Link to="/" className="block text-gray-300 hover:text-blue-400 transition-colors text-sm hover:underline">
                    Página Inicial
                  </Link>
                  <Link to="/blog" className="block text-gray-300 hover:text-blue-400 transition-colors text-sm hover:underline">
                    Blog
                  </Link>
                </div>
              </div>
              
              <div className="text-center">
                <h4 className="text-blue-400 font-semibold mb-3">Institucional</h4>
                <div className="space-y-2">
                  <Link to="/sobre" className="block text-gray-300 hover:text-blue-400 transition-colors text-sm hover:underline">
                    Sobre Nós
                  </Link>
                  <Link to="/termos" className="block text-gray-300 hover:text-blue-400 transition-colors text-sm hover:underline">
                    Termos de Uso
                  </Link>
                </div>
              </div>
              
              <div className="text-center">
                <h4 className="text-blue-400 font-semibold mb-3">Privacidade</h4>
                <div className="space-y-2">
                  <Link to="/privacidade" className="block text-gray-300 hover:text-blue-400 transition-colors text-sm hover:underline">
                    Política de Privacidade
                  </Link>
                </div>
              </div>
              
              <div className="text-center">
                <h4 className="text-blue-400 font-semibold mb-3">Suporte</h4>
                <div className="space-y-2">
                  <Link to="/contato" className="block text-gray-300 hover:text-blue-400 transition-colors text-sm hover:underline">
                    Entre em Contato
                  </Link>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-700 pt-4">
              <div className="flex flex-col md:flex-row justify-between items-center">
                <p className="text-xs text-gray-400 mb-2 md:mb-0">
                  © 2025 MailTempFast. Todos os direitos reservados.
                </p>
                <div className="flex items-center space-x-4 text-xs text-gray-400">
                  <span className="flex items-center">
                    <Shield className="h-3 w-3 mr-1 text-green-400" />
                    SSL Ativo
                  </span>
                  <span className="flex items-center">
                    <FileText className="h-3 w-3 mr-1 text-blue-400" />
                    Sem logs
                  </span>
                  <span className="flex items-center">
                    <Mail className="h-3 w-3 mr-1 text-orange-400" />
                    100% Privado
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
