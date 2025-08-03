import React from 'react';
import { useCurrentFrame } from 'remotion';

// Very simple football for debugging
export const SimpleFootball: React.FC = () => {
    const frame = useCurrentFrame();

    return (
        <>
            {/* Static footballs at known positions */}
            <div
                className="absolute pointer-events-none"
                style={{
                    left: 200,
                    top: 200,
                    width: 80,
                    height: 80,
                    backgroundColor: '#FF4444',
                    borderRadius: '50%',
                    zIndex: 100,
                    opacity: 0.9,
                    border: '3px solid #FFFFFF',
                }}
            >
                <div className="text-white text-xs font-bold text-center pt-6">FB1</div>
            </div>

            {/* Moving football */}
            <div
                className="absolute pointer-events-none"
                style={{
                    left: 400 + Math.sin(frame / 30) * 100,
                    top: 300 + Math.cos(frame / 30) * 50,
                    width: 60,
                    height: 60,
                    backgroundColor: '#44FF44',
                    borderRadius: '50%',
                    zIndex: 100,
                    opacity: 0.9,
                    border: '2px solid #FFFFFF',
                }}
            >
                <div className="text-white text-xs font-bold text-center pt-4">FB2</div>
            </div>

            {/* Another moving football */}
            <div
                className="absolute pointer-events-none"
                style={{
                    left: 600 + Math.cos(frame / 40) * 80,
                    top: 400 + Math.sin(frame / 45) * 60,
                    width: 70,
                    height: 70,
                    backgroundColor: '#4444FF',
                    borderRadius: '50%',
                    zIndex: 100,
                    opacity: 0.9,
                    border: '2px solid #FFFFFF',
                }}
            >
                <div className="text-white text-xs font-bold text-center pt-5">FB3</div>
            </div>
        </>
    );
};
