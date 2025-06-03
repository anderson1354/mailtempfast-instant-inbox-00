
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail, Shield, Zap, ArrowRight, Calendar } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";

export default function Blog() {
  const articles = [
    {
      id: 1,
      title: "Como usar e-mails temporários com segurança",
      intro: "Descubra como usar e-mails temporários de forma segura e eficaz. Aprenda as melhores práticas, dicas de segurança e como maximizar a proteção da sua privacidade online.",
      slug: "como-usar",
      date: "3 de Junho de 2024",
      icon: Mail,
      color: "blue"
    },
    {
      id: 2,
      title: "Evite spam com e-mails descartáveis",
      intro: "Aprenda como os e-mails descartáveis podem ser sua melhor defesa contra spam e mensagens indesejadas. Mantenha sua caixa de entrada principal sempre limpa e organizada.",
      slug: "evite-spam",
      date: "2 de Junho de 2024",
      icon: Shield,
      color: "green"
    },
    {
      id: 3,
      title: "Por que proteger sua caixa de entrada?",
      intro: "Entenda a importância de proteger seu e-mail pessoal e por que você não deve usá-lo em cadastros de risco ou sites pouco confiáveis. Proteja sua privacidade digital.",
      slug: "por-que-proteger",
      date: "1 de Junho de 2024",
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
                    <div className="flex items-center gap-2 text-sm text-gray-600 mt-2">
                      <Calendar className="h-4 w-4" />
                      <span>{article.date}</span>
                    </div>
                  </CardHeader>
                  <CardContent className="p-6 flex flex-col h-full">
                    <p className="text-gray-700 leading-relaxed mb-6 flex-grow">
                      {article.intro}
                    </p>
                    <Link to={`/blog/${article.slug}`} className="w-full">
                      <Button 
                        className={`w-full ${colors.button} text-white transition-colors group`}
                        variant="default"
                      >
                        Ler mais
                        <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
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
              <Link to="/">
                <Button 
                  className="bg-white text-orange-600 hover:bg-gray-100 font-semibold px-8 py-3 text-lg"
                  variant="secondary"
                >
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
