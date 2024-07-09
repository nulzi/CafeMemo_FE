import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ITable, ITeam, TTeamType } from "../../types";

type TTable = {
  currentTables: ITable[];
  waitTeams: ITeam[];
  exitTeams: ITeam[];
};

type TAddTeam = {
  teamType: TTeamType;
  team: ITeam;
  tableName?: string;
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

const initialState: TTable = {
  currentTables: [
    {
      tableId: "table-0",
      tableName: "1",
      teams: [
        {
          teamId: "team-0",
          teamType: "cur",
          time: "10:30",
          member: "눌지 외 어른1",
          defaultDrink: "아아",
          orders: "참치1",
        },
        {
          teamId: "team-1",
          teamType: "cur",
          time: "10:35",
          member: "눌자 외 어른1",
          defaultDrink: "시그",
          orders: "치탕1",
        },
      ],
    },
    {
      tableId: "table-1",
      tableName: "2",
      teams: [],
    },
    {
      tableId: "table-13",
      tableName: "2.5",
      teams: [],
    },
    {
      tableId: "table-2",
      tableName: "3",
      teams: [],
    },
    {
      tableId: "table-3",
      tableName: "4",
      teams: [],
    },
    {
      tableId: "table-4",
      tableName: "4.5",
      teams: [],
    },
    {
      tableId: "table-5",
      tableName: "5",
      teams: [],
    },
    {
      tableId: "table-6",
      tableName: "6",
      teams: [],
    },
    {
      tableId: "table-7",
      tableName: "7",
      teams: [],
    },
    {
      tableId: "table-8",
      tableName: "8",
      teams: [],
    },
    {
      tableId: "table-9",
      tableName: "파티룸",
      teams: [],
    },
    {
      tableId: "table-10",
      tableName: "핑1",
      teams: [],
    },
    {
      tableId: "table-11",
      tableName: "핑2",
      teams: [],
    },
    {
      tableId: "table-12",
      tableName: "핑3",
      teams: [],
    },
  ],
  waitTeams: [
    {
      teamId: "team-2",
      teamType: "wait",
      time: "11:20",
      member: "놀지 외 어른1",
      defaultDrink: "아아",
      orders: "",
    },
  ],
  exitTeams: [
    {
      teamId: "team-3",
      teamType: "exit",
      time: "12:30",
      member: "날지 외 어른1",
      defaultDrink: "아아",
      orders: "파스타1",
    },
  ],
};

const tablesSlice = createSlice({
  name: "table",
  initialState,
  reducers: {
    addTable: () => {},
    deleteTable: () => {},
    addTeam: (state, { payload }: PayloadAction<TAddTeam>) => {
      payload.teamType === "cur"
        ? state.currentTables.map((table) =>
            table.tableName === payload.tableName
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
    exit: () => {},
  },
});

export const { addTable, deleteTable, addTeam, updateTeam, deleteTeam, exit } =
  tablesSlice.actions;
export const tablesReducer = tablesSlice.reducer;
