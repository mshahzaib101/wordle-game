import { db } from "@/lib/firebase-server";
import { v4 as uuidv4 } from "uuid"; // Import UUID generator

export async function POST(request) {
  try {
    const { gameMode } = await request.json();

    // Generate a unique gameId
    const gameId = uuidv4();

    // Fetch the words list from Firestore
    const docRef = db.collection("gameConfig").doc("v1");
    const docSnap = await docRef.get();

    if (docSnap.exists) {
      const { wordsList, maxRounds } = docSnap.data();

      // Select a random word from the list
      const randomWord =
        wordsList[Math.floor(Math.random() * wordsList.length)];

      // Save the random word as the answer in the Firestore games collection with the generated gameId
      const gameDocRef = db.collection("games").doc(gameId);

      let gameObj;
      if (gameMode === "single") {
        gameObj = {
          answer: randomWord,
          maxRounds,
          wordsList, // Store the words list in this game
          currentRound: 0, // Initialize the current round to 0
          gameStatus: "playing",
          mode: "single",
        };
      } else {
        gameObj = {
          answer: randomWord,
          maxRounds,
          wordsList, // Store the words list in this game
          gameStatus: "playing",
          mode: "multi",
        };
      }

      await gameDocRef.set(gameObj);

      return new Response(JSON.stringify({ gameId, maxRounds }), {
        status: 200,
      });
    } else {
      return new Response(JSON.stringify({ error: "Words list not found" }), {
        status: 404,
      });
    }
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to start game" }), {
      status: 500,
    });
  }
}
