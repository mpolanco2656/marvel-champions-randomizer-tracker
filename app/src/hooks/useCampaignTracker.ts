import { useLocalStorage } from './useLocalStorage';

interface CampaignTrackerState {
  activeCampaign: string | null;
  completedScenarios: Record<string, number>;
}

const INITIAL_STATE: CampaignTrackerState = {
  activeCampaign: null,
  completedScenarios: {}
};

export function useCampaignTracker() {
  const [state, setState] = useLocalStorage<CampaignTrackerState>('mcCampaignTracker', INITIAL_STATE);

  const setActiveCampaign = (campaignKey: string | null) => {
    setState(prev => ({ ...prev, activeCampaign: campaignKey }));
  };

  const toggleScenario = (campaignKey: string, scenarioIndex: number) => {
    setState(prev => {
      const key = `${campaignKey}_${scenarioIndex}`;
      const current = prev.completedScenarios[key] || 0;
      return {
        ...prev,
        completedScenarios: {
          ...prev.completedScenarios,
          [key]: current ? 0 : 1
        }
      };
    });
  };

  const getCompletedCount = (campaignKey: string, totalScenarios: number) => {
    let count = 0;
    for (let i = 0; i < totalScenarios; i++) {
      if (state.completedScenarios[`${campaignKey}_${i}`]) count++;
    }
    return count;
  };

  const clearCampaign = (campaignKey: string) => {
    setState(prev => {
      const newCompleted = { ...prev.completedScenarios };
      Object.keys(newCompleted).forEach(key => {
        if (key.startsWith(campaignKey)) {
          delete newCompleted[key];
        }
      });
      return {
        ...prev,
        completedScenarios: newCompleted
      };
    });
  };

  const importCampaignData = (importedState: CampaignTrackerState) => {
    setState(importedState);
  };

  return {
    activeCampaign: state.activeCampaign,
    completedScenarios: state.completedScenarios,
    setActiveCampaign,
    toggleScenario,
    getCompletedCount,
    clearCampaign,
    importCampaignData
  };
}
