import GameIntro from "@/components/home/gameIntro";
import GameBoard from "@/components/home/gameBoard";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-4">
      <GameIntro />
      <GameBoard />
    </main>
  );
}
