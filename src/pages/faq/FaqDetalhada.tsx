
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { HelpCircle, Shield, Mail, Lock, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";

export default function FaqDetalhada() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50">
      <Header />
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Botão Voltar */}
          <div className="mb-8">
            <a
              href="https://blog.mailtempfast.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="outline" className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                Visite nosso Blog
              </Button>
            </a>
          </div>

          {/* Header da FAQ */}
          <div className="text-center mb-12">
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-blue-100 rounded-full">
                <HelpCircle className="h-12 w-12 text-blue-600" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              Perguntas Frequentes (FAQ)
            </h1>
            <p className="text-xl text-gray-600 mb-4">
              Última atualização: 16 de Julho de 2025
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-green-600 mx-auto"></div>
          </div>

          {/* Sobre o MailTempFast */}
          <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm mb-8">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-green-50">
              <CardTitle className="text-2xl text-gray-800 flex items-center gap-3">
                <Mail className="h-6 w-6 text-blue-600" />
                Sobre o MailTempFast
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">O que é o MailTempFast?</h3>
                  <p className="text-gray-700 leading-relaxed">
                    O MailTempFast é um serviço online gratuito que oferece endereços de e-mail temporários e descartáveis. 
                    Ele permite que você receba e-mails em um endereço gerado aleatoriamente, que se autodestrói após um período de 60 minutos. 
                    Nosso objetivo é proteger sua privacidade e manter sua caixa de entrada principal livre de spam e mensagens indesejadas.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">Como o MailTempFast funciona?</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Ao acessar nosso site, um endereço de e-mail temporário é gerado automaticamente para você. 
                    Você pode usar este endereço para se cadastrar em sites, serviços ou newsletters. 
                    Todas as mensagens enviadas para este endereço aparecerão em tempo real na sua caixa de entrada temporária em nosso site. 
                    Após 60 minutos, o endereço e todas as mensagens são permanentemente excluídos.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">O MailTempFast é realmente gratuito?</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Sim, o MailTempFast é 100% gratuito e não exige nenhum tipo de cadastro, registro ou pagamento. 
                    Nosso serviço é mantido através de publicidade discreta para garantir que possamos continuar oferecendo 
                    e-mails temporários de qualidade para todos.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Uso de E-mails Temporários */}
          <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm mb-8">
            <CardHeader className="bg-gradient-to-r from-green-50 to-blue-50">
              <CardTitle className="text-2xl text-gray-800 flex items-center gap-3">
                <Shield className="h-6 w-6 text-green-600" />
                Uso de E-mails Temporários
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">Para que serve um e-mail temporário?</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">E-mails temporários são ideais para:</p>
                  <ul className="list-disc list-inside text-gray-700 space-y-2">
                    <li><strong>Cadastros rápidos:</strong> Em sites, fóruns, blogs ou serviços que você não pretende usar a longo prazo.</li>
                    <li><strong>Testes de serviços:</strong> Experimentar novos aplicativos ou plataformas sem expor seu e-mail principal.</li>
                    <li><strong>Evitar spam:</strong> Inscrever-se em newsletters ou promoções sem encher sua caixa de entrada pessoal.</li>
                    <li><strong>Proteger sua privacidade:</strong> Manter seu endereço principal seguro de vazamentos de dados.</li>
                    <li><strong>Anonimato:</strong> Interagir online sem revelar sua identidade real.</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">Devo usar um e-mail temporário para contas importantes?</h3>
                  <div className="p-4 bg-red-50 rounded-lg border-l-4 border-red-500">
                    <p className="text-gray-700 leading-relaxed">
                      <strong>Não!</strong> E-mails temporários não são recomendados para contas importantes como bancos, 
                      redes sociais, e-commerce principal ou qualquer serviço que exija acesso a longo prazo ou recuperação de senha. 
                      Use sempre seu e-mail pessoal seguro para essas finalidades.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Privacidade e Segurança */}
          <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm mb-8">
            <CardHeader className="bg-gradient-to-r from-purple-50 to-indigo-50">
              <CardTitle className="text-2xl text-gray-800 flex items-center gap-3">
                <Lock className="h-6 w-6 text-purple-600" />
                Privacidade e Segurança Online
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">O que é spam e como os e-mails temporários ajudam?</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Spam são mensagens indesejadas, geralmente de natureza comercial, enviadas em massa. 
                    Ao usar um e-mail temporário para cadastros, você evita que seu endereço principal seja adicionado a listas de spam. 
                    Se o site começar a enviar spam para o e-mail temporário, ele será excluído automaticamente.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">O que é phishing e como posso me proteger?</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Phishing é uma tentativa de fraude online onde criminosos se passam por entidades confiáveis para roubar suas informações pessoais. 
                    E-mails temporários ajudam, pois você não expõe seu e-mail principal a sites suspeitos. 
                    Sempre verifique o remetente, não clique em links suspeitos e use autenticação de dois fatores.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">Vocês armazenam meus dados ou e-mails?</h3>
                  <div className="p-4 bg-green-50 rounded-lg border-l-4 border-green-500">
                    <p className="text-gray-700 leading-relaxed">
                      <strong>Não.</strong> O MailTempFast opera com uma política de "zero logs". 
                      Não armazenamos seus endereços de IP, informações pessoais ou o conteúdo de seus e-mails após o período de expiração de 60 minutos. 
                      Tudo é projetado para garantir sua privacidade total.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* CTA */}
          <Card className="shadow-2xl border-0 bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 text-white">
            <CardContent className="p-8 text-center">
              <h2 className="text-3xl font-bold mb-4">Comece a Proteger sua Privacidade!</h2>
              <p className="text-xl mb-6">Crie seu e-mail temporário gratuito agora mesmo</p>
              <Link to="/">
                <Button className="bg-white text-green-600 hover:bg-gray-100 font-bold px-8 py-4 text-lg">
                  <Mail className="h-5 w-5 mr-2" />
                  Criar E-mail Temporário
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
