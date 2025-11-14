import { Shuffle, Users, Target, Share2, AlertTriangle, Zap, Info, Check, X } from 'lucide-react';
import type { Hero, Villain, ModularSet, Stats } from '../../types';

interface RandomizerTabProps {
  stats: Stats;
  playerCount: number;
  setPlayerCount: (count: number) => void;
  difficulty: 'Any' | 'Easy' | 'Medium' | 'Hard' | 'Expert';
  setDifficulty: (difficulty: 'Any' | 'Easy' | 'Medium' | 'Hard' | 'Expert') => void;
  complexity: 'Any' | 'Beginner' | 'Intermediate' | 'Advanced';
  setComplexity: (complexity: 'Any' | 'Beginner' | 'Intermediate' | 'Advanced') => void;
  modularCount: number;
  setModularCount: (count: number) => void;
  onlyUnplayed: boolean;
  setOnlyUnplayed: (value: boolean) => void;
  thematicPairing: boolean;
  setThematicPairing: (value: boolean) => void;
  showDifficultyHelp: boolean;
  setShowDifficultyHelp: (value: boolean) => void;
  showComplexityHelp: boolean;
  setShowComplexityHelp: (value: boolean) => void;
  warnings: string[];
  suggestions: string[];
  randomHeroes: Hero[];
  randomVillain: Villain | null;
  randomModulars: ModularSet[];
  generateComplete: () => void;
  generateHeroes: () => void;
  generateVillainSetup: () => void;
  exportSetup: () => void;
  saveToHistory: (result?: 'win' | 'loss') => void;
}

