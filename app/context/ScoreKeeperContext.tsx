"use client";

import { ReactNode, createContext, useEffect, useState } from "react";

interface ScoreKeeperContextState {
  score: number;
  category: Category | null;
  answeredQuestions: Question[];
  selectedAnswers: Option[];
  logCategory: (category: Category) => void;
  logAnswer: (question: Question, selectedAnswer: Option) => void;
  reset: () => void;
}

interface ScoreKeeperContextProviderProps {
  children: ReactNode;
}

export const ScoreKeeperContext = createContext<ScoreKeeperContextState>({
  score: 0,
  category: null,
  answeredQuestions: [],
  selectedAnswers: [],
  logCategory: () => undefined,
  logAnswer: () => undefined,
  reset: () => undefined,
});

const SELECTED_CATEGORY_KEY = "selected-category";
const ANSWERED_QUESTIONS_KEY = "answered-questions";
const SELECTED_ANSWERS_KEY = "selected-answers";
const SCORE_KEY = "score";

const initialState = () => {
  if (typeof window === "undefined") {
    return {
      selectedCategory: null,
      answeredQuestions: [],
      selectedAnswers: [],
      score: 0,
    };
  }

  const selectedCategoryStr = localStorage.getItem(SELECTED_CATEGORY_KEY);
  const answeredQuestionsStr = localStorage.getItem(ANSWERED_QUESTIONS_KEY);
  const selectedAnswersStr = localStorage.getItem(SELECTED_ANSWERS_KEY);
  const scoreStr = localStorage.getItem(SCORE_KEY);

  return {
    selectedCategory: selectedCategoryStr
      ? (JSON.parse(selectedCategoryStr) as Category)
      : null,
    answeredQuestions: answeredQuestionsStr
      ? (JSON.parse(answeredQuestionsStr) as Question[])
      : [],
    selectedAnswers: selectedAnswersStr
      ? (JSON.parse(selectedAnswersStr) as Option[])
      : [],
    score: scoreStr ? (JSON.parse(scoreStr) as number) : 0,
  };
};

const ScoreKeeperContextProvider = ({
  children,
}: ScoreKeeperContextProviderProps) => {
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    initialState().selectedCategory
  );
  const [answeredQuestions, setAnsweredQuestions] = useState<Question[]>(
    initialState().answeredQuestions
  );
  const [selectedAnswers, setSelectedAnswers] = useState<Option[]>(
    initialState().selectedAnswers
  );
  const [score, setScore] = useState(initialState().score);

  useEffect(() => {
    localStorage.setItem(
      SELECTED_CATEGORY_KEY,
      JSON.stringify(selectedCategory)
    );
    localStorage.setItem(
      ANSWERED_QUESTIONS_KEY,
      JSON.stringify(answeredQuestions)
    );
    localStorage.setItem(SELECTED_ANSWERS_KEY, JSON.stringify(selectedAnswers));
    localStorage.setItem(SCORE_KEY, JSON.stringify(score));
  }, [selectedCategory, answeredQuestions, selectedAnswers, score]);

  const logCategory = (category: Category) => {
    setSelectedCategory(category);
  };

  const logAnswer = (question: Question, selectedAnswer: Option) => {
    setAnsweredQuestions((questions) => [...questions, question]);
    setSelectedAnswers((selectedAnswers) => [
      ...selectedAnswers,
      selectedAnswer,
    ]);

    if (selectedAnswer.correct) {
      setScore((score) => score + 1);
    }
  };

  const reset = () => {
    setAnsweredQuestions([]);
    setSelectedAnswers([]);
    setScore(0);
  };

  return (
    <ScoreKeeperContext.Provider
      value={{
        score,
        category: selectedCategory,
        answeredQuestions,
        selectedAnswers,
        logCategory,
        logAnswer,
        reset,
      }}
    >
      {children}
    </ScoreKeeperContext.Provider>
  );
};

export default ScoreKeeperContextProvider;
