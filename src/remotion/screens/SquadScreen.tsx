import { FunctionComponent } from "react";
import { AbsoluteFill, useCurrentFrame, spring, interpolate } from "remotion";
import { BackgroundTexture } from "../components/BackgroundTexture";
import { BackgroundText } from "../components/BackgroundText";

export interface SquadScreenProps {
    squad: string[];
}

export const SquadScreen: FunctionComponent<SquadScreenProps> = ({ squad }) => {
    const frame = useCurrentFrame();
    const titleOpacity = spring({ frame, from: 0, to: 1, fps: 30, durationInFrames: 40 });
    const titleY = interpolate(titleOpacity, [0, 1], [40, 0]);

    // Background animation
    const gradientOffset = frame / 5;

    return (
        <AbsoluteFill className="overflow-hidden">
            <BackgroundTexture />

            {/* Animated gradient overlay */}
            <div
                className="absolute inset-0 opacity-75"
                style={{
                    background: `linear-gradient(${225 + gradientOffset}deg, 
                        rgba(30, 58, 138, 0.9) 0%, 
                        rgba(0, 0, 0, 0.95) 40%, 
                        rgba(0, 0, 0, 0.95) 60%, 
                        rgba(251, 191, 36, 0.9) 100%)`
                }}
            />

            <BackgroundText />

            <div className="relative z-10 flex flex-col items-center justify-center h-full p-10">
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-700 via-yellow-400 to-blue-700 opacity-70" />
                <div
                    className="text-white font-teko font-bold text-8xl mb-10 tracking-wider text-center drop-shadow-lg"
                    style={{
                        opacity: titleOpacity,
                        transform: `translateY(${titleY}px)`,
                        textShadow: '0 0 15px rgba(251, 191, 36, 0.4), 0 2px 8px rgba(0,0,0,0.8)'
                    }}
                >
                    Truppen
                </div>
                <div className="flex flex-col items-center space-y-4 text-white font-teko text-6xl text-center">
                    {squad.map((name, i) => {
                        const itemOpacity = spring({ frame: frame - 10 - i * 6, from: 0, to: 1, fps: 30, durationInFrames: 20 });
                        const itemX = interpolate(itemOpacity, [0, 1], [i % 2 === 0 ? -30 : 30, 0]);
                        const itemScale = 0.9 + 0.1 * itemOpacity; // Simplified scaling

                        return (
                            <div
                                key={i}
                                style={{
                                    opacity: itemOpacity,
                                    transform: `translateX(${itemX}px) scale(${itemScale})`,
                                    textShadow: '0 0 10px rgba(30, 58, 138, 0.6), 0 2px 8px rgba(0,0,0,0.8)'
                                }}
                            >
                                {name}
                            </div>
                        );
                    })}
                </div>
                <div className="absolute bottom-0 left-0 w-full h-2 bg-gradient-to-r from-yellow-400 via-blue-700 to-yellow-400 opacity-70" />
            </div>
        </AbsoluteFill>
    );
};
