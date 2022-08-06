import React from "react";
import Option from "./Option";
import "./Question.css";

export default function Question(props) {
  const [ans, setAns] = React.useState([]);
  const [selected, setSelected] = React.useState(null);

  React.useEffect(() => {
    let randPos = Math.floor(Math.random() * 4);

    let newIncorrect = props.incorrect.map((el) => ({
      correct: false,
      data: el,
    }));

    let newCorrect = { correct: true, data: props.correct };

    let answers = [];

    for (let i = 0; i < 4; i++) {
      if (i == randPos) {
        answers.push(newCorrect);
      } else {
        const index = Math.floor(Math.random() * newIncorrect.length);
        answers.push(newIncorrect[index]);
        newIncorrect.splice(index, 1);
      }
    }

    setAns(answers);
  }, [props.counter]);

  React.useLayoutEffect(() => {
    if (props.isOver) {
      props.sendCorrect(ans[selected] && ans[selected].correct);
    }
  }, [props.isOver]);

  function changeSelected(id) {
    if (!props.isOver) {
      setSelected((prev) => (prev == id ? null : id));
    }
  }

  const ansElements = ans.map((el, index) => (
    <Option
      key={index}
      id={index}
      correct={el.correct}
      data={el.data}
      selected={selected == index}
      handleClick={changeSelected}
      isOver={props.isOver}
    />
  ));

  return (
    <div className="question">
      <h1 className="qtitle">{props.qtitle}</h1>
      <div className="cont">
        <div className={"responses" + (props.isOver ? " over" : "")}>
          {ansElements}
        </div>
        {props.isOver && (
          <h1 className="rightWrong">
            {ans[selected] && ans[selected].correct ? "correct" : "wrong"}
          </h1>
        )}
      </div>
      <hr />
    </div>
  );
}
