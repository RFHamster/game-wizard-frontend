import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AgentStatus } from '../types/Agent';
import { useAgents } from '../hooks/useAgents';

export default function CreateAgent() {
  const navigate = useNavigate();
  const { addAgent } = useAgents();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    agent_name: '',
    game_name: '',
    temperature_hints: '',
    status: AgentStatus.CREATED,
    collection_name: ''
  });
  
  // Referência para o arquivo
  const [manualFile, setManualFile] = useState<File | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  // Manipulador específico para o upload de arquivo
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setManualFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validação básica
    if (!formData.agent_name || !formData.game_name) {
      setFormError('Nome do agente e nome do jogo são obrigatórios');
      return;
    }
    
    try {
      setIsSubmitting(true);
      setFormError(null);
      
      // Criar FormData para enviar os dados do formulário junto com o arquivo
      const payload = new FormData();
      
      // Adicionar os campos do formulário ao FormData
      Object.entries(formData).forEach(([key, value]) => {
        payload.append(key, value);
      });
      
      // Adicionar o arquivo ao FormData se existir
      if (manualFile) {
        payload.append('manual_file', manualFile);
      }
      
      // Usar o hook para adicionar o agente com o FormData
      await addAgent(payload);
      
      // Redirecionar para o dashboard após o envio bem-sucedido
      navigate('/');
      
    } catch (error) {
      console.error('Erro ao criar o agente:', error);
      setFormError('Ocorreu um erro ao criar o agente. Tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="flex items-center mb-6">
        <button 
          onClick={() => navigate('/')}
          className="mr-4 text-gray-600 hover:text-gray-900"
        >
          ← Voltar
        </button>
        <h1 className="text-2xl font-bold">Criar Novo Agente</h1>
      </div>

      {formError && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {formError}
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="agent_name">
            Nome do Agente *
          </label>
          <input
            type="text"
            id="agent_name"
            name="agent_name"
            value={formData.agent_name}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Nome único para o agente"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="game_name">
            Nome do Jogo *
          </label>
          <input
            type="text"
            id="game_name"
            name="game_name"
            value={formData.game_name}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Jogo associado ao agente"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="temperature_hints">
            Dicas de Temperatura
          </label>
          <textarea
            id="temperature_hints"
            name="temperature_hints"
            value={formData.temperature_hints}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-24 resize-none"
            placeholder="Dicas sobre o comportamento do agente (opcional)"
          />
        </div>
        
        {/* Novo campo para upload de arquivo */}
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="manual_file">
            Manual do Jogo
          </label>
          <div className="flex items-center">
            <input
              type="file"
              id="manual_file"
              name="manual_file"
              onChange={handleFileChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              accept=".pdf,.doc,.docx,.txt"
            />
          </div>
          {manualFile && (
            <p className="text-sm text-gray-600 mt-1">
              Arquivo selecionado: {manualFile.name}
            </p>
          )}
        </div>

        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={() => navigate('/')}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors"
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className={`bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {isSubmitting ? 'Criando...' : 'Criar Agente'}
          </button>
        </div>
      </form>
    </div>
  );
}
