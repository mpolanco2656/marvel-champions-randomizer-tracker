import type { Stats } from '../../types';

interface StatsBarProps {
  stats: Stats;
}

export default function StatsBar({ stats }: StatsBarProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
      {/* Juegos Jugados */}
      <div className="bg-black bg-opacity-40 rounded-lg p-4 text-center">
        <p className="text-gray-400 text-sm mb-1">Juegos Jugados</p>
        <p className="text-3xl font-bold text-yellow-300">{stats.gamesPlayed}</p>
      </div>

      {/* Win Rate */}
      <div className="bg-black bg-opacity-40 rounded-lg p-4 text-center">
        <p className="text-gray-400 text-sm mb-1">Win Rate</p>
        <p className="text-3xl font-bold text-green-400">
          {(stats.winRate * 100).toFixed(1)}%
        </p>
      </div>

      {/* % Campañas */}
      <div className="bg-black bg-opacity-40 rounded-lg p-4 text-center">
        <p className="text-gray-400 text-sm mb-1">% Campañas</p>
        <p className="text-3xl font-bold text-blue-400">
          {stats.collectionPercentage.campaigns}
        </p>
      </div>

      {/* % Scenarios */}
      <div className="bg-black bg-opacity-40 rounded-lg p-4 text-center">
        <p className="text-gray-400 text-sm mb-1">% Scenarios</p>
        <p className="text-3xl font-bold text-purple-400">
          {stats.collectionPercentage.scenarioPacks}
        </p>
      </div>

      {/* % Hero Packs */}
      <div className="bg-black bg-opacity-40 rounded-lg p-4 text-center">
        <p className="text-gray-400 text-sm mb-1">% Hero Packs</p>
        <p className="text-3xl font-bold text-pink-400">
          {stats.collectionPercentage.heroPacks}
        </p>
      </div>
    </div>
  );
}
