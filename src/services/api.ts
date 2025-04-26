// src/services/api.ts
import axios from 'axios';
import { Agent } from '../types/Agent';

// Crie uma instância do axios com a URL base da sua API
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000',
});

export const agentService = {
  // Buscar todos os agentes
  async getAgents(): Promise<Agent[]> {
    try {
      const response = await api.get('/agent/');
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar agentes:', error);
      throw error;
    }
  },

  // Buscar um agente específico
  async getAgentByName(name: string): Promise<Agent> {
    try {
      const response = await api.get(`/agent/${name}`);
      return response.data;
    } catch (error) {
      console.error(`Erro ao buscar o agente ${name}:`, error);
      throw error;
    }
  },

  // Criar um novo agente
  async createAgent(agent: Omit<Agent, 'id'>): Promise<Agent> {
    try {
      const response = await api.post('/agent/', agent);
      return response.data;
    } catch (error) {
      console.error('Erro ao criar o agente:', error);
      throw error;
    }
  }
};

export default api;
