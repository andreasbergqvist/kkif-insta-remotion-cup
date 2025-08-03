import React from 'react';
import { useCurrentFrame } from 'remotion';

interface ParticleProps {
    x: number;
    y: number;
    size: number;
    speed: number;
    direction: number;
    color: string;
    opacity: number;
    delay: number;
    type: 'spark' | 'star' | 'dot' | 'plus';
}

const Particle: React.FC<ParticleProps> = ({
    x,
    y,
    size,
    speed,
    direction,
    color,
    opacity,
    delay,
    type,
}) => {
    const frame = useCurrentFrame();
    const adjustedFrame = Math.max(0, frame - delay);

    // Calculate position based on direction and speed
    const currentX = x + Math.cos(direction) * speed * adjustedFrame;
    const currentY = y + Math.sin(direction) * speed * adjustedFrame;

    // Add some organic motion
    const floatX = Math.sin(adjustedFrame * 0.05) * 8;
    const floatY = Math.cos(adjustedFrame * 0.07) * 6;
    const rotation = adjustedFrame * 2;
    const scale = 1 + Math.sin(adjustedFrame * 0.1) * 0.3;

    // Keep particles within screen bounds by wrapping them
    const wrappedX = ((currentX % 1920) + 1920) % 1920;
    const wrappedY = ((currentY % 1080) + 1080) % 1080;

    const renderParticle = () => {
        switch (type) {
            case 'spark':
                return (
                    <div
                        className="absolute"
                        style={{
                            width: size,
                            height: size / 4,
                            background: `linear-gradient(90deg, transparent, ${color}, transparent)`,
                            borderRadius: '50%',
                            boxShadow: `0 0 ${size / 2}px ${color}`,
                        }}
                    />
                );
            case 'star':
                return (
                    <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                );
            case 'plus':
                return (
                    <div
                        className="absolute"
                        style={{
                            width: size,
                            height: size,
                            position: 'relative',
                        }}
                    >
                        <div
                            style={{
                                position: 'absolute',
                                top: '50%',
                                left: 0,
                                width: '100%',
                                height: '2px',
                                background: color,
                                transform: 'translateY(-50%)',
                                boxShadow: `0 0 ${size / 4}px ${color}`,
                            }}
                        />
                        <div
                            style={{
                                position: 'absolute',
                                left: '50%',
                                top: 0,
                                width: '2px',
                                height: '100%',
                                background: color,
                                transform: 'translateX(-50%)',
                                boxShadow: `0 0 ${size / 4}px ${color}`,
                            }}
                        />
                    </div>
                );
            default:
                return (
                    <div
                        className="absolute rounded-full"
                        style={{
                            width: size,
                            height: size,
                            background: color,
                            boxShadow: `0 0 ${size / 2}px ${color}`,
                        }}
                    />
                );
        }
    };

    return (
        <div
            className="absolute pointer-events-none"
            style={{
                left: wrappedX + floatX - size / 2,
                top: wrappedY + floatY - size / 2,
                opacity: opacity,
                transform: `rotate(${rotation}deg) scale(${scale})`,
                zIndex: 2,
            }}
        >
            {renderParticle()}
        </div>
    );
};

interface EnhancedParticleEffectsProps {
    count?: number;
    colors?: string[];
    opacity?: number;
}

export const EnhancedParticleEffects: React.FC<EnhancedParticleEffectsProps> = ({
    count = 25,
    colors = ['#fbbf24', '#3b82f6', '#ffffff', '#f59e0b'],
    opacity = 0.6,
}) => {
    const particles = React.useMemo(() => {
        const items = [];
        const types: ('spark' | 'star' | 'dot' | 'plus')[] = ['spark', 'star', 'dot', 'plus'];

        for (let i = 0; i < count; i++) {
            const seed = i * 11;
            items.push({
                x: (seed * 123) % 1920,
                y: (seed * 456) % 1080,
                size: 4 + ((seed * 789) % 16),
                speed: 0.1 + ((seed * 234) % 0.8),
                direction: ((seed * 567) % 360) * (Math.PI / 180),
                color: colors[(seed * 345) % colors.length],
                opacity: opacity * (0.3 + ((seed * 678) % 0.7)),
                delay: (seed * 12) % 120,
                type: types[(seed * 432) % types.length],
            });
        }
        return items;
    }, [count, colors, opacity]);

    return (
        <>
            {particles.map((particle, index) => (
                <Particle key={index} {...particle} />
            ))}
        </>
    );
};
