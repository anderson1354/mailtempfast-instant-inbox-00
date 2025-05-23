import React, { useEffect, useState } from "react";

interface Message {
  id: string;
  from: { address: string };
  subject: string;
  intro: string;
}

export function Inbox({ token }: { token: string }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchMessages = async () => {
    try {
      setLoading(true);
      const res = await fetch("https://api.mail.tm/messages", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      setMessages(data["hydra:member"] || []);
    } catch (err) {
      console.error("Erro ao buscar mensagens:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
    const interval = setInterval(fetchMessages, 15000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold mb-4">📥 Caixa de Entrada</h2>
      {loading ? (
        <p>Carregando mensagens...</p>
      ) : messages.length === 0 ? (
        <p>Nenhuma mensagem recebida ainda.</p>
      ) : (
        <ul className="space-y-2">
          {messages.map((msg) => (
            <li key={msg.id} className="p-2 border rounded bg-white shadow">
              <strong>De:</strong> {msg.from.address} <br />
              <strong>Assunto:</strong> {msg.subject || "(sem assunto)"} <br />
              <strong>Resumo:</strong> {msg.intro}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
