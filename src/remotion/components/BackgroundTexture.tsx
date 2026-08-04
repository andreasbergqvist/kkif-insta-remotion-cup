import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';

export type SurfaceTheme = "sand" | "grass";

interface BackgroundTextureProps {
  showCenterCircle?: boolean;
  surface?: SurfaceTheme;
}

export const BackgroundTexture: React.FC<BackgroundTextureProps> = ({
  showCenterCircle = true,
  surface = "grass",
}) => {
  const frame = useCurrentFrame();
  const surfaceColors =
    surface === "sand"
      ? {
          base: "#b8874b",
          light: "rgba(235, 190, 118, 0.75)",
          dark: "rgba(105, 65, 35, 0.9)",
          line: "rgba(255, 238, 194, 0.5)",
        }
      : {
          base: "#1f7b48",
          light: "rgba(101, 197, 108, 0.72)",
          dark: "rgba(3, 32, 27, 0.92)",
          line: "rgba(203, 255, 206, 0.35)",
        };

  // Enhanced movement of the background
  const yOffset = Math.sin(frame / 100) * 8 + Math.cos(frame / 150) * 5;
  const xOffset = Math.cos(frame / 120) * 8 + Math.sin(frame / 180) * 3;
  const rotation = Math.sin(frame / 200) * 3;
  const scale = 1 + Math.sin(frame / 250) * 0.05;

  return (
    <AbsoluteFill className="overflow-hidden">
      {/* Brighter stadium-like base */}
      <AbsoluteFill
        className="bg-gradient-to-br from-slate-900 via-slate-800 to-neutral-950"
        style={{
          transform: `scale(${scale})`,
          background: `radial-gradient(ellipse at ${50 + Math.sin(frame / 70) * 18}% 38%, ${surfaceColors.light}, transparent 44%), linear-gradient(${115 + frame / 12}deg, ${surfaceColors.dark}, ${surfaceColors.base} 48%, #07151a 100%)`,
        }}
      />

      {/* Enhanced animated metallic texture */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `
            repeating-linear-gradient(
              ${45 + rotation}deg,
              #8ca8bd 0px,
              #8ca8bd 1px,
              transparent 1px,
              transparent 4px
            ),
            repeating-linear-gradient(
              ${-45 + rotation * 0.5}deg,
              #40586a 0px,
              #40586a 1px,
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
        className="absolute w-[200%] h-[200%] opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(to right, 
              transparent, 
              transparent 49px, 
              ${surfaceColors.line} 49px, 
              ${surfaceColors.line} 51px, 
              transparent 51px
            ),
            linear-gradient(to bottom, 
              transparent, 
              transparent 49px, 
              ${surfaceColors.line} 49px, 
              ${surfaceColors.line} 51px, 
              transparent 51px
            )
          `,
          backgroundSize: '100px 100px',
          transform: `translate(${xOffset * 1.2}px, ${yOffset * 1.2}px) rotate(${15 + rotation}deg)`,
        }}
      />

      {/* Enhanced animated center circle */}
      {showCenterCircle && (
        <div
          className="absolute rounded-full border-[6px] border-cyan-100/20"
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
            boxShadow: '0 0 100px rgba(180,230,255,0.2) inset, 0 0 70px rgba(251, 191, 36, 0.18)',
          }}
        />
      )}

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