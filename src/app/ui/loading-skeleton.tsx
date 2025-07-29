"use client";

import { motion } from "framer-motion";

export function GameCardSkeleton() {
  return (
    <div className="h-[280px] lg:h-[330px] w-full bg-gray-900/50 rounded-2xl overflow-hidden">
      {/* Image skeleton */}
      <div className="relative h-[60%] bg-gray-800/50">
        <motion.div
          animate={{
            backgroundPosition: ["0% 0%", "100% 0%", "0% 0%"]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "linear"
          }}
          className="w-full h-full bg-gradient-to-r from-gray-800/50 via-gray-700/50 to-gray-800/50"
          style={{
            backgroundSize: "200% 100%"
          }}
        />
        
        {/* Rating skeleton */}
        <div className="absolute top-2 right-2 bg-gray-700/50 px-2 py-1 rounded">
          <motion.div
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-12 h-4 bg-gray-600/50 rounded"
          />
        </div>
      </div>

      {/* Content skeleton */}
      <div className="h-[35%] flex flex-col justify-center p-4 space-y-2">
        {/* Title skeleton */}
        <motion.div
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
          className="h-6 bg-gray-700/50 rounded mx-auto"
          style={{ width: "70%" }}
        />
        
        {/* Description skeleton */}
        <div className="space-y-1">
          <motion.div
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: 0.4 }}
            className="h-3 bg-gray-700/50 rounded mx-auto"
            style={{ width: "90%" }}
          />
          <motion.div
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: 0.6 }}
            className="h-3 bg-gray-700/50 rounded mx-auto"
            style={{ width: "60%" }}
          />
        </div>
      </div>
    </div>
  );
}

export function LoadingGrid({ count = 6 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {Array.from({ length: count }).map((_, index) => (
        <GameCardSkeleton key={index} />
      ))}
    </div>
  );
}
