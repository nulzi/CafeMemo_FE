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
          cash: 0,
          card: 0,
          point: {
            isTransfer: false,
            use: 0,
            cash: 0,
            card: 0,
          },
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
