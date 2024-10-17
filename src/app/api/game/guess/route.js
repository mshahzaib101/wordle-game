import { db } from "@/lib/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";

export async function POST(request) {
  try {
    // Parse the incoming request body
    const { gameId, guess } = await request.json();

    // Validate gameId
    if (!gameId || typeof gameId !== "string" || gameId.trim() === "") {
      return new Response(JSON.stringify({ error: "Invalid gameId" }), {
        status: 400,
      });
    }

    // Validate guess
    if (
      !guess ||
      typeof guess !== "string" ||
      guess.length !== 5 ||
      !/^[a-zA-Z]+$/.test(guess)
    ) {
      return new Response(
        JSON.stringify({ error: "Invalid guess. It must be a 5-letter word." }),
        { status: 400 }
      );
    }

    // Fetch the game document from Firestore using the gameId
    const docRef = doc(db, "games", gameId);
    const docSnap = await getDoc(docRef);

    // Check if the game exists
    if (!docSnap.exists()) {
      return new Response(JSON.stringify({ error: "Game not found" }), {
        status: 404,
      });
    }

    // Get the current game data
    const {
      answer,
      currentRound,
      maxRounds,
      wordsList,
      guessHistory = [],
    } = docSnap.data();

    // Check if the guessed word is in the words list
    if (!wordsList.includes(guess.toUpperCase())) {
      return new Response(
        JSON.stringify({ error: "The word is not in the list." }),
        { status: 400 }
      );
    }

    // Generate feedback for the guess
    const feedback = getFeedback(guess, answer);
    const isCorrect = guess.toUpperCase() === answer; // Check if the guess is correct

    // Increment the current round
    const updatedRound = currentRound + 1;

    // Check if the user has lost (all rounds exhausted)
    const hasLost = updatedRound >= maxRounds && !isCorrect;

    // Update the guess history
    const updatedGuessHistory = [
      ...guessHistory,
      { guess: guess.toUpperCase(), feedback },
    ];

    // Update the game document with the new current round and guess history
    await updateDoc(docRef, {
      currentRound: updatedRound,
      guessHistory: updatedGuessHistory,
    });

    // Return the feedback, guess history, isCorrect flag, hasLost flag, and possibly the answer
    return new Response(
      JSON.stringify({
        feedback,
        isCorrect,
        hasLost,
        guessHistory: updatedGuessHistory,
        ...(hasLost && { answer }),
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error validating guess:", error);
    return new Response(JSON.stringify({ error: "Failed to validate guess" }), {
      status: 500,
    });
  }
}

// Utility function to generate feedback for the guess
const getFeedback = (guess, answer) => {
  const feedback = [];
  const answerArray = answer.split(""); // Split answer into characters
  const guessArray = guess.toUpperCase().split(""); // Ensure the guess is in uppercase and split it

  const usedIndices = [];

  // First pass: Mark exact matches (hit)
  for (let i = 0; i < 5; i++) {
    if (guessArray[i] === answerArray[i]) {
      feedback[i] = "hit";
      usedIndices.push(i); // Mark this index as used
    }
  }

  // Second pass: Mark present (in word, but wrong position) and miss
  for (let i = 0; i < 5; i++) {
    if (!feedback[i]) {
      const index = answerArray.findIndex(
        (char, idx) => char === guessArray[i] && !usedIndices.includes(idx)
      );
      if (index !== -1) {
        feedback[i] = "present";
        usedIndices.push(index); // Mark this index as used
      } else {
        feedback[i] = "miss";
      }
    }
  }

  return feedback;
};
