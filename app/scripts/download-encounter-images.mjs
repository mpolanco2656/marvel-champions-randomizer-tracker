import fs from 'node:fs/promises';
import path from 'node:path';
import {
  fetchJson,
  fetchWithRetry,
  imageUrlFor,
  normalizeName,
  readArrayFromTs,
  sourcePackCode,
} from './marvelcdb-utils.mjs';

const rootDir = process.cwd();
const villainDir = path.join(rootDir, 'public/villain-images');
const modularDir = path.join(rootDir, 'public/modular-images');
await fs.mkdir(villainDir, { recursive: true });
await fs.mkdir(modularDir, { recursive: true });

const villains = await readArrayFromTs(rootDir, 'src/data/villains.ts', ['key', 'name', 'source']);
const modulars = await readArrayFromTs(rootDir, 'src/data/modularSets.ts', ['key', 'name', 'source']);
const packCache = new Map();
const aliases = {
  collector2: 'Escape the Museum',
  collector1: 'Infiltrate the Museum',
  ronan: 'Ronan the Accuser',
  greengoblin: 'Green Goblin',
  kang: 'Kang',
  mojomania_villain: 'Mojo',
  sinistersix: 'The Sinister Six',
  sinister: 'Mister Sinister',
  trickster_villain: 'Loki',
  synthezoid_villain: 'Ultron',
  shield1: 'HYDRA Infiltration',
  shield2: 'Agent Ward',
  shield3: 'Graviton',
  shield4: 'Hive',
};
const sourceOverrides = {
  sinister: 'NeXt Evolution',
  stryfe: 'NeXt Evolution',
};

async function cardsForSource(source) {
  const packCode = sourcePackCode(source);
  if (!packCode) return [];
  if (!packCache.has(packCode)) {
    packCache.set(packCode, fetchJson(`https://marvelcdb.com/api/public/cards/${packCode}`).catch(() => []));
  }
  return packCache.get(packCode);
}

function findEncounterCard(item, cards, kind) {
  const wanted = normalizeName(aliases[item.key] || item.name);
  const candidates = cards.filter((card) => card.imagesrc && card.faction_code === 'encounter');
  const typePreferred = kind === 'villain'
    ? candidates.filter((card) => card.type_code === 'villain')
    : candidates.filter((card) => normalizeName(card.card_set_name) === wanted);
  return (
    typePreferred.find((card) => normalizeName(card.card_set_name) === wanted)
    || typePreferred.find((card) => normalizeName(card.name) === wanted)
    || candidates.find((card) => normalizeName(card.card_set_name) === wanted)
    || candidates.find((card) => normalizeName(card.name) === wanted)
    || null
  );
}

async function downloadCard(card, outputPath) {
  const url = imageUrlFor(card);
  if (!url) return false;
  const response = await fetchWithRetry(url, {
    headers: { 'user-agent': 'marvel-champions-randomizer-tracker/1.0' },
  });
  await fs.writeFile(outputPath, Buffer.from(await response.arrayBuffer()));
  return true;
}

async function downloadItems(items, outputDir, kind) {
  let downloaded = 0;
  const missing = [];

  for (const item of items) {
    const outputPath = path.join(outputDir, `${item.key}.jpg`);
    const existing = await fs.stat(outputPath).catch(() => null);
    if (existing?.size) continue;

    const cards = await cardsForSource(sourceOverrides[item.key] || item.source);
    const card = findEncounterCard(item, cards, kind);
    if (!card) {
      missing.push(item);
      continue;
    }

    try {
      await downloadCard(card, outputPath);
      downloaded += 1;
      console.log(`Downloaded ${kind} ${item.name} -> ${path.relative(rootDir, outputPath)}`);
    } catch {
      missing.push(item);
    }
  }

  return { downloaded, missing };
}

const villainResult = await downloadItems(villains, villainDir, 'villain');
const modularResult = await downloadItems(modulars, modularDir, 'modular');

console.log(`Villain images missing: ${villainResult.missing.length}/${villains.length} (${villainResult.downloaded} new)`);
if (villainResult.missing.length) {
  for (const item of villainResult.missing) console.log(`- villain ${item.key}: ${item.name} (${item.source})`);
}

console.log(`Modular images missing: ${modularResult.missing.length}/${modulars.length} (${modularResult.downloaded} new)`);
if (modularResult.missing.length) {
  for (const item of modularResult.missing) console.log(`- modular ${item.key}: ${item.name} (${item.source})`);
}
