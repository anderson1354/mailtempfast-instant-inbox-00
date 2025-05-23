import { useEffect, useState } from "react";
import { createAccount, login, getMessages } from "@/api/mailtm";

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const setupEmail = async () => {
      try {
        const { username, password } = await createAccount();
        setEmail(username);
        setPassword(password);

        const jwt = await login(username, password);
        setToken(jwt);
      } catch (err) {
        console.error("Erro na configuração:", err);
      }
    };

    setupEmail();
  }, []);

  useEffect(() => {
    if (!token) return;

    const interval = setInterval(async () => {
      try {
        const msgs = await getMessages(token);
        setMessages(msgs);
      } catch (err) {
        console.error("Erro ao buscar mensagens:", err);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [token]);

  return (
    <main className="p-6 max-w-xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Seu Email Temporário</h1>
      <div className="bg-gray-100 p-4 rounded mb-6">
        <p><strong>Email:</strong> {email}</p>
      </div>

      <h2 className="text-xl font-semibold mb-2">Caixa de Entrada</h2>
      <div className="space-y-4">
        {messages.length === 0 ? (
          <p>Nenhuma mensagem recebida ainda.</p>
        ) : (
          messages.map((msg: any) => (
            <div key={msg.id} className="bg-white border p-4 rounded">
              <p><strong>De:</strong> {msg.from.address}</p>
              <p><strong>Assunto:</strong> {msg.subject}</p>
            </div>
          ))
        )}
      </div>
    </main>
  );
}
