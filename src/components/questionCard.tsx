import { useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { ArrowLeft, ArrowRight } from "react-bootstrap-icons";
import { Link } from "react-router-dom";
import { QuestionState } from "../hooks/useQuestions";
import useQuizStore, { AnswerObject } from "../store/store";
import { useTime } from "../hooks/useTime";

interface QuestionDetails {
  question: string;
  answers: string[];
  callback: (e: React.MouseEvent<HTMLButtonElement>) => void;
  userAnswer?: AnswerObject;
  questionNumber: number;
  totalQuestion: number;
  onNext: () => void;
  onPrevious: () => void;
}

const QuestionCard = ({
  question,
  answers,
  callback,
  questionNumber,
  totalQuestion,
  onNext,
  onPrevious,
}: QuestionDetails) => {
  const queryClient = useQueryClient();
  const questions = queryClient.getQueryData<QuestionState[]>(["questions"]);

  const [time, setTime] = useState<number>(totalQuestion * 10);
  const userAnswers = useQuizStore((s) => s.userAnswers);

  useTime({ time, setTime });

  const handleDisabled = () => {
    const showedQuestion = questions?.find(
      (question) => question.answers === answers
    );
    const selectedAnswer = userAnswers.find(
      (userAnswer) => userAnswer.question === showedQuestion?.question
    );
    return selectedAnswer !== undefined || time <= 0;
  };

  return (
    <div className="py-3 relative">
      <h4 className={time <= 15 ? "text-red-600" : "text-white"}>
        Time:{time}s
      </h4>
      <h5 className="py-1">Question: {questionNumber + "/" + totalQuestion}</h5>
      <div className="w-3/5 mx-auto bg-c3 h-1 my-2 rounded-xl"></div>
      <h4 className="py-1">{question}</h4>
      {answers.map((answer) => {
        return (
          <div key={answer}>
            <button
              className="bg-c4 py-1 px-2 my-2 w-2/5 sm:3/5 rounded-2xl border-2 hover:font-bold disabled:opacity-50 border-c2 text-c1"
              onClick={callback}
              value={answer}
              disabled={handleDisabled()}
            >
              {answer}
            </button>
          </div>
        );
      })}

      <button
        className="absolute left-0 bottom-1/3 bg-c2 disabled:opacity-50 py-2 px-2 ms-5 rounded-full border-2 border-c3"
        onClick={onPrevious}
        disabled={questionNumber === 1 ? true : false}
      >
        <ArrowLeft />
      </button>

      <button
        className="absolute right-0 bottom-1/3 bg-c2 disabled:opacity-50 py-2 px-2 me-5 rounded-full border-2 border-c3"
        onClick={onNext}
        disabled={questionNumber === totalQuestion ? true : false}
      >
        <ArrowRight />
      </button>

      <Link
        className="bg-c2 py-1 px-3 text-c4 rounded-lg border-2 border-c4"
        to="/result"
      >
        Finish
      </Link>
    </div>
  );
};

export default QuestionCard;
