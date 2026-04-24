import { FunctionComponent } from "react";
import { AbsoluteFill, Sequence } from "remotion";
import { SponsorsScreen } from "../screens/SponsorsScreen";
import { BackgroundTexture } from "../components/BackgroundTexture";
import { IntroScreen } from "../screens/IntroScreen";
import { MatchesScreen } from "../screens/MatchesScreen";
import { SquadScreen } from "../screens/SquadScreen";

// All changeable data for the video
export const data = {
  eventName: "Ahlaforscupen",
  date: "Sondag 7/9",
  field: "Sjövallen",
  logoUrl: "https://www.karrakif.se/im/hemsidaLogga/2056/60268/_genLogga.png",
  matches: [
    { time: "13.00", opponent: "BK Astrio", showVs: true, color: "#fedf0e" },
    { time: "15:00", opponent: "Bergums IF", showVs: true, color: "#004686" },
    { time: "16.20", opponent: "Ahlafors IF", showVs: true, color: "#fde900" },
  ],
  squad: [
    "Bao An Nguyen",
    "Cornelia Björklund",
    "Disa Bäckman",
    "Emma Flygare",
    "Emma Yuan",
    "Ester Fahlström",
    "Evelina Borne",
    "Hanna Norrisson",
    "Iris Bergqvist",
    "Tuva Reitz",
    "Vanessa Diniute",
  ],
  sponsors: ["Wattnord", "Itiden", "PG Bygg"],
};

export const SCREEN_DURATION = 120;
export const SQUAD_SCREEN_DURATION = 180;

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
