import React, { FC, useEffect, useRef, useState } from "react";
import Team from "../Team/Team";
import AddButton from "../AddButton/AddButton";
import { ITeam, TTeamType } from "../../types";
import { HiDocumentDownload } from "react-icons/hi";
import { dropTargetForElements } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";

type TTeamContainerProps = {
  wait?: boolean;
  teams: ITeam[];
};

const TeamContainer: FC<TTeamContainerProps> = ({ wait, teams }) => {
  const dropTargetRef = useRef(null);
  const [isDraggedOver, setIsDraggedOver] = useState(false);

  useEffect(() => {
    const el = dropTargetRef.current;

    if (el) {
      return dropTargetForElements({
        element: el,
        getData: () => ({ tableName: wait ? "wait" : "exit" }),
        canDrop: ({ source }) => {
          const tableName = wait ? "wait" : "exit";

          if (tableName === "exit") {
            return false;
          }

          const teamType = source.data.teamType as TTeamType;

          if (tableName === teamType) {
            return false;
          }

          return true;
        },
        onDragEnter: () => setIsDraggedOver(true),
        onDragLeave: () => setIsDraggedOver(false),
        onDrop: () => setIsDraggedOver(false),
      });
    } else {
      console.error("error");
    }
  }, [wait, teams]);

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
      let pay = "";
      if (team.pay.card) pay += `${team.pay.card.toLocaleString()}원 카드 / `;
      if (team.pay.cash)
        pay += `${team.pay.cash.toLocaleString()}원 현금 ${
          team.pay.isTransfer ? "★계좌이체" : ""
        }/ `;
      if (team.point.use) pay += `${team.point.use.toLocaleString()}p 차감 / `;
      if (team.point.card)
        pay += `${team.point.card.toLocaleString()}p 카드충전 / `;
      if (team.point.cash)
        pay += `${team.point.cash.toLocaleString()}p 현금충전 ${
          team.point.isTransfer ? "★계좌이체" : ""
        }/ `;

      data += `\n${arriveTime.getHours()}:${arriveTime.getMinutes()}(${pay}${
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
    <div
      style={{
        // 퇴장에는 드래그를 할 일이 없다. '퇴장 버튼' 이용
        backgroundColor: isDraggedOver
          ? "#2c1f04"
          : wait
          ? "#A08F65"
          : "#B2AA99",
        borderRadius: 7,
        padding: 8,
        margin: "15px 0px",
        width: "100%",
        boxSizing: "border-box",
      }}
      ref={dropTargetRef}
    >
      <div style={{ position: "relative" }}>
        <h2 style={{ marginTop: 0, textAlign: "center", color: "#FDF9F0" }}>
          {wait ? "대기" : "퇴장"}
        </h2>
        {wait ? null : (
          <HiDocumentDownload
            style={{
              position: "absolute",
              top: 0,
              right: 0,
              width: 40,
              height: 40,
              cursor: "pointer",
            }}
            onClick={handleDownloadTextFile}
          />
        )}
      </div>
      {wait ? <AddButton type="team" teamType="wait" /> : null}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          rowGap: "10px",
          columnGap: "10px",
          height: "max-content",
          minWidth: 1163,
        }}
      >
        {teams.map((team) => (
          <Team
            key={team.teamId}
            team={team}
            tableName={wait ? "wait" : "exit"}
          />
        ))}
      </div>
    </div>
  );
};

export default TeamContainer;
