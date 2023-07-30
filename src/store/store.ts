import { create } from "zustand";

export interface AnswerObject {
  question?: string;
  answer?: string;
  correct?: boolean;
  correctAnswer?: string;
}

interface QuizInfo {
  name: string;
  amount: number;
  category: number;
}

interface QuizStore {
  quiz: QuizInfo;
  setName: (name: string) => void;
  setAmount: (amount: number) => void;
  setCategory: (category: number) => void;
  userAnswers: AnswerObject[];
  setUserAnswers: ({
    question,
    answer,
    correct,
    correctAnswer,
  }: AnswerObject) => void;
}

const useQuizStore = create<QuizStore>((set) => ({
  quiz: { name:"", amount: 5, category: 21 },
  setName: (name) => set((store) => ({ quiz: { ...store.quiz, name } })),
  setAmount: (amount) => set((store) => ({ quiz: { ...store.quiz, amount } })),
  setCategory: (category) =>
    set((store) => ({ quiz: { ...store.quiz, category } })),

  userAnswers: [],
  setUserAnswers: ({ question, answer, correct, correctAnswer }) =>
    set((store) => ({
      userAnswers: [
        ...store.userAnswers,
        { question, answer, correct, correctAnswer },
      ],
    })),
}));

export default useQuizStore;
