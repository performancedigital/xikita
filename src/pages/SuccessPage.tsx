import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import confetti from 'canvas-confetti';

export default function SuccessPage() {
  const navigate = useNavigate();

  useEffect(() => {
    confetti({ particleCount: 120, spread: 80, origin: { y: 0.6 }, colors: ['#ED1C24', '#00AEEF', '#FFF200', '#E6007E'] });
  }, []);

  return (
    <div className="success-page">
      <div className="success-box">
        <div style={{ fontSize: 72, marginBottom: 8 }}>🎉</div>
        <h1 style={{ fontSize: '1.8rem', fontWeight: 900, color: 'var(--text)', marginBottom: 10 }}>
          Você está dentro!
        </h1>
        <p style={{ color: 'var(--muted)', marginBottom: 28, lineHeight: 1.7 }}>
          Seu cadastro no <strong>Clube das Mamães</strong> foi confirmado. Em instantes você receberá uma mensagem de confirmação no WhatsApp. 📱
        </p>

        <div style={{ background: 'var(--bg)', borderRadius: 16, padding: '18px 24px', marginBottom: 28, textAlign: 'left' }}>
          <p style={{ fontWeight: 700, marginBottom: 8 }}>✅ Próximos passos:</p>
          <ol style={{ paddingLeft: 18, color: 'var(--muted)', fontSize: '0.9rem', lineHeight: 2 }}>
            <li>Visite a loja nos dias <strong>07, 08 ou 09 de Maio</strong></li>
            <li>A cada <strong>R$ 100 em compras</strong> você ganha 1 cupom</li>
            <li>Seus cupons serão enviados por <strong>WhatsApp</strong></li>
            <li>Torça pelo sorteio ao vivo em <strong>09/05</strong> 🤞</li>
          </ol>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <a
            href="https://instagram.com/loja_xikita"
            target="_blank" rel="noreferrer"
            style={{
              display: 'block', width: '100%', padding: '16px',
              background: 'linear-gradient(135deg, var(--pink), var(--red))',
              color: 'white', fontWeight: 700, fontSize: '1rem', borderRadius: 16,
              textDecoration: 'none', textAlign: 'center',
              boxShadow: '0 8px 24px rgba(230,0,126,0.4)'
            }}
          >
            📷 Seguir @loja_xikita
          </a>
          <button
            onClick={() => navigate('/')}
            style={{
              width: '100%', padding: '14px', background: 'none',
              border: '2px solid rgba(230,0,126,0.2)',
              borderRadius: 16, cursor: 'pointer',
              fontFamily: 'Outfit, sans-serif', fontWeight: 600,
              color: 'var(--pink)', fontSize: '0.95rem'
            }}
          >
            ← Voltar para a página
          </button>
        </div>
      </div>
    </div>
  );
}
