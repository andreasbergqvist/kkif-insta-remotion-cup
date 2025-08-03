import React from 'react';

export const BackgroundText: React.FC = () => {
    const baseStyle = {
        position: 'absolute' as const,
        width: '100vw',
        fontWeight: 900,
        color: '#FFFFFF',
        opacity: 0.08,
        zIndex: 1,
        pointerEvents: 'none' as const,
        letterSpacing: '0.05em',
        textTransform: 'uppercase' as const,
        fontFamily: 'Arial Black, sans-serif',
        textShadow: '0 0 50px rgba(255, 255, 255, 0.1)',
        userSelect: 'none' as const,
        lineHeight: 1,
    };

    return (
        <>
            {/* KÄRRA at top */}
            <div
                style={{
                    ...baseStyle,
                    top: 0,
                    left: '-22px',
                    fontSize: '268px',
                }}
            >
                KÄRRA
            </div>

            {/* F15 at bottom */}
            <div
                style={{
                    ...baseStyle,
                    bottom: '-50px',
                    left: '-45px',
                    fontSize: '560px',
                }}
            >
                F15
            </div>
        </>
    );
};
