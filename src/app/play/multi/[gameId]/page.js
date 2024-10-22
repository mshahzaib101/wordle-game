import PlayerRegistration from "@/components/playerRegistration";
import getGameStatus from "@/utils/functions/getGameStatus";

export default async function MultiGamePlayerRegistrationPage({ params }) {
  const { gameId } = params;
  const { gameStatus } = await getGameStatus(gameId);

  return <PlayerRegistration gameStatus={gameStatus} />;
}
