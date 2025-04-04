import React, { FC } from "react";
import { useTypedDispatch } from "../../hooks/redux";
import { addTable, addTeam } from "../../store/slices/tablesSlice";
import { TTeamType } from "../../types";
import { HiSquaresPlus, HiUserPlus } from "react-icons/hi2";
import "./AddButton.css";

type TAddButtonProps = {
  type: string;
  teamType: TTeamType;
  tableId?: string;
};

const AddButton: FC<TAddButtonProps> = ({ type, teamType, tableId }) => {
  const dispatch = useTypedDispatch();

  const handleAddTable = () => {
    dispatch(
      addTable({
        tableId: `table-${Date.now()}`,
        // dnd를 위한 name 구분
        tableName: `new${Date.now()}`,
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
          pay: {
            isTransfer: false,
            cash: 0,
            card: 0,
          },
          point: {
            isTransfer: false,
            use: 0,
            cash: 0,
            card: 0,
          },
        },
        tableId,
      })
    );
  };

  return type === "team" ? (
    <div className="container add-team" onClick={handleAddTeam}>
      <HiUserPlus
        style={{
          width: "30px",
          height: "30px",
        }}
      />
    </div>
  ) : (
    <div className="container add-table">
      <HiSquaresPlus
        style={{
          width: "100%",
          height: "100%",
        }}
        onClick={handleAddTable}
      />
    </div>
  );
};

export default AddButton;
