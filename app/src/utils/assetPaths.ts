import type { Campaign, Hero, HeroPack, ModularSet, ScenarioPack, Villain } from '../types';

const base = import.meta.env.BASE_URL;

export function heroImagePath(heroOrKey: Hero | string): string {
  const key = typeof heroOrKey === 'string' ? heroOrKey : heroOrKey.key;
  return `${base}hero-images/${key}.png`;
}

export function villainImagePath(villainOrKey: Villain | string): string {
  const key = typeof villainOrKey === 'string' ? villainOrKey : villainOrKey.key;
  return `${base}villain-images/${key}.jpg`;
}

export function modularImagePath(modularOrKey: ModularSet | string): string {
  const key = typeof modularOrKey === 'string' ? modularOrKey : modularOrKey.key;
  return `${base}modular-images/${key}.jpg`;
}

export function campaignImagePath(campaignOrKey: Campaign | string): string {
  const key = typeof campaignOrKey === 'string' ? campaignOrKey : campaignOrKey.key;
  return `${base}pack-images/${key}.jpg`;
}

export function scenarioPackImagePath(packOrKey: ScenarioPack | string): string {
  const key = typeof packOrKey === 'string' ? packOrKey : packOrKey.key;
  return `${base}pack-images/${key}.jpg`;
}

export function heroPackImagePath(pack: HeroPack): string {
  return heroImagePath(pack.hero);
}
