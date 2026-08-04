import { FunctionComponent } from "react";
import { AbsoluteFill, Sequence } from "remotion";
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
  field: string;
  logoUrl: string;
  surface: SurfaceTheme;
  teams: TeamData[];
  squad?: string[] | null;
  sponsors: string[];
}

// All changeable data for the video
export const data: MainVideoData = {
  eventName: "Göteborg Beachfestival",
  date: "Fredag",
  field: "Göteborg Beach Arena",
  logoUrl: "https://www.karrakif.se/im/hemsidaLogga/2056/60268/_genLogga.png",
  surface: "sand",
  squad: [
    "Ariana Mati",
    "Cornelia Björklund",
    "Cornelia Dahlqvist",
    "Emma Bohman",
    "Emma Flygare",
    "Ester Fahlström",
    "Evelina Borne",
    "Hanna Norrisson",
    "Iris Bergqvist",
    "Lilia Miqdad",
    "Livia Reitz",
    "Melina Mati",
    "Tuva Reitz",
    "Vanessa Diniute",
  ],
  teams: [
    {
      name: "Kärra Blå",
      color: TeamColors.blue,
      matches: [
        {
          time: "15:40",
          opponent: "Finlandia/Pallo AIF",
          showVs: true,
          color: "#005CB9",
        },
        {
          time: "16:40",
          opponent: "Lindome GIF 1",
          showVs: true,
          color: "#000000",
        },
        {
          time: "18:00",
          opponent: "IK Zenith",
          showVs: true,
          color: "#00904A",
        },
        {
          time: "18:40",
          opponent: "Lindome GIF 2",
          showVs: true,
          color: "#000000",
        },
        {
          time: "21:00",
          opponent: "Lindome GIF 2",
          showVs: true,
          color: "#000000",
        },
      ],
      squad: null,
    },
    {
      name: "Kärra Gul",
      color: TeamColors.yellow,
      matches: [
        {
          time: "15:40",
          opponent: "Lindome GIF 2",
          showVs: true,
          color: "#000000",
        },
        {
          time: "16:40",
          opponent: "IK Zenith",
          showVs: true,
          color: "#00904A",
        },
        {
          time: "18:00",
          opponent: "Finlandia/Pallo AIF",
          showVs: true,
          color: "#005CB9",
        },
        {
          time: "19:00",
          opponent: "Lindome GIF 1",
          showVs: true,
          color: "#000000",
        },
        {
          time: "20:40",
          opponent: "Lindome GIF 1",
          showVs: true,
          color: "#000000",
        },
      ],
      squad: null,
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
          field={data.field}
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
