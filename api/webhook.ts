import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(
  request: VercelRequest,
  response: VercelResponse
) {
  if (request.method === 'POST') {
    const { body } = request;
    
    console.log('Webhook Xikita Recebido:', JSON.stringify(body, null, 2));

    // Aqui você pode processar status de mensagens, respostas automáticas, etc.
    // Exemplo: se (body.event === 'messages.upsert') { ... }

    return response.status(200).json({
      status: 'success',
      received: true,
      timestamp: new Date().toISOString()
    });
  }

  return response.status(405).json({ error: 'Method Not Allowed' });
}
