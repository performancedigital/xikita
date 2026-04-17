import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { sendConfirmation } from '../services/evolutionApi';
import logoImg from '../assets/logo.png';
import heroBanner from '../assets/hero-banner.png';
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
      {/* ── 1. NAV — apenas logo, sem badge ── */}
      <nav className="lp-nav">
        <div className="lp-nav-logo">
          {/* Apenas a logo, sem badge "9 ANOS" */}
          <img src={logoImg} alt="Xikita Moda Infantil" style={{ height: 44, objectFit: 'contain' }} />
        </div>
        <a href="https://instagram.com/loja_xikita" target="_blank" rel="noreferrer"
          style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.85rem', fontWeight: 600, color: 'var(--pink)', textDecoration: 'none' }}>
          📷 @loja_xikita
        </a>
      </nav>

      {/* ── 2. HERO — Banner largo integrado ── */}
      <section style={{ position: 'relative', overflow: 'hidden' }}>
        {/* Banner wide como fundo */}
        <img
          src={heroBanner}
          alt="Campanha Xikita 9 Anos — Clube das Mamães"
          style={{ width: '100%', display: 'block', maxHeight: 520, objectFit: 'cover', objectPosition: 'center top' }}
        />
        {/* CTAs sobre o banner */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0,
          background: 'linear-gradient(to top, rgba(250,218,221,0.98) 0%, transparent 100%)',
          padding: '40px 40px 32px',
          display: 'flex', justifyContent: 'center', gap: 16, flexWrap: 'wrap',
        }}>
          <a href="#cadastro" className="lp-cta-primary">💝 Participar Agora</a>
          <a href="#premio" style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            padding: '15px 28px', background: 'rgba(255,255,255,0.85)',
            backdropFilter: 'blur(10px)', border: '1.5px solid rgba(230,0,126,0.18)',
            borderRadius: 100, fontWeight: 600, fontSize: '0.9rem',
            color: 'var(--text)', textDecoration: 'none', transition: 'all 0.3s',
            boxShadow: '0 4px 16px rgba(0,0,0,0.06)',
          }}>
            🎁 Ver o Prêmio
          </a>
        </div>
      </section>

      {/* ── Info card abaixo do banner ── */}
      <section style={{ background: 'var(--pink-light)', padding: '32px 24px' }}>
        <div style={{ maxWidth: 780, margin: '0 auto' }}>
          {/* Card principal — sem "única" → "especial" */}
          <div className="lp-hero-card" style={{ margin: '0 0 20px' }}>
            <h3>🤰 Cuidando de quem já cuida de alguém!</h3>
            <p>Benefícios especiais para essa fase <strong>especial</strong> da sua vida. Cadastre-se e tenha acesso a vantagens exclusivas para gestantes.</p>
          </div>
          {/* 3 benefícios — faixa flat, sem parecer botão */}
          <div style={{
            display: 'flex', flexWrap: 'wrap', gap: 0,
            background: 'rgba(255,255,255,0.6)', borderRadius: 16,
            overflow: 'hidden', border: '1px solid rgba(230,0,126,0.12)',
          }}>
            {[
              { icon: '🏷️', text: 'Descontos exclusivos' },
              { icon: '🎁', text: 'Brindes especiais' },
              { icon: '🎫', text: 'Cupons de sorteio' },
            ].map((item, i) => (
              <div key={i} style={{
                flex: '1 1 140px', padding: '14px 20px',
                display: 'flex', alignItems: 'center', gap: 10,
                fontSize: '0.88rem', fontWeight: 600, color: 'var(--text)',
                borderRight: i < 2 ? '1px solid rgba(230,0,126,0.1)' : 'none',
              }}>
                <span style={{ fontSize: 18 }}>{item.icon}</span>
                <span>{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. DATAS — corrigidas ── */}
      <section className="lp-dates">
        <div style={{ textAlign: 'center', marginBottom: 28 }}>
          <div className="script" style={{ fontSize: 'clamp(1.6rem, 4vw, 2.4rem)', color: 'white', marginBottom: 8 }}>
            Momentos especiais na loja
          </div>
          {/* Frase em destaque conforme anotação */}
          <div style={{
            background: 'rgba(255,255,255,0.22)', backdropFilter: 'blur(8px)',
            border: '1px solid rgba(255,255,255,0.35)', borderRadius: 100,
            padding: '9px 24px', display: 'inline-block',
            color: 'white', fontWeight: 700, fontSize: '0.95rem',
          }}>
            ☕ Café preparado com carinho para as nossas mamães
          </div>
          <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.82rem', marginTop: 10 }}>
            A campanha começa hoje e vai até 09 de Maio. Cadastre-se agora!
          </p>
        </div>

        {/* Cards de datas — corrigidos e com texto breve integrado */}
        <div className="lp-dates-grid">
          {[
            {
              day: '07', month: 'Maio', weekday: 'Quinta-feira', icon: '☕',
              text: 'Café especial para mamães na loja',
            },
            {
              day: '08', month: 'Maio', weekday: 'Sexta-feira', icon: '🌸',
              text: 'Dia das Mães — venha comemorar conosco',
            },
            {
              day: '09', month: 'Maio', weekday: 'Sábado', icon: '🏆',
              // Sorteio às 12h (não 17h), sem "ao vivo", + redes sociais
              text: 'Sorteio às 12h em nossas redes sociais!',
              highlight: true,
            },
          ].map(d => (
            <div key={d.day} className="lp-date-card"
              style={d.highlight ? { background: 'rgba(255,255,255,0.28)', border: '2px solid rgba(255,255,255,0.6)' } : {}}>
              <div style={{ fontSize: 24, marginBottom: 4 }}>{d.icon}</div>
              <div className="lp-date-day">{d.day}</div>
              <div style={{ fontSize: '0.9rem', fontWeight: 700, opacity: 0.95 }}>{d.month}</div>
              {/* Dia da semana em destaque */}
              <div style={{
                background: 'rgba(255,255,255,0.2)', borderRadius: 100,
                padding: '3px 12px', fontSize: '0.75rem', fontWeight: 700,
                color: 'white', margin: '6px auto', display: 'inline-block',
              }}>
                {d.weekday}
              </div>
              <div style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.85)', marginTop: 4, lineHeight: 1.4 }}>
                {d.text}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── 4. COMO FUNCIONA — título corrigido ── */}
      <section className="lp-steps">
        <div className="lp-section-head">
          <span className="lp-section-label">Passo a passo</span>
          {/* Título: "Como participar?" + "É simples assim!" em rosa cursivo na mesma linha */}
          <h2 style={{
            fontSize: 'clamp(1.7rem, 4vw, 2.4rem)',
            fontWeight: 800, lineHeight: 1.15, color: 'var(--text)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap', gap: 8,
          }}>
            Como participar?&nbsp;
            <span className="script" style={{ color: 'var(--pink)', fontSize: '1.15em', fontWeight: 600 }}>
              É simples assim!
            </span>
          </h2>
          {/* OBS — dias do café */}
          <p style={{ color: 'var(--muted)', fontSize: '0.82rem', marginTop: 10, fontStyle: 'italic' }}>
            *** Obs: Dias 07, 08 e 09 é o café especial. A ação começa hoje e vai até 09 de Maio.
          </p>
        </div>

        <div className="lp-steps-grid">
          {[
            {
              icon: '📝',
              title: '1. Cadastre-se Grátis',
              desc: 'Preencha o formulário abaixo e entre para o Clube das Mamães. Rápido e totalmente gratuito!',
            },
            {
              icon: '🛍️',
              title: '2. Compre na Xikita',
              // Texto corrigido conforme anotação
              desc: 'Após realizar seu cadastro no clube, a cada R$ 100,00 em compras = 1 cupom para o nosso sorteio. Quanto mais você comprar, mais chances de ganhar!',
            },
            {
              icon: '🏆',
              // Título e texto corrigidos conforme anotação
              title: '3. Sorteio — 09/05 em nossas redes sociais.',
              desc: 'Acompanhe o sorteio em nossas redes sociais. Seus números serão enviados pelo WhatsApp após cada compra conforme as regras!',
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

      {/* ── 5. PRÊMIO — paleta branco + verde-água, sem emoji no título ── */}
      <section id="premio" style={{ padding: '80px 20px', background: '#F0FDF9' }}>
        <div style={{
          maxWidth: 1000, margin: '0 auto',
          display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: 56, alignItems: 'center',
        }}>
          <div>
            <img src={kitImg} alt="Kit Buba Care — Prêmio Xikita" style={{
              width: '100%', borderRadius: 24,
              boxShadow: '0 32px 64px rgba(0,100,80,0.12)',
            }} />
          </div>
          <div>
            {/* Label em verde-água */}
            <span style={{
              display: 'inline-block', fontSize: '0.72rem', fontWeight: 800,
              letterSpacing: 2.5, textTransform: 'uppercase',
              color: '#0D9488', background: 'rgba(13,148,136,0.1)',
              padding: '5px 14px', borderRadius: 100, marginBottom: 14,
            }}>
              O Prêmio
            </span>
            {/* Título sem emoji, sem "Premium" — só o nome */}
            <h2 style={{ fontSize: 'clamp(1.7rem,4vw,2.4rem)', fontWeight: 800, lineHeight: 1.15, color: '#134E4A', marginBottom: 8 }}>
              Kit de Higiene<br />
              <span className="script" style={{ color: '#0D9488', fontSize: '1.2em' }}>Buba Care</span>
            </h2>
            <p style={{ color: '#5F9EA0', marginBottom: 24, fontSize: '0.95rem', lineHeight: 1.7 }}>
              Um kit completo com os melhores produtos da Buba, pensados com muito carinho para cuidar do seu bebê nos primeiros meses de vida.
            </p>
            {/* Items em verde-água */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[
                { icon: '🧴', name: 'Shampoo suave', desc: 'Para cabelos sempre macios e saudáveis' },
                { icon: '✨', name: 'Condicionador', desc: 'Desembaraça e leave-in natural' },
                { icon: '🛡️', name: 'Pomada de assadura', desc: 'Proteção total para a pele do bebê' },
                { icon: '💧', name: 'Hidratante', desc: 'Mantém a pele bem nutrida e protegida' },
                { icon: '🫧', name: 'Sabonete líquido', desc: 'Delicado, ideal para a pele sensível' },
                { icon: '🍼', name: 'Garrafinha', desc: 'Hidratação em qualquer momento' },
              ].map(item => (
                <div key={item.name} style={{
                  display: 'flex', alignItems: 'center', gap: 14,
                  background: 'white', border: '1.5px solid rgba(13,148,136,0.12)',
                  borderRadius: 14, padding: '12px 16px',
                  boxShadow: '0 2px 8px rgba(13,148,136,0.06)',
                }}>
                  <div style={{
                    width: 36, height: 36, borderRadius: 10,
                    background: 'rgba(13,148,136,0.08)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 18, flexShrink: 0,
                  }}>{item.icon}</div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '0.88rem', color: '#134E4A' }}>{item.name}</div>
                    <div style={{ fontSize: '0.78rem', color: '#5F9EA0' }}>{item.desc}</div>
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
            Preencha seus dados. Após o cadastro você recebe confirmação no WhatsApp. Cupons enviados automaticamente após cada compra. 📱
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

            {/* Info sobre cupons / sorteio — 12h */}
            <div style={{
              background: 'rgba(230,0,126,0.05)', border: '1px dashed rgba(230,0,126,0.22)',
              borderRadius: 14, padding: 16, marginBottom: 16,
            }}>
              <p style={{ fontSize: '0.82rem', color: 'var(--text)', fontWeight: 600, marginBottom: 4 }}>
                🎫 Como funciona o cupom?
              </p>
              <p style={{ fontSize: '0.8rem', color: 'var(--muted)', lineHeight: 1.7 }}>
                Após se cadastrar, realize compras na loja.<br />
                A cada <strong>R$ 100 em compras</strong> = <strong>1 cupom</strong> enviado no WhatsApp.<br />
                Sorteio: <strong>09/05 às 12h</strong> em nossas redes sociais.
              </p>
            </div>

            <button type="submit" className="lp-btn-send" disabled={loading}>
              {loading ? '⏳ Enviando...' : '💌 Confirmar Participação'}
            </button>
            <p className="lp-privacy">🔒 Seus dados são protegidos. Não os compartilhamos com terceiros.</p>
          </form>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="lp-footer">
        <div style={{ fontSize: '1.6rem', marginBottom: 8 }}>💛</div>
        <p><strong>XIKITA MODA INFANTIL</strong></p>
        <p>9 Anos cuidando das famílias com amor e carinho</p>
        <p style={{ marginTop: 10 }}>
          <a href="https://instagram.com/loja_xikita" target="_blank" rel="noreferrer">📷 @loja_xikita</a>
          &nbsp;&nbsp;|&nbsp;&nbsp;
           🏆 Sorteio: <strong>09 de Maio às 12h</strong> em nossas redes sociais
        </p>
        <div style={{ marginTop: 20, paddingTop: 16, borderTop: '1px solid rgba(255,255,255,0.08)', fontSize: '0.78rem', display: 'flex', justifyContent: 'center', gap: 24, flexWrap: 'wrap' }}>
          <span style={{ opacity: 0.4 }}>© 2025 Xikita Moda Infantil</span>
          <a href="/admin" style={{ color: 'rgba(255,255,255,0.35)', textDecoration: 'none', fontSize: '0.75rem' }}>
            🔐 Painel Admin
          </a>
        </div>
      </footer>
    </div>
  );
}
