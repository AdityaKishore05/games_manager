import { games } from "@/app/data/games";
import { FaGamepad, FaCalendarAlt, FaDesktop, FaStar } from "react-icons/fa";

type Params = Promise<{ slug: string }>;
export default async function Page({ params }: { params: Params }) {
const { slug } = await params;

  const game = games.find((game) => game.slug === slug);

  if (!game) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white text-2xl">
        Game not found
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-gray-950 p-6 sm:p-10 text-gray-300">
      <div className="relative w-full h-96 overflow-hidden rounded-xl shadow-2xl">
        <img
          src={game.image}
          alt={game.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/20 flex flex-col justify-center items-center text-center p-4">
          <h1 className="text-4xl sm:text-5xl font-bold text-white">
            {game.title}
          </h1>
        </div>
      </div>

      <div className="mt-10 space-y-6 max-w-7xl mx-auto">
        {[
          { label: "Description", value: game.description },
          { label: "Story", value: game.story },
          { label: "Setting", value: game.setting },
          { label: "Combat Style", value: game.combatStyle },
          { label: "World Design", value: game.worldDesign },
          { label: "Difficulty", value: game.difficulty },
          { label: "Progression Style", value: game.progressionSystem },
        ].map(({ label, value }) => (
          <p key={label} className="leading-relaxed lg:text-lg text-md">
            <span className="text-lg lg:text-xl font-semibold underline">{label}:</span>{" "}
            {value}
          </p>
        ))}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-6">
          <div className="bg-gray-800 p-4 rounded-xl shadow-md flex flex-col items-start justify-center gap-2">
            <div className="flex items-center gap-2 text-yellow-400">
              <FaStar />
              <span className="font-semibold text-white">Rating:</span>
              <p className="text-gray-300">{game.rating}/10</p>
            </div>
          </div>

          <div className="bg-gray-800 p-4 rounded-xl shadow-md flex flex-col items-start justify-center gap-2">
            <div className="flex items-center gap-2">
              <FaCalendarAlt className="text-blue-400" />
              <span className="font-semibold text-white">Release Date:</span>
              <p className="text-gray-300">{game.releaseDate}</p>
            </div>
          </div>

          <div className="bg-gray-800 p-4 rounded-xl shadow-md flex flex-col items-start justify-center gap-2">
            <div className="flex items-center gap-2">
              <FaGamepad className="text-green-400" />
              <span className="font-semibold text-white">Developer:</span>
            </div>
            <p className="pl-6 text-gray-300">{game.developer}</p>
          </div>

          <div className="bg-gray-800 p-4 rounded-xl shadow-md flex flex-col items-start justify-center gap-2">
            <div className="flex items-center gap-2">
              <FaDesktop className="text-pink-400" />
              <span className="font-semibold text-white">Platforms:</span>
            </div>
            <p className="pl-6 text-gray-300">{game.platforms.join(", ")}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
