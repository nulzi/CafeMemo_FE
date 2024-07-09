import React, { ChangeEvent, FC, useState } from "react";
import { ITeam } from "../../types";
import { useTypedDispatch, useTypedSelector } from "../../hooks/redux";
import { deleteTeam, updateTeam } from "../../store/slices/tablesSlice";

type TTeamProps = {
  team: ITeam;
};

const Team: FC<TTeamProps> = ({ team }) => {
  // const style = {
  //   display: "flex",
  //   flexDirection: "column",
  //   // border: "solid 1px #0500FF",
  //   backgroundColor: "#FAD200",
  //   borderRadius: 3,
  //   color: "black",
  //   padding: "8px 5px",
  //   margin: "2px 3px",
  //   // flex: 1,
  // };
  const [teamData, setTeamData] = useState(team);
  const dispatch = useTypedDispatch();

  const handleEditInput = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setTeamData({
      ...teamData,
      time: name === "time" ? value : teamData.time,
      member: name === "member" ? value : teamData.member,
      defaultDrink: name === "defaultDrink" ? value : teamData.defaultDrink,
    });
  };
  const handleEditTextArea = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setTeamData({ ...teamData, orders: e.target.value });
  };
  const handleUpdateTeam = () => {
    dispatch(
      updateTeam({
        teamId: teamData.teamId,
        teamType: teamData.teamType,
        team: teamData,
      })
    );
  };
  const handleDeleteTeam = () => {
    dispatch(
      deleteTeam({
        teamId: teamData.teamId,
        teamType: teamData.teamType,
      })
    );
  };

  return (
    <div
      style={
        teamData.teamType === "cur"
          ? {
              display: "flex",
              flexDirection: "column",
              rowGap: 15,
              // border: "solid 1px #0500FF",
              backgroundColor: "#FAD200",
              borderRadius: 3,
              color: "black",
              padding: "12px 10px",
              margin: "3px 8px",
            }
          : {
              ...{
                display: "flex",
                flexDirection: "column",
                rowGap: 15,
                // border: "solid 1px #0500FF",
                backgroundColor: "#FAD200",
                borderRadius: 3,
                color: "black",
                padding: "12px 10px",
                margin: "2px 3px",
              },
              width: "22.5%",
            }
      }
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          rowGap: 5,
        }}
      >
        <div>
          <label>입장시간 : </label>
          <input
            type="time"
            name="time"
            id=""
            value={teamData.time}
            onChange={handleEditInput}
            onBlur={handleUpdateTeam}
          />
        </div>
        <div>
          <label>인원 : </label>
          <input
            type="text"
            name="member"
            id=""
            value={teamData.member}
            onChange={handleEditInput}
            onBlur={handleUpdateTeam}
          />
        </div>
        <div>
          <label>기본 음료 : </label>
          <input
            type="text"
            name="defaultDrink"
            id=""
            value={teamData.defaultDrink}
            onChange={handleEditInput}
            onBlur={handleUpdateTeam}
          />
        </div>
        <div>
          <label>주문 음식 : </label>
          <textarea
            name="orders"
            id=""
            value={team.orders}
            onChange={handleEditTextArea}
            onBlur={handleUpdateTeam}
          />
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "space-evenly" }}>
        <button onClick={handleDeleteTeam}>삭제하기</button>
        {teamData.teamType === "exit" ? null : <button>퇴장하기</button>}
      </div>
    </div>
  );
};

export default Team;
