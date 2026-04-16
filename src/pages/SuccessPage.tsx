import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, ArrowRight, Instagram } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useNavigate } from 'react-router-dom';

const SuccessPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#ED1C24', '#00AEEF', '#FFF200']
    });
  }, []);

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full text-center"
      >
        <div className="mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', damping: 12 }}
          >
            <CheckCircle className="w-24 h-24 text-[var(--xikita-green)] mx-auto" />
          </motion.div>
        </div>

        <h1 className="text-3xl font-bold mb-4">Cadastro Realizado! 🎉</h1>
        <p className="text-gray-600 mb-8 text-lg">
          Você já está participando do nosso **Clube das Mamães**. Agora é só aguardar o sorteio dia 09 de maio!
        </p>

        <div className="space-y-4">
          <a 
            href="https://wa.me/553289993351896" 
            target="_blank" 
            rel="noopener noreferrer"
            className="block w-full bg-[var(--xikita-green)] text-white py-4 rounded-xl font-bold text-lg hover:brightness-110 shadow-lg flex items-center justify-center gap-2"
          >
            Falar no WhatsApp <ArrowRight className="w-5 h-5" />
          </a>

          <a 
            href="https://instagram.com/loja_xikita" 
            target="_blank" 
            rel="noopener noreferrer"
            className="block w-full bg-white text-[var(--xikita-pink)] border-2 border-[var(--xikita-pink)] py-4 rounded-xl font-bold text-lg hover:bg-pink-50 flex items-center justify-center gap-2"
          >
            Seguir no Instagram <Instagram className="w-5 h-5" />
          </a>

          <button 
            onClick={() => navigate('/')}
            className="text-gray-400 hover:text-gray-600 font-medium"
          >
            Voltar para a página inicial
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default SuccessPage;
