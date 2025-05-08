import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Kriteria from './pages/Kriteria';
import Crips from './pages/Crips';
import Bobot from './pages/Bobot';
import Alternatif from './pages/Alternatif';
import ProsesSAW from './pages/ProsesSAW';

function App() {
  return (
    <Router>
      <div className="flex">
        <Sidebar />
        <div className="flex-1 p-6 bg-gray-100 min-h-screen">
          <Routes>
            {/* Redirect dari root (/) ke dashboard */}
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/kriteria" element={<Kriteria />} />
            <Route path="/crips" element={<Crips />} />
            <Route path="/bobot" element={<Bobot />} />
            <Route path="/alternatif" element={<Alternatif />} />
            <Route path="/proses" element={<ProsesSAW />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
