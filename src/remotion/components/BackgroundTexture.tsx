import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';

export const BackgroundTexture: React.FC = () => {
  const frame = useCurrentFrame();

  // Enhanced movement of the background
  const yOffset = Math.sin(frame / 100) * 8 + Math.cos(frame / 150) * 5;
  const xOffset = Math.cos(frame / 120) * 8 + Math.sin(frame / 180) * 3;
  const rotation = Math.sin(frame / 200) * 3;
  const scale = 1 + Math.sin(frame / 250) * 0.05;

  return (
    <AbsoluteFill className="overflow-hidden">
      {/* Enhanced dark gradient background */}
      <AbsoluteFill
        className="bg-gradient-to-br from-neutral-950 via-neutral-900 to-black"
        style={{
          transform: `scale(${scale})`,
        }}
      />

      {/* Enhanced animated metallic texture */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `
            repeating-linear-gradient(
              ${45 + rotation}deg,
              #000 0px,
              #000 1px,
              transparent 1px,
              transparent 4px
            ),
            repeating-linear-gradient(
              ${-45 + rotation * 0.5}deg,
              #1a1a1a 0px,
              #1a1a1a 1px,
              transparent 1px,
              transparent 6px
            )
          `,
          backgroundSize: '8px 8px, 12px 12px',
          transform: `translate(${xOffset}px, ${yOffset}px)`,
        }}
      />

      {/* Enhanced soccer/football field lines */}
      <div
        className="absolute w-[200%] h-[200%] opacity-8"
        style={{
          backgroundImage: `
            linear-gradient(to right, 
              transparent, 
              transparent 49px, 
              rgba(255,255,255,0.4) 49px, 
              rgba(255,255,255,0.4) 51px, 
              transparent 51px
            ),
            linear-gradient(to bottom, 
              transparent, 
              transparent 49px, 
              rgba(255,255,255,0.4) 49px, 
              rgba(255,255,255,0.4) 51px, 
              transparent 51px
            )
          `,
          backgroundSize: '100px 100px',
          transform: `translate(${xOffset * 1.2}px, ${yOffset * 1.2}px) rotate(${15 + rotation}deg)`,
        }}
      />

      {/* Enhanced animated center circle */}
      <div
        className="absolute rounded-full border-[6px] border-white/8"
        style={{
          width: '600px',
          height: '600px',
          top: '50%',
          left: '50%',
          transform: `
            translate(-50%, -50%) 
            scale(${1 + Math.sin(frame / 150) * 0.08}) 
            rotate(${rotation * 2}deg)
          `,
          boxShadow: '0 0 100px rgba(255,255,255,0.15) inset, 0 0 50px rgba(251, 191, 36, 0.1)',
        }}
      />

      {/* Additional floating orbs */}
      <div
        className="absolute w-32 h-32 rounded-full opacity-5"
        style={{
          background: 'radial-gradient(circle, rgba(251, 191, 36, 0.5) 0%, transparent 70%)',
          top: '20%',
          left: '10%',
          transform: `translate(${Math.sin(frame / 100) * 50}px, ${Math.cos(frame / 120) * 30}px)`,
        }}
      />
      <div
        className="absolute w-24 h-24 rounded-full opacity-5"
        style={{
          background: 'radial-gradient(circle, rgba(30, 58, 138, 0.5) 0%, transparent 70%)',
          top: '70%',
          right: '15%',
          transform: `translate(${Math.cos(frame / 140) * 40}px, ${Math.sin(frame / 90) * 25}px)`,
        }}
      />
    </AbsoluteFill>
  );
};