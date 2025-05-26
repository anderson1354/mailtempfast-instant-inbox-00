
export const MAILTM_BASE = "https://api.mail.tm";

export async function createAccount() {
  const username = `user${Math.floor(Math.random() * 100000)}@mail.tm`;
  const password = "MailTemp123!";

  const response = await fetch(`${MAILTM_BASE}/accounts`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ address: username, password }),
  });

  if (!response.ok) throw new Error("Falha ao criar conta");

  return { username, password };
}

export async function login(username: string, password: string) {
  const res = await fetch(`${MAILTM_BASE}/token`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ address: username, password }),
  });

  const data = await res.json();
  if (!data.token) throw new Error("Falha ao autenticar");
  return data.token;
}

export async function getMessages(token: string) {
  const res = await fetch(`${MAILTM_BASE}/messages`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!res.ok) throw new Error("Erro ao buscar mensagens");
  const data = await res.json();
  return data["hydra:member"];
}

export async function generateEmail() {
  const randomString = Math.random().toString(36).substring(2, 12);
  const domains = ['mail.tm'];
  const selectedDomain = domains[Math.floor(Math.random() * domains.length)];
  return `${randomString}@${selectedDomain}`;
}
