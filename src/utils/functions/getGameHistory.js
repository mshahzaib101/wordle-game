import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";

export default async function getGameHistory(gameId) {
  try {
    // Fetch maxRounds from the games collection for the given gameId
    const gameDocRef = doc(db, "games", gameId);
    const gameDocSnap = await getDoc(gameDocRef);

    const { maxRounds, guessHistory, gameStatus } = gameDocSnap.data();
    return { maxRounds, gameStatus, guessHistory: guessHistory ?? [] };
  } catch (error) {
    throw new Error("Failed to fetch game settings.");
  }
}
