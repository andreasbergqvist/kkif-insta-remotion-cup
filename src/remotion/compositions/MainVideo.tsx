import { FunctionComponent } from "react";
import { AbsoluteFill, Sequence } from "remotion";
import { SponsorsScreen } from "../screens/SponsorsScreen";
import { BackgroundTexture } from "../components/BackgroundTexture";
import { IntroScreen } from "../screens/IntroScreen";
import { MatchesScreen } from "../screens/MatchesScreen";
import { SquadScreen } from "../screens/SquadScreen";

// All changeable data for the video
const videoData = {
  eventName: "KKIF-Dagen",
  date: "Lördag 7/6",
  field: "Klarebergsvallen",
  logoUrl: "https://www.karrakif.se/im/hemsidaLogga/2056/60268/_genLogga.png",
  matches: [
    { time: "10.15", opponent: "P18", showVs: true },
    { time: "11.00", opponent: "F12", showVs: true },
    { time: "12.00", opponent: "F13", showVs: true },
    { time: "12.45", opponent: "P10", showVs: true },
    { time: "13.30", opponent: "F16/17", showVs: true },
    { time: "13.45", opponent: "Slutspel", showVs: false },
  ],
  squad: [
    "Ariana Mati",
    "Astrid Bergsten",
    "Bao An Nguyen",
    "Cornelia Björklund",
    "Cornelia Dahlqvist",
    "Disa Bäckman",
    "Emma Bohman",
    "Emma Flygare",
    "Ester Fahlström",
    "Evelina Borne",
    "Hanna Norrisson",
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
