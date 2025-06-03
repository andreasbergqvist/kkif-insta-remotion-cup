import { FunctionComponent } from "react";
import { AbsoluteFill, useCurrentFrame, spring, interpolate } from "remotion";

export interface SquadScreenProps {
    squad: string[];
}

export const SquadScreen: FunctionComponent<SquadScreenProps> = ({ squad }) => {
    const frame = useCurrentFrame();
    const titleOpacity = spring({ frame, from: 0, to: 1, fps: 30, durationInFrames: 40 });
    const titleY = interpolate(titleOpacity, [0, 1], [40, 0]);
    return (
        <AbsoluteFill className="flex flex-col items-center justify-center bg-gradient-to-b from-black via-neutral-900 to-black p-10">
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-700 via-yellow-400 to-blue-700 opacity-70" />
            <div
                className="text-white font-teko font-bold text-8xl mb-8 tracking-wider text-center drop-shadow-lg"
                style={{ opacity: titleOpacity, transform: `translateY(${titleY}px)` }}
            >
                Truppen
            </div>
            <div className="flex flex-col items-center space-y-4 text-white font-teko text-5xl text-center">
                {squad.map((name, i) => {
                    const itemOpacity = spring({ frame: frame - 10 - i * 6, from: 0, to: 1, fps: 30, durationInFrames: 20 });
                    const itemX = interpolate(itemOpacity, [0, 1], [i % 2 === 0 ? -30 : 30, 0]);
                    return (
                        <div key={i} style={{ opacity: itemOpacity, transform: `translateX(${itemX}px)` }}>{name}</div>
                    );
                })}
            </div>
            <div className="absolute bottom-0 left-0 w-full h-2 bg-gradient-to-r from-yellow-400 via-blue-700 to-yellow-400 opacity-70" />
        </AbsoluteFill>
    );
};
