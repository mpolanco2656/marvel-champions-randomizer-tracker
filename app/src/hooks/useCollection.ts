import { useEffect, useRef } from 'react';
import type { Collection } from '../types';
import { useLocalStorage } from './useLocalStorage';
import { heroPacks } from '../data/heroPacks';

const INITIAL_COLLECTION: Collection = {
  campaigns: ['core'],
  scenarioPacks: [],
  heroPacks: []
};

// Type guard for legacy collection format
interface LegacyCollection {
  campaigns?: string[];
  scenarioPacks?: string[];
  heroes?: string[];
}

function isLegacyCollection(collection: any): collection is LegacyCollection {
  return collection !== null &&
         typeof collection === 'object' &&
         'heroes' in collection &&
         Array.isArray(collection.heroes) &&
         !('heroPacks' in collection);
}

// Map hero keys to hero pack keys
function migrateHeroesToHeroPacks(heroKeys: string[]): string[] {
  const heroToPackMap = new Map(
    heroPacks.map(pack => [pack.hero, pack.key])
  );

  return heroKeys
    .map(heroKey => heroToPackMap.get(heroKey))
    .filter((packKey): packKey is string => packKey !== undefined);
}

export function useCollection() {
  const [collection, setCollection] = useLocalStorage<Collection>('mcCollection', INITIAL_COLLECTION);
  const hasMigrated = useRef(false);

  // Migrate old collection format (heroes -> heroPacks)
  useEffect(() => {
    if (!hasMigrated.current && isLegacyCollection(collection)) {
      hasMigrated.current = true;

      const migratedHeroPacks = collection.heroes
        ? migrateHeroesToHeroPacks(collection.heroes)
        : [];

      setCollection({
        campaigns: collection.campaigns || ['core'],
        scenarioPacks: collection.scenarioPacks || [],
        heroPacks: migratedHeroPacks
      });
    }
  }, [collection, setCollection]);

  return { collection, setCollection };
}
