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
  eventName: "KKIF-dagen",
  date: "Lördag",
  field: "Klarebergsvallen",
  logoUrl: "https://www.karrakif.se/im/hemsidaLogga/2056/60268/_genLogga.png",
  teams: [
    {
      name: "Kärra 1",
      color: TeamColors.blue,
      matches: [
        // Lördag
        {
          time: "10.30",
          opponent: "P17",
          showVs: true,
          color: "#FFD200",
        },
        {
          time: "11.00",
          opponent: "Herrjunior Yngre",
          showVs: true,
          color: "#005FA9",
        },
        {
          time: "12.15",
          opponent: "P19",
          showVs: true,
          color: "#FFD200",
        },
        // Söndag
        {
          time: "12.45",
          opponent: "P13",
          showVs: true,
          color: "#005FA9",
        },
      ],
      squad: [
        "Aleah Bublica",
        "Alva Eriksson-Påls",
        "Bao An Nguyen",
        "Cornelia Björklund",
        "Cornelia Dahlqvist",
        "Disa Bäckman",
        "Emma Bohman",
        "Iris Bergqvist",
        "Nadja Nisavic Deeb",
        "Vanessa Diniute",
      ],
    },
    {
      name: "Kärra 2",
      color: TeamColors.yellow,
      matches: [
        // Lördag
        {
          time: "11.15",
          opponent: "P14",
          showVs: true,
          color: "#FFD200",
        },
        {
          time: "12.00",
          opponent: "P18",
          showVs: true,
          color: "#005FA9",
        },
        {
          time: "12.45",
          opponent: "P16",
          showVs: true,
          color: "#FFD200",
        },
        {
          time: "13.15",
          opponent: "P12",
          showVs: true,
          color: "#005FA9",
        },
      ],
      squad: [
        "Ariana Mati",
        "Astrid Bergsten",
        "Emma Flygare",
        "Emma Yuan",
        "Ester Fahlström",
        "Hanna Norrisson",
        "Leah Friis",
        "Lilia Miqdad",
        "Tuva Reitz",
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