export default function RandomizerTab({
  stats,
  playerCount,
  setPlayerCount,
  difficulty,
  setDifficulty,
  complexity,
  setComplexity,
  modularCount,
  setModularCount,
  onlyUnplayed,
  setOnlyUnplayed,
  thematicPairing,
  setThematicPairing,
  showDifficultyHelp,
  setShowDifficultyHelp,
  showComplexityHelp,
  setShowComplexityHelp,
  warnings,
  suggestions,
  randomHeroes,
  randomVillain,
  randomModulars,
  generateComplete,
  generateHeroes,
  generateVillainSetup,
  exportSetup,
  saveToHistory,
}: RandomizerTabProps) {
  return (
    <div className="space-y-6">
      {/* Quick Stats Bar */}
      <div className="bg-black bg-opacity-40 rounded-lg p-4 flex flex-wrap justify-around gap-4">
        <div className="text-center">
          <div className="text-2xl font-bold text-yellow-300">{stats.gamesPlayed}</div>
          <div className="text-xs text-gray-400">Juegos</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-green-400">{stats.winRate.toFixed(0)}%</div>
          <div className="text-xs text-gray-400">Win Rate</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-blue-400">{stats.collectionPercentage.campaigns}%</div>
          <div className="text-xs text-gray-400">Campañas</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-purple-400">{stats.collectionPercentage.scenarioPacks}%</div>
          <div className="text-xs text-gray-400">Scenarios</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-red-400">{stats.collectionPercentage.heroes}%</div>
          <div className="text-xs text-gray-400">Héroes</div>
        </div>
      </div>

      {/* Main Controls */}
      <div className="bg-black bg-opacity-40 rounded-lg p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          <div>
            <label className="block text-sm font-bold mb-2">Jugadores</label>
            <select
              value={playerCount}
              onChange={(e) => setPlayerCount(Number(e.target.value))}
              className="w-full p-2 rounded bg-gray-800 border border-gray-600"
            >
              <option value={1}>1 (True Solo)</option>
              <option value={2}>2 (Recomendado)</option>
              <option value={3}>3 Jugadores</option>
              <option value={4}>4 Jugadores</option>
            </select>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-2">
              <label className="block text-sm font-bold">Dificultad</label>
              <button
                onClick={() => setShowDifficultyHelp(!showDifficultyHelp)}
                className="text-yellow-400 hover:text-yellow-300"
              >
                <Info size={16} />
              </button>
            </div>
            <select
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value as any)}
              className="w-full p-2 rounded bg-gray-800 border border-gray-600"
            >
              <option value="Any">Cualquiera</option>
              <option value="Easy">Fácil (1-3)</option>
              <option value="Medium">Medio (4-6)</option>
              <option value="Hard">Difícil (7-8)</option>
              <option value="Expert">Experto (9-10)</option>
            </select>
            {showDifficultyHelp && (
              <div className="mt-2 p-3 bg-blue-900 bg-opacity-60 rounded text-xs">
                <div className="font-bold mb-1">Dificultad de Villanos:</div>
                <div><span className="text-green-400">Fácil (1-3):</span> Rhino, Crossbones - para aprender</div>
                <div><span className="text-yellow-400">Medio (4-6):</span> Klaw, Hela - desafío balanceado</div>
                <div><span className="text-orange-400">Difícil (7-8):</span> Red Skull, Loki - estrategia sólida</div>
                <div><span className="text-red-400">Experto (9-10):</span> Thanos, Ronan - los más duros</div>
              </div>
            )}
          </div>

          <div>
            <div className="flex items-center gap-2 mb-2">
              <label className="block text-sm font-bold">Complejidad</label>
              <button
                onClick={() => setShowComplexityHelp(!showComplexityHelp)}
                className="text-yellow-400 hover:text-yellow-300"
              >
                <Info size={16} />
              </button>
            </div>
            <select
              value={complexity}
              onChange={(e) => setComplexity(e.target.value as any)}
              className="w-full p-2 rounded bg-gray-800 border border-gray-600"
            >
              <option value="Any">Cualquiera</option>
              <option value="Beginner">Principiante</option>
              <option value="Intermediate">Intermedio</option>
              <option value="Advanced">Avanzado</option>
            </select>
            {showComplexityHelp && (
              <div className="mt-2 p-3 bg-purple-900 bg-opacity-60 rounded text-xs">
                <div className="font-bold mb-1">Complejidad de Héroes:</div>
                <div><span className="text-green-400">Principiante:</span> Mecánicas simples, pocas decisiones (Cap America, Quicksilver)</div>
                <div><span className="text-yellow-400">Intermedio:</span> Timing y planificación (Black Widow, Spider-Ham)</div>
                <div><span className="text-red-400">Avanzado:</span> Múltiples capas de decisión (Doctor Strange, Adam Warlock)</div>
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-bold mb-2">Modulares</label>
            <select
              value={modularCount}
              onChange={(e) => setModularCount(Number(e.target.value))}
              className="w-full p-2 rounded bg-gray-800 border border-gray-600"
            >
              <option value={1}>1 Set</option>
              <option value={2}>2 Sets</option>
              <option value={3}>3 Sets</option>
            </select>
          </div>
        </div>

        <div className="flex flex-wrap gap-4 mb-4">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={onlyUnplayed}
              onChange={(e) => setOnlyUnplayed(e.target.checked)}
              className="w-5 h-5"
            />
            <span className="text-sm">Solo Héroes No Jugados</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={thematicPairing}
              onChange={(e) => setThematicPairing(e.target.checked)}
              className="w-5 h-5"
            />
            <span className="text-sm">Emparejamiento Temático</span>
          </label>
        </div>

        <button
          onClick={generateComplete}
          className="w-full bg-gradient-to-r from-red-600 to-purple-600 hover:from-red-700 hover:to-purple-700 text-white font-bold py-4 px-6 rounded-lg text-xl transition-all transform hover:scale-105 mb-4"
        >
          <Shuffle className="inline mr-2" size={24} />
          Generar Setup Completo
        </button>

        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={generateHeroes}
            className="bg-blue-600 hover:bg-blue-700 font-bold py-2 px-4 rounded"
          >
            <Users className="inline mr-2" size={16} />
            Solo Héroes
          </button>
          <button
            onClick={generateVillainSetup}
            className="bg-red-600 hover:bg-red-700 font-bold py-2 px-4 rounded"
          >
            <Target className="inline mr-2" size={16} />
            Solo Villano
          </button>
        </div>
      </div>

      {/* Warnings & Suggestions */}
      {(warnings.length > 0 || suggestions.length > 0) && (
        <div className="space-y-2">
          {warnings.map((warning, idx) => (
            <div
              key={idx}
              className="bg-red-900 bg-opacity-40 border-l-4 border-red-500 rounded p-3 flex items-start gap-2"
            >
              <AlertTriangle size={20} className="text-red-400 flex-shrink-0 mt-0.5" />
              <span className="text-sm">{warning}</span>
            </div>
          ))}
          {suggestions.map((suggestion, idx) => (
            <div
              key={idx}
              className="bg-blue-900 bg-opacity-40 border-l-4 border-blue-500 rounded p-3 flex items-start gap-2"
            >
              <Zap size={20} className="text-blue-400 flex-shrink-0 mt-0.5" />
              <span className="text-sm">{suggestion}</span>
            </div>
          ))}
        </div>
      )}

      {/* Results - Heroes */}
      {randomHeroes.length > 0 && (
        <div className="bg-black bg-opacity-40 rounded-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-blue-400">Héroes</h2>
            <button
              onClick={exportSetup}
              className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded flex items-center gap-2 text-sm"
            >
              <Share2 size={16} />
              Exportar
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {randomHeroes.map((hero, idx) => (
              <div
                key={idx}
                className="bg-gradient-to-br from-blue-800 to-purple-800 rounded-lg p-4 border-2 border-yellow-400"
              >
                <div className="flex justify-between mb-2">
                  <div>
                    <h3 className="text-xl font-bold text-yellow-300">{hero.name}</h3>
                    <div className="text-xs text-gray-300">{hero.source}</div>
                  </div>
                  <div className="bg-yellow-500 text-black px-3 py-1 rounded font-bold h-fit">{hero.tier}</div>
                </div>
                <div className="text-sm space-y-1 mb-2">
                  <div><span className="text-yellow-300">Aspecto:</span> {hero.aspect}</div>
                  <div><span className="text-yellow-300">Complejidad:</span> {hero.complexity}</div>
                  <div><span className="text-yellow-300">Estilo:</span> {hero.playstyle.join(', ')}</div>
                </div>
                <div className="bg-black bg-opacity-40 rounded p-2 text-xs text-gray-300">{hero.description}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Results - Villain & Modulars */}
      {randomVillain && (
        <div className="bg-black bg-opacity-40 rounded-lg p-6">
          <h2 className="text-2xl font-bold text-red-400 mb-4">Villano & Modulares</h2>
          <div className="bg-gradient-to-br from-red-800 to-orange-800 rounded-lg p-5 border-2 border-yellow-400 mb-4">
            <div className="flex justify-between mb-3">
              <div>
                <h3 className="text-2xl font-bold text-yellow-300">{randomVillain.name}</h3>
                <div className="text-sm text-gray-300">{randomVillain.source}</div>
              </div>
              <div className="bg-yellow-500 text-black px-4 py-2 rounded font-bold text-xl">{randomVillain.difficulty}/10</div>
            </div>
            <div className="bg-black bg-opacity-40 rounded p-3 text-sm">
              <div className="font-bold text-yellow-300 mb-1">Mecánicas: {randomVillain.mechanics}</div>
              <div className="text-gray-300">{randomVillain.description}</div>
            </div>
          </div>

          {randomModulars.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
              {randomModulars.map((modular, idx) => (
                <div key={idx} className="bg-purple-900 bg-opacity-40 rounded p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-bold">{modular.name}</span>
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <div
                          key={i}
                          className={`w-3 h-3 rounded-full ${i < modular.difficulty ? 'bg-red-500' : 'bg-gray-600'}`}
                        />
                      ))}
                    </div>
                  </div>
                  <div className="text-xs text-gray-400">{modular.source}</div>
                </div>
              ))}
            </div>
          )}

          <div className="mt-4 flex gap-2">
            <button
              onClick={() => saveToHistory('win')}
              className="flex-1 bg-green-600 hover:bg-green-700 font-bold py-2 px-4 rounded"
            >
              <Check size={16} className="inline mr-1" />
              Victoria
            </button>
            <button
              onClick={() => saveToHistory('loss')}
              className="flex-1 bg-red-600 hover:bg-red-700 font-bold py-2 px-4 rounded"
            >
              <X size={16} className="inline mr-1" />
              Derrota
            </button>
            <button
              onClick={() => saveToHistory()}
              className="flex-1 bg-gray-600 hover:bg-gray-700 font-bold py-2 px-4 rounded"
            >
              Guardar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
