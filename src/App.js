import React from "react";
import VanillaDrag from "./VanillaDrag";
import { weeks } from "./data";

const App = () => {
  return (
    <div style={{ padding: "24px" }}>
      {weeks.map((week, index) => (
        <div key={index}>
          <h2>List {index}</h2>
          <VanillaDrag list={week} />
        </div>
      ))}
    </div>
  );
};

export default App;
