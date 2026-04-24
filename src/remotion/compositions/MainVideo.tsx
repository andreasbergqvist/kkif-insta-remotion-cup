import { FunctionComponent } from "react";
import { AbsoluteFill, Sequence } from "remotion";
import { SponsorsScreen } from "../screens/SponsorsScreen";
import { BackgroundTexture } from "../components/BackgroundTexture";
import { IntroScreen } from "../screens/IntroScreen";
import { MatchesScreen } from "../screens/MatchesScreen";
import { SquadScreen } from "../screens/SquadScreen";
import { TeamColors } from "../theme/colors";

export interface MatchData {
  time: string;
  opponent: string;
  showVs: boolean;
  color: string;
}

export interface TeamData {
  name: string;
  color: string;
  matches: MatchData[];
  squad: string[];
}

export interface MainVideoData {
  eventName: string;
  date: string;
  field: string;
  logoUrl: string;
  teams: TeamData[];
  sponsors: string[];
}

// All changeable data for the video
export const data: MainVideoData = {
  eventName: "Giffcupen",
  date: "Lörd-sönd",
  field: "Tidaholm",
  logoUrl: "https://www.karrakif.se/im/hemsidaLogga/2056/60268/_genLogga.png",
  teams: [
    {
      name: "Kärra Blå",
      color: TeamColors.blue,
      matches: [
        // Lördag
        {
          time: "Lörd 13.00",
          opponent: "IF Väster",
          showVs: true,
          color: "#e25c2f",
        },
        {
          time: "Lörd 15.00",
          opponent: "RIK Karlskoga",
          showVs: true,
          color: "#e50810",
        },
        {
          time: "Lörd 17.00",
          opponent: "Azalea BK",
          showVs: true,
          color: "#ff5400",
        },
        // Söndag
        {
          time: "Sönd 08.00",
          opponent: "Habo IF",
          showVs: true,
          color: "#0e619a",
        },
        {
          time: "Sönd 10.00",
          opponent: "IF Hallby",
          showVs: true,
          color: "#1d4d92",
        },
        {
          time: "Sönd 12.00",
          opponent: "Skövde AIK",
          showVs: true,
          color: "#da292a",
        },
      ],
      squad: [
        "Cornelia Björklund",
        "Cornelia Dahlqvist",
        "Emma Bohman",
        "Evelina Borne",
        "Hanna Norrisson",
        "Iris Bergqvist",
        "Lilia Miqdad",
      ],
    },
    {
      name: "Kärra Gul",
      color: TeamColors.yellow,
      matches: [
        // Lördag
        {
          time: "Lörd 14.30",
          opponent: "IF Väster",
          showVs: true,
          color: "#e25c2f",
        },
        {
          time: "Lörd 16.30",
          opponent: "Torslanda IK",
          showVs: true,
          color: "#e23d28",
        },
        {
          time: "Lörd 18.30",
          opponent: "Skövde AIK",
          showVs: true,
          color: "#da292a",
        },
        // Söndag
        {
          time: "Sönd 14.30",
          opponent: "Habo IF",
          showVs: true,
          color: "#0e619a",
        },
        {
          time: "Sönd 15.15",
          opponent: "Habo IF",
          showVs: true,
          color: "#0e619a",
        },
        {
          time: "Sönd 16.30",
          opponent: "Falköpings KIK",
          showVs: true,
          color: "#e42822",
        },
      ],
      squad: [
        "Ariana Mati",
        "Astrid Bergsten",
        "Disa Bäckman",
        "Emma Flygare",
        "Emma Yuan",
        "Ester Fahlström",
        "Tuva Reitz",
        "Vanessa Diniute",
      ],
    },
  ],
  sponsors: ["Wattnord", "Itiden", "PG Bygg"],
};

export const SCREEN_DURATION = 120;
export const SQUAD_SCREEN_DURATION = 180;

// Calculate total duration based on whether sponsors exist
export const calculateDuration = (videoData: MainVideoData) => {
  const teamsDuration = videoData.teams.reduce((total) => {
    return total + SCREEN_DURATION * 1.5 + SQUAD_SCREEN_DURATION;
  }, 0);

  const baseDuration = SCREEN_DURATION + teamsDuration;
  return videoData.sponsors && videoData.sponsors.length > 0
    ? baseDuration + SCREEN_DURATION
    : baseDuration;
};

export const MainVideo: FunctionComponent = () => {
  const introStart = 0;
  const teamSequenceStart = introStart + SCREEN_DURATION;

  const teamsTotalDuration = data.teams.reduce((total) => {
    return total + SCREEN_DURATION * 1.5 + SQUAD_SCREEN_DURATION;
  }, 0);

  const sponsorsStart = teamSequenceStart + teamsTotalDuration;

  return (
    <AbsoluteFill className="bg-black">
      <BackgroundTexture />
      {/* 1. Intro screen */}
      <Sequence durationInFrames={SCREEN_DURATION} from={introStart}>
        <IntroScreen
          eventName={data.eventName}
          date={data.date}
          logoUrl={data.logoUrl}
          field={data.field}
        />
      </Sequence>

      {data.teams.map((team, index) => {
        const teamStart =
          teamSequenceStart +
          index * (SCREEN_DURATION * 1.5 + SQUAD_SCREEN_DURATION);

        return (
          <Sequence
            key={team.name}
            durationInFrames={SCREEN_DURATION * 1.5 + SQUAD_SCREEN_DURATION}
            from={teamStart}
          >
            {/* 2. Matches screen (per team) */}
            <Sequence durationInFrames={SCREEN_DURATION * 1.5}>
              <MatchesScreen matches={team.matches} teamName={team.name} />
            </Sequence>
            {/* 3. Squad screen (per team) */}
            <Sequence
              durationInFrames={SQUAD_SCREEN_DURATION}
              from={SCREEN_DURATION * 1.5}
            >
              <SquadScreen
                squad={team.squad}
                teamName={team.name}
                teamColor={team.color}
              />
            </Sequence>
          </Sequence>
        );
      })}

      {/* 4. Sponsors screen (optional) */}
      {data.sponsors && data.sponsors.length > 0 && (
        <Sequence durationInFrames={SCREEN_DURATION} from={sponsorsStart}>
          <SponsorsScreen sponsors={data.sponsors} />
        </Sequence>
      )}
    </AbsoluteFill>
  );
};
