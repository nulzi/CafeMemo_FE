import React, { FC } from "react";
import Team from "../Team/Team";
import AddButton from "../AddButton/AddButton";
import { ITeam } from "../../types";

type TTeamContainerProps = {
  wait?: boolean;
  teams: ITeam[];
};

const TeamContainer: FC<TTeamContainerProps> = ({ wait, teams }) => {
  const waiting = [1, 2, 3, 4, 5, 6];
  const exit = [1, 2, 3, 4, 5, 6, 7];

  return (
    <div
      style={{
        backgroundColor: "#A08F65",
        borderRadius: 7,
        padding: 8,
        margin: "15px 0px",
        width: "100%",
        boxSizing: "border-box",
      }}
    >
      <h3 style={{ marginTop: 0 }}>{wait ? "대기" : "퇴장"}</h3>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          rowGap: "10px",
          columnGap: "10px",
          border: "solid 1px red",
          height: "max-content",
          minWidth: 1163,
          // backgroundColor: "#A08F65",
          // borderRadius: 7,
          // padding: 10,
          // width: 1170,
        }}
      >
        {teams.map((team) => (
          <Team key={team.teamId} team={team} />
        ))}
        {wait ? <AddButton type="team" teamType="wait" /> : null}
      </div>
    </div>
  );
};

export default TeamContainer;
