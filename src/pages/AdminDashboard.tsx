import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, Ticket, Trophy, Plus, MessageCircle, Search } from 'lucide-react';
import confetti from 'canvas-confetti';
import { sendCoupons } from '../services/evolutionApi';

interface Lead {
  id: number;
  name: string;
  whatsapp: string;
  gestationTime: string;
  isFirstBaby: string;
  startedLayette: string;
  date: string;
  totalSpent: number;
  coupons: string[];
}

const AdminDashboard = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [purchaseAmount, setPurchaseAmount] = useState('');
  const [winner, setWinner] = useState<Lead | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('xikita_leads') || '[]');
    setLeads(saved.map((l: any) => ({
      ...l,
      totalSpent: l.totalSpent || 0,
      coupons: l.coupons || []
    })));
  }, []);

  const saveLeadsManager = (updatedLeads: Lead[]) => {
    setLeads(updatedLeads);
    localStorage.setItem('xikita_leads', JSON.stringify(updatedLeads));
  };

  const handleAddPurchase = () => {
    if (!selectedLead || !purchaseAmount) return;
    
    const amount = parseFloat(purchaseAmount);
    const newTotal = selectedLead.totalSpent + amount;
    const totalCoupons = Math.floor(newTotal / 100);
    
    // Gerar novos cupons se o número total aumentou
    const currentCouponCount = selectedLead.coupons.length;
    const newCoupons = [...selectedLead.coupons];
    
    for (let i = currentCouponCount + 1; i <= totalCoupons; i++) {
      newCoupons.push(`XK-${Math.random().toString(36).substr(2, 6).toUpperCase()}`);
    }

    const updatedLeads = leads.map(l => 
      l.id === selectedLead.id 
        ? { ...l, totalSpent: newTotal, coupons: newCoupons }
        : l
    );

    saveLeadsManager(updatedLeads);
    setSelectedLead(null);
    setPurchaseAmount('');
    
    alert(`Sucesso! ${newCoupons.length - currentCouponCount} novos cupons gerados.`);
  };

  const handleSendWhatsApp = async (lead: Lead) => {
    if (lead.coupons.length === 0) return alert('Este lead não possui cupons!');
    
    try {
      await sendCoupons(lead.name, lead.whatsapp, lead.coupons);
      alert(`Mensagem enviada com sucesso para ${lead.name}!`);
    } catch (error) {
      alert('Erro ao enviar mensagem. Verifique a API Key.');
    }
  };

  const handleDraw = () => {
    const eligibleLeads = leads.filter(l => l.coupons.length > 0);
    if (eligibleLeads.length === 0) return alert('Nenhum participante com cupons!');

    setIsDrawing(true);
    setWinner(null);

    // Efeito de animação de sorteio
    let count = 0;
    const interval = setInterval(() => {
      const tempWinner = eligibleLeads[Math.floor(Math.random() * eligibleLeads.length)];
      setWinner(tempWinner);
      count++;
      if (count > 20) {
        clearInterval(interval);
        setIsDrawing(false);
        confetti({
          particleCount: 150,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#ED1C24', '#00AEEF', '#FFF200', '#E6007E']
        });
      }
    }, 100);
  };

  const filteredLeads = leads.filter(l => 
    l.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    l.whatsapp.includes(searchTerm)
  );

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <header className="max-w-7xl mx-auto mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Painel Xikita</h1>
          <p className="text-gray-500">Gestão da Campanha 9 Anos</p>
        </div>
        
        <div className="flex gap-4">
          <button 
            onClick={handleDraw}
            disabled={isDrawing}
            className="bg-[var(--xikita-pink)] text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 shadow-md hover:brightness-110 disabled:opacity-50"
          >
            <Trophy className="w-5 h-5" /> {isDrawing ? 'Sorteando...' : 'Realizar Sorteio'}
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Stats */}
        <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="premium-card flex items-center gap-4">
            <div className="p-4 bg-blue-100 rounded-2xl text-[var(--xikita-blue)]"><Users /></div>
            <div><p className="text-sm text-gray-500">Total Leads</p><h4 className="text-2xl font-bold">{leads.length}</h4></div>
          </div>
          <div className="premium-card flex items-center gap-4">
            <div className="p-4 bg-pink-100 rounded-2xl text-[var(--xikita-pink)]"><Ticket /></div>
            <div><p className="text-sm text-gray-500">Cupons Gerados</p><h4 className="text-2xl font-bold">{leads.reduce((acc, curr) => acc + curr.coupons.length, 0)}</h4></div>
          </div>
          <div className="premium-card flex items-center gap-4">
            <div className="p-4 bg-yellow-100 rounded-2xl text-yellow-600"><Trophy /></div>
            <div><p className="text-sm text-gray-500">Sorteio</p><h4 className="text-2xl font-bold">09 de Maio</h4></div>
          </div>
        </div>

        {/* Lead List */}
        <div className="lg:col-span-2 premium-card">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold">Participantes</h2>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input 
                type="text" 
                placeholder="Buscar..." 
                className="pl-10 pr-4 py-2 border rounded-lg focus:ring-2 outline-none"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b text-gray-400 text-sm">
                  <th className="pb-4 font-medium">Nome</th>
                  <th className="pb-4 font-medium">WhatsApp</th>
                  <th className="pb-4 font-medium">Investido</th>
                  <th className="pb-4 font-medium">Cupons</th>
                  <th className="pb-4 font-medium">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {filteredLeads.map(lead => (
                  <tr key={lead.id} className="hover:bg-gray-50 transition-colors">
                    <td className="py-4 font-medium">{lead.name}</td>
                    <td className="py-4 text-gray-600">{lead.whatsapp}</td>
                    <td className="py-4 font-bold text-green-600">R$ {lead.totalSpent.toFixed(2)}</td>
                    <td className="py-4">
                      <span className="bg-blue-50 text-[var(--xikita-blue)] px-3 py-1 rounded-full text-sm font-bold border border-blue-100">
                        {lead.coupons.length}
                      </span>
                    </td>
                    <td className="py-4">
                      <div className="flex gap-2">
                        <button 
                          onClick={() => setSelectedLead(lead)}
                          className="p-2 hover:bg-gray-200 rounded-lg text-gray-600" title="Adicionar Compra"
                        >
                          <Plus className="w-5 h-5" />
                        </button>
                        <button 
                          onClick={() => handleSendWhatsApp(lead)}
                          className="p-2 hover:bg-green-100 rounded-lg text-green-600" 
                          title="Enviar Cupons via WhatsApp"
                        >
                          <MessageCircle className="w-5 h-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Winner Section */}
        <div className="premium-card h-fit sticky top-8">
          <h2 className="text-xl font-bold mb-6">Resultado do Sorteio</h2>
          {winner ? (
            <motion.div 
              initial={{ scale: 0 }} 
              animate={{ scale: 1 }}
              className="text-center p-6 bg-yellow-50 rounded-3xl border-2 border-yellow-200"
            >
              <Trophy className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-yellow-800">{winner.name}</h3>
              <p className="text-yellow-600 font-medium mb-4">{winner.whatsapp}</p>
              <div className="bg-white p-3 rounded-xl border-dashed border-2 border-yellow-300">
                <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">Cupom Vencedor</p>
                <p className="text-xl font-mono font-bold text-gray-800">{winner.coupons[Math.floor(Math.random() * winner.coupons.length)]}</p>
              </div>
            </motion.div>
          ) : (
            <div className="text-center py-12 text-gray-400 border-2 border-dashed rounded-3xl">
              <p>O sorteio ainda não foi realizado.</p>
            </div>
          )}
        </div>
      </main>

      {/* Modal Adicionar Compra */}
      <AnimatePresence>
        {selectedLead && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white w-full max-w-md rounded-3xl p-8 shadow-2xl"
            >
              <h2 className="text-2xl font-bold mb-2">Registrar Venda</h2>
              <p className="text-gray-500 mb-6">Inserir valor de compra para {selectedLead.name}</p>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Valor da Compra (R$)</label>
                  <input 
                    type="number" 
                    className="w-full p-4 border rounded-xl text-2xl font-bold outline-none focus:ring-2 focus:ring-[var(--xikita-blue)]"
                    placeholder="0.00"
                    autoFocus
                    value={purchaseAmount}
                    onChange={e => setPurchaseAmount(e.target.value)}
                  />
                  <p className="text-xs text-gray-400 mt-2">Cada R$ 100 somados gera 1 novo cupom.</p>
                </div>
                
                <div className="flex gap-3">
                  <button 
                    onClick={() => setSelectedLead(null)}
                    className="flex-1 py-4 font-bold text-gray-500 hover:bg-gray-100 rounded-xl"
                  >
                    Cancelar
                  </button>
                  <button 
                    onClick={handleAddPurchase}
                    className="flex-1 py-4 bg-[var(--xikita-blue)] text-white font-bold rounded-xl shadow-lg hover:brightness-110"
                  >
                    Confirmar
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminDashboard;
