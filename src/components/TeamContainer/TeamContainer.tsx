import React, { FC } from "react";
import Team from "../Team/Team";
import AddButton from "../AddButton/AddButton";
import { ITeam } from "../../types";
import { Droppable } from "react-beautiful-dnd";

type TTeamContainerProps = {
  wait?: boolean;
  teams: ITeam[];
};

const TeamContainer: FC<TTeamContainerProps> = ({ wait, teams }) => {
  const handleDownloadTextFile = () => {
    const date = new Date();
    const curDate = `${date.getFullYear()}.${
      date.getMonth() + 1
    }.${date.getDate()}`;
    let data = "";

    data += curDate + `\n`;
    data += "=".repeat(30);
    teams.forEach((team) => {
      const arriveTime = new Date(team.arriveTime);
      data += `\n${arriveTime.getHours()}:${arriveTime.getMinutes()}(${
        team.defaultDrink
      })\n${team.member}\n`;
      if (team.orders) data += `${team.orders}\n`;
      data += "-".repeat(50);
    });

    if (data !== "") {
      const blob = new Blob([data], { type: "text/plain;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = curDate + ".txt";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } else {
      alert("data 생성에 실패했습니다.");
    }
  };

  return (
    <Droppable droppableId={wait ? "waitTeams" : "exitTeams"}>
      {(provided) => (
        <div
          style={{
            backgroundColor: wait ? "#A08F65" : "#B2AA99",
            borderRadius: 7,
            padding: 8,
            margin: "15px 0px",
            width: "100%",
            boxSizing: "border-box",
          }}
          ref={provided.innerRef}
          {...provided.droppableProps}
        >
          <div style={{ position: "relative" }}>
            <h2 style={{ marginTop: 0, textAlign: "center", color: "#FDF9F0" }}>
              {wait ? "대기" : "퇴장"}
            </h2>
            {wait ? null : (
              <button
                style={{ position: "absolute", top: 0, right: 0 }}
                onClick={handleDownloadTextFile}
              >
                텍스트 파일로 다운로드
              </button>
            )}
          </div>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              rowGap: "10px",
              columnGap: "10px",
              // border: "solid 1px red",
              height: "max-content",
              minWidth: 1163,
            }}
          >
            {teams.map((team, i) => (
              <Team key={team.teamId} team={team} index={i} />
            ))}
            {provided.placeholder}
            {wait ? <AddButton type="team" teamType="wait" /> : null}
          </div>
        </div>
      )}
    </Droppable>
  );
};

export default TeamContainer;
