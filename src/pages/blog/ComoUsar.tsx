
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Calendar, User } from "lucide-react";
import Header from "@/components/Header";

export default function ComoUsar() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <Header />
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Back button */}
          <Link to="/blog" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors mb-8">
            <ArrowLeft className="h-4 w-4" />
            <span>Voltar para o blog</span>
          </Link>

          {/* Article header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              Como usar e-mails temporários com segurança
            </h1>
            <div className="flex items-center justify-center gap-4 text-gray-600 mb-6">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>3 de Junho de 2024</span>
              </div>
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span>MailTempFast</span>
              </div>
            </div>
          </div>

          {/* Featured image */}
          <div className="mb-8">
            <img 
              src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=400&fit=crop" 
              alt="Pessoa usando laptop com segurança"
              className="w-full h-64 object-cover rounded-lg shadow-lg"
            />
          </div>

          {/* Article content */}
          <Card className="shadow-lg">
            <CardContent className="p-8">
              <div className="prose prose-lg max-w-none">
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  Os e-mails temporários são uma ferramenta poderosa para proteger sua privacidade online. Quando usados corretamente, eles podem evitar spam, proteger seus dados pessoais e manter sua caixa de entrada principal organizada. Neste artigo, você aprenderá como usar e-mails temporários de forma segura e eficaz.
                </p>

                <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">
                  O que são e-mails temporários?
                </h2>
                <p className="text-gray-700 leading-relaxed mb-6">
                  E-mails temporários, também conhecidos como e-mails descartáveis, são endereços de e-mail que funcionam por um período limitado de tempo. Eles são criados instantaneamente, recebem mensagens normalmente, mas expiram automaticamente após um tempo determinado. Essa característica os torna ideais para situações onde você precisa de um e-mail, mas não quer comprometer seu endereço principal.
                </p>

                <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">
                  Quando usar e-mails temporários
                </h2>
                <p className="text-gray-700 leading-relaxed mb-6">
                  Use e-mails temporários ao se cadastrar em sites que você não confia completamente, ao baixar conteúdo gratuito que exige cadastro, para testes de aplicações, ou quando precisar de verificação por e-mail em serviços que você usará apenas uma vez. Eles são especialmente úteis para evitar que sua caixa de entrada principal seja inundada com newsletters e promoções indesejadas.
                </p>

                <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">
                  Boas práticas de segurança
                </h2>
                <p className="text-gray-700 leading-relaxed mb-6">
                  Mesmo usando e-mails temporários, é importante manter boas práticas de segurança. Nunca use e-mails temporários para contas importantes como bancos ou redes sociais principais. Evite fornecer informações pessoais sensíveis em sites acessados através de e-mails temporários. Sempre verifique a reputação do serviço de e-mail temporário que você está usando e prefira aqueles que garantem não armazenar suas mensagens após a expiração.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Back to blog button */}
          <div className="text-center mt-8">
            <Link to="/blog">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Voltar para o blog
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
