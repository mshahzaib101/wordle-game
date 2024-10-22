"use client";

import BackgroundLines from "@/components/ui/backgroundLines";
import ChooseGameMode from "@/components/common/chooseGameMode";

export default function Home() {
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

        <ChooseGameMode />
      </BackgroundLines>
    </main>
  );
}
