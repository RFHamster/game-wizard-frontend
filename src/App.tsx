// src/App.tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import AgentChat from './pages/AgentChat';
import CreateAgent from './pages/CreateAgent';
import NotFound from './pages/NotFound';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/chat/:agentName" element={<AgentChat />} />
        <Route path="/create-agent" element={<CreateAgent />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
