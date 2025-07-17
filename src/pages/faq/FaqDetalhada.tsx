
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronDown, ChevronUp, Search, HelpCircle, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";

interface FAQItem {
  id: number;
  question: string;
  answer: string;
  category: string;
}

const faqData: FAQItem[] = [
  {
    id: 1,
    question: "O que é o MailTempFast?",
    answer: "O MailTempFast é um serviço online gratuito que oferece endereços de e-mail temporários e descartáveis. Ele permite que você receba e-mails em um endereço gerado aleatoriamente, que se autodestrói após um período de 60 minutos. Nosso objetivo é proteger sua privacidade e manter sua caixa de entrada principal livre de spam e mensagens indesejadas.",
    category: "Sobre o MailTempFast"
  },
  {
    id: 2,
    question: "Como o MailTempFast funciona?",
    answer: "Ao acessar nosso site, um endereço de e-mail temporário é gerado automaticamente para você. Você pode usar este endereço para se cadastrar em sites, serviços ou newsletters. Todas as mensagens enviadas para este endereço aparecerão em tempo real na sua caixa de entrada temporária em nosso site. Após 60 minutos, o endereço e todas as mensagens são permanentemente excluídos.",
    category: "Sobre o MailTempFast"
  },
  {
    id: 3,
    question: "O MailTempFast é realmente gratuito?",
    answer: "Sim, o MailTempFast é 100% gratuito e não exige nenhum tipo de cadastro, registro ou pagamento. Nosso serviço é mantido através de publicidade discreta para garantir que possamos continuar oferecendo e-mails temporários de qualidade para todos.",
    category: "Sobre o MailTempFast"
  },
  {
    id: 4,
    question: "Preciso me cadastrar para usar o MailTempFast?",
    answer: "Não, você não precisa se cadastrar, fornecer informações pessoais ou criar uma senha. Basta acessar o site e um e-mail temporário estará pronto para uso imediato. Isso garante total anonimato e conveniência.",
    category: "Sobre o MailTempFast"
  },
  {
    id: 5,
    question: "Por quanto tempo meu e-mail temporário fica ativo?",
    answer: "Cada endereço de e-mail temporário gerado pelo MailTempFast permanece ativo por 60 minutos. Após esse período, ele é automaticamente excluído, juntamente com todas as mensagens recebidas. Você pode gerar um novo e-mail a qualquer momento.",
    category: "Sobre o MailTempFast"
  },
  {
    id: 6,
    question: "Posso enviar e-mails usando o MailTempFast?",
    answer: "Não, o MailTempFast é um serviço de recebimento de e-mails. Ele foi projetado exclusivamente para receber mensagens e proteger sua privacidade, não para enviar. Isso ajuda a prevenir o uso indevido para spam ou atividades maliciosas.",
    category: "Sobre o MailTempFast"
  },
  {
    id: 7,
    question: "Meus e-mails são seguros e privados?",
    answer: "Sim, a segurança e a privacidade são nossas maiores prioridades. Utilizamos SSL/HTTPS para criptografar sua conexão, garantindo que suas mensagens sejam transmitidas de forma segura. Não armazenamos logs ou dados pessoais, e todos os e-mails são excluídos automaticamente após 60 minutos, sem deixar rastros.",
    category: "Sobre o MailTempFast"
  },
  {
    id: 8,
    question: "Para que serve um e-mail temporário?",
    answer: "E-mails temporários são ideais para: cadastros rápidos em sites que você não pretende usar a longo prazo, testes de serviços e aplicativos, evitar spam ao se inscrever em newsletters, proteger sua privacidade mantendo seu e-mail principal seguro, e interagir online mantendo o anonimato.",
    category: "Uso de E-mails Temporários"
  },
  {
    id: 9,
    question: "Devo usar um e-mail temporário para minhas contas importantes?",
    answer: "Não! E-mails temporários não são recomendados para contas importantes como bancos, redes sociais, e-commerce principal ou qualquer serviço que exija acesso a longo prazo ou recuperação de senha. Use sempre seu e-mail pessoal seguro para essas finalidades, pois você precisará de acesso contínuo a ele.",
    category: "Uso de E-mails Temporários"
  },
  {
    id: 10,
    question: "Posso recuperar um e-mail temporário depois que ele expira?",
    answer: "Não. Uma vez que o período de 60 minutos expira, o e-mail temporário e todas as suas mensagens são permanentemente excluídos de nossos servidores e não podem ser recuperados. Este é um recurso de segurança para garantir sua privacidade.",
    category: "Uso de E-mails Temporários"
  },
  {
    id: 11,
    question: "O que acontece se eu fechar a aba do navegador?",
    answer: "Se você fechar a aba do navegador, seu e-mail temporário continuará ativo pelo período de 60 minutos. No entanto, você precisará gerar um novo e-mail ao retornar ao site, pois o acesso ao e-mail anterior é perdido ao fechar a sessão.",
    category: "Uso de E-mails Temporários"
  },
  {
    id: 12,
    question: "O que é spam e como os e-mails temporários ajudam a combatê-lo?",
    answer: "Spam são mensagens indesejadas, geralmente de natureza comercial, enviadas em massa. Ao usar um e-mail temporário para cadastros, você evita que seu endereço principal seja adicionado a listas de spam. Se o site começar a enviar spam para o e-mail temporário, ele será excluído automaticamente, e seu e-mail principal permanecerá limpo.",
    category: "Privacidade e Segurança"
  },
  {
    id: 13,
    question: "O que é phishing e como posso me proteger?",
    answer: "Phishing é uma tentativa de fraude online onde criminosos se passam por entidades confiáveis para roubar suas informações pessoais (senhas, dados bancários). E-mails temporários ajudam, pois você não expõe seu e-mail principal a sites suspeitos. Além disso, sempre verifique o remetente, não clique em links suspeitos, use autenticação de dois fatores e mantenha seu software atualizado.",
    category: "Privacidade e Segurança"
  },
  {
    id: 14,
    question: "O que é SSL/HTTPS e por que é importante?",
    answer: "SSL (Secure Sockets Layer) e HTTPS (Hypertext Transfer Protocol Secure) são tecnologias que criptografam a comunicação entre seu navegador e o site. Isso significa que os dados que você envia e recebe (incluindo suas mensagens de e-mail temporárias) são protegidos contra interceptação por terceiros. O MailTempFast utiliza HTTPS para garantir a segurança de sua conexão.",
    category: "Privacidade e Segurança"
  },
  {
    id: 15,
    question: "Vocês armazenam meus dados ou e-mails?",
    answer: "Não. O MailTempFast opera com uma política de 'zero logs'. Não armazenamos seus endereços de IP, informações pessoais ou o conteúdo de seus e-mails após o período de expiração de 60 minutos. Tudo é projetado para garantir sua privacidade total.",
    category: "Privacidade e Segurança"
  }
];

