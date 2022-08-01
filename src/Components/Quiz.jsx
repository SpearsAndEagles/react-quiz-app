import React from "react";
import Question from "./Question";
import underscore, { map } from "underscore";
import "./Quiz.css";

export default function Quiz() {
  const [quiz, setQuiz] = React.useState([]);
  const [correct, setCorrect] = React.useState(0);
  const [over, setOver] = React.useState(false);

  function fixMarkup(str) {
    return str
      .replace(/&#039;/g, "'")
      .replace(/&gt;/g, ">")
      .replace(/&lt;/g, "<")
      .replace(/&quot;/g, '"');
  }

  React.useEffect(() => {
    fetch("https://opentdb.com/api.php?amount=5&category=18&type=multiple")
      .then((res) => res.json())
      .then((data) => {
        let solvedData = data.results.map((el) => {
          let incorrect = el.incorrect_answers.map((ans) => fixMarkup(ans));
          let newShit = {
            ...el,
            question: fixMarkup(el.question),
            correct_answer: fixMarkup(el.correct_answer),
            incorrect_answers: incorrect,
          };
          return newShit;
        });
        setQuiz(solvedData);
      });
  }, []);

  function handleCheck() {
    setOver(true);
  }

  function recieveCorrect(isCorrect) {
    setCorrect((prev) => prev + (isCorrect ? 1 : 0));
    console.log(correct);
  }

  const quizElements = quiz.map((question, index) => {
    return (
      <Question
        isOver={over}
        key={index}
        qtitle={question.question}
        incorrect={question.incorrect_answers}
        correct={question.correct_answer}
        sendCorrect={recieveCorrect}
      />
    );
  });

  return (
    <div className="Quiz">
      {quizElements}
      <button className="submit" onClick={handleCheck}>
        Check Answers
      </button>
      {over && <h1 className="result">Result: {correct}/5</h1>}
    </div>
  );
}
