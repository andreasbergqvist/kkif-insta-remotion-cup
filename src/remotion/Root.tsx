import { Composition } from "remotion";
import { MainVideo, defaultProps, calculateDuration } from "./index";
import "../index.css";

export const RemotionRoot = () => {
  return (
    <>
      <Composition
        id="MainVideo"
        component={MainVideo}
        durationInFrames={calculateDuration(defaultProps)}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={defaultProps}
      />
    </>
  );
};
