import { FunctionComponent } from "react";
import {
  AbsoluteFill,
  Img,
  useCurrentFrame,
  spring,
  interpolate,
} from "remotion";
import { AnimatedFootballs } from "../components/AnimatedFootballs";
import { BackgroundTexture } from "../components/BackgroundTexture";
import { EnhancedParticleEffects } from "../components/EnhancedParticleEffects";
import { SurfaceTheme } from "../components/BackgroundTexture";

export interface IntroScreenProps {
  eventName: string;
  date: string;
  logoUrl?: string;
  field?: string;
  surface?: SurfaceTheme;
}

export const IntroScreen: FunctionComponent<IntroScreenProps> = ({
  eventName,
  date,
  logoUrl,
  field,
  surface,
}) => {
  const frame = useCurrentFrame();
  const logoScale = spring({
    frame,
    from: 0.7,
    to: 1,
    fps: 30,
    durationInFrames: 30,
  });
  const logoOpacity = spring({
    frame,
    from: 0,
    to: 1,
    fps: 30,
    durationInFrames: 20,
  });
  const logoRotation = Math.sin(frame / 60) * 2; // Subtle rotation
  const preTextOpacity = spring({
    frame: frame - 8,
    from: 0,
    to: 1,
    fps: 30,
    durationInFrames: 15,
  });
  const preTextY = interpolate(preTextOpacity, [0, 1], [30, 0]);
  const mainTextOpacity = spring({
    frame: frame - 14,
    from: 0,
    to: 1,
    fps: 30,
    durationInFrames: 18,
  });
  const mainTextScale =
    1 +
    0.15 * Math.sin(Math.min(Math.max((frame - 14) / 18, 0), 1) * Math.PI) +
    Math.sin(frame / 120) * 0.05;
  const mainTextY = interpolate(mainTextOpacity, [0, 1], [40, 0]);
  const dateOpacity = spring({
    frame: frame - 24,
    from: 0,
    to: 1,
    fps: 30,
    durationInFrames: 15,
  });
  const dateY = interpolate(dateOpacity, [0, 1], [30, 0]);
  const fieldOpacity = spring({
    frame: frame - 32,
    from: 0,
    to: 1,
    fps: 30,
    durationInFrames: 15,
  });
  const fieldY = interpolate(fieldOpacity, [0, 1], [30, 0]);

  // Enhanced gradient animation
  const gradientOffset = frame / 3;
  const pitchColors =
    surface === "sand"
      ? {
          glow: "rgba(235, 190, 118, 0.68)",
          mid: "rgba(183, 135, 75, 0.72)",
          deep: "rgba(74, 45, 28, 0.92)",
          line: "rgba(255, 238, 194, 0.28)",
        }
      : {
          glow: "rgba(101, 197, 108, 0.72)",
          mid: "rgba(31, 123, 72, 0.72)",
          deep: "rgba(3, 32, 27, 0.96)",
          line: "rgba(203, 255, 206, 0.24)",
        };

  return (
    <AbsoluteFill className="overflow-hidden">
      <BackgroundTexture surface={surface} />

      {/* Abstract floodlit pitch */}
      <div
        className="absolute pointer-events-none"
        style={{
          zIndex: 1,
          inset: 0,
          opacity: 0.88,
          background: `radial-gradient(ellipse at ${50 + Math.sin(frame / 70) * 18}% ${38 + Math.cos(frame / 80) * 12}%, ${pitchColors.glow}, transparent 42%), linear-gradient(${110 + frame / 12}deg, ${pitchColors.deep}, ${pitchColors.mid} 46%, rgba(3, 20, 24, 0.96))`,
          boxShadow: "inset 0 0 170px rgba(1, 20, 16, 0.72), 0 0 80px rgba(71, 178, 95, 0.18)",
        }}
      >
        <div
          className="absolute left-[-10%] right-[-10%] top-1/2 border-t-2 border-white/25"
          style={{ transform: `translateY(${Math.sin(frame / 50) * 3}px)` }}
        />
        <div
          className="absolute inset-0 opacity-12"
          style={{
            backgroundImage: `repeating-linear-gradient(90deg, transparent 0, transparent 118px, ${pitchColors.line} 120px, transparent 122px)`,
          }}
        />
      </div>

      {/* Animated gradient overlay */}
      <div
        className="absolute inset-0 opacity-60"
        style={{
          background: `linear-gradient(${45 + gradientOffset}deg, 
                        rgba(21, 87, 75, 0.48) 0%, 
                        rgba(2, 18, 25, 0.72) 35%, 
                        rgba(3, 16, 20, 0.78) 70%, 
                        rgba(117, 91, 22, 0.46) 100%)`,
        }}
      />

      {/* Soccer balls positioned discretely in background */}
      <div className="absolute inset-0" style={{ zIndex: 2 }}>
        <AnimatedFootballs count={8} size={64} centered />
      </div>

      <EnhancedParticleEffects
        count={34}
        opacity={0.42}
        colors={["#d9ffdf", "#fbbf24", "#60a5fa", "#ffffff"]}
      />

      <div className="relative z-20 flex flex-col items-center justify-center h-full">
        <div className="absolute top-0 left-0 w-full h-4 bg-gradient-to-r from-blue-700 via-yellow-400 to-blue-700 opacity-80" />
        <div className="mb-12 mt-8">
          <Img
            src={
              logoUrl ||
              "https://www.karrakif.se/im/hemsidaLogga/2056/60268/_genLogga.png"
            }
            alt="Logo"
            className="object-contain h-48 w-96 drop-shadow-xl"
            style={{
              opacity: logoOpacity,
              transform: `scale(${logoScale}) rotate(${logoRotation}deg)`,
              filter: `drop-shadow(0 0 20px rgba(251, 191, 36, ${logoOpacity * 0.5}))`,
            }}
          />
        </div>
        <div
          className="mb-6 text-white font-teko font-bold text-5xl tracking-wider text-center drop-shadow-lg"
          style={{
            opacity: preTextOpacity,
            transform: `translateY(${preTextY}px)`,
            textShadow: "0 2px 8px rgba(0,0,0,0.8)",
          }}
        >
          Dags för
        </div>
        <div
          className="mb-12 text-white font-teko font-extrabold text-9xl tracking-wider text-center drop-shadow-lg"
          style={{
            opacity: mainTextOpacity,
            transform: `translateY(${mainTextY}px) scale(${mainTextScale})`,
            textShadow:
              "0 0 15px rgba(251, 191, 36, 0.4), 0 4px 12px rgba(0,0,0,0.9)",
          }}
        >
          {eventName}
        </div>
        <div
          className="text-white font-teko text-6xl mt-4 mb-4 tracking-wider text-center drop-shadow-lg"
          style={{
            opacity: dateOpacity,
            transform: `translateY(${dateY}px)`,
            textShadow: "0 2px 8px rgba(0,0,0,0.7)",
          }}
        >
          {date}
        </div>
        {field && (
          <div
            className="text-white font-teko text-6xl mt-2 tracking-wider text-center drop-shadow-lg"
            style={{
              opacity: fieldOpacity,
              transform: `translateY(${fieldY}px)`,
              textShadow: "0 2px 8px rgba(0,0,0,0.7)",
            }}
          >
            {field}
          </div>
        )}
        <div className="absolute bottom-0 left-0 w-full h-4 bg-gradient-to-r from-yellow-400 via-blue-700 to-yellow-400 opacity-80" />
      </div>
    </AbsoluteFill>
  );
};
