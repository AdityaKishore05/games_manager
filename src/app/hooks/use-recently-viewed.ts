"use client";

import { useState, useEffect } from "react";
import { Game } from "@/app/data/games";

const MAX_RECENT_ITEMS = 5;

export function useRecentlyViewed() {
  const [recentlyViewed, setRecentlyViewed] = useState<Game[]>([]);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    // Only run on client side
    setIsHydrated(true);
    
    try {
      const stored = localStorage.getItem("recently-viewed-games");
      if (stored) {
        const parsed = JSON.parse(stored);
        setRecentlyViewed(Array.isArray(parsed) ? parsed : []);
      }
    } catch (error) {
      console.error("Error loading recently viewed:", error);
      setRecentlyViewed([]);
    }
  }, []);

  const addToRecentlyViewed = (game: Game) => {
    if (!isHydrated) return;
    
    setRecentlyViewed(prev => {
      const filtered = prev.filter(item => item.id !== game.id);
      const newRecent = [game, ...filtered].slice(0, MAX_RECENT_ITEMS);
      
      try {
        localStorage.setItem("recently-viewed-games", JSON.stringify(newRecent));
      } catch (error) {
        console.error("Error saving recently viewed:", error);
      }
      
      return newRecent;
    });
  };

  return {
    recentlyViewed,
    addToRecentlyViewed,
    isHydrated
  };
}
