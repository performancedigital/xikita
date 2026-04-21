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
          Cadastro recebido!
        </h1>
        <p style={{ color: 'var(--muted)', marginBottom: 28, lineHeight: 1.7 }}>
          Seu cadastro no <strong>Clube das Gestantes</strong> foi confirmado. Em instantes você receberá uma mensagem de confirmação no WhatsApp. 📱
        </p>

        <div style={{ background: '#F8F8FF', borderRadius: 16, padding: '18px 24px', marginBottom: 20, textAlign: 'left', border: '1.5px solid rgba(230,0,126,0.1)' }}>
          <p style={{ fontWeight: 700, marginBottom: 8, color: 'var(--text)' }}>✅ Próximos passos:</p>
          <ol style={{ paddingLeft: 18, color: 'var(--muted)', fontSize: '0.9rem', lineHeight: 2 }}>
            <li>Visite nossa loja até o dia <strong>09 de maio</strong>;</li>
            <li>Realize sua compra. A cada <strong>R$100,00 em compras</strong> você ganha um cupom.</li>
            <li>Seus cupons serão enviados por <strong>WhatsApp</strong></li>
            <li>Torça pelo sorteio ao vivo em <strong>09/05</strong> 🤞</li>
          </ol>
        </div>

        <div style={{ background: 'rgba(237,28,36,0.05)', borderRadius: 16, padding: '20px', marginBottom: 28, textAlign: 'center', border: '1.5px dashed rgba(237,28,36,0.2)' }}>
          <p style={{ fontWeight: 800, color: '#D32F2F', marginBottom: 8, fontSize: '0.95rem' }}>⚠️ Atenção!</p>
          <p style={{ fontSize: '0.85rem', color: 'var(--text)', lineHeight: 1.6 }}>
            Para que seu cadastro seja efetivado e seu nome apareça no sorteio, <strong style={{ color: '#D32F2F' }}>é necessário efetuar sua compra até o dia 09 de Maio!</strong><br/><br/>
            Aproveite este momento para conferir nossos kits preparados com muito carinho para você!<br/>
            <span style={{ fontSize: '1.2rem', display: 'inline-block', marginTop: 8 }}>🤞 Boa sorte</span>
          </p>
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
