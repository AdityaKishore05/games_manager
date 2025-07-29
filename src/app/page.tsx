"use client";

import { useRouter } from "next/navigation";
import { games, Game } from "@/app/data/games";
import { Cover } from "./ui/cover";
import { motion } from "framer-motion";
import { CardContainer, CardBody, CardItem } from "./ui/3d-card";
import { SearchFilter } from "./ui/search-filter";
import { LoadingGrid } from "./ui/loading-skeleton";
import { useFavorites } from "./hooks/use-favorites";
import { useRecentlyViewed } from "./hooks/use-recently-viewed";
import { GameComparison, CompareButton } from "./ui/game-comparison";
import { ClientOnly } from "./ui/client-only";
import { useState, useMemo, useEffect } from "react";
import { Heart, Zap, BarChart3, Star } from "lucide-react";


interface FilterOptions {
  categories: string[];
  minRating: number;
  platforms: string[];
  releaseYear: string;
}

export default function GamesPage() {
  const router = useRouter();
  const { favorites, toggleFavorite, isFavorite, isHydrated } = useFavorites();
  const { addToRecentlyViewed } = useRecentlyViewed();

  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState<FilterOptions>({
    categories: [],
    minRating: 0,
    platforms: [],
    releaseYear: ""
  });
  const [sortBy, setSortBy] = useState("rating");
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [compareList, setCompareList] = useState<string[]>([]);
  const [showComparison, setShowComparison] = useState(false);

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  const toggleCompare = (gameId: string) => {
    setCompareList(prev => {
      if (prev.includes(gameId)) {
        return prev.filter(id => id !== gameId);
      } else if (prev.length < 3) {
        return [...prev, gameId];
      }
      return prev;
    });
  };

  const compareGames = games.filter(game => compareList.includes(game.id));

  const handleGameClick = (game: Game) => {
    if (isHydrated) {
      addToRecentlyViewed(game);
    }
    router.push(`/${game.slug}`);
  };



  const filteredAndSortedGames = useMemo(() => {
    let filtered = games.filter(game => {
      // Search filter
      if (searchQuery && !game.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
          !game.description.toLowerCase().includes(searchQuery.toLowerCase()) &&
          !game.developer.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }

      // Category filter
      if (filters.categories.length > 0 && !filters.categories.includes(game.category)) {
        return false;
      }

      // Rating filter
      if (filters.minRating > 0 && game.rating < filters.minRating) {
        return false;
      }

      // Platform filter
      if (filters.platforms.length > 0) {
        const hasMatchingPlatform = filters.platforms.some(platform =>
          game.platforms.includes(platform)
        );
        if (!hasMatchingPlatform) return false;
      }

      // Favorites filter - only apply after hydration
      if (showOnlyFavorites && isHydrated && !isFavorite(game.id)) {
        return false;
      }

      return true;
    });

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "rating":
          return b.rating - a.rating;
        case "title":
          return a.title.localeCompare(b.title);
        case "releaseDate":
          return new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime();
        case "developer":
          return a.developer.localeCompare(b.developer);
        default:
          return 0;
      }
    });

    return filtered;
  }, [searchQuery, filters, sortBy, showOnlyFavorites, isFavorite]);



  if (isLoading) {
    return (
      <div className="relative bg-gradient-to-br from-purple-700 via-blue-700 to-purple-700 min-h-screen p-5 lg:p-10">
        {/* Header skeleton */}
        <div className="text-center mb-8">
          <div className="h-12 w-64 bg-gray-700/50 rounded mx-auto animate-pulse" />
        </div>

        {/* Search bar skeleton */}
        <div className="max-w-md mx-auto mb-8">
          <div className="h-10 bg-gray-700/50 rounded animate-pulse" />
        </div>

        <LoadingGrid count={6} />
      </div>
    );
  }

  return (
    <div className="relative bg-gradient-to-br from-purple-700 via-blue-700 to-purple-700 min-h-screen">
      {/* Header */}
      <div className="relative z-30 pt-5 lg:pt-10 pb-4">
        <div className="max-w-7xl mx-auto px-5">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl lg:text-4xl font-bold text-white font-serif">
              <Cover>Explore Games</Cover>
            </h1>


          </div>
        </div>
      </div>

      {/* Search and Filter - Now sticky */}
      <div className="sticky top-0 z-40 bg-gradient-to-r from-purple-700 via-blue-700 to-purple-700 border-b border-white/20">
        <ClientOnly>
          <SearchFilter
            onSearch={setSearchQuery}
            onFilter={setFilters}
            onSort={setSortBy}
            searchQuery={searchQuery}
            activeFilters={filters}
            sortBy={sortBy}
            showOnlyFavorites={showOnlyFavorites}
            onToggleFavorites={setShowOnlyFavorites}
            favoritesCount={favorites.length}
            compareList={compareList}
            onToggleComparison={() => setShowComparison(true)}
            isMounted={isHydrated}
          />
        </ClientOnly>
      </div>

      <div className="max-w-7xl mx-auto p-5 lg:p-10">



        {/* Results Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-white">
            {searchQuery
              ? `Search results for "${searchQuery}"`
              : showOnlyFavorites
                ? "Your Favorite Games"
                : "All Games"
            }
            <span className="text-gray-400 ml-2">({filteredAndSortedGames.length})</span>
          </h2>
        </div>

        {/* Games Grid */}
        {filteredAndSortedGames.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 text-lg mb-2">No games found</div>
            <p className="text-gray-500">Try adjusting your search or filters</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 select-none">
            {filteredAndSortedGames.map((game, index) => (
              <motion.div
                key={game.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <CardContainer containerClassName="w-full">
                  <CardBody
                    className="h-[280px] lg:h-[330px] w-full cursor-pointer bg-gray-900/50 rounded-2xl transition-all duration-300 hover:scale-[1.02] group"
                    onClick={() => handleGameClick(game)}
                    role="button"
                    tabIndex={0}
                    aria-label={`View details for ${game.title}`}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        handleGameClick(game);
                      }
                    }}
                  >
                    {/* Image */}
                    <div className="relative h-[55%] overflow-hidden rounded-t-2xl">
                      <CardItem translateZ={20}>
                        <img
                          src={game.image}
                          alt={game.title}
                          className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110"
                          loading="lazy"
                        />
                      </CardItem>

                      {/* Action Buttons */}
                      <div className="absolute top-2 left-2 flex flex-col gap-2">
                        <CardItem translateZ={30}>
                          <ClientOnly>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                toggleFavorite(game.id);
                              }}
                              className={`p-2 rounded-full backdrop-blur-sm transition-all hover:scale-110 ${
                                isFavorite(game.id)
                                  ? 'bg-red-500/80 text-white'
                                  : 'bg-black/60 text-gray-300 hover:text-red-400'
                              }`}
                              aria-label={`${isFavorite(game.id) ? 'Remove from' : 'Add to'} favorites`}
                            >
                              <Heart className={`w-4 h-4 ${isFavorite(game.id) ? 'fill-white' : ''}`} />
                            </button>
                          </ClientOnly>
                        </CardItem>

                        <CardItem translateZ={30}>
                          <CompareButton
                            gameId={game.id}
                            isSelected={compareList.includes(game.id)}
                            onToggle={toggleCompare}
                          />
                        </CardItem>
                      </div>

                      {/* Rating */}
                      <CardItem
                        translateZ={30}
                        className="absolute top-2 right-2 bg-black/60 text-yellow-400 px-2 py-1 text-xs font-semibold rounded flex items-center gap-1"
                      >
                        <Star className="w-3 h-3 fill-yellow-400" />
                        {game.rating}/10
                      </CardItem>


                    </div>

                    {/* Content */}
                    <div className="h-[40%] flex flex-col justify-center p-4">
                      <CardItem translateZ={40}>
                        <h2 className="text-xl font-bold text-white group-hover:text-yellow-300 transition text-center mb-2 font-serif">
                          {game.title}
                        </h2>
                        <p className="text-sm text-gray-300 line-clamp-2 text-center">
                          {game.description}
                        </p>
                      </CardItem>
                    </div>
                  </CardBody>
                </CardContainer>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Game Comparison Modal */}
      <ClientOnly>
        <GameComparison
          games={compareGames}
          isOpen={showComparison}
          onClose={() => setShowComparison(false)}
        />
      </ClientOnly>
    </div>
  );
}
