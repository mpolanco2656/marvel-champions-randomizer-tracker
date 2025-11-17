/**
 * Export/Import utilities for Marvel Champions data
 */

import type { GameHistory, Villain, ModularSet } from '../types';

// Version for compatibility tracking
const EXPORT_VERSION = '1.0.0';

// Estimated hours per game for statistics calculation
const ESTIMATED_HOURS_PER_GAME = 1;

export interface ExportMetadata {
  version: string;
  exportDate: string;
  appName: string;
}

export interface CollectionExportData {
  campaigns: string[];
  scenarioPacks: string[];
  heroPacks: string[];
}

export interface HistoryExportData {
  history: GameHistory[];
  stats: {
    totalGames: number;
    wins: number;
    losses: number;
    winRate: number;
    uniqueHeroes: number;
    uniqueVillains: number;
    hoursPlayed: number;
  };
}

export interface CampaignExportData {
  activeCampaign: string | null;
  completedScenarios: Record<string, number>;
}

export interface CampaignScenarioExportData {
  villain: Villain;
  modulars: ModularSet[];
  completed: boolean;
}

export interface CampaignRandomExportData {
  activeCampaign: string | null;
  randomMode: 'campaign' | 'mixed';
  campaignScenarios: CampaignScenarioExportData[];
  mixedScenarios: CampaignScenarioExportData[];
}

export interface FullExportData {
  metadata: ExportMetadata;
  collection: CollectionExportData;
  history: HistoryExportData;
  campaign: CampaignExportData;
  campaignRandom: CampaignRandomExportData;
}

/**
 * Create base export data structure with metadata and empty sections
 */
function createBaseExportData(): FullExportData {
  return {
    metadata: {
      version: EXPORT_VERSION,
      exportDate: new Date().toISOString(),
      appName: 'Marvel Champions Randomizer & Tracker',
    },
    collection: {
      campaigns: [],
      scenarioPacks: [],
      heroPacks: [],
    },
    history: {
      history: [],
      stats: {
        totalGames: 0,
        wins: 0,
        losses: 0,
        winRate: 0,
        uniqueHeroes: 0,
        uniqueVillains: 0,
        hoursPlayed: 0,
      },
    },
    campaign: {
      activeCampaign: null,
      completedScenarios: {},
    },
    campaignRandom: {
      activeCampaign: null,
      randomMode: 'campaign',
      campaignScenarios: [],
      mixedScenarios: [],
    },
  };
}

/**
 * Calculate statistics from history data
 */
export function calculateStats(history: GameHistory[]): HistoryExportData['stats'] {
  const wins = history.filter((game) => game.result === 'win').length;
  const losses = history.filter((game) => game.result === 'loss').length;
  const totalGames = history.length;
  const winRate = totalGames > 0 ? (wins / totalGames) * 100 : 0;

  const uniqueHeroes = new Set(history.flatMap((game) => game.heroes)).size;
  const uniqueVillains = new Set(history.map((game) => game.villain)).size;

  const hoursPlayed = totalGames * ESTIMATED_HOURS_PER_GAME;

  return {
    totalGames,
    wins,
    losses,
    winRate: Math.round(winRate * 10) / 10,
    uniqueHeroes,
    uniqueVillains,
    hoursPlayed,
  };
}

/**
 * Export collection data to JSON
 */
export function exportCollectionData(collection: CollectionExportData): string {
  const exportData = createBaseExportData();
  exportData.collection = collection;

  return JSON.stringify(exportData, null, 2);
}

/**
 * Export history data to JSON
 */
export function exportHistoryData(history: GameHistory[]): string {
  const exportData = createBaseExportData();
  const stats = calculateStats(history);

  exportData.history = {
    history,
    stats,
  };

  return JSON.stringify(exportData, null, 2);
}

/**
 * Export campaign tracker data to JSON
 */
export function exportCampaignData(
  activeCampaign: string | null,
  completedScenarios: Record<string, number>
): string {
  const exportData = createBaseExportData();

  exportData.campaign = {
    activeCampaign,
    completedScenarios,
  };

  return JSON.stringify(exportData, null, 2);
}

/**
 * Export campaign randomizer data to JSON
 */
export function exportCampaignRandomData(
  activeCampaign: string | null,
  randomMode: 'campaign' | 'mixed',
  campaignScenarios: CampaignScenarioExportData[],
  mixedScenarios: CampaignScenarioExportData[]
): string {
  const exportData = createBaseExportData();

  exportData.campaignRandom = {
    activeCampaign,
    randomMode,
    campaignScenarios,
    mixedScenarios,
  };

  return JSON.stringify(exportData, null, 2);
}

/**
 * Export all data to JSON
 */
export function exportAllData(
  collection: CollectionExportData,
  history: GameHistory[],
  campaign: CampaignExportData,
  campaignRandom: CampaignRandomExportData
): string {
  const exportData = createBaseExportData();
  const stats = calculateStats(history);

  exportData.collection = collection;
  exportData.history = {
    history,
    stats,
  };
  exportData.campaign = campaign;
  exportData.campaignRandom = campaignRandom;

  return JSON.stringify(exportData, null, 2);
}

/**
 * Download JSON file
 */
export function downloadJSON(jsonString: string, filename: string): void {
  const blob = new Blob([jsonString], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Parse and validate imported JSON data
 */
export function parseImportData(jsonString: string): FullExportData | null {
  try {
    const data = JSON.parse(jsonString);

    // Validate required structure
    if (!data.metadata || !data.metadata.version) {
      throw new Error('Invalid export file: missing metadata');
    }

    // Basic validation
    if (!data.collection && !data.history && !data.campaign && !data.campaignRandom) {
      throw new Error('Invalid export file: no data found');
    }

    return data as FullExportData;
  } catch (error) {
    console.error('Error parsing import data:', error);
    return null;
  }
}

/**
 * Import data from file input
 */
export function importFromFile(
  file: File,
  onSuccess: (data: FullExportData) => void,
  onError: (error: string) => void
): void {
  const reader = new FileReader();

  reader.onload = (e) => {
    const content = e.target?.result as string;
    const data = parseImportData(content);

    if (data) {
      onSuccess(data);
    } else {
      onError('Failed to parse import file. Please check the file format.');
    }
  };

  reader.onerror = () => {
    onError('Failed to read file. Please try again.');
  };

  reader.readAsText(file);
}
