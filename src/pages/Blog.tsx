
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
      intro: "Entenda a importância de proteger seu e-mail pessoal e por que você não deve usá-lo em cadastros de risco ou em sites pouco confiáveis. Proteja sua privacidade digital.",
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
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {articles.map((article) => {
              const colors = getColorClasses(article.color);
              const IconComponent = article.icon;
              
              return (
                <Link key={article.id} to={`/blog/${article.slug}`} className="block">
                  <Card className="shadow-lg border-0 bg-white/90 backdrop-blur-sm hover:shadow-2xl transition-all duration-300 h-full hover:-translate-y-2 cursor-pointer">
                    <CardHeader className={`${colors.bg} rounded-t-lg`}>
                      <div className="flex items-center gap-3 mb-3">
                        <div className="p-2 bg-white rounded-full shadow-md">
                          <IconComponent className={`h-6 w-6 ${colors.icon}`} />
                        </div>
                      </div>
                      <CardTitle className="text-xl text-gray-800 leading-tight mb-3">
                        {article.title}
                      </CardTitle>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Calendar className="h-4 w-4" />
                        <span>{article.date}</span>
                      </div>
                    </CardHeader>
                    <CardContent className="p-6 flex flex-col h-full">
                      <p className="text-gray-700 leading-relaxed mb-6 flex-grow line-height-relaxed">
                        {article.intro}
                      </p>
                      <div className="mt-auto">
                        <Button 
                          className={`w-full ${colors.button} text-white transition-all duration-300 group shadow-lg hover:shadow-xl transform hover:scale-105`}
                          size="lg"
                        >
                          <span className="font-semibold">Ler Artigo Completo</span>
                          <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>

          {/* Enhanced CTA Section com melhor responsividade */}
          <Card className="shadow-2xl border-0 bg-gradient-to-r from-orange-600 via-pink-600 to-red-600 text-white overflow-hidden relative">
            <div className="absolute inset-0 bg-black/10"></div>
            <CardContent className="p-6 sm:p-8 lg:p-12 text-center relative z-10">
              <div className="max-w-2xl mx-auto">
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6 leading-tight">
                  Pronto para proteger sua privacidade?
                </h2>
                <p className="text-lg sm:text-xl opacity-95 mb-6 sm:mb-8 leading-relaxed px-2">
                  Experimente nossos e-mails temporários gratuitos agora mesmo e mantenha sua caixa de entrada principal sempre segura!
                </p>
                <div className="px-4">
                  <Link to="/">
                    <Button 
                      className="w-full sm:w-auto bg-white text-orange-600 hover:bg-gray-100 font-bold px-6 sm:px-8 lg:px-12 py-3 sm:py-4 text-base sm:text-lg rounded-full shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 min-h-[48px] sm:min-h-[56px]"
                      size="lg"
                    >
                      <Mail className="h-4 w-4 sm:h-5 sm:w-5 mr-2 sm:mr-3 flex-shrink-0" />
                      <span className="text-sm sm:text-base lg:text-lg whitespace-nowrap">
                        Criar E-mail Temporário Gratuito
                      </span>
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Enhanced Footer */}
      <footer className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-12 mt-20 border-t-4 border-orange-500">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {/* Logo e Nome */}
            <div className="text-center mb-8">
              <div className="flex items-center justify-center space-x-4 mb-4">
                <div className="p-3 bg-white rounded-xl shadow-lg">
                  <img 
                    src="/lovable-uploads/edc7ce4e-c1dc-4bb6-8bb1-90ee1520903f.png" 
                    alt="MailTempFast Logo" 
                    className="h-12 w-12 object-contain"
                  />
                </div>
                <div>
                  <h3 className="text-2xl font-bold bg-gradient-to-r from-orange-400 to-pink-400 bg-clip-text text-transparent">
                    MailTempFast
                  </h3>
                  <p className="text-gray-400 text-sm">E-mails temporários reais</p>
                </div>
              </div>
              <p className="text-gray-300 text-lg max-w-md mx-auto">
                Proteção de privacidade através de e-mails temporários seguros e confiáveis.
              </p>
            </div>
            
            {/* Links de navegação organizados */}
            <div className="grid md:grid-cols-3 gap-8 mb-8">
              <div className="text-center">
                <h4 className="text-orange-400 font-semibold mb-4 text-lg">Navegação</h4>
                <div className="space-y-2">
                  <Link 
                    to="/" 
                    className="block text-gray-300 hover:text-orange-400 transition-colors duration-300 hover:underline"
                  >
                    Página Inicial
                  </Link>
                  <Link 
                    to="/blog" 
                    className="block text-gray-300 hover:text-orange-400 transition-colors duration-300 hover:underline"
                  >
                    Blog
                  </Link>
                </div>
              </div>
              
              <div className="text-center">
                <h4 className="text-orange-400 font-semibold mb-4 text-lg">Informações</h4>
                <div className="space-y-2">
                  <Link 
                    to="/sobre" 
                    className="block text-gray-300 hover:text-orange-400 transition-colors duration-300 hover:underline"
                  >
                    Sobre Nós
                  </Link>
                  <Link 
                    to="/privacidade" 
                    className="block text-gray-300 hover:text-orange-400 transition-colors duration-300 hover:underline"
                  >
                    Política de Privacidade
                  </Link>
                </div>
              </div>
              
              <div className="text-center">
                <h4 className="text-orange-400 font-semibold mb-4 text-lg">Suporte</h4>
                <div className="space-y-2">
                  <Link 
                    to="/contato" 
                    className="block text-gray-300 hover:text-orange-400 transition-colors duration-300 hover:underline"
                  >
                    Entre em Contato
                  </Link>
                </div>
              </div>
            </div>

            {/* Linha divisória */}
            <div className="border-t border-gray-700 pt-6">
              <div className="flex flex-col md:flex-row justify-between items-center">
                <p className="text-sm text-gray-400 mb-4 md:mb-0">
                  © 2024 MailTempFast. Todos os direitos reservados.
                </p>
                <div className="flex items-center space-x-4 text-sm text-gray-400">
                  <span className="flex items-center">
                    <Shield className="h-4 w-4 mr-1 text-green-400" />
                    SSL Ativo
                  </span>
                  <span className="flex items-center">
                    <Zap className="h-4 w-4 mr-1 text-blue-400" />
                    Sem logs
                  </span>
                  <span className="flex items-center">
                    <Mail className="h-4 w-4 mr-1 text-orange-400" />
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
