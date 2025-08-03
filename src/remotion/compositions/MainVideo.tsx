import { FunctionComponent } from "react";
import { AbsoluteFill, Sequence } from "remotion";
import { SponsorsScreen } from "../screens/SponsorsScreen";
import { BackgroundTexture } from "../components/BackgroundTexture";
import { IntroScreen } from "../screens/IntroScreen";
import { MatchesScreen } from "../screens/MatchesScreen";
import { SquadScreen } from "../screens/SquadScreen";

// All changeable data for the video
const videoData = {
  eventName: "Göteborg Beachfestival",
  date: "Måndag 4/8",
  field: "Göteborg Beach Arena",
  logoUrl: "https://www.karrakif.se/im/hemsidaLogga/2056/60268/_genLogga.png",
  matches: [
    { time: "15.40", opponent: "Jitex BK", showVs: true, color: '#652D87' },
    { time: "16.40", opponent: "Kode IF", showVs: true, color: '#F9D409' },
    { time: "17.40", opponent: "Torslanda IK", showVs: true, color: '#E23D27' },
    { time: "18.40", opponent: "Jitex BK", showVs: true, color: '#652D87' },
    { time: "20.00", opponent: "Kode IF", showVs: true, color: '#F9D409' },
  ],
  squad: [
    "Ariana Mati",
    "Bao An Nguyen",
    "Cornelia Björklund",
    "Cornelia Dahlqvist",
    "Disa Bäckman",
    "Emma Bohman",
    "Ester Fahlström",
    "Evelina Borne",
    "Hanna Norrisson",
    "Iris Bergqvist"
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
