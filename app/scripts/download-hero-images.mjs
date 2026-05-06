import fs from 'node:fs/promises';
import path from 'node:path';
import { findHeroCard, imageUrlFor, loadMarvelCdbData, readCurrentHeroes } from './marvelcdb-utils.mjs';

const rootDir = process.cwd();
const outputDir = path.join(rootDir, 'public/hero-images');
const { cards } = await loadMarvelCdbData();
const heroes = await readCurrentHeroes(rootDir);

await fs.mkdir(outputDir, { recursive: true });

let downloaded = 0;
const missing = [];

async function fetchWithRetry(url, attempts = 3) {
  let lastError;
  for (let attempt = 1; attempt <= attempts; attempt += 1) {
    try {
      const response = await fetch(url, {
        headers: { 'user-agent': 'marvel-champions-randomizer-tracker/1.0' },
      });
      if (response.ok) return response;
      lastError = new Error(`${response.status} ${response.statusText}`);
    } catch (error) {
      lastError = error;
    }
    await new Promise((resolve) => setTimeout(resolve, attempt * 750));
  }
  throw lastError;
}

for (const hero of heroes) {
  const card = findHeroCard(hero, cards);
  const url = imageUrlFor(card);
  if (!url) {
    missing.push(hero);
    continue;
  }

  const outputPath = path.join(outputDir, `${hero.key}.png`);
  const existing = await fs.stat(outputPath).catch(() => null);
  if (existing?.size) continue;

  const response = await fetchWithRetry(url).catch((error) => {
    console.warn(`Could not download ${hero.name}: ${error.message}`);
    return null;
  });
  if (!response) {
    missing.push(hero);
    continue;
  }

  const bytes = Buffer.from(await response.arrayBuffer());
  await fs.writeFile(outputPath, bytes);
  downloaded += 1;
  console.log(`Downloaded ${hero.name} -> ${path.relative(rootDir, outputPath)}`);
}

console.log(`Hero images present/downloaded: ${heroes.length - missing.length}/${heroes.length} (${downloaded} new)`);
if (missing.length) {
  console.log('Missing image matches:');
  for (const hero of missing) console.log(`- ${hero.key}: ${hero.name}`);
}
