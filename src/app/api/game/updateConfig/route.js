import { db } from "@/lib/firebase";
import { doc, updateDoc } from "firebase/firestore";

export async function POST(request) {
  try {
    const { adminPassword, maxRounds, wordsList } = await request.json();

    // Validate that all fields are provided
    if (!adminPassword || !maxRounds || !wordsList) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        { status: 400 }
      );
    }

    // Validate the admin password
    const expectedPassword = process.env.ADMIN_PASSWORD;
    if (adminPassword !== expectedPassword) {
      return new Response(JSON.stringify({ error: "Invalid admin password" }), {
        status: 403,
      });
    }

    // Validate maxRounds
    if (maxRounds <= 0) {
      return new Response(
        JSON.stringify({ error: "Invalid maxRounds value" }),
        { status: 400 }
      );
    }

    // Validate wordsList
    if (!Array.isArray(wordsList) || wordsList.length < 3) {
      return new Response(
        JSON.stringify({ error: "wordsList must have at least 3 words" }),
        { status: 400 }
      );
    }

    // Update the game configuration in Firestore
    const configRef = doc(db, "gameConfig", "v1");
    await updateDoc(configRef, {
      maxRounds: maxRounds,
      wordsList: wordsList.map((word) => word.toUpperCase()), // Ensure words are uppercase
    });

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    console.error("Error updating game config:", error);
    return new Response(
      JSON.stringify({ error: "Failed to update game configuration" }),
      { status: 500 }
    );
  }
}
