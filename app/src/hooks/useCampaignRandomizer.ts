import type { CampaignScenario } from '../types';
import { useLocalStorage } from './useLocalStorage';

interface CampaignRandomizerState {
  activeCampaign: string | null;
  randomMode: 'campaign' | 'mixed';
  campaignScenarios: CampaignScenario[];
  mixedScenarios: CampaignScenario[];
}

const INITIAL_STATE: CampaignRandomizerState = {
  activeCampaign: null,
  randomMode: 'campaign',
  campaignScenarios: [],
  mixedScenarios: []
};

export function useCampaignRandomizer() {
  const [state, setState] = useLocalStorage<CampaignRandomizerState>('mcCampaignRandomizer', INITIAL_STATE);

  const setActiveCampaign = (campaignKey: string | null) => {
    setState(prev => ({ ...prev, activeCampaign: campaignKey }));
  };

  const setRandomMode = (mode: 'campaign' | 'mixed') => {
    setState(prev => ({ ...prev, randomMode: mode }));
  };

  const setCampaignScenarios = (scenarios: CampaignScenario[]) => {
    setState(prev => ({ ...prev, campaignScenarios: scenarios }));
  };

  const setMixedScenarios = (scenarios: CampaignScenario[]) => {
    setState(prev => ({ ...prev, mixedScenarios: scenarios }));
  };

  const markCampaignScenarioComplete = (index: number) => {
    setState(prev => ({
      ...prev,
      campaignScenarios: prev.campaignScenarios.map((scenario, i) =>
        i === index ? { ...scenario, completed: true } : scenario
      )
    }));
  };

  const markMixedScenarioComplete = (index: number) => {
    setState(prev => ({
      ...prev,
      mixedScenarios: prev.mixedScenarios.map((scenario, i) =>
        i === index ? { ...scenario, completed: true } : scenario
      )
    }));
  };

  const clearCampaignScenarios = () => {
    setState(prev => ({
      ...prev,
      activeCampaign: null,
      campaignScenarios: []
    }));
  };

  const clearMixedScenarios = () => {
    setState(prev => ({
      ...prev,
      mixedScenarios: []
    }));
  };

  const importCampaignRandomizerData = (importedState: CampaignRandomizerState) => {
    setState(importedState);
  };

  return {
    activeCampaign: state.activeCampaign,
    randomMode: state.randomMode,
    campaignScenarios: state.campaignScenarios,
    mixedScenarios: state.mixedScenarios,
    setActiveCampaign,
    setRandomMode,
    setCampaignScenarios,
    setMixedScenarios,
    markCampaignScenarioComplete,
    markMixedScenarioComplete,
    clearCampaignScenarios,
    clearMixedScenarios,
    importCampaignRandomizerData
  };
}
