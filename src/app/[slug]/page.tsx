"use client";
import { games } from "@/app/data/games";
import { Game } from "@/app/data/games";
import { FaGamepad, FaCalendarAlt, FaDesktop, FaStar } from "react-icons/fa";
import { Suspense, useState, useEffect } from "react";
import Link from "next/link";
import { CardContainer, CardBody, CardItem } from "../ui/3d-card";


type Params = Promise<{ slug: string }>;

// Image Modal Component
interface ImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  image: string;
  title: string;
}

function ImageModal({ isOpen, onClose, image, title }: ImageModalProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
      {/* Modal backdrop - clicking here will close the modal */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Modal content */}
      <div className="relative max-w-7xl max-h-[90vh] w-full">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-40 z-10 bg-black/50 hover:bg-black/70 text-white rounded-full transition-colors text-2xl cursor-pointer w-12 h-10 pb-1 flex items-center justify-center"
          aria-label="Close modal"
        >
          ×
        </button>

        {/* Image - prevent event bubbling so clicking image doesn't close modal */}
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={onClose}
        >
          <img
            src={image}
            alt={title}
            className="max-w-full max-h-[85vh] object-contain rounded-lg" // Changed from w-full h-full
            onClick={(e) => e.stopPropagation()}
          />
        </div>

        {/* Title */}
        <div className="absolute bottom-4 left-4 right-4 bg-black/70 text-white p-4 rounded-lg">
          <h2 className="text-xl font-bold">{title}</h2>
        </div>
      </div>
    </div>
  );
}

// Loading component
function GameDetailSkeleton() {
  return (
    <div className="w-full min-h-screen bg-gray-950 p-6 text-gray-300">
      <div className="w-full h-[50vh] sm:h-[70vh] lg:h-[80vh] overflow-hidden rounded-xl shadow-2xl bg-gray-800 animate-pulse">
        <div className="h-full w-full bg-gray-700"></div>
      </div>
      <div className="space-y-6 max-w-7xl mx-auto pt-5">
        {[...Array(7)].map((_, i) => (
          <div key={i} className="h-6 bg-gray-800 rounded animate-pulse"></div>
        ))}
      </div>
    </div>
  );
}

// Info card component
function InfoCard({
  icon,
  iconColor,
  label,
  value,
  isMultiline = false,
}: {
  icon: React.ReactNode;
  iconColor: string;
  label: string;
  value: string | number;
  isMultiline?: boolean;
}) {
  return (
    <div className="bg-blue-950 w-80 h-25 p-5 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col justify-center">
      <div className="flex items-center gap-2">
        <span className={iconColor}>{icon}</span>
        <span className="font-semibold text-white">{label}:</span>
        {!isMultiline && <span className="text-gray-300">{value}</span>}
      </div>
      {isMultiline && <p className="pl-6 text-gray-300 mt-2">{value}</p>}
    </div>
  );
}

// Game info section component
function GameInfoSection({ game }: { game: Game }) {
  const infoItems = [
    { label: "Description", value: game.description },
    { label: "Story", value: game.story },
    { label: "Setting", value: game.setting },
    { label: "Combat Style", value: game.combatStyle },
    { label: "World Design", value: game.worldDesign },
    { label: "Difficulty", value: game.difficulty },
    { label: "Progression Style", value: game.progressionSystem },
  ];

  return (
    <div className="space-y-6">
      {infoItems.map(({ label, value }) => (
        <div key={label} className="leading-relaxed lg:text-lg text-md">
          <h3 className="text-lg lg:text-xl font-semibold underline text-white mb-2">
            {label}:
          </h3>
          <p className="text-gray-300 pl-4">{value}</p>
        </div>
      ))}
    </div>
  );
}

// Game Not Found Component
function GameNotFound() {
  return (
    <div className="w-full min-h-screen bg-blue-950 p-6 text-gray-300">
      <div className="flex flex-col items-center justify-center min-h-[50vh]">
        <h1 className="text-2xl font-bold text-white mb-4">Game Not Found</h1>
        <p className="text-gray-400 mb-6">
          The game you&apos;re looking for doesn&apos;t exist.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors duration-200"
        >
          ← Back to Games
        </Link>
      </div>
    </div>
  );
}

