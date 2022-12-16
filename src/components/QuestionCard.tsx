import React from "react";
import { Wrapper, ButtonWrapper } from "./QuestionCard.styles";
import { AnswerObject } from "../App";
type Props = {
  question: string;
  answers: string[];
  callback: (e: React.MouseEvent<HTMLButtonElement>) => void;
  userAnswer: AnswerObject | undefined;
  questionNumber: number;
  totalQuestions: number;
};
const QuestionCard: React.FC<Props> = ({
  question,
  answers,
  callback,
  userAnswer,
  questionNumber,
  totalQuestions,
}) => {
  console.log(answers);
  console.log(userAnswer);
  return (
    <Wrapper>
      <p className="number">
        Question: {questionNumber} / {totalQuestions}
      </p>
      <p dangerouslySetInnerHTML={{ __html: question }} />
      <div>
        {answers.map((answer) =>
            <ButtonWrapper
              key={answer}
              correct={userAnswer ? userAnswer.correctAnswer === answer : false}
            //   correct={true}
              userClicked={userAnswer ? userAnswer.answer === answer : false}
            >
              <button
                disabled={userAnswer ? true : false}
                value={answer}
                onClick={callback}
              >
                <span dangerouslySetInnerHTML={{ __html: answer }} />
              </button>
            </ButtonWrapper>
        )}
      </div>
    </Wrapper>
  );
};

export default QuestionCard;
