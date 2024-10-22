import { db } from "@/lib/firebase-server";

export default async function getGameHistory(gameId) {
  try {
    // Fetch maxRounds from the games collection for the given gameId
    const gameDocRef = db.collection("games").doc(gameId);
    const gameDocSnap = await gameDocRef.get();

    const { maxRounds, guessHistory, gameStatus } = gameDocSnap.data();
    return { maxRounds, gameStatus, guessHistory: guessHistory ?? [] };
  } catch (error) {
    throw new Error("Failed to fetch game settings.");
  }
}
