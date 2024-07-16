import React, { ChangeEvent, FC, useState } from "react";
import { ITeam } from "../../types";
import { useTypedDispatch } from "../../hooks/redux";
import { deleteTeam, exit, updateTeam } from "../../store/slices/tablesSlice";
import { getFormattedTime } from "../../utils/time";
import { Draggable } from "react-beautiful-dnd";
import "./Team.css";

type TTeamProps = {
  team: ITeam;
  index: number;
};

const Team: FC<TTeamProps> = ({ team, index }) => {
  const [teamData, setTeamData] = useState(team);
  const dispatch = useTypedDispatch();

  const handleEditInput = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const date = new Date();

    if (name === "time") {
      date.setHours(+value.slice(0, 2));
      date.setMinutes(+value.slice(3));
    }
    setTeamData({
      ...teamData,
      arriveTime: name === "time" ? date.getTime() : teamData.arriveTime,
      member: name === "member" ? value : teamData.member,
      defaultDrink: name === "defaultDrink" ? value : teamData.defaultDrink,
    });
  };
  const handleEditTextArea = (e: ChangeEvent<HTMLTextAreaElement>) => {
    console.log(e.target.value);
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
  const handleExit = () => {
    dispatch(exit({ team: teamData }));
  };

  return (
    <Draggable draggableId={team.teamId} index={index}>
      {(provided) => (
        <div
          className={teamData.teamType === "cur" ? "Team" : "Team quaterWidth"}
          ref={provided.innerRef}
          {...provided.dragHandleProps}
          {...provided.draggableProps}
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
                style={{ minWidth: 100 }}
                type="time"
                name="time"
                id=""
                value={getFormattedTime(teamData.arriveTime)}
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
                value={teamData.orders}
                onChange={handleEditTextArea}
                onBlur={handleUpdateTeam}
              />
            </div>
          </div>
          <div style={{ display: "flex", justifyContent: "space-evenly" }}>
            <button onClick={handleDeleteTeam}>삭제하기</button>
            {teamData.teamType === "exit" ? null : (
              <button onClick={handleExit}>퇴장하기</button>
            )}
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default Team;
