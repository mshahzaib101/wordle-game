import Play from "@/components/play";
import getGameHistory from "@/utils/functions/getGameHistory";
 
export default async function PlayPage({ params }) {
  const { gameId } = params;
  const gameHistory = await getGameHistory(gameId);

  return <Play gameHistory={gameHistory} />;
}
