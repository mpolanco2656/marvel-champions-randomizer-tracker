// ==================== TIPOS ====================
export type Aspect = 'Leadership' | 'Justice' | 'Aggression' | 'Protection' | 'Pool';
export type Tier = 'S+' | 'S' | 'A' | 'B' | 'C';
export type Complexity = 'Beginner' | 'Intermediate' | 'Advanced';
export type Playstyle = 'Control' | 'Aggro' | 'All-rounder' | 'Resource Engine' | 'Support' | 'Setup';
export type PlayerOptimization = 'Solo' | 'Multiplayer' | 'Both';
export type ContentType = 'campaign' | 'scenario' | 'core';

export interface Hero {
  name: string;
  aspect: Aspect;
  tier: Tier;
  complexity: Complexity;
  playstyle: Playstyle[];
  optimization: PlayerOptimization;
  wave: number;
  source: string;
  description: string;
  key: string;
}

export interface Villain {
  name: string;
  source: string;
  difficulty: number;
  mechanics: string;
  description: string;
  key: string;
  campaignOrder?: number;
}

export interface ModularSet {
  name: string;
  difficulty: number;
  source: string;
  key: string;
}

export interface Campaign {
  name: string;
  key: string;
  type: ContentType;
  villains: string[];
  wave: number;
}

export interface ScenarioPack {
  name: string;
  key: string;
  villain: string;
  wave: number;
}

export interface HeroPack {
  name: string;
  key: string;
  hero: string;
  wave: number;
}

export interface GameHistory {
  id: string;
  date: string;
  heroes: string[];
  villain: string;
  modulars: string[];
  result?: 'win' | 'loss';
}

export interface Collection {
  campaigns: string[];
  scenarioPacks: string[];
  heroPacks: string[];
}

export interface ProgressionPhase {
  name: string;
  description: string;
  items: ProgressionItem[];
}

export interface ProgressionItem {
  name: string;
  type: 'campaign' | 'scenario' | 'heroes';
  mode: string;
  note: string;
  key: string;
}

export interface Stats {
  gamesPlayed: number;
  winRate: number;
  uniqueHeroes: number;
  uniqueVillains: number;
  mostPlayed: {
    hero: string;
    count: number;
  };
  collectionPercentage: {
    campaigns: string;
    scenarioPacks: string;
    heroPacks: string;
  };
}
