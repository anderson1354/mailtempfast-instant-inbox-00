
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Calendar, User } from "lucide-react";
import Header from "@/components/Header";

export default function PorqueProteger() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-50">
      <Header />
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Back button */}
          <Link to="/blog" className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-800 transition-colors mb-8">
            <ArrowLeft className="h-4 w-4" />
            <span>Voltar para o blog</span>
          </Link>

          {/* Article header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              Por que proteger sua caixa de entrada?
            </h1>
            <div className="flex items-center justify-center gap-4 text-gray-600 mb-6">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>1 de Junho de 2024</span>
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
              src="https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=400&fit=crop" 
              alt="Programação e segurança digital"
              className="w-full h-64 object-cover rounded-lg shadow-lg"
            />
          </div>

          {/* Article content */}
          <Card className="shadow-lg">
            <CardContent className="p-8">
              <div className="prose prose-lg max-w-none">
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  Sua caixa de entrada é muito mais do que apenas um local para receber mensagens. Ela é um portal direto para sua vida digital, contendo informações pessoais, profissionais e financeiras importantes. Protegê-la deveria ser uma prioridade para qualquer pessoa que usa a internet regularmente.
                </p>

                <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">
                  Os riscos de não proteger seu e-mail
                </h2>
                <p className="text-gray-700 leading-relaxed mb-6">
                  Quando você usa seu e-mail pessoal indiscriminadamente, você se expõe a diversos riscos. Além do spam que pode tornar sua caixa de entrada inutilizável, você também fica vulnerável a ataques de phishing, onde criminosos tentam roubar suas informações pessoais. Sites pouco confiáveis podem vender seus dados para terceiros, resultando em mais spam e até mesmo ligações indesejadas.
                </p>

                <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">
                  O valor da privacidade digital
                </h2>
                <p className="text-gray-700 leading-relaxed mb-6">
                  Sua privacidade digital tem valor real. Empresas pagam milhões para ter acesso aos dados dos usuários, e seu e-mail é uma das portas de entrada mais valiosas para essas informações. Quando você protege seu e-mail principal, você mantém o controle sobre quem pode contatá-lo e como suas informações são usadas. Isso não é apenas uma questão de conveniência, mas de segurança pessoal e profissional.
                </p>

                <h2 className="text-2xl font-bold text-gray-800 mt-8 mb-4">
                  Vantagens de manter uma caixa de entrada limpa
                </h2>
                <p className="text-gray-700 leading-relaxed mb-6">
                  Uma caixa de entrada protegida e organizada oferece inúmeras vantagens. Você consegue encontrar e-mails importantes mais rapidamente, reduz o risco de perder mensagens relevantes entre o spam, diminui o estresse causado pela sobrecarga de informações e mantém um ambiente digital mais produtivo. Além disso, você evita cliques acidentais em links maliciosos que podem comprometer a segurança do seu dispositivo e dados pessoais.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Back to blog button */}
          <div className="text-center mt-8">
            <Link to="/blog">
              <Button className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3">
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
