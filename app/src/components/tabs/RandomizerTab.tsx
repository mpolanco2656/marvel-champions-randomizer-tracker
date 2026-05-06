import { Check, Copy, Shuffle, X, Zap } from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import type { Aspect, Complexity, Hero, ModularSet, PlayerOptimization, Playstyle, Stats, Tier, Villain } from '../../types';
import {
  ASPECT_COLORS,
  EmptyState,
  FilterSelect,
  HeroCard,
  ModularCard,
  NumberPicker,
  SectionHeading,
  Toggle,
  VillainCard,
} from '../ui/MarvelUI';

interface RandomizerTabProps {
  stats: Stats;
  playerCount: number;
  setPlayerCount: (count: number) => void;
  difficulty: 'Any' | 'Easy' | 'Medium' | 'Hard' | 'Expert';
  setDifficulty: (difficulty: 'Any' | 'Easy' | 'Medium' | 'Hard' | 'Expert') => void;
  complexity: Complexity | 'Any';
  setComplexity: (complexity: Complexity | 'Any') => void;
  playstyle: Playstyle | 'Any';
  setPlaystyle: (playstyle: Playstyle | 'Any') => void;
  tier: Tier | 'Any';
  setTier: (tier: Tier | 'Any') => void;
  optimization: PlayerOptimization | 'Any';
  setOptimization: (optimization: PlayerOptimization | 'Any') => void;
  aspect: Aspect | 'Any';
  setAspect: (aspect: Aspect | 'Any') => void;
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

const difficultyOptions = [
  { value: 'Any', label: 'Any' },
  { value: 'Easy', label: 'Easy (1-3)' },
  { value: 'Medium', label: 'Medium (4-6)' },
  { value: 'Hard', label: 'Hard (7-8)' },
  { value: 'Expert', label: 'Expert (9-10)' },
] as const;

const complexityOptions = [
  { value: 'Any', label: 'Any' },
  { value: 'Beginner', label: 'Beginner' },
  { value: 'Intermediate', label: 'Intermediate' },
  { value: 'Advanced', label: 'Advanced' },
] as const;

const playstyleOptions = [
  { value: 'Any', label: 'Any' },
  { value: 'Aggro', label: 'Aggro' },
  { value: 'Control', label: 'Control' },
  { value: 'All-rounder', label: 'All-rounder' },
  { value: 'Support', label: 'Support' },
  { value: 'Resource Engine', label: 'Resource Engine' },
  { value: 'Setup', label: 'Setup' },
] as const;

const tierOptions = [
  { value: 'Any', label: 'Any' },
  { value: 'S+', label: 'S+' },
  { value: 'S', label: 'S' },
  { value: 'A', label: 'A' },
  { value: 'B', label: 'B' },
  { value: 'C', label: 'C' },
] as const;

const optimizationOptions = [
  { value: 'Any', label: 'Any' },
  { value: 'Solo', label: 'Solo' },
  { value: 'Multiplayer', label: 'Multiplayer' },
  { value: 'Both', label: 'Both' },
] as const;

const aspects: (Aspect | 'Any')[] = ['Any', 'Leadership', 'Justice', 'Aggression', 'Protection', 'Pool'];

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
  aspect,
  setAspect,
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
  const { t } = useTranslation('randomizer');
  const [revealed, setRevealed] = useState(true);
  const [saved, setSaved] = useState(false);
  const hasResult = randomHeroes.length > 0 || randomVillain;

  function generateAnimated(action: () => void) {
    setSaved(false);
    setRevealed(false);
    action();
    window.setTimeout(() => setRevealed(true), 80);
  }

  function save(result?: 'win' | 'loss') {
    saveToHistory(result);
    setSaved(true);
  }

  return (
    <div className="mc-stack">
      <div className="mc-panel">
        <SectionHeading>{t('filters', { defaultValue: 'Filters' })}</SectionHeading>
        <div className="mc-filter-grid">
          <NumberPicker label="Players" value={playerCount} values={[1, 2, 3, 4]} onChange={setPlayerCount} />
          <FilterSelect label="Difficulty" value={difficulty} onChange={setDifficulty} options={[...difficultyOptions]} />
          <FilterSelect label="Complexity" value={complexity} onChange={setComplexity} options={[...complexityOptions]} />
          <FilterSelect label="Playstyle" value={playstyle} onChange={setPlaystyle} options={[...playstyleOptions]} />
          <FilterSelect label="Tier" value={tier} onChange={setTier} options={[...tierOptions]} />
          <FilterSelect label="Optimization" value={optimization} onChange={setOptimization} options={[...optimizationOptions]} />

          <div className="mc-filter">
            <span>Aspect</span>
            <div className="mc-aspect-picker">
              {aspects.map((item) => {
                const color = item === 'Any' ? null : ASPECT_COLORS[item];
                return (
                  <button
                    key={item}
                    type="button"
                    data-active={aspect === item ? '1' : '0'}
                    style={{
                      ['--aspect-border' as string]: color?.border || '#d4a20a',
                      ['--aspect-bg' as string]: color?.bg || 'rgba(212,162,10,0.18)',
                      ['--aspect-text' as string]: color?.text || '#d4a20a',
                    }}
                    onClick={() => setAspect(item)}
                  >
                    {item}
                  </button>
                );
              })}
            </div>
          </div>

          <NumberPicker label="Modular Sets" value={modularCount} values={[1, 2, 3, 4]} onChange={setModularCount} />
          <FilterSelect label="Mode" value={gameMode} onChange={setGameMode} options={[{ value: 'Standard', label: 'Standard' }, { value: 'Expert', label: 'Expert' }]} />
          <FilterSelect label="Encounter" value={encounterVariant} onChange={setEncounterVariant} options={[{ value: 'I', label: `${gameMode} I` }, { value: 'II', label: `${gameMode} II` }, { value: 'III', label: `${gameMode} III` }]} />
        </div>

        <div className="mc-toggle-row" style={{ marginTop: 14 }}>
          <Toggle checked={thematicPairing} onChange={setThematicPairing} label="Thematic pairing" />
          <Toggle checked={onlyUnplayed} onChange={setOnlyUnplayed} label="Unplayed only" />
        </div>
      </div>

      <div className="mc-generate-row">
        <button type="button" className="mc-primary-button" onClick={() => generateAnimated(generateComplete)}>
          <Shuffle size={23} />
          Generate Full Setup
        </button>
      </div>

      <div className="mc-actions-row" style={{ justifyContent: 'center' }}>
        <button type="button" className="mc-secondary-button" onClick={() => generateAnimated(generateHeroes)}>
          Only Heroes
        </button>
        <button type="button" className="mc-secondary-button" onClick={() => generateAnimated(generateVillainSetup)}>
          Only Villain
        </button>
        {hasResult ? (
          <button type="button" className="mc-secondary-button" onClick={exportSetup}>
            <Copy size={15} style={{ display: 'inline', marginRight: 6 }} />
            Export
          </button>
        ) : null}
      </div>

      {hasResult ? (
        <div className="mc-stack">
          {randomVillain ? (
            <div className="mc-result-row">
              <div style={{ minWidth: 220, flex: '0 0 260px' }}>
                <SectionHeading accent="#e74c3c">Villain</SectionHeading>
                <VillainCard villain={randomVillain} revealed={revealed} />
              </div>
              <div style={{ flex: 1, minWidth: 220 }}>
                <SectionHeading accent="#d4a20a">Modular Sets ({randomModulars.length})</SectionHeading>
                <div className="mc-modular-grid">
                  {randomModulars.map((modular, index) => (
                    <ModularCard key={modular.key} modular={modular} index={index} revealed={revealed} />
                  ))}
                </div>
              </div>
            </div>
          ) : null}

          {randomHeroes.length > 0 ? (
            <section>
              <SectionHeading accent="#5dade2">Heroes ({randomHeroes.length})</SectionHeading>
              <div className="mc-hero-grid">
                {randomHeroes.map((hero, index) => (
                  <HeroCard key={hero.key} hero={hero} index={index} revealed={revealed} />
                ))}
              </div>
            </section>
          ) : null}

          {(warnings.length > 0 || suggestions.length > 0) ? (
            <div className="mc-stack" style={{ gap: 10 }}>
              {warnings.length > 0 ? (
                <div className="mc-alert">
                  {warnings.map((warning) => <p key={warning}>{warning}</p>)}
                </div>
              ) : null}
              {suggestions.length > 0 ? (
                <div className="mc-alert" data-type="suggestion">
                  {suggestions.map((suggestion) => <p key={suggestion}>{suggestion}</p>)}
                </div>
              ) : null}
            </div>
          ) : null}

          {randomHeroes.length > 0 && randomVillain ? (
            <div className="mc-actions-row" style={{ alignItems: 'center' }}>
              {saved ? (
                <span style={{ color: '#2ecc71', fontSize: 13, fontWeight: 700 }}>Saved</span>
              ) : (
                <>
                  <span style={{ color: '#5a6080', fontSize: 12 }}>Record result:</span>
                  <button type="button" className="mc-secondary-button" data-tone="success" onClick={() => save('win')}>
                    <Check size={15} style={{ display: 'inline', marginRight: 5 }} />
                    Win
                  </button>
                  <button type="button" className="mc-secondary-button" data-tone="danger" onClick={() => save('loss')}>
                    <X size={15} style={{ display: 'inline', marginRight: 5 }} />
                    Loss
                  </button>
                  <button type="button" className="mc-secondary-button" onClick={() => save()}>
                    Save without result
                  </button>
                </>
              )}
            </div>
          ) : null}
        </div>
      ) : (
        <EmptyState title="Ready to generate" subtitle={`Collection: ${stats.collectionPercentage.campaigns}% campaigns, ${stats.collectionPercentage.heroPacks}% hero packs`} />
      )}

      <div style={{ display: 'none' }}>
        <Zap aria-hidden="true" />
      </div>
    </div>
  );
}
