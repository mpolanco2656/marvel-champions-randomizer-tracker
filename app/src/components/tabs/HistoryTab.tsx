import { Download, Upload } from 'lucide-react';
import { useRef } from 'react';
import type { GameHistory, Stats, Hero, Villain } from '../../types';
import { exportHistoryData, downloadJSON, importFromFile, type FullExportData } from '../../utils/exportImport';

interface HistoryTabProps {
  history: GameHistory[];
  stats: Stats;
  heroes: Hero[];
  villains: Villain[];
  clearHistory: () => void;
  importHistory: (history: GameHistory[]) => void;
}

export default function HistoryTab({
  history,
  stats,
  heroes,
  villains,
  clearHistory,
  importHistory,
}: HistoryTabProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleExport = () => {
    const jsonData = exportHistoryData(history);
    const timestamp = new Date().toISOString().split('T')[0];
    downloadJSON(jsonData, `mc-history-${timestamp}.json`);
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
        if (data.history && data.history.history) {
          importHistory(data.history.history);
          alert('Historial importado exitosamente!');
        } else {
          alert('No se encontraron datos de historial en el archivo.');
        }
      },
      (error: string) => {
        alert(`Error al importar: ${error}`);
      }
    );

    // Reset input
    event.target.value = '';
  };

  return (
    <div className="space-y-6">
      <div className="bg-black bg-opacity-40 rounded-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-3xl font-bold text-yellow-300">Historial & Estadísticas</h2>
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

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-blue-900 bg-opacity-50 rounded p-4 text-center">
            <div className="text-3xl font-bold">{stats.gamesPlayed}</div>
            <div className="text-sm text-gray-400">Total Juegos</div>
          </div>
          <div className="bg-green-900 bg-opacity-50 rounded p-4 text-center">
            <div className="text-3xl font-bold">{Number.isFinite(stats.winRate) ? stats.winRate.toFixed(1) : "0.0"}%</div>
            <div className="text-sm text-gray-400">Win Rate</div>
          </div>
          <div className="bg-purple-900 bg-opacity-50 rounded p-4 text-center">
            <div className="text-3xl font-bold">{stats.uniqueHeroes}</div>
            <div className="text-sm text-gray-400">Héroes Jugados</div>
          </div>
          <div className="bg-red-900 bg-opacity-50 rounded p-4 text-center">
            <div className="text-3xl font-bold">{stats.uniqueVillains}</div>
            <div className="text-sm text-gray-400">Villanos Enfrentados</div>
          </div>
        </div>

        {/* Most Played Hero */}
        {stats.mostPlayed.count > 0 && (
          <div className="bg-yellow-900 bg-opacity-30 rounded p-4 mb-6">
            <div className="text-sm text-gray-400">Héroe Más Jugado</div>
            <div className="text-2xl font-bold text-yellow-300">
              {stats.mostPlayed.hero} ({stats.mostPlayed.count} juegos)
            </div>
          </div>
        )}

        {/* History List */}
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {history.map(game => {
            const gameHeroes = heroes.filter(h => game.heroes.includes(h.key));
            const gameVillain = villains.find(v => v.key === game.villain);

            return (
              <div key={game.id} className="bg-gray-800 bg-opacity-50 rounded p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <div className="font-bold">{gameHeroes.map(h => h.name).join(', ')}</div>
                    <div className="text-sm text-gray-400">vs {gameVillain?.name}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    {game.result === 'win' && (
                      <div className="bg-green-600 px-3 py-1 rounded font-bold text-sm">WIN</div>
                    )}
                    {game.result === 'loss' && (
                      <div className="bg-red-600 px-3 py-1 rounded font-bold text-sm">LOSS</div>
                    )}
                    <div className="text-xs text-gray-400">
                      {new Date(game.date).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Clear History Button */}
        {history.length > 0 && (
          <button
            onClick={clearHistory}
            className="mt-4 w-full bg-red-600 hover:bg-red-700 font-bold py-2 px-4 rounded"
          >
            Limpiar Historial
          </button>
        )}

        {/* Empty State */}
        {history.length === 0 && (
          <div className="text-center text-gray-400 py-8">
            No hay juegos en el historial aún. Juega algunas partidas y guarda los resultados para ver estadísticas.
          </div>
        )}
      </div>
    </div>
  );
}
