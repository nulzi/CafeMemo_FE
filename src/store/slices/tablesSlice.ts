import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ITable, ITeam, TTeamType } from "../../types";
import { setLocalData } from "../../utils/localStorage";
import { DEFAULT_TABLE } from "../../consts";

type TTable = {
  currentTables: ITable[];
  waitTeams: ITeam[];
  exitTeams: ITeam[];
};

type TChangeTableName = {
  tableId: string;
  tableName: string;
};

type TDeleteTable = {
  tableId: string;
};

type TAddTeam = {
  teamType: TTeamType;
  team: ITeam;
  tableId?: string;
};

type TUpdateTeam = {
  teamType: TTeamType;
  teamId: string;
  team: ITeam;
};

type TDeleteTeam = {
  teamType: TTeamType;
  teamId: string;
};

type TExit = {
  team: ITeam;
};

type TMoveTeam = {
  sourceTable: string;
  destinationTable: string;
  teamId: string;
};

const initialState: TTable = {
  currentTables: [],
  waitTeams: [],
  exitTeams: [],
};

const tablesSlice = createSlice({
  name: "table",
  initialState,
  reducers: {
    init: (state) => {
      state.currentTables = DEFAULT_TABLE;
      setLocalData("initialState", JSON.stringify(DEFAULT_TABLE));
    },
    changeTableName: (state, { payload }: PayloadAction<TChangeTableName>) => {
      state.currentTables = state.currentTables.map((table) =>
        table.tableId === payload.tableId
          ? { ...table, tableName: payload.tableName }
          : table
      );
    },
    addTable: (state, { payload }: PayloadAction<ITable>) => {
      state.currentTables.push(payload);
    },
    deleteTable: (state, { payload }: PayloadAction<TDeleteTable>) => {
      state.currentTables = state.currentTables.filter(
        (table) => table.tableId !== payload.tableId
      );
    },
    addTeam: (state, { payload }: PayloadAction<TAddTeam>) => {
      payload.teamType === "cur"
        ? state.currentTables.map((table) =>
            table.tableId === payload.tableId
              ? {
                  ...table,
                  teams: table.teams.push(payload.team),
                }
              : table
          )
        : payload.teamType === "wait"
        ? state.waitTeams.push(payload.team)
        : state.exitTeams.push(payload.team);
    },
    updateTeam: (state, { payload }: PayloadAction<TUpdateTeam>) => {
      payload.teamType === "cur"
        ? (state.currentTables = state.currentTables.map((table) => ({
            ...table,
            teams: table.teams.map((team) =>
              team.teamId === payload.teamId ? payload.team : team
            ),
          })))
        : payload.teamType === "wait"
        ? (state.waitTeams = state.waitTeams.map((team) =>
            team.teamId === payload.teamId ? payload.team : team
          ))
        : (state.exitTeams = state.exitTeams.map((team) =>
            team.teamId === payload.teamId ? payload.team : team
          ));
    },
    deleteTeam: (state, { payload }: PayloadAction<TDeleteTeam>) => {
      payload.teamType === "cur"
        ? (state.currentTables = state.currentTables.map((table) => ({
            ...table,
            teams: table.teams.filter((team) => team.teamId !== payload.teamId),
          })))
        : payload.teamType === "wait"
        ? (state.waitTeams = state.waitTeams.filter(
            (team) => team.teamId !== payload.teamId
          ))
        : (state.exitTeams = state.exitTeams.filter(
            (team) => team.teamId !== payload.teamId
          ));
    },
    exit: (state, { payload }: PayloadAction<TExit>) => {
      payload.team.teamType === "cur"
        ? (state.currentTables = state.currentTables.map((table) => ({
            ...table,
            teams: table.teams.filter(
              (team) => team.teamId !== payload.team.teamId
            ),
          })))
        : (state.waitTeams = state.waitTeams.filter(
            (team) => team.teamId !== payload.team.teamId
          ));
      state.exitTeams.push({
        ...payload.team,
        teamType: "exit",
        exitTime: Date.now(),
      });
      state.exitTeams.sort((a, b) => b.exitTime! - a.exitTime!);
    },
    moveTeam: (state, { payload }: PayloadAction<TMoveTeam>) => {
      /**
       * sourceTable에서 옮길 팀 find
       * destinationTable에 옮길 팀 push & sort(입장 시간순)
       * sourceTable에서 옮길 팀 filter
       */
      const { sourceTable, destinationTable, teamId } = payload;
      let draggedTeam;
      const addTeam2Table = (destination: string, team: ITeam) => {
        switch (destination) {
          case "wait":
            state.waitTeams.push({ ...team, teamType: "wait" });
            state.waitTeams.sort(
              (teamA, teamB) => teamA.arriveTime - teamB.arriveTime
            );
            break;
          default:
            state.currentTables.some((table) => {
              if (table.tableName === destination) {
                table.teams.push({ ...team, teamType: "cur" });
                table.teams.sort(
                  (teamA, teamB) => teamA.arriveTime - teamB.arriveTime
                );
                return true;
              }

              return false;
            });
        }
      };
      const deleteTeamFromTable = (source: string) => {
        switch (source) {
          case "wait":
            state.waitTeams = state.waitTeams.filter(
              (team) => team.teamId !== teamId
            );
            break;
          case "exit":
            state.exitTeams = state.exitTeams.filter(
              (team) => team.teamId !== teamId
            );
            break;
          default:
            state.currentTables.some((table) => {
              if (table.tableName === source) {
                table.teams = table.teams.filter(
                  (team) => team.teamId !== teamId
                );
                return true;
              }
              return false;
            });
        }
      };

      if (sourceTable === "wait") {
        draggedTeam = state.waitTeams.find((team) => team.teamId === teamId);
      } else if (sourceTable === "exit") {
        draggedTeam = state.exitTeams.find((team) => team.teamId === teamId);
      } else {
        draggedTeam = state.currentTables
          .find((table) => table.tableName === sourceTable)
          ?.teams.find((team) => team.teamId === teamId);
      }

      if (draggedTeam) {
        addTeam2Table(destinationTable, draggedTeam);
        deleteTeamFromTable(sourceTable);
      }
    },
  },
});

export const {
  init,
  changeTableName,
  addTable,
  deleteTable,
  addTeam,
  updateTeam,
  deleteTeam,
  exit,
  moveTeam,
} = tablesSlice.actions;
export const tablesReducer = tablesSlice.reducer;
