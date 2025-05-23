const BASE_URL = "https://api.mail.tm";

export async function createTempEmail() {
  const res = await fetch(`${BASE_URL}/accounts`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      address: `user${Date.now()}@mail.tm`,
      password: "mailtempfast123"
    })
  });

  const data = await res.json();
  return data;
}

export async function getToken(email: string, password: string) {
  const res = await fetch(`${BASE_URL}/token`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ address: email, password })
  });

  const data = await res.json();
  return data.token;
}

export async function getMessages(token: string) {
  const res = await fetch(`${BASE_URL}/messages`, {
    headers: { Authorization: `Bearer ${token}` }
  });

  const data = await res.json();
  return data["hydra:member"];
}
