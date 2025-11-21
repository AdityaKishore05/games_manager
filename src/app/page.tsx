"use client";

import { games } from "@/app/data/games";
import { Cover } from "./ui/cover";
import { GameCard } from "./ui/GameCard";

export default function GamesPage() {
  return (
    <div className="relative lg:bg-gradient-to-br bg-gradient-to-b from-purple-700 via-blue-700 to-purple-700 z-10 min-h-screen lg:p-10 p-5 select-none">
      <h1
        className={`text-3xl lg:text-4xl font-bold text-white text-center font-serif lg:mb-10 mb-8`}
      >
        <Cover>Explore Games</Cover>
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 select-none">
        {games.map((game, index) => (
          <GameCard key={game.id} game={game} index={index} />
        ))}
      </div>
    </div>
  );
}
