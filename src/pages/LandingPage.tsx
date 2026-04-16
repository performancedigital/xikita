import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Star, Heart, Calendar, Gift, Send } from 'lucide-react';
import { sendConfirmation } from '../services/evolutionApi';
import bannerImg from '../assets/hero.png';

const LandingPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    whatsapp: '',
    gestationTime: '',
    isFirstBaby: '',
    startedLayette: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Salvar no LocalStorage para o MVP
    const leads = JSON.parse(localStorage.getItem('xikita_leads') || '[]');
    const newLead = { 
      ...formData, 
      id: Date.now(), 
      date: new Date().toISOString(),
      coupons: [] 
    };
    localStorage.setItem('xikita_leads', JSON.stringify([...leads, newLead]));
    
    // Disparar confirmação WhatsApp (Async)
    sendConfirmation(formData.name, formData.whatsapp)
      .catch(err => console.error('Falha no WhatsApp:', err));
    
    navigate('/sucesso');
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <motion.header 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative h-[60vh] flex items-center justify-center overflow-hidden"
      >
        <img 
          src={bannerImg} 
          alt="Aniversário Xikita" 
          className="absolute inset-0 w-full h-full object-cover brightness-75"
          onError={(e) => {
            e.currentTarget.src = 'https://images.unsplash.com/photo-1515488764276-beab7607c1e6?auto=format&fit=crop&q=80&w=2000';
          }}
        />
        <div className="relative z-10 text-center text-white px-4">
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-white/20 backdrop-blur-md p-8 rounded-3xl"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-lg">
              Celebramos 9 anos com você! 🥳
            </h1>
            <p className="text-xl md:text-2xl font-light drop-shadow-md">
              Participe do Clube das Mamães e concorra a um Kit Buba Care Premium.
            </p>
          </motion.div>
        </div>
      </motion.header>

      {/* Campaign Details */}
      <section className="py-16 px-4 max-w-4xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <motion.div whileHover={{ y: -10 }} className="premium-card text-center">
            <Calendar className="w-12 h-12 text-[var(--xikita-pink)] mx-auto mb-4" />
            <h3 className="font-bold mb-2">Momento Especial</h3>
            <p className="text-sm text-[var(--xikita-muted)]">Dias 07, 08 e 09 de Maio na loja.</p>
          </motion.div>
          <motion.div whileHover={{ y: -10 }} className="premium-card text-center">
            <Gift className="w-12 h-12 text-[var(--xikita-blue)] mx-auto mb-4" />
            <h3 className="font-bold mb-2">Compre e Ganhe</h3>
            <p className="text-sm text-[var(--xikita-muted)]">Cada R$ 100 em compras = 1 Cupom.</p>
          </motion.div>
          <motion.div whileHover={{ y: -10 }} className="premium-card text-center">
            <Star className="w-12 h-12 text-[var(--xikita-yellow)] mx-auto mb-4" />
            <h3 className="font-bold mb-2">Sorteio</h3>
            <p className="text-sm text-[var(--xikita-muted)]">Dia 09 de Maio em nossas redes.</p>
          </motion.div>
        </div>

        {/* Form Section */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className="premium-card rainbow-border p-8 md:p-12 mb-16"
        >
          <h2 className="text-3xl font-bold text-center mb-8 gradient-text">Faça seu Cadastro</h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold mb-2">Qual Seu Nome Completo? *</label>
              <input 
                required
                type="text" 
                className="w-full p-4 border rounded-xl focus:ring-2 focus:ring-[var(--xikita-pink)] outline-none transition-all"
                placeholder="Ex: Maria Oliveira"
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Qual seu Telefone WhatsApp? *</label>
              <input 
                required
                type="tel" 
                className="w-full p-4 border rounded-xl focus:ring-2 focus:ring-[var(--xikita-green)] outline-none transition-all"
                placeholder="(xx) xxxxx-xxxx"
                value={formData.whatsapp}
                onChange={e => setFormData({...formData, whatsapp: e.target.value})}
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold mb-2">Tempo de Gestação?</label>
                <select 
                  className="w-full p-4 border rounded-xl outline-none"
                  value={formData.gestationTime}
                  onChange={e => setFormData({...formData, gestationTime: e.target.value})}
                >
                  <option value="">Selecione...</option>
                  <option value="1a3">1 a 3 meses</option>
                  <option value="4a6">4 a 6 meses</option>
                  <option value="7a9">7 a 9 meses</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">É seu primeiro bebê?</label>
                <div className="flex gap-4 p-4 border rounded-xl">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" name="first" value="Sim" onChange={e => setFormData({...formData, isFirstBaby: e.target.value})} /> Sim
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" name="first" value="Não" onChange={e => setFormData({...formData, isFirstBaby: e.target.value})} /> Não
                  </label>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">Já começou a montar o enxoval?</label>
              <div className="flex flex-wrap gap-4 p-4 border rounded-xl">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" name="enxoval" value="Sim" onChange={e => setFormData({...formData, startedLayette: e.target.value})} /> Sim
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" name="enxoval" value="Não" onChange={e => setFormData({...formData, startedLayette: e.target.value})} /> Não
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" name="enxoval" value="Finalizado" onChange={e => setFormData({...formData, startedLayette: e.target.value})} /> Já finalizei
                </label>
              </div>
            </div>

            <button 
              type="submit"
              className="w-full bg-[var(--xikita-pink)] text-white py-4 rounded-xl font-bold text-lg hover:brightness-110 active:scale-95 flex items-center justify-center gap-2 shadow-lg"
            >
              <Send className="w-5 h-5" /> Enviar Cadastro
            </button>
          </form>
        </motion.div>

        {/* Prize Kit Details */}
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-6">Itens que compõem nosso Kit Buba Care ✨</h2>
          <div className="flex flex-wrap justify-center gap-3">
            {['Shampoo', 'Condicionador', 'Pomada de Assadura', 'Hidratante', 'Sabonete Líquido', 'Garrafinha'].map(item => (
              <span key={item} className="bg-gray-100 px-4 py-2 rounded-full text-sm font-medium border">
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      <footer className="py-8 bg-gray-50 text-center text-sm text-[var(--xikita-muted)]">
        &copy; 2024 XIKITA MODA INFANTIL - Todos os direitos reservados.
      </footer>
    </div>
  );
};

export default LandingPage;
