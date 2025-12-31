export enum GamePhase {
  INTRO = 'INTRO',
  MODE_SELECTION = 'MODE_SELECTION',
  IDLE = 'IDLE',
  SHUFFLING = 'SHUFFLING',
  READY = 'READY',
  PLAYING = 'PLAYING',
  FINISHED = 'FINISHED'
}

export enum CardCategory {
  QUICK = 'Rápida',
  CLASSIC = 'Clásico',
  DUET = 'Grupo/Dueto',
  CHALLENGE = 'Reto',
  ACTING = 'Actuación',
  WILDCARD = 'Comodín'
}

export interface CardData {
  id: string;
  text: string;
  category: CardCategory;
  color: string;
  suggestions?: string[];
}

export interface GeminiResponse {
  challenges: Array<{
    text: string;
    category: string;
  }>;
}