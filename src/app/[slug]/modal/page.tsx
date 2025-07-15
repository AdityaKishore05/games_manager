"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { games } from "@/app/data/games";

export default function ModalPage({ params }: { params: { slug: string } }) {
  const router = useRouter();
  const game = games.find((g) => g.slug === params.slug);

  useEffect(() => {
    // Handle ESC key press
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        router.back();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [router]);

  const handleBackgroundClick = (e: React.MouseEvent) => {
    // Only close if clicking the background, not the image
    if (e.target === e.currentTarget) {
      router.back();
    }
  };

  if (!game) {
    return (
      <div className="fixed inset-0 bg-black flex items-center justify-center z-50">
        <div className="text-white text-xl">Game not found</div>
      </div>
    );
  }

  return (
    <div
      className="fixed inset-0 bg-black flex items-center justify-center z-50 p-4 cursor-pointer"
      onClick={handleBackgroundClick}
    >
      {/* Close button */}
      <button
        onClick={() => router.back()}
        className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors z-10 text-4xl"
        aria-label="Close modal"
      >
        ×
      </button>

      {/* Modal content */}
      <div className="relative max-w-[95vw] max-h-[95vh] cursor-default">
        <img
          src={game.image}
          alt={`${game.title} full image`}
          className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        />

        {/* Image title overlay */}
        <div className="absolute bottom-0 left-0 right-0 bg-black/80 text-white p-4 rounded-b-lg">
          <h2 className="text-xl font-bold">{game.title}</h2>
          <p className="text-sm text-gray-300">
            Click outside or press ESC to close
          </p>
        </div>
      </div>
    </div>
  );
}
