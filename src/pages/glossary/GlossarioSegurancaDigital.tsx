
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, BookOpen, ArrowLeft, Shield } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";

interface GlossaryItem {
  id: number;
  term: string;
  definition: string;
  category: string;
}

const glossaryData: GlossaryItem[] = [
  {
    id: 1,
    term: "Autenticação de Dois Fatores (2FA)",
    definition: "Um método de segurança que exige duas formas de identificação para verificar a identidade de um usuário. Além da senha (primeiro fator), um segundo fator (como um código enviado para o celular ou biometria) é necessário para acessar a conta. Aumenta significativamente a segurança contra acessos não autorizados.",
    category: "Autenticação"
  },
  {
    id: 2,
    term: "Criptografia",
    definition: "Processo de codificar informações para protegê-las de acessos não autorizados. Os dados são transformados em um formato ilegível (cifrado) e só podem ser decifrados (descriptografados) por quem possui a chave correta. Essencial para proteger comunicações e dados armazenados.",
    category: "Segurança"
  },
  {
    id: 3,
    term: "Firewall",
    definition: "Um sistema de segurança de rede que monitora e controla o tráfego de rede de entrada e saída com base em regras de segurança predeterminadas. Atua como uma barreira entre uma rede interna confiável e redes externas não confiáveis (como a internet), protegendo contra acessos não autorizados.",
    category: "Segurança"
  },
  {
    id: 4,
    term: "Malware",
    definition: "Abreviação de 'malicious software' (software malicioso). É um termo genérico para qualquer software projetado para causar danos, roubar dados ou obter acesso não autorizado a um sistema de computador. Inclui vírus, worms, trojans, ransomware, spyware, entre outros.",
    category: "Ameaças"
  },
  {
    id: 5,
    term: "Phishing",
    definition: "Uma técnica de fraude online onde criminosos se disfarçam de entidades confiáveis (bancos, empresas, serviços governamentais) para enganar as vítimas e obter informações confidenciais, como senhas, números de cartão de crédito ou dados bancários. Geralmente ocorre por e-mail, mensagens de texto ou sites falsos.",
    category: "Ameaças"
  },
  {
    id: 6,
    term: "Ransomware",
    definition: "Um tipo de malware que criptografa os arquivos de um usuário ou sistema e exige um pagamento (resgate), geralmente em criptomoeda, para descriptografá-los e restaurar o acesso. É uma das ameaças cibernéticas mais lucrativas e disruptivas.",
    category: "Ameaças"
  },
  {
    id: 7,
    term: "Spam",
    definition: "Mensagens eletrônicas indesejadas e não solicitadas, geralmente enviadas em massa para fins comerciais, golpes ou disseminação de malware. O e-mail é o meio mais comum para spam, mas também pode ocorrer em mensagens de texto, redes sociais e outros canais.",
    category: "Ameaças"
  },
  {
    id: 8,
    term: "SSL/TLS",
    definition: "Protocolos criptográficos que fornecem comunicação segura pela internet. Eles garantem que os dados transmitidos entre um navegador e um servidor web permaneçam privados e íntegros. O HTTPS (Hypertext Transfer Protocol Secure) é a implementação do HTTP sobre SSL/TLS, indicando uma conexão segura.",
    category: "Segurança"
  },
  {
    id: 9,
    term: "VPN (Virtual Private Network)",
    definition: "Uma rede privada virtual que estende uma rede privada através de uma rede pública, como a internet. Permite que os usuários enviem e recebam dados como se seus dispositivos estivessem diretamente conectados à rede privada, oferecendo maior privacidade e segurança ao criptografar o tráfego e mascarar o endereço IP do usuário.",
    category: "Privacidade"
  },
  {
    id: 10,
    term: "Vírus",
    definition: "Um tipo de malware que se anexa a um programa ou documento legítimo e se replica, espalhando-se para outros computadores quando o programa infectado é executado. Pode causar danos a arquivos, sistemas operacionais ou roubar informações.",
    category: "Ameaças"
  },
  {
    id: 11,
    term: "Vazamento de Dados",
    definition: "Ocorre quando informações confidenciais ou privadas são expostas ou acessadas por indivíduos não autorizados. Pode ser resultado de ataques cibernéticos, falhas de segurança, erros humanos ou roubo de dispositivos. Frequentemente leva ao roubo de identidade e outras fraudes.",
    category: "Privacidade"
  },
  {
    id: 12,
    term: "Zero-day (Dia Zero)",
    definition: "Uma vulnerabilidade de software que é desconhecida pelos desenvolvedores do software (e, portanto, não corrigida) e que está sendo ativamente explorada por cibercriminosos. Ataques de dia zero são particularmente perigosos porque não há patch ou correção disponível no momento da descoberta da vulnerabilidade.",
    category: "Ameaças"
  },
  {
    id: 13,
    term: "E-mail Temporário",
    definition: "Um endereço de e-mail que funciona por um período limitado de tempo e é automaticamente excluído após sua expiração. Usado para proteger a privacidade do usuário e evitar spam em sua caixa de entrada principal. Ideal para cadastros rápidos e testes de serviços online.",
    category: "Privacidade"
  },
  {
    id: 14,
    term: "HTTPS",
    definition: "Hypertext Transfer Protocol Secure é a versão segura do HTTP. Utiliza criptografia SSL/TLS para proteger a comunicação entre o navegador e o servidor web. Sites que usam HTTPS são identificados pelo cadeado na barra de endereços do navegador.",
    category: "Segurança"
  },
  {
    id: 15,
    term: "Cookies",
    definition: "Pequenos arquivos de texto armazenados no computador do usuário pelos sites que ele visita. Podem ser usados para lembrar preferências, manter sessões de login ativas ou rastrear atividades online. Alguns cookies são essenciais para o funcionamento dos sites, enquanto outros são usados for fins de marketing.",
    category: "Privacidade"
  }
];

