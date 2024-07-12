export type TTeamType = "cur" | "wait" | "exit";

export interface ITeam {
  teamId: string;
  teamType: TTeamType;
  arriveTime: number;
  exitTime?: number;
  member: string;
  defaultDrink: string;
  orders: string;
}

export interface ITable {
  tableId: string;
  tableName: string;
  teams: ITeam[];
}
