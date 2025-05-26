
export const MAILTM_BASE = "https://api.mail.tm";

export async function getAvailableDomains() {
  const response = await fetch(`${MAILTM_BASE}/domains`);
  if (!response.ok) throw new Error("Falha ao obter domínios");
  
  const data = await response.json();
  return data["hydra:member"];
}

export async function createAccount() {
  try {
    // Primeiro obter domínios disponíveis
    const domains = await getAvailableDomains();
    console.log("Domínios disponíveis:", domains);
    
    if (!domains || domains.length === 0) {
      throw new Error("Nenhum domínio disponível");
    }
    
    // Usar o primeiro domínio disponível
    const domain = domains[0].domain;
    const username = `user${Math.floor(Math.random() * 100000)}@${domain}`;
    const password = "MailTemp123!";

    console.log("Tentando criar conta com:", { username, password });

    const response = await fetch(`${MAILTM_BASE}/accounts`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ address: username, password }),
    });

    console.log("Resposta da criação de conta:", response.status);

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Erro detalhado:", errorData);
      throw new Error(`Falha ao criar conta: ${errorData.detail || 'Erro desconhecido'}`);
    }

    const result = await response.json();
    console.log("Conta criada com sucesso:", result);
    
    return { username, password };
  } catch (error) {
    console.error("Erro no createAccount:", error);
    throw error;
  }
}

export async function login(username: string, password: string) {
  try {
    console.log("Tentando fazer login com:", username);
    
    const res = await fetch(`${MAILTM_BASE}/token`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ address: username, password }),
    });

    console.log("Resposta do login:", res.status);

    if (!res.ok) {
      const errorData = await res.json();
      console.error("Erro de login:", errorData);
      throw new Error(`Falha ao autenticar: ${errorData.detail || 'Erro desconhecido'}`);
    }

    const data = await res.json();
    console.log("Login realizado com sucesso");
    
    if (!data.token) throw new Error("Token não encontrado na resposta");
    return data.token;
  } catch (error) {
    console.error("Erro no login:", error);
    throw error;
  }
}

export async function getMessages(token: string) {
  try {
    console.log("Buscando mensagens...");
    
    const res = await fetch(`${MAILTM_BASE}/messages`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    console.log("Resposta das mensagens:", res.status);

    if (!res.ok) {
      const errorData = await res.json();
      console.error("Erro ao buscar mensagens:", errorData);
      throw new Error(`Erro ao buscar mensagens: ${errorData.detail || 'Erro desconhecido'}`);
    }

    const data = await res.json();
    console.log("Mensagens obtidas:", data["hydra:member"]?.length || 0);
    
    return data["hydra:member"] || [];
  } catch (error) {
    console.error("Erro no getMessages:", error);
    throw error;
  }
}

export async function generateEmail() {
  try {
    const domains = await getAvailableDomains();
    if (!domains || domains.length === 0) {
      throw new Error("Nenhum domínio disponível");
    }
    
    const randomString = Math.random().toString(36).substring(2, 12);
    const selectedDomain = domains[Math.floor(Math.random() * domains.length)];
    return `${randomString}@${selectedDomain.domain}`;
  } catch (error) {
    console.error("Erro ao gerar email:", error);
    // Fallback para um domínio genérico se a API falhar
    const randomString = Math.random().toString(36).substring(2, 12);
    return `${randomString}@1secmail.com`;
  }
}
