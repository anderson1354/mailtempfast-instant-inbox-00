
import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Shield, HelpCircle, FileText, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const EducationalSection = () => {
  const educationalContent = [
    {
      icon: BookOpen,
      title: "Guia Completo",
      description: "Aprenda tudo sobre e-mails temporários e como usá-los para proteger sua privacidade online",
      link: "/guias/guia-completo-emails-temporarios",
      color: "blue"
    },
    {
      icon: Shield,
      title: "Proteção contra Phishing",
      description: "Descubra como se proteger de golpes e fraudes online usando e-mails temporários",
      link: "/blog/como-proteger-se-de-phishing",
      color: "green"
    },
    {
      icon: HelpCircle,
      title: "Perguntas Frequentes",
      description: "Encontre respostas para as dúvidas mais comuns sobre privacidade e segurança digital",
      link: "/faq",
      color: "purple"
    },
    {
      icon: FileText,
      title: "Glossário de Segurança",
      description: "Entenda os termos técnicos relacionados à segurança digital e privacidade online",
      link: "/glossario",
      color: "orange"
    }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      blue: "border-blue-100 hover:border-blue-200 text-blue-600 bg-blue-50",
      green: "border-green-100 hover:border-green-200 text-green-600 bg-green-50",
      purple: "border-purple-100 hover:border-purple-200 text-purple-600 bg-purple-50",
      orange: "border-orange-100 hover:border-orange-200 text-orange-600 bg-orange-50"
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Aprenda sobre Privacidade Digital
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Nossos guias especializados ajudam você a entender e implementar as melhores práticas 
            de segurança online. Proteja-se de ameaças digitais com conhecimento sólido.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {educationalContent.map((item, index) => {
            const Icon = item.icon;
            return (
              <Card 
                key={index} 
                className={`${getColorClasses(item.color)} hover:shadow-lg transition-all duration-300 hover:transform hover:scale-105 cursor-pointer group`}
              >
                <Link to={item.link}>
                  <CardHeader className="text-center">
                    <div className={`w-16 h-16 mx-auto mb-4 rounded-full ${item.color === 'blue' ? 'bg-blue-100' : 
                      item.color === 'green' ? 'bg-green-100' : 
                      item.color === 'purple' ? 'bg-purple-100' : 'bg-orange-100'} 
                      flex items-center justify-center`}>
                      <Icon className={`h-8 w-8 ${item.color === 'blue' ? 'text-blue-600' : 
                        item.color === 'green' ? 'text-green-600' : 
                        item.color === 'purple' ? 'text-purple-600' : 'text-orange-600'}`} />
                    </div>
                    <CardTitle className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                      {item.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-gray-600 text-center leading-relaxed">
                      {item.description}
                    </CardDescription>
                    <div className="mt-4 flex justify-center">
                      <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
                    </div>
                  </CardContent>
                </Link>
              </Card>
            );
          })}
        </div>

        {/* Seção de segurança e confiança */}
        <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Comprometidos com sua Segurança
            </h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              No MailTempFast, levamos a segurança e privacidade a sério. Implementamos as melhores 
              práticas de segurança para garantir que seus dados estejam sempre protegidos.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-green-600" />
              </div>
              <h4 className="font-bold text-gray-900 mb-2">SSL/HTTPS Ativo</h4>
              <p className="text-gray-600 text-sm">
                Todas as comunicações são criptografadas com certificado SSL válido
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="h-8 w-8 text-blue-600" />
              </div>
              <h4 className="font-bold text-gray-900 mb-2">Política Zero Logs</h4>
              <p className="text-gray-600 text-sm">
                Não armazenamos dados pessoais, IPs ou histórico de navegação
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <HelpCircle className="h-8 w-8 text-purple-600" />
              </div>
              <h4 className="font-bold text-gray-900 mb-2">Suporte Especializado</h4>
              <p className="text-gray-600 text-sm">
                Equipe dedicada para esclarecer dúvidas sobre privacidade digital
              </p>
            </div>
          </div>

          <div className="text-center mt-8">
            <Button asChild variant="outline" size="lg" className="border-blue-600 text-blue-600 hover:bg-blue-50">
              <Link to="/sobre">
                Saiba Mais Sobre Nós
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EducationalSection;
