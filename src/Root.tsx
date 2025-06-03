import "./index.css";
import { Composition } from "remotion";
import { MainVideo, data } from "./remotion/compositions/MainVideo";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="MyComp"
        component={MainVideo}
        durationInFrames={20 * 30}
        fps={30}
        width={1080}
        height={1350}
        defaultProps={data}
      />
    </>
  );
};
