import { db } from "@/lib/firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid"; // Import UUID generator

export async function POST() {
  try {
    // Generate a unique gameId
    const gameId = uuidv4();

    // Fetch the words list from Firestore
    const docRef = doc(db, "gameConfig", "v1");
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const { wordsList, maxRounds } = docSnap.data();

      // Select a random word from the list
      const randomWord =
        wordsList[Math.floor(Math.random() * wordsList.length)];

      // Save the random word as the answer in the Firestore games collection with the generated gameId
      const gameDocRef = doc(db, "games", gameId);
      await setDoc(gameDocRef, {
        answer: randomWord,
        maxRounds,
        wordsList, // Store the words list in this game
        currentRound: 0, // Initialize the current round to 0
      });

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
