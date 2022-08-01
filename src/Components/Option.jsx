import React from "react";
import "./Option.css";

export default function Option(props) {
  return (
    <button
      onClick={(e) => props.handleClick(props.id)}
      className={
        "option " +
        (props.selected ? "selected " : "") +
        (props.isOver ? "over " : "") +
        (props.correct ? "correct" : "")
      }
    >
      {props.data}
    </button>
  );
}
