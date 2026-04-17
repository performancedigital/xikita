import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import SuccessPage from './pages/SuccessPage';
import LiveDraw from './pages/LiveDraw';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/sucesso" element={<SuccessPage />} />
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin/painel" element={<AdminDashboard />} />
        <Route path="/admin/sorteio-ao-vivo" element={<LiveDraw />} />
      </Routes>
    </Router>
  );
}

export default App;
