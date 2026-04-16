import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AdminLogin() {
  const navigate = useNavigate();
  const [pass, setPass] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Senha simples para o MVP – pode ser substituída por autenticação real
    if (pass === 'xikita2025') {
      sessionStorage.setItem('xikita_admin', 'true');
      navigate('/admin/painel');
    } else {
      setError('Senha incorreta. Tente novamente.');
    }
  };

  return (
    <div className="login-page">
      <div className="login-box">
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>🔐</div>
          <h1 style={{ fontSize: '1.6rem', fontWeight: 900, color: 'var(--text)', marginBottom: 8 }}>
            XIKITA ADMIN
          </h1>
          <p style={{ color: 'var(--muted)', fontSize: '0.9rem' }}>
            Acesso restrito ao painel de gestão
          </p>
        </div>

        <form onSubmit={handleLogin}>
          <div className="form-group" style={{ marginBottom: 20 }}>
            <label style={{ display: 'block', fontWeight: 600, marginBottom: 8, fontSize: '0.875rem', color: 'var(--text)' }}>
              Senha de Acesso
            </label>
            <input
              type="password"
              placeholder="••••••••••"
              value={pass}
              onChange={e => { setPass(e.target.value); setError(''); }}
              style={{
                width: '100%', padding: '14px 18px',
                border: error ? '2px solid #ED1C24' : '2px solid #F0F0F0',
                borderRadius: 14, outline: 'none',
                fontFamily: 'Outfit, sans-serif', fontSize: '1rem',
                background: '#FAFAFA', color: 'var(--text)'
              }}
            />
            {error && <p style={{ color: 'var(--red)', fontSize: '0.82rem', marginTop: 6 }}>{error}</p>}
          </div>

          <button type="submit" className="btn-submit">
            🚀 Entrar no Painel
          </button>
        </form>

        <p style={{ textAlign: 'center', marginTop: 20, fontSize: '0.8rem', color: 'var(--muted)' }}>
          <a href="/" style={{ color: 'var(--pink)', fontWeight: 600 }}>← Voltar para a loja</a>
        </p>
      </div>
    </div>
  );
}
