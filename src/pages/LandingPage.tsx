import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { sendConfirmation } from '../services/evolutionApi';
import kitImg from '../assets/hero.png';
import heroIllus from '../assets/hero-illustration.png';

export default function LandingPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: '', whatsapp: '', gestationTime: '',
    isFirstBaby: '', startedLayette: '',
  });
  const set = (k: string, v: string) => setForm(p => ({ ...p, [k]: v }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const leads = JSON.parse(localStorage.getItem('xikita_leads') || '[]');
    const newLead = { ...form, id: Date.now(), date: new Date().toISOString(), totalSpent: 0, coupons: [] };
    localStorage.setItem('xikita_leads', JSON.stringify([...leads, newLead]));
    sendConfirmation(form.name, form.whatsapp).catch(() => {});
    navigate('/sucesso');
  };

  return (
    <div>
      {/* ── NAV ── */}
      <nav className="lp-nav">
        <div className="lp-nav-logo">
          <span className="brand">XIKITA</span>
          <span className="years">🎉 9 ANOS</span>
        </div>
        <a href="https://instagram.com/loja_xikita" target="_blank" rel="noreferrer"
          style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.85rem', fontWeight: 600, color: 'var(--pink)', textDecoration: 'none' }}>
          📷 @loja_xikita
        </a>
      </nav>

      {/* ── HERO ── */}
      <section className="lp-hero">
        {/* floating hearts background */}
        <div className="hearts">
          {['5%','15%','25%','40%','55%','68%','78%','90%'].map((left, i) => (
            <span key={left} className="heart"
              style={{ left, top: `${10 + (i * 11) % 70}%`, animationDelay: `${i * 0.7}s`, fontSize: `${12 + (i % 3) * 6}px` }}>
              🤍
            </span>
          ))}
        </div>

        <div className="lp-hero-inner">
          {/* LEFT COLUMN */}
          <div>
            <div className="lp-hero-tag">🎀 Aniversário da Loja</div>

            <div style={{ marginBottom: 4 }}>
              <span className="lp-hero-tagline script">Aniversário</span>
              <br />
              <span style={{ display: 'flex', alignItems: 'baseline', gap: 12 }}>
                <span className="lp-hero-num">9</span>
                <span className="script" style={{ fontSize: '2.5rem', color: 'var(--text)', fontWeight: 600 }}>da Loja</span>
              </span>
            </div>

            <div className="lp-clube-text">
              &amp; <span style={{ color: 'var(--pink)' }}>Clube das Mamães</span> 💕
            </div>

            <div className="lp-hero-card" style={{ marginTop: 32 }}>
              <h3>🤰 Cuidando de quem já cuida de alguém!</h3>
              <p>Benefícios especiais para essa fase tão especial da sua vida. Cadastre-se gratuitamente e tenha acesso a vantagens exclusivas para gestantes.</p>
              <div className="lp-benefit-chips">
                <span className="lp-chip">🏷️ Descontos exclusivos</span>
                <span className="lp-chip">🎁 Brindes especiais</span>
                <span className="lp-chip">🎫 Cupons de sorteio</span>
              </div>
            </div>

            <div style={{ marginTop: 28, display: 'flex', gap: 14, flexWrap: 'wrap' }}>
              <a href="#cadastro" className="lp-cta-primary">
                💝 Participar Agora
              </a>
              <a href="#premio" style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                padding: '16px 28px', background: 'rgba(255,255,255,0.7)',
                backdropFilter: 'blur(10px)', border: '1.5px solid rgba(230,0,126,0.2)',
                borderRadius: 100, fontWeight: 600, fontSize: '0.95rem',
                color: 'var(--text)', textDecoration: 'none', transition: 'all 0.3s'
              }}>
                🎁 Ver o Prêmio
              </a>
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="lp-hero-illus">
            <div className="lp-balloons">🎈🎈</div>
            <img src={heroIllus} alt="Ilustração Xikita 9 anos" className="lp-hero-illus" style={{ width: '100%', maxWidth: 420, borderRadius: 32, boxShadow: '0 40px 80px rgba(58,42,60,0.18)' }} />
          </div>
        </div>
      </section>

      {/* ── DATAS DA CAMPANHA ── */}
      <section className="lp-dates">
        <div className="lp-section-head" style={{ marginBottom: 24 }}>
          <span className="script" style={{ fontSize: '2rem', color: 'white', display: 'block' }}>Momentos especiais na loja</span>
          <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.95rem' }}>Café preparado com carinho para as nossas mamães 🍵</p>
        </div>
        <div className="lp-dates-grid">
          {[
            { day: '07', month: 'Maio', label: 'Quarta-feira' },
            { day: '08', month: 'Maio', label: '🌸 Dia das Mães' },
            { day: '09', month: 'Maio', label: 'Sorteio ao vivo!' },
          ].map(d => (
            <div key={d.day} className="lp-date-card">
              <div className="lp-date-day">{d.day}</div>
              <div style={{ fontSize: '0.9rem', fontWeight: 700, opacity: 0.9 }}>{d.month}</div>
              <div className="lp-date-label">{d.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── COMO FUNCIONA ── */}
      <section className="lp-steps">
        <div className="lp-section-head">
          <span className="lp-section-label">Passo a passo</span>
          <h2 className="lp-section-title">Como participar é <span className="script">simples assim!</span></h2>
        </div>
        <div className="lp-steps-grid">
          {[
            {
              icon: '📝',
              title: '1. Cadastre-se Grátis',
              desc: 'Preencha o formulário abaixo e entre para o Clube das Mamães. Rápido e gratuito!',
            },
            {
              icon: '🛍️',
              title: '2. Compre na Xikita',
              desc: 'A cada R$ 100,00 em compras você ganha 1 cupom para o sorteio. Quanto mais comprar, mais chances!',
            },
            {
              icon: '🏆',
              title: '3. Concorra ao Kit Buba Care',
              desc: 'Sorteio ao vivo nas nossas redes sociais no dia 09 de Maio. Seus cupons chegam no WhatsApp!',
            },
          ].map((s, i) => (
            <div key={i} className="lp-step-card">
              <span className="lp-step-num">{i + 1}</span>
              <span className="lp-step-icon">{s.icon}</span>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── PRÊMIO ── */}
      <section id="premio" className="lp-prize">
        <div className="lp-prize-inner">
          <div>
            <img src={kitImg} alt="Kit Buba Care" className="lp-kit-img" />
          </div>
          <div>
            <span className="lp-section-label">O Prêmio</span>
            <h2 className="lp-section-title" style={{ marginBottom: 8 }}>
              Kit de Higiene<br /><span className="script">Buba Care Premium</span> 🧴
            </h2>
            <p style={{ color: 'var(--muted)', marginBottom: 24, fontSize: '0.95rem' }}>
              Um kit completo com os melhores produtos da Buba, pensados com muito carinho para cuidar do seu bebê nos primeiros meses de vida.
            </p>
            <div className="lp-kit-items">
              {[
                { icon: '🧴', name: 'Shampoo suave', desc: 'Para cabelos macios e saudáveis' },
                { icon: '✨', name: 'Condicionador', desc: 'Desembaraça e leave-in natural' },
                { icon: '🛡️', name: 'Pomada de assadura', desc: 'Proteção total para a pele do bebê' },
                { icon: '💧', name: 'Hidratante', desc: 'Mantém a pele bem nutrida' },
                { icon: '🫧', name: 'Sabonete líquido', desc: 'Delicado e pH neutro' },
                { icon: '🍼', name: 'Garrafinha', desc: 'Hidratação para qualquer hora' },
              ].map(item => (
                <div key={item.name} className="lp-kit-item">
                  <div className="lp-kit-item-icon">{item.icon}</div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '0.88rem' }}>{item.name}</div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--muted)' }}>{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CADASTRO ── */}
      <section id="cadastro" className="lp-form-section">
        <div className="lp-section-head">
          <span className="lp-section-label">Cadastro gratuito</span>
          <h2 className="lp-section-title">Participe do <span className="script" style={{ color: 'var(--pink)' }}>Clube das Mamães!</span></h2>
          <p style={{ color: 'var(--muted)', marginTop: 10, fontSize: '0.95rem' }}>
            Preencha seus dados abaixo. Seus cupons começam a valer após a 1ª compra na loja.
          </p>
        </div>

        <div className="lp-form-box">
          <div className="lp-form-title">Faça seu Cadastro 💝</div>
          <p className="lp-form-sub">Grátis. Confirmação imediata por WhatsApp.</p>

          <form onSubmit={handleSubmit}>
            <div className="lp-field">
              <label>👤 Seu Nome Completo *</label>
              <input required type="text" placeholder="Ex: Maria Oliveira"
                value={form.name} onChange={e => set('name', e.target.value)} />
            </div>

            <div className="lp-field">
              <label>📱 Seu WhatsApp *</label>
              <input required type="tel" placeholder="(xx) xxxxx-xxxx"
                value={form.whatsapp} onChange={e => set('whatsapp', e.target.value)} />
            </div>

            <div className="lp-field">
              <label>🤰 Tempo de Gestação</label>
              <select value={form.gestationTime} onChange={e => set('gestationTime', e.target.value)}>
                <option value="">Selecione...</option>
                <option value="1a3">1 a 3 meses</option>
                <option value="4a6">4 a 6 meses</option>
                <option value="7a9">7 a 9 meses</option>
              </select>
            </div>

            <div className="lp-field">
              <label>👶 É seu primeiro bebê?</label>
              <div className="lp-radio-row">
                {['Sim', 'Não'].map(o => (
                  <label key={o} className="lp-radio-pill">
                    <input type="radio" name="first" value={o} checked={form.isFirstBaby === o} onChange={() => set('isFirstBaby', o)} />
                    {o}
                  </label>
                ))}
              </div>
            </div>

            <div className="lp-field">
              <label>🧺 Já começou a montar o enxoval?</label>
              <div className="lp-radio-row">
                {['Sim', 'Não', 'Já finalizei'].map(o => (
                  <label key={o} className="lp-radio-pill">
                    <input type="radio" name="enxoval" value={o} checked={form.startedLayette === o} onChange={() => set('startedLayette', o)} />
                    {o}
                  </label>
                ))}
              </div>
            </div>

            <button type="submit" className="lp-btn-send" disabled={loading}>
              {loading ? '⏳ Enviando seu cadastro...' : '💌 Confirmar Participação'}
            </button>
            <p className="lp-privacy">🔒 Seus dados são protegidos e não serão compartilhados com terceiros.</p>
          </form>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="lp-footer">
        <div style={{ fontSize: '1.4rem', marginBottom: 8 }}>💛</div>
        <p><strong>XIKITA MODA INFANTIL</strong></p>
        <p>9 Anos cuidando das famílias com amor e carinho</p>
        <p style={{ marginTop: 12 }}>
          <a href="https://instagram.com/loja_xikita" target="_blank" rel="noreferrer">📷 @loja_xikita</a>
          &nbsp;&nbsp;|&nbsp;&nbsp;
          Sorteio: <strong>09 de Maio de 2025</strong> nas redes sociais
        </p>
        <p style={{ marginTop: 16, fontSize: '0.78rem', opacity: 0.5 }}>
          © 2025 Xikita Moda Infantil · Todos os direitos reservados
        </p>
      </footer>
    </div>
  );
}
