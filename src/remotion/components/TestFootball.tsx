import React from 'react';
import { useCurrentFrame } from 'remotion';

// Simple test component to verify positioning works
export const TestFootball: React.FC = () => {
    const frame = useCurrentFrame();

    return (
        <div
            className="absolute pointer-events-none"
            style={{
                left: 100 + Math.sin(frame / 30) * 50,
                top: 100 + Math.cos(frame / 30) * 50,
                width: 60,
                height: 60,
                backgroundColor: '#FF0000',
                borderRadius: '50%',
                zIndex: 50,
                opacity: 0.8,
            }}
        >
            TEST
        </div>
    );
};
