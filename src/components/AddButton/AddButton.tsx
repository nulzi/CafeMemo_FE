import React, { FC } from "react";
import { useTypedDispatch } from "../../hooks/redux";
import { addTable, addTeam } from "../../store/slices/tablesSlice";
import { TTeamType } from "../../types";

type TAddButtonProps = {
  type: string;
  teamType: TTeamType;
  tableName?: string;
};

const AddButton: FC<TAddButtonProps> = ({ type, teamType, tableName }) => {
  const dispatch = useTypedDispatch();

  const addZero = (time: number) => {
    return time < 10 ? "0" + time : time;
  };
  const handleAddTable = () => {
    dispatch(
      addTable({
        tableId: Date.now().toString(),
        tableName: "new",
        teams: [],
      })
    );
  };
  const handleAddTeam = () => {
    const date = new Date();

    dispatch(
      addTeam({
        teamType,
        team: {
          teamId: `team-${date}`,
          teamType,
          time: `${addZero(date.getHours())}:${addZero(date.getMinutes())}`,
          member: "",
          defaultDrink: "",
          orders: "",
        },
        tableName,
      })
    );
  };

  return (
    <div>
      <button onClick={type === "team" ? handleAddTeam : handleAddTable}>
        add {type}
      </button>
    </div>
  );
};

export default AddButton;
