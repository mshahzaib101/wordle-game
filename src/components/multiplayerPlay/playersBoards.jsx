export default function PlayersBoards({
  gameData,
  playersData,
  currentPlayerId,
}) {
  return (
    <div
      initial={{
        opacity: 0,
        y: 20,
      }}
      animate={{
        opacity: 1,
        y: [20, -5, 0],
      }}
      transition={{
        duration: 0.5,
        ease: [0.4, 0.0, 0.2, 1],
      }}
      className="z-10"
    >
      {/*Players' boards */}
      <div className="flex flex-wrap justify-center gap-6 max-w-[1200px]">
        {playersData.map((ele) => {
          const playerData = ele;
          const displayName = playerData.displayName || "Player";
          const guesses = playerData.guessHistory || [];
          const playerStatus = playerData.status || "playing";
          const playerId = playerData.id;

          return (
            <div key={playerId} className="player-board p-4 ">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                  {displayName}&apos;s Board{" "}
                  {playerId === currentPlayerId && (
                    <span className="text-gray-500">(You)</span>
                  )}
                </h3>
                {playerStatus === "won" && (
                  <p className="text-green-500 font-bold mb-2">Won</p>
                )}
                {playerStatus === "lost" && (
                  <p className="text-red-500 font-bold mb-2">Lost</p>
                )}
              </div>

              <div className="grid gap-2 mt-2">
                {Array.from({ length: gameData.maxRounds }).map(
                  (_, rowIndex) => (
                    <div
                      key={rowIndex}
                      className="grid grid-cols-5 place-items-center gap-3"
                    >
                      {Array.from({ length: 5 }).map((_, colIndex) => {
                        const guess = guesses[rowIndex];
                        const letter = guess ? guess.guess[colIndex] : "";
                        const status = guess ? guess.feedback[colIndex] : "";

                        let bgColor = "bg-gray-200";
                        if (status === "hit") bgColor = "bg-green-500";
                        else if (status === "present")
                          bgColor = "bg-yellow-500";
                        else if (status === "miss") bgColor = "bg-gray-500";

                        return (
                          <div
                            key={colIndex}
                            className={`w-12 h-12 border rounded-lg flex items-center justify-center text-xl font-bold uppercase ${bgColor} text-white`}
                          >
                            {letter}
                          </div>
                        );
                      })}
                    </div>
                  )
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
