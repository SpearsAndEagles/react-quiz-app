import Start from "./Components/Start.jsx";
import Quiz from "./Components/Quiz.jsx";
import React from "react";
import blob1 from "./assets/blob1.svg";
import blob2 from "./assets/blob2.svg";
import "./App.css";

function App() {
  const [start, setStart] = React.useState(false);

  return (
    <div className="App">
      {start ? <Quiz /> : <Start handleStart={() => setStart(true)} />}
      {/* <img src={blob1} className={"blob1" + (start ? " start" : "")} />
      <img src={blob2} className={"blob2" + (start ? " start" : "")} /> */}
    </div>
  );
}

export default App;
