import React, { FC } from "react";
import { useTypedDispatch } from "../../hooks/redux";
import { addTable, addTeam } from "../../store/slices/tablesSlice";
import { TTeamType } from "../../types";
import { getFormattedTime } from "../../utils/time";

type TAddButtonProps = {
  type: string;
  teamType: TTeamType;
  tableName?: string;
};

const AddButton: FC<TAddButtonProps> = ({ type, teamType, tableName }) => {
  const dispatch = useTypedDispatch();

  const handleAddTable = () => {
    dispatch(
      addTable({
        tableId: `table-${Date.now()}`,
        tableName: "new",
        teams: [],
      })
    );
  };
  const handleAddTeam = () => {
    dispatch(
      addTeam({
        teamType,
        team: {
          teamId: `team-${Date.now()}`,
          teamType,
          arriveTime: Date.now(),
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
