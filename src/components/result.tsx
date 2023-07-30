import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { QuestionState } from "../hooks/useQuestions";
import useQuizStore from "../store/store";

const Result = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const questions = queryClient.getQueryData<QuestionState[]>(["questions"]);
  const { quiz, userAnswers } = useQuizStore();

  useEffect(() => {
    if (!questions) navigate("/");
  });

  const renderPercent = () => {
    const correctAnswers = userAnswers.filter((answer) => answer.correct);
    const inCorrectAnswers = userAnswers.filter((answer) => !answer.correct);

    const percent =
      ((correctAnswers.length - inCorrectAnswers.length / 3) / quiz.amount) *
      100;

    return <p> Overall Percentage: {percent.toFixed(2)} %</p>;
  };

  return (
    <div className="mx-auto  sm:w-min md:w-11/12 lg:w-8/12 xl:w-8/12 mt-10">
      <div className="bg-c3  sm:text-sm md:text-lg  font-bold py-2 text-c1 flex flex-row justify-around">
        <p className="text-start">Name: {quiz.name}</p>
        <p className="text-end ">{renderPercent()}</p>
      </div>

      <table className="border-collapse shadow-md shadow-c2 px-2 text-white font-bold text-md text-center bg-c1">
        <thead className="uppercase">
          <tr>
            <th className="border border-c3 px-3 py-3">Questions</th>
            <th className="border border-c3 px-3">Your Answer</th>
            <th className="border border-c3 px-1">Correct Answer</th>
            <th className="border border-c3 px-4">Correct</th>
          </tr>
        </thead>
        <tbody className="px-2">
          {questions?.map((question) => {
            const answers = userAnswers.find(
              (answer) => answer.question === question.question
            );
            const correct = answers?.answer === question.correct_answer;
            const hasAnswer = answers?.answer;
            return (
              <tr key={question.question} className="hover:bg-c2 px-2 py-2">
                <td className="border border-c3">{question.question}</td>
                <td className="border border-c3">
                  {answers ? answers.answer : "-"}
                </td>
                <td className="border border-c3">{question.correct_answer}</td>
                <td
                  className={`border border-c3 ${
                    hasAnswer
                      ? correct
                        ? `text-green-400`
                        : `text-red-400`
                      : `text-white`
                  }`}
                >
                  {hasAnswer ? correct.toString() : "-"}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="flex items-center flex-col mt-5">
        <button
          className="bg-c2 rounded-lg border-2 border-dashed border-c1 text-white font-semibold mb-5 py-2 px-4"
          onClick={() => navigate("/")}
        >
          New Quiz
        </button>
      </div>
    </div>
  );
};

export default Result;
