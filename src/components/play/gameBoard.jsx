"use client";
import { useState, useEffect, useCallback, useContext } from "react";
import { toast } from "react-toastify";
import ConfettiComponent from "@/components/play/confetti";
import GameConfigStateContext from "@/contexts/gameConfigStateContext";
import { startNewGame, submitGuess } from "@/services/game";
import { useParams } from "next/navigation";

export default function GameBoard({ maxRounds, guessHistory }) {
  const params = useParams();
  const gameId = params.gameId; // Access gameId from dynamic route

  const [answer, setAnswer] = useState("");
  const [currentGuess, setCurrentGuess] = useState("");
  const [guesses, setGuesses] = useState([...guessHistory]);
  const [gameStatus, setGameStatus] = useState("playing");

  const handleGuess = async () => {
    if (currentGuess.length !== 5) {
      toast.error("Please enter a 5-letter word.");
      return;
    }

    try {
      // Call the submitGuess function from the services
      const data = await submitGuess(gameId, currentGuess);

      setGuesses(data.guessHistory); // Update the guess history
      setCurrentGuess("");

      if (data.isCorrect) {
        setGameStatus("won");
      } else if (data.hasLost) {
        setGameStatus("lost");
        setCorrectAnswer(data.answer); // Set the correct answer if the user has lost
      }
    } catch (err) {
      // Show error if the word is not in the list
      if (err.message === "The word is not in the list.") {
        toast.warn("This word is not in the list.");
      } else {
        toast.error("Error submitting guess: " + err.message);
      }
    }
  };

  const restartGame = () => {
    setGameStatus("playing");
    setGuesses([]);
  };

  const startNewGameHandler = async () => {
    try {
      const gameId = await startNewGame();
      console.log("Game ID:", gameId);
      // setGameId(gameId);
    } catch (err) {
      console.log("err", err);
      toast.error("Failed to start a new game.");
    }
  };

  return (
    <div className="z-10">
      <div className="flex items-center justify-center gap-x-6">
        <button
          onClick={startNewGameHandler}
          className="text-sm font-semibold leading-6 text-gray-900"
        >
          Start Game <span aria-hidden="true">→</span>
        </button>
      </div>

      {gameStatus === "playing" && (
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
          className="uppercase border p-2 mb-4 text-center text-black z-10 bg-transparent w-full border-gray-500 rounded-xl"
        />
      )}

      <div className="grid grid-rows-6 gap-2">
        {Array.from({ length: maxRounds }).map((_, rowIndex) => (
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
                  className={`w-12 h-12 border flex items-center justify-center text-xl font-bold uppercase ${bgColor} text-white`}
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
          <div className="mt-4 text-green-600 font-bold text-center">
            Congratulations! You won!
            <ConfettiComponent />
          </div>
        )}
        {gameStatus === "lost" && (
          <div className="mt-4 text-red-600 font-bold text-center">
            Game Over! The word was {answer}.
          </div>
        )}

        {gameStatus !== "playing" && (
          <div className="flex items-center justify-center gap-x-6">
            <button
              onClick={restartGame}
              className="text-sm font-semibold leading-6 text-gray-900"
            >
              Restart <span aria-hidden="true">→</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
