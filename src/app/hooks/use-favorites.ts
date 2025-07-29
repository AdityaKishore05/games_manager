"use client";

import { useState, useEffect } from "react";

export function useFavorites() {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    // Only run on client side
    setIsHydrated(true);
    
    try {
      const stored = localStorage.getItem("game-favorites");
      if (stored) {
        const parsed = JSON.parse(stored);
        setFavorites(Array.isArray(parsed) ? parsed : []);
      }
    } catch (error) {
      console.error("Error loading favorites:", error);
      setFavorites([]);
    }
  }, []);

  const toggleFavorite = (gameId: string) => {
    if (!isHydrated) return;
    
    setFavorites(prev => {
      const newFavorites = prev.includes(gameId)
        ? prev.filter(id => id !== gameId)
        : [...prev, gameId];
      
      try {
        localStorage.setItem("game-favorites", JSON.stringify(newFavorites));
      } catch (error) {
        console.error("Error saving favorites:", error);
      }
      
      return newFavorites;
    });
  };

  const isFavorite = (gameId: string) => {
    return isHydrated && favorites.includes(gameId);
  };

  return {
    favorites,
    toggleFavorite,
    isFavorite,
    isHydrated
  };
}
