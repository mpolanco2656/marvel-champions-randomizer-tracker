import type { Campaign, Collection } from '../../types';
import { Check, RotateCcw, Download, Upload } from 'lucide-react';
import { useRef } from 'react';
import { useCampaignTracker } from '../../hooks/useCampaignTracker';
import { exportCampaignData, downloadJSON, importFromFile, type FullExportData } from '../../utils/exportImport';

interface CampaignTabProps {
  campaigns: Campaign[];
  collection: Collection;
}

export default function CampaignTab({
  campaigns,
  collection,
}: CampaignTabProps) {
  const {
    activeCampaign,
    completedScenarios,
    setActiveCampaign,
    toggleScenario,
    getCompletedCount,
    clearCampaign,
    importCampaignData
  } = useCampaignTracker();

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleExport = () => {
    const jsonData = exportCampaignData(activeCampaign, completedScenarios);
    const timestamp = new Date().toISOString().split('T')[0];
    downloadJSON(jsonData, `mc-campaign-${timestamp}.json`);
  };

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    importFromFile(
      file,
      (data: FullExportData) => {
        if (data.campaign) {
          importCampaignData(data.campaign);
          alert('Progreso de campaña importado exitosamente!');
        } else {
          alert('No se encontraron datos de campaña en el archivo.');
        }
      },
      (error: string) => {
        alert(`Error al importar: ${error}`);
      }
    );

    // Reset input
    event.target.value = '';
  };

  const filteredCampaigns = campaigns.filter(c => collection.campaigns.includes(c.key));
  const activeCampaignData = campaigns.find(c => c.key === activeCampaign);

  return (
    <div className="space-y-6">
      <div className="bg-black bg-opacity-40 rounded-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-3xl font-bold text-yellow-300">Campaign Tracker</h2>
          <div className="flex gap-3">
            <button
              onClick={handleExport}
              className="bg-blue-600 hover:bg-blue-700 font-bold py-2 px-4 rounded flex items-center gap-2"
            >
              <Download size={16} />
              Export data to JSON
            </button>
            <button
              onClick={handleImportClick}
              className="bg-green-600 hover:bg-green-700 font-bold py-2 px-4 rounded flex items-center gap-2"
            >
              <Upload size={16} />
              Import from JSON
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept=".json"
              onChange={handleFileChange}
              className="hidden"
            />
          </div>
        </div>
        <p className="text-gray-300 mb-6">
          Rastrea tu progreso jugando campañas según el manual oficial. Los modulares están especificados en el rulebook de cada campaña.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredCampaigns.map(campaign => {
            const completed = getCompletedCount(campaign.key, campaign.villains.length);
            const isActive = activeCampaign === campaign.key;

            return (
              <div
                key={campaign.key}
                onClick={() => setActiveCampaign(campaign.key)}
                className={`bg-gradient-to-br from-purple-800 to-blue-800 rounded-lg p-5 border-2 cursor-pointer transition-all ${
                  isActive ? 'border-yellow-300' : 'border-yellow-400 hover:border-yellow-300'
                }`}
              >
                <h3 className="text-xl font-bold text-yellow-300 mb-2">{campaign.name}</h3>
                <div className="text-sm text-gray-300 mb-2">
                  Wave {campaign.wave === 0 ? 'Core' : campaign.wave} • {campaign.villains.length} Escenarios
                </div>

                <div className="bg-black bg-opacity-40 rounded p-3">
                  <div className="text-sm font-bold mb-2">
                    Progreso: {completed}/{campaign.villains.length}
                  </div>
                  <div className="w-full bg-gray-700 rounded h-2">
                    <div
                      className="bg-yellow-500 h-2 rounded transition-all"
                      style={{ width: `${(completed / campaign.villains.length) * 100}%` }}
                    />
                  </div>
                  {completed === campaign.villains.length && (
                    <div className="text-center text-green-400 font-bold text-sm mt-2">
                      ✓ ¡Completada!
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {filteredCampaigns.length === 0 && (
          <div className="text-center text-gray-400 py-8">
            No tienes campañas en tu colección. Ve a la pestaña Colección para añadirlas.
          </div>
        )}
      </div>

      {/* Scenario Checklist */}
      {activeCampaign && activeCampaignData && (
        <div className="bg-black bg-opacity-40 rounded-lg p-6">
          <h3 className="text-2xl font-bold text-yellow-300 mb-4">
            {activeCampaignData.name} - Checklist
          </h3>
          <p className="text-sm text-gray-400 mb-4">
            Consulta el manual de la campaña para los modulares oficiales de cada escenario.
          </p>

          <div className="space-y-3">
            {activeCampaignData.villains.map((villainKey, idx) => {
              const isCompleted = completedScenarios[`${activeCampaign}_${idx}`];

              return (
                <div
                  key={idx}
                  onClick={() => toggleScenario(activeCampaign, idx)}
                  className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                    isCompleted
                      ? 'bg-green-900 bg-opacity-30 border-green-500'
                      : 'bg-gray-800 bg-opacity-50 border-gray-600 hover:border-yellow-400'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-6 h-6 rounded border-2 flex items-center justify-center ${
                        isCompleted ? 'bg-green-600 border-green-400' : 'border-gray-500'
                      }`}>
                        {isCompleted && <Check size={16} className="text-white" />}
                      </div>
                      <div>
                        <div className="text-sm text-gray-400">Escenario {idx + 1}</div>
                        <div className="font-bold text-white capitalize">{villainKey.replace(/_/g, ' ')}</div>
                      </div>
                    </div>
                    {isCompleted && (
                      <span className="bg-green-600 text-white text-xs px-3 py-1 rounded font-bold">
                        ✓ COMPLETADO
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Reset Campaign Button */}
          {getCompletedCount(activeCampaign, activeCampaignData.villains.length) > 0 && (
            <div className="mt-6">
              <button
                onClick={() => {
                  if (window.confirm(`¿Resetear todo el progreso de ${activeCampaignData.name}?`)) {
                    clearCampaign(activeCampaign);
                  }
                }}
                className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-4 rounded-lg transition-all flex items-center justify-center gap-2"
              >
                <RotateCcw size={18} />
                Resetear Progreso de Campaña
              </button>
            </div>
          )}

          {getCompletedCount(activeCampaign, activeCampaignData.villains.length) === activeCampaignData.villains.length && (
            <div className="mt-6 bg-green-900 bg-opacity-40 rounded p-4 text-center">
              <div className="text-green-400 font-bold text-lg">
                🎉 ¡Campaña Completada!
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
