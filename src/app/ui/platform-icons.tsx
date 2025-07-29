"use client";

import { Monitor, Gamepad2 } from "lucide-react";
import { 
  SiPlaystation, 
  SiXbox, 
  SiNintendoswitch,
  SiSteam
} from "react-icons/si";

interface PlatformIconsProps {
  platforms: string[];
  className?: string;
  size?: "sm" | "md" | "lg";
}

const sizeClasses = {
  sm: "w-3 h-3",
  md: "w-4 h-4", 
  lg: "w-5 h-5"
};

export function PlatformIcons({ platforms, className = "", size = "sm" }: PlatformIconsProps) {
  const iconSize = sizeClasses[size];
  
  const getPlatformIcon = (platform: string) => {
    const platformLower = platform.toLowerCase();
    
    if (platformLower.includes("playstation")) {
      return <SiPlaystation className={`${iconSize} text-blue-500`} title={platform} />;
    }
    if (platformLower.includes("xbox")) {
      return <SiXbox className={`${iconSize} text-green-500`} title={platform} />;
    }
    if (platformLower.includes("nintendo") || platformLower.includes("switch")) {
      return <SiNintendoswitch className={`${iconSize} text-red-500`} title={platform} />;
    }
    if (platformLower.includes("pc") || platformLower.includes("steam")) {
      return <SiSteam className={`${iconSize} text-blue-400`} title={platform} />;
    }
    
    // Fallback icons
    if (platformLower.includes("pc")) {
      return <Monitor className={`${iconSize} text-gray-400`} title={platform} />;
    }
    
    return <Gamepad2 className={`${iconSize} text-gray-400`} title={platform} />;
  };

  // Limit to 4 platforms and deduplicate
  const uniquePlatforms = Array.from(new Set(platforms)).slice(0, 4);

  return (
    <div className={`flex items-center gap-1 ${className}`}>
      {uniquePlatforms.map((platform, index) => (
        <div key={`${platform}-${index}`} className="flex-shrink-0">
          {getPlatformIcon(platform)}
        </div>
      ))}
      {platforms.length > 4 && (
        <span className={`text-xs text-gray-400 ml-1`}>
          +{platforms.length - 4}
        </span>
      )}
    </div>
  );
}
