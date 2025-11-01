
import React, { createContext, useState, useEffect, ReactNode, useCallback } from 'react';
import { FavoritesContextType } from '../types';
import { useAuth } from '../hooks/useAuth';
import { apiService } from '../services/apiService';

export const FavoritesContext = createContext<FavoritesContextType | null>(null);

export const FavoritesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadFavorites = async () => {
      if (user) {
        setIsLoading(true);
        const favs = await apiService.fetchUserFavorites(user.id);
        setFavoriteIds(favs);
        setIsLoading(false);
      } else {
        setFavoriteIds([]);
        setIsLoading(false);
      }
    };
    loadFavorites();
  }, [user]);

  const addFavorite = useCallback(async (gigId: string) => {
    if (!user) return;
    setFavoriteIds(prev => [...prev, gigId]); // Optimistic update
    try {
      await apiService.addFavorite(user.id, gigId);
    } catch (error) {
      console.error("Failed to add favorite:", error);
      setFavoriteIds(prev => prev.filter(id => id !== gigId)); // Revert on failure
    }
  }, [user]);

  const removeFavorite = useCallback(async (gigId: string) => {
    if (!user) return;
    setFavoriteIds(prev => prev.filter(id => id !== gigId)); // Optimistic update
    try {
      await apiService.removeFavorite(user.id, gigId);
    } catch (error) {
      console.error("Failed to remove favorite:", error);
      setFavoriteIds(prev => [...prev, gigId]); // Revert on failure
    }
  }, [user]);
  
  const isFavorite = useCallback((gigId: string) => {
    return favoriteIds.includes(gigId);
  }, [favoriteIds]);

  return (
    <FavoritesContext.Provider value={{ favoriteIds, addFavorite, removeFavorite, isFavorite, isLoading }}>
      {children}
    </FavoritesContext.Provider>
  );
};
