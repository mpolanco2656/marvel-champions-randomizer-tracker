import type { Campaign, Collection, CampaignScenario } from '../../types';
import { Check, X } from 'lucide-react';

interface CampaignTabProps {
  campaigns: Campaign[];
  collection: Collection;
  activeCampaign: string | null;
  campaignScenarios: CampaignScenario[];
  generateCampaignScenarios: (campaignKey: string) => void;
  markScenarioComplete: (index: number) => void;
}

export default function CampaignTab({
  campaigns,
  collection,
  activeCampaign,
  campaignScenarios,
  generateCampaignScenarios,
  markScenarioComplete,
}: CampaignTabProps) {
  const filteredCampaigns = campaigns.filter(c => collection.campaigns.includes(c.key));
  const activeCampaignData = campaigns.find(c => c.key === activeCampaign);

  return (
    <div className="space-y-6">
      <div className="bg-black bg-opacity-40 rounded-lg p-6">
        <h2 className="text-3xl font-bold text-yellow-300 mb-4">Modo Campaña</h2>
        <p className="text-gray-300 mb-6">Selecciona una campaña para generar todos los escenarios con modulares aleatorios.</p>

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

        {filteredCampaigns.length === 0 && (
          <div className="text-center text-gray-400 py-8">
            No tienes campañas en tu colección. Ve a la pestaña Colección para añadirlas.
          </div>
        )}
      </div>

      {/* Scenarios List */}
      {activeCampaign && campaignScenarios.length > 0 && (
        <div className="bg-black bg-opacity-40 rounded-lg p-6">
          <h3 className="text-2xl font-bold text-yellow-300 mb-4">
            {activeCampaignData?.name} - Escenarios Generados
          </h3>
          <p className="text-sm text-gray-400 mb-4">
            Todos los escenarios han sido generados con sets modulares aleatorios. Marca cada uno como completado al terminar.
          </p>

          <div className="space-y-4">
            {campaignScenarios.map((scenario, idx) => (
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
                    onClick={() => markScenarioComplete(idx)}
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
            <div className="text-sm font-bold text-blue-300 mb-2">Progreso de la Campaña</div>
            <div className="flex items-center gap-3">
              <div className="flex-1 bg-gray-700 rounded h-3">
                <div
                  className="bg-yellow-500 h-3 rounded transition-all"
                  style={{
                    width: `${(campaignScenarios.filter(s => s.completed).length / campaignScenarios.length) * 100}%`
                  }}
                />
              </div>
              <div className="text-sm font-bold">
                {campaignScenarios.filter(s => s.completed).length}/{campaignScenarios.length}
              </div>
            </div>
            {campaignScenarios.every(s => s.completed) && (
              <div className="mt-3 text-center text-green-400 font-bold text-lg">
                🎉 ¡Campaña Completada!
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
