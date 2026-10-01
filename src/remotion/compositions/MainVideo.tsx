import { FunctionComponent } from "react";
import { AbsoluteFill, Sequence, staticFile } from "remotion";
import { SponsorsScreen } from "../screens/SponsorsScreen";
import { BackgroundTexture } from "../components/BackgroundTexture";
import { IntroScreen } from "../screens/IntroScreen";
import { MatchesScreen } from "../screens/MatchesScreen";
import { SquadScreen } from "../screens/SquadScreen";
import { TeamColors } from "../theme/colors";
import { SurfaceTheme } from "../components/BackgroundTexture";

export interface MatchData {
  time: string;
  opponent: string;
  showVs: boolean;
  color: string;
  location: string;
}

export interface TeamData {
  name: string;
  color: string;
  matches: MatchData[];
  squad?: string[] | null;
}

export interface MainVideoData {
  eventName: string;
  date: string;
  logoUrl: string;
  surface: SurfaceTheme;
  teams: TeamData[];
  squad?: string[] | null;
  sponsors: string[];
}

// All changeable data for the video
export const data: MainVideoData = {
  eventName: "Borås Arena Cup",
  date: "Lördag",
  logoUrl: staticFile("karra-kif-logo.webp"),
  surface: "grass",
  teams: [
    {
      name: "Kärra Gul",
      color: TeamColors.yellow,
      matches: [
        {
          time: "09:40",
          opponent: "Hestrafors",
          showVs: true,
          color: "#005CB9",
          location: "Borås Arena 2C",
        },
        {
          time: "11:40",
          opponent: "Falköping",
          showVs: true,
          color: "#00904A",
          location: "Ryavallen C",
        },
        {
          time: "12:20",
          opponent: "Vara",
          showVs: true,
          color: "#005CB9",
          location: "Ryavallen C",
        },
        {
          time: "14:00-",
          opponent: "Omspelningsmatcher",
          showVs: false,
          color: "#000000",
          location: "Borås Arena / Ryavallen / Ryda Fotbollshall",
        },
      ],
      squad: [
        "Alva Eriksson-Påls",
        "Cornelia Björklund",
        "Emma Bohman",
        "Emma Yman",
        "Ester Fahlström",
        "Evelina Borne",
        "Nova Gonzales",
        "Tuva Reitz",
      ],
    },
    {
      name: "Kärra Blå",
      color: TeamColors.blue,
      matches: [
        {
          time: "10:20",
          opponent: "Råda",
          showVs: true,
          color: "#00904A",
          location: "Borås Arena A",
        },
        {
          time: "12:00",
          opponent: "Ulricehamn",
          showVs: true,
          color: "#005CB9",
          location: "Ryavallen C",
        },
        {
          time: "12:40",
          opponent: "Frändefors",
          showVs: true,
          color: "#000000",
          location: "Ryavallen C",
        },
        {
          time: "14:00-",
          opponent: "Omspelningsmatcher",
          showVs: false,
          color: "#000000",
          location: "Borås Arena / Ryavallen / Ryda Fotbollshall",
        },
      ],
      squad: [
        "Ajla Duzel",
        "Cornelia Dahlqvist",
        "Disa Bäckman",
        "Hanna Norrisson",
        "Iris Bergqvist",
        "Leah Friis",
        "Lilia Miqdad",
        "Minahil Mohsan Imtiaz",
        "Vanessa Diniute",
      ],
    },
  ],
  sponsors: ["Wattnord", "Itiden", "PG Bygg"],
};

export const SCREEN_DURATION = 120;
export const SQUAD_SCREEN_DURATION = 180;

const getTeamDuration = (team: TeamData) =>
  SCREEN_DURATION * 1.5 + (team.squad != null ? SQUAD_SCREEN_DURATION : 0);

// Calculate total duration based on whether sponsors exist
export const calculateDuration = (videoData: MainVideoData) => {
  const teamsDuration = videoData.teams.reduce(
    (total, team) => total + getTeamDuration(team),
    0,
  );

  const squadDuration = videoData.squad != null ? SQUAD_SCREEN_DURATION : 0;
  const baseDuration = SCREEN_DURATION + teamsDuration + squadDuration;
  return videoData.sponsors && videoData.sponsors.length > 0
    ? baseDuration + SCREEN_DURATION
    : baseDuration;
};

export const MainVideo: FunctionComponent = () => {
  const introStart = 0;
  const teamSequenceStart = introStart + SCREEN_DURATION;

  const teamsTotalDuration = data.teams.reduce(
    (total, team) => total + getTeamDuration(team),
    0,
  );

  const squadStart = teamSequenceStart + teamsTotalDuration;
  const sponsorsStart =
    squadStart + (data.squad != null ? SQUAD_SCREEN_DURATION : 0);

  return (
    <AbsoluteFill className="bg-black">
      <BackgroundTexture />
      {/* 1. Intro screen */}
      <Sequence durationInFrames={SCREEN_DURATION} from={introStart}>
        <IntroScreen
          eventName={data.eventName}
          date={data.date}
          logoUrl={data.logoUrl}
          surface={data.surface}
        />
      </Sequence>

      {data.teams.map((team, index) => {
        const teamStart =
          teamSequenceStart +
          data.teams
            .slice(0, index)
            .reduce(
              (total, previousTeam) => total + getTeamDuration(previousTeam),
              0,
            );
        const teamDuration = getTeamDuration(team);

        return (
          <Sequence
            key={team.name}
            durationInFrames={teamDuration}
            from={teamStart}
          >
            {/* 2. Matches screen (per team) */}
            <Sequence durationInFrames={SCREEN_DURATION * 1.5}>
              <MatchesScreen
                matches={team.matches}
                teamName={team.name}
                surface={data.surface}
              />
            </Sequence>
            {/* 3. Squad screen (per team, optional) */}
            {team.squad != null && (
              <Sequence
                durationInFrames={SQUAD_SCREEN_DURATION}
                from={SCREEN_DURATION * 1.5}
              >
                <SquadScreen
                  squad={team.squad}
                  teamName={team.name}
                  teamColor={team.color}
                  surface={data.surface}
                />
              </Sequence>
            )}
          </Sequence>
        );
      })}

      {/* 4. Squad screen (whole cup, optional) */}
      {data.squad != null && (
        <Sequence durationInFrames={SQUAD_SCREEN_DURATION} from={squadStart}>
          <SquadScreen squad={data.squad} surface={data.surface} />
        </Sequence>
      )}

      {/* 5. Sponsors screen (optional) */}
      {data.sponsors && data.sponsors.length > 0 && (
        <Sequence durationInFrames={SCREEN_DURATION} from={sponsorsStart}>
          <SponsorsScreen sponsors={data.sponsors} surface={data.surface} />
        </Sequence>
      )}
    </AbsoluteFill>
  );
};
