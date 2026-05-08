import { useState } from 'react';
import type { Hero, Villain, ModularSet, Complexity, Playstyle, Tier, PlayerOptimization, Aspect } from './types';
import { campaigns, scenarioPacks, heroPacks, heroes, villains, modularSets, progressionGuideEs, progressionGuideEn } from './data';
import { useCollection } from './hooks/useCollection';
import { useGameHistory } from './hooks/useGameHistory';
import { useCampaignRandomizer } from './hooks/useCampaignRandomizer';
import { useCampaignTracker } from './hooks/useCampaignTracker';
import { getOwnedSources, generateWarningsAndSuggestions, selectThematicModulars } from './utils/gameLogic';
import { exportAllData, downloadJSON, importFromFile, type FullExportData } from './utils/exportImport';
import Header from './components/layout/Header';
import TabNavigation from './components/layout/TabNavigation';
import RandomizerTab from './components/tabs/RandomizerTab';
import CampaignTab from './components/tabs/CampaignTab';
import CollectionTab from './components/tabs/CollectionTab';
import HistoryTab from './components/tabs/HistoryTab';
import ProgressionTab from './components/tabs/ProgressionTab';
import { useTranslation } from 'react-i18next';

type TabType = 'randomizer' | 'campaign' | 'collection' | 'history' | 'progression';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('randomizer');
  const { i18n } = useTranslation();

  // Select progression guide based on current language
  const progressionGuide = i18n.language === 'es' ? progressionGuideEs : progressionGuideEn;

  // Collection and History
  const { collection, setCollection } = useCollection();
  const { history, addGame, clearHistory, importHistory } = useGameHistory();

  // Campaign Tracker
  const {
    activeCampaign: campaignTrackerActive,
    completedScenarios,
    setActiveCampaign: setCampaignTrackerActive,
    toggleScenario,
    getCompletedCount,
    clearCampaign,
    importCampaignData
  } = useCampaignTracker();

  // Campaign Randomizer
  const {
    activeCampaign,
    randomMode,
    campaignScenarios,
    mixedScenarios,
    setActiveCampaign,
    setRandomMode,
    setCampaignScenarios,
    setMixedScenarios,
    markCampaignScenarioComplete,
    markMixedScenarioComplete,
    clearCampaignScenarios,
    clearMixedScenarios,
    importCampaignRandomizerData
  } = useCampaignRandomizer();

  // Hero filters
  const [playerCount, setPlayerCount] = useState<number>(2);
  const [complexity, setComplexity] = useState<Complexity | 'Any'>('Any');
  const [playstyle, setPlaystyle] = useState<Playstyle | 'Any'>('Any');
  const [tier, setTier] = useState<Tier | 'Any'>('Any');
  const [optimization, setOptimization] = useState<PlayerOptimization | 'Any'>('Any');
  const [aspect, setAspect] = useState<Aspect | 'Any'>('Any');
  const [onlyUnplayed, setOnlyUnplayed] = useState(false);

  // Villain filters
  const [difficulty, setDifficulty] = useState<'Easy' | 'Medium' | 'Hard' | 'Expert' | 'Any'>('Any');
  const [modularCount, setModularCount] = useState<number>(2);
  const [thematicPairing, setThematicPairing] = useState(false);

  // Game mode settings
  const [gameMode, setGameMode] = useState<'Standard' | 'Expert'>('Standard');
  const [encounterVariant, setEncounterVariant] = useState<'I' | 'II' | 'III'>('I');

  // Results
  const [randomHeroes, setRandomHeroes] = useState<Hero[]>([]);
  const [randomVillain, setRandomVillain] = useState<Villain | null>(null);
  const [randomModulars, setRandomModulars] = useState<ModularSet[]>([]);
  const [warnings, setWarnings] = useState<string[]>([]);
  const [suggestions, setSuggestions] = useState<string[]>([]);

  // Get owned content sources
  const getOwnedSourcesList = (): string[] => {
    return getOwnedSources(collection.campaigns, collection.scenarioPacks, collection.heroPacks || []);
  };

  // Filter functions
  const filterHeroes = (): Hero[] => {
    const ownedSources = getOwnedSourcesList();

    return heroes.filter(hero => {
      if (!ownedSources.includes(hero.source)) return false;

      if (onlyUnplayed) {
        const played = history.some(game => game.heroes.includes(hero.key));
        if (played) return false;
      }

      if (complexity !== 'Any' && hero.complexity !== complexity) return false;
      if (playstyle !== 'Any' && !hero.playstyle.includes(playstyle)) return false;
      if (tier !== 'Any' && hero.tier !== tier) return false;
      if (optimization !== 'Any' && hero.optimization !== optimization && hero.optimization !== 'Both') return false;
      if (aspect !== 'Any' && hero.aspect !== aspect) return false;
      return true;
    });
  };

  const filterVillains = (): Villain[] => {
    const ownedSources = getOwnedSourcesList();

    return villains.filter(villain => {
      if (!ownedSources.includes(villain.source)) return false;

      if (difficulty === 'Any') return true;
      if (difficulty === 'Easy' && villain.difficulty <= 3) return true;
      if (difficulty === 'Medium' && villain.difficulty >= 4 && villain.difficulty <= 6) return true;
      if (difficulty === 'Hard' && villain.difficulty >= 7 && villain.difficulty <= 8) return true;
      if (difficulty === 'Expert' && villain.difficulty >= 9) return true;
      return false;
    });
  };

  const filterModulars = (): ModularSet[] => {
    const ownedSources = getOwnedSourcesList();
    return modularSets.filter(modular => ownedSources.includes(modular.source));
  };

  // Generate functions
  const generateHeroes = () => {
    const filtered = filterHeroes();
    if (filtered.length === 0) {
      alert('No hay héroes que coincidan con estos filtros y tu colección');
      return;
    }

    const shuffled = [...filtered].sort(() => Math.random() - 0.5);
    const selected = shuffled.slice(0, Math.min(playerCount, shuffled.length));
    setRandomHeroes(selected);

    const { warnings: newWarnings, suggestions: newSuggestions } = generateWarningsAndSuggestions(selected, randomVillain, playerCount);
    setWarnings(newWarnings);
    setSuggestions(newSuggestions);
  };

  const generateVillainSetup = () => {
    const filteredVillains = filterVillains();
    if (filteredVillains.length === 0) {
      alert('No hay villanos que coincidan con estos filtros y tu colección');
      return;
    }

    const randomVillainIndex = Math.floor(Math.random() * filteredVillains.length);
    const selectedVillain = filteredVillains[randomVillainIndex];
    setRandomVillain(selectedVillain);

    const availableModulars = filterModulars();
    if (availableModulars.length === 0) {
      alert('No hay sets modulares disponibles en tu colección');
      setRandomModulars([]);
      return;
    }

    let selectedModulars: ModularSet[];
    if (thematicPairing) {
      selectedModulars = selectThematicModulars(selectedVillain, availableModulars, modularCount);
    } else {
      selectedModulars = availableModulars.sort(() => Math.random() - 0.5).slice(0, Math.min(modularCount, availableModulars.length));
    }

    setRandomModulars(selectedModulars);

    const { warnings: newWarnings, suggestions: newSuggestions } = generateWarningsAndSuggestions(randomHeroes, selectedVillain, playerCount);
    setWarnings(newWarnings);
    setSuggestions(newSuggestions);
  };

  const generateComplete = () => {
    generateHeroes();
    setTimeout(() => generateVillainSetup(), 100);
  };

  const saveToHistory = (result?: 'win' | 'loss') => {
    if (randomHeroes.length === 0 || !randomVillain) return;

    addGame({
      heroes: randomHeroes.map(h => h.key),
      villain: randomVillain.key,
      modulars: randomModulars.map(m => m.key),
      result
    });

    alert('¡Juego guardado en historial!');
  };

  const exportSetup = () => {
    const lines = ['MARVEL CHAMPIONS SETUP', ''];

    lines.push(randomHeroes.length > 0
      ? `Heroes: ${randomHeroes.map(h => h.name).join(', ')}`
      : 'Heroes: Not generated');
    lines.push(randomVillain
      ? `Villain: ${randomVillain.name} (${randomVillain.difficulty}/10)`
      : 'Villain: Not generated');
    lines.push(randomModulars.length > 0
      ? `Modulars: ${randomModulars.map(m => m.name).join(', ')}`
      : 'Modulars: Not generated');
    lines.push(`Date: ${new Date().toLocaleDateString()}`);

    navigator.clipboard.writeText(lines.join('\n'));
    alert('Setup copied to clipboard!');
  };

  // Global Export/Import handlers
  const handleExportAll = () => {
    const jsonData = exportAllData(
      collection,
      history,
      { activeCampaign: campaignTrackerActive, completedScenarios },
      { activeCampaign, randomMode, campaignScenarios, mixedScenarios }
    );

    const timestamp = new Date().toISOString().split('T')[0];
    downloadJSON(jsonData, `marvel-champions-backup-${timestamp}.json`);
  };

  const handleImportAll = (file: File) => {
    importFromFile(
      file,
      (data: FullExportData) => {
        // Import collection
        if (data.collection) {
          setCollection(data.collection);
        }

        // Import history
        if (data.history && data.history.history) {
          importHistory(data.history.history);
        }

        // Import campaign tracker
        if (data.campaign) {
          importCampaignData(data.campaign);
        }

        // Import campaign randomizer
        if (data.campaignRandom) {
          importCampaignRandomizerData(data.campaignRandom);
        }

        alert('¡Todos los datos importados exitosamente!');
      },
      (error: string) => {
        alert(`Error al importar: ${error}`);
      }
    );
  };

  // Calculate stats
  const stats = {
    gamesPlayed: history.length,
    winRate: history.length > 0 ? (history.filter(g => g.result === 'win').length / history.length * 100) : 0,
    uniqueHeroes: new Set(history.flatMap(g => g.heroes)).size,
    uniqueVillains: new Set(history.map(g => g.villain)).size,
    mostPlayed: heroes.reduce((acc, hero) => {
      const count = history.filter(g => g.heroes.includes(hero.key)).length;
      return count > acc.count ? { hero: hero.name, count } : acc;
    }, { hero: '', count: 0 }),
    collectionPercentage: {
      campaigns: campaigns.length > 0 ? (collection.campaigns.length / campaigns.length * 100).toFixed(0) : '0',
      scenarioPacks: scenarioPacks.length > 0 ? (collection.scenarioPacks.length / scenarioPacks.length * 100).toFixed(0) : '0',
      heroPacks: heroPacks.length > 0 ? ((collection.heroPacks || []).length / heroPacks.length * 100).toFixed(0) : '0'
    }
  };

  const ownedSources = getOwnedSourcesList();
  const ownedStats = {
    heroes: heroes.filter(hero => ownedSources.includes(hero.source)).length,
    villains: villains.filter(villain => ownedSources.includes(villain.source)).length,
    modulars: modularSets.filter(modular => ownedSources.includes(modular.source)).length,
    games: history.length
  };

  return (
    <div className="mc-app">
      <Header onExport={handleExportAll} onImport={handleImportAll} stats={ownedStats} />
      <main className="mc-shell mc-main">
        <TabNavigation activeTab={activeTab} onTabChange={(tab) => setActiveTab(tab as TabType)} />

        {activeTab === 'randomizer' && (
          <RandomizerTab
            stats={stats}
            playerCount={playerCount}
            setPlayerCount={setPlayerCount}
            difficulty={difficulty}
            setDifficulty={setDifficulty}
            complexity={complexity}
            setComplexity={setComplexity}
            playstyle={playstyle}
            setPlaystyle={setPlaystyle}
            tier={tier}
            setTier={setTier}
            optimization={optimization}
            setOptimization={setOptimization}
            aspect={aspect}
            setAspect={setAspect}
            modularCount={modularCount}
            setModularCount={setModularCount}
            onlyUnplayed={onlyUnplayed}
            setOnlyUnplayed={setOnlyUnplayed}
            thematicPairing={thematicPairing}
            setThematicPairing={setThematicPairing}
            gameMode={gameMode}
            setGameMode={setGameMode}
            encounterVariant={encounterVariant}
            setEncounterVariant={setEncounterVariant}
            generateComplete={generateComplete}
            generateHeroes={generateHeroes}
            generateVillainSetup={generateVillainSetup}
            warnings={warnings}
            suggestions={suggestions}
            randomHeroes={randomHeroes}
            randomVillain={randomVillain}
            randomModulars={randomModulars}
            exportSetup={exportSetup}
            saveToHistory={saveToHistory}
          />
        )}

        {activeTab === 'campaign' && (
          <CampaignTab
            campaigns={campaigns}
            villains={villains}
            collection={collection}
            modularSets={modularSets}
            trackerActiveCampaign={campaignTrackerActive}
            completedScenarios={completedScenarios}
            setTrackerActiveCampaign={setCampaignTrackerActive}
            toggleScenario={toggleScenario}
            getCompletedCount={getCompletedCount}
            clearCampaign={clearCampaign}
            randomizerActiveCampaign={activeCampaign}
            randomMode={randomMode}
            campaignScenarios={campaignScenarios}
            mixedScenarios={mixedScenarios}
            setRandomizerActiveCampaign={setActiveCampaign}
            setCampaignScenarios={setCampaignScenarios}
            markCampaignScenarioComplete={markCampaignScenarioComplete}
            setRandomMode={setRandomMode}
            setMixedScenarios={setMixedScenarios}
            markMixedScenarioComplete={markMixedScenarioComplete}
            clearCampaignScenarios={clearCampaignScenarios}
            clearMixedScenarios={clearMixedScenarios}
          />
        )}

        {activeTab === 'collection' && (
          <CollectionTab
            collection={collection}
            setCollection={setCollection}
            campaigns={campaigns}
            scenarioPacks={scenarioPacks}
            heroPacks={heroPacks}
            heroes={heroes}
            villains={villains}
            modularSets={modularSets}
            getOwnedSources={getOwnedSourcesList}
          />
        )}

        {activeTab === 'history' && (
          <HistoryTab
            history={history}
            heroes={heroes}
            villains={villains}
            stats={stats}
            clearHistory={clearHistory}
          />
        )}

        {activeTab === 'progression' && (
          <ProgressionTab
            progressionGuide={progressionGuide}
            collection={collection}
            campaigns={campaigns}
            scenarioPacks={scenarioPacks}
          />
        )}
      </main>
      <footer className="mc-footer">Marvel Champions: The Card Game © Fantasy Flight Games. Community randomizer tool.</footer>
    </div>
  );
}
