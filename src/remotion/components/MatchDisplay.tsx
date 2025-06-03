import React from "react";
import { useCurrentFrame, spring, interpolate } from "remotion";
import { TeamColorsType } from "../theme/colors";

interface MatchDisplayProps {
  homeTeam: string;
  awayTeam: string;
  time: string;
  startFrame: number;
  teamColors: TeamColorsType;
}

export const MatchDisplay: React.FC<MatchDisplayProps> = ({
  homeTeam,
  awayTeam,
  time,
  startFrame,
  teamColors,
}) => {
  const frame = useCurrentFrame();

  // Animation values
  const appear = spring({
    frame: frame - startFrame,
    from: 0,
    to: 1,
    fps: 30,
    durationInFrames: 25,
  });

  // Slide in from right
  const translateX = interpolate(appear, [0, 1], [100, 0]);

  // Background colors based on team names
  const bgColor =
    homeTeam.includes("Gul") || awayTeam.includes("Gul")
      ? teamColors.yellow
      : teamColors.blue;

  // Text color based on background
  const textColor =
    homeTeam.includes("Gul") || awayTeam.includes("Gul")
      ? "text-gray-900"
      : "text-white";

  return (
    <div
      className="flex flex-row items-center justify-between w-4/5 rounded-xl overflow-hidden shadow-2xl border border-white/10"
      style={{
        opacity: appear,
        transform: `translateX(${translateX}px)`,
        background: `linear-gradient(135deg, ${bgColor}, ${bgColor}dd)`,
        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
      }}
    >
      {/* Teams */}
      <div className={`${textColor} font-bold text-5xl px-8 py-6 flex-grow`}>
        {homeTeam} vs {awayTeam}
      </div>

      {/* Time */}
      <div className="bg-black/90 text-white font-mono text-5xl px-10 py-6 border-l border-white/10">
        {time}
      </div>
    </div>
  );
};
