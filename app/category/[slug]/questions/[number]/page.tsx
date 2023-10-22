import { fetchQuestion } from "../../../../data";
import Question from "./Question";

const getData = async (
  categorySlug: string,
  questionNumber: number
): Promise<Question> => {
  return fetchQuestion(categorySlug, questionNumber);
};

export default async function Page({
  params,
}: {
  params: { slug: string; number: string };
}) {
  const questionNumber = parseInt(params.number, 10);
  const question = await getData(params.slug, questionNumber);

  return <Question question={question} questionNumber={questionNumber} />;
}
