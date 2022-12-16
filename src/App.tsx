import React from "react";
import { useState } from "react";
import { fetchQuizQuestion } from "./API";
import QuestionCard from "./components/QuestionCard";
import { QuestionState, Difficulty } from "./API";
import {  Wrapper } from "./App.styles";
export type AnswerObject = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
};
const TOTAL_QUESTIONS = 10;
function App() {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<QuestionState[]>([]);
  const [num, setNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);
  console.log(fetchQuizQuestion(TOTAL_QUESTIONS, Difficulty.EASY));
  const startTrivia = async () => {
    setLoading(true);
    setGameOver(false);
    const newQuestions = await fetchQuizQuestion(
      TOTAL_QUESTIONS,
      Difficulty.EASY
    );
    // console.log("new ques:",newQuestions);
    // let i = 0;
    // for (i = 0; i < newQuestions.length; i++) {
    //   newQuestions[i].answers = shuffleArray([
    //     newQuestions[i].correct_answer,
    //     ...newQuestions[i].incorrect_answers,
    //   ]);
    // }

    setQuestions(newQuestions);
    setScore(0);
    setUserAnswers([]);
    setNumber(0);
    setLoading(false);
  };

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!gameOver) {
      // User Answer
      const answer = e.currentTarget.value;
      // Check Answer against correct answer
      const correct = questions[num].correct_answer === answer;
      // Add score if answer is correct
      if (correct) setScore((prev) => prev + 1);
      // Save answer in the array for user answers
      const answerObject = {
        question: questions[num].question,
        answer,
        correct,
        correctAnswer: questions[num].correct_answer,
      };
      setUserAnswers((prev) => [...prev, answerObject]);
    }
  };

  const nextQuestion = () => {
    // Move on to the next question if not the last question
    const nextQuestion = num + 1;
    if (nextQuestion === TOTAL_QUESTIONS) {
      setGameOver(true);
    }
    setNumber(nextQuestion);
  };
  // console.log(questions[number].answers)
  return (
    <Wrapper className="App">
      <h1>REACT QUIZ</h1>
      {gameOver || userAnswers.length === TOTAL_QUESTIONS ? (
        <button className="start" onClick={startTrivia}>
          Start Quiz
        </button>
      ) : null}
      {!gameOver ? <p className="score">Score: {score}</p> : null}
      {loading ? <p>Loading Questions...</p> : null}
      {!loading && !gameOver && (
        <QuestionCard
          questionNumber={num + 1}
          totalQuestions={TOTAL_QUESTIONS}
          question={questions[num].question}
          answers={questions[num].answers}
          userAnswer={
            userAnswers && userAnswers[num]
              ? userAnswers[num]
              : undefined
          }
          callback={checkAnswer}
        />
      )}
      {!gameOver &&
      !loading &&
      userAnswers.length === num + 1 &&
      num !== TOTAL_QUESTIONS - 1 ? (
        <button className="next" onClick={nextQuestion}>
          Next Question
        </button>
      ) : null}
    </Wrapper>
  );
}

export default App;
