import React from 'react';
import { AbsoluteFill, useCurrentFrame, spring, interpolate } from 'remotion';

interface SponsorsScreenProps {
    sponsors: string[];
}

export const SponsorsScreen: React.FC<SponsorsScreenProps> = ({ sponsors }) => {
    const frame = useCurrentFrame();

    const TITLE_START = 10;
    const SPONSORS_START = 40;
    const SPONSOR_STAGGER = 12;
    const SPARKLE_START = 0;

    // Title animations
    const titleOpacity = spring({
        frame: frame - TITLE_START,
        from: 0,
        to: 1,
        fps: 30,
        durationInFrames: 25,
    });

    const titleScale = spring({
        frame: frame - TITLE_START,
        from: 0.7,
        to: 1,
        fps: 30,
        durationInFrames: 30,
    });

    const titleY = spring({
        frame: frame - TITLE_START,
        from: -50,
        to: 0,
        fps: 30,
        durationInFrames: 25,
    });

    // Background sparkle animation
    const sparkleRotation = interpolate(
        frame - SPARKLE_START,
        [0, 150],
        [0, 360],
        { extrapolateRight: 'clamp' }
    );

    const sparkleScale = interpolate(
        (frame - SPARKLE_START) % 60,
        [0, 30, 60],
        [1, 1.2, 1],
        { extrapolateRight: 'clamp' }
    );

    // Pulsing background effect
    const bgPulse = interpolate(
        (frame - SPARKLE_START) % 90,
        [0, 45, 90],
        [0.3, 0.5, 0.3],
        { extrapolateRight: 'clamp' }
    );
    return (
        <AbsoluteFill className="flex flex-col items-center justify-center p-16">
            {/* Animated gradient background */}
            <div
                className="absolute inset-0"
                style={{
                    background: `linear-gradient(135deg, #FFD200, #005FA9, #FFD200)`,
                    opacity: bgPulse,
                }}
            />

            {/* Sparkle effects */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    background: `
            radial-gradient(circle at 20% 80%, rgba(255, 255, 255, 0.3) 1px, transparent 1px),
            radial-gradient(circle at 80% 20%, rgba(255, 255, 255, 0.3) 1px, transparent 1px),
            radial-gradient(circle at 40% 40%, rgba(255, 255, 255, 0.2) 1px, transparent 1px),
            radial-gradient(circle at 60% 90%, rgba(255, 255, 255, 0.3) 1px, transparent 1px),
            radial-gradient(circle at 90% 60%, rgba(255, 255, 255, 0.2) 1px, transparent 1px)
          `,
                    backgroundSize: '200px 200px',
                    transform: `rotate(${sparkleRotation}deg) scale(${sparkleScale})`,
                }}
            />

            {/* Main title */}
            <div
                className="relative text-white font-teko font-bold text-7xl mb-12 text-center tracking-wider z-10"
                style={{
                    opacity: titleOpacity,
                    transform: `scale(${titleScale}) translateY(${titleY}px)`,
                    textShadow: '3px 3px 0 rgba(0,0,0,0.7), 0 0 20px rgba(255,255,255,0.3)',
                }}
            >
                Tack till våra sponsorer!
            </div>

            {/* Sponsors list */}
            <div className="relative flex flex-col items-center justify-center space-y-6 z-10">
                {sponsors.map((sponsor, index) => {
                    const sponsorOpacity = spring({
                        frame: frame - (SPONSORS_START + index * SPONSOR_STAGGER),
                        from: 0,
                        to: 1,
                        fps: 30,
                        durationInFrames: 20,
                    });

                    const sponsorScale = spring({
                        frame: frame - (SPONSORS_START + index * SPONSOR_STAGGER),
                        from: 0.5,
                        to: 1,
                        fps: 30,
                        durationInFrames: 25,
                    });

                    const sponsorX = spring({
                        frame: frame - (SPONSORS_START + index * SPONSOR_STAGGER),
                        from: index % 2 === 0 ? -100 : 100,
                        to: 0,
                        fps: 30,
                        durationInFrames: 30,
                    });

                    // Subtle floating animation
                    const floatY = interpolate(
                        (frame - (SPONSORS_START + index * SPONSOR_STAGGER)) % 120,
                        [0, 60, 120],
                        [0, -5, 0],
                        { extrapolateRight: 'clamp' }
                    );

                    return (
                        <div
                            key={sponsor}
                            className="relative"
                            style={{
                                opacity: sponsorOpacity,
                                transform: `scale(${sponsorScale}) translateX(${sponsorX}px) translateY(${floatY}px)`,
                            }}
                        >
                            <div
                                className="text-white font-teko font-bold text-5xl tracking-wide text-center"
                                style={{
                                    textShadow: '2px 2px 0 rgba(0,0,0,0.5)',
                                }}
                            >
                                {sponsor}
                            </div>
                        </div>
                    );
                })}
            </div>

        </AbsoluteFill>
    );
};
