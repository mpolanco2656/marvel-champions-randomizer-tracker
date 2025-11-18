import { Shuffle, Users, Target, Share2, AlertTriangle, Zap, Info, Check, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import type { Hero, Villain, ModularSet, Stats } from '../../types';

interface RandomizerTabProps {
  stats: Stats;
  playerCount: number;
  setPlayerCount: (count: number) => void;
  difficulty: 'Any' | 'Easy' | 'Medium' | 'Hard' | 'Expert';
  setDifficulty: (difficulty: 'Any' | 'Easy' | 'Medium' | 'Hard' | 'Expert') => void;
  complexity: 'Any' | 'Beginner' | 'Intermediate' | 'Advanced';
  setComplexity: (complexity: 'Any' | 'Beginner' | 'Intermediate' | 'Advanced') => void;
  playstyle: 'Any' | 'Control' | 'Aggro' | 'All-rounder' | 'Resource Engine' | 'Support' | 'Setup';
  setPlaystyle: (playstyle: 'Any' | 'Control' | 'Aggro' | 'All-rounder' | 'Resource Engine' | 'Support' | 'Setup') => void;
  tier: 'Any' | 'S+' | 'S' | 'A' | 'B' | 'C';
  setTier: (tier: 'Any' | 'S+' | 'S' | 'A' | 'B' | 'C') => void;
  optimization: 'Any' | 'Solo' | 'Multiplayer' | 'Both';
  setOptimization: (optimization: 'Any' | 'Solo' | 'Multiplayer' | 'Both') => void;
  modularCount: number;
  setModularCount: (count: number) => void;
  onlyUnplayed: boolean;
  setOnlyUnplayed: (value: boolean) => void;
  thematicPairing: boolean;
  setThematicPairing: (value: boolean) => void;
  gameMode: 'Standard' | 'Expert';
  setGameMode: (value: 'Standard' | 'Expert') => void;
  encounterVariant: 'I' | 'II' | 'III';
  setEncounterVariant: (value: 'I' | 'II' | 'III') => void;
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
  playstyle,
  setPlaystyle,
  tier,
  setTier,
  optimization,
  setOptimization,
  modularCount,
  setModularCount,
  onlyUnplayed,
  setOnlyUnplayed,
  thematicPairing,
  setThematicPairing,
  gameMode,
  setGameMode,
  encounterVariant,
  setEncounterVariant,
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
  const { t } = useTranslation(['randomizer', 'common']);

  return (
    <div className="space-y-6">
      {/* Quick Stats Bar */}
      <div className="bg-black bg-opacity-40 rounded-lg p-4 flex flex-wrap justify-around gap-4">
        <div className="text-center">
          <div className="text-2xl font-bold text-yellow-300">{stats.gamesPlayed}</div>
          <div className="text-xs text-gray-400">{t('randomizer:stats.games')}</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-green-400">{Number.isFinite(stats.winRate) ? stats.winRate.toFixed(1) : "0.0"}%</div>
          <div className="text-xs text-gray-400">{t('randomizer:stats.winRate')}</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-blue-400">{stats.collectionPercentage.campaigns}%</div>
          <div className="text-xs text-gray-400">{t('randomizer:stats.campaigns')}</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-purple-400">{stats.collectionPercentage.scenarioPacks}%</div>
          <div className="text-xs text-gray-400">{t('randomizer:stats.scenarios')}</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-red-400">{stats.collectionPercentage.heroPacks}%</div>
          <div className="text-xs text-gray-400">{t('randomizer:stats.heroPacks')}</div>
        </div>
      </div>

      {/* Main Controls */}
      <div className="bg-black bg-opacity-40 rounded-lg p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          <div>
            <label className="block text-sm font-bold mb-2">{t('randomizer:controls.players')}</label>
            <select
              value={playerCount}
              onChange={(e) => setPlayerCount(Number(e.target.value))}
              className="w-full p-2 rounded bg-gray-800 border border-gray-600"
            >
              <option value={1}>{t('randomizer:playerOptions.trueSolo')}</option>
              <option value={2}>{t('randomizer:playerOptions.recommended')}</option>
              <option value={3}>{t('randomizer:playerOptions.threePlayers')}</option>
              <option value={4}>{t('randomizer:playerOptions.fourPlayers')}</option>
            </select>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-2">
              <label className="block text-sm font-bold">{t('randomizer:controls.difficulty')}</label>
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
              <option value="Any">{t('randomizer:difficultyOptions.any')}</option>
              <option value="Easy">{t('randomizer:difficultyOptions.easy')}</option>
              <option value="Medium">{t('randomizer:difficultyOptions.medium')}</option>
              <option value="Hard">{t('randomizer:difficultyOptions.hard')}</option>
              <option value="Expert">{t('randomizer:difficultyOptions.expert')}</option>
            </select>
            {showDifficultyHelp && (
              <div className="mt-2 p-3 bg-blue-900 bg-opacity-60 rounded text-xs">
                <div className="font-bold mb-1">{t('randomizer:difficultyHelp.title')}</div>
                <div><span className="text-green-400">{t('randomizer:difficultyHelp.easy')}</span> {t('randomizer:difficultyHelp.easyDesc')}</div>
                <div><span className="text-yellow-400">{t('randomizer:difficultyHelp.medium')}</span> {t('randomizer:difficultyHelp.mediumDesc')}</div>
                <div><span className="text-orange-400">{t('randomizer:difficultyHelp.hard')}</span> {t('randomizer:difficultyHelp.hardDesc')}</div>
                <div><span className="text-red-400">{t('randomizer:difficultyHelp.expert')}</span> {t('randomizer:difficultyHelp.expertDesc')}</div>
              </div>
            )}
          </div>

          <div>
            <div className="flex items-center gap-2 mb-2">
              <label className="block text-sm font-bold">{t('randomizer:controls.complexity')}</label>
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
              <option value="Any">{t('randomizer:complexityOptions.any')}</option>
              <option value="Beginner">{t('randomizer:complexityOptions.beginner')}</option>
              <option value="Intermediate">{t('randomizer:complexityOptions.intermediate')}</option>
              <option value="Advanced">{t('randomizer:complexityOptions.advanced')}</option>
            </select>
            {showComplexityHelp && (
              <div className="mt-2 p-3 bg-purple-900 bg-opacity-60 rounded text-xs">
                <div className="font-bold mb-1">{t('randomizer:complexityHelp.title')}</div>
                <div><span className="text-green-400">{t('randomizer:complexityHelp.beginner')}</span> {t('randomizer:complexityHelp.beginnerDesc')}</div>
                <div><span className="text-yellow-400">{t('randomizer:complexityHelp.intermediate')}</span> {t('randomizer:complexityHelp.intermediateDesc')}</div>
                <div><span className="text-red-400">{t('randomizer:complexityHelp.advanced')}</span> {t('randomizer:complexityHelp.advancedDesc')}</div>
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-bold mb-2">{t('randomizer:controls.modulars')}</label>
            <select
              value={modularCount}
              onChange={(e) => setModularCount(Number(e.target.value))}
              className="w-full p-2 rounded bg-gray-800 border border-gray-600"
            >
              <option value={1}>{t('randomizer:modularOptions.oneSet')}</option>
              <option value={2}>{t('randomizer:modularOptions.twoSets')}</option>
              <option value={3}>{t('randomizer:modularOptions.threeSets')}</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-bold mb-2">{t('randomizer:controls.playStyle')}</label>
            <select
              value={playstyle}
              onChange={(e) => setPlaystyle(e.target.value as any)}
              className="w-full p-2 rounded bg-gray-800 border border-gray-600"
            >
              <option value="Any">{t('randomizer:playStyleOptions.any')}</option>
              <option value="Control">Control</option>
              <option value="Aggro">Aggro</option>
              <option value="All-rounder">All-rounder</option>
              <option value="Resource Engine">Resource Engine</option>
              <option value="Support">Support</option>
              <option value="Setup">Setup</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-bold mb-2">{t('randomizer:controls.tier')}</label>
            <select
              value={tier}
              onChange={(e) => setTier(e.target.value as any)}
              className="w-full p-2 rounded bg-gray-800 border border-gray-600"
            >
              <option value="Any">{t('randomizer:tierOptions.any')}</option>
              <option value="S+">{t('randomizer:tierOptions.sPlus')}</option>
              <option value="S">{t('randomizer:tierOptions.s')}</option>
              <option value="A">{t('randomizer:tierOptions.a')}</option>
              <option value="B">{t('randomizer:tierOptions.b')}</option>
              <option value="C">{t('randomizer:tierOptions.c')}</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-bold mb-2">{t('randomizer:controls.optimization')}</label>
            <select
              value={optimization}
              onChange={(e) => setOptimization(e.target.value as any)}
              className="w-full p-2 rounded bg-gray-800 border border-gray-600"
            >
              <option value="Any">{t('randomizer:optimizationOptions.any')}</option>
              <option value="Solo">Solo</option>
              <option value="Multiplayer">Multiplayer</option>
              <option value="Both">{t('randomizer:optimizationOptions.both')}</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-bold mb-2">{t('randomizer:controls.gameMode')}</label>
            <select
              value={gameMode}
              onChange={(e) => setGameMode(e.target.value as 'Standard' | 'Expert')}
              className="w-full p-2 rounded bg-gray-800 border border-gray-600"
            >
              <option value="Standard">Standard</option>
              <option value="Expert">Expert</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-bold mb-2">{t('randomizer:controls.encounterSet')}</label>
            <select
              value={encounterVariant}
              onChange={(e) => setEncounterVariant(e.target.value as 'I' | 'II' | 'III')}
              className="w-full p-2 rounded bg-gray-800 border border-gray-600"
            >
              <option value="I">{gameMode} I</option>
              <option value="II">{gameMode} II</option>
              <option value="III">{gameMode} III</option>
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
            <span className="text-sm">{t('randomizer:checkboxes.unplayedHeroes')}</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={thematicPairing}
              onChange={(e) => setThematicPairing(e.target.checked)}
              className="w-5 h-5"
            />
            <span className="text-sm">{t('randomizer:checkboxes.thematicPairing')}</span>
          </label>
        </div>

        <button
          onClick={generateComplete}
          className="w-full bg-gradient-to-r from-red-600 to-purple-600 hover:from-red-700 hover:to-purple-700 text-white font-bold py-4 px-6 rounded-lg text-xl transition-all transform hover:scale-105 mb-4"
        >
          <Shuffle className="inline mr-2" size={24} />
          {t('randomizer:buttons.generateComplete')}
        </button>

        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={generateHeroes}
            className="bg-blue-600 hover:bg-blue-700 font-bold py-2 px-4 rounded"
          >
            <Users className="inline mr-2" size={16} />
            {t('randomizer:buttons.onlyHeroes')}
          </button>
          <button
            onClick={generateVillainSetup}
            className="bg-red-600 hover:bg-red-700 font-bold py-2 px-4 rounded"
          >
            <Target className="inline mr-2" size={16} />
            {t('randomizer:buttons.onlyVillain')}
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
            <h2 className="text-2xl font-bold text-blue-400">{t('randomizer:results.heroes')}</h2>
            <button
              onClick={exportSetup}
              className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded flex items-center gap-2 text-sm"
            >
              <Share2 size={16} />
              {t('randomizer:buttons.export')}
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
                  <div><span className="text-yellow-300">{t('randomizer:results.aspect')}</span> {hero.aspect}</div>
                  <div><span className="text-yellow-300">{t('randomizer:results.complexity')}</span> {hero.complexity}</div>
                  <div><span className="text-yellow-300">{t('randomizer:results.playStyle')}</span> {hero.playstyle.join(', ')}</div>
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
          <h2 className="text-2xl font-bold text-red-400 mb-4">{t('randomizer:results.villainAndModulars')}</h2>
          <div className="bg-gradient-to-br from-red-800 to-orange-800 rounded-lg p-5 border-2 border-yellow-400 mb-4">
            <div className="flex justify-between mb-3">
              <div>
                <h3 className="text-2xl font-bold text-yellow-300">{randomVillain.name}</h3>
                <div className="text-sm text-gray-300">{randomVillain.source}</div>
              </div>
              <div className="bg-yellow-500 text-black px-4 py-2 rounded font-bold text-xl">{randomVillain.difficulty}/10</div>
            </div>
            <div className="bg-black bg-opacity-40 rounded p-3 text-sm">
              <div className="font-bold text-yellow-300 mb-1">{t('randomizer:results.mechanics')} {randomVillain.mechanics}</div>
              <div className="text-gray-300">{randomVillain.description}</div>
            </div>
            <div className="mt-3 bg-blue-900 bg-opacity-40 rounded p-3">
              <div className="text-sm font-bold text-blue-300">
                🎯 {t('randomizer:results.mode')} {gameMode} {encounterVariant}
              </div>
              <div className="text-xs text-gray-400 mt-1">
                {gameMode === 'Standard'
                  ? t('randomizer:results.standardDesc')
                  : t('randomizer:results.expertDesc')}
              </div>
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
              {t('randomizer:buttons.victory')}
            </button>
            <button
              onClick={() => saveToHistory('loss')}
              className="flex-1 bg-red-600 hover:bg-red-700 font-bold py-2 px-4 rounded"
            >
              <X size={16} className="inline mr-1" />
              {t('randomizer:buttons.defeat')}
            </button>
            <button
              onClick={() => saveToHistory()}
              className="flex-1 bg-gray-600 hover:bg-gray-700 font-bold py-2 px-4 rounded"
            >
              {t('randomizer:buttons.save')}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
