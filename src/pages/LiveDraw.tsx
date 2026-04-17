import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import confetti from 'canvas-confetti';

interface Lead {
  id: number;
  name: string;
  whatsapp: string;
  coupons: string[];
  totalSpent: number;
}

type DrawMode = 'coupon' | 'random';

export default function LiveDraw() {
  const navigate = useNavigate();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [mode, setMode] = useState<DrawMode>('random');

  // Random draw
  const [isSpinning, setIsSpinning] = useState(false);
  const [displayedCoupon, setDisplayedCoupon] = useState('XK-??????');
  const [winner, setWinner] = useState<{ lead: Lead; coupon: string } | null>(null);

  // Coupon lookup
  const [couponInput, setCouponInput] = useState('');
  const [lookupResult, setLookupResult] = useState<{ lead: Lead; coupon: string } | null>(null);
  const [lookupError, setLookupError] = useState('');

  const spinRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (!sessionStorage.getItem('xikita_admin')) { navigate('/admin'); return; }
    const saved = JSON.parse(localStorage.getItem('xikita_leads') || '[]');
    setLeads(saved.map((l: Lead) => ({ ...l, coupons: l.coupons || [], totalSpent: l.totalSpent || 0 })));
  }, [navigate]);

  const allCoupons: { lead: Lead; coupon: string }[] = leads.flatMap(l =>
    l.coupons.map(c => ({ lead: l, coupon: c }))
  );

  // ── Random Draw (animação sorteador) ──
  const startDraw = () => {
    if (allCoupons.length === 0) { alert('Nenhum cupom cadastrado ainda!'); return; }
    setWinner(null);
    setIsSpinning(true);

    let speed = 50;
    let elapsed = 0;
    const total = 4000; // 4 segundos de animação

    const tick = () => {
      const random = allCoupons[Math.floor(Math.random() * allCoupons.length)];
      setDisplayedCoupon(random.coupon);
      elapsed += speed;

      // Vai desacelerando
      if (elapsed > total * 0.6) speed = 100;
      if (elapsed > total * 0.8) speed = 220;
      if (elapsed > total * 0.92) speed = 450;

      if (elapsed >= total) {
        clearInterval(spinRef.current!);
        setIsSpinning(false);
        const final = allCoupons[Math.floor(Math.random() * allCoupons.length)];
        setDisplayedCoupon(final.coupon);
        setWinner(final);
        confetti({ particleCount: 220, spread: 100, origin: { y: 0.5 }, colors: ['#ED1C24','#E6007E','#FFF200','#00AEEF','#009543'] });
      } else {
        spinRef.current = setTimeout(tick, speed);
      }
    };

    spinRef.current = setTimeout(tick, speed);
  };

  // ── Lookup by Coupon Number ──
  const handleLookup = () => {
    const query = couponInput.trim().toUpperCase();
    setLookupError('');
    setLookupResult(null);
    if (!query) return;

    const match = allCoupons.find(e => e.coupon.toUpperCase() === query);
    if (match) {
      setLookupResult(match);
      confetti({ particleCount: 100, spread: 70, origin: { y: 0.5 }, colors: ['#E6007E','#FFF200','#00AEEF'] });
    } else {
      setLookupError(`Cupom "${query}" não encontrado. Verifique o número.`);
    }
  };

  const totalParticipants = leads.filter(l => l.coupons.length > 0).length;

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #1A1A2E 0%, #16213E 40%, #0F3460 100%)',
      fontFamily: "'Outfit', sans-serif",
      color: 'white',
      padding: '40px 20px',
    }}>
      {/* Header */}
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 40, flexWrap: 'wrap', gap: 16 }}>
          <div>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', marginBottom: 6 }}>
              XIKITA MODA INFANTIL
            </div>
            <h1 style={{ fontSize: 'clamp(1.6rem, 4vw, 2.4rem)', fontWeight: 900, lineHeight: 1.1 }}>
              🎰 Sorteio ao Vivo
            </h1>
            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem', marginTop: 4 }}>
              09 de Maio de 2025 • 17h00 • Ao vivo nas redes sociais
            </p>
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            <button onClick={() => navigate('/admin/painel')}
              style={{ background: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.7)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 12, padding: '10px 18px', cursor: 'pointer', fontFamily: 'Outfit, sans-serif', fontSize: '0.85rem', fontWeight: 600 }}>
              ← Painel Admin
            </button>
          </div>
        </div>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 16, marginBottom: 36 }}>
          {[
            { label: 'Participantes', value: totalParticipants, icon: '👥' },
            { label: 'Cupons Totais', value: allCoupons.length, icon: '🎫' },
            { label: 'Horário', value: '17h00', icon: '⏰' },
          ].map(s => (
            <div key={s.label} style={{
              background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: 16, padding: '20px 24px', textAlign: 'center',
            }}>
              <div style={{ fontSize: 24, marginBottom: 6 }}>{s.icon}</div>
              <div style={{ fontSize: '1.6rem', fontWeight: 900 }}>{s.value}</div>
              <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.5)', marginTop: 2 }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Mode selector */}
        <div style={{ display: 'flex', gap: 10, marginBottom: 28, background: 'rgba(255,255,255,0.05)', borderRadius: 14, padding: 6 }}>
          <button
            onClick={() => setMode('random')}
            style={{
              flex: 1, padding: '12px', borderRadius: 10, border: 'none', cursor: 'pointer',
              fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: '0.9rem', transition: 'all 0.2s',
              background: mode === 'random' ? 'white' : 'transparent',
              color: mode === 'random' ? '#1A1A2E' : 'rgba(255,255,255,0.5)',
            }}>
            🎲 Sorteio Aleatório
          </button>
          <button
            onClick={() => setMode('coupon')}
            style={{
              flex: 1, padding: '12px', borderRadius: 10, border: 'none', cursor: 'pointer',
              fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: '0.9rem', transition: 'all 0.2s',
              background: mode === 'coupon' ? 'white' : 'transparent',
              color: mode === 'coupon' ? '#1A1A2E' : 'rgba(255,255,255,0.5)',
            }}>
            🔍 Buscar por Cupom
          </button>
        </div>

        {/* ── MODE: RANDOM DRAW ── */}
        {mode === 'random' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>

            {/* Sorteador */}
            <div style={{
              background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: 24, padding: '40px 32px', textAlign: 'center',
            }}>
              <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.8rem', fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 24 }}>
                Número Sorteado
              </p>

              {/* Display do cupom animado */}
              <div style={{
                background: isSpinning
                  ? 'linear-gradient(135deg, #E6007E, #ED1C24)'
                  : winner
                  ? 'linear-gradient(135deg, #FFE259, #FFA751)'
                  : 'rgba(255,255,255,0.07)',
                border: `2px solid ${isSpinning ? 'rgba(230,0,126,0.5)' : winner ? 'rgba(255,193,7,0.5)' : 'rgba(255,255,255,0.1)'}`,
                borderRadius: 20, padding: '36px 24px', marginBottom: 32,
                transition: 'all 0.3s',
                boxShadow: isSpinning ? '0 0 40px rgba(230,0,126,0.4)' : winner ? '0 0 40px rgba(255,193,7,0.5)' : 'none',
              }}>
                <div style={{
                  fontFamily: 'monospace',
                  fontSize: 'clamp(1.4rem, 4vw, 2.2rem)',
                  fontWeight: 900,
                  color: winner ? '#333' : 'white',
                  letterSpacing: 3,
                  lineHeight: 1,
                  transition: 'all 0.05s',
                }}>
                  {displayedCoupon}
                </div>
                {isSpinning && (
                  <div style={{ marginTop: 12, fontSize: '0.8rem', color: 'rgba(255,255,255,0.8)', fontWeight: 600 }}>
                    🎲 Sorteando...
                  </div>
                )}
              </div>

              <button
                onClick={startDraw}
                disabled={isSpinning || allCoupons.length === 0}
                style={{
                  width: '100%', padding: '16px', border: 'none', borderRadius: 50,
                  fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: '1rem', cursor: 'pointer',
                  background: isSpinning ? 'rgba(255,255,255,0.1)' : 'linear-gradient(135deg, #E6007E, #ED1C24)',
                  color: isSpinning ? 'rgba(255,255,255,0.4)' : 'white',
                  boxShadow: isSpinning ? 'none' : '0 8px 24px rgba(230,0,126,0.5)',
                  transition: 'all 0.3s',
                }}>
                {isSpinning ? '🎰 Sorteando ao vivo...' : winner ? '🔄 Sortear Novamente' : '🎯 Iniciar Sorteio'}
              </button>
            </div>

            {/* Painel do vencedor */}
            <div>
              {winner ? (
                <div style={{
                  background: 'linear-gradient(135deg, #FFE259, #FFA751)',
                  borderRadius: 24, padding: '36px 28px', textAlign: 'center',
                  animation: 'glow 1.5s ease-in-out infinite alternate',
                }}>
                  <div style={{ fontSize: 56, marginBottom: 12 }}>🏆</div>
                  <p style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', color: '#7A4500', marginBottom: 8 }}>
                    🎉 VENCEDOR(A)!
                  </p>
                  <h2 style={{ fontSize: 'clamp(1.4rem, 4vw, 2rem)', fontWeight: 900, color: '#3A2000', lineHeight: 1.1, marginBottom: 8 }}>
                    {winner.lead.name}
                  </h2>
                  <p style={{ color: '#7A4500', fontWeight: 600, marginBottom: 20, fontSize: '0.9rem' }}>
                    📱 {winner.lead.whatsapp}
                  </p>
                  <div style={{ background: 'rgba(255,255,255,0.5)', borderRadius: 14, padding: '14px 20px', marginBottom: 16 }}>
                    <p style={{ fontSize: '0.68rem', fontWeight: 700, letterSpacing: 2, color: '#7A4500', marginBottom: 6 }}>
                      CUPOM VENCEDOR
                    </p>
                    <p style={{ fontFamily: 'monospace', fontSize: '1.4rem', fontWeight: 900, color: '#3A2000', letterSpacing: 3 }}>
                      {winner.coupon}
                    </p>
                  </div>
                  <div style={{ background: 'rgba(255,255,255,0.3)', borderRadius: 10, padding: '10px 16px' }}>
                    <p style={{ fontSize: '0.78rem', color: '#7A4500' }}>
                      Total investido: <strong>R$ {winner.lead.totalSpent.toFixed(2)}</strong> •
                      Cupons: <strong>{winner.lead.coupons.length}</strong>
                    </p>
                  </div>
                </div>
              ) : (
                <div style={{
                  background: 'rgba(255,255,255,0.04)', border: '1px dashed rgba(255,255,255,0.12)',
                  borderRadius: 24, padding: '60px 32px', textAlign: 'center',
                }}>
                  <div style={{ fontSize: 48, marginBottom: 16, opacity: 0.3 }}>🏆</div>
                  <p style={{ color: 'rgba(255,255,255,0.4)', fontWeight: 500 }}>
                    O resultado aparecerá aqui após o sorteio.
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ── MODE: COUPON LOOKUP ── */}
        {mode === 'coupon' && (
          <div style={{ maxWidth: 560, margin: '0 auto' }}>
            <div style={{
              background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: 24, padding: '40px 36px',
            }}>
              <h2 style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: 6 }}>🔍 Buscar Cupom</h2>
              <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.88rem', marginBottom: 28 }}>
                Digite o número do cupom para identificar o participante ao vivo.
              </p>

              <div style={{ display: 'flex', gap: 10, marginBottom: 20 }}>
                <input
                  type="text"
                  placeholder="Ex: XK-ABC001"
                  value={couponInput}
                  onChange={e => { setCouponInput(e.target.value.toUpperCase()); setLookupError(''); setLookupResult(null); }}
                  onKeyDown={e => e.key === 'Enter' && handleLookup()}
                  style={{
                    flex: 1, padding: '16px 20px', borderRadius: 14, border: '1.5px solid rgba(255,255,255,0.15)',
                    background: 'rgba(255,255,255,0.08)', color: 'white', fontFamily: 'monospace',
                    fontSize: '1.1rem', fontWeight: 700, outline: 'none', letterSpacing: 2,
                  }}
                />
                <button onClick={handleLookup}
                  style={{
                    padding: '16px 24px', border: 'none', borderRadius: 14, cursor: 'pointer',
                    background: 'linear-gradient(135deg, #E6007E, #ED1C24)', color: 'white',
                    fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: '0.95rem',
                    boxShadow: '0 6px 16px rgba(230,0,126,0.4)',
                  }}>
                  Buscar
                </button>
              </div>

              {lookupError && (
                <div style={{
                  background: 'rgba(237,28,36,0.1)', border: '1px solid rgba(237,28,36,0.3)',
                  borderRadius: 12, padding: '14px 18px', color: '#FF6B6B', fontSize: '0.88rem', fontWeight: 600,
                }}>
                  ❌ {lookupError}
                </div>
              )}

              {lookupResult && (
                <div style={{
                  background: 'linear-gradient(135deg, #FFE259, #FFA751)',
                  borderRadius: 20, padding: '28px 24px', textAlign: 'center',
                  animation: 'glow 1.5s ease-in-out infinite alternate',
                }}>
                  <div style={{ fontSize: 44, marginBottom: 10 }}>🎉</div>
                  <p style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: 2, color: '#7A4500', marginBottom: 10, textTransform: 'uppercase' }}>
                    Cupom localizado!
                  </p>
                  <h2 style={{ fontSize: 'clamp(1.4rem,4vw,1.9rem)', fontWeight: 900, color: '#3A2000', marginBottom: 8 }}>
                    {lookupResult.lead.name}
                  </h2>
                  <p style={{ color: '#7A4500', fontWeight: 600, marginBottom: 16 }}>
                    📱 {lookupResult.lead.whatsapp}
                  </p>
                  <div style={{ background: 'rgba(255,255,255,0.5)', borderRadius: 12, padding: '10px 16px', display: 'inline-block' }}>
                    <p style={{ fontFamily: 'monospace', fontSize: '1.3rem', fontWeight: 900, color: '#3A2000', letterSpacing: 3 }}>
                      {lookupResult.coupon}
                    </p>
                  </div>
                  <div style={{ marginTop: 14, fontSize: '0.78rem', color: '#7A4500' }}>
                    Total investido: <strong>R$ {lookupResult.lead.totalSpent.toFixed(2)}</strong> · {lookupResult.lead.coupons.length} cupons no total
                  </div>
                </div>
              )}
            </div>

            {/* Lista de todos os cupons */}
            <div style={{
              background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: 20, padding: '24px', marginTop: 24,
            }}>
              <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: 16, color: 'rgba(255,255,255,0.8)' }}>
                📋 Todos os cupons ({allCoupons.length})
              </h3>
              <div style={{ maxHeight: 320, overflowY: 'auto', display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                {allCoupons.length === 0 ? (
                  <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.85rem' }}>Nenhum cupom ainda.</p>
                ) : allCoupons.map(({ coupon, lead }) => (
                  <button key={coupon}
                    onClick={() => { setCouponInput(coupon); setLookupResult({ lead, coupon }); setLookupError(''); }}
                    title={lead.name}
                    style={{
                      fontFamily: 'monospace', fontSize: '0.75rem', fontWeight: 700,
                      padding: '6px 12px', borderRadius: 8, border: '1px solid rgba(230,0,126,0.3)',
                      background: 'rgba(230,0,126,0.08)', color: '#E6007E', cursor: 'pointer',
                      transition: 'all 0.2s',
                    }}>
                    {coupon}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes glow {
          from { box-shadow: 0 0 20px rgba(255,193,7,0.4); }
          to   { box-shadow: 0 0 60px rgba(255,193,7,0.9); }
        }
      `}</style>
    </div>
  );
}
