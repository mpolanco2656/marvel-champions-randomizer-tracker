import type { Campaign, Collection, CampaignScenario, Villain, ModularSet } from '../../types';
import { Check, Shuffle, Trash2, RefreshCw } from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { selectThematicModulars } from '../../utils/gameLogic';
import { getOwnedSources } from '../../utils/gameLogic';

interface CampaignRandomizerTabProps {
  campaigns: Campaign[];
  villains: Villain[];
  collection: Collection;
  modularSets: ModularSet[];
  activeCampaign: string | null;
  randomMode: 'campaign' | 'mixed';
  campaignScenarios: CampaignScenario[];
  mixedScenarios: CampaignScenario[];
  setActiveCampaign: (campaignKey: string | null) => void;
  setCampaignScenarios: (scenarios: CampaignScenario[]) => void;
  markScenarioComplete: (index: number) => void;
  setRandomMode: (mode: 'campaign' | 'mixed') => void;
  setMixedScenarios: (scenarios: CampaignScenario[]) => void;
  markMixedScenarioComplete: (index: number) => void;
  clearCampaignScenarios: () => void;
  clearMixedScenarios: () => void;
}

export default function CampaignRandomizerTab({
  campaigns,
  villains,
  collection,
  modularSets,
  activeCampaign,
  randomMode,
  campaignScenarios,
  mixedScenarios,
  setActiveCampaign,
  setCampaignScenarios,
  markScenarioComplete,
  setRandomMode,
  setMixedScenarios,
  markMixedScenarioComplete,
  clearCampaignScenarios,
  clearMixedScenarios,
}: CampaignRandomizerTabProps) {
  const { t } = useTranslation('campaignRandomizer');
  // Independent state for Campaign Randomizer
  const [thematicPairing, setThematicPairing] = useState(false);
  const [modularCount, setModularCount] = useState(2);

  const filteredCampaigns = campaigns.filter(c => collection.campaigns.includes(c.key));
  const activeCampaignData = campaigns.find(c => c.key === activeCampaign);

  // Filter modulars based on owned content
  const filterModulars = (): ModularSet[] => {
    const ownedSources = getOwnedSources(collection.campaigns, collection.scenarioPacks, collection.heroPacks || []);
    return modularSets.filter(modular => ownedSources.includes(modular.source));
  };

  // Generate campaign scenarios with random modulars
  const generateCampaignScenarios = (campaignKey: string) => {
    const campaign = campaigns.find(c => c.key === campaignKey);
    if (!campaign) return;

    const availableModulars = filterModulars();

    const scenarios: CampaignScenario[] = campaign.villains.map(villainKey => {
      const villain = villains.find(v => v.key === villainKey);
      if (!villain) return null;

      // Generate random modulars for this scenario
      let selectedModulars: ModularSet[];
      if (thematicPairing) {
        selectedModulars = selectThematicModulars(villain, availableModulars, modularCount);
      } else {
        const shuffled = [...availableModulars].sort(() => Math.random() - 0.5);
        selectedModulars = shuffled.slice(0, Math.min(modularCount, shuffled.length));
      }

      return {
        villain,
        modulars: selectedModulars,
        completed: false
      };
    }).filter((s): s is CampaignScenario => s !== null);

    setCampaignScenarios(scenarios);
    setActiveCampaign(campaignKey);
  };

  const generateMixedScenarios = () => {
    // Get all owned villains from campaigns and scenario packs
    const ownedVillains = villains.filter(v => {
      // Check if villain's source is owned
      const sourceCampaign = campaigns.find(c => c.name === v.source);
      if (sourceCampaign && collection.campaigns.includes(sourceCampaign.key)) return true;

      const sourceScenarioPack = collection.scenarioPacks.some(spKey => {
        // This is simplified - ideally we'd have scenario pack data
        return v.source.toLowerCase().includes(spKey);
      });
      return sourceScenarioPack;
    });

    if (ownedVillains.length === 0) {
      alert(t('noVillains'));
      return;
    }

    // Generate 5 random scenarios
    const shuffled = [...ownedVillains].sort(() => Math.random() - 0.5);
    const selected = shuffled.slice(0, Math.min(5, shuffled.length));

    const availableModulars = filterModulars();

    const scenarios: CampaignScenario[] = selected.map(villain => {
      let selectedModulars: ModularSet[];
      if (thematicPairing) {
        selectedModulars = selectThematicModulars(villain, availableModulars, modularCount);
      } else {
        const shuffledMods = [...availableModulars].sort(() => Math.random() - 0.5);
        selectedModulars = shuffledMods.slice(0, Math.min(modularCount, shuffledMods.length));
      }

      return {
        villain,
        modulars: selectedModulars,
        completed: false
      };
    });

    setMixedScenarios(scenarios);
  };

  const currentScenarios = randomMode === 'campaign' ? campaignScenarios : mixedScenarios;
  const completedCount = currentScenarios.filter(s => s.completed).length;

  return (
    <div className="space-y-6">
      {/* Mode Toggle */}
      <div className="bg-black bg-opacity-40 rounded-lg p-6">
        <h2 className="text-3xl font-bold text-yellow-300 mb-4">{t('title')}</h2>
        <p className="text-gray-300 mb-4">
          {t('description')}
        </p>

        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setRandomMode('campaign')}
            className={`flex-1 py-3 px-4 rounded-lg font-bold transition-all ${
              randomMode === 'campaign'
                ? 'bg-yellow-500 text-black'
                : 'bg-gray-700 hover:bg-gray-600 text-white'
            }`}
          >
            {t('modeA')}
          </button>
          <button
            onClick={() => setRandomMode('mixed')}
            className={`flex-1 py-3 px-4 rounded-lg font-bold transition-all ${
              randomMode === 'mixed'
                ? 'bg-yellow-500 text-black'
                : 'bg-gray-700 hover:bg-gray-600 text-white'
            }`}
          >
            {t('modeB')}
          </button>
        </div>

        {/* Configuration Options */}
        <div className="bg-gray-800 bg-opacity-60 rounded-lg p-4 mb-6 space-y-4">
          <h3 className="text-sm font-bold text-gray-300 mb-3">{t('configuration')}</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Modular Count */}
            <div>
              <label className="block text-sm font-bold text-gray-300 mb-2">{t('modularCount')}</label>
              <select
                value={modularCount}
                onChange={(e) => setModularCount(Number(e.target.value))}
                className="w-full p-2 rounded bg-gray-700 border border-gray-600 text-white"
              >
                <option value={1}>{t('oneSet')}</option>
                <option value={2}>{t('twoSetsRecommended')}</option>
                <option value={3}>{t('threeSets')}</option>
              </select>
            </div>

            {/* Thematic Pairing */}
            <div>
              <label className="block text-sm font-bold text-gray-300 mb-2">{t('pairing')}</label>
              <label className="flex items-center gap-3 cursor-pointer bg-gray-700 p-2 rounded border border-gray-600 hover:border-yellow-400 transition-all">
                <input
                  type="checkbox"
                  checked={thematicPairing}
                  onChange={(e) => setThematicPairing(e.target.checked)}
                  className="w-5 h-5"
                />
                <span className="text-sm text-white">{t('thematicPairing')}</span>
              </label>
              <p className="text-xs text-gray-400 mt-1">
                {t('thematicPairingDesc')}
              </p>
            </div>
          </div>
        </div>

        {/* Mode A: Campaign Selection */}
        {randomMode === 'campaign' && (
          <div>
            <h3 className="text-xl font-bold text-blue-300 mb-3">{t('selectCampaign')}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredCampaigns.map(campaign => (
                <div
                  key={campaign.key}
                  onClick={() => generateCampaignScenarios(campaign.key)}
                  className={`bg-gradient-to-br from-purple-800 to-blue-800 rounded-lg p-5 border-2 cursor-pointer transition-all ${
                    activeCampaign === campaign.key ? 'border-yellow-300' : 'border-yellow-400 hover:border-yellow-300'
                  }`}
                >
                  <h3 className="text-xl font-bold text-yellow-300 mb-2">{campaign.name}</h3>
                  <div className="text-sm text-gray-300 mb-2">
                    {t('wave')} {campaign.wave === 0 ? t('core') : campaign.wave} • {campaign.villains.length} {t('scenarios')}
                  </div>
                  {activeCampaign === campaign.key && (
                    <div className="text-xs text-green-400 mt-2">{t('activeCampaign')}</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Mode B: Generate Mixed Scenarios */}
        {randomMode === 'mixed' && (
          <div>
            <h3 className="text-xl font-bold text-blue-300 mb-3">{t('generateRandomTitle')}</h3>
            <button
              onClick={generateMixedScenarios}
              className="w-full bg-gradient-to-r from-red-600 to-purple-600 hover:from-red-700 hover:to-purple-700 text-white font-bold py-4 px-6 rounded-lg text-xl transition-all transform hover:scale-105 flex items-center justify-center gap-2"
            >
              <Shuffle size={24} />
              {t('generateButton')}
            </button>
          </div>
        )}

        {filteredCampaigns.length === 0 && randomMode === 'campaign' && (
          <div className="text-center text-gray-400 py-8">
            {t('noCampaigns')}
          </div>
        )}
      </div>

      {/* Scenarios List */}
      {currentScenarios.length > 0 && (
        <div className="bg-black bg-opacity-40 rounded-lg p-6">
          <h3 className="text-2xl font-bold text-yellow-300 mb-4">
            {randomMode === 'campaign' && activeCampaignData ? `${activeCampaignData.name} - ` : ''}
            {t('generatedScenarios')}
          </h3>
          <p className="text-sm text-gray-400 mb-4">
            {randomMode === 'campaign'
              ? t('campaignOrder')
              : t('mixedVillains')}
          </p>

          <div className="space-y-4">
            {currentScenarios.map((scenario, idx) => (
              <div
                key={idx}
                className={`rounded-lg p-5 border-2 transition-all ${
                  scenario.completed
                    ? 'bg-green-900 bg-opacity-30 border-green-500'
                    : 'bg-gradient-to-br from-red-800 to-orange-800 border-yellow-400'
                }`}
              >
                <div className="flex justify-between items-start mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-bold text-gray-400">{t('scenario')} {idx + 1}</span>
                      {scenario.completed && (
                        <span className="bg-green-600 text-white text-xs px-2 py-1 rounded font-bold">
                          {t('completedBadge')}
                        </span>
                      )}
                    </div>
                    <h4 className="text-xl font-bold text-yellow-300">{scenario.villain.name}</h4>
                    <div className="text-sm text-gray-300">{scenario.villain.source}</div>
                  </div>
                  <div className="bg-yellow-500 text-black px-3 py-2 rounded font-bold text-lg">
                    {scenario.villain.difficulty}/10
                  </div>
                </div>

                <div className="bg-black bg-opacity-40 rounded p-3 mb-3">
                  <div className="text-sm font-bold text-yellow-300">{t('mechanics')} {scenario.villain.mechanics}</div>
                  <div className="text-xs text-gray-300 mt-1">{scenario.villain.description}</div>
                </div>

                {/* Modulars */}
                <div className="mb-3">
                  <div className="text-sm font-bold text-purple-300 mb-2">{t('modularSets')}</div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {scenario.modulars.map((modular, mIdx) => (
                      <div key={mIdx} className="bg-purple-900 bg-opacity-40 rounded p-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-bold">{modular.name}</span>
                          <div className="flex gap-1">
                            {[...Array(5)].map((_, i) => (
                              <div
                                key={i}
                                className={`w-2 h-2 rounded-full ${
                                  i < modular.difficulty ? 'bg-red-500' : 'bg-gray-600'
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                        <div className="text-xs text-gray-400">{modular.source}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {!scenario.completed && (
                  <button
                    onClick={() => randomMode === 'campaign' ? markScenarioComplete(idx) : markMixedScenarioComplete(idx)}
                    className="w-full bg-green-600 hover:bg-green-700 font-bold py-2 px-4 rounded flex items-center justify-center gap-2"
                  >
                    <Check size={16} />
                    {t('markCompleted')}
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* Progress Summary */}
          <div className="mt-6 bg-blue-900 bg-opacity-40 rounded p-4">
            <div className="text-sm font-bold text-blue-300 mb-2">{t('progress')}</div>
            <div className="flex items-center gap-3">
              <div className="flex-1 bg-gray-700 rounded h-3">
                <div
                  className="bg-yellow-500 h-3 rounded transition-all"
                  style={{
                    width: `${(completedCount / currentScenarios.length) * 100}%`
                  }}
                />
              </div>
              <div className="text-sm font-bold">
                {completedCount}/{currentScenarios.length}
              </div>
            </div>
            {currentScenarios.every(s => s.completed) && (
              <div className="mt-3 text-center text-green-400 font-bold text-lg">
                {t('allScenariosCompleted')}
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="mt-6 space-y-3">
            {/* Re-generate Modulars (only for Campaign mode) */}
            {randomMode === 'campaign' && activeCampaign && (
              <button
                onClick={() => {
                  if (window.confirm(t('regenerateConfirm'))) {
                    generateCampaignScenarios(activeCampaign);
                  }
                }}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition-all flex items-center justify-center gap-2"
              >
                <RefreshCw size={18} />
                {t('regenerateModulars')}
              </button>
            )}

            {/* Clear Scenarios Button */}
            <button
              onClick={() => {
                const message = randomMode === 'campaign'
                  ? t('clearCampaignConfirm')
                  : t('clearMixedConfirm');

                if (window.confirm(message)) {
                  randomMode === 'campaign' ? clearCampaignScenarios() : clearMixedScenarios();
                }
              }}
              className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-4 rounded-lg transition-all flex items-center justify-center gap-2"
            >
              <Trash2 size={18} />
              {randomMode === 'campaign' ? t('clearCampaign') : t('clearMixed')}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
