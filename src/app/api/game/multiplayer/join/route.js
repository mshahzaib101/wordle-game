import { db } from "@/lib/firebase-server";
import { v4 as uuidv4 } from "uuid"; // Import UUID generator

export async function POST(request) {
  try {
    const { gameId, displayName } = await request.json();

    // Validate the input parameters
    if (!gameId || !displayName) {
      return new Response(
        JSON.stringify({ message: "Missing required parameters" }),
        {
          status: 400,
        }
      );
    }

    // Reference to the game document
    const gameDocRef = db.collection("games").doc(gameId);
    const gameDoc = await gameDocRef.get();

    // Check if the game exists
    if (!gameDoc.exists) {
      return new Response(JSON.stringify({ message: "Game not found" }), {
        status: 404,
      });
    }

    const gameData = gameDoc.data();

    // Ensure the game is a multiplayer game
    if (gameData.mode !== "multi") {
      return new Response(
        JSON.stringify({ message: "Game is not a multiplayer game" }),
        {
          status: 400,
        }
      );
    }

    // Check if the game is currently active
    if (gameData.gameStatus !== "playing") {
      return new Response(
        JSON.stringify({ message: "Game is not currently playing" }),
        {
          status: 400,
        }
      );
    }

    //new player in game
    const playerId = uuidv4();

    // Reference to the player's document in the game's players subcollection
    const playerDocRef = gameDocRef.collection("players").doc(playerId);

    // Add the player to the game's players subcollection
    await playerDocRef.set({
      displayName: displayName,
      guessHistory: [],
      status: "playing",
      currentRound: 0,
    });

    return new Response(
      JSON.stringify({
        message: "Player joined the game successfully",
        playerId,
      }),
      { status: 200 }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        message: "Error joining the game",
        error: error.message,
      }),
      { status: 500 }
    );
  }
}
