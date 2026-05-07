import fs from 'node:fs/promises';
import path from 'node:path';

export const MARVELCDB_BASE_URL = 'https://marvelcdb.com';
export const ASPECT_CODES = new Set(['aggression', 'justice', 'leadership', 'protection', 'pool']);
export const SOURCE_PACK_CODES = {
  'Core Set': 'core',
  'Green Goblin': 'gob',
  'Wrecking Crew': 'twc',
  'Rise of Red Skull': 'trors',
  'The Once and Future Kang': 'toafk',
  "Galaxy's Most Wanted": 'gmw',
  "Mad Titan's Shadow": 'mts',
  'The Hood': 'hood',
  'Sinister Motives': 'sm',
  'Mutant Genesis': 'mut_gen',
  'MojoMania': 'mojo',
  'NeXt Evolution': 'next_evol',
  'Age of Apocalypse': 'aoa',
  'Agents of S.H.I.E.L.D.': 'aos',
  'Trickster Takeover': 'tt',
  'Civil War': 'cw',
  'Synthezoid Smackdown': 'synthezoid',
  'Nova Hero Pack': 'nova',
  'Ironheart Hero Pack': 'ironheart',
  'Spider-Ham Hero Pack': 'spiderham',
  'SP//dr Hero Pack': 'spdr',
  'Wolverine Hero Pack': 'wolv',
  'Storm Hero Pack': 'storm',
  'Gambit Hero Pack': 'gambit',
  'Rogue Hero Pack': 'rogue',
  'Iceman Hero Pack': 'iceman',
  'Black Panther/Shuri Hero Pack': 'bp',
  'Silk Hero Pack': 'silk',
  'Falcon Hero Pack': 'falcon',
  'Winter Soldier Hero Pack': 'winter',
};

export const PRODUCT_PAGE_URLS = {
  core: 'https://www.fantasyflightgames.com/en/products/marvel-champions-the-card-game/products/marvel-champions-card-game-core-set/',
  riseofredskull: 'https://www.fantasyflightgames.com/en/products/marvel-champions-the-card-game/products/rise-red-skull/',
  galaxysmostwanted: 'https://www.fantasyflightgames.com/en/products/marvel-champions-the-card-game/products/galaxys-most-wanted/',
  madtitansshadow: 'https://www.fantasyflightgames.com/en/products/marvel-champions-the-card-game/products/mad-titans-shadow/',
  sinistermotives: 'https://www.fantasyflightgames.com/en/products/marvel-champions-the-card-game/products/sinister-motives/',
  mutantgenesis: 'https://www.fantasyflightgames.com/en/products/marvel-champions-the-card-game/products/mutant-genesis/',
  nextevolution: 'https://www.fantasyflightgames.com/en/products/marvel-champions-the-card-game/products/next-evolution/',
  ageofapocalypse: 'https://www.fantasyflightgames.com/en/products/marvel-champions-the-card-game/products/age-apocalypse/',
  agentsofshield: 'https://www.fantasyflightgames.com/en/products/marvel-champions-the-card-game/products/agents-shield/',
  civilwar: 'https://www.fantasyflightgames.com/en/products/marvel-champions-the-card-game/products/civil-war/',
  greengoblin: 'https://www.fantasyflightgames.com/en/products/marvel-champions-the-card-game/products/green-goblin-scenario-pack/',
  wreckingcrew: 'https://www.fantasyflightgames.com/en/products/marvel-champions-the-card-game/products/wrecking-crew/',
  kang: 'https://www.fantasyflightgames.com/en/products/marvel-champions-the-card-game/products/once-and-future-kang/',
  hood: 'https://www.fantasyflightgames.com/en/products/marvel-champions-the-card-game/products/the-hood/',
  mojomania: 'https://www.fantasyflightgames.com/en/products/marvel-champions-the-card-game/products/mojomania/',
  trickster: 'https://www.fantasyflightgames.com/en/products/marvel-champions-the-card-game/products/trickster-takeover/',
  synthezoid: 'https://www.fantasyflightgames.com/en/products/marvel-champions-the-card-game/products/synthezoid-smackdown/',
};

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
  const response = await fetchWithRetry(url, {
    headers: {
      accept: 'application/json',
      'user-agent': 'marvel-champions-randomizer-tracker/1.0',
    },
  });
  return response.json();
}

export async function fetchWithRetry(url, init = {}, attempts = 3) {
  let lastError;
  for (let attempt = 1; attempt <= attempts; attempt += 1) {
    try {
      const response = await fetch(url, init);
      if (response.ok) return response;
      lastError = new Error(`Request failed: ${response.status} ${response.statusText} (${url})`);
    } catch (error) {
      lastError = error;
    }
    await new Promise((resolve) => setTimeout(resolve, attempt * 800));
  }
  throw lastError;
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

export async function readArrayFromTs(rootDir, relativePath, fields) {
  const text = await fs.readFile(path.join(rootDir, relativePath), 'utf8');
  const blocks = text.match(/\{[\s\S]*?\}/g) || [];
  return blocks.map((block) => {
    const item = {};
    for (const field of fields) {
      const value = block.match(new RegExp(`${field}:\\s*"([^"]+)"`))?.[1];
      if (value) item[field] = value;
    }
    return item;
  }).filter((item) => item.key && item.name);
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

export function firstImageFromHtml(html) {
  const og = html.match(/<meta[^>]+(?:property|name)=["']og:image["'][^>]+content=["']([^"']+)["'][^>]*>/i)
    || html.match(/<meta[^>]+content=["']([^"']+)["'][^>]+(?:property|name)=["']og:image["'][^>]*>/i);
  if (og?.[1]) return og[1].replace(/^http:\/\//, 'https://');
  return html.match(/https?:[^"'<>]+\.(?:png|jpg|jpeg|webp)/i)?.[0]?.replace(/^http:\/\//, 'https://') || null;
}

export function sourcePackCode(sourceName) {
  return SOURCE_PACK_CODES[sourceName] || null;
}
