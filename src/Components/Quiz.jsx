import React from "react";
import Question from "./Question";
import Result from "./Result";
import "./Quiz.css";

export default function Quiz(props) {
  const { handleRestart, counter, setCorrect, correct, over, setOver } = props;

  const [quiz, setQuiz] = React.useState([]);
  const [shouldShow, setShouldShow] = React.useState(false);

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
  }, [counter]);

  function handleCheck() {
    setOver(true);
  }

  React.useEffect(() => {
    if (over) {
      setTimeout(() => setShouldShow(true), 5000);
    } else {
      setShouldShow(false);
    }
  }, [over]);

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
      {shouldShow && <Result correct={correct} handleRestart={handleRestart} />}
    </div>
  );
}
