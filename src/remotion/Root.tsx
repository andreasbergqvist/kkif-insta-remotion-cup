import { Composition } from 'remotion';
import { MainVideo, defaultProps } from './index';
import { VIDEO_DURATION } from './compositions/MainVideo';
import '../index.css';

export const RemotionRoot = () => {
  return (
    <>      <Composition
      id="MainVideo"
      component={MainVideo}
      durationInFrames={VIDEO_DURATION}
      fps={30}
      width={1080}
      height={1350}
      defaultProps={defaultProps}
    />
    </>
  );
};
