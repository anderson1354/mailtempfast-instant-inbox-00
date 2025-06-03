
import React from 'react';
import { Clock, Shield, Zap } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const MainHero = () => {
  return (
    <div className="text-center mb-12">
      <h2 className="text-4xl font-bold text-gray-900 mb-4">
        Proteja sua <span className="text-blue-600">Privacidade</span> Online
      </h2>
      <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
        Gere e-mails temporários reais instantaneamente. Perfeito para cadastros, testes e proteção contra spam.
      </p>
      <div className="flex flex-wrap justify-center gap-4 mb-8">
        <Badge variant="secondary" className="px-4 py-2 text-sm">
          <Zap className="h-4 w-4 mr-2" />
          Instantâneo
        </Badge>
        <Badge variant="secondary" className="px-4 py-2 text-sm">
          <Shield className="h-4 w-4 mr-2" />
          100% Privado
        </Badge>
        <Badge variant="secondary" className="px-4 py-2 text-sm">
          <Clock className="h-4 w-4 mr-2" />
          Auto-Expira
        </Badge>
      </div>
    </div>
  );
};

export default MainHero;
