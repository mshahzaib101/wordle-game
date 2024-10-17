"use client";
import { useState, useEffect, useRef, useContext } from "react";
import { toast } from "react-toastify";
import ConfettiComponent from "@/components/play/confetti";
import GameConfigStateContext from "@/contexts/gameConfigStateContext";
import { startNewGame, submitGuess } from "@/services/game";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { TextGenerateEffect } from "@/components/ui/textGenerateEffect";
import Spinner from "@/components/common/spinner";

export default function GameBoard({ gameHistory }) {
  const params = useParams();
  const router = useRouter();

  const gameId = params.gameId; // Access gameId from dynamic route

  const [correctAnswer, setCorrectAnswer] = useState("");
  const [currentGuess, setCurrentGuess] = useState("");
  const [guesses, setGuesses] = useState([...gameHistory.guessHistory]);
  const [gameStatus, setGameStatus] = useState(
    gameHistory?.gameStatus ?? "playing"
  );
  const [isNewGameLoading, setIsNewGameLoading] = useState(false);
  const [loadingUserGuess, setLoadingUserGuess] = useState(false);

  useEffect(() => {
    if (gameStatus === "lost") {
      const winSound = new Audio("/audios/game-over.mp3");
      winSound.play();
    }
  }, [gameStatus]);

  const playAlertSound = () => {
    const winSound = new Audio("/audios/alert.mp3");
    winSound.play();
  };

  const handleGuess = async () => {
    if (currentGuess.length !== 5) {
      toast.error("Please enter a 5-letter word.");
      playAlertSound();
      return;
    }

    try {
      setLoadingUserGuess(true);

      // Call the submitGuess function from the services
      const data = await submitGuess(gameId, currentGuess);

      setGuesses(data.guessHistory); // Update the guess history
      setCurrentGuess("");

      // Update the game status based on the server response
      setGameStatus(data.gameStatus);

      if (data.gameStatus === "playing") {
        const winSound = new Audio("/audios/pos-move.mp3");
        winSound.play();
      }

      if (data.hasLost) {
        setCorrectAnswer(data.answer); // Set the correct answer if the user has lost
      }
    } catch (err) {
      // Show error if the word is not in the list
      if (err.message === "The word is not in the list.") {
        toast.warn("This word is not in the list.");
        playAlertSound();
      } else {
        toast.error("Error submitting guess: " + err.message);
      }
    } finally {
      setLoadingUserGuess(false);
    }
  };

  const startNewGameHandler = async () => {
    try {
      setIsNewGameLoading(true);
      const { gameId } = await startNewGame();

      router.push(`/play/${gameId}`);
    } catch (err) {
      setIsNewGameLoading(false);
      toast.error("Failed to start a new game.");
    }
  };

  return (
    <div className="z-10 flex flex-col items-center justify-center p-4">
      {gameStatus === "playing" && (
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

      <div className="grid grid-rows-6 gap-2 mt-4">
        {Array.from({ length: gameHistory.maxRounds }).map((_, rowIndex) => (
          <div key={rowIndex} className="grid grid-cols-5 gap-2">
            {Array.from({ length: 5 }).map((_, colIndex) => {
              const guess = guesses[rowIndex];
              const letter = guess ? guess.guess[colIndex] : "";
              const status = guess ? guess.feedback[colIndex] : "";

              let bgColor = "bg-gray-200";
              if (status === "hit") bgColor = "bg-green-500";
              else if (status === "present") bgColor = "bg-yellow-500";
              else if (status === "miss") bgColor = "bg-gray-500";

              return (
                <div
                  key={colIndex}
                  className={`w-12 h-12 border rounded-lg flex items-center justify-center text-xl font-bold uppercase ${bgColor} text-white`}
                >
                  {letter}
                </div>
              );
            })}
          </div>
        ))}
      </div>

      <div className="flex flex-col items-center gap-2 min-h-[100px]">
        {gameStatus === "won" && (
          <div className="mt-4">
            <TextGenerateEffect
              textClassName="text-green-500 font-bold text-center"
              words="Congratulations! You won!"
            />
          </div>
        )}
        {gameStatus === "lost" && (
          <div className="mt-4">
            <TextGenerateEffect
              textClassName="text-red-600 font-bold text-center"
              words={`Game Over!`}
            />
          </div>
        )}

        {gameStatus !== "playing" && (
          <div className="flex items-center justify-center gap-x-6">
            <button
              onClick={startNewGameHandler}
              className="mt-6 relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
              disabled={isNewGameLoading}
            >
              <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
              <span className="inline-flex gap-5 h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-10 py-2 text-xl font-medium text-white backdrop-blur-3xl">
                {isNewGameLoading && <Spinner />}
                Play Again
              </span>
            </button>
          </div>
        )}
      </div>

      {gameStatus === "won" && <ConfettiComponent />}
    </div>
  );
}
