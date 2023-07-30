import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import errorImage from "/images/error.png";
import useQuestions from "../hooks/useQuestions";
import useQuizStore from "../store/store";
import QuestionCard from "./questionCard";

const Quiz = () => {
  const [number, setNumber] = useState<number>(0);
  const navigate = useNavigate();
  const quiz = useQuizStore((s) => s.quiz);
  const { userAnswers, setUserAnswers } = useQuizStore();
  const {
    data: questions,
    isLoading,
    error,
  } = useQuestions(quiz.amount, quiz.category);

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (questions) {
      const answer = e.currentTarget.value;
      const correct = questions[number].correct_answer === answer;

      const answerObject = {
        question: questions[number].question,
        answer: answer,
        correct: correct,
        correctAnswer: questions[number].correct_answer,
      };
      setUserAnswers(answerObject);
    }
  };
  if (error) {
    return (
      <div className="flex flex-col items-center mt-10">
        <img src={errorImage} alt="error" />
        <p className="font-bold text-4xl bg-white py-2 px-2 my-5 rounded-md text-red-600">
          {error?.message}
        </p>
        <button
          onClick={() => navigate("/")}
          className="text-center text-2xl bg-white text-red-600  border-2 border-red-600 font-bold py-1 px-1 rounded-md"
        >
          Go Back
        </button>
      </div>
    );
  }

  const nextQuestion = () => {
    const nextQuestion = number + 1;
    setNumber(nextQuestion);
  };

  const previousQuestion = () => {
    const prevQuestion = number - 1;
    setNumber(prevQuestion);
  };

  return (
    <div className="w-1/2 sm:w-11/12 md:w-9/12 lg:w-7/12 xl:w-6/12 mx-auto bg-c1 my-10 py-2 px-2 text-center text-white text-xl rounded-2xl border-2 border-c3">
      <h2 className="text-4xl text-c3 font-bold">Quiz</h2>
      {isLoading && (
        <div className="flex flex-col items-center">
          <h5>Please wait to load questions...</h5>
          <div className="text-center w-7 h-7 animate-spin mr-3 rounded-lg bg-c3 border-4 border-dashed border-c4"></div>
        </div>
      )}

      {questions && (
        <QuestionCard
          question={questions[number].question}
          answers={questions[number].answers}
          questionNumber={number + 1}
          totalQuestion={quiz.amount}
          userAnswer={userAnswers ? userAnswers[number] : undefined}
          callback={checkAnswer}
          onNext={nextQuestion}
          onPrevious={previousQuestion}
        />
      )}
    </div>
  );
};

export default Quiz;
