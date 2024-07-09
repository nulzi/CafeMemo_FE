import React, { FC } from "react";
import Team from "../Team/Team";
import { ITable } from "../../types";
import AddButton from "../AddButton/AddButton";

type TTableProps = {
  table: ITable;
};

const Table: FC<TTableProps> = ({ table }) => {
  const { tableName, teams } = table;
  const defaultTable = [
    "1",
    "2",
    "3",
    "4",
    "4.5",
    "5",
    "6",
    "7",
    "8",
    "파티룸",
    "핑1",
    "핑2",
    "핑3",
  ];

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        rowGap: 5,
        // border: "solid 1px #0AE93B",
        borderRadius: 7,
        backgroundColor: "#4C4637",
        color: "white",
        padding: "10px 7px",
        width: "23%",
      }}
    >
      <div
        style={{
          textAlign: "center",
          fontWeight: "bold",
          fontSize: "18px",
          position: "relative",
        }}
      >
        {tableName}
        {defaultTable.includes(tableName) ? null : (
          <button
            style={{
              position: "absolute",
              right: 0,
              background: "none",
              color: "white",
            }}
          >
            X
          </button>
        )}
      </div>
      {teams.map((team) => (
        <Team key={team.teamId} team={team} />
      ))}
      <div style={{ textAlign: "center" }}>
        <AddButton type={"team"} teamType="cur" tableName={tableName} />
      </div>
    </div>
  );
};

export default Table;
