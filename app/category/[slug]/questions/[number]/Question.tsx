"use client";

import BarChart from "../../../../components/BarChart";
import Button from "../../../../components/Button";
import Link from "../../../../components/Link";
import RightArrow from "../../../../components/RightArrow";
import { ScoreKeeperContext } from "../../../../context/ScoreKeeperContext";
import { useContext, useState } from "react";

const OPTION_NUMBERING = ["A", "B", "C", "D", "E", "F"];
const QUESTION_LIMIT = 5;

interface QuestionProps {
  questionNumber: number;
  question: Question;
}

export default function Question({ questionNumber, question }: QuestionProps) {
  const scoreKeeper = useContext(ScoreKeeperContext);
  const [selectedAnswer, setSelectedAnswer] = useState<Option | undefined>(
    undefined
  );

  const hasNextQuestion = questionNumber < QUESTION_LIMIT;

  const onAnswerSelection = (option: Option) => {
    setSelectedAnswer(option);
  };

  const onAnswerSubmission = () => {
    scoreKeeper.logAnswer(question, selectedAnswer!);
  };

  return (
    <div className="w-full">
      <div className="mb-10">
        <p className="text-2xl">{question.text}</p>
      </div>

      <div className="mb-10 md:mb-20">
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {question.options.map((option, idx) => (
            <li key={`option-${idx}`}>
              <Button
                onClick={() => onAnswerSelection(option)}
                selected={
                  option.text.toLowerCase() ===
                  selectedAnswer?.text.toLowerCase()
                }
                className="w-full text-left"
              >
                <p>
                  <span className="uppercase">{OPTION_NUMBERING[idx]}</span>.{" "}
                  {option.text}
                </p>
              </Button>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex justify-between items-end">
        <div>
          <span className="text-sm text-gray-600 dark:text-slate-300">
            Question {questionNumber} of {QUESTION_LIMIT}
          </span>
        </div>

        <Link
          href={
            hasNextQuestion
              ? `/category/${scoreKeeper.category?.slug}/questions/${
                  questionNumber + 1
                }`
              : `/category/${scoreKeeper.category?.slug}/score`
          }
          disabled={!selectedAnswer}
          onClick={onAnswerSubmission}
        >
          {!hasNextQuestion && <BarChart />}
          <span className="mx-2">
            {hasNextQuestion ? "Next Question" : "See Your Score"}
          </span>

          <RightArrow />
        </Link>
      </div>
    </div>
  );
}
