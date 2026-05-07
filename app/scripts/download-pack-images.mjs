import fs from 'node:fs/promises';
import path from 'node:path';
import {
  fetchWithRetry,
  firstImageFromHtml,
  PRODUCT_PAGE_URLS,
  readArrayFromTs,
} from './marvelcdb-utils.mjs';

const rootDir = process.cwd();
const outputDir = path.join(rootDir, 'public/pack-images');
await fs.mkdir(outputDir, { recursive: true });

const campaigns = await readArrayFromTs(rootDir, 'src/data/campaigns.ts', ['key', 'name']);
const scenarioPacks = await readArrayFromTs(rootDir, 'src/data/scenarioPacks.ts', ['key', 'name']);
const packs = [...campaigns, ...scenarioPacks];

let downloaded = 0;
const missing = [];

async function downloadImage(url, outputPath) {
  const response = await fetchWithRetry(url, {
    headers: { 'user-agent': 'marvel-champions-randomizer-tracker/1.0' },
  });
  const bytes = Buffer.from(await response.arrayBuffer());
  await fs.writeFile(outputPath, bytes);
}

for (const pack of packs) {
  const outputPath = path.join(outputDir, `${pack.key}.jpg`);
  const existing = await fs.stat(outputPath).catch(() => null);
  if (existing?.size) continue;

  const pageUrl = PRODUCT_PAGE_URLS[pack.key];
  if (!pageUrl) {
    missing.push({ ...pack, reason: 'No product page mapping' });
    continue;
  }

  try {
    const html = await fetchWithRetry(pageUrl, {
      headers: { 'user-agent': 'marvel-champions-randomizer-tracker/1.0' },
    }).then((response) => response.text());
    const imageUrl = firstImageFromHtml(html);
    if (!imageUrl) {
      missing.push({ ...pack, reason: 'No image found on product page' });
      continue;
    }
    await downloadImage(imageUrl, outputPath);
    downloaded += 1;
    console.log(`Downloaded ${pack.name} -> ${path.relative(rootDir, outputPath)}`);
  } catch (error) {
    missing.push({ ...pack, reason: error.message });
  }
}

console.log(`Pack images present/downloaded: ${packs.length - missing.length}/${packs.length} (${downloaded} new)`);
if (missing.length) {
  console.log('Missing pack images:');
  for (const item of missing) console.log(`- ${item.key}: ${item.name} (${item.reason})`);
}
