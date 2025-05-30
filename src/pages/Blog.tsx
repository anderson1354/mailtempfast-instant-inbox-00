import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail, Shield, Zap, ArrowRight } from "lucide-react";
import Header from "@/components/Header";

export default function Blog() {
  const articles = [
    {
      id: 1,
      title: "O que é um e-mail temporário?",
      intro: "Descubra como os e-mails temporários funcionam e por que eles são essenciais para proteger sua privacidade online. Entenda as vantagens de usar endereços descartáveis em cadastros e verificações.",
      icon: Mail,
      color: "blue"
    },
    {
      id: 2,
      title: "5 vantagens de usar e-mails descartáveis",
      intro: "Explore os principais benefícios dos e-mails temporários: proteção contra spam, privacidade aprimorada, testes seguros, organização de contas e muito mais. Saiba como otimizar seu uso.",
      icon: Shield,
      color: "green"
    },
    {
      id: 3,
      title: "Como evitar spam usando e-mails temporários",
      intro: "Aprenda estratégias eficazes para manter sua caixa de entrada principal limpa e organizada. Dicas práticas para usar e-mails temporários em diferentes situações do dia a dia.",
      icon: Zap,
      color: "purple"
    }
  ];

  const getColorClasses = (color: string) => {
    const colorMap = {
      blue: {
        icon: "text-blue-600",
        bg: "bg-blue-50",
        button: "bg-blue-600 hover:bg-blue-700"
      },
      green: {
        icon: "text-green-600", 
        bg: "bg-green-50",
        button: "bg-green-600 hover:bg-green-700"
      },
      purple: {
        icon: "text-purple-600",
        bg: "bg-purple-50", 
        button: "bg-purple-600 hover:bg-purple-700"
      }
    };
    return colorMap[color as keyof typeof colorMap] || colorMap.blue;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-pink-50">
      <Header />
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              Dicas e Artigos sobre Privacidade Digital
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-orange-600 to-pink-600 mx-auto"></div>
            <p className="text-xl text-gray-600 mt-6">
              Mantenha-se informado sobre segurança e privacidade online
            </p>
          </div>

          {/* Articles Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article) => {
              const colors = getColorClasses(article.color);
              const IconComponent = article.icon;
              
              return (
                <Card key={article.id} className="shadow-lg border-0 bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300 h-full">
                  <CardHeader className={`${colors.bg} rounded-t-lg`}>
                    <div className="flex items-center gap-3 mb-2">
                      <IconComponent className={`h-8 w-8 ${colors.icon}`} />
                    </div>
                    <CardTitle className="text-xl text-gray-800 leading-tight">
                      {article.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6 flex flex-col h-full">
                    <p className="text-gray-700 leading-relaxed mb-6 flex-grow">
                      {article.intro}
                    </p>
                    <Button 
                      className={`w-full ${colors.button} text-white transition-colors group`}
                      variant="default"
                    >
                      Ler mais
                      <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* CTA Section */}
          <Card className="mt-12 shadow-xl border-0 bg-gradient-to-r from-orange-600 to-pink-600 text-white">
            <CardContent className="p-8 text-center">
              <h2 className="text-3xl font-bold mb-4">
                Pronto para proteger sua privacidade?
              </h2>
              <p className="text-xl opacity-90 mb-6">
                Experimente nossos e-mails temporários gratuitos agora mesmo!
              </p>
              <Button 
                className="bg-white text-orange-600 hover:bg-gray-100 font-semibold px-8 py-3 text-lg"
                variant="secondary"
              >
                Criar E-mail Temporário
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
