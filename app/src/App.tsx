import { useState } from 'react';
import type { Hero, Villain, ModularSet, Complexity, Playstyle, Tier, PlayerOptimization } from './types';
import { campaigns, scenarioPacks, heroes, villains, modularSets, progressionGuide } from './data';
import { useCollection } from './hooks/useCollection';
import { useGameHistory } from './hooks/useGameHistory';
import { getOwnedSources, generateWarningsAndSuggestions, selectThematicModulars } from './utils/gameLogic';
import Header from './components/layout/Header';
import TabNavigation from './components/layout/TabNavigation';
import RandomizerTab from './components/tabs/RandomizerTab';
import CampaignTab from './components/tabs/CampaignTab';
import CollectionTab from './components/tabs/CollectionTab';
import HistoryTab from './components/tabs/HistoryTab';
import ProgressionTab from './components/tabs/ProgressionTab';

type TabType = 'randomizer' | 'campaign' | 'collection' | 'history' | 'progression';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('randomizer');

  // Collection and History
  const { collection, setCollection } = useCollection();
  const { history, addGame, clearHistory } = useGameHistory();

  // Campaign mode
  const [activeCampaign, setActiveCampaign] = useState<string | null>(null);
  const [campaignProgress, setCampaignProgress] = useState<number>(0);

  // Hero filters
  const [playerCount, setPlayerCount] = useState<number>(2);
  const [complexity, setComplexity] = useState<Complexity | 'Any'>('Any');
  const [playstyle, setPlaystyle] = useState<Playstyle | 'Any'>('Any');
  const [tier, setTier] = useState<Tier | 'Any'>('Any');
  const [optimization, setOptimization] = useState<PlayerOptimization | 'Any'>('Any');
  const [onlyUnplayed, setOnlyUnplayed] = useState(false);

  // Villain filters
  const [difficulty, setDifficulty] = useState<'Easy' | 'Medium' | 'Hard' | 'Expert' | 'Any'>('Any');
  const [modularCount, setModularCount] = useState<number>(2);
  const [thematicPairing, setThematicPairing] = useState(false);

  // Help tooltips
  const [showComplexityHelp, setShowComplexityHelp] = useState(false);
  const [showDifficultyHelp, setShowDifficultyHelp] = useState(false);

  // Results
  const [randomHeroes, setRandomHeroes] = useState<Hero[]>([]);
  const [randomVillain, setRandomVillain] = useState<Villain | null>(null);
  const [randomModulars, setRandomModulars] = useState<ModularSet[]>([]);
  const [warnings, setWarnings] = useState<string[]>([]);
  const [suggestions, setSuggestions] = useState<string[]>([]);

  // Get owned content sources
  const getOwnedSourcesList = (): string[] => {
    return getOwnedSources(collection.campaigns, collection.scenarioPacks);
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

  const nextCampaignScenario = () => {
    if (!activeCampaign) return;

    const campaign = campaigns.find(c => c.key === activeCampaign);
    if (!campaign) return;

    if (campaignProgress >= campaign.villains.length) {
      alert('¡Campaña completada!');
      return;
    }

    const villainKey = campaign.villains[campaignProgress];
    const villain = villains.find(v => v.key === villainKey);
    if (villain) {
      setRandomVillain(villain);

      const availableModulars = filterModulars();
      const shuffled = availableModulars.sort(() => Math.random() - 0.5);
      setRandomModulars(shuffled.slice(0, Math.min(modularCount, shuffled.length)));

      setCampaignProgress(campaignProgress + 1);

      const { warnings: newWarnings, suggestions: newSuggestions } = generateWarningsAndSuggestions(randomHeroes, villain, playerCount);
      setWarnings(newWarnings);
      setSuggestions(newSuggestions);
    }
  };

  const exportSetup = () => {
    const setup = {
      heroes: randomHeroes.map(h => h.name),
      villain: randomVillain?.name,
      modulars: randomModulars.map(m => m.name),
      difficulty: randomVillain?.difficulty,
      date: new Date().toLocaleDateString()
    };

    const text = `MARVEL CHAMPIONS SETUP\n\n` +
      `Héroes: ${setup.heroes.join(', ')}\n` +
      `Villano: ${setup.villain} (${setup.difficulty}/10)\n` +
      `Modulares: ${setup.modulars.join(', ')}\n` +
      `Fecha: ${setup.date}`;

    navigator.clipboard.writeText(text);
    alert('¡Setup copiado al clipboard!');
  };

  // Calculate stats
  const stats = {
    gamesPlayed: history.length,
    winRate: history.filter(g => g.result === 'win').length / history.length * 100 || 0,
    uniqueHeroes: new Set(history.flatMap(g => g.heroes)).size,
    uniqueVillains: new Set(history.map(g => g.villain)).size,
    mostPlayed: heroes.reduce((acc, hero) => {
      const count = history.filter(g => g.heroes.includes(hero.key)).length;
      return count > acc.count ? { hero: hero.name, count } : acc;
    }, { hero: '', count: 0 }),
    collectionPercentage: {
      campaigns: (collection.campaigns.length / campaigns.length * 100).toFixed(0),
      scenarioPacks: (collection.scenarioPacks.length / scenarioPacks.length * 100).toFixed(0),
      heroes: ((heroes.filter(h => getOwnedSourcesList().includes(h.source)).length / heroes.length) * 100).toFixed(0)
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-900 via-blue-900 to-purple-900 text-white p-4">
      <div className="max-w-7xl mx-auto">
        <Header />
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
            modularCount={modularCount}
            setModularCount={setModularCount}
            onlyUnplayed={onlyUnplayed}
            setOnlyUnplayed={setOnlyUnplayed}
            thematicPairing={thematicPairing}
            setThematicPairing={setThematicPairing}
            showComplexityHelp={showComplexityHelp}
            setShowComplexityHelp={setShowComplexityHelp}
            showDifficultyHelp={showDifficultyHelp}
            setShowDifficultyHelp={setShowDifficultyHelp}
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
            collection={collection}
            activeCampaign={activeCampaign}
            setActiveCampaign={setActiveCampaign}
            campaignProgress={campaignProgress}
            setCampaignProgress={setCampaignProgress}
            nextCampaignScenario={nextCampaignScenario}
          />
        )}

        {activeTab === 'collection' && (
          <CollectionTab
            collection={collection}
            setCollection={setCollection}
            campaigns={campaigns}
            scenarioPacks={scenarioPacks}
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
          <ProgressionTab progressionGuide={progressionGuide} />
        )}
      </div>
    </div>
  );
}
