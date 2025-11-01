
import { useContext } from 'react';
import { FavoritesContext } from '../contexts/FavoritesContext';
import { FavoritesContextType } from '../types';

export const useFavorites = (): FavoritesContextType => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};
