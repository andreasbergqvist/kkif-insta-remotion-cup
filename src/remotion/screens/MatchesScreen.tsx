import { FunctionComponent } from "react";
import { AbsoluteFill, useCurrentFrame, spring, interpolate } from "remotion";
import { BackgroundTexture } from "../components/BackgroundTexture";

export interface MatchesScreenProps {
    matches: { time: string; opponent: string, showVs: boolean, color: string }[];
    date: string;
}

export const MatchesScreen: FunctionComponent<MatchesScreenProps> = ({ matches }) => {
    const frame = useCurrentFrame();
    const titleOpacity = spring({ frame, from: 0, to: 1, fps: 30, durationInFrames: 20 });
    const titleY = interpolate(titleOpacity, [0, 1], [40, 0]);
    const ROW_STAGGER = 18;
    return (
        <AbsoluteFill className="bg-black">
            <BackgroundTexture />
            {/* Datum och titel */}
            <div className="text-white font-teko text-center mt-40">
                <div style={{ fontSize: 110, opacity: titleOpacity, transform: `translateY(${titleY}px)` }}>Matcher</div>
            </div>
            {/* Matcher */}
            <div className="flex flex-col gap-6 items-center text-white font-teko text-7xl w-full mt-40">
                {matches.map((m, i) => {
                    const baseFrame = frame - 10 - i * ROW_STAGGER;
                    const timeOpacity = spring({ frame: baseFrame, from: 0, to: 1, fps: 30, durationInFrames: 10 });
                    const vsOpacity = spring({ frame: baseFrame - 7, from: 0, to: 1, fps: 30, durationInFrames: 10 });
                    const opponentScale = 0.8 + 0.2 * vsOpacity + Math.sin((frame - baseFrame) / 40) * 0.03;
                    const timeX = Math.sin((frame - baseFrame) / 60) * 3;
                    const opponentX = Math.cos((frame - baseFrame) / 70) * 4;
                    const rowRotation = Math.sin((frame - baseFrame) / 100) * 0.5;
                    return (
                        <div
                            key={i}
                            className="flex gap-6 flex-row items-baseline w-full justify-center mb-2"
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
                                    filter: `drop-shadow(0 0 15px ${m.color}00)`
                                }}
                            >
                                {m.showVs && 'vs'} {m.opponent}
                            </div>
                        </div>
                    );
                })}
            </div>
            <div className="absolute bottom-0 left-0 w-full h-2 bg-gradient-to-r from-yellow-400 via-blue-700 to-yellow-400 opacity-70" />
        </AbsoluteFill >
    );
};
