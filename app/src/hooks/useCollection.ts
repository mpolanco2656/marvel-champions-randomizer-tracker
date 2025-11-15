import { useEffect, useRef } from 'react';
import type { Collection } from '../types';
import { useLocalStorage } from './useLocalStorage';

const INITIAL_COLLECTION: Collection = {
  campaigns: ['core'],
  scenarioPacks: [],
  heroPacks: []
};

export function useCollection() {
  const [collection, setCollection] = useLocalStorage<Collection>('mcCollection', INITIAL_COLLECTION);
  const hasMigrated = useRef(false);

  // Migrate old collection format (heroes -> heroPacks)
  useEffect(() => {
    if (!hasMigrated.current && collection && !collection.heroPacks && (collection as any).heroes) {
      hasMigrated.current = true;
      setCollection({
        campaigns: collection.campaigns || ['core'],
        scenarioPacks: collection.scenarioPacks || [],
        heroPacks: []
      });
    }
  }, [collection, setCollection]);

  return { collection, setCollection };
}
