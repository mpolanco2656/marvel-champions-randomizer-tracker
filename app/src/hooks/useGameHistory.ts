import type { GameHistory } from '../types';
import { useLocalStorage } from './useLocalStorage';

export function useGameHistory() {
  const [history, setHistory] = useLocalStorage<GameHistory[]>('mcHistory', []);

  const addGame = (game: Omit<GameHistory, 'id' | 'date'>) => {
    const newGame: GameHistory = {
      ...game,
      id: Date.now().toString(),
      date: new Date().toISOString()
    };
    setHistory([newGame, ...history]);
  };

  const clearHistory = () => {
    if (confirm('¿Limpiar todo el historial?')) {
      setHistory([]);
    }
  };

  const importHistory = (importedHistory: GameHistory[]) => {
    setHistory(importedHistory);
  };

  return { history, addGame, clearHistory, importHistory };
}