export default function GlossarioSegurancaDigital() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Todos");

  const categories = ["Todos", ...Array.from(new Set(glossaryData.map(item => item.category)))];

  const filteredGlossary = glossaryData.filter(item => {
    const matchesSearch = item.term.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.definition.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "Todos" || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const sortedGlossary = filteredGlossary.sort((a, b) => a.term.localeCompare(b.term));

  const getCategoryColor = (category: string) => {
    const colors = {
      "Autenticação": "bg-blue-100 text-blue-800",
      "Segurança": "bg-green-100 text-green-800",
      "Ameaças": "bg-red-100 text-red-800",
      "Privacidade": "bg-purple-100 text-purple-800"
    };
    return colors[category as keyof typeof colors] || "bg-gray-100 text-gray-800";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50">
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
              <div className="p-4 bg-indigo-100 rounded-full">
                <BookOpen className="h-12 w-12 text-indigo-600" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              Glossário de Segurança Digital e Privacidade Online
            </h1>
            <p className="text-xl text-gray-600 mb-4">
              Última atualização: 16 de Julho de 2025
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-indigo-600 to-purple-600 mx-auto mb-6"></div>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto">
              Este glossário foi criado para ajudar você a entender os termos mais comuns relacionados à segurança digital e privacidade online. Conhecer esses termos é o primeiro passo para se proteger no ambiente digital.
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
                    placeholder="Buscar termos no glossário..."
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

          {/* Estatísticas */}
          <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm mb-8">
            <CardContent className="p-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-indigo-600">{sortedGlossary.length}</div>
                  <div className="text-sm text-gray-600">Termos Encontrados</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-green-600">{categories.length - 1}</div>
                  <div className="text-sm text-gray-600">Categorias</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-purple-600">{glossaryData.length}</div>
                  <div className="text-sm text-gray-600">Total de Termos</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-orange-600">100%</div>
                  <div className="text-sm text-gray-600">Gratuito</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Glossary Items */}
          <div className="space-y-6">
            {sortedGlossary.map((item) => (
              <Card key={item.id} className="shadow-lg border-0 bg-white/90 backdrop-blur-sm">
                <CardHeader className="pb-4">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <CardTitle className="text-xl text-gray-800 flex-1">
                      {item.term}
                    </CardTitle>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium w-fit ${getCategoryColor(item.category)}`}>
                      {item.category}
                    </span>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-gray-700 leading-relaxed">
                    {item.definition}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          {sortedGlossary.length === 0 && (
            <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm">
              <CardContent className="p-8 text-center">
                <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  Nenhum termo encontrado
                </h3>
                <p className="text-gray-600">
                  Tente ajustar sua busca ou selecionar uma categoria diferente.
                </p>
              </CardContent>
            </Card>
          )}

          {/* CTA */}
          <Card className="shadow-2xl border-0 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white mt-12">
            <CardContent className="p-8 text-center">
              <Shield className="h-12 w-12 mx-auto mb-4" />
              <h2 className="text-3xl font-bold mb-4">Proteja-se com Conhecimento!</h2>
              <p className="text-xl mb-6">
                Agora que você conhece os termos, coloque a segurança em prática
              </p>
              <Link to="/">
                <Button className="bg-white text-indigo-600 hover:bg-gray-100 font-bold px-8 py-4 text-lg">
                  <Shield className="h-5 w-5 mr-2" />
                  Usar E-mail Temporário Seguro
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
