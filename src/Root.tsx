import "./index.css";
import { Composition } from "remotion";
import {
  MainVideo,
  data,
  calculateDuration,
} from "./remotion/compositions/MainVideo";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="MyComp"
        component={MainVideo}
        durationInFrames={calculateDuration(data)}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={data}
      />
    </>
  );
};
