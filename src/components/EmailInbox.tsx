import { useEffect, useState } from "react";

export default function EmailInbox() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [countdown, setCountdown] = useState(3600); // 1 hora em segundos

  function generateRandomEmail() {
    const user = `user${Math.floor(Math.random() * 100000)}`;
    return {
      address: `${user}@cluemail.com`,
      password: `senha${Math.floor(Math.random() * 100000)}`
    };
  }

  async function createAccount() {
    const newAccount = generateRandomEmail();
    setEmail(newAccount.address);
    setPassword(newAccount.password);

    const res = await fetch("https://api.mail.tm/accounts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newAccount)
    });

    await res.json();
    login(newAccount);
  }

  async function login(account) {
    const res = await fetch("https://api.mail.tm/token", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(account)
    });

    const data = await res.json();
    setToken(data.token);
  }

  async function fetchMessages(authToken) {
    const res = await fetch("https://api.mail.tm/messages", {
      headers: {
        Authorization: `Bearer ${authToken}`
      }
    });

    const data = await res.json();
    setMessages(data["hydra:member"] || []);
    setLoading(false);
  }

  useEffect(() => {
    createAccount();
  }, []);

  useEffect(() => {
    if (token) {
      fetchMessages(token);
      const interval = setInterval(() => fetchMessages(token), 30000);
      return () => clearInterval(interval);
    }
  }, [token]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  function formatTime(seconds) {
    const m = String(Math.floor(seconds / 60)).padStart(2, "0");
    const s = String(seconds % 60).padStart(2, "0");
    return `${m}:${s}`;
  }

  function handleNewEmail() {
    setMessages([]);
    setToken("");
    setCountdown(3600);
    createAccount();
  }

  function handleCopy() {
    navigator.clipboard.writeText(email);
    alert("E-mail copiado!");
  }

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-xl font-bold mb-2">Seu E-mail Temporário:</h1>
      <div className="flex items-center gap-2 mb-2">
        <span className="text-md font-mono bg-gray-100 p-2 rounded">{email || "Gerando..."}</span>
        <button onClick={handleCopy} className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600">
          Copiar
        </button>
      </div>
      <p className="text-sm text-gray-600 mb-4">Expira em: {formatTime(countdown)}</p>
      <button onClick={handleNewEmail} className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700 mb-4">
        Novo E-mail
      </button>

      {loading && <p>Carregando mensagens...</p>}

      {!loading && messages.length === 0 && (
        <p className="mt-4 text-sm text-gray-500">Nenhuma mensagem recebida ainda.</p>
      )}

      {messages.length > 0 && (
        <div className="mt-4 space-y-4">
          {messages.map((msg) => (
            <div key={msg.id} className="border p-3 rounded bg-white shadow">
              <p><strong>De:</strong> {msg.from?.address}</p>
              <p><strong>Assunto:</strong> {msg.subject}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
