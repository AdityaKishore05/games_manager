"use client";

import { useState } from "react";
import { Game } from "@/app/data/games";
import { X, Plus, Star, Calendar, User, Gamepad2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { PlatformIcons } from "./platform-icons";

interface GameComparisonProps {
  games: Game[];
  isOpen: boolean;
  onClose: () => void;
}

export function GameComparison({ games, isOpen, onClose }: GameComparisonProps) {
  if (!isOpen) return null;

  const comparisonFields = [
    { key: "rating", label: "Rating", icon: Star },
    { key: "developer", label: "Developer", icon: User },
    { key: "releaseDate", label: "Release Date", icon: Calendar },
    { key: "platforms", label: "Platforms", icon: Gamepad2 },
    { key: "category", label: "Category" },
    { key: "difficulty", label: "Difficulty" },
    { key: "multiplayer", label: "Multiplayer" },
    { key: "playerChoiceImpact", label: "Player Choice Impact" }
  ];

  const formatValue = (game: Game, key: string) => {
    switch (key) {
      case "rating":
        return `${game.rating}/10`;
      case "releaseDate":
        return new Date(game.releaseDate).toLocaleDateString();
      case "platforms":
        return <PlatformIcons platforms={game.platforms} size="md" />;
      case "category":
        return game.category.replace('-', ' ').toUpperCase();
      case "multiplayer":
      case "playerChoiceImpact":
        return game[key as keyof Game] ? "Yes" : "No";
      default:
        return game[key as keyof Game] as string;
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          className="bg-gray-900 rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-700">
            <h2 className="text-2xl font-bold text-white">Game Comparison</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-gray-400" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6 overflow-auto max-h-[calc(90vh-100px)]">
            {games.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-gray-400 text-lg mb-2">No games selected for comparison</div>
                <p className="text-gray-500">Add games to compare their features</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr>
                      <th className="text-left p-4 w-48 text-gray-300 font-semibold">Feature</th>
                      {games.map((game) => (
                        <th key={game.id} className="text-center p-4 min-w-64">
                          <div className="space-y-3">
                            <img
                              src={game.image}
                              alt={game.title}
                              className="w-32 h-20 object-cover rounded-lg mx-auto"
                            />
                            <h3 className="text-white font-bold text-lg">{game.title}</h3>
                          </div>
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {comparisonFields.map((field, index) => (
                      <tr
                        key={field.key}
                        className={`border-t border-gray-700 ${
                          index % 2 === 0 ? 'bg-gray-800/30' : 'bg-transparent'
                        }`}
                      >
                        <td className="p-4 text-gray-300 font-medium flex items-center gap-2">
                          {field.icon && <field.icon className="w-4 h-4" />}
                          {field.label}
                        </td>
                        {games.map((game) => (
                          <td key={`${game.id}-${field.key}`} className="p-4 text-center text-white">
                            {formatValue(game, field.key)}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

interface CompareButtonProps {
  gameId: string;
  isSelected: boolean;
  onToggle: (gameId: string) => void;
}

export function CompareButton({ gameId, isSelected, onToggle }: CompareButtonProps) {
  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        onToggle(gameId);
      }}
      className={`p-2 rounded-full backdrop-blur-sm transition-all hover:scale-110 ${
        isSelected
          ? 'bg-blue-500/80 text-white'
          : 'bg-black/60 text-gray-300 hover:text-blue-400'
      }`}
      aria-label={`${isSelected ? 'Remove from' : 'Add to'} comparison`}
    >
      <Plus className={`w-4 h-4 transition-transform ${isSelected ? 'rotate-45' : ''}`} />
    </button>
  );
}
