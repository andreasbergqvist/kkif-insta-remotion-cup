import { FunctionComponent } from "react";
import { AbsoluteFill, useCurrentFrame, spring, interpolate } from "remotion";

export interface MatchesScreenProps {
    matches: { time: string; opponent: string, showVs: boolean, color: string }[];
}

export const MatchesScreen: FunctionComponent<MatchesScreenProps> = ({ matches }) => {
    const frame = useCurrentFrame();
    const titleOpacity = spring({ frame, from: 0, to: 1, fps: 30, durationInFrames: 20 });
    const titleY = interpolate(titleOpacity, [0, 1], [40, 0]);
    const ROW_STAGGER = 18;
    return (
        <AbsoluteFill className="flex flex-col items-center justify-center bg-gradient-to-b from-black via-neutral-900 to-black">
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-700 via-yellow-400 to-blue-700 opacity-70" />
            <div
                className="text-white font-teko font-bold text-7xl mb-10 tracking-wider text-center drop-shadow-lg"
                style={{ opacity: titleOpacity, transform: `translateY(${titleY}px)` }}
            >
                Matcher
            </div>
            <div className="flex flex-col items-center text-white font-teko text-7xl w-full">
                {matches.map((m, i) => {
                    const baseFrame = frame - 10 - i * ROW_STAGGER;
                    const timeOpacity = spring({ frame: baseFrame, from: 0, to: 1, fps: 30, durationInFrames: 10 });
                    const vsOpacity = spring({ frame: baseFrame - 7, from: 0, to: 1, fps: 30, durationInFrames: 10 });
                    // Scale-in effect for opponent
                    const opponentScale = 0.8 + 0.2 * vsOpacity;
                    return (
                        <div key={i} className="flex gap-6 flex-row items-baseline w-full justify-center mb-4">
                            <div
                                className="mr-6 flex-3 text-right"
                                style={{ opacity: timeOpacity }}
                            >
                                {m.time}
                            </div>
                            <div
                                className="text-left flex-5"
                                style={{
                                    opacity: vsOpacity,
                                    transform: `scale(${opponentScale})`,
                                    textShadow: `0 0 16px ${m.color}, 0 2px 8px ${m.color}, 0 0 2px ${m.color}`
                                }}
                            >
                                {m.showVs && 'vs'} {m.opponent}
                            </div>
                        </div>
                    );
                })}
            </div>
            <div className="absolute bottom-0 left-0 w-full h-2 bg-gradient-to-r from-yellow-400 via-blue-700 to-yellow-400 opacity-70" />
        </AbsoluteFill>
    );
};
