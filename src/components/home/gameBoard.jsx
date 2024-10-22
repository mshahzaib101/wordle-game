"use client";
import { useState, useEffect, useCallback, useContext } from "react";
import { toast } from "react-toastify";
import ConfettiComponent from "@/components/home/confetti";
import GameConfigStateContext from "@/contexts/gameConfigStateContext";

export default function GameBoard() {
  const [answer, setAnswer] = useState("");
  const [currentGuess, setCurrentGuess] = useState("");
  const [guesses, setGuesses] = useState([]);
  const [gameStatus, setGameStatus] = useState("playing");

  const { maxRounds, wordsList } = useContext(GameConfigStateContext);

  const resetAnswer = useCallback(() => {
    const randomWord =
      wordsList[Math.floor(Math.random() * wordsList.length)].toUpperCase();
    setAnswer(randomWord);
  }, [setAnswer]);

  useEffect(() => {
    resetAnswer();
  }, []);

  const getFeedback = (guess, answer) => {
    const feedback = [];
    const answerArray = answer.split("");
    const guessArray = guess.split("");

    const usedIndices = [];
    for (let i = 0; i < 5; i++) {
      if (guessArray[i] === answerArray[i]) {
        feedback[i] = "hit";
        usedIndices.push(i);
      }
    }

    for (let i = 0; i < 5; i++) {
      if (!feedback[i]) {
        const index = answerArray.findIndex(
          (char, idx) => char === guessArray[i] && !usedIndices.includes(idx)
        );
        if (index !== -1) {
          feedback[i] = "present";
          usedIndices.push(index);
        } else {
          feedback[i] = "miss";
        }
      }
    }

    return feedback;
  };

  const handleGuess = () => {
    if (currentGuess.length !== 5) {
      toast.error("Please enter a 5-letter word.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      return;
    }

    if (!wordsList.includes(currentGuess.toUpperCase())) {
      toast.warn("Word not in list.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      return;
    }

    const feedback = getFeedback(currentGuess, answer);

    const newGuesses = [...guesses, { guess: currentGuess, feedback }];
    setGuesses(newGuesses);
    setCurrentGuess("");

    if (currentGuess === answer) {
      setGameStatus("won");
    } else if (newGuesses.length >= maxRounds) {
      setGameStatus("lost");
    }
  };

  const restartGame = () => {
    setGameStatus("playing");
    resetAnswer();
    setGuesses([]);
  };

  return (
    <div className="z-10">
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
