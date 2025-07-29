"use client";

import { useState } from "react";
import { Search, Filter, X, ChevronDown, Heart, BarChart3 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface SearchFilterProps {
  onSearch: (query: string) => void;
  onFilter: (filters: FilterOptions) => void;
  onSort: (sortBy: string) => void;
  searchQuery: string;
  activeFilters: FilterOptions;
  sortBy: string;
  showOnlyFavorites: boolean;
  onToggleFavorites: (show: boolean) => void;
  favoritesCount: number;
  compareList: string[];
  onToggleComparison: () => void;
  isMounted: boolean;
}

interface FilterOptions {
  categories: string[];
  minRating: number;
  platforms: string[];
  releaseYear: string;
}

const categories = ["action-rpg", "action-adventure"];
const platforms = ["PlayStation 4", "PlayStation 5", "Xbox One", "Xbox Series X/S", "PC", "Nintendo Switch"];
const sortOptions = [
  { value: "rating", label: "Rating (High to Low)" },
  { value: "title", label: "Title (A-Z)" },
  { value: "releaseDate", label: "Release Date (Newest)" },
  { value: "developer", label: "Developer (A-Z)" }
];

export function SearchFilter({
  onSearch,
  onFilter,
  onSort,
  searchQuery,
  activeFilters,
  sortBy,
  showOnlyFavorites,
  onToggleFavorites,
  favoritesCount,
  compareList,
  onToggleComparison,
  isMounted
}: SearchFilterProps) {
  const [showFilters, setShowFilters] = useState(false);
  const [showSortDropdown, setShowSortDropdown] = useState(false);

  const handleCategoryChange = (category: string) => {
    const newCategories = activeFilters.categories.includes(category)
      ? activeFilters.categories.filter(c => c !== category)
      : [...activeFilters.categories, category];
    
    onFilter({ ...activeFilters, categories: newCategories });
  };

  const handlePlatformChange = (platform: string) => {
    const newPlatforms = activeFilters.platforms.includes(platform)
      ? activeFilters.platforms.filter(p => p !== platform)
      : [...activeFilters.platforms, platform];
    
    onFilter({ ...activeFilters, platforms: newPlatforms });
  };

  const clearFilters = () => {
    onFilter({
      categories: [],
      minRating: 0,
      platforms: [],
      releaseYear: ""
    });
  };

  const hasActiveFilters = activeFilters.categories.length > 0 || 
                          activeFilters.platforms.length > 0 || 
                          activeFilters.minRating > 0 ||
                          activeFilters.releaseYear !== "";

  return (
    <div className="w-full">
      <div className="max-w-7xl mx-auto p-4">
        {/* Search and Controls */}
        <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
          {/* Search Bar */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search games..."
              value={searchQuery}
              onChange={(e) => onSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => onSearch("")}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Controls */}
          <div className="flex items-center gap-3">
            {/* Sort Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowSortDropdown(!showSortDropdown)}
                className="flex items-center gap-2 px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white hover:bg-white/20 transition-all"
              >
                <span className="text-sm">Sort</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${showSortDropdown ? 'rotate-180' : ''}`} />
              </button>
              
              <AnimatePresence>
                {showSortDropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute top-full mt-2 right-0 w-48 bg-gray-900/95 backdrop-blur-md border border-white/20 rounded-lg overflow-hidden z-50"
                  >
                    {sortOptions.map((option) => (
                      <button
                        key={option.value}
                        onClick={() => {
                          onSort(option.value);
                          setShowSortDropdown(false);
                        }}
                        className={`w-full text-left px-4 py-2 text-sm hover:bg-white/10 transition-colors ${
                          sortBy === option.value ? 'bg-blue-600/50 text-blue-300' : 'text-white'
                        }`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Favorites Toggle */}
            <button
              onClick={() => onToggleFavorites(!showOnlyFavorites)}
              className={`flex items-center gap-2 px-4 py-2 border rounded-lg transition-all ${
                showOnlyFavorites
                  ? 'bg-red-600 border-red-500 text-white'
                  : 'bg-white/10 border-white/20 text-white hover:bg-white/20'
              }`}
              aria-label="Toggle favorites filter"
            >
              <Heart className={`w-4 h-4 ${showOnlyFavorites ? 'fill-white' : ''}`} />
              <span className="text-sm hidden sm:inline">Favorites</span>
              {isMounted && favoritesCount > 0 && (
                <span className="bg-white/20 text-xs px-1.5 py-0.5 rounded-full">
                  {favoritesCount}
                </span>
              )}
            </button>

            {/* Compare Toggle */}
            <button
              onClick={onToggleComparison}
              className={`flex items-center gap-2 px-4 py-2 border rounded-lg transition-all ${
                compareList.length > 0
                  ? 'bg-green-600 border-green-500 text-white'
                  : 'bg-white/10 border-white/20 text-white hover:bg-white/20'
              }`}
              aria-label="Compare selected games"
              disabled={compareList.length === 0}
            >
              <BarChart3 className="w-4 h-4" />
              <span className="text-sm hidden sm:inline">Compare</span>
              {isMounted && compareList.length > 0 && (
                <span className="bg-white/20 text-xs px-1.5 py-0.5 rounded-full">
                  {compareList.length}
                </span>
              )}
            </button>

            {/* Filter Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 px-4 py-2 border rounded-lg transition-all ${
                hasActiveFilters
                  ? 'bg-blue-600 border-blue-500 text-white'
                  : 'bg-white/10 border-white/20 text-white hover:bg-white/20'
              }`}
            >
              <Filter className="w-4 h-4" />
              <span className="text-sm hidden sm:inline">Filters</span>
              {hasActiveFilters && (
                <span className="bg-white/20 text-xs px-1.5 py-0.5 rounded-full">
                  {activeFilters.categories.length + activeFilters.platforms.length + (activeFilters.minRating > 0 ? 1 : 0)}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Filter Panel */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-4 p-4 bg-black/50 rounded-lg border border-white/20"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Categories */}
                <div>
                  <h3 className="text-sm font-semibold text-white mb-3">Categories</h3>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <label key={category} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={activeFilters.categories.includes(category)}
                          onChange={() => handleCategoryChange(category)}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="text-sm text-gray-300 capitalize">
                          {category.replace('-', ' ')}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Rating */}
                <div>
                  <h3 className="text-sm font-semibold text-white mb-3">Minimum Rating</h3>
                  <div className="space-y-3">
                    <input
                      type="range"
                      min="0"
                      max="10"
                      step="0.5"
                      value={activeFilters.minRating}
                      onChange={(e) => onFilter({ ...activeFilters, minRating: parseFloat(e.target.value) })}
                      className="w-full accent-blue-500"
                    />
                    <div className="text-sm text-gray-300">
                      {activeFilters.minRating === 0 ? "Any rating" : `${activeFilters.minRating}+ stars`}
                    </div>
                  </div>
                </div>

                {/* Platforms */}
                <div>
                  <h3 className="text-sm font-semibold text-white mb-3">Platforms</h3>
                  <div className="space-y-2 max-h-32 overflow-y-auto">
                    {platforms.map((platform) => (
                      <label key={platform} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={activeFilters.platforms.includes(platform)}
                          onChange={() => handlePlatformChange(platform)}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="text-sm text-gray-300">{platform}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              {/* Clear Filters */}
              {hasActiveFilters && (
                <div className="mt-4 pt-4 border-t border-white/10">
                  <button
                    onClick={clearFilters}
                    className="text-sm text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    Clear all filters
                  </button>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
