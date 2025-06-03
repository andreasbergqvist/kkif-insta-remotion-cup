import React from 'react';
import { useCurrentFrame, spring, interpolate } from 'remotion';

interface PlayerNameProps {
  name: string;
  startFrame: number;
  index: number;
}

export const PlayerName: React.FC<PlayerNameProps> = ({
  name,
  startFrame,
  index,
}) => {
  const frame = useCurrentFrame();

  const fromDirection = index % 2 === 0 ? -1 : 1;

  const progress = spring({
    frame: frame - startFrame,
    from: 0,
    to: 1,
    fps: 30,
    durationInFrames: 20,
  });

  const translateX = interpolate(progress, [0, 1], [fromDirection * 200, 0]);

  const textColor = 'text-white';

  const bgGradient =
    'linear-gradient(135deg, rgba(0,0,0,0.3), rgba(0,0,0,0.1))';

  return (
    <div
      className={`${textColor} font-teko font-semibold text-6xl w-full py-2 px-6 rounded-md text-center relative overflow-hidden backdrop-blur-sm border border-white/10`}
      style={{
        transform: `translateX(${translateX}px)`,
        opacity: progress,
        background: bgGradient,
        boxShadow: '0 4px 30px rgba(0, 0, 0, 0.2)',
        textShadow: '1px 1px 0 rgba(0,0,0,0.5)',
      }}
    >
      {/* Shine effect */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)',
          transform: `translateX(${((frame % 60) - 30) * 20}px)`,
          transition: 'transform 0.3s ease',
        }}
      />

      {name}
    </div>
  );
};
