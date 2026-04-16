import { FunctionComponent } from "react";
import { AbsoluteFill, Sequence } from "remotion";
import { SponsorsScreen } from "../screens/SponsorsScreen";
import { BackgroundTexture } from "../components/BackgroundTexture";
import { IntroScreen } from "../screens/IntroScreen";
import { MatchesScreen } from "../screens/MatchesScreen";
import { SquadScreen } from "../screens/SquadScreen";

// All changeable data for the video
export const data = {
  eventName: "Honors Cup",
  date: "Lörd-sönd 18-19/4",
  field: "Åbyvallen",
  logoUrl: "https://www.karrakif.se/im/hemsidaLogga/2056/60268/_genLogga.png",
  matches: [
    {
      time: "Lörd 10.00",
      opponent: "FC Rosengård",
      showVs: true,
      color: "#1E1B58",
    },
    {
      time: "Lörd 13.30",
      opponent: "Mölnlycke IF",
      showVs: true,
      color: "#F5D330",
    },
    {
      time: "Lörd 16.30",
      opponent: "Azalea BK",
      showVs: true,
      color: "#FD5300",
    },
    {
      time: "Sönd 11.00",
      opponent: "Dalsjöfors GoIF",
      showVs: true,
      color: "#00A75D",
    },
    {
      time: "Sönd 13.00",
      opponent: "IF Väster",
      showVs: true,
      color: "#FD5300",
    },
  ],
  squad: [
    "Ariana Mati",
    "Cornelia Björklund",
    "Cornelia Dahlqvist",
    "Disa Bäckman",
    "Emma Bohman",
    "Ester Fahlström",
    "Evelina Borne",
    "Hanna Norrisson",
    "Iris Bergqvist",
    "Tuva Reitz",
  ],
  sponsors: ["Wattnord", "Itiden", "PG Bygg"],
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
