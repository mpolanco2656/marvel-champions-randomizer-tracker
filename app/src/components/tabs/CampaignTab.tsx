import type { Campaign, Collection } from '../../types';

interface CampaignTabProps {
  campaigns: Campaign[];
  collection: Collection;
  activeCampaign: string | null;
  setActiveCampaign: (campaignKey: string) => void;
  campaignProgress: number;
  setCampaignProgress: (progress: number) => void;
  nextCampaignScenario: () => void;
}

export default function CampaignTab({
  campaigns,
  collection,
  activeCampaign,
  setActiveCampaign,
  campaignProgress,
  setCampaignProgress,
  nextCampaignScenario,
}: CampaignTabProps) {
  const filteredCampaigns = campaigns.filter(c => collection.campaigns.includes(c.key));

  return (
    <div className="space-y-6">
      <div className="bg-black bg-opacity-40 rounded-lg p-6">
        <h2 className="text-3xl font-bold text-yellow-300 mb-4">Modo Campaña</h2>
        <p className="text-gray-300 mb-6">Juega campañas completas con modulares randomizados por escenario.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredCampaigns.map(campaign => (
            <div
              key={campaign.key}
              onClick={() => {
                setActiveCampaign(campaign.key);
                setCampaignProgress(0);
              }}
              className="bg-gradient-to-br from-purple-800 to-blue-800 rounded-lg p-5 border-2 border-yellow-400 hover:border-yellow-300 cursor-pointer transition-all"
            >
              <h3 className="text-xl font-bold text-yellow-300 mb-2">{campaign.name}</h3>
              <div className="text-sm text-gray-300 mb-3">
                Wave {campaign.wave === 0 ? 'Core' : campaign.wave} • {campaign.villains.length} Escenarios
              </div>

              {activeCampaign === campaign.key && (
                <div className="bg-black bg-opacity-40 rounded p-3">
                  <div className="text-sm font-bold mb-2">
                    Progreso: {campaignProgress}/{campaign.villains.length}
                  </div>
                  <div className="w-full bg-gray-700 rounded h-2 mb-3">
                    <div
                      className="bg-yellow-500 h-2 rounded transition-all"
                      style={{ width: `${(campaignProgress / campaign.villains.length) * 100}%` }}
                    />
                  </div>
                  {campaignProgress < campaign.villains.length && (
                    <button
                      onClick={e => {
                        e.stopPropagation();
                        nextCampaignScenario();
                      }}
                      className="w-full bg-yellow-500 text-black hover:bg-yellow-400 font-bold py-2 px-4 rounded"
                    >
                      Siguiente Escenario
                    </button>
                  )}
                  {campaignProgress >= campaign.villains.length && (
                    <div className="text-center text-green-400 font-bold">✓ ¡Completada!</div>
                  )}
                </div>
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
    </div>
  );
}
