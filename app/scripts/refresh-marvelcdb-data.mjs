import fs from 'node:fs/promises';
import path from 'node:path';
import { findHeroCard, getPreconAspect, imageUrlFor, loadMarvelCdbData, readCurrentHeroes } from './marvelcdb-utils.mjs';

const rootDir = process.cwd();
const outputDir = path.join(rootDir, 'src/data/generated');
const outputPath = path.join(outputDir, 'marvelcdb-snapshot.json');

const { packs, cards } = await loadMarvelCdbData();
const currentHeroes = await readCurrentHeroes(rootDir);
const marvelHeroes = cards.filter((card) => card.type_code === 'hero' && !card.hidden);
const matchedHeroSetCodes = new Set(currentHeroes.map((hero) => findHeroCard(hero, cards)?.card_set_code).filter(Boolean));

const heroes = marvelHeroes.map((card) => ({
  name: card.card_set_name || card.name,
  code: card.code,
  cardSetCode: card.card_set_code,
  packCode: card.pack_code,
  packName: card.pack_name,
  imageUrl: imageUrlFor(card),
  preconAspect: getPreconAspect(card, cards),
  url: card.url,
}));

const appHeroMatches = currentHeroes.map((hero) => {
  const card = findHeroCard(hero, cards);
  return {
    key: hero.key,
    name: hero.name,
    currentAspect: hero.aspect,
    marvelCdbName: card?.card_set_name || card?.name || null,
    packName: card?.pack_name || null,
    imageUrl: imageUrlFor(card),
    preconAspect: getPreconAspect(card, cards),
  };
});

const missingInApp = heroes
  .filter((hero) => !matchedHeroSetCodes.has(hero.cardSetCode))
  .map((hero) => ({ name: hero.name, packName: hero.packName, preconAspect: hero.preconAspect }));

await fs.mkdir(outputDir, { recursive: true });
await fs.writeFile(outputPath, `${JSON.stringify({
  generatedAt: new Date().toISOString(),
  source: 'https://marvelcdb.com/api/public/cards/',
  packs: packs.map((pack) => ({
    code: pack.code,
    name: pack.name,
    cycleName: pack.cycle_name,
    dateRelease: pack.date_release,
    position: pack.position,
  })),
  heroes,
  appHeroMatches,
  missingInApp,
}, null, 2)}\n`);

console.log(`Wrote ${path.relative(rootDir, outputPath)}`);
console.log(`MarvelCDB heroes: ${heroes.length}`);
console.log(`Current app heroes: ${currentHeroes.length}`);
console.log(`Potential new/missing heroes: ${missingInApp.length}`);
if (missingInApp.length) {
  for (const hero of missingInApp) {
    console.log(`- ${hero.name} (${hero.packName}${hero.preconAspect ? `, ${hero.preconAspect}` : ''})`);
  }
}
