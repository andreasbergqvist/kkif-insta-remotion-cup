import React from 'react';
import { AbsoluteFill, useCurrentFrame, spring, interpolate } from 'remotion';
import { BackgroundTexture } from '../components/BackgroundTexture';
import { BackgroundText } from '../components/BackgroundText';

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
        <AbsoluteFill className="overflow-hidden">
            <BackgroundTexture />

            {/* Enhanced animated gradient background */}
            <div
                className="absolute inset-0"
                style={{
                    background: `linear-gradient(${135 + frame / 3}deg, 
                        rgba(255, 210, 0, ${bgPulse}) 0%, 
                        rgba(0, 95, 169, ${bgPulse * 1.2}) 50%, 
                        rgba(255, 210, 0, ${bgPulse}) 100%)`,
                }}
            />

            <BackgroundText />

            {/* Enhanced sparkle effects */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    background: `
            radial-gradient(circle at 20% 80%, rgba(255, 255, 255, 0.4) 2px, transparent 2px),
            radial-gradient(circle at 80% 20%, rgba(255, 255, 255, 0.4) 2px, transparent 2px),
            radial-gradient(circle at 40% 40%, rgba(255, 255, 255, 0.3) 1px, transparent 1px),
            radial-gradient(circle at 60% 90%, rgba(255, 255, 255, 0.4) 2px, transparent 2px),
            radial-gradient(circle at 90% 60%, rgba(255, 255, 255, 0.3) 1px, transparent 1px),
            radial-gradient(circle at 10% 30%, rgba(251, 191, 36, 0.3) 1px, transparent 1px),
            radial-gradient(circle at 70% 10%, rgba(251, 191, 36, 0.3) 1px, transparent 1px)
          `,
                    backgroundSize: '150px 150px, 200px 200px, 100px 100px, 180px 180px, 120px 120px, 160px 160px, 140px 140px',
                    transform: `rotate(${sparkleRotation}deg) scale(${sparkleScale})`,
                }}
            />

            <div className="relative z-10 flex flex-col items-center justify-center h-full p-16">
                {/* Enhanced main title */}
                <div
                    className="relative text-white font-teko font-bold text-7xl mb-12 text-center tracking-wider z-10"
                    style={{
                        opacity: titleOpacity,
                        transform: `scale(${titleScale}) translateY(${titleY}px)`,
                        textShadow: '3px 3px 0 rgba(0,0,0,0.7), 0 0 15px rgba(255,255,255,0.3)'
                    }}
                >
                    Tack till våra sponsorer!
                </div>

                {/* Enhanced sponsors list */}
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

                        // Enhanced floating animation with individual patterns
                        const floatY = interpolate(
                            (frame - (SPONSORS_START + index * SPONSOR_STAGGER)) % 120,
                            [0, 60, 120],
                            [0, -8, 0],
                            { extrapolateRight: 'clamp' }
                        );

                        // Additional wobble effect
                        const wobbleX = Math.sin((frame - (SPONSORS_START + index * SPONSOR_STAGGER)) / 40 + index) * 3;
                        const sponsorRotation = Math.sin((frame - (SPONSORS_START + index * SPONSOR_STAGGER)) / 60 + index) * (index % 2 === 0 ? 1 : -1) * 0.8;
                        const pulseScale = 1 + Math.sin((frame - (SPONSORS_START + index * SPONSOR_STAGGER)) / 80 + index) * 0.05;

                        return (
                            <div
                                key={sponsor}
                                className="relative"
                                style={{
                                    opacity: sponsorOpacity,
                                    transform: `scale(${sponsorScale * pulseScale}) translateX(${sponsorX + wobbleX}px) translateY(${floatY}px) rotate(${sponsorRotation}deg)`,
                                }}
                            >
                                <div
                                    className="text-white font-teko font-bold text-5xl tracking-wide text-center"
                                    style={{
                                        textShadow: '2px 2px 0 rgba(0,0,0,0.5), 0 0 20px rgba(255,255,255,0.4), 0 0 10px rgba(0, 95, 169, 0.6)',
                                        filter: `drop-shadow(0 0 12px rgba(0, 95, 169, ${sponsorOpacity * 0.5}))`
                                    }}
                                >
                                    {sponsor}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </AbsoluteFill>
    );
};
