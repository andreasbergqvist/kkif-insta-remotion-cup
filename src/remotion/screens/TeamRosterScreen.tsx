import React from 'react';
import { AbsoluteFill, useCurrentFrame, spring } from 'remotion';
import { PlayerName } from '../components/PlayerName';
import { BackgroundTexture } from '../components/BackgroundTexture';
import { BackgroundText } from '../components/BackgroundText';

interface TeamRosterScreenProps {
  teamName: string;
  players: string[];
  teamColor: string;
}

export const TeamRosterScreen: React.FC<TeamRosterScreenProps> = ({
  teamName,
  players,
  teamColor,
}) => {
  const frame = useCurrentFrame();

  const TITLE_START = 5;
  const PLAYER_START = 25;
  const PLAYER_STAGGER = 6;

  const titleOpacity = spring({
    frame: frame - TITLE_START,
    from: 0,
    to: 1,
    fps: 30,
    durationInFrames: 20,
  });

  const titleScale = spring({
    frame: frame - TITLE_START,
    from: 0.8,
    to: 1,
    fps: 30,
    durationInFrames: 20,
  });
  const textColor = 'text-white';
  const bgOpacity = '1';

  // Enhanced animations - simplified
  const gradientRotation = frame / 6;

  return (
    <AbsoluteFill className="overflow-hidden">
      <BackgroundTexture />

      {/* Enhanced dynamic background with team color */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(${135 + gradientRotation}deg, 
            ${teamColor}ee 0%, 
            rgba(0,0,0,0.9) 40%, 
            rgba(0,0,0,0.9) 60%, 
            ${teamColor}ee 100%)`,
          opacity: bgOpacity,
        }}
      />

      <BackgroundText />

      <div className="relative z-10 flex flex-col items-center p-16 h-full justify-center">
        {/* Enhanced team name header */}
        <div
          className={`relative ${textColor} font-teko font-bold text-8xl mb-2 tracking-wider`}
          style={{
            opacity: titleOpacity,
            transform: `scale(${titleScale})`,
            textShadow: `2px 2px 0 rgba(0,0,0,0.5), 0 0 15px ${teamColor}80`
          }}
        >
          {teamName}
        </div>

        {/* Enhanced player list */}
        <div className="relative flex flex-col items-center justify-center w-full mt-8 space-y-4">
          {players.map((player, index) => (
            <PlayerName
              key={index}
              name={player}
              startFrame={PLAYER_START + index * PLAYER_STAGGER}
              index={index}
            />
          ))}
        </div>
      </div>
    </AbsoluteFill>
  );
};
