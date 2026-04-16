import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { sendConfirmation } from '../services/evolutionApi';
import kitImg from '../assets/hero.png';

export default function LandingPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    whatsapp: '',
    gestationTime: '',
    isFirstBaby: '',
    startedLayette: '',
  });

  const change = (field: string, val: string) =>
    setFormData(prev => ({ ...prev, [field]: val }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const leads = JSON.parse(localStorage.getItem('xikita_leads') || '[]');
    const newLead = {
      ...formData,
      id: Date.now(),
      date: new Date().toISOString(),
      totalSpent: 0,
      coupons: [],
    };
    localStorage.setItem('xikita_leads', JSON.stringify([...leads, newLead]));
    sendConfirmation(formData.name, formData.whatsapp).catch(() => {});
    navigate('/sucesso');
  };

  return (
    <div>
      {/* ── NAV ── */}
      <nav style={{
        position: 'sticky', top: 0, zIndex: 50,
        background: 'rgba(255,255,255,0.92)',
        backdropFilter: 'blur(16px)',
        borderBottom: '1px solid rgba(230,0,126,0.08)',
        padding: '16px 24px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ fontSize: '1.4rem', fontWeight: 900, color: 'var(--pink)' }}>XIKITA</span>
          <span style={{ fontSize: '0.75rem', background: 'var(--pink)', color: 'white', padding: '2px 8px', borderRadius: 100, fontWeight: 700 }}>9 ANOS</span>
        </div>
        <a
          href="https://instagram.com/loja_xikita"
          target="_blank" rel="noreferrer"
          style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--pink)', textDecoration: 'none' }}
        >
          📷 @loja_xikita
        </a>
      </nav>

      {/* ── HERO ── */}
      <section className="hero" style={{ padding: '80px 24px', flexDirection: 'column', gap: 60 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 60, maxWidth: 1100, width: '100%', alignItems: 'center' }}>

          {/* Left */}
          <div style={{ position: 'relative', zIndex: 1 }}>
            <div className="hero-badge">🎉 Aniversário de 9 anos</div>
            <h1 className="hero-title">
              Celebre com a<br />
              <span className="highlight">Xikita Moda</span><br />
              Infantil! 👶
            </h1>
            <p className="hero-subtitle">
              Participe do <strong>Clube das Mamães</strong> e concorra a um <strong>Kit Buba Care Premium</strong>. A cada R$ 100 em compras você ganha um número da sorte!
            </p>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <a
                href="#cadastro"
                style={{
                  background: 'linear-gradient(135deg, var(--pink), var(--red))',
                  color: 'white', fontWeight: 700, padding: '16px 32px',
                  borderRadius: 16, textDecoration: 'none', fontSize: '1rem',
                  boxShadow: '0 8px 24px rgba(230,0,126,0.4)',
                  display: 'inline-block',
                  transition: 'all 0.3s'
                }}
              >
                🎁 Participar Agora
              </a>
              <a
                href="#kit"
                style={{
                  background: 'white', color: 'var(--text)', fontWeight: 600,
                  padding: '16px 28px', borderRadius: 16, textDecoration: 'none',
                  border: '2px solid rgba(230,0,126,0.15)', fontSize: '0.95rem'
                }}
              >
                Ver o Prêmio
              </a>
            </div>
          </div>

          {/* Right — Kit Img */}
          <div style={{ display: 'flex', justifyContent: 'center', position: 'relative', zIndex: 1 }}>
            <div style={{ position: 'relative' }}>
              <img
                src={kitImg}
                alt="Kit Buba Care Xikita"
                className="hero-kit-img"
              />
              {/* Floating badge */}
              <div style={{
                position: 'absolute', top: -16, right: -16,
                background: 'var(--yellow)', color: '#333', fontWeight: 900,
                borderRadius: 20, padding: '12px 16px', textAlign: 'center',
                boxShadow: '0 8px 24px rgba(0,0,0,0.15)', fontSize: '0.85rem', lineHeight: 1.3
              }}>
                🎫 R$ 100<br /><span style={{ fontSize: '0.7rem', fontWeight: 600 }}>= 1 cupom</span>
              </div>
            </div>
          </div>
        </div>

        {/* Countdown chips */}
        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', justifyContent: 'center', position: 'relative', zIndex: 1 }}>
          {[
            { icon: '📅', text: 'Dias 07, 08 e 09 de Maio' },
            { icon: '🏆', text: 'Sorteio: 09 de Maio' },
            { icon: '☕', text: 'Café especial para mamães' },
          ].map(item => (
            <div key={item.text} style={{
              background: 'white', borderRadius: 100,
              padding: '12px 24px', display: 'flex', alignItems: 'center', gap: 10,
              fontWeight: 600, fontSize: '0.9rem', color: 'var(--text)',
              boxShadow: '0 4px 16px rgba(0,0,0,0.06)'
            }}>
              {item.icon} {item.text}
            </div>
          ))}
        </div>
      </section>

      {/* ── COMO FUNCIONA ── */}
      <section className="pills-section">
        <div className="container" style={{ textAlign: 'center', marginBottom: 48 }}>
          <span className="section-label">Como funciona</span>
          <h2 className="section-title">Em apenas 3 passos simples</h2>
        </div>
        <div className="pill-grid">
          <div className="pill-card">
            <div className="pill-icon" style={{ background: 'rgba(230,0,126,0.08)' }}>📝</div>
            <h3>1. Cadastre-se</h3>
            <p>Preencha o formulário abaixo gratuitamente.</p>
          </div>
          <div className="pill-card">
            <div className="pill-icon" style={{ background: 'rgba(0,149,67,0.08)' }}>🛍️</div>
            <h3>2. Compre na Loja</h3>
            <p>A cada R$ 100 em compras você ganha 1 cupom.</p>
          </div>
          <div className="pill-card">
            <div className="pill-icon" style={{ background: 'rgba(0,174,239,0.08)' }}>🏆</div>
            <h3>3. Concorra ao Prêmio</h3>
            <p>Sorteio ao vivo dia 09/05 nas nossas redes sociais.</p>
          </div>
        </div>
      </section>

      {/* ── KIT PRIZE ── */}
      <section id="kit" style={{ padding: '80px 20px', background: 'var(--bg)' }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 48, alignItems: 'center' }}>
          <div>
            <span className="section-label">O Prêmio</span>
            <h2 className="section-title" style={{ marginBottom: 20 }}>Kit de Higiene<br />Buba Care 🧴</h2>
            <p style={{ color: 'var(--muted)', marginBottom: 28 }}>Um kit completo e premium pensado para o cuidado do seu bebê.</p>
            <div className="kit-items" style={{ justifyContent: 'flex-start' }}>
              {[
                { icon: '🧴', text: 'Shampoo suave' },
                { icon: '✨', text: 'Condicionador' },
                { icon: '🛡️', text: 'Pomada de assadura' },
                { icon: '💧', text: 'Hidratante' },
                { icon: '🫧', text: 'Sabonete líquido' },
                { icon: '🍼', text: 'Garrafinha' },
              ].map(item => (
                <div key={item.text} className="kit-chip">
                  {item.icon} {item.text}
                </div>
              ))}
            </div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <img
              src={kitImg}
              alt="Kit Buba Care"
              style={{ width: '100%', maxWidth: 380, borderRadius: 24, boxShadow: '0 30px 60px rgba(0,0,0,0.15)' }}
            />
          </div>
        </div>
      </section>

      {/* ── FORM ── */}
      <section id="cadastro" className="form-section">
        <div style={{ textAlign: 'center', marginBottom: 36, color: 'white', position: 'relative' }}>
          <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', opacity: 0.7, display: 'block', marginBottom: 10 }}>Garanta sua Vaga</span>
          <h2 style={{ fontSize: 'clamp(1.8rem,4vw,2.8rem)', fontWeight: 900, lineHeight: 1.1 }}>
            Cadastre-se no<br />Clube das Mamães
          </h2>
        </div>

        <div className="form-box">
          <h3 className="form-title">Faça seu Cadastro 💝</h3>
          <p className="form-subtitle">Grátis. Seus cupons começam a valer após a 1ª compra.</p>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>👤 Nome Completo *</label>
              <input
                required type="text"
                placeholder="Ex: Maria Oliveira"
                value={formData.name}
                onChange={e => change('name', e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>📱 Seu WhatsApp *</label>
              <input
                required type="tel"
                placeholder="(xx) xxxxx-xxxx"
                value={formData.whatsapp}
                onChange={e => change('whatsapp', e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>🤰 Tempo de Gestação?</label>
              <select value={formData.gestationTime} onChange={e => change('gestationTime', e.target.value)}>
                <option value="">Selecione...</option>
                <option value="1a3">1 a 3 meses</option>
                <option value="4a6">4 a 6 meses</option>
                <option value="7a9">7 a 9 meses</option>
              </select>
            </div>

            <div className="form-group">
              <label>👶 É seu primeiro bebê?</label>
              <div className="radio-group">
                {['Sim', 'Não'].map(opt => (
                  <label key={opt} className="radio-pill">
                    <input type="radio" name="firstbaby" value={opt} checked={formData.isFirstBaby === opt} onChange={() => change('isFirstBaby', opt)} />
                    {opt}
                  </label>
                ))}
              </div>
            </div>

            <div className="form-group">
              <label>🧺 Já começou a montar o enxoval?</label>
              <div className="radio-group">
                {['Sim', 'Não', 'Já finalizei'].map(opt => (
                  <label key={opt} className="radio-pill">
                    <input type="radio" name="enxoval" value={opt} checked={formData.startedLayette === opt} onChange={() => change('startedLayette', opt)} />
                    {opt}
                  </label>
                ))}
              </div>
            </div>

            <button type="submit" className="btn-submit" disabled={loading}>
              {loading ? '⏳ Enviando...' : '✉️ Confirmar Cadastro'}
            </button>

            <p style={{ textAlign: 'center', fontSize: '0.8rem', color: 'var(--muted)', marginTop: 16 }}>
              🔒 Seus dados são 100% seguros. Não compartilhamos com terceiros.
            </p>
          </form>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer>
        <p style={{ marginBottom: 8, fontSize: '1.1rem' }}>
          <strong>XIKITA MODA INFANTIL</strong> — 9 Anos de Amor 💛
        </p>
        <p>Sorteio ao vivo dia 09 de Maio, nas redes sociais oficiais • <strong>@loja_xikita</strong></p>
        <p style={{ marginTop: 16 }}>© 2025 Xikita Moda Infantil · Todos os direitos reservados.</p>
      </footer>
    </div>
  );
}
