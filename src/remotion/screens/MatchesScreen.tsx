import { FunctionComponent } from "react";
import { AbsoluteFill, useCurrentFrame, spring, interpolate } from "remotion";
import { BackgroundTexture } from "../components/BackgroundTexture";
import { BackgroundText } from "../components/BackgroundText";

export interface MatchesScreenProps {
    matches: { time: string; opponent: string, showVs: boolean, color: string }[];
}

export const MatchesScreen: FunctionComponent<MatchesScreenProps> = ({ matches }) => {
    const frame = useCurrentFrame();
    const titleOpacity = spring({ frame, from: 0, to: 1, fps: 30, durationInFrames: 20 });
    const titleY = interpolate(titleOpacity, [0, 1], [40, 0]);
    const ROW_STAGGER = 18;

    // Background animation
    const gradientOffset = frame / 4;

    return (
        <AbsoluteFill className="overflow-hidden">
            <BackgroundTexture />

            {/* Animated gradient overlay */}
            <div
                className="absolute inset-0 opacity-70"
                style={{
                    background: `linear-gradient(${135 + gradientOffset}deg, 
                        rgba(30, 58, 138, 0.9) 0%, 
                        rgba(0, 0, 0, 0.95) 50%, 
                        rgba(251, 191, 36, 0.9) 100%)`
                }}
            />

            <BackgroundText />

            <div className="relative z-10 flex flex-col items-center justify-center h-full">
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-700 via-yellow-400 to-blue-700 opacity-70" />
                <div
                    className="text-white font-teko font-bold text-7xl mb-10 tracking-wider text-center drop-shadow-lg"
                    style={{
                        opacity: titleOpacity,
                        transform: `translateY(${titleY}px)`,
                        textShadow: '0 0 10px rgba(251, 191, 36, 0.4), 0 2px 8px rgba(0,0,0,0.8)'
                    }}
                >
                    Matcher
                </div>
                <div className="flex flex-col items-center text-white font-teko text-7xl w-full">
                    {matches.map((m, i) => {
                        const baseFrame = frame - 10 - i * ROW_STAGGER;
                        const timeOpacity = spring({ frame: baseFrame, from: 0, to: 1, fps: 30, durationInFrames: 10 });
                        const vsOpacity = spring({ frame: baseFrame - 7, from: 0, to: 1, fps: 30, durationInFrames: 10 });
                        // Enhanced scale-in effect for opponent with bounce
                        const opponentScale = 0.8 + 0.2 * vsOpacity + Math.sin((frame - baseFrame) / 40) * 0.03;
                        const timeX = Math.sin((frame - baseFrame) / 60) * 3; // Subtle horizontal sway
                        const opponentX = Math.cos((frame - baseFrame) / 70) * 4; // Different frequency sway
                        const rowRotation = Math.sin((frame - baseFrame) / 100) * 0.5; // Very subtle rotation

                        return (
                            <div
                                key={i}
                                className="flex gap-6 flex-row items-baseline w-full justify-center mb-4"
                                style={{ transform: `rotate(${rowRotation}deg)` }}
                            >
                                <div
                                    className="mr-6 flex-3 text-right"
                                    style={{
                                        opacity: timeOpacity,
                                        transform: `translateX(${timeX}px)`,
                                        textShadow: '0 0 15px rgba(30, 58, 138, 0.8), 0 2px 8px rgba(0,0,0,0.7)',
                                        filter: `drop-shadow(0 0 10px rgba(30, 58, 138, ${timeOpacity * 0.5}))`
                                    }}
                                >
                                    {m.time}
                                </div>
                                <div
                                    className="text-left flex-5"
                                    style={{
                                        opacity: vsOpacity,
                                        transform: `scale(${opponentScale}) translateX(${opponentX}px)`,
                                        textShadow: `0 0 20px ${m.color}, 0 4px 12px ${m.color}, 0 0 4px ${m.color}, 0 2px 8px rgba(0,0,0,0.8)`,
                                        filter: `drop-shadow(0 0 15px ${m.color})`
                                    }}
                                >
                                    {m.showVs && 'vs'} {m.opponent}
                                </div>
                            </div>
                        );
                    })}
                </div>
                <div className="absolute bottom-0 left-0 w-full h-2 bg-gradient-to-r from-yellow-400 via-blue-700 to-yellow-400 opacity-70" />
            </div>
        </AbsoluteFill>
    );
};
