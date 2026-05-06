import fs from 'node:fs/promises';
import path from 'node:path';

export const MARVELCDB_BASE_URL = 'https://marvelcdb.com';
export const ASPECT_CODES = new Set(['aggression', 'justice', 'leadership', 'protection', 'pool']);

export const HERO_ALIASES = {
  cap_hero: 'Captain America',
  cap: 'Captain America',
  marvel: 'Captain Marvel',
  spidey: 'Spider-Man',
  panther: 'Black Panther',
  miles: 'Spider-Man',
  panthershuri: 'Black Panther',
};

export function normalizeName(value) {
  return String(value || '')
    .toLowerCase()
    .replace(/\/\/.*/g, '')
    .replace(/\([^)]*\)/g, '')
    .replace(/[^a-z0-9]+/g, '')
    .trim();
}

export async function fetchJson(url) {
  const response = await fetch(url, {
    headers: {
      accept: 'application/json',
      'user-agent': 'marvel-champions-randomizer-tracker/1.0',
    },
  });
  if (!response.ok) {
    throw new Error(`MarvelCDB request failed: ${response.status} ${response.statusText} (${url})`);
  }
  return response.json();
}

export async function loadMarvelCdbData() {
  const [packs, cards] = await Promise.all([
    fetchJson(`${MARVELCDB_BASE_URL}/api/public/packs/`),
    fetchJson(`${MARVELCDB_BASE_URL}/api/public/cards/`),
  ]);
  return { packs, cards };
}

export async function readCurrentHeroes(rootDir = process.cwd()) {
  const heroesPath = path.join(rootDir, 'src/data/heroes.ts');
  const text = await fs.readFile(heroesPath, 'utf8');
  const heroBlocks = text.match(/\{ name: ".*?"[\s\S]*? key: ".*?" \}/g) || [];
  return heroBlocks.map((block) => {
    const pick = (field) => block.match(new RegExp(`${field}: "([^"]+)"`))?.[1] || '';
    return {
      key: pick('key'),
      name: pick('name'),
      aspect: pick('aspect'),
      source: pick('source'),
    };
  }).filter((hero) => hero.key && hero.name);
}

export function findHeroCard(hero, cards) {
  const alias = HERO_ALIASES[hero.key] || hero.name;
  const wanted = normalizeName(alias);
  const candidates = cards.filter((card) => card.type_code === 'hero' && !card.hidden);
  const exact = candidates.find((card) => normalizeName(card.card_set_name || card.name) === wanted);
  if (hero.key === 'miles') {
    return candidates.find((card) => normalizeName(card.linked_to_name) === 'milesmorales') || exact;
  }
  if (hero.key === 'panthershuri') {
    return candidates.find((card) => normalizeName(card.linked_to_name) === 'shuri') || exact;
  }
  return exact;
}

export function getPreconAspect(heroCard, cards) {
  if (!heroCard) return null;
  const packCards = cards.filter((card) => card.pack_code === heroCard.pack_code);
  const counts = new Map();
  for (const card of packCards) {
    if (!ASPECT_CODES.has(card.faction_code)) continue;
    const aspectName = String(card.faction_name || '').replace(/^'+/, '');
    counts.set(aspectName, (counts.get(aspectName) || 0) + (card.quantity || 1));
  }
  const sorted = [...counts.entries()].sort((a, b) => b[1] - a[1]);
  if (sorted.length > 1 && sorted[0][1] === sorted[1][1]) return null;
  return sorted[0]?.[0] || null;
}

export function imageUrlFor(card) {
  if (!card?.imagesrc) return null;
  return new URL(card.imagesrc, MARVELCDB_BASE_URL).toString();
}