// Main component
export default function GameDetailPage({ params }: { params: Params }) {
  const [game, setGame] = useState<Game | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLaptopScreen, setIsLaptopScreen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsLaptopScreen(window.innerWidth >= 1024);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  useEffect(() => {
    const initializeParams = async () => {
      try {
        const resolvedParams = await params;
        const foundGame = games.find((g) => g.slug === resolvedParams.slug);
        setGame(foundGame || null);
      } catch (error) {
        console.error("Error resolving params:", error);
        setGame(null);
      } finally {
        setLoading(false);
      }
    };

    initializeParams();
  }, [params]);

  if (loading) {
    return <GameDetailSkeleton />;
  }

  if (!game) {
    return <GameNotFound />;
  }

  return (
    <Suspense fallback={<GameDetailSkeleton />}>
      <div className="w-full min-h-screen bg-blue-900 p-6 text-gray-300">
        {/* Hero Section */}
        <div className="relative w-full h-[50vh] sm:h-[70vh] lg:h-[80vh] overflow-hidden rounded-xl shadow-2xl group">
          <div
            onClick={() => isLaptopScreen && setIsModalOpen(true)}
            aria-label={`View ${game.title} full image`}
            className={`block w-full h-full ${
              isLaptopScreen ? "cursor-pointer" : "cursor-default"
            } focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded-xl`}
          >
            <img
              src={game.image}
              alt={`${game.title} game screenshot`}
              className={`w-full h-full object-cover transition-transform duration-300 ${
                isLaptopScreen ? "group-hover:scale-105" : ""
              }`}
            />
            <div
              className={`absolute inset-0 bg:black/0 lg:bg-black/10 transition-opacity duration-300 ${
                isLaptopScreen ? "group-hover:bg-black/10" : ""
              }`}
            />
          </div>

          {/* Title Overlay */}
          <div className="absolute inset-0 flex flex-col justify-center items-center text-center p-6 pointer-events-none">
            <h1
              className={`text-3xl sm:text-4xl lg:text-5xl font-bold text-white drop-shadow-2xl font-serif`}
            >
              {game.title}
            </h1>
          </div>
        </div>

        {/* Content Section */}
        <div className="max-w-7xl mx-auto pt-8">
          <GameInfoSection game={game} />

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 lg:gap-15 gap-5 pt-8">
            <CardContainer>
              <CardBody>
                <CardItem translateZ={40}>
                  <InfoCard
                    icon={<FaStar />}
                    iconColor="text-yellow-400"
                    label="Rating"
                    value={`${game.rating}/10`}
                  />
                </CardItem>
              </CardBody>
            </CardContainer>
            <CardContainer>
              <CardBody>
                <CardItem translateZ={40}>
                  <InfoCard
                    icon={<FaCalendarAlt />}
                    iconColor="text-blue-400"
                    label="Release Date"
                    value={game.releaseDate}
                  />
                </CardItem>
              </CardBody>
            </CardContainer>
            <CardContainer>
              <CardBody>
                <CardItem translateZ={40}>
                  <InfoCard
                    icon={<FaGamepad />}
                    iconColor="text-green-400"
                    label="Developer"
                    value={game.developer}
                    isMultiline
                  />
                </CardItem>
              </CardBody>
            </CardContainer>
            <CardContainer>
              <CardBody>
                <CardItem translateZ={40}>
                  <InfoCard
                    icon={<FaDesktop />}
                    iconColor="text-pink-400"
                    label="Platforms"
                    value={
                      Array.isArray(game.platforms)
                        ? game.platforms.join(", ")
                        : game.platforms
                    }
                    isMultiline
                  />
                </CardItem>
              </CardBody>
            </CardContainer>
          </div>

          {/* Back Navigation */}
          <div className="pt-8 pb-4">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors duration-200"
            >
              ← Back to Games
            </Link>
          </div>
        </div>

        {/* Image Modal - Only render on laptop screens */}
        {isLaptopScreen && (
          <ImageModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            image={game.image}
            title={game.title}
          />
        )}
      </div>
    </Suspense>
  );
}
