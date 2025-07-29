"use client";

import { useState, useEffect } from "react";
import { Game } from "@/app/data/games";

const MAX_RECENT_ITEMS = 5;

export function useRecentlyViewed() {
  const [recentlyViewed, setRecentlyViewed] = useState<Game[]>([]);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    // Mark as hydrated to prevent SSR mismatch
    setIsHydrated(true);
    
    // Load recently viewed from localStorage after hydration
    const stored = localStorage.getItem("recently-viewed-games");
    if (stored) {
      try {
        setRecentlyViewed(JSON.parse(stored));
      } catch (error) {
        console.error("Error loading recently viewed:", error);
        setRecentlyViewed([]);
      }
    }
  }, []);

  const addToRecentlyViewed = (game: Game) => {
    if (!isHydrated) return; // Prevent action before hydration
    
    setRecentlyViewed(prev => {
      // Remove if already exists
      const filtered = prev.filter(item => item.id !== game.id);
      // Add to beginning
      const newRecent = [game, ...filtered].slice(0, MAX_RECENT_ITEMS);
      
      // Save to localStorage
      localStorage.setItem("recently-viewed-games", JSON.stringify(newRecent));
      return newRecent;
    });
  };

  return {
    recentlyViewed: isHydrated ? recentlyViewed : [], // Return empty array during SSR
    addToRecentlyViewed,
    isHydrated
  };
}
