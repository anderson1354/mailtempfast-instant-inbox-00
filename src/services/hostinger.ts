
interface HostingerConfig {
  apiKey: string;
  domain: string;
  endpoint: string;
}

interface HostingerEmail {
  id: string;
  from: string;
  to: string;
  subject: string;
  body: string;
  timestamp: string;
  read: boolean;
}

class HostingerService {
  private config: HostingerConfig | null = null;

  setConfig(config: HostingerConfig): void {
    this.config = config;
    localStorage.setItem('hostinger_config', JSON.stringify(config));
  }

  getConfig(): HostingerConfig | null {
    if (this.config) return this.config;
    
    const stored = localStorage.getItem('hostinger_config');
    if (stored) {
      this.config = JSON.parse(stored);
    }
    return this.config;
  }

  async createEmailAddress(username: string): Promise<string> {
    const config = this.getConfig();
    if (!config) throw new Error('Configuração da Hostinger não encontrada');

    try {
      const response = await fetch(`${config.endpoint}/emails`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${config.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: `${username}@${config.domain}`,
          password: Math.random().toString(36).substring(2, 15),
        }),
      });

      if (!response.ok) {
        throw new Error(`Erro da API Hostinger: ${response.statusText}`);
      }

      const data = await response.json();
      return `${username}@${config.domain}`;
    } catch (error) {
      console.error('Erro ao criar email na Hostinger:', error);
      throw error;
    }
  }

  async getEmails(emailAddress: string): Promise<HostingerEmail[]> {
    const config = this.getConfig();
    if (!config) throw new Error('Configuração da Hostinger não encontrada');

    try {
      const response = await fetch(`${config.endpoint}/emails/${emailAddress}/messages`, {
        headers: {
          'Authorization': `Bearer ${config.apiKey}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Erro da API Hostinger: ${response.statusText}`);
      }

      const data = await response.json();
      return data.messages || [];
    } catch (error) {
      console.error('Erro ao buscar emails da Hostinger:', error);
      return [];
    }
  }

  clearConfig(): void {
    this.config = null;
    localStorage.removeItem('hostinger_config');
  }
}

export const hostingerService = new HostingerService();
export type { HostingerEmail, HostingerConfig };
