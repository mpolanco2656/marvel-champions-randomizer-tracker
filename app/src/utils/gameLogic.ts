import type { Hero, ModularSet, Villain } from '../types';
import { campaigns, heroPacks, scenarioPacks } from '../data';

export function getOwnedSources(campaignKeys: string[], packKeys: string[], heroPackKeys: string[]): string[] {
  const sources = new Set<string>();

  campaignKeys.forEach(campaignKey => {
    const campaign = campaigns.find(c => c.key === campaignKey);
    if (campaign) sources.add(campaign.name);
  });

  packKeys.forEach(packKey => {
    const pack = scenarioPacks.find(p => p.key === packKey);
    if (pack) sources.add(pack.name);
  });

  heroPackKeys.forEach(heroPackKey => {
    const heroPack = heroPacks.find(p => p.key === heroPackKey);
    if (heroPack) sources.add(heroPack.name);
  });

  return Array.from(sources);
}

export function generateWarningsAndSuggestions(
  heroes: Hero[],
  villain: Villain | null,
  playerCount: number
): { warnings: string[]; suggestions: string[] } {
  const warnings: string[] = [];
  const suggestions: string[] = [];

  if (playerCount === 2 && heroes.length === 2) {
    const aspects = heroes.map(h => h.aspect);
    if (aspects.includes('Aggression') && aspects.includes('Protection') && !aspects.includes('Justice')) {
      warnings.push('Aggression + Protection en 2-handed puede tener problemas con threat. Considera anadir Justice.');
    }
  }

  if (playerCount > 1 && heroes.some(h => h.key === 'deadpool')) {
    warnings.push('Deadpool es S+ solo pero C-tier multiplayer. Unkillable es un problema para el equipo!');
  }

  const setupHeroes = heroes.filter(h => h.playstyle.includes('Setup'));
  if (setupHeroes.length > 1) {
    warnings.push(`Multiples heroes setup (${setupHeroes.map(h => h.name).join(', ')}). El early game sera lento.`);
  }

  if (villain) {
    if (villain.key === 'ronan') {
      warnings.push('RONAN: Villano mas dificil (26% win). Overkill + Piercing contrarrestan todas las defensas. Muchos saltan este.');
    } else if (villain.key === 'venomgoblin') {
      suggestions.push('Venom Goblin: Aspecto Justice altamente recomendado. Remover Advanced Glider ASAP.');
    } else if (villain.key === 'magneto_villain') {
      suggestions.push('Magneto: No puedes hacer dano hasta remover Orbital Decay. Preparate para perdida de tempo.');
    } else if (villain.key === 'nebula_gmw') {
      warnings.push('Nebula: Densidad de Surge extrema = muy random. Uno de los villanos menos populares.');
    }

    if (villain.difficulty >= 8) {
      const tierValues: Record<string, number> = { 'S+': 5, S: 4, A: 3, B: 2, C: 1 };
      const avgTier = heroes.reduce((sum, h) => sum + tierValues[h.tier], 0) / heroes.length;

      if (avgTier < 3) {
        suggestions.push(`Villano dificultad ${villain.difficulty}/10 con heroes tier promedio ${avgTier < 2 ? 'B-C' : 'B'}. Considera heroes mas fuertes o bajar dificultad.`);
      }
    }
  }

  if (playerCount > 2) {
    const soloOptimized = heroes.filter(h => h.optimization === 'Solo');
    if (soloOptimized.length > 0) {
      suggestions.push(`${soloOptimized.map(h => h.name).join(', ')} optimizado para solo. Puede rendir bajo en ${playerCount} jugadores.`);
    }
  }

  return { warnings, suggestions };
}

export function selectThematicModulars(
  villain: Villain,
  availableModulars: ModularSet[],
  count: number
): ModularSet[] {
  if (villain.key === 'ronan') {
    const easyModulars = availableModulars.filter(m => m.difficulty < 4);
    if (easyModulars.length >= count) {
      const shuffled = easyModulars.sort(() => Math.random() - 0.5);
      return shuffled.slice(0, count);
    }
    const shuffled = availableModulars.sort(() => Math.random() - 0.5);
    return shuffled.slice(0, Math.min(count, shuffled.length));
  }

  if (villain.key === 'venomgoblin') {
    const goblinGear = availableModulars.find(m => m.key === 'goblingear');
    if (goblinGear) {
      const remaining = availableModulars.filter(m => m.key !== 'goblingear').sort(() => Math.random() - 0.5);
      return [goblinGear, ...remaining.slice(0, Math.min(count - 1, remaining.length))];
    }
  }

  if (['greengoblin', 'venomgoblin', 'mysterio'].includes(villain.key)) {
    const spiderModulars = availableModulars.filter(m =>
      ['messofthings', 'powerdrain', 'interference', 'osborntech', 'gimmicks', 'goblingear', 'downtoearth', 'cityinchaos'].includes(m.key)
    );
    const prioritized = [...spiderModulars, ...availableModulars.filter(m => !spiderModulars.includes(m))];
    const shuffled = prioritized.sort(() => Math.random() - 0.5);
    return shuffled.slice(0, Math.min(count, shuffled.length));
  }

  if (villain.key === 'thanos') {
    const infinityModulars = availableModulars.filter(m =>
      ['gauntlet', 'blackorder', 'childrenofthanos'].includes(m.key)
    );
    const prioritized = [...infinityModulars, ...availableModulars.filter(m => !infinityModulars.includes(m))];
    const shuffled = prioritized.sort(() => Math.random() - 0.5);
    return shuffled.slice(0, Math.min(count, shuffled.length));
  }

  if (villain.mechanics.includes('Minion Swarm')) {
    const minionModulars = availableModulars.filter(m =>
      ['mastersofevil', 'hydra', 'anachronauts'].includes(m.key)
    );
    const prioritized = [...minionModulars, ...availableModulars.filter(m => !minionModulars.includes(m))];
    const shuffled = prioritized.sort(() => Math.random() - 0.5);
    return shuffled.slice(0, Math.min(count, shuffled.length));
  }

  return availableModulars.sort(() => Math.random() - 0.5).slice(0, Math.min(count, availableModulars.length));
}