export default function FaqDetalhada() {
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedItems, setExpandedItems] = useState<number[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("Todos");

  const categories = ["Todos", ...Array.from(new Set(faqData.map(item => item.category)))];

  const filteredFAQ = faqData.filter(item => {
    const matchesSearch = item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.answer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "Todos" || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const toggleExpanded = (id: number) => {
    setExpandedItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
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

          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-purple-100 rounded-full">
                <HelpCircle className="h-12 w-12 text-purple-600" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              Perguntas Frequentes (FAQ)
            </h1>
            <p className="text-xl text-gray-600 mb-4">
              Última atualização: 16 de Julho de 2025
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-600 to-pink-600 mx-auto mb-6"></div>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto">
              Bem-vindo à nossa seção de Perguntas Frequentes! Aqui você encontrará respostas detalhadas sobre o MailTempFast, e-mails temporários, privacidade online e segurança digital.
            </p>
          </div>

          {/* Busca e Filtros */}
          <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm mb-8">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    type="text"
                    placeholder="Buscar perguntas..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <div className="flex gap-2 flex-wrap">
                  {categories.map(category => (
                    <Button
                      key={category}
                      variant={selectedCategory === category ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedCategory(category)}
                      className="text-sm"
                    >
                      {category}
                    </Button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* FAQ Items */}
          <div className="space-y-4">
            {filteredFAQ.map((item) => (
              <Card key={item.id} className="shadow-lg border-0 bg-white/90 backdrop-blur-sm">
                <CardHeader 
                  className="cursor-pointer hover:bg-gray-50 transition-colors"
                  onClick={() => toggleExpanded(item.id)}
                >
                  <div className="flex justify-between items-center">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="bg-purple-100 text-purple-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                          {item.category}
                        </span>
                      </div>
                      <CardTitle className="text-left text-lg text-gray-800">
                        {item.question}
                      </CardTitle>
                    </div>
                    <div className="ml-4">
                      {expandedItems.includes(item.id) ? (
                        <ChevronUp className="h-5 w-5 text-gray-500" />
                      ) : (
                        <ChevronDown className="h-5 w-5 text-gray-500" />
                      )}
                    </div>
                  </div>
                </CardHeader>
                {expandedItems.includes(item.id) && (
                  <CardContent className="pt-0 px-6 pb-6">
                    <div className="border-t pt-4">
                      <p className="text-gray-700 leading-relaxed">
                        {item.answer}
                      </p>
                    </div>
                  </CardContent>
                )}
              </Card>
            ))}
          </div>

          {filteredFAQ.length === 0 && (
            <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm">
              <CardContent className="p-8 text-center">
                <HelpCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  Nenhuma pergunta encontrada
                </h3>
                <p className="text-gray-600">
                  Tente ajustar sua busca ou selecionar uma categoria diferente.
                </p>
              </CardContent>
            </Card>
          )}

          {/* Suporte */}
          <Card className="shadow-xl border-0 bg-gradient-to-r from-purple-600 to-pink-600 text-white mt-12">
            <CardContent className="p-8 text-center">
              <HelpCircle className="h-12 w-12 mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-4">Não encontrou sua dúvida?</h2>
              <p className="text-lg mb-6">
                Se você tiver outras perguntas ou precisar de suporte, entre em contato conosco!
              </p>
              <Link to="/contato">
                <Button className="bg-white text-purple-600 hover:bg-gray-100 font-bold px-8 py-3">
                  Entre em Contato
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* CTA */}
          <Card className="shadow-2xl border-0 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white mt-8">
            <CardContent className="p-8 text-center">
              <h2 className="text-3xl font-bold mb-4">Pronto para começar?</h2>
              <p className="text-xl mb-6">Experimente nossos e-mails temporários gratuitos agora!</p>
              <Link to="/">
                <Button className="bg-white text-blue-600 hover:bg-gray-100 font-bold px-8 py-4 text-lg">
                  <HelpCircle className="h-5 w-5 mr-2" />
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
