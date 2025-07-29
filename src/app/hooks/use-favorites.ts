"use client";

import { useState, useEffect } from "react";

export function useFavorites() {
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    // Load favorites from localStorage on mount
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
    setFavorites(prev => {
      const newFavorites = prev.includes(gameId)
        ? prev.filter(id => id !== gameId)
        : [...prev, gameId];
      
      // Save to localStorage
      localStorage.setItem("game-favorites", JSON.stringify(newFavorites));
      return newFavorites;
    });
  };

  const isFavorite = (gameId: string) => favorites.includes(gameId);

  return {
    favorites,
    toggleFavorite,
    isFavorite
  };
}
