import { findHeroCard, getPreconAspect, loadMarvelCdbData, readCurrentHeroes } from './marvelcdb-utils.mjs';

const { cards } = await loadMarvelCdbData();
const heroes = await readCurrentHeroes(process.cwd());
const rows = [];
const mismatches = [];

for (const hero of heroes) {
  const card = findHeroCard(hero, cards);
  const preconAspect = getPreconAspect(card, cards);
  const canStrictlyCheck = hero.source.includes('Hero Pack') || hero.key === 'deadpool';
  const status = !preconAspect
    ? 'unknown'
    : preconAspect === hero.aspect
      ? 'ok'
      : canStrictlyCheck
        ? 'check'
        : 'manual';
  const row = {
    key: hero.key,
    name: hero.name,
    currentAspect: hero.aspect,
    source: hero.source,
    marvelCdbPack: card?.pack_name || 'No match',
    preconAspect: preconAspect || 'Unknown',
    status,
  };
  rows.push(row);
  if (row.status === 'check') mismatches.push(row);
}

console.table(rows);

if (mismatches.length) {
  console.log('\nAspect checks needing review:');
  for (const row of mismatches) {
    console.log(`- ${row.key}: app=${row.currentAspect}, MarvelCDB precon=${row.preconAspect}, pack=${row.marvelCdbPack}`);
  }
  process.exitCode = 1;
} else {
  console.log('\nAll strictly checkable MarvelCDB precon aspects match the app.');
}
