import { FunctionComponent } from "react";
import { AbsoluteFill, Img, useCurrentFrame, spring } from "remotion";
import { AnimatedFootballs } from "../components/AnimatedFootballs";
import { BackgroundTexture } from "../components/BackgroundTexture";
import { EnhancedParticleEffects } from "../components/EnhancedParticleEffects";
import { SurfaceTheme } from "../components/BackgroundTexture";

export interface IntroScreenProps {
  eventName: string;
  date: string;
  logoUrl?: string;
  surface?: SurfaceTheme;
}

export const IntroScreen: FunctionComponent<IntroScreenProps> = ({
  eventName,
  date,
  logoUrl,
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
  const mainTextOpacity = spring({
    frame: frame - 14,
    from: 0,
    to: 1,
    fps: 30,
    durationInFrames: 18,
  });
  const dateOpacity = spring({
    frame: frame - 24,
    from: 0,
    to: 1,
    fps: 30,
    durationInFrames: 15,
  });
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
          boxShadow:
            "inset 0 0 170px rgba(1, 20, 16, 0.72), 0 0 80px rgba(71, 178, 95, 0.18)",
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

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          zIndex: 3,
          background: `radial-gradient(ellipse at ${50 + Math.sin(frame / 90) * 8}% 34%, rgba(230, 255, 228, 0.3), transparent 48%), linear-gradient(72deg, transparent 22%, rgba(215, 255, 226, 0.08) 42%, transparent 56%), linear-gradient(108deg, transparent 44%, rgba(255, 246, 194, 0.1) 59%, transparent 76%)`,
          mixBlendMode: "screen",
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
        <div className="absolute top-0 left-0 w-full h-6 bg-gradient-to-r from-blue-700 via-yellow-300 to-blue-700 opacity-90 shadow-[0_0_28px_rgba(251,191,36,0.45)]" />
        {logoUrl && (
          <div className="mb-5 mt-10">
            <Img
              src={logoUrl}
              alt="Kärra KIF"
              className="object-contain h-72 w-[36rem] drop-shadow-xl"
              style={{
                opacity: logoOpacity,
                transform: `scale(${logoScale}) rotate(${logoRotation}deg)`,
                filter: `drop-shadow(0 0 36px rgba(251, 191, 36, ${logoOpacity * 0.75}))`,
              }}
            />
          </div>
        )}
        <div
          className="mb-3 text-white font-teko font-bold text-7xl text-center drop-shadow-lg"
          style={{
            opacity: preTextOpacity,
            textShadow:
              "0 0 24px rgba(251,191,36,0.5), 0 3px 10px rgba(0,0,0,0.9)",
          }}
        >
          Dags för
        </div>
        <div
          className="max-w-[960px] mb-4 text-white font-teko font-extrabold text-[10rem] leading-[0.82] text-center drop-shadow-lg"
          style={{
            opacity: mainTextOpacity,
            textShadow:
              "0 0 30px rgba(251, 191, 36, 0.55), 0 8px 18px rgba(0,0,0,0.95)",
          }}
        >
          {eventName}
        </div>
        <div
          className="text-white font-teko font-semibold text-7xl mt-5 mb-1 text-center drop-shadow-lg"
          style={{
            opacity: dateOpacity,
            textShadow: "0 3px 10px rgba(0,0,0,0.85)",
          }}
        >
          {date}
        </div>
        <div className="absolute bottom-0 left-0 w-full h-6 bg-gradient-to-r from-yellow-300 via-blue-700 to-yellow-300 opacity-90 shadow-[0_0_28px_rgba(251,191,36,0.45)]" />
      </div>
    </AbsoluteFill>
  );
};
