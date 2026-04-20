import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { sendConfirmation } from '../services/evolutionApi';
import logoImg from '../assets/logo.png';
import heroCover from '../assets/hero-cover.png';
import kitImg from '../assets/kit-real.jpg';

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
            
            {/* Título limpo — harmonizado (removida a tag Aniversário da Loja e 9 ANOS do Nav) */}
            <div style={{ marginBottom: 24 }}>
              <div className="script" style={{ fontSize: 'clamp(2.4rem, 5vw, 3.5rem)', color: 'var(--pink)', display: 'block', lineHeight: 1 }}>
                Aniversário
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginTop: -5 }}>
                <span style={{ fontSize: 'clamp(5.5rem, 12vw, 8.5rem)', fontWeight: 900, color: 'var(--pink)', lineHeight: 0.85, textShadow: '0 4px 12px rgba(230,0,126,0.15)' }}>9</span>
                <div style={{ paddingTop: 10 }}>
                  <div className="script" style={{ fontSize: 'clamp(1.6rem, 4vw, 2.5rem)', color: 'var(--text)', lineHeight: 1 }}>da Loja</div>
                  <div style={{ fontSize: 'clamp(0.65rem, 1.5vw, 0.8rem)', fontWeight: 800, color: 'var(--muted)', letterSpacing: 2, marginTop: 4 }}>MODA INFANTIL</div>
                </div>
              </div>
            </div>

            <div className="script" style={{ fontSize: 'clamp(1.5rem, 3.5vw, 2.2rem)', color: 'var(--text)', marginBottom: 28, opacity: 0.88 }}>
              &amp; <span style={{ color: 'var(--pink)' }}>Clube das Mamães</span> 💕
            </div>

            {/* Info card ("fase especial" em vez de única e sem botões nos benefícios) */}
            <div className="lp-hero-card">
              <h3>🤰 Cuidando de quem já cuida de alguém!</h3>
              <p>Benefícios especiais para essa fase especial da sua vida. Cadastre-se e ganhe acesso a vantagens exclusivas para gestantes.</p>
              <div style={{ marginTop: 16, display: 'flex', flexWrap: 'wrap', gap: '16px', color: 'var(--text)', fontSize: '0.9rem', fontWeight: 600 }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}><span style={{ color: 'var(--pink)' }}>🏷️</span> Descontos exclusivos</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}><span style={{ color: 'var(--pink)' }}>🎁</span> Brindes e mimos</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}><span style={{ color: 'var(--pink)' }}>🎫</span> Cupons de sorteio</span>
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

          {/* RIGHT — Imagem da capa integrante com blend na lateral */}
          <div style={{ position: 'relative', overflow: 'hidden' }}>
            <img
              src={heroCover}
              alt="Campanha Xikita 9 Anos — Clube das Mamães"
              style={{ width: '100%', height: '100%', minHeight: 480, objectFit: 'cover', display: 'block', WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 10%)', maskImage: 'linear-gradient(to right, transparent 0%, black 10%)' }}
            />
          </div>
        </div>
      </section>

      {/* ── DATAS — com horário do sorteio ajustado e unificadas ── */}
      <section className="lp-dates">
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div className="script" style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', color: 'white', display: 'block', marginBottom: 16 }}>
            Momentos especiais na loja
          </div>
          <div style={{ background: 'rgba(255,255,255,0.2)', padding: '12px 24px', borderRadius: 100, display: 'inline-block' }}>
            <p style={{ color: 'white', fontSize: '1rem', fontWeight: 600 }}>
              De hoje até o dia 09 de Maio: Ação de cadastro e cupons!
            </p>
          </div>
          <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '0.95rem', marginTop: 16 }}>
            Dias 07, 08 e 09: Café preparado com carinho para as nossas mamães ☕
          </p>
        </div>
        
        {/* Ajuste nos dias da semana e na hora do sorteio */}
        <div className="lp-dates-grid">
          {[
            { day: '07', month: 'Maio', label: 'Quinta', icon: '☕', desc: 'Café especial' },
            { day: '08', month: 'Maio', label: 'Sexta', icon: '💐', desc: 'Dia das Mães' },
            { day: '09', month: 'Maio', label: 'Sábado', icon: '🏆', desc: 'Sorteio às 12h00', highlight: true },
          ].map(d => (
            <div key={d.day} className="lp-date-card" style={d.highlight ? { background: 'rgba(255,255,255,0.28)', border: '2px solid rgba(255,255,255,0.6)' } : {}}>
              <div style={{ fontSize: 24, marginBottom: 8 }}>{d.icon}</div>
              <div className="lp-date-day">{d.day}</div>
              <div style={{ fontSize: '0.9rem', fontWeight: 700, opacity: 0.95 }}>{d.month}</div>
              <div className="lp-date-label" style={{ fontWeight: 800, marginTop: 8 }}>{d.label}</div>
              <div style={{ fontSize: '0.8rem', opacity: 0.9, marginTop: 4 }}>{d.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── COMO FUNCIONA ── */}
      <section className="lp-steps">
        <div className="lp-section-head">
          <span className="lp-section-label">Passo a passo</span>
          {/* Interrogação inserida + parte em rosa */}
          <h2 className="lp-section-title">Como participar? <span className="script" style={{ color: 'var(--pink)' }}>É simples assim!</span></h2>
        </div>
        <div className="lp-steps-grid">
          {[
            {
              icon: '📝', title: '1. Cadastre-se Grátis',
              desc: 'Preencha o formulário abaixo e entre para o Clube das Mamães. Rápido e totalmente gratuito!',
            },
            {
              icon: '🛍️', title: '2. Compre na Xikita',
              desc: 'Após realizar seu cadastro no clube, a cada R$ 100,00 em compras = 1 cupom para o nosso sorteio. Quanto mais você comprar, mais chances de ganhar! (A ação começa de hoje até o dia 09 de maio).',
            },
            {
              icon: '🏆', title: '3. Sorteio - 09/05 em nossas redes',
              desc: 'Acompanhe o sorteio em nossas redes sociais às 12h. Seus números serão enviados pelo WhatsApp após cada compra conforme as regras!',
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

      {/* ── 4. PRÊMIO — Cores harmonizadas Verde Água ── */}
      <section id="premio" className="lp-prize">
        <div className="lp-prize-inner">
          <div>
            {/* Imagem real do kit Buba Care */}
            <img src={kitImg} alt="Kit de Higiene Buba Care — Prêmio Xikita" className="lp-kit-img" />
          </div>
          <div>
            <span className="lp-section-label" style={{ color: '#00897B' }}>O Prêmio</span>
            {/* Removido o "Premium" */}
            <h2 className="lp-section-title" style={{ marginBottom: 8, color: '#00695C' }}>
              Kit de Higiene<br />
              <span className="script" style={{ color: '#00897B' }}>Buba Care</span>
            </h2>
            <p style={{ color: '#004D40', marginBottom: 24, fontSize: '0.95rem', lineHeight: 1.7, opacity: 0.8 }}>
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
                <div key={item.name} className="lp-kit-item" style={{ background: 'rgba(255,255,255,0.7)', border: '1.5px solid rgba(255,255,255,0.9)' }}>
                  <div className="lp-kit-item-icon" style={{ background: 'rgba(0,137,123,0.1)', color: '#00695C' }}>{item.icon}</div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '0.88rem', color: '#004D40' }}>{item.name}</div>
                    <div style={{ fontSize: '0.78rem', color: '#00695C', opacity: 0.8 }}>{item.desc}</div>
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

            {/* Destaque de como funciona o cupom com o sorteio as 12h */}
            <div style={{
              background: 'rgba(230,0,126,0.05)', border: '1px dashed rgba(230,0,126,0.25)',
              borderRadius: 14, padding: 16, marginBottom: 16, marginTop: 4,
            }}>
              <p style={{ fontSize: '0.82rem', color: 'var(--text)', fontWeight: 600, marginBottom: 4 }}>
                🎫 Como funciona o cupom?
              </p>
              <p style={{ fontSize: '0.8rem', color: 'var(--muted)', lineHeight: 1.6 }}>
                Faça suas compras na loja até o dia 09 de Maio.<br />
                A cada <strong>R$ 100 em compras</strong> você recebe <strong>1 cupom</strong> no WhatsApp.<br />
                Sorteio: <strong>09/05 às 12h00</strong> em nossas redes sociais.
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
          🏆 Sorteio em nossas redes sociais: <strong>09 de Maio às 12h00</strong>
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
