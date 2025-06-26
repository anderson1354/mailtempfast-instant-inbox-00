
import React, { useState } from 'react';
import { Settings, Save, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { hostingerService, type HostingerConfig } from '@/services/hostinger';

interface HostingerConfigProps {
  onConfigSaved: (config: HostingerConfig) => void;
}

const HostingerConfigComponent: React.FC<HostingerConfigProps> = ({ onConfigSaved }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [config, setConfig] = useState<HostingerConfig>({
    apiKey: '',
    domain: '',
    endpoint: 'https://api.hostinger.com/v1',
  });
  const [isConfigured, setIsConfigured] = useState(!!hostingerService.getConfig());
  const { toast } = useToast();

  const handleSave = () => {
    if (!config.apiKey || !config.domain) {
      toast({
        title: "❌ Campos obrigatórios",
        description: "Por favor, preencha API Key e Domínio.",
        variant: "destructive",
      });
      return;
    }

    try {
      hostingerService.setConfig(config);
      setIsConfigured(true);
      onConfigSaved(config);
      setIsOpen(false);
      
      toast({
        title: "✅ Configuração salva!",
        description: "API da Hostinger configurada com sucesso.",
      });
    } catch (error) {
      toast({
        title: "❌ Erro ao salvar",
        description: "Não foi possível salvar a configuração.",
        variant: "destructive",
      });
    }
  };

  const handleClear = () => {
    hostingerService.clearConfig();
    setConfig({ apiKey: '', domain: '', endpoint: 'https://api.hostinger.com/v1' });
    setIsConfigured(false);
    
    toast({
      title: "🗑️ Configuração removida",
      description: "Dados da Hostinger foram limpos.",
    });
  };

  React.useEffect(() => {
    const existingConfig = hostingerService.getConfig();
    if (existingConfig) {
      setConfig(existingConfig);
      setIsConfigured(true);
    }
  }, []);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant={isConfigured ? "default" : "outline"}
          size="sm"
          className={isConfigured ? "bg-green-600 hover:bg-green-700" : ""}
        >
          <Settings className="h-4 w-4 mr-2" />
          {isConfigured ? "Hostinger Ativo" : "Configurar Hostinger"}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Settings className="h-5 w-5 text-blue-600" />
            <span>Configurar API Hostinger</span>
          </DialogTitle>
        </DialogHeader>
        <Card>
          <CardContent className="p-4 space-y-4">
            <div>
              <Label htmlFor="apiKey">API Key *</Label>
              <Input
                id="apiKey"
                type="password"
                placeholder="Sua API Key da Hostinger"
                value={config.apiKey}
                onChange={(e) => setConfig({ ...config, apiKey: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="domain">Domínio *</Label>
              <Input
                id="domain"
                placeholder="exemplo.com"
                value={config.domain}
                onChange={(e) => setConfig({ ...config, domain: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="endpoint">Endpoint da API</Label>
              <Input
                id="endpoint"
                placeholder="https://api.hostinger.com/v1"
                value={config.endpoint}
                onChange={(e) => setConfig({ ...config, endpoint: e.target.value })}
              />
            </div>
            <div className="flex space-x-2">
              <Button onClick={handleSave} className="flex-1">
                <Save className="h-4 w-4 mr-2" />
                Salvar
              </Button>
              {isConfigured && (
                <Button onClick={handleClear} variant="destructive" size="sm">
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
            <div className="text-xs text-gray-500 bg-blue-50 p-3 rounded">
              <p><strong>Como obter:</strong></p>
              <p>1. Acesse o painel da Hostinger</p>
              <p>2. Vá em API Management</p>
              <p>3. Gere uma nova API Key</p>
              <p>4. Use o domínio do seu email</p>
            </div>
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  );
};

export default HostingerConfigComponent;
