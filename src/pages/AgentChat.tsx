// src/pages/AgentChat.tsx
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { agentService } from '../services/api';
import { Agent } from '../types/Agent';
import { useAgents } from '../hooks/useAgents';

export default function AgentChat() {
  const { agentName } = useParams();
  const navigate = useNavigate();
  const [agent, setAgent] = useState<Agent | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState<{sender: string, text: string}[]>([]);
  const { getAgentResponse } = useAgents();

  useEffect(() => {
    async function fetchAgent() {
      if (!agentName) return;
      
      try {
        setLoading(true);
        const data = await agentService.getAgentByName(agentName);
        setAgent(data);
        setError(null);
      } catch (err) {
        setError('Falha ao carregar informações do agente');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchAgent();
  }, [agentName]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    if (!agentName) return;

    // Adicionar mensagem do usuário ao histórico
    setChatHistory([...chatHistory, { sender: 'user', text: message }]);

    // chamada API
    var agentResponse = await getAgentResponse(agentName, message)

    setTimeout(() => {
      setChatHistory(prev => [...prev, { 
        sender: 'agent', 
        text: `${agentResponse}`
      }]);
    }, 1000);

    setMessage('');
  };

  if (loading) return <div className="flex justify-center items-center h-64">Carregando...</div>;
  if (error || !agent) return <div className="text-red-500 text-center p-4">{error || 'Agente não encontrado'}</div>;

  return (
    <div className="flex flex-col h-screen max-h-screen">
      {/* Cabeçalho do chat */}
      <div className="bg-white border-b p-4 flex items-center justify-between shadow-sm">
        <div className="flex items-center">
          <button 
            onClick={() => navigate('/')}
            className="mr-4 text-gray-600 hover:text-gray-900"
          >
            ← Voltar
          </button>
          <div>
            <h1 className="font-bold text-lg">{agent.agent_name}</h1>
            <p className="text-sm text-gray-500">{agent.game_name}</p>
          </div>
        </div>
      </div>

      {/* Área de mensagens */}
      <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
        {chatHistory.length === 0 ? (
          <div className="text-center text-gray-500 py-8">
            Inicie uma conversa com {agent.agent_name}!
          </div>
        ) : (
          chatHistory.map((msg, index) => (
            <div 
              key={index} 
              className={`mb-4 max-w-3/4 ${msg.sender === 'user' ? 'ml-auto' : 'mr-auto'}`}
            >
              <div 
                className={`p-3 rounded-lg ${
                  msg.sender === 'user' 
                    ? 'bg-blue-500 text-white rounded-br-none' 
                    : 'bg-white border rounded-bl-none'
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Formulário de envio de mensagem */}
      <form onSubmit={handleSendMessage} className="border-t p-4 bg-white">
        <div className="flex gap-2">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="flex-1 border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Digite sua mensagem..."
          />
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg transition-colors"
          >
            Enviar
          </button>
        </div>
      </form>
    </div>
  );
}
