
import React, { useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, Shield, Lock, AlertTriangle, CheckCircle, Home, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";

export default function GlossarioSegurancaDigital() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      <Header />
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Botões de Navegação */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <Link to="/">
              <Button variant="outline" className="flex items-center gap-2 w-full sm:w-auto">
                <Home className="h-4 w-4" />
                Voltar à Página Principal
              </Button>
            </Link>
            <a
              href="https://blog.mailtempfast.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto"
            >
              <Button className="flex items-center justify-center gap-2 w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300">
                <ExternalLink className="h-4 w-4" />
                Visite nosso Blog
              </Button>
            </a>
          </div>

          {/* Header do Glossário */}
          <div className="text-center mb-12">
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-purple-100 rounded-full">
                <BookOpen className="h-12 w-12 text-purple-600" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              Glossário de Segurança Digital e Privacidade Online
            </h1>
            <p className="text-xl text-gray-600 mb-4">
              Última atualização: 16 de Julho de 2025
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-600 to-blue-600 mx-auto"></div>
          </div>

          {/* Introdução */}
          <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm mb-8">
            <CardContent className="p-8">
              <p className="text-lg text-gray-700 leading-relaxed">
                Este glossário foi criado para ajudar você a entender os termos mais comuns relacionados à segurança digital e privacidade online. 
                Conhecer esses termos é o primeiro passo para se proteger no ambiente digital.
              </p>
            </CardContent>
          </Card>

          {/* Termos Essenciais */}
          <Card className="shadow-xl border-0 bg-white/90 backdrop-blur-sm mb-8">
            <CardHeader className="bg-gradient-to-r from-purple-50 to-blue-50">
              <CardTitle className="text-2xl text-gray-800 flex items-center gap-3">
                <Shield className="h-6 w-6 text-purple-600" />
                Termos Essenciais
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3">Autenticação de Dois Fatores (2FA)</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Um método de segurança que exige duas formas de identificação para verificar a identidade de um usuário. 
                    Além da senha (primeiro fator), um segundo fator (como um código enviado para o celular ou biometria) é necessário para acessar a conta. 
                    Aumenta significativamente a segurança contra acessos não autorizados.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3">Criptografia</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Processo de codificar informações para protegê-las de acessos não autorizados. 
                    Os dados são transformados em um formato ilegível (cifrado) e só podem ser decifrados (descriptografados) por quem possui a chave correta. 
                    Essencial para proteger comunicações e dados armazenados.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3">Firewall</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Um sistema de segurança de rede que monitora e controla o tráfego de rede de entrada e saída com base em regras de segurança predeterminadas. 
                    Atua como uma barreira entre uma rede interna confiável e redes externas não confiáveis (como a internet), protegendo contra acessos não autorizados.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3">Malware</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Abreviação de <em>malicious software</em> (software malicioso). É um termo genérico para qualquer software projetado para causar danos, 
                    roubar dados ou obter acesso não autorizado a um sistema de computador. Inclui vírus, worms, trojans, ransomware, spyware, entre outros.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3">Phishing</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Uma técnica de fraude online onde criminosos se disfarçam de entidades confiáveis (bancos, empresas, serviços governamentais) 
                    para enganar as vítimas e obter informações confidenciais, como senhas, números de cartão de crédito ou dados bancários. 
                    Geralmente ocorre por e-mail, mensagens de texto ou sites falsos.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3">SSL/TLS (Secure Sockets Layer / Transport Layer Security)</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Protocolos criptográficos que fornecem comunicação segura pela internet. 
                    Eles garantem que os dados transmitidos entre um navegador e um servidor web permaneçam privados e íntegros. 
                    O HTTPS (Hypertext Transfer Protocol Secure) é a implementação do HTTP sobre SSL/TLS, indicando uma conexão segura.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3">VPN (Virtual Private Network)</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Uma rede privada virtual que estende uma rede privada através de uma rede pública, como a internet. 
                    Permite que os usuários enviem e recebam dados como se seus dispositivos estivessem diretamente conectados à rede privada, 
                    oferecendo maior privacidade e segurança ao criptografar o tráfego e mascarar o endereço IP do usuário.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3">Vazamento de Dados</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Ocorre quando informações confidenciais ou privadas são expostas ou acessadas por indivíduos não autorizados. 
                    Pode ser resultado de ataques cibernéticos, falhas de segurança, erros humanos ou roubo de dispositivos. 
                    Frequentemente leva ao roubo de identidade e outras fraudes.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* CTA */}
          <Card className="shadow-2xl border-0 bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-600 text-white">
            <CardContent className="p-8 text-center">
              <h2 className="text-3xl font-bold mb-4">Proteja sua Privacidade!</h2>
              <p className="text-xl mb-6">Use e-mails temporários para navegar com segurança</p>
              <Link to="/">
                <Button className="bg-white text-purple-600 hover:bg-gray-100 font-bold px-8 py-4 text-lg">
                  <Shield className="h-5 w-5 mr-2" />
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
