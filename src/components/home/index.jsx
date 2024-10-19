"use client";

import { startNewGame } from "@/services/game";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import BackgroundLines from "@/components/ui/backgroundLines";
import Spinner from "@/components/common/spinner";
import { useState } from "react";
import { playNowSound } from "@/lib/sounds";

export default function Home() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const startNewGameHandler = async () => {
    try {
      setIsLoading(true);
      playNowSound();

      const { gameId } = await startNewGame();

      router.push(`/play/${gameId}`);
    } catch (err) {
      toast.error("Failed to start a new game.");
      setIsLoading(false);
    }
  };

  return (
    <main>
      <BackgroundLines
        svgOptions={{ duration: 7 }}
        className="flex items-center justify-center w-full flex-col px-4 bg-black pb-10"
      >
        <h1 className="bg-clip-text text-transparent text-center bg-gradient-to-b from-neutral-600 to-white text-2xl md:text-4xl lg:text-7xl font-sans py-2 md:py-10 relative z-20 font-bold tracking-tight">
          Wordler <br /> Crack the Code!
        </h1>
        <p className="max-w-xl mx-auto text-sm md:text-lg text-neutral-400 text-center">
          Ready to challenge your brain? Guess the right letters, solve the
          word, and prove you have what it takes to beat the Wordler!
        </p>

        <button
          onClick={startNewGameHandler}
          className="mt-6 relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
          disabled={isLoading}
        >
          <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
          <span className="inline-flex gap-5 h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-10 py-2 text-xl font-medium text-white backdrop-blur-3xl">
            {isLoading && <Spinner />}
            Play Now
          </span>
        </button>
      </BackgroundLines>
    </main>
  );
}
