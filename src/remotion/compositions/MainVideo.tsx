import { FunctionComponent } from "react";
import { AbsoluteFill, Sequence } from "remotion";
import { SponsorsScreen } from "../screens/SponsorsScreen";
import { BackgroundTexture } from "../components/BackgroundTexture";
import { IntroScreen } from "../screens/IntroScreen";
import { MatchesScreen } from "../screens/MatchesScreen";
import { SquadScreen } from "../screens/SquadScreen";

// All changeable data for the video
export const data = {
  eventName: "Vårcupen",
  date: "Söndag 22/3",
  field: "Torslandavallen",
  logoUrl: "https://www.karrakif.se/im/hemsidaLogga/2056/60268/_genLogga.png",
  matches: [
    { time: "14.30", opponent: "Jitex BK", showVs: true, color: "#652D87" },
    { time: "15.30", opponent: "Mölnlycke IF", showVs: true, color: "#F5D330" },
    { time: "16.30", opponent: "IK Zenith", showVs: true, color: "#00904A" },
    { time: "17.30", opponent: "Azalea BK", showVs: true, color: "#FD5300" },
  ],
  squad: [
    "Astrid Bergsten",
    "Bao An Nguyen",
    "Cornelia Dahlqvist",
    "Emma Bohman",
    "Emma Flygare",
    "Emma Yuan",
    "Ester Fahlström",
    "Evelina Borne",
    "Iris Bergqvist",
    "Lilia Miqdad",
    "Vansessa Dinuite",
  ],
  sponsors: null as string[] | null,
};

// Duration constants
const SCREEN_DURATION = 120;
const SQUAD_SCREEN_DURATION = 180;

// Calculate total duration based on whether sponsors exist
export const calculateDuration = (sponsors: string[] | null) => {
  const baseDuration =
    SCREEN_DURATION + SCREEN_DURATION * 1.5 + SQUAD_SCREEN_DURATION;
  return sponsors && sponsors.length > 0
    ? baseDuration + SCREEN_DURATION
    : baseDuration;
};

export const MainVideo: FunctionComponent = () => {
  return (
    <AbsoluteFill className="bg-black">
      <BackgroundTexture />
      {/* 1. Intro screen */}
      <Sequence durationInFrames={SCREEN_DURATION}>
        <IntroScreen
          eventName={data.eventName}
          date={data.date}
          logoUrl={data.logoUrl}
          field={data.field}
        />
      </Sequence>
      {/* 2. Matches screen */}
      <Sequence durationInFrames={SCREEN_DURATION * 1.5} from={SCREEN_DURATION}>
        <MatchesScreen matches={data.matches} />
      </Sequence>
      {/* 3. Squad screen */}
      <Sequence
        durationInFrames={SQUAD_SCREEN_DURATION}
        from={SCREEN_DURATION + SCREEN_DURATION * 1.5}
      >
        <SquadScreen squad={data.squad} />
      </Sequence>
      {/* 4. Sponsors screen (optional) */}
      {data.sponsors && data.sponsors.length > 0 && (
        <Sequence
          durationInFrames={SCREEN_DURATION}
          from={SCREEN_DURATION * 2.5 + SQUAD_SCREEN_DURATION}
        >
          <SponsorsScreen sponsors={data.sponsors} />
        </Sequence>
      )}
    </AbsoluteFill>
  );
};
