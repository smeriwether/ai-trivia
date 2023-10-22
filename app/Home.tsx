"use client";

import { useContext, useEffect, useState } from "react";
import Button from "./components/Button";
import { ScoreKeeperContext } from "./context/ScoreKeeperContext";
import Link from "./components/Link";

interface HomeProps {
  categories: Category[];
}

export default function Home({ categories }: HomeProps) {
  const scoreKeeper = useContext(ScoreKeeperContext);
  const [selectedCategory, setSelectedCategory] = useState<
    Category | undefined
  >(undefined);

  useEffect(() => {
    scoreKeeper.reset();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const onCategorySelection = (categorySlug: string) => {
    setSelectedCategory(categories.find((c) => c.slug === categorySlug)!);
  };

  const onCategorySubmission = () => {
    scoreKeeper.logCategory(selectedCategory!);
  };

  return (
    <>
      <header className="mb-10">
        <h2 className="text-2xl">Pick a Category</h2>
      </header>

      <div className="w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-20">
          {categories.map((category) => (
            <Button
              key={category.slug}
              onClick={() => onCategorySelection(category.slug)}
              selected={selectedCategory?.slug === category.slug}
              className="justify-center"
            >
              {category.name}
            </Button>
          ))}
        </div>

        <div className="flex justify-end">
          <Link
            href={`/category/${selectedCategory?.slug}/questions/1`}
            disabled={!selectedCategory?.slug}
            onClick={onCategorySubmission}
          >
            <span className="mr-3">Start Playing</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
              />
            </svg>
          </Link>
        </div>
      </div>
    </>
  );
}
