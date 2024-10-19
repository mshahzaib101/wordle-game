"use client";

import { motion } from "framer-motion";
import { HeroHighlight, Highlight } from "@/components/ui/heroHighlight";
import GameBoard from "@/components/play/gameBoard";

export default function Play({ gameHistory }) {
  return (
    <main className="min-h-screen flex flex-col mt-16 md:mt-5">
      <HeroHighlight>
        <motion.h1
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: [20, -5, 0],
          }}
          transition={{
            duration: 0.5,
            ease: [0.4, 0.0, 0.2, 1],
          }}
          className="text-2xl px-4 md:text-4xl lg:text-5xl font-bold text-white max-w-4xl leading-relaxed lg:leading-snug text-center mx-auto "
        >
          Wordle in Action -<br />
          Make <Highlight className="text-white"> Your Guess!</Highlight>
        </motion.h1>

        <motion.p
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: [20, -5, 0],
          }}
          transition={{
            duration: 0.5,
            ease: [0.4, 0.0, 0.2, 1],
          }}
          className="mt-6 text-lg px-4 font-normal text-neutral-200 max-w-4xl leading-relaxed lg:leading-snug text-center mx-auto "
        >
          The game is on! You have limited chances to guess the hidden 5-letter
          word. Each attempt will bring you closer with hints: Hits, Presents,
          and Misses. Keep track of your guesses and try to crack the word
          before time runs out. Good luck—your next move could be the winning
          guess!
        </motion.p>
        <GameBoard gameHistory={gameHistory} />
      </HeroHighlight>
    </main>
  );
}
