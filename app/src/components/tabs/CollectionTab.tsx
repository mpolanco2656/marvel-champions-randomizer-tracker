import { Check, X } from 'lucide-react';
import type { Collection, Campaign, ScenarioPack, HeroPack, Hero, Villain, ModularSet } from '../../types';

interface CollectionTabProps {
  collection: Collection;
  setCollection: React.Dispatch<React.SetStateAction<Collection>>;
  campaigns: Campaign[];
  scenarioPacks: ScenarioPack[];
  heroPacks: HeroPack[];
  heroes: Hero[];
  villains: Villain[];
  modularSets: ModularSet[];
  getOwnedSources: () => string[];
}

export default function CollectionTab({
  collection,
  setCollection,
  campaigns,
  scenarioPacks,
  heroPacks,
  heroes,
  villains,
  modularSets,
  getOwnedSources,
}: CollectionTabProps) {
  return (
    <div className="space-y-6">
      {/* Campaigns */}
      <div className="bg-black bg-opacity-40 rounded-lg p-6">
        <h3 className="text-2xl font-bold text-yellow-300 mb-4">
          Campañas ({collection.campaigns.length}/{campaigns.length})
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 mb-4">
          {campaigns.map(campaign => (
            <div
              key={campaign.key}
              onClick={() => {
                if (campaign.key === 'core') return; // Core always included
                setCollection(prev => ({
                  ...prev,
                  campaigns: prev.campaigns.includes(campaign.key)
                    ? prev.campaigns.filter(c => c !== campaign.key)
                    : [...prev.campaigns, campaign.key]
                }));
              }}
              className={`p-3 rounded cursor-pointer transition-all ${
                campaign.key === 'core' ? 'bg-gray-600 cursor-not-allowed' :
                collection.campaigns.includes(campaign.key) ? 'bg-green-600 hover:bg-green-700' : 'bg-gray-700 hover:bg-gray-600'
              }`}
            >
              <div className="flex items-center gap-2">
                {collection.campaigns.includes(campaign.key) ? <Check size={16} /> : <X size={16} />}
                <div>
                  <div className="text-sm font-bold">{campaign.name}</div>
                  <div className="text-xs text-gray-300">Wave {campaign.wave === 0 ? 'Core' : campaign.wave}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setCollection(prev => ({ ...prev, campaigns: campaigns.map(c => c.key) }))}
            className="bg-green-600 hover:bg-green-700 font-bold py-2 px-4 rounded"
          >
            Todas
          </button>
          <button
            onClick={() => setCollection(prev => ({ ...prev, campaigns: ['core'] }))}
            className="bg-red-600 hover:bg-red-700 font-bold py-2 px-4 rounded"
          >
            Solo Core
          </button>
        </div>
      </div>

      {/* Scenario Packs */}
      <div className="bg-black bg-opacity-40 rounded-lg p-6">
        <h3 className="text-2xl font-bold text-purple-400 mb-4">
          Scenario Packs ({collection.scenarioPacks.length}/{scenarioPacks.length})
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 mb-4">
          {scenarioPacks.map(pack => (
            <div
              key={pack.key}
              onClick={() => {
                setCollection(prev => ({
                  ...prev,
                  scenarioPacks: prev.scenarioPacks.includes(pack.key)
                    ? prev.scenarioPacks.filter(p => p !== pack.key)
                    : [...prev.scenarioPacks, pack.key]
                }));
              }}
              className={`p-3 rounded cursor-pointer transition-all ${
                collection.scenarioPacks.includes(pack.key) ? 'bg-green-600 hover:bg-green-700' : 'bg-gray-700 hover:bg-gray-600'
              }`}
            >
              <div className="flex items-center gap-2">
                {collection.scenarioPacks.includes(pack.key) ? <Check size={16} /> : <X size={16} />}
                <div>
                  <div className="text-sm font-bold">{pack.name}</div>
                  <div className="text-xs text-gray-300">Wave {pack.wave}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setCollection(prev => ({ ...prev, scenarioPacks: scenarioPacks.map(p => p.key) }))}
            className="bg-green-600 hover:bg-green-700 font-bold py-2 px-4 rounded"
          >
            Todos
          </button>
          <button
            onClick={() => setCollection(prev => ({ ...prev, scenarioPacks: [] }))}
            className="bg-red-600 hover:bg-red-700 font-bold py-2 px-4 rounded"
          >
            Ninguno
          </button>
        </div>
      </div>

      {/* Hero Packs */}
      <div className="bg-black bg-opacity-40 rounded-lg p-6">
        <h3 className="text-2xl font-bold text-blue-400 mb-4">
          Hero Packs ({(collection.heroPacks || []).length}/{heroPacks.length})
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 mb-4">
          {heroPacks.map(pack => (
            <div
              key={pack.key}
              onClick={() => {
                setCollection(prev => ({
                  ...prev,
                  heroPacks: (prev.heroPacks || []).includes(pack.key)
                    ? (prev.heroPacks || []).filter(p => p !== pack.key)
                    : [...(prev.heroPacks || []), pack.key]
                }));
              }}
              className={`p-3 rounded cursor-pointer transition-all ${
                (collection.heroPacks || []).includes(pack.key) ? 'bg-green-600 hover:bg-green-700' : 'bg-gray-700 hover:bg-gray-600'
              }`}
            >
              <div className="flex items-center gap-2">
                {(collection.heroPacks || []).includes(pack.key) ? <Check size={16} /> : <X size={16} />}
                <div>
                  <div className="text-sm font-bold">{pack.name}</div>
                  <div className="text-xs text-gray-300">Wave {pack.wave}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setCollection(prev => ({ ...prev, heroPacks: heroPacks.map(p => p.key) }))}
            className="bg-green-600 hover:bg-green-700 font-bold py-2 px-4 rounded"
          >
            Todos
          </button>
          <button
            onClick={() => setCollection(prev => ({ ...prev, heroPacks: [] }))}
            className="bg-red-600 hover:bg-red-700 font-bold py-2 px-4 rounded"
          >
            Ninguno
          </button>
        </div>
      </div>

      {/* Summary */}
      <div className="bg-gradient-to-r from-green-900 to-blue-900 bg-opacity-60 rounded-lg p-6">
        <h3 className="text-xl font-bold text-yellow-300 mb-3">Resumen de Colección</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div>
            <div className="text-3xl font-bold text-green-400">
              {heroes.filter(h => getOwnedSources().includes(h.source)).length}
            </div>
            <div className="text-sm text-gray-400">Héroes Disponibles</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-red-400">
              {villains.filter(v => getOwnedSources().includes(v.source)).length}
            </div>
            <div className="text-sm text-gray-400">Villanos Disponibles</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-purple-400">
              {modularSets.filter(m => getOwnedSources().includes(m.source)).length}
            </div>
            <div className="text-sm text-gray-400">Sets Modulares</div>
          </div>
        </div>
      </div>
    </div>
  );
}
