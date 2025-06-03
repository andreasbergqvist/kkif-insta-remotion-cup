import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';

export const BackgroundTexture: React.FC = () => {
  const frame = useCurrentFrame();
  
  // Enhanced movement of the background
  const yOffset = Math.sin(frame / 100) * 5;
  const xOffset = Math.cos(frame / 120) * 5;
  const rotation = Math.sin(frame / 200) * 2;
  
  return (
    <AbsoluteFill className="overflow-hidden">
      {/* Dark gradient background */}
      <AbsoluteFill className="bg-gradient-to-br from-neutral-950 via-neutral-900 to-black" />
      
      {/* Animated metallic texture */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `
            repeating-linear-gradient(
              ${45 + rotation}deg,
              #000 0px,
              #000 1px,
              transparent 1px,
              transparent 4px
            )
          `,
          backgroundSize: '8px 8px',
          transform: `translate(${xOffset}px, ${yOffset}px)`,
        }}
      />
      
      {/* Soccer/football field lines with enhanced styling */}
      <div 
        className="absolute w-[200%] h-[200%] opacity-5"
        style={{ 
          backgroundImage: `
            linear-gradient(to right, 
              transparent, 
              transparent 49px, 
              rgba(255,255,255,0.3) 49px, 
              rgba(255,255,255,0.3) 51px, 
              transparent 51px
            ),
            linear-gradient(to bottom, 
              transparent, 
              transparent 49px, 
              rgba(255,255,255,0.3) 49px, 
              rgba(255,255,255,0.3) 51px, 
              transparent 51px
            )
          `,
          backgroundSize: '100px 100px',
          transform: `translate(${xOffset}px, ${yOffset}px) rotate(${15 + rotation}deg)`,
        }}
      />
      
      {/* Animated center circle */}
      <div 
        className="absolute rounded-full border-[6px] border-white/5"
        style={{ 
          width: '600px',
          height: '600px',
          top: '50%',
          left: '50%',
          transform: `
            translate(-50%, -50%) 
            scale(${1 + Math.sin(frame / 150) * 0.05}) 
            rotate(${rotation}deg)
          `,
          boxShadow: '0 0 100px rgba(255,255,255,0.1) inset',
        }}
      />
    </AbsoluteFill>
  );
};