import Link from "next/link";
import { games } from "@/app/data/games"; 

export default function GamesPage() {
  return (
    <div className="min-h-screen bg-gray-950 p-6 sm:p-10">
      <h1 className="text-4xl font-bold text-white text-center mb-12">
        Explore Games
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {games.map((game) => (
          <Link
            key={game.id}
            href={`/${game.slug}`}
            className="group bg-gray-800 rounded-2xl overflow-hidden shadow-lg transition-all transform hover:scale-[1.03] hover:shadow-2xl hover:brightness-110"
          >
            {/* Game Image */}
            <div className="relative">
              <img
                src={game.image}
                alt={game.title}
                className="w-full h-50 object-cover transition-opacity duration-300 group-hover:opacity-90"
              />
              <div className="absolute top-2 right-2 bg-black/60 text-yellow-400 px-2 py-1 text-xs font-semibold rounded">
                ⭐ {game.rating}/10
              </div>
            </div>

            {/* Game Info */}
            <div className="p-5">
              <h2 className="text-xl font-bold text-white group-hover:text-yellow-300 transition">
                {game.title}
              </h2>
              <p className="text-sm text-gray-400 mt-2 line-clamp-3">
                {game.description}
              </p>
              
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
