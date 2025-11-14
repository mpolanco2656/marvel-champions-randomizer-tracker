import type { Hero, Villain, ModularSet } from '../types';
import { campaigns, scenarioPacks, heroPacks } from '../data';

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

  // 2-handed warnings
  if (playerCount === 2 && heroes.length === 2) {
    const aspects = heroes.map(h => h.aspect);
    if (aspects.includes('Aggression') && aspects.includes('Protection') && !aspects.includes('Justice')) {
      warnings.push('⚠️ Aggression + Protection en 2-handed puede tener problemas con threat. Considera añadir Justice.');
    }
  }

  // Deadpool multiplayer warning
  if (playerCount > 1 && heroes.some(h => h.key === 'deadpool')) {
    warnings.push('⚠️ Deadpool es S+ solo pero C-tier multiplayer. ¡Unkillable es un problema para el equipo!');
  }

  // Setup heroes warning
  const setupHeroes = heroes.filter(h => h.playstyle.includes('Setup'));
  if (setupHeroes.length > 1) {
    warnings.push(`⚠️ Múltiples héroes setup (${setupHeroes.map(h => h.name).join(', ')}). El early game será lento.`);
  }

  // Villain-specific warnings
  if (villain) {
    if (villain.key === 'ronan') {
      warnings.push('🔴 RONAN: Villano más difícil (26% win). Overkill + Piercing contrarrestan todas las defensas. Muchos saltan este.');
    } else if (villain.key === 'venomgoblin') {
      suggestions.push('💡 Venom Goblin: Aspecto Justice altamente recomendado. Remover Advanced Glider ASAP.');
    } else if (villain.key === 'magneto_villain') {
      suggestions.push('💡 Magneto: No puedes hacer daño hasta remover Orbital Decay. Prepárate para pérdida de tempo.');
    } else if (villain.key === 'nebula_gmw') {
      warnings.push('⚠️ Nebula: Densidad de Surge extrema = muy random. Uno de los villanos menos populares.');
    }

    // Difficulty vs hero power
    if (villain.difficulty >= 8) {
      const tierValues: Record<string, number> = { 'S+': 5, 'S': 4, 'A': 3, 'B': 2, 'C': 1 };
      const avgTier = heroes.reduce((sum, h) => sum + tierValues[h.tier], 0) / heroes.length;

      if (avgTier < 3) {
        suggestions.push(`💡 Villano dificultad ${villain.difficulty}/10 con héroes tier promedio ${avgTier < 2 ? 'B-C' : 'B'}. Considera héroes más fuertes o bajar dificultad.`);
      }
    }
  }

  // Solo-optimized heroes in multiplayer
  if (playerCount > 2) {
    const soloOptimized = heroes.filter(h => h.optimization === 'Solo');
    if (soloOptimized.length > 0) {
      suggestions.push(`💡 ${soloOptimized.map(h => h.name).join(', ')} optimizado para solo. Puede rendir bajo en ${playerCount} jugadores.`);
    }
  }

  return { warnings, suggestions };
}

export function selectThematicModulars(
  villain: Villain,
  availableModulars: ModularSet[],
  count: number
): ModularSet[] {
  // Venom Goblin gets Goblin Gear
  if (villain.key === 'venomgoblin') {
    const goblinGear = availableModulars.find(m => m.key === 'goblingear');
    if (goblinGear) {
      const remaining = availableModulars.filter(m => m.key !== 'goblingear').sort(() => Math.random() - 0.5);
      return [goblinGear, ...remaining.slice(0, Math.min(count - 1, remaining.length))];
    }
  }

  // Spider-Man villains get spider modulars
  if (['greengoblin', 'venomgoblin', 'mysterio'].includes(villain.key)) {
    const spiderModulars = availableModulars.filter(m =>
      ['messofthings', 'powerdrain', 'interference', 'osborntech', 'gimmicks', 'streets'].includes(m.key)
    );
    const prioritized = [...spiderModulars, ...availableModulars.filter(m => !spiderModulars.includes(m))];
    const shuffled = prioritized.sort(() => Math.random() - 0.5);
    return shuffled.slice(0, Math.min(count, shuffled.length));
  }

  return availableModulars.sort(() => Math.random() - 0.5).slice(0, Math.min(count, availableModulars.length));
}
