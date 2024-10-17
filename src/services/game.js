// Start a new game by calling the new game API
export const startNewGame = async () => {
  try {
    const res = await fetch("/api/game/new", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();
    if (res.ok) {
      return data;
    } else {
      throw new Error(data.error || "Failed to start a new game.");
    }
  } catch (err) {
    console.error("Error starting new game:", err);
    throw err;
  }
};

// Submit a guess by calling the guess API
export const submitGuess = async (gameId, guess) => {
  try {
    const res = await fetch("/api/game/guess", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ gameId, guess }),
    });

    const data = await res.json();
    if (res.ok) {
      return data;
    } else {
      throw new Error(data.error || "Failed to submit guess.");
    }
  } catch (err) {
    console.error("Error submitting guess:", err);
    throw err;
  }
};


