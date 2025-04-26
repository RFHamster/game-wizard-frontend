// src/hooks/useAgents.ts
import { useState, useEffect, useCallback } from 'react';
import { Agent } from '../types/Agent';
import { agentService } from '../services/api'; // Comentado durante desenvolvimento

export function useAgents() {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAgents = useCallback(async () => {
    try {
      setLoading(true);
      const data = await agentService.getAgents();
      
      setAgents(data);
      setError(null);
    } catch (err) {
      setError('Falha ao carregar os agentes');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAgents();
  }, [fetchAgents]);

  const addAgent = useCallback(async (newAgent: Omit<Agent, 'id'>) => {
    try {
      const createdAgent = await agentService.createAgent(newAgent);
      
      setAgents(prev => [...prev, createdAgent]);
      
      return createdAgent;
    } catch (err) {
      console.error('Erro ao adicionar agente:', err);
      throw err;
    }
  }, []);

  return { agents, loading, error, fetchAgents, addAgent };
}


export function useAgent(name: string | undefined) {
  const [agent, setAgent] = useState<Agent | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!name) {
      setError('Nome do agente não fornecido');
      setLoading(false);
      return;
    }

    const fetchAgent = async () => {
      try {
        setLoading(true);
        const found = await agentService.getAgentByName(name);
        if (!found) {
          throw new Error('Agente não encontrado');
        }
        
        setAgent(found);
        setError(null);
      } catch (err) {
        setError('Falha ao carregar o agente');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAgent();
  }, [name]);

  return { agent, loading, error };
}
