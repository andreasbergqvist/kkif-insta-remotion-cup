import { Composition } from 'remotion';
import { MainVideo, defaultProps } from './index';
import '../index.css';

export const RemotionRoot = () => {
  return (
    <>      <Composition
      id="MainVideo"
      component={MainVideo}
      durationInFrames={20 * 30}
      fps={30}
      width={1080}
      height={1350}
      defaultProps={defaultProps}
    />
    </>
  );
};
