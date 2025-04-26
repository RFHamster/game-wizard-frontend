// src/types/Agent.ts
export enum AgentStatus {
    CREATED = 'CREATED',
    CREATING='CREATING',
    ACTIVE = 'ACTIVE',
    INACTIVE = 'INACTIVE'
  }
  
  export interface Agent {
    agent_name: string;
    game_name: string;
    temperature_hints?: string;
    status: AgentStatus;
    collection_name?: string;
  }

  export interface MessageOutput {
    message: string;
    agent: string;
  }
  