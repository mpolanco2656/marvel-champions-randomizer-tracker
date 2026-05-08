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

const playstyleOptions = [
  { value: 'Any', label: 'Any' },
  { value: 'Aggro', label: 'Aggro' },
  { value: 'Control', label: 'Control' },
  { value: 'All-rounder', label: 'All-rounder' },
  { value: 'Support', label: 'Support' },
  { value: 'Resource Engine', label: 'Resource Engine' },
  { value: 'Setup', label: 'Setup' },
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
  const translatedDifficultyOptions = [
    { value: 'Any', label: t('difficultyOptions.any') },
    { value: 'Easy', label: t('difficultyOptions.easy') },
    { value: 'Medium', label: t('difficultyOptions.medium') },
    { value: 'Hard', label: t('difficultyOptions.hard') },
    { value: 'Expert', label: t('difficultyOptions.expert') },
  ] as const;
  const translatedComplexityOptions = [
    { value: 'Any', label: t('complexityOptions.any') },
    { value: 'Beginner', label: t('complexityOptions.beginner') },
    { value: 'Intermediate', label: t('complexityOptions.intermediate') },
    { value: 'Advanced', label: t('complexityOptions.advanced') },
  ] as const;
  const translatedTierOptions = [
    { value: 'Any', label: t('tierOptions.any') },
    { value: 'S+', label: t('tierOptions.sPlus') },
    { value: 'S', label: t('tierOptions.s') },
    { value: 'A', label: t('tierOptions.a') },
    { value: 'B', label: t('tierOptions.b') },
    { value: 'C', label: t('tierOptions.c') },
  ] as const;
  const translatedOptimizationOptions = [
    { value: 'Any', label: t('optimizationOptions.any') },
    { value: 'Solo', label: 'Solo' },
    { value: 'Multiplayer', label: 'Multiplayer' },
    { value: 'Both', label: t('optimizationOptions.both') },
  ] as const;

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
          <NumberPicker label={t('controls.players')} value={playerCount} values={[1, 2, 3, 4]} onChange={setPlayerCount} />
          <FilterSelect label={t('controls.difficulty')} value={difficulty} onChange={setDifficulty} options={[...translatedDifficultyOptions]} />
          <FilterSelect label={t('controls.complexity')} value={complexity} onChange={setComplexity} options={[...translatedComplexityOptions]} />
          <FilterSelect label={t('controls.playStyle')} value={playstyle} onChange={setPlaystyle} options={[...playstyleOptions]} />
          <FilterSelect label={t('controls.tier')} value={tier} onChange={setTier} options={[...translatedTierOptions]} />
          <FilterSelect label={t('controls.optimization')} value={optimization} onChange={setOptimization} options={[...translatedOptimizationOptions]} />

          <div className="mc-filter">
            <span>{t('controls.aspect')}</span>
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

          <NumberPicker label={t('controls.modulars')} value={modularCount} values={[1, 2, 3, 4]} onChange={setModularCount} />
          <FilterSelect label={t('controls.gameMode')} value={gameMode} onChange={setGameMode} options={[{ value: 'Standard', label: t('gameModeOptions.standard') }, { value: 'Expert', label: t('gameModeOptions.expert') }]} />
          <FilterSelect label={t('controls.encounterSet')} value={encounterVariant} onChange={setEncounterVariant} options={[{ value: 'I', label: `${gameMode} I` }, { value: 'II', label: `${gameMode} II` }, { value: 'III', label: `${gameMode} III` }]} />
        </div>

        <div className="mc-toggle-row" style={{ marginTop: 14 }}>
          <Toggle checked={thematicPairing} onChange={setThematicPairing} label={t('checkboxes.thematicPairing')} />
          <Toggle checked={onlyUnplayed} onChange={setOnlyUnplayed} label={t('checkboxes.unplayedHeroes')} />
        </div>
      </div>

      <div className="mc-generate-row">
        <button type="button" className="mc-primary-button" onClick={() => generateAnimated(generateComplete)}>
          <Shuffle size={23} />
          {t('buttons.generateComplete')}
        </button>
      </div>

      <div className="mc-actions-row" style={{ justifyContent: 'center' }}>
        <button type="button" className="mc-secondary-button" onClick={() => generateAnimated(generateHeroes)}>
          {t('buttons.onlyHeroes')}
        </button>
        <button type="button" className="mc-secondary-button" onClick={() => generateAnimated(generateVillainSetup)}>
          {t('buttons.onlyVillain')}
        </button>
        {hasResult ? (
          <button type="button" className="mc-secondary-button" onClick={exportSetup}>
            <Copy size={15} style={{ display: 'inline', marginRight: 6 }} />
            {t('buttons.export')}
          </button>
        ) : null}
      </div>

      {hasResult ? (
        <div className="mc-stack">
          {randomVillain ? (
            <div className="mc-result-row">
              <div style={{ minWidth: 220, flex: '0 0 260px' }}>
                <SectionHeading accent="#e74c3c">{t('results.villain')}</SectionHeading>
                <VillainCard villain={randomVillain} revealed={revealed} />
              </div>
              <div style={{ flex: 1, minWidth: 220 }}>
                <SectionHeading accent="#d4a20a">{t('results.modularSets')} ({randomModulars.length})</SectionHeading>
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
              <SectionHeading accent="#5dade2">{t('results.heroes')} ({randomHeroes.length})</SectionHeading>
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
                <span style={{ color: '#2ecc71', fontSize: 13, fontWeight: 700 }}>{t('saved')}</span>
              ) : (
                <>
                  <span style={{ color: '#5a6080', fontSize: 12 }}>{t('recordResult')}</span>
                  <button type="button" className="mc-secondary-button" data-tone="success" onClick={() => save('win')}>
                    <Check size={15} style={{ display: 'inline', marginRight: 5 }} />
                    {t('results.win')}
                  </button>
                  <button type="button" className="mc-secondary-button" data-tone="danger" onClick={() => save('loss')}>
                    <X size={15} style={{ display: 'inline', marginRight: 5 }} />
                    {t('results.loss')}
                  </button>
                  <button type="button" className="mc-secondary-button" onClick={() => save()}>
                    {t('buttons.saveWithoutResult')}
                  </button>
                </>
              )}
            </div>
          ) : null}
        </div>
      ) : (
        <EmptyState title={t('empty.title')} subtitle={t('empty.subtitle', { campaigns: stats.collectionPercentage.campaigns, heroPacks: stats.collectionPercentage.heroPacks })} />
      )}

      <div style={{ display: 'none' }}>
        <Zap aria-hidden="true" />
      </div>
    </div>
  );
}
