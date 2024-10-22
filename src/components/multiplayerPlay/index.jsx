"use client";

import { motion } from "framer-motion";
import { HeroHighlight, Highlight } from "@/components/ui/heroHighlight";
import InviteModal from "@/components/multiplayerPlay/inviteModal";
import GameBoard from "@/components/multiplayerPlay/gameBoard";

export default function MultiplayerPlay() {
  return (
    <main className="min-h-screen flex flex-col mt-20 md:mt-4">
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
          <Highlight className="text-white"> Multiplayer Showdown!</Highlight>
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
          Join the fun! You and your friends have limited chances to guess the
          hidden 5-letter word. Use Hits, Presents, and Misses to outsmart your
          opponents and crack the word first. Good luck!
        </motion.p>

        <InviteModal />

        <GameBoard />
      </HeroHighlight>
    </main>
  );
}
