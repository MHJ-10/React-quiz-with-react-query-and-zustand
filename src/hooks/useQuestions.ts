import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface Question {
  category: string;
  type: string;
  difficulty: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

export interface QuestionState extends Question {
  answers: string[];
}

const useQuestions = (amount: number, category: number) => {
  const endpoint = `https://opcventdb.com/api.php?amount=${amount}&category=${category}&type=multiple`;
  const shuffleAnswers = (array: string[]) => [
    ...array.sort(() => Math.random() - 0.5),
  ];
  return useQuery<QuestionState[], Error>({
    queryKey: ["questions"],
    queryFn: async () => {
      const res = await axios.get(endpoint);
      return res.data.results.map((question: Question) => ({
        ...question,
        answers: shuffleAnswers([
          ...question.incorrect_answers,
          question.correct_answer,
        ]),
      }));
    },
    refetchOnWindowFocus: false,
  });
};

export default useQuestions;
