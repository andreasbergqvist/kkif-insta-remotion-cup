import { FunctionComponent } from "react";
import { AbsoluteFill, Img, useCurrentFrame, spring, interpolate } from "remotion";

export interface IntroScreenProps {
    eventName: string;
    date: string;
    logoUrl?: string;
    field?: string;
}

export const IntroScreen: FunctionComponent<IntroScreenProps> = ({ eventName, date, logoUrl, field }) => {
    const frame = useCurrentFrame();
    const logoScale = spring({ frame, from: 0.7, to: 1, fps: 30, durationInFrames: 30 });
    const logoOpacity = spring({ frame, from: 0, to: 1, fps: 30, durationInFrames: 20 });
    const preTextOpacity = spring({ frame: frame - 8, from: 0, to: 1, fps: 30, durationInFrames: 15 });
    const preTextY = interpolate(preTextOpacity, [0, 1], [30, 0]);
    const mainTextOpacity = spring({ frame: frame - 14, from: 0, to: 1, fps: 30, durationInFrames: 18 });
    const mainTextScale = 1 + 0.15 * Math.sin(Math.min(Math.max((frame - 14) / 18, 0), 1) * Math.PI);
    const mainTextY = interpolate(mainTextOpacity, [0, 1], [40, 0]);
    const dateOpacity = spring({ frame: frame - 24, from: 0, to: 1, fps: 30, durationInFrames: 15 });
    const dateY = interpolate(dateOpacity, [0, 1], [30, 0]);
    const fieldOpacity = spring({ frame: frame - 32, from: 0, to: 1, fps: 30, durationInFrames: 15 });
    const fieldY = interpolate(fieldOpacity, [0, 1], [30, 0]);
    return (
        <AbsoluteFill className="flex flex-col items-center justify-center bg-gradient-to-b from-black via-neutral-900 to-black">
            <div className="absolute top-0 left-0 w-full h-4 bg-gradient-to-r from-blue-700 via-yellow-400 to-blue-700 opacity-80" />
            <div className="mb-12 mt-8">
                <Img
                    src={logoUrl || "https://www.karrakif.se/im/hemsidaLogga/2056/60268/_genLogga.png"}
                    alt="Logo"
                    className="object-contain h-48 w-96 drop-shadow-xl"
                    style={{ opacity: logoOpacity, transform: `scale(${logoScale})` }}
                />
            </div>
            <div
                className="mb-6 text-white font-teko font-bold text-5xl tracking-wider text-center drop-shadow-lg"
                style={{ opacity: preTextOpacity, transform: `translateY(${preTextY}px)` }}
            >
                Dags för
            </div>
            <div
                className="mb-12 text-white font-teko font-extrabold text-9xl mb-2 tracking-wider text-center drop-shadow-lg"
                style={{ opacity: mainTextOpacity, transform: `translateY(${mainTextY}px) scale(${mainTextScale})` }}
            >
                {eventName}
            </div>
            <div
                className="text-white font-teko text-6xl mt-4 mb-4 tracking-wider text-center drop-shadow-lg"
                style={{ opacity: dateOpacity, transform: `translateY(${dateY}px)` }}
            >
                {date}
            </div>
            {field && (
                <div
                    className="text-white font-teko text-6xl mt-2 tracking-wider text-center drop-shadow-lg"
                    style={{ opacity: fieldOpacity, transform: `translateY(${fieldY}px)` }}
                >
                    {field}
                </div>
            )}
            <div className="absolute bottom-0 left-0 w-full h-4 bg-gradient-to-r from-yellow-400 via-blue-700 to-yellow-400 opacity-80" />
        </AbsoluteFill>
    );
};
