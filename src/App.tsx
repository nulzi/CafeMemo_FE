import React from "react";
import "./App.css";
import TablesContainer from "./components/TablesContainer/TablesContainer";
import TeamContainer from "./components/TeamContainer/TeamContainer";
import { useTypedSelector } from "./hooks/redux";

function App() {
  const { currentTables, waitTeams, exitTeams } = useTypedSelector(
    (state) => state.tables
  );

  return (
    <div className="App">
      <TablesContainer tables={currentTables} />
      <TeamContainer wait teams={waitTeams} />
      <TeamContainer teams={exitTeams} />
    </div>
  );
}

export default App;
