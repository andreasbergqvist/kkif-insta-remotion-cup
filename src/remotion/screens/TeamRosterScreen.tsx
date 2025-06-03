import React from 'react';
import { AbsoluteFill, useCurrentFrame, spring, interpolate } from 'remotion';
import { PlayerName } from '../components/PlayerName';

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

  return (
    <AbsoluteFill className="flex flex-col items-center p-16">
      {/* Dynamic background with team color */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(135deg, ${teamColor}, ${teamColor}dd)`,
          opacity: bgOpacity,
        }}
      />

      {/* Metallic texture overlay */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `
            repeating-linear-gradient(
              -45deg,
              #000 0px,
              #000 1px,
              transparent 1px,
              transparent 4px
            )
          `,
          backgroundSize: '8px 8px',
        }}
      />

      {/* Team name header */}
      <div
        className={`relative ${textColor} font-teko font-bold text-8xl mb-2 tracking-wider`}
        style={{
          opacity: titleOpacity,
          transform: `scale(${titleScale})`,
          textShadow: '2px 2px 0 rgba(0,0,0,0.5)',
        }}
      >
        {teamName}
      </div>

      {/* Player list */}
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
    </AbsoluteFill>
  );
};
