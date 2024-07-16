import React, { FC } from "react";
import Table from "../Table/Table";
import AddButton from "../AddButton/AddButton";
import { ITable } from "../../types";

type TTablesContainerProps = {
  tables: ITable[];
};

const TablesContainer: FC<TTablesContainerProps> = ({ tables }) => {
  return (
    <div
      style={{
        width: "100%",
      }}
    >
      <h3 style={{ marginTop: 0, paddingTop: "1em" }}>현재 테이블</h3>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "10px 1%",
          // border: "solid 1px red",
          height: "max-content",
          padding: "20px 7px 30px 10px",
          minWidth: 1163,
          // width: 1170,
        }}
      >
        {tables.map((table) => (
          <Table key={table.tableId} table={table} />
        ))}
        <div>
          <AddButton type={"table"} teamType="exit" />
        </div>
      </div>
    </div>
  );
};

export default TablesContainer;
