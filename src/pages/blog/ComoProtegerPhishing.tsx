
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Shield, Mail, AlertTriangle, CheckCircle, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";

export default function ComoProtegerPhishing() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-pink-50">
      <Header />
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Botão Voltar */}
          <div className="mb-8">
            <Link to="/blog">
              <Button variant="outline" className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                Voltar ao Blog
              </Button>
            </Link>
          </div>

          {/* Header do Artigo */}
          <div className="text-center mb-12">
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-red-100 rounded-full">
                <Shield className="h-12 w-12 text-red-600" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              Como Proteger-se de Golpes de Phishing Usando E-mails Temporários
            </h1>
            <p className="text-xl text-gray-600 mb-4">
              Data de Publicação: 16 de Julho de 2025
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-red-600 to-orange-600 mx-auto"></div>
          </div>

          {/* Conteúdo do Artigo */}
          <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm mb-8">
            <CardHeader className="bg-gradient-to-r from-red-50 to-orange-50">
              <CardTitle className="text-2xl text-gray-800 flex items-center gap-3">
                <AlertTriangle className="h-6 w-6 text-red-600" />
                Introdução
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                No cenário digital atual, os golpes de phishing representam uma das ameaças mais persistentes e perigosas para a segurança online. Milhões de pessoas são vítimas desses ataques anualmente, perdendo dados pessoais, credenciais de acesso e até mesmo dinheiro. Mas você sabia que os e-mails temporários, como os oferecidos pelo MailTempFast, podem ser uma ferramenta poderosa na sua defesa contra o phishing?
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                Este artigo explorará o que é phishing, como identificá-lo e, mais importante, como usar e-mails temporários para proteger-se eficazmente.
              </p>
            </CardContent>
          </Card>

          {/* O Que é Phishing */}
          <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm mb-8">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
              <CardTitle className="text-2xl text-gray-800 flex items-center gap-3">
                <AlertTriangle className="h-6 w-6 text-blue-600" />
                O Que é Phishing?
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                Phishing é uma forma de fraude online onde criminosos tentam enganar indivíduos para que revelem informações confidenciais, como senhas, números de cartão de crédito, dados bancários ou outras informações pessoais. Eles geralmente se disfarçam de entidades confiáveis, como bancos, empresas de tecnologia, serviços de streaming ou até mesmo órgãos governamentais.
              </p>
              
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Características Comuns de um Ataque de Phishing:</h3>
              <div className="grid md:grid-cols-2 gap-4 mb-6">
                <div className="flex items-start gap-3 p-4 bg-red-50 rounded-lg">
                  <AlertTriangle className="h-5 w-5 text-red-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-800">Urgência Falsa</h4>
                    <p className="text-gray-700">Mensagens que exigem ação imediata, sob pena de perda de conta ou bloqueio.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 bg-orange-50 rounded-lg">
                  <AlertTriangle className="h-5 w-5 text-orange-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-800">Erros Gramaticais</h4>
                    <p className="text-gray-700">Erros de ortografia e gramática são sinais comuns de mensagens fraudulentas.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 bg-yellow-50 rounded-lg">
                  <AlertTriangle className="h-5 w-5 text-yellow-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-800">Links Suspeitos</h4>
                    <p className="text-gray-700">URLs que parecem legítimas, mas apontam para domínios maliciosos.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 bg-purple-50 rounded-lg">
                  <AlertTriangle className="h-5 w-5 text-purple-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-800">Solicitação de Dados</h4>
                    <p className="text-gray-700">Pedidos para verificar ou atualizar informações sensíveis via link.</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Como E-mails Temporários Ajudam */}
          <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm mb-8">
            <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50">
              <CardTitle className="text-2xl text-gray-800 flex items-center gap-3">
                <Shield className="h-6 w-6 text-green-600" />
                Como os E-mails Temporários Ajudam na Proteção Contra Phishing
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                E-mails temporários, ou e-mails descartáveis, são uma linha de defesa eficaz contra o phishing por várias razões:
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4 p-6 bg-green-50 rounded-lg">
                  <CheckCircle className="h-6 w-6 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="text-xl font-semibold text-gray-800 mb-2">Redução da Exposição do E-mail Principal</h4>
                    <p className="text-gray-700">Ao usar um e-mail temporário para cadastros suspeitos, você evita expor seu endereço principal a possíveis listas de spam ou bancos de dados comprometidos.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4 p-6 bg-blue-50 rounded-lg">
                  <CheckCircle className="h-6 w-6 text-blue-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="text-xl font-semibold text-gray-800 mb-2">Filtragem de Mensagens Suspeitas</h4>
                    <p className="text-gray-700">E-mails de phishing frequentemente chegam de fontes desconhecidas. Usando um e-mail temporário, mensagens suspeitas podem ser facilmente ignoradas.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4 p-6 bg-purple-50 rounded-lg">
                  <CheckCircle className="h-6 w-6 text-purple-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="text-xl font-semibold text-gray-800 mb-2">Anonimato e Descartabilidade</h4>
                    <p className="text-gray-700">Se você começar a receber phishing em um endereço temporário, pode simplesmente abandoná-lo, impedindo ataques continuados.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4 p-6 bg-orange-50 rounded-lg">
                  <CheckCircle className="h-6 w-6 text-orange-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="text-xl font-semibold text-gray-800 mb-2">Teste de Confiabilidade de Sites</h4>
                    <p className="text-gray-700">Use um e-mail temporário para testar novos sites. Se receber spam rapidamente, é sinal de que o site não é confiável.</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Dicas Adicionais */}
          <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm mb-8">
            <CardHeader className="bg-gradient-to-r from-indigo-50 to-purple-50">
              <CardTitle className="text-2xl text-gray-800 flex items-center gap-3">
                <CheckCircle className="h-6 w-6 text-indigo-600" />
                Dicas Adicionais para se Proteger Contra Phishing
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-800">Verifique o Remetente</h4>
                      <p className="text-gray-700">Sempre confira o endereço completo do remetente.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-800">Não Clique em Links Suspeitos</h4>
                      <p className="text-gray-700">Digite o endereço do site diretamente no navegador.</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-800">Use 2FA</h4>
                      <p className="text-gray-700">Ative autenticação de dois fatores em contas importantes.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-800">Mantenha-se Atualizado</h4>
                      <p className="text-gray-700">Mantenha software e antivírus sempre atualizados.</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Conclusão */}
          <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm mb-8">
            <CardHeader className="bg-gradient-to-r from-green-50 to-blue-50">
              <CardTitle className="text-2xl text-gray-800 flex items-center gap-3">
                <Mail className="h-6 w-6 text-green-600" />
                Conclusão
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                Os e-mails temporários são uma ferramenta valiosa na luta contra os golpes de phishing. Ao usá-los estrategicamente, você pode reduzir significativamente sua exposição a ameaças online e manter sua caixa de entrada principal limpa e segura.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                Combine o uso de e-mails temporários com outras práticas de segurança digital para construir uma defesa robusta contra os cibercriminosos. O MailTempFast está aqui para ser seu aliado nessa jornada pela privacidade e segurança online.
              </p>
            </CardContent>
          </Card>

          {/* CTA */}
          <Card className="shadow-2xl border-0 bg-gradient-to-r from-red-600 via-orange-600 to-pink-600 text-white">
            <CardContent className="p-8 text-center">
              <h2 className="text-3xl font-bold mb-4">Proteja-se Agora!</h2>
              <p className="text-xl mb-6">Use nossos e-mails temporários para navegar com segurança</p>
              <Link to="/">
                <Button className="bg-white text-red-600 hover:bg-gray-100 font-bold px-8 py-4 text-lg">
                  <Shield className="h-5 w-5 mr-2" />
                  Criar E-mail Temporário Gratuito
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
