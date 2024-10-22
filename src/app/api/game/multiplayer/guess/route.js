import { db } from "@/lib/firebase-server";

export async function POST(request) {
  try {
    // Parse the incoming request body
    const { gameId, playerId, guess } = await request.json();

    // Validate gameId
    if (!gameId || typeof gameId !== "string" || gameId.trim() === "") {
      return new Response(JSON.stringify({ error: "Invalid gameId" }), {
        status: 400,
      });
    }

    // Validate playerId
    if (!playerId || typeof playerId !== "string" || playerId.trim() === "") {
      return new Response(JSON.stringify({ error: "Invalid playerId" }), {
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
    const gameDocRef = db.collection("games").doc(gameId);
    const gameDocSnap = await gameDocRef.get();

    // Check if the game exists
    if (!gameDocSnap.exists) {
      return new Response(JSON.stringify({ error: "Game not found" }), {
        status: 404,
      });
    }

    // Get the current game data
    const gameData = gameDocSnap.data();
    const { answer, maxRounds, wordsList, gameStatus, mode } = gameData;

    // Ensure the game is a multiplayer game
    if (mode !== "multi") {
      return new Response(
        JSON.stringify({ error: "This is not a multiplayer game." }),
        { status: 400 }
      );
    }

    // Check if the game has already ended
    if (gameStatus === "ended") {
      return new Response(
        JSON.stringify({ error: "Game has already ended." }),
        { status: 400 }
      );
    }

    // Fetch the player's document from the game's players subcollection
    const playerDocRef = gameDocRef.collection("players").doc(playerId);
    const playerDocSnap = await playerDocRef.get();

    // Check if the player exists in the game
    if (!playerDocSnap.exists) {
      return new Response(
        JSON.stringify({ error: "Player not found in this game." }),
        { status: 404 }
      );
    }

    // Get the player's data
    const playerData = playerDocSnap.data();
    const { guessHistory = [], status, currentRound = 0 } = playerData;

    // Check if the player's game is already over
    if (status === "won" || status === "lost") {
      return new Response(
        JSON.stringify({
          error: "Game already ended for this player.",
          status,
        }),
        { status: 400 }
      );
    }

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

    // Increment the player's current round
    const updatedRound = currentRound + 1;

    // Update the player's guess history
    const updatedGuessHistory = [
      ...guessHistory,
      { guess: guess.toUpperCase(), feedback },
    ];

    // Determine the player's new status
    let newPlayerStatus = status;
    if (isCorrect) {
      newPlayerStatus = "won";
    } else if (updatedRound >= maxRounds) {
      newPlayerStatus = "lost";
    } else {
      newPlayerStatus = "playing";
    }

    // Update the player's document with the new data
    await playerDocRef.update({
      guessHistory: updatedGuessHistory,
      status: newPlayerStatus,
      currentRound: updatedRound,
    });

    // If the player has won, update the game's status to 'ended'
    if (newPlayerStatus === "won") {
      await gameDocRef.update({
        gameStatus: "ended",
      });
    }

    // Return the feedback, isCorrect flag, new status, and the player's guess history
    return new Response(
      JSON.stringify({
        feedback,
        isCorrect,
        status: newPlayerStatus,
        guessHistory: updatedGuessHistory,
        currentRound: updatedRound,
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
