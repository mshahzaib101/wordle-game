import GameController from "@/components/multiplayerPlay/gameController";
import PlayersBoards from "@/components/multiplayerPlay/playersBoards";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useParams } from "next/navigation";
import { doc, collection, onSnapshot } from "firebase/firestore";
import db from "@/lib/firebase/firestore";
import { TextGenerateEffect } from "@/components/ui/textGenerateEffect";
const GameBoard = () => {
  const params = useParams();

  const gameId = params.gameId; // Access gameId from dynamic route
  const currentPlayerId = params.playerId;

  const [playersData, setPlayersData] = useState([]);
  const [gameData, setGameData] = useState({});

  useEffect(() => {
    if (!gameId) return; // Ensure gameId is available

    const gameDocRef = doc(db, "games", gameId);

    // Set up real-time listener for the game document
    const unsubscribeGame = onSnapshot(gameDocRef, (gameDocSnap) => {
      if (gameDocSnap.exists()) {
        setGameData(gameDocSnap.data());
      } else {
        console.error("Game not found");
        toast.error("Game not found");
      }
    });

    // Set up real-time listener on players collection
    const playersCollectionRef = collection(gameDocRef, "players");

    const unsubscribePlayers = onSnapshot(playersCollectionRef, (snapshot) => {
      const playersArray = [];
      snapshot.forEach((doc) => {
        const playerId = doc.id;
        const playerData = doc.data();

        if (playerId === currentPlayerId) {
          playersArray.unshift({ id: playerId, ...playerData });
        } else {
          playersArray.push({ id: playerId, ...playerData });
        }
      });
      setPlayersData(playersArray);
    });

    // Cleanup subscriptions on component unmount
    return () => {
      unsubscribeGame(); // Unsubscribe from the game snapshot listener
      unsubscribePlayers(); // Unsubscribe from the players snapshot listener
    };
  }, [gameId, currentPlayerId]);

  if (playersData.length > 0) {
    return (
      <>
        {gameData?.gameStatus !== "playing" && (
          <div className="my-4 text-center">
            <TextGenerateEffect
              textClassName="text-green-500 font-bold text-center"
              words={`"${
                playersData.find((x) => x.status === "won")?.displayName
              }" has won the game!`}
            />
          </div>
        )}

        <GameController
          currentPlayerData={playersData[0]}
          gameStatus={gameData?.gameStatus}
        />
        <PlayersBoards
          gameData={gameData}
          playersData={playersData}
          currentPlayerId={currentPlayerId}
        />
      </>
    );
  }
};

export default GameBoard;
