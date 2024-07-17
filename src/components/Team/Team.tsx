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
    // Q.현재 하나의 함수로 처리하고 있지만 그냥 각자의 handler가 있는게 더 효율적이라는 생각이 든다.
    const { name, value } = e.target;
    const date = new Date();

    if (name === "arrive" || name === "exit") {
      date.setHours(+value.slice(0, 2));
      date.setMinutes(+value.slice(3));
    }
    setTeamData({
      ...teamData,
      arriveTime: name === "arrive" ? date.getTime() : teamData.arriveTime,
      exitTime: name === "exit" ? date.getTime() : teamData.exitTime,
      member: name === "member" ? value : teamData.member,
      defaultDrink: name === "defaultDrink" ? value : teamData.defaultDrink,
      card: name === "card" ? parseInt(value.replace(",", "")) : teamData.card,
      cash: name === "cash" ? parseInt(value.replace(",", "")) : teamData.cash,
      point: {
        isTransfer:
          name === "isTransfer"
            ? !teamData.point.isTransfer
            : teamData.point.isTransfer,
        use:
          name === "point"
            ? parseInt(value.replace(",", ""))
            : teamData.point.use,
        cash:
          name === "cashPoint"
            ? parseInt(value.replace(",", ""))
            : teamData.point.cash,
        card:
          name === "cardPoint"
            ? parseInt(value.replace(",", ""))
            : teamData.point.card,
      },
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
  const handleExit = () => {
    dispatch(exit({ team: teamData }));
  };

  return (
    <Draggable draggableId={team.teamId} index={index}>
      {(provided) => (
        <div
          className={
            teamData.teamType === "cur" ? "TableTeam" : "Team quaterWidth"
          }
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
            <div
              style={{
                textAlign: "center",
                fontWeight: 600,
              }}
            >
              이용 내역
            </div>
            <div>
              <label>입장</label>
              <input
                style={{ minWidth: 100 }}
                type="time"
                name="arrive"
                value={getFormattedTime(teamData.arriveTime)}
                onChange={handleEditInput}
                onBlur={handleUpdateTeam}
              />
              {teamData.teamType === "exit" ? (
                <>
                  <label> ~ 퇴장</label>
                  <input
                    style={{ minWidth: 100 }}
                    type="time"
                    name="exit"
                    value={getFormattedTime(teamData.exitTime!)}
                    onChange={handleEditInput}
                    onBlur={handleUpdateTeam}
                  />
                </>
              ) : null}
            </div>
            <div>
              <label>인원</label>
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
              <label>기본 음료</label>
              <input
                type="text"
                name="defaultDrink"
                id=""
                value={teamData.defaultDrink}
                onChange={handleEditInput}
                onBlur={handleUpdateTeam}
              />
            </div>
            <div style={{ display: "flex" }}>
              <label>주문</label>
              <textarea
                name="orders"
                id=""
                spellCheck={false}
                value={teamData.orders}
                onChange={handleEditTextArea}
                onBlur={handleUpdateTeam}
              />
            </div>
            {teamData.teamType === "exit" ? (
              <>
                <div
                  style={{
                    textAlign: "center",
                    marginTop: "10px",
                    paddingTop: "10px",
                    fontWeight: 600,
                    borderTop: "1px dashed black",
                  }}
                >
                  결제 내역
                </div>
                <div>
                  <label>카드</label>
                  <input
                    type="text"
                    name="card"
                    id=""
                    value={teamData.card ? teamData.card.toLocaleString() : 0}
                    onChange={handleEditInput}
                    onBlur={handleUpdateTeam}
                    style={{ textAlign: "right" }}
                  />
                  원
                </div>
                <div>
                  <label>현금</label>
                  <input
                    type="text"
                    name="cash"
                    id=""
                    value={teamData.cash ? teamData.cash.toLocaleString() : 0}
                    onChange={handleEditInput}
                    onBlur={handleUpdateTeam}
                    style={{ textAlign: "right" }}
                  />
                  원
                </div>
                <div>
                  <label>포인트 충전</label>
                  <br />
                  카드{" "}
                  <input
                    type="text"
                    name="cardPoint"
                    id=""
                    value={
                      teamData.point.card
                        ? teamData.point.card.toLocaleString()
                        : 0
                    }
                    onChange={handleEditInput}
                    onBlur={handleUpdateTeam}
                    style={{ textAlign: "right" }}
                  />
                  p
                  <br />
                  현금{" "}
                  <input
                    type="text"
                    name="cashPoint"
                    id=""
                    value={
                      teamData.point.cash
                        ? teamData.point.cash.toLocaleString()
                        : 0
                    }
                    onChange={handleEditInput}
                    onBlur={handleUpdateTeam}
                    style={{ textAlign: "right" }}
                  />
                  p
                  <input
                    type="checkbox"
                    name="isTransfer"
                    id=""
                    checked={teamData.point.isTransfer}
                    onChange={handleEditInput}
                  />
                  이체
                </div>
                <div>
                  <label>사용 포인트</label>
                  <input
                    type="text"
                    name="point"
                    id=""
                    value={
                      teamData.point.use
                        ? teamData.point.use.toLocaleString()
                        : 0
                    }
                    onChange={handleEditInput}
                    onBlur={handleUpdateTeam}
                    style={{ textAlign: "right" }}
                  />
                  p
                </div>
              </>
            ) : null}
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
