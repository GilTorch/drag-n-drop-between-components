import React from "react";
import VanillaDrag from "./VanillaDrag";

const App = () => {
  return (
    <div>
      {new Array(3).fill(undefined).map((_, index) => (
        <div key={index}>
          <h2>List {index}</h2>
          <VanillaDrag />
        </div>
      ))}
    </div>
  );
};

export default App;
