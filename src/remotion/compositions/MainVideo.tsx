import { FunctionComponent } from "react";
import { AbsoluteFill, Sequence } from "remotion";
import { SponsorsScreen } from "../screens/SponsorsScreen";
import { BackgroundTexture } from "../components/BackgroundTexture";
import { IntroScreen } from "../screens/IntroScreen";
import { MatchesScreen } from "../screens/MatchesScreen";
import { SquadScreen } from "../screens/SquadScreen";

// All changeable data for the video
const videoData = {
  eventName: "Lerkilscupen",
  date: "Lördag 14/6",
  field: "Ängås IP",
  logoUrl: "https://www.karrakif.se/im/hemsidaLogga/2056/60268/_genLogga.png",
  matches: [
    { time: "12.30", opponent: "Onsala BK", showVs: true, color: '#0067B0' },
    { time: "14.30", opponent: "SG Ruddalen", showVs: true, color: '#BF1E2E' },
    { time: "15.30", opponent: "Hovås Billdal", showVs: true, color: '#2F3F7D' },
    { time: "16.30", opponent: "Varbergs BoIS", showVs: true, color: '#289548' },
  ],
  squad: [
    "Ariana Mati",
    "Astrid Bergsten",
    "Cornelia Dahlqvist",
    "Emma Bohman",
    "Emma Yuan",
    "Ester Fahlström",
    "Iris Bergqvist",
    "Lena Simovic",
    "Tuva Reitz",
    "Vanessa Diniute",
  ],
  sponsors: ["Rekomo", "Sendify", "Itiden", "PG Bygg"],
};

export const MainVideo: FunctionComponent = () => {
  const SCREEN_DURATION = 120;
  const SQUAD_SCREEN_DURATION = 180;
  return (
    <AbsoluteFill className="bg-black">
      <BackgroundTexture />
      {/* 1. Intro screen */}
      <Sequence durationInFrames={SCREEN_DURATION}>
        <IntroScreen eventName={videoData.eventName} date={videoData.date} logoUrl={videoData.logoUrl} field={videoData.field} />
      </Sequence>
      {/* 2. Matches screen */}
      <Sequence durationInFrames={SCREEN_DURATION * 1.5} from={SCREEN_DURATION}>
        <MatchesScreen matches={videoData.matches} />
      </Sequence>
      {/* 3. Squad screen */}
      <Sequence durationInFrames={SQUAD_SCREEN_DURATION} from={SCREEN_DURATION + SCREEN_DURATION * 1.5}>
        <SquadScreen squad={videoData.squad} />
      </Sequence>
      {/* 4. Sponsors screen (unchanged) */}
      <Sequence durationInFrames={SCREEN_DURATION} from={SCREEN_DURATION * 2.5 + SQUAD_SCREEN_DURATION}>
        <SponsorsScreen sponsors={videoData.sponsors} />
      </Sequence>
    </AbsoluteFill>
  );
};
