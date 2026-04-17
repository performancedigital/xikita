import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { sendConfirmation } from '../services/evolutionApi';
import logoImg from '../assets/logo.png';
import heroCover from '../assets/hero-cover.png';
import kitImg from '../assets/hero.png';

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
      {/* ── 1. NAV COM LOGO ── */}
      <nav className="lp-nav">
        <div className="lp-nav-logo">
          <img src={logoImg} alt="Xikita Moda Infantil" style={{ height: 44, objectFit: 'contain' }} />
          <span className="years">🎉 9 ANOS</span>
        </div>
        <a href="https://instagram.com/loja_xikita" target="_blank" rel="noreferrer"
          style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.85rem', fontWeight: 600, color: 'var(--pink)', textDecoration: 'none' }}>
          📷 @loja_xikita
        </a>
      </nav>

      {/* ── 2. HERO — capa com dizeres em português ── */}
      <section className="lp-hero" style={{ padding: 0, minHeight: 'auto' }}>
        {/* Floating hearts */}
        <div className="hearts">
          {['5%','15%','25%','40%','55%','68%','80%','92%'].map((left, i) => (
            <span key={left} className="heart"
              style={{ left, top: `${8 + (i * 10) % 65}%`, animationDelay: `${i * 0.9}s`, fontSize: `${10 + (i % 3) * 5}px` }}>
              🤍
            </span>
          ))}
        </div>

        <div style={{
          maxWidth: 1100, margin: '0 auto', display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: 0, alignItems: 'stretch', position: 'relative', zIndex: 1,
        }}>
          {/* LEFT — Texto limpo */}
          <div style={{ padding: '64px 40px 64px 48px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            {/* Tag */}
            <div className="lp-hero-tag" style={{ marginBottom: 24 }}>
              🎀 Aniversário da Loja
            </div>

            {/* 2. Título limpo — sem texto embolado */}
            <div style={{ marginBottom: 24 }}>
              <div className="script" style={{ fontSize: 'clamp(1.6rem, 4vw, 2.4rem)', color: 'var(--pink)', display: 'block', lineHeight: 1.1 }}>
                Aniversário
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: 14, marginTop: 4 }}>
                <span style={{ fontSize: 'clamp(5rem, 14vw, 9rem)', fontWeight: 900, color: 'var(--pink)', lineHeight: 0.85 }}>9</span>
                <div style={{ paddingBottom: 10 }}>
                  <div className="script" style={{ fontSize: 'clamp(1.2rem, 3vw, 2rem)', color: 'var(--text)', lineHeight: 1 }}>da Loja</div>
                  <div style={{ fontSize: 'clamp(0.75rem, 2vw, 1rem)', fontWeight: 700, color: 'var(--muted)', letterSpacing: 1 }}>MODA INFANTIL</div>
                </div>
              </div>
            </div>

            <div className="script" style={{ fontSize: 'clamp(1.3rem, 3.5vw, 2rem)', color: 'var(--text)', marginBottom: 28, opacity: 0.88 }}>
              &amp; <span style={{ color: 'var(--pink)' }}>Clube das Mamães</span> 💕
            </div>

            {/* Info card */}
            <div className="lp-hero-card">
              <h3>🤰 Cuidando de quem já cuida de alguém!</h3>
              <p>Benefícios especiais para essa fase única da sua vida. Cadastre-se e ganhe acesso a vantagens exclusivas para gestantes.</p>
              <div className="lp-benefit-chips" style={{ marginTop: 14 }}>
                <span className="lp-chip">🏷️ Descontos exclusivos</span>
                <span className="lp-chip">🎁 Brindes especiais</span>
                <span className="lp-chip">🎫 Cupons de sorteio</span>
              </div>
            </div>

            <div style={{ marginTop: 28, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <a href="#cadastro" className="lp-cta-primary">💝 Participar Agora</a>
              <a href="#premio" style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                padding: '15px 24px', background: 'rgba(255,255,255,0.75)',
                backdropFilter: 'blur(10px)', border: '1.5px solid rgba(230,0,126,0.2)',
                borderRadius: 100, fontWeight: 600, fontSize: '0.9rem',
                color: 'var(--text)', textDecoration: 'none',
              }}>
                🎁 Ver o Prêmio
              </a>
            </div>
          </div>

          {/* RIGHT — 3. Imagem da capa (em português, gerada por IA) */}
          <div style={{ position: 'relative', overflow: 'hidden' }}>
            <img
              src={heroCover}
              alt="Campanha Xikita 9 Anos — Clube das Mamães"
              style={{ width: '100%', height: '100%', minHeight: 480, objectFit: 'cover', display: 'block' }}
            />
          </div>
        </div>
      </section>

      {/* ── DATAS — com horário do sorteio ── */}
      <section className="lp-dates">
        <div style={{ textAlign: 'center', marginBottom: 28 }}>
          <div className="script" style={{ fontSize: 'clamp(1.6rem, 4vw, 2.4rem)', color: 'white', display: 'block', marginBottom: 6 }}>
            Momentos especiais na loja
          </div>
          <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '0.95rem' }}>
            Café preparado com carinho para as nossas mamães ☕
          </p>
        </div>
        <div className="lp-dates-grid">
          {[
            { day: '07', month: 'Maio', label: 'Quarta-feira', icon: '☕' },
            { day: '08', month: 'Maio', label: '🌸 Dia das Mães', icon: '💐' },
            { day: '09', month: 'Maio', label: 'Sorteio às 17h — ao vivo!', icon: '🏆', highlight: true },
          ].map(d => (
            <div key={d.day} className="lp-date-card" style={d.highlight ? { background: 'rgba(255,255,255,0.28)', border: '2px solid rgba(255,255,255,0.6)' } : {}}>
              <div style={{ fontSize: 22, marginBottom: 4 }}>{d.icon}</div>
              <div className="lp-date-day">{d.day}</div>
              <div style={{ fontSize: '0.9rem', fontWeight: 700, opacity: 0.95 }}>{d.month}</div>
              <div className="lp-date-label" style={d.highlight ? { fontWeight: 700, opacity: 1 } : {}}>{d.label}</div>
            </div>
          ))}
        </div>
        {/* 6. Sorteio ao vivo destaque */}
        <div style={{
          marginTop: 28, background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255,255,255,0.3)', borderRadius: 20, padding: '20px 32px',
          textAlign: 'center', maxWidth: 520, marginLeft: 'auto', marginRight: 'auto',
        }}>
          <p style={{ color: 'white', fontWeight: 700, fontSize: '1.1rem', marginBottom: 4 }}>
            🎰 Sorteio ao Vivo — 09/05 às 17h00
          </p>
          <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.85rem' }}>
            Transmissão ao vivo nas nossas redes sociais oficiais. Não perca!
          </p>
        </div>
      </section>

      {/* ── COMO FUNCIONA ── */}
      <section className="lp-steps">
        <div className="lp-section-head">
          <span className="lp-section-label">Passo a passo</span>
          <h2 className="lp-section-title">Como participar é <span className="script" style={{ color: 'var(--pink)' }}>simples assim!</span></h2>
        </div>
        <div className="lp-steps-grid">
          {[
            {
              icon: '📝', title: '1. Cadastre-se Grátis',
              desc: 'Preencha o formulário abaixo e entre para o Clube das Mamães. Rápido e totalmente gratuito!',
            },
            {
              icon: '🛍️', title: '2. Compre na Xikita',
              desc: 'Visite a loja nos dias 07, 08 ou 09 de Maio. A cada R$ 100 em compras = 1 cupom de sorteio. Quanto mais comprar, mais chances!',
            },
            {
              icon: '🏆', title: '3. Sorteio ao Vivo — 09/05 às 17h',
              desc: 'Sortearemos ao vivo nas nossas redes sociais. Seus números chegam pelo WhatsApp após cada compra!',
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

      {/* ── 4. PRÊMIO — com imagem real do kit ── */}
      <section id="premio" className="lp-prize">
        <div className="lp-prize-inner">
          <div>
            {/* Imagem real do kit Buba Care */}
            <img src={kitImg} alt="Kit de Higiene Buba Care — Prêmio Xikita" className="lp-kit-img" />
          </div>
          <div>
            <span className="lp-section-label">O Prêmio</span>
            <h2 className="lp-section-title" style={{ marginBottom: 8 }}>
              Kit de Higiene<br />
              <span className="script" style={{ color: 'var(--pink)' }}>Buba Care Premium</span> 🧴
            </h2>
            <p style={{ color: 'var(--muted)', marginBottom: 24, fontSize: '0.95rem', lineHeight: 1.7 }}>
              Um kit completo com os melhores produtos da Buba, pensados com muito carinho para cuidar do seu bebê nos primeiros meses de vida.
            </p>
            <div className="lp-kit-items">
              {[
                { icon: '🧴', name: 'Shampoo suave', desc: 'Para cabelos sempre macios e saudáveis' },
                { icon: '✨', name: 'Condicionador', desc: 'Desembaraça e é leave-in natural' },
                { icon: '🛡️', name: 'Pomada de assadura', desc: 'Proteção total para a pele do bebê' },
                { icon: '💧', name: 'Hidratante', desc: 'Mantém a pele bem nutrida e protegida' },
                { icon: '🫧', name: 'Sabonete líquido', desc: 'Delicado, ideal para a pele sensível' },
                { icon: '🍼', name: 'Garrafinha', desc: 'Para manter o bebê hidratado a todo momento' },
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
          <h2 className="lp-section-title">
            Participe do <span className="script" style={{ color: 'var(--pink)' }}>Clube das Mamães!</span>
          </h2>
          <p style={{ color: 'var(--muted)', marginTop: 10, fontSize: '0.95rem', maxWidth: 500, margin: '10px auto 0' }}>
            Preencha seus dados abaixo. Após o cadastro você recebe confirmação no WhatsApp. Seus cupons são enviados automaticamente após cada compra na loja. 📱
          </p>
        </div>

        <div className="lp-form-box">
          <div className="lp-form-title">Faça seu Cadastro 💝</div>
          <p className="lp-form-sub">Grátis · Confirmação imediata por WhatsApp · Cupons automáticos</p>

          <form onSubmit={handleSubmit}>
            <div className="lp-field">
              <label>👤 Seu Nome Completo *</label>
              <input required type="text" placeholder="Ex: Maria Oliveira"
                value={form.name} onChange={e => set('name', e.target.value)} />
            </div>

            <div className="lp-field">
              <label>📱 Seu WhatsApp (com DDD) *</label>
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

            {/* Destaque de como funciona o cupom */}
            <div style={{
              background: 'rgba(230,0,126,0.05)', border: '1px dashed rgba(230,0,126,0.25)',
              borderRadius: 14, padding: 16, marginBottom: 16, marginTop: 4,
            }}>
              <p style={{ fontSize: '0.82rem', color: 'var(--text)', fontWeight: 600, marginBottom: 4 }}>
                🎫 Como funciona o cupom?
              </p>
              <p style={{ fontSize: '0.8rem', color: 'var(--muted)', lineHeight: 1.6 }}>
                Após se cadastrar, vá à loja nos dias 07, 08 ou 09 de Maio.<br />
                A cada <strong>R$ 100 em compras</strong> você recebe <strong>1 cupom</strong> no WhatsApp.<br />
                Sorteio ao vivo: <strong>09/05 às 17h</strong> nas nossas redes.
              </p>
            </div>

            <button type="submit" className="lp-btn-send" disabled={loading}>
              {loading ? '⏳ Enviando seu cadastro...' : '💌 Confirmar Participação'}
            </button>
            <p className="lp-privacy">🔒 Seus dados são protegidos e não serão compartilhados com terceiros.</p>
          </form>
        </div>
      </section>

      {/* ── 5. FOOTER com link admin ── */}
      <footer className="lp-footer">
        <div style={{ fontSize: '1.6rem', marginBottom: 8 }}>💛</div>
        <p><strong>XIKITA MODA INFANTIL</strong></p>
        <p>9 Anos cuidando das famílias com amor e carinho</p>
        <p style={{ marginTop: 10 }}>
          <a href="https://instagram.com/loja_xikita" target="_blank" rel="noreferrer">📷 @loja_xikita</a>
          &nbsp;&nbsp;|&nbsp;&nbsp;
          🏆 Sorteio ao Vivo: <strong>09 de Maio às 17h00</strong>
        </p>
        <div style={{ marginTop: 20, paddingTop: 16, borderTop: '1px solid rgba(255,255,255,0.08)', fontSize: '0.78rem', display: 'flex', justifyContent: 'center', gap: 24, flexWrap: 'wrap' }}>
          <span style={{ opacity: 0.4 }}>© 2025 Xikita Moda Infantil</span>
          <a href="/admin" style={{ color: 'rgba(255,255,255,0.35)', textDecoration: 'none', fontSize: '0.75rem' }} title="Acesso Administrativo">
            🔐 Painel Admin
          </a>
        </div>
      </footer>
    </div>
  );
}
