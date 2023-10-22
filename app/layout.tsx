import type { Metadata } from "next";
import "./globals.css";
import ScoreKeeperContextProvider from "./context/ScoreKeeperContext";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "AI Trivia",
  description: "AI Trivia by Stride",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ScoreKeeperContextProvider>
          <nav className="p-4">
            <header className="flex items-center">
              <Link href="/" className="flex">
                <Image
                  src="/logo.png"
                  width={15}
                  height={15}
                  alt=""
                  className="mr-3"
                />
                <h1 className="text-xl">
                  AI Trivia <span className="italic text-base">by Stride</span>
                </h1>
              </Link>
            </header>
          </nav>

          <main className="mt-4 md:mt-20 w-full md:max-w-2xl md:min-w-[576px] md:mx-auto flex flex-col items-center p-4">
            {children}
          </main>
        </ScoreKeeperContextProvider>
      </body>
    </html>
  );
}
