"use client";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import ConfettiComponent from "@/components/multiplayerPlay/confetti";
import { submitPlayerGuess } from "@/services/game";
import { useParams } from "next/navigation";
import { TextGenerateEffect } from "@/components/ui/textGenerateEffect";
import Spinner from "@/components/common/spinner";
import { gameOverSound, gameAlertSound } from "@/lib/sounds";
import { gamePosMoveSound } from "@/lib/sounds";
import { motion } from "framer-motion";

export default function GameController({ currentPlayerData,gameStatus }) {
  const params = useParams();

  const gameId = params.gameId; // Access gameId from dynamic route
  const playerId = params.playerId;

  const [currentGuess, setCurrentGuess] = useState("");
  const [loadingUserGuess, setLoadingUserGuess] = useState(false);

  useEffect(() => {
    if (currentPlayerData?.status === "lost") {
      gameOverSound();
    }
  }, [currentPlayerData?.status]);

  const handleGuess = async () => {
    if (currentGuess.length !== 5) {
      toast.error("Please enter a 5-letter word.");
      gameAlertSound();
      return;
    }

    try {
      setLoadingUserGuess(true);

      // Call the submitPlayerGuess function from the services
      const data = await submitPlayerGuess(gameId, currentGuess, playerId);

      setCurrentGuess("");

      if (data.status === "playing") {
        gamePosMoveSound();
      }
    } catch (err) {
      // Show error if the word is not in the list
      if (err.message === "The word is not in the list.") {
        toast.warn("This word is not in the list.");
        gameAlertSound();
      } else {
        toast.error("Error submitting guess: " + err.message);
      }
    } finally {
      setLoadingUserGuess(false);
    }
  };

  return (
    <>
      <motion.div
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
        className="z-10"
      >
        <div className="flex flex-col items-center justify-center p-4">
          {currentPlayerData?.status === "playing"&&gameStatus==="playing" && (
            <div className="relative w-full flex justify-center max-w-sm">
              <input
                type="text"
                maxLength={5}
                value={currentGuess}
                onChange={(e) => setCurrentGuess(e.target.value.toUpperCase())}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    handleGuess();
                  }
                }}
                autoFocus
                className="uppercase border p-2 mb-4 text-center text-white z-10 bg-transparent w-full border-gray-500 rounded-xl"
                disabled={loadingUserGuess}
              />

              {loadingUserGuess && (
                <div className="absolute top-3 -right-8">
                  <Spinner />
                </div>
              )}
            </div>
          )}

          <div className="flex flex-col items-center gap-2">
            {currentPlayerData?.status === "won" && (
              <div className="mt-4">
                <TextGenerateEffect
                  textClassName="text-green-500 font-bold text-center"
                  words="Congratulations! You won!"
                />
              </div>
            )}
            {currentPlayerData?.status === "lost" && (
              <div className="mt-4">
                <TextGenerateEffect
                  textClassName="text-red-600 font-bold text-center"
                  words={`Game Over!`}
                />
              </div>
            )}
          </div>
        </div>
      </motion.div>

      {currentPlayerData?.status === "won" && <ConfettiComponent />}
    </>
  );
}
