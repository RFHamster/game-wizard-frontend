// src/pages/Dashboard.tsx
import { useAgents } from '../hooks/useAgents';
import { useNavigate } from 'react-router-dom';
import { AgentStatus } from '../types/Agent';

export default function Dashboard() {
  const { agents, loading, error } = useAgents();
  const navigate = useNavigate();

  const handleChatClick = (agentName: string) => {
    navigate(`/chat/${agentName}`);
  };

  const handleAddClick = () => {
    navigate('/create-agent');
  };

  const getStatusColor = (status: AgentStatus) => {
    switch (status) {
      case AgentStatus.ACTIVE:
        return 'bg-green-500';
      case AgentStatus.INACTIVE:
        return 'bg-red-500';
      default:
        return 'bg-yellow-500';
    }
  };

  if (loading) return <div className="flex justify-center items-center h-64">Carregando agentes...</div>;
  if (error) return <div className="text-red-500 text-center p-4">{error}</div>;

  return (
    <div className="p-6 relative min-h-screen pb-16">
      <h1 className="text-2xl font-bold mb-6">Dashboard de Agentes</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {agents.map((agent) => (
          <div 
            key={agent.agent_name}
            className="bg-white rounded-lg shadow-md p-4 border border-gray-200 hover:shadow-lg transition-shadow"
          >
            <div className="flex justify-between items-start mb-3">
              <h2 className="font-bold text-lg truncate">{agent.agent_name}</h2>
              <span className={`${getStatusColor(agent.status)} text-white text-xs px-2 py-1 rounded`}>
                {agent.status}
              </span>
            </div>
            
            <p className="text-gray-700 mb-2">
              <span className="font-medium">Jogo:</span> {agent.game_name}
            </p>
            
            {agent.collection_name && (
              <p className="text-gray-700 mb-2">
                <span className="font-medium">Coleção:</span> {agent.collection_name}
              </p>
            )}
            
            {agent.temperature_hints && (
              <p className="text-gray-700 mb-2 text-sm italic">
                "{agent.temperature_hints}"
              </p>
            )}
            
            <button
              onClick={() => handleChatClick(agent.agent_name)}
              className="mt-3 w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded transition-colors"
            >
              Iniciar Chat
            </button>
          </div>
        ))}
      </div>
      
      {agents.length === 0 && (
        <div className="text-center text-gray-500 py-8">
          Nenhum agente encontrado.
        </div>
      )}

      {/* Botão flutuante de adição */}
      <button
        onClick={handleAddClick}
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-lg hover:bg-blue-700 transition-colors"
        aria-label="Adicionar novo agente"
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className="h-8 w-8" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={2} 
            d="M12 4v16m8-8H4" 
          />
        </svg>
      </button>
    </div>
  );
}
