const axios = require('axios');

async function testSendMessage() {
  const instanceName = 'XIkita Moda Infantil';
  const url = `https://evolution.comperformance.com.br/message/sendText/${encodeURIComponent(instanceName)}`;
  const apiKey = '429683C4C977415CAAFCCE10F7D57E11';
  const number = '5531987551055';
  
  // Testando com o payload mais simples possível (v1/v2 variant)
  const payload = {
    number: number,
    text: "🚀 Teste Simplificado - Xikita"
  };

  console.log('--- URL:', url);
  console.log('--- Payload:', JSON.stringify(payload));

  try {
    const response = await axios.post(url, payload, {
      headers: {
        'Content-Type': 'application/json',
        'apikey': apiKey
      }
    });
    console.log('✅ Sucesso! Resposta da API:', response.data);
  } catch (error) {
    console.log('❌ Erro no envio:', error.response ? error.response.data : error.message);
    
    // Tentar o outro formato se falhar
    console.log('--- Tentando formato alternativo (textMessage) ---');
    const payloadAlt = {
        number: number,
        textMessage: { text: "🚀 Teste Alternativo - Xikita" }
    };
    try {
        const responseAlt = await axios.post(url, payloadAlt, {
            headers: { 'Content-Type': 'application/json', 'apikey': apiKey }
        });
        console.log('✅ Sucesso (Alt)! Resposta:', responseAlt.data);
    } catch (errorAlt) {
        console.log('❌ Erro no formato alternativo:', errorAlt.response ? errorAlt.response.data : errorAlt.message);
    }
  }
}

testSendMessage();
