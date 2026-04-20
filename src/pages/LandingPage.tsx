import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { sendConfirmation } from '../services/evolutionApi';
import logoImg from '../assets/logo.png';
import heroBanner from '../assets/hero-banner-new.png';
import kitImg from '../assets/kit-real-v2.jpg';

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
          <img src={logoImg} alt="Xikita Moda Infantil" style={{ height: 60, objectFit: 'contain' }} />
        </div>
        <a href="https://instagram.com/loja_xikita" target="_blank" rel="noreferrer"
          style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.85rem', fontWeight: 600, color: 'var(--pink)', textDecoration: 'none' }}>
          📷 @loja_xikita
        </a>
      </nav>

      {/* ── 2. HERO — Banner Full Width ── */}
      <section className="lp-hero-banner-container">
        {/* Floating hearts */}
        <div className="hearts">
          {['5%','15%','25%','40%','55%','68%','80%','92%'].map((left, i) => (
            <span key={left} className="heart"
              style={{ left, top: `${5 + (i * 12) % 80}%`, animationDelay: `${i * 0.8}s`, fontSize: `${12 + (i % 3) * 6}px` }}>
              🤍
            </span>
          ))}
        </div>
        
        <img src={heroBanner} alt="Aniversário Xikita 9 Anos" className="lp-hero-banner-img" />
      </section>

      {/* ── 3. CARD DE BENEFÍCIOS (ABAIXO DO BANNER) ── */}
      <div className="lp-hero-card-container">
        <div className="lp-hero-card-floating">
          <h3>🤱 Cuidando de quem já cuida de alguém!</h3>
          <p>
            Benefícios especiais para essa fase especial da sua vida. <br />
            Cadastre-se e ganhe acesso a vantagens exclusivas para gestantes.
          </p>
          
          <div className="lp-benefits-row">
            <span className="lp-benefit-item">🏷️ Descontos exclusivos</span>
            <span className="lp-benefit-item">🎁 Brindes e mimos</span>
            <span className="lp-benefit-item">🎫 Cupons de sorteio</span>
          </div>

          <div className="lp-hero-actions">
            <a href="#cadastro" className="lp-btn-pill-pink">❤️ Participar Agora</a>
            <a href="#premio" className="lp-btn-pill-white">🎁 Ver o Prêmio</a>
          </div>
        </div>
      </div>

      {/* ── DATAS — Atualizado conforme imagem ── */}
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
        </div>
        
        <div className="lp-dates-grid">
          {[
            { day: '07', month: 'Maio', label: 'Quinta', icon: '☕', desc: 'CAFÉ ESPECIAL, ATENDIMENTO VIP PARA MAMÃES' },
            { day: '08', month: 'Maio', label: 'Sexta', icon: '💐', desc: 'CAFÉ ESPECIAL, ATENDIMENTO VIP PARA MAMÃES' },
            { day: '09', month: 'Maio', label: 'Sábado', icon: '🏆', desc: 'CAFÉ ESPECIAL, ATENDIMENTO VIP & SORTEIO 12:00h', highlight: true },
          ].map(d => (
            <div key={d.day} className="lp-date-card" style={d.highlight ? { background: 'rgba(255,255,255,0.28)', border: '2px solid rgba(255,255,255,0.6)', minWidth: 220 } : { minWidth: 220 }}>
              <div style={{ fontSize: 24, marginBottom: 8 }}>{d.icon}</div>
              <div className="lp-date-day">{d.day}</div>
              <div style={{ fontSize: '0.9rem', fontWeight: 700, opacity: 0.95 }}>{d.month}</div>
              <div className="lp-date-label" style={{ fontWeight: 800, marginTop: 8 }}>{d.label}</div>
              <div style={{ fontSize: '0.75rem', opacity: 0.9, marginTop: 8, lineHeight: 1.4, fontWeight: 600 }}>{d.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── COMO FUNCIONA ── */}
      <section className="lp-steps">
        <div className="lp-section-head">
          <span className="lp-section-label">Passo a passo</span>
          <h2 className="lp-section-title">Como participar? <span className="script" style={{ color: 'var(--pink)' }}>É simples assim!</span></h2>
        </div>
        <div className="lp-steps-grid">
          {[
            { icon: '📝', title: '1. Cadastre-se Grátis', desc: 'Preencha o formulário abaixo e entre para o Clube das Mamães. Rápido e totalmente gratuito!' },
            { icon: '🛍️', title: '2. Compre na Xikita', desc: 'A cada R$ 100,00 em compras = 1 cupom para o nosso sorteio. Quanto mais você comprar, mais chances de ganhar!' },
            { icon: '🏆', title: '3. Sorteio - 09/05 em nossas redes', desc: 'Acompanhe o sorteio em nossas redes sociais às 12h. Seus números serão enviados pelo WhatsApp após cada compra!' },
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

      {/* ── 4. PRÊMIO — Nova imagem do kit ── */}
      <section id="premio" className="lp-prize">
        <div className="lp-prize-inner">
          <div>
            <img src={kitImg} alt="Kit de Higiene Buba Care — Prêmio Xikita" className="lp-kit-img" />
          </div>
          <div>
            <span className="lp-section-label" style={{ color: '#00897B' }}>O Prêmio</span>
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
            Preencha seus dados abaixo. Após o cadastro você recebe confirmação no WhatsApp.📱
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

            <div style={{
              background: 'rgba(230,0,126,0.05)', border: '1px dashed rgba(230,0,126,0.25)',
              borderRadius: 14, padding: 16, marginBottom: 16, marginTop: 4,
            }}>
              <p style={{ fontSize: '0.82rem', color: 'var(--text)', fontWeight: 600, marginBottom: 4 }}> 🎫 Como funciona o cupom? </p>
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

      {/* ── 5. FOOTER — Logo idêntica ao cabeçalho ── */}
      <footer className="lp-footer">
        <div style={{ marginBottom: 20 }}>
          <img src={logoImg} alt="Xikita Moda Infantil" style={{ height: 80, objectFit: 'contain', filter: 'brightness(0) invert(1)', opacity: 0.8 }} />
        </div>
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
