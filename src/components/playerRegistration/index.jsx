"use client";

import { motion } from "framer-motion";
import { HeroHighlight, Highlight } from "@/components/ui/heroHighlight";
import UserJoiningForm from "@/components/playerRegistration/userJoiningForm";

export default function PlayerRegistration({ gameStatus }) {
  if (gameStatus === "playing") {
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
            <Highlight className="text-white"> Multiplayer Showdown!</Highlight>
          </motion.h1>

          <UserJoiningForm />
        </HeroHighlight>
      </main>
    );
  } else {
    return (
      <main className="min-h-screen flex items-center justify-center mt-16 md:mt-5">
        <p className="text-gray-200">Game has ended</p>
      </main>
    );
  }
}
