import GameIntro from "@/components/play/gameIntro";
import GameBoard from "@/components/play/gameBoard";

export default function Play({ maxRounds, guessHistory }) {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4">
      <GameIntro />
      <GameBoard maxRounds={maxRounds} guessHistory={guessHistory} />
    </main>
  );
}
