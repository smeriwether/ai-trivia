import categories from "./categories";
import { default as allQuestions } from "./questions";

const fetchCategories = async (): Promise<Category[]> => {
  return categories;
};

const fetchQuestion = async (
  categorySlug: string,
  questionNumber?: number
): Promise<Question> => {
  const questions = allQuestions[categorySlug as keyof typeof allQuestions];
  if (questionNumber) {
    return questions[questionNumber - 1];
  } else {
    return questions[Math.floor(Math.random() * questions.length)];
  }
};

export { fetchCategories, fetchQuestion };
