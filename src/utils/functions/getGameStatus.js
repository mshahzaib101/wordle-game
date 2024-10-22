import { db } from "@/lib/firebase-server";

export default async function getGameStatus(gameId) {
  try {
    // Fetch maxRounds from the games collection for the given gameId
    const gameDocRef = db.collection("games").doc(gameId);
    const gameDocSnap = await gameDocRef.get();

    const { gameStatus } = gameDocSnap.data();
    return { gameStatus };
  } catch (error) {
    throw new Error("Failed to fetch game settings.");
  }
}
