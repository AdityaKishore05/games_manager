"use client";

import { useRouter } from "next/navigation";
import { games } from "@/app/data/games";
import { Cover } from "./ui/cover";
import { motion } from "framer-motion";
import { CardContainer, CardBody, CardItem } from "./ui/3d-card";


export default function GamesPage() {
  const router = useRouter();

  return (
    <div className="relative bg-gradient-to-br from-blue-900 via-blue-950 to-gray-900 z-10 min-h-screen lg:p-10 p-5">
      <h1
        className={`text-2xl lg:text-4xl font-bold text-white text-center font-serif lg:mb-10 mb-8`}
      >
        <Cover>Explore Games</Cover>
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {games.map((game, index) => (
          <motion.div
            key={game.id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <CardContainer containerClassName="w-full">
              <CardBody
                className="h-[280px] lg:h-[330px] w-full cursor-pointer bg-gray-900/50 rounded-2xl transition-all duration-300"
                onClick={() => router.push(`/${game.slug}`)}
              >
                {/* Image */}
                <div className="relative h-[60%] overflow-hidden rounded-t-2xl">
                  <CardItem translateZ={20}>
                    <img
                      src={game.image}
                      alt={game.title}
                      className="object-cover w-full h-full"
                    />
                  </CardItem>

                  <CardItem
                    translateZ={30}
                    className="absolute top-2 right-2 bg-black/60 text-yellow-400 px-2 py-1 text-xs font-semibold rounded"
                  >
                    ⭐ {game.rating}/10
                  </CardItem>
                </div>

                {/* Title & Description */}
                <div className=" h-[35%] flex flex-col justify-center">
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
    </div>
  );
}
