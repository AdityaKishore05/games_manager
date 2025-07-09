"use client";

import Link from "next/link";
import { games } from "@/app/data/games";
import { Cover } from "./ui/cover";
import { CardContainer, CardBody, CardItem } from "./ui/3d-card";
import { motion } from "framer-motion";




export default function GamesPage() {
  return (
      <div className="relative bg-gray-950 z-10 min-h-screen p-10">
        <h1 className="text-4xl font-bold text-white text-center">
        <Cover>Explore Games</Cover>
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-1">
          {games.map((game, index) => (
  <motion.div
    key={game.id}
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.3 }}
    transition={{ duration: 0.6, delay: index * 0.1 }}
  >
    <CardContainer containerClassName="w-full">
      <CardBody>
        <Link
          href={`/${game.slug}`}
          className="block bg-gray-900 rounded-2xl overflow-hidden shadow-lg hover:brightness-110"
        >
          <div className="relative">
            <CardItem translateZ={20}>
              <img
                src={game.image}
                alt={game.title}
                className="object-cover w-full h-56"
              />
            </CardItem>
            <CardItem
              translateZ={30}
              className="absolute top-2 right-2 bg-black/60 text-yellow-400 px-2 py-1 text-xs font-semibold rounded"
            >
              ⭐ {game.rating}/10
            </CardItem>
          </div>
          <div className="p-5">
            <CardItem translateZ={40}>
              <h2 className="text-xl font-bold text-white group-hover:text-yellow-300 transition">
                {game.title}
              </h2>
              <p className="text-sm text-gray-400 mt-2 line-clamp-3">
                {game.description}
              </p>
            </CardItem>
          </div>
        </Link>
      </CardBody>
    </CardContainer>
  </motion.div>
))}
        </div>
      </div>
  );
}
