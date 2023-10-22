"use client";
import Link from "../../../components/Link";
import RightArrow from "../../../components/RightArrow";
import { ScoreKeeperContext } from "../../../context/ScoreKeeperContext";
import { useContext } from "react";

export default function Page() {
  const scoreKeeper = useContext(ScoreKeeperContext);

  return (
    <div>
      <div className="mb-10 md:mb-20 text-center">
        <p className="text-2xl">
          You answered <strong>{scoreKeeper.score} out of 5</strong> questions
          correctly!
        </p>
      </div>

      <div className="flex justify-end mb-10 md:mb-24">
        <Link href="/">
          <span className="mx-2">Start Over</span>

          <RightArrow />
        </Link>
      </div>

      <ul className="mb-10 md:mb-24">
        {scoreKeeper.answeredQuestions.map((question, idx) => (
          <li key={`question-${idx}`} className="mb-2 p-4">
            <header className="mb-4">
              <h2 className="text-sm mb-2">Question {idx + 1}</h2>
              <p className="text-lg">{question.text}</p>
            </header>

            <ul>
              {question.options.map((option, optionIdx) => {
                const selectedAnswer = scoreKeeper.selectedAnswers[idx];
                const isSelectedAnswer =
                  option.text.toLowerCase() ===
                  selectedAnswer.text.toLowerCase();
                let selectedAnswerClassName = "border-slate-600";
                if (isSelectedAnswer && selectedAnswer.correct) {
                  selectedAnswerClassName =
                    "border-green-900 bg-green-800 text-white";
                } else if (isSelectedAnswer && !selectedAnswer.correct) {
                  selectedAnswerClassName =
                    "border-red-900 bg-red-800 text-white";
                }
                return (
                  <li
                    key={`option-${optionIdx}`}
                    className={`mb-2 p-2 text-sm rounded border ${selectedAnswerClassName} ${
                      option.correct &&
                      "border-green-900 bg-green-800 text-white"
                    }`}
                  >
                    {option.text}
                  </li>
                );
              })}
            </ul>
          </li>
        ))}
      </ul>

      <div className="flex justify-end mb-10 md:mb-24">
        <Link href="/">
          <span className="mx-2">Start Over</span>

          <RightArrow />
        </Link>
      </div>
    </div>
  );
}
