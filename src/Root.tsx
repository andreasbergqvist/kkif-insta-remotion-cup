import "./index.css";
import { Composition } from "remotion";
import { MainVideo, VIDEO_DURATION, data } from "./remotion/compositions/MainVideo";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="MyComp"
        component={MainVideo}
        durationInFrames={VIDEO_DURATION}
        fps={30}
        width={1080}
        height={1350}
        defaultProps={data}
      />
    </>
  );
};
