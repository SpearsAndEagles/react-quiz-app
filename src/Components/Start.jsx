import React from "react";
import "./Start.css";

export default function Start(props) {
  return (
    <div className="Start">
      <h1>Quizzical 💻</h1>
      <h3>Computer Science edition</h3>
      <button className="start" onClick={props.handleStart}>
        {" "}
        Start quiz{" "}
      </button>
    </div>
  );
}
