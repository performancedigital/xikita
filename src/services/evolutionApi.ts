import axios from 'axios';

const EVOLUTION_API_URL = 'https://evolution.comperformance.com.br';
const INSTANCE_ID = 'XIkita Moda Infantil';

// Nota: A API Key deve ser configurada no Vercel como VITE_EVOLUTION_API_KEY
const API_KEY = import.meta.env.VITE_EVOLUTION_API_KEY || '';

const evolutionApi = axios.create({
  baseURL: EVOLUTION_API_URL,
  headers: {
    'Content-Type': 'application/json',
    'apikey': API_KEY
  }
});

export const sendMessage = async (number: string, text: string) => {
  if (!API_KEY) {
    console.warn('Evolution API Key não configurada. A mensagem não será enviada.');
    return;
  }

  try {
    // Formatar número para o padrão WhatsApp internacional
    const cleanNumber = number.replace(/\D/g, '');
    const formattedNumber = cleanNumber.length === 11 ? `55${cleanNumber}` : cleanNumber;

    const response = await evolutionApi.post(`/message/sendText/${INSTANCE_ID}`, {
      number: formattedNumber,
      options: {
        delay: 1200,
        presence: 'composing',
        linkPreview: false
      },
      textMessage: {
        text: text
      }
    });

    return response.data;
  } catch (error) {
    console.error('Erro ao enviar mensagem via Evolution API:', error);
    throw error;
  }
};

export const sendConfirmation = async (name: string, whatsapp: string) => {
  const message = `Olá ${name}! 😍\n\nQue alegria ter você no Clube das Mamães da *XIKITA MODA INFANTIL*!\n\nSeu cadastro foi realizado com sucesso para a nossa campanha de 9 anos. 🎉\n\n*Seus benefícios exclusivos:*\n✅ Atendimento VIP na loja\n✅ Café Especial nos dias 07, 08 e 09 de Maio\n✅ Acesso a ofertas em primeira mão\n\n*Como ganhar o prêmio?*\nA cada R$ 100,00 em compras você ganha um cupom para concorrer ao nosso *Kit Buba Care* completo (🧺 cesta linda com itens de higiene).\n\nAproveite para garantir o enxoval e aumentar suas chances! Esperamos você na loja. ✨`;
  return sendMessage(whatsapp, message);
};

export const sendCoupons = async (name: string, whatsapp: string, coupons: string[]) => {
  const couponsText = coupons.map(c => `🎫 *${c}*`).join('\n');
  const message = `Oi ${name}! Boas notícias! 🛍️\n\nSua compra foi registrada e você acabou de ganhar novos cupons da sorte!\n\nSeus números são:\n${couponsText}\n\nBoa sorte no sorteio dia 09/05! 🍀`;
  return sendMessage(whatsapp, message);
};
