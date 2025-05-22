
import React from 'react';
import { Shield, Lock, Eye, Trash2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const PrivacyNotice: React.FC = () => {
  return (
    <Card className="shadow-lg border-green-100 bg-gradient-to-br from-green-50 to-blue-50">
      <CardHeader className="bg-gradient-to-r from-green-600 to-green-700 text-white rounded-t-lg">
        <CardTitle className="flex items-center space-x-2 text-sm">
          <Shield className="h-4 w-4" />
          <span>Privacidade & Segurança</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <div className="space-y-3">
          <div className="flex items-start space-x-3">
            <div className="p-1 bg-green-100 rounded-full">
              <Lock className="h-3 w-3 text-green-600" />
            </div>
            <div>
              <p className="text-xs font-medium text-green-800">
                SSL/HTTPS Ativo
              </p>
              <p className="text-xs text-green-600">
                Conexão 100% criptografada
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <div className="p-1 bg-blue-100 rounded-full">
              <Eye className="h-3 w-3 text-blue-600" />
            </div>
            <div>
              <p className="text-xs font-medium text-blue-800">
                Zero Logs
              </p>
              <p className="text-xs text-blue-600">
                Nenhum dado pessoal armazenado
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-3">
            <div className="p-1 bg-red-100 rounded-full">
              <Trash2 className="h-3 w-3 text-red-600" />
            </div>
            <div>
              <p className="text-xs font-medium text-red-800">
                Auto-Exclusão
              </p>
              <p className="text-xs text-red-600">
                E-mails deletados em 60min
              </p>
            </div>
          </div>
        </div>

        <div className="mt-4 p-3 bg-white/60 rounded-lg border border-gray-200">
          <p className="text-xs text-gray-700 leading-relaxed">
            <strong>Aviso de Privacidade:</strong> Este serviço não armazena dados pessoais. 
            Todos os e-mails são temporários e excluídos automaticamente. 
            Use apenas para cadastros e testes legítimos.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default PrivacyNotice;
