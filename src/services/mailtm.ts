
interface MailTmAccount {
  id: string;
  address: string;
  quota: number;
  used: number;
  isDisabled: boolean;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}

interface MailTmMessage {
  id: string;
  accountId: string;
  msgid: string;
  from: {
    address: string;
    name: string;
  };
  to: Array<{
    address: string;
    name: string;
  }>;
  subject: string;
  intro: string;
  seen: boolean;
  isDeleted: boolean;
  hasAttachments: boolean;
  size: number;
  downloadUrl: string;
  createdAt: string;
  updatedAt: string;
}

interface MailTmMessageDetail extends MailTmMessage {
  cc: Array<{
    address: string;
    name: string;
  }>;
  bcc: Array<{
    address: string;
    name: string;
  }>;
  flagged: boolean;
  verifications: string[];
  retention: boolean;
  retentionDate: string;
  text: string;
  html: string[];
}

const API_BASE_URL = 'https://api.mail.tm';

class MailTmService {
  private token: string | null = null;
  private accountId: string | null = null;

  async getDomains(): Promise<string[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/domains`);
      const data = await response.json();
      return data['hydra:member'].map((domain: any) => domain.domain);
    } catch (error) {
      console.error('Erro ao buscar domínios:', error);
      return ['dcpa.net']; // fallback
    }
  }

  async createAccount(address: string, password: string): Promise<MailTmAccount> {
    const response = await fetch(`${API_BASE_URL}/accounts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        address,
        password
      })
    });

    if (!response.ok) {
      throw new Error(`Erro ao criar conta: ${response.statusText}`);
    }

    const account = await response.json();
    this.accountId = account.id;
    return account;
  }

  async login(address: string, password: string): Promise<string> {
    const response = await fetch(`${API_BASE_URL}/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        address,
        password
      })
    });

    if (!response.ok) {
      throw new Error(`Erro no login: ${response.statusText}`);
    }

    const data = await response.json();
    this.token = data.token;
    return this.token;
  }

  async getMessages(): Promise<MailTmMessage[]> {
    if (!this.token) {
      throw new Error('Token não encontrado. Faça login primeiro.');
    }

    const response = await fetch(`${API_BASE_URL}/messages`, {
      headers: {
        'Authorization': `Bearer ${this.token}`,
      }
    });

    if (!response.ok) {
      throw new Error(`Erro ao buscar mensagens: ${response.statusText}`);
    }

    const data = await response.json();
    return data['hydra:member'] || [];
  }

  async getMessageDetail(messageId: string): Promise<MailTmMessageDetail> {
    if (!this.token) {
      throw new Error('Token não encontrado. Faça login primeiro.');
    }

    const response = await fetch(`${API_BASE_URL}/messages/${messageId}`, {
      headers: {
        'Authorization': `Bearer ${this.token}`,
      }
    });

    if (!response.ok) {
      throw new Error(`Erro ao buscar detalhes da mensagem: ${response.statusText}`);
    }

    return await response.json();
  }

  async markAsRead(messageId: string): Promise<void> {
    if (!this.token) {
      throw new Error('Token não encontrado. Faça login primeiro.');
    }

    await fetch(`${API_BASE_URL}/messages/${messageId}`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${this.token}`,
        'Content-Type': 'application/merge-patch+json',
      },
      body: JSON.stringify({
        seen: true
      })
    });
  }

  getToken(): string | null {
    return this.token;
  }

  getAccountId(): string | null {
    return this.accountId;
  }
}

export const mailTmService = new MailTmService();
export type { MailTmMessage, MailTmMessageDetail, MailTmAccount };
