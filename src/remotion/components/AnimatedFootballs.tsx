import React from 'react';
import { useCurrentFrame, interpolate, Img } from 'remotion';

const SoccerBall: React.FC<{
    idx: number;
    total: number;
    width?: number;
    height?: number;
}> = ({ idx, total, width = 40, height = 40 }) => {
    const frame = useCurrentFrame();
    // Each ball has a unique animation phase
    const phase = (idx / total) * Math.PI * 2;
    // Animate position in a subtle floating pattern
    const x = interpolate(
        Math.sin(frame / 40 + phase),
        [-1, 1],
        [0, 1920 - width]
    );
    const y = interpolate(
        Math.cos(frame / 60 + phase),
        [-1, 1],
        [0, 1080 - height]
    );
    const opacity = 0.10 + 0.08 * Math.abs(Math.sin(frame / 80 + phase));
    return (
        <Img
            src="https://upload.wikimedia.org/wikipedia/commons/d/d3/Soccerball.svg"
            alt="soccer ball"
            style={{
                position: 'absolute',
                left: x,
                top: y,
                width,
                height,
                opacity,
                pointerEvents: 'none',
                filter: 'drop-shadow(0 2px 6px #0008)',
                zIndex: 0,
                transition: 'opacity 0.2s',
            }}
        />
    );
};

interface AnimatedSoccerBallsProps {
    count?: number;
    size?: number;
}

export const AnimatedFootballs: React.FC<AnimatedSoccerBallsProps> = ({
    count = 20,
    size = 35,
}) => {
    return (
        <>
            {Array.from({ length: count }).map((_, idx) => (
                <SoccerBall key={idx} idx={idx} total={count} width={size} height={size} />
            ))}
        </>
    );
};
