import React, {
  ChangeEvent,
  FC,
  FocusEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import Team from "../Team/Team";
import { ITable } from "../../types";
import AddButton from "../AddButton/AddButton";
import { useTypedDispatch } from "../../hooks/redux";
import { changeTableName, deleteTable } from "../../store/slices/tablesSlice";
import { dropTargetForElements } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import { DEFAULT_TABLE } from "../../consts";

type TTableProps = {
  table: ITable;
};

const Table: FC<TTableProps> = ({ table }) => {
  const dispatch = useTypedDispatch();
  const { tableId, teams } = table;
  const [isChange, setIsChange] = useState(false);
  const [tableName, setTableName] = useState(table.tableName);
  const dropTargetRef = useRef(null);
  const [isDraggedOver, setIsDraggedOver] = useState(false);

  useEffect(() => {
    const el = dropTargetRef.current;

    if (el) {
      return dropTargetForElements({
        element: el,
        getData: () => ({ tableName }),
        canDrop: ({ source }) => {
          if (source.data.tableName === tableName) return false;
          return true;
        },
        onDragEnter: () => setIsDraggedOver(true),
        onDragLeave: () => setIsDraggedOver(false),
        onDrop: () => setIsDraggedOver(false),
      });
    } else {
      console.error("error");
    }
  }, [tableName, teams]);

  const appearInput = () => {
    if (DEFAULT_TABLE.every((table) => table.tableName !== tableName))
      setIsChange(true);
  };
  const handleEditInput = (e: ChangeEvent<HTMLInputElement>) => {
    setTableName(e.target.value);
  };
  const updateTableName = (e: FocusEvent<HTMLInputElement>) => {
    if (
      e.target.value === "" ||
      DEFAULT_TABLE.some((table) => table.tableName === e.target.value)
    ) {
      alert(
        "테이블 이름을 확인해주세요.\n❌ 기존 테이블과 동일한 이름은 불가능합니다.\n❌ 빈 칸으로 남기면 안 됩니다."
      );
      const randomTableName = `new${Date.now()}`;

      setTableName(randomTableName);
      dispatch(changeTableName({ tableId, tableName: randomTableName }));
    } else {
      dispatch(changeTableName({ tableId, tableName }));
    }
    setIsChange(false);
  };
  const handleDeleteTable = () => {
    dispatch(deleteTable({ tableId }));
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        rowGap: 5,
        // border: "solid 1px #0AE93B",
        borderRadius: 7,
        backgroundColor: isDraggedOver ? "#2c1f04" : "#4C4637",
        color: "white",
        padding: "10px 7px",
        width: "23%",
      }}
      ref={dropTargetRef}
    >
      <div
        style={{
          textAlign: "center",
          fontWeight: "bold",
          fontSize: "18px",
          position: "relative",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div onDoubleClick={appearInput}>
          {isChange ? (
            <input
              type="text"
              value={tableName}
              onChange={handleEditInput}
              autoFocus
              onBlur={updateTableName}
            />
          ) : (
            tableName
          )}
        </div>
        {DEFAULT_TABLE.find((table) => table.tableName === tableName) ? null : (
          <button
            style={{
              position: "absolute",
              right: 0,
              background: "none",
              color: "white",
            }}
            onClick={handleDeleteTable}
          >
            X
          </button>
        )}
      </div>
      {teams.length ? (
        teams.map((team) => (
          <Team key={team.teamId} team={team} tableName={tableName} />
        ))
      ) : (
        <div style={{ width: 1, height: 30 }} />
      )}
      <AddButton type={"team"} teamType="cur" tableId={tableId} />
    </div>
  );
};

export default Table;
