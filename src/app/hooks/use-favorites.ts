"use client";

import { useState, useEffect } from "react";

export function useFavorites() {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    // Mark as hydrated to prevent SSR mismatch
    setIsHydrated(true);
    
    // Load favorites from localStorage after hydration
    const stored = localStorage.getItem("game-favorites");
    if (stored) {
      try {
        setFavorites(JSON.parse(stored));
      } catch (error) {
        console.error("Error loading favorites:", error);
        setFavorites([]);
      }
    }
  }, []);

  const toggleFavorite = (gameId: string) => {
    if (!isHydrated) return; // Prevent action before hydration
    
    setFavorites(prev => {
      const newFavorites = prev.includes(gameId)
        ? prev.filter(id => id !== gameId)
        : [...prev, gameId];
      
      // Save to localStorage
      localStorage.setItem("game-favorites", JSON.stringify(newFavorites));
      return newFavorites;
    });
  };

  const isFavorite = (gameId: string) => {
    if (!isHydrated) return false; // Return false during SSR
    return favorites.includes(gameId);
  };

  return {
    favorites: isHydrated ? favorites : [], // Return empty array during SSR
    toggleFavorite,
    isFavorite,
    isHydrated
  };
}
