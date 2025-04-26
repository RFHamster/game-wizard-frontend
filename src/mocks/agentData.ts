// src/mocks/agentData.ts
import { Agent, AgentStatus } from '../types/Agent';

export const mockAgents: Agent[] = [
  {
    agent_name: "SuperBot",
    game_name: "Chess Master 3000",
    temperature_hints: "Responde com estratégias agressivas",
    status: AgentStatus.ACTIVE,
    collection_name: "chess_strategies"
  },
  {
    agent_name: "HelperAI",
    game_name: "Puzzle Solver",
    status: AgentStatus.CREATED,
  },
  {
    agent_name: "AdvisorBot",
    game_name: "RPG Helper",
    temperature_hints: "Respostas criativas e detalhadas",
    status: AgentStatus.INACTIVE,
    collection_name: "rpg_data"
  },
  {
    agent_name: "TutorIA",
    game_name: "Math Challenge",
    status: AgentStatus.ACTIVE,
    collection_name: "math_problems"
  },
  {
    agent_name: "GameMaster",
    game_name: "Dungeon Explorer",
    temperature_hints: "Respostas narrativas e envolventes",
    status: AgentStatus.ACTIVE,
    collection_name: "dungeon_stories"
  },
  {
    agent_name: "StrategistAI",
    game_name: "War Simulator",
    status: AgentStatus.CREATED,
    collection_name: "battle_tactics"
  }
];
