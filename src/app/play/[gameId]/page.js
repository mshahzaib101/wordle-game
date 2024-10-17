import Play from "@/components/play";
import getMaxRounds  from "@/utils/functions/getGameMaxRounds";

export const metadata = {
  title: "Play Wordle - Challenge Your Word Skills!",
  description:
    "Enjoy the classic Wordle game where you guess a 5-letter word in a limited number of rounds. Can you solve the puzzle by deciphering the correct letter positions and their presence in the word? Play now and test your word-guessing skills with configurable settings and multiple chances to win!",
};

export default async function PlayPage({ params }) {
  const { gameId } = params;
  const maxRounds = await getMaxRounds(gameId);

  return (
    <div>
      <Play maxRounds={maxRounds} />
    </div>
  );
}
