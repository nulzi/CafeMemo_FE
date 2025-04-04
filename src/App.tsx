import React, { useEffect } from "react";
import "./App.css";
import TablesContainer from "./components/TablesContainer/TablesContainer";
import TeamContainer from "./components/TeamContainer/TeamContainer";
import { useTypedDispatch, useTypedSelector } from "./hooks/redux";
import { init, moveTeam } from "./store/slices/tablesSlice";
import { monitorForElements } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";

function App() {
  const dispatch = useTypedDispatch();
  const { currentTables, waitTeams, exitTeams } = useTypedSelector(
    (state) => state.tables
  );

  useEffect(() => {
    dispatch(init());
  }, []);

  useEffect(() => {
    return monitorForElements({
      onDrop({ source, location }) {
        const destination = location.current.dropTargets[0];
        if (!destination) {
          return;
        }
        const destinationTable = destination.data.tableName as string;
        const sourceTable = source.data.tableName as string;
        const teamId = source.data.teamId as string;
        const tableNameList = currentTables.map((table) => table.tableName);

        // 혹시 모를 이상한 문자열 제외
        if (
          ![...tableNameList, "wait", "exit"].includes(sourceTable) ||
          ![...tableNameList, "wait", "exit"].includes(destinationTable)
        ) {
          return;
        }

        dispatch(moveTeam({ sourceTable, destinationTable, teamId }));
      },
    });
  }, [currentTables, waitTeams, exitTeams]);

  return (
    <div className="App">
      <TablesContainer tables={currentTables} />
      <TeamContainer wait teams={waitTeams} />
      <TeamContainer teams={exitTeams} />
    </div>
  );
}

export default App;
