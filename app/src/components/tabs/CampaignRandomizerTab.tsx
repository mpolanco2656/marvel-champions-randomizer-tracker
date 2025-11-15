import type { Campaign, Collection, CampaignScenario, Villain, ModularSet } from '../../types';
import { Check, Shuffle } from 'lucide-react';
import { useState } from 'react';
import { selectThematicModulars } from '../../utils/gameLogic';

interface CampaignRandomizerTabProps {
  campaigns: Campaign[];
  villains: Villain[];
  collection: Collection;
  activeCampaign: string | null;
  campaignScenarios: CampaignScenario[];
  generateCampaignScenarios: (campaignKey: string) => void;
  markScenarioComplete: (index: number) => void;
  modularSets: ModularSet[];
  thematicPairing: boolean;
  modularCount: number;
  filterModulars: () => ModularSet[];
}

export default function CampaignRandomizerTab({
  campaigns,
  villains,
  collection,
  activeCampaign,
  campaignScenarios,
  generateCampaignScenarios,
  markScenarioComplete,
  modularSets,
  thematicPairing,
  modularCount,
  filterModulars,
}: CampaignRandomizerTabProps) {
  const [randomMode, setRandomMode] = useState<'campaign' | 'mixed'>('campaign');
  const [mixedScenarios, setMixedScenarios] = useState<CampaignScenario[]>([]);

  const filteredCampaigns = campaigns.filter(c => collection.campaigns.includes(c.key));
  const activeCampaignData = campaigns.find(c => c.key === activeCampaign);

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
      alert('No tienes villanos disponibles en tu colección');
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

  const markMixedScenarioComplete = (index: number) => {
    setMixedScenarios(prev =>
      prev.map((scenario, i) =>
        i === index ? { ...scenario, completed: true } : scenario
      )
    );
  };

  const currentScenarios = randomMode === 'campaign' ? campaignScenarios : mixedScenarios;
  const completedCount = currentScenarios.filter(s => s.completed).length;

  return (
    <div className="space-y-6">
      {/* Mode Toggle */}
      <div className="bg-black bg-opacity-40 rounded-lg p-6">
        <h2 className="text-3xl font-bold text-yellow-300 mb-4">Campaign Randomizer</h2>
        <p className="text-gray-300 mb-4">
          Genera escenarios con sets modulares aleatorios para máxima replayability.
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
            Modo A: Campaña con Modulares Random
          </button>
          <button
            onClick={() => setRandomMode('mixed')}
            className={`flex-1 py-3 px-4 rounded-lg font-bold transition-all ${
              randomMode === 'mixed'
                ? 'bg-yellow-500 text-black'
                : 'bg-gray-700 hover:bg-gray-600 text-white'
            }`}
          >
            Modo B: Villanos Mezclados (5 Random)
          </button>
        </div>

        {/* Mode A: Campaign Selection */}
        {randomMode === 'campaign' && (
          <div>
            <h3 className="text-xl font-bold text-blue-300 mb-3">Selecciona una Campaña:</h3>
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
                    Wave {campaign.wave === 0 ? 'Core' : campaign.wave} • {campaign.villains.length} Escenarios
                  </div>
                  {activeCampaign === campaign.key && (
                    <div className="text-xs text-green-400 mt-2">✓ Campaña activa - Ver escenarios abajo</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Mode B: Generate Mixed Scenarios */}
        {randomMode === 'mixed' && (
          <div>
            <h3 className="text-xl font-bold text-blue-300 mb-3">Genera 5 Escenarios Aleatorios:</h3>
            <button
              onClick={generateMixedScenarios}
              className="w-full bg-gradient-to-r from-red-600 to-purple-600 hover:from-red-700 hover:to-purple-700 text-white font-bold py-4 px-6 rounded-lg text-xl transition-all transform hover:scale-105 flex items-center justify-center gap-2"
            >
              <Shuffle size={24} />
              Generar 5 Escenarios Random
            </button>
          </div>
        )}

        {filteredCampaigns.length === 0 && randomMode === 'campaign' && (
          <div className="text-center text-gray-400 py-8">
            No tienes campañas en tu colección. Ve a la pestaña Colección para añadirlas.
          </div>
        )}
      </div>

      {/* Scenarios List */}
      {currentScenarios.length > 0 && (
        <div className="bg-black bg-opacity-40 rounded-lg p-6">
          <h3 className="text-2xl font-bold text-yellow-300 mb-4">
            {randomMode === 'campaign' && activeCampaignData ? `${activeCampaignData.name} - ` : ''}
            Escenarios Generados
          </h3>
          <p className="text-sm text-gray-400 mb-4">
            {randomMode === 'campaign'
              ? 'Villanos en orden de campaña con sets modulares aleatorios.'
              : 'Villanos completamente mezclados de tu colección.'}
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
                      <span className="text-sm font-bold text-gray-400">Escenario {idx + 1}</span>
                      {scenario.completed && (
                        <span className="bg-green-600 text-white text-xs px-2 py-1 rounded font-bold">
                          ✓ COMPLETADO
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
                  <div className="text-sm font-bold text-yellow-300">Mecánicas: {scenario.villain.mechanics}</div>
                  <div className="text-xs text-gray-300 mt-1">{scenario.villain.description}</div>
                </div>

                {/* Modulars */}
                <div className="mb-3">
                  <div className="text-sm font-bold text-purple-300 mb-2">Sets Modulares:</div>
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
                    Marcar como Completado
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* Progress Summary */}
          <div className="mt-6 bg-blue-900 bg-opacity-40 rounded p-4">
            <div className="text-sm font-bold text-blue-300 mb-2">Progreso</div>
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
                🎉 ¡Todos los Escenarios Completados!
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
