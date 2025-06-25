import { useEffect, useState } from 'react';

const BASE_URL = 'https://api.mail.tm';

interface Mensagem {
  id: string;
  from: { address: string };
  subject: string;
  intro: string;
  text: string;
}

export function useInbox() {
  const [email, setEmail] = useState('');
  const [mensagens, setMensagens] = useState<Mensagem[]>([]);

  useEffect(() => {
    async function iniciar() {
      // 1. Buscar domínio
      const domRes = await fetch(`${BASE_URL}/domains`);
      const domData = await domRes.json();
      const dominio = domData['hydra:member'][0].domain;

      // 2. Criar e-mail e senha
      const novoEmail = `${Math.random().toString(36).substring(2, 10)}@${dominio}`;
      const senha = 'senhaForte123!';
      setEmail(novoEmail);

      // 3. Criar conta
      await fetch(`${BASE_URL}/accounts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ address: novoEmail, password: senha }),
      });

      // 4. Login e obter token
      const loginRes = await fetch(`${BASE_URL}/token`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ address: novoEmail, password: senha }),
      });

      const loginData = await loginRes.json();
      const token = loginData.token;

      // 5. Buscar mensagens recebidas
      async function buscarMensagens() {
        const msgRes = await fetch(`${BASE_URL}/messages`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const msgData = await msgRes.json();
        setMensagens(msgData['hydra:member']);
      }

      // Atualizar a cada 10 segundos
      buscarMensagens();
      const interval = setInterval(buscarMensagens, 10000);
      return () => clearInterval(interval);
    }

    iniciar();
  }, []);

  return { email, mensagens };
}
