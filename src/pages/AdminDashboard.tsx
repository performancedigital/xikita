import { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { useNavigate } from 'react-router-dom';
import { sendCoupons } from '../services/evolutionApi';

import { supabase } from '../services/supabaseClient';

interface Lead {
  id: number;
  name: string;
  whatsapp: string;
  gestation_time: string;
  is_first_baby: string;
  started_layette: string;
  created_at: string;
  total_spent: number;
  coupons: string[];
}

type Tab = 'leads' | 'sorteio';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [search, setSearch] = useState('');
  const [tab, setTab] = useState<Tab>('leads');
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [purchaseAmount, setPurchaseAmount] = useState('');
  const [winner, setWinner] = useState<Lead | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [sendingWA, setSendingWA] = useState<number | null>(null);

  const fetchLeads = async () => {
    const { data } = await supabase.from('leads').select('*').order('created_at', { ascending: false });
    if (data) {
      setLeads(data);
    }
  };

  useEffect(() => {
    if (!sessionStorage.getItem('xikita_admin')) {
      navigate('/admin');
      return;
    }
    fetchLeads();
  }, [navigate]);

  const totalCoupons = leads.reduce((a, b) => a + (b.coupons ? b.coupons.length : 0), 0);
  const totalRevenue = leads.reduce((a, b) => a + b.total_spent, 0);

  const handleAddPurchase = async () => {
    if (!selectedLead || !purchaseAmount) return;
    const amount = parseFloat(purchaseAmount.replace(',', '.'));
    if (isNaN(amount) || amount <= 0) return;
    
    // Calcula novo total
    const newTotal = selectedLead.total_spent + amount;
    const newCouponCount = Math.floor(newTotal / 100);
    const existing = selectedLead.coupons ? selectedLead.coupons.length : 0;
    const newCoupons = selectedLead.coupons ? [...selectedLead.coupons] : [];
    
    for (let i = existing + 1; i <= newCouponCount; i++) {
      newCoupons.push(`XK-${Date.now().toString(36).toUpperCase().slice(-3)}${i.toString().padStart(3, '0')}`);
    }

    // Salva no Supabase
    const { error } = await supabase
      .from('leads')
      .update({ total_spent: newTotal, coupons: newCoupons })
      .eq('id', selectedLead.id);

    if (error) {
      alert("Erro ao validar venda no banco de dados.");
      return;
    }

    // Recarrega banco
    await fetchLeads();

    // Enviar TODOS os cupons via WhatsApp
    if (newCoupons.length > 0) {
      sendCoupons(selectedLead.name, selectedLead.whatsapp, newCoupons).catch(err => {
        console.error('Erro no envio automático:', err);
      });
    }
    
    setSelectedLead(null);
    setPurchaseAmount('');
  };

  const handleSendWA = async (lead: Lead) => {
    if (lead.coupons.length === 0) { alert('Este lead não possui cupons ainda!'); return; }
    setSendingWA(lead.id);
    try {
      await sendCoupons(lead.name, lead.whatsapp, lead.coupons);
      alert(`✅ Cupons enviados por WhatsApp para ${lead.name}!`);
    } catch {
      alert('❌ Erro ao enviar. Verifique a API Key no Vercel.');
    } finally {
      setSendingWA(null);
    }
  };

  const handleDraw = () => {
    const eligible = leads.filter(l => l.coupons.length > 0);
    if (eligible.length === 0) { alert('Nenhum participante com cupons para sortear!'); return; }
    setIsDrawing(true);
    setWinner(null);
    let count = 0;
    const timer = setInterval(() => {
      setWinner(eligible[Math.floor(Math.random() * eligible.length)]);
      count++;
      if (count >= 25) {
        clearInterval(timer);
        const final = eligible[Math.floor(Math.random() * eligible.length)];
        setWinner(final);
        setIsDrawing(false);
        confetti({ particleCount: 200, spread: 90, origin: { y: 0.5 }, colors: ['#ED1C24', '#00AEEF', '#FFF200', '#E6007E'] });
      }
    }, 100);
  };

  const handleDeleteLead = async (id: number) => {
    if (window.confirm('Tem certeza que deseja excluir este participante e seus cupons? Esta ação não pode ser desfeita.')) {
      const { error } = await supabase.from('leads').delete().eq('id', id);
      if (!error) {
        setLeads(leads.filter(l => l.id !== id));
      } else {
        alert("Erro ao tentar excluir no banco de dados.");
      }
    }
  };

  const filtered = leads.filter(l =>
    l.name.toLowerCase().includes(search.toLowerCase()) ||
    l.whatsapp.includes(search)
  );

  const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString('pt-BR');

  return (
    <div className="admin-wrapper">
      {/* ── SIDEBAR ── */}
      <aside className="admin-sidebar">
        <div className="logo">
          <div style={{ fontWeight: 900, fontSize: '1.1rem', color: 'white' }}>XIKITA</div>
          <div style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.5)', fontWeight: 600, letterSpacing: 1.5, marginTop: 4 }}>PAINEL ADMIN</div>
        </div>
        <nav className="sidebar-nav">
          <button className={tab === 'leads' ? 'active' : ''} onClick={() => setTab('leads')}>
            👥 Participantes
          </button>
          <button className={tab === 'sorteio' ? 'active' : ''} onClick={() => setTab('sorteio')}>
            🏆 Sorteio (Painel)
          </button>
          <button onClick={() => navigate('/admin/sorteio-ao-vivo')}
            style={{ color: '#FFE259', fontWeight: 700 }}>
            🎰 Sorteio ao Vivo
          </button>
          <a href="/" style={{ marginTop: 'auto' }}>
            🌐 Ver Landing Page
          </a>
          <button onClick={() => { sessionStorage.removeItem('xikita_admin'); navigate('/admin'); }}
            style={{ color: 'rgba(237,28,36,0.7)' }}>
            🚪 Sair
          </button>
        </nav>
      </aside>

      {/* ── MAIN ── */}
      <main className="admin-main">
        {/* Topbar */}
        <div className="admin-topbar">
          <div>
            <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text)' }}>
              {tab === 'leads' ? '👥 Participantes' : '🏆 Sorteio'}
            </h1>
            <p style={{ color: 'var(--muted)', fontSize: '0.9rem' }}>Campanha Xikita 9 Anos • Sorteio: 09 de Maio</p>
          </div>
          {tab === 'leads' && (
            <div className="search-input">
              🔍
              <input
                placeholder="Buscar participante..."
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>
          )}
        </div>

        {/* ── STATS ── */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 20, marginBottom: 32 }}>
          <div className="stat-card">
            <div className="stat-icon" style={{ background: '#EEF7FF' }}>👥</div>
            <div>
              <div className="stat-label">Total de Leads</div>
              <div className="stat-value">{leads.length}</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon" style={{ background: '#FFF0F7' }}>🎫</div>
            <div>
              <div className="stat-label">Cupons Gerados</div>
              <div className="stat-value">{totalCoupons}</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon" style={{ background: '#EEFAF4' }}>💰</div>
            <div>
              <div className="stat-label">Volume em Vendas</div>
              <div className="stat-value">R$ {totalRevenue.toFixed(0)}</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon" style={{ background: '#FFF8E8' }}>📅</div>
            <div>
              <div className="stat-label">Sorteio</div>
              <div className="stat-value" style={{ fontSize: '1.1rem' }}>09/05</div>
            </div>
          </div>
        </div>

        {/* ── TAB: LEADS ── */}
        {tab === 'leads' && (
          <div className="panel">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
              <h2 className="panel-title">Lista de Participantes</h2>
              <span className="badge badge-blue">{filtered.length} registro(s)</span>
            </div>

            {filtered.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--muted)' }}>
                <div style={{ fontSize: 48, marginBottom: 12 }}>📋</div>
                <p>Nenhum participante cadastrado ainda.</p>
                <p style={{ fontSize: '0.85rem', marginTop: 8 }}>Os leads aparecerão aqui assim que alguém preencher o formulário.</p>
              </div>
            ) : (
              <div style={{ overflowX: 'auto' }}>
                <table>
                  <thead>
                    <tr>
                      <th>Nome</th>
                      <th>WhatsApp</th>
                      <th>Cadastro</th>
                      <th>Investido</th>
                      <th>Cupons</th>
                      <th>Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map(lead => (
                      <tr key={lead.id}>
                        <td><strong>{lead.name}</strong></td>
                        <td style={{ color: 'var(--muted)', fontFamily: 'monospace', fontSize: '0.85rem' }}>{lead.whatsapp}</td>
                        <td style={{ color: 'var(--muted)', fontSize: '0.85rem' }}>{formatDate(lead.created_at)}</td>
                        <td>
                          <span style={{ fontWeight: 700, color: lead.total_spent > 0 ? 'var(--green)' : 'var(--muted)' }}>
                            {lead.total_spent > 0 ? `R$ ${lead.total_spent.toFixed(2)}` : '—'}
                          </span>
                        </td>
                        <td>
                          {lead.coupons && lead.coupons.length > 0
                            ? <span className="badge badge-pink">🎫 {lead.coupons.length}</span>
                            : <span className="badge" style={{ background: '#F5F5F5', color: '#999' }}>0</span>}
                        </td>
                        <td>
                          <div style={{ display: 'flex', gap: 8 }}>
                            <button
                              className="btn btn-outline"
                              style={{ padding: '8px 12px', fontSize: '0.82rem' }}
                              onClick={() => setSelectedLead(lead)}
                              title="Registrar venda"
                            >
                              ➕ Venda
                            </button>
                            <button
                              className="btn btn-success"
                              style={{ padding: '8px 12px', fontSize: '0.82rem' }}
                              onClick={() => handleSendWA(lead)}
                              disabled={sendingWA === lead.id || lead.coupons.length === 0}
                              title={lead.coupons.length === 0 ? 'Sem cupons para enviar' : 'Enviar cupons por WhatsApp'}
                            >
                              {sendingWA === lead.id ? '⏳' : '📲'}
                            </button>
                            <button
                              className="btn btn-outline"
                              style={{ padding: '8px 12px', fontSize: '0.82rem', borderColor: 'rgba(237,28,36,0.3)', color: '#ED1C24' }}
                              onClick={() => handleDeleteLead(lead.id)}
                              title="Excluir participante"
                            >
                              🗑️
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* ── TAB: SORTEIO ── */}
        {tab === 'sorteio' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>
            <div className="draw-box">
              <div style={{ fontSize: 48, marginBottom: 16 }}>🎰</div>
              <h2 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: 8 }}>Realizar Sorteio</h2>
              <p style={{ opacity: 0.7, marginBottom: 28, fontSize: '0.9rem' }}>
                {totalCoupons} cupons no total • {leads.filter(l => l.coupons.length > 0).length} participantes com cupons
              </p>
              <button
                className="btn btn-primary"
                style={{ width: '100%', justifyContent: 'center', padding: '16px', fontSize: '1rem' }}
                onClick={handleDraw}
                disabled={isDrawing}
              >
                {isDrawing ? <span className="spin-text">🎲 Sorteando...</span> : '🎯 Iniciar Sorteio'}
              </button>
            </div>

            <div>
              {winner ? (
                <div className="draw-winner">
                  <div style={{ fontSize: 48, marginBottom: 12 }}>🏆</div>
                  <h3 style={{ fontSize: '1.6rem', fontWeight: 900, color: '#333', marginBottom: 6 }}>
                    {winner.name}
                  </h3>
                  <p style={{ color: '#555', fontWeight: 600, marginBottom: 16 }}>{winner.whatsapp}</p>
                  <div style={{ background: 'white', borderRadius: 16, padding: '16px 24px', display: 'inline-block' }}>
                    <p style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', color: '#999', marginBottom: 4 }}>
                      Cupons do Vencedor
                    </p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, justifyContent: 'center' }}>
                      {winner.coupons.map(c => (
                        <span key={c} style={{ fontFamily: 'monospace', fontWeight: 800, fontSize: '0.9rem', background: '#FFF0F7', color: 'var(--pink)', padding: '4px 10px', borderRadius: 8 }}>
                          {c}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="panel" style={{ textAlign: 'center', padding: '60px 32px' }}>
                  <div style={{ fontSize: 48, marginBottom: 16, opacity: 0.3 }}>🎫</div>
                  <p style={{ color: 'var(--muted)', fontWeight: 500 }}>
                    O resultado do sorteio aparecerá aqui.
                  </p>
                </div>
              )}
            </div>

            {/* Todos os cupons */}
            <div className="panel" style={{ gridColumn: '1 / -1' }}>
              <h2 className="panel-title">📋 Relação de Cupons</h2>
              {leads.filter(l => l.coupons.length > 0).length === 0 ? (
                <p style={{ color: 'var(--muted)', textAlign: 'center', padding: '32px 0' }}>Nenhum cupom gerado ainda.</p>
              ) : (
                <div style={{ overflowX: 'auto' }}>
                  <table>
                    <thead>
                      <tr>
                        <th>Participante</th>
                        <th>Investimento</th>
                        <th>Cupons</th>
                      </tr>
                    </thead>
                    <tbody>
                      {leads.filter(l => l.coupons.length > 0).map(lead => (
                        <tr key={lead.id}>
                          <td><strong>{lead.name}</strong><br /><span style={{ fontSize: '0.8rem', color: 'var(--muted)' }}>{lead.whatsapp}</span></td>
                          <td><span className="badge badge-green">R$ {lead.total_spent.toFixed(2)}</span></td>
                          <td>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                              {lead.coupons && lead.coupons.map(c => (
                                <span key={c} style={{ fontFamily: 'monospace', fontSize: '0.8rem', fontWeight: 700, background: '#FFF0F7', color: 'var(--pink)', padding: '4px 10px', borderRadius: 8 }}>
                                  {c}
                                </span>
                              ))}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}
      </main>

      {/* ── MODAL VENDA ── */}
      {selectedLead && (
        <div className="modal-overlay" onClick={() => setSelectedLead(null)}>
          <div className="modal-box" onClick={e => e.stopPropagation()}>
            <div style={{ fontSize: 36, marginBottom: 12, textAlign: 'center' }}>🛍️</div>
            <h2 className="modal-title" style={{ textAlign: 'center' }}>Registrar Venda</h2>
            <p className="modal-sub" style={{ textAlign: 'center' }}>
              Para <strong>{selectedLead.name}</strong><br />
              {selectedLead.total_spent > 0 && `Total atual: R$ ${selectedLead.total_spent.toFixed(2)} • ${selectedLead.coupons ? selectedLead.coupons.length : 0} cupons`}
            </p>

            <div style={{ marginBottom: 20 }}>
              <label style={{ display: 'block', fontWeight: 600, marginBottom: 8, fontSize: '0.875rem' }}>Valor da Compra (R$)</label>
              <input
                type="number"
                min="0"
                step="0.01"
                placeholder="0,00"
                autoFocus
                value={purchaseAmount}
                onChange={e => setPurchaseAmount(e.target.value)}
                className="modal-input"
              />
              {purchaseAmount && (
                <p style={{ textAlign: 'center', fontSize: '0.85rem', color: 'var(--green)', marginTop: 10, fontWeight: 600 }}>
                  +{Math.max(0, Math.floor((selectedLead.total_spent + parseFloat(purchaseAmount || '0')) / 100) - (selectedLead.coupons ? selectedLead.coupons.length : 0))} novos cupons serão gerados
                </p>
              )}
            </div>

            <div style={{ display: 'flex', gap: 12 }}>
              <button className="btn btn-outline" style={{ flex: 1, justifyContent: 'center', padding: 14 }} onClick={() => setSelectedLead(null)}>
                Cancelar
              </button>
              <button className="btn btn-primary" style={{ flex: 1, justifyContent: 'center', padding: 14 }} onClick={handleAddPurchase}>
                ✅ Confirmar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
