import { useEffect, useState } from "react";

export default function EmailInbox() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [countdown, setCountdown] = useState(3600);

  function generateRandomEmail() {
    const user = `user${Math.floor(Math.random() * 100000)}`;
    return {
      address: `${user}@mail.tm`,
      password: `senha${Math.floor(Math.random() * 100000)}`
    };
  }

  async function createAccount() {
    const newAccount = generateRandomEmail();
    setEmail(newAccount.address);
    setPassword(newAccount.password);

    await fetch("https://api.mail.tm/accounts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newAccount)
    });

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
    <div className="min-h-screen bg-gradient-to-tr from-white via-sky-100 to-sky-200 p-6 flex flex-col items-center">
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-xl p-6 space-y-4">
        <h1 className="text-2xl font-bold text-gray-800 text-center">📬 MailTempFast</h1>
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-lg font-mono text-blue-700 bg-blue-50 px-3 py-2 rounded">
            {email || "Gerando..."}
          </div>
          <button
            onClick={handleCopy}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded shadow"
          >
            Copiar
          </button>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">⏳ Expira em: <strong>{formatTime(countdown)}</strong></span>
          <button
            onClick={handleNewEmail}
            className="bg-gray-800 hover:bg-gray-700 text-white px-3 py-1 rounded"
          >
            🔁 Novo e-mail
          </button>
        </div>
        <div className="border-t pt-4">
          <h2 className="text-lg font-semibold text-gray-700 mb-2">Caixa de Entrada</h2>
          {loading && <p className="text-sm text-gray-500">Carregando mensagens...</p>}
          {!loading && messages.length === 0 && (
            <p className="text-sm text-gray-500 italic">Nenhuma mensagem recebida ainda.</p>
          )}
          <div className="space-y-3">
            {messages.map((msg) => (
              <div key={msg.id} className="p-4 bg-gray-50 border border-gray-200 rounded-lg shadow-sm">
                <p className="text-sm text-gray-800"><strong>De:</strong> {msg.from?.address}</p>
                <p className="text-sm text-gray-800"><strong>Assunto:</strong> {msg.subject}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-6 border-t pt-4 text-center text-xs text-gray-400">
          Área para anúncio do Google AdSense
        </div>
      </div>
    </div>
  );
}
