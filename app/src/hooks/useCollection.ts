import type { Collection } from '../types';
import { useLocalStorage } from './useLocalStorage';

const INITIAL_COLLECTION: Collection = {
  campaigns: ['core'],
  scenarioPacks: [],
  heroPacks: []
};

export function useCollection() {
  const [collection, setCollection] = useLocalStorage<Collection>('mcCollection', INITIAL_COLLECTION);

  return { collection, setCollection };
}
