import React from "react";
import { useCurrentFrame, interpolate, Img } from "remotion";

const SoccerBall: React.FC<{
  idx: number;
  total: number;
  width?: number;
  height?: number;
  centered?: boolean;
}> = ({ idx, total, width = 40, height = 40, centered = false }) => {
  const frame = useCurrentFrame();
  // Each ball has a unique animation phase
  const phase = (idx / total) * Math.PI * 2;

  // Calculate position - centered with some spread, or full screen
  const centerX = 540; // Half of 1080
  const centerY = 960; // Half of 1920
  const spreadX = centered ? 800 : 1080;
  const spreadY = centered ? 1200 : 1920;

  const x = centered
    ? centerX +
      interpolate(
        Math.sin(frame / 40 + phase),
        [-1, 1],
        [-spreadX / 2, spreadX / 2],
      ) -
      width / 2
    : interpolate(Math.sin(frame / 40 + phase), [-1, 1], [0, 1080 - width]);
  const y = centered
    ? centerY +
      interpolate(
        Math.cos(frame / 60 + phase),
        [-1, 1],
        [-spreadY / 2, spreadY / 2],
      ) -
      height / 2
    : interpolate(Math.cos(frame / 60 + phase), [-1, 1], [0, 1920 - height]);
  const opacity = 0.1 + 0.08 * Math.abs(Math.sin(frame / 80 + phase));
  return (
    <Img
      src="https://upload.wikimedia.org/wikipedia/commons/d/d3/Soccerball.svg"
      alt="soccer ball"
      style={{
        position: "absolute",
        left: x,
        top: y,
        width,
        height,
        opacity,
        pointerEvents: "none",
        filter: "drop-shadow(0 2px 6px #0008)",
        zIndex: 0,
        transition: "opacity 0.2s",
      }}
    />
  );
};

interface AnimatedSoccerBallsProps {
  count?: number;
  size?: number;
  centered?: boolean;
}

export const AnimatedFootballs: React.FC<AnimatedSoccerBallsProps> = ({
  count = 20,
  size = 35,
  centered = false,
}) => {
  return (
    <>
      {Array.from({ length: count }).map((_, idx) => (
        <SoccerBall
          key={idx}
          idx={idx}
          total={count}
          width={size}
          height={size}
          centered={centered}
        />
      ))}
    </>
  );
};
