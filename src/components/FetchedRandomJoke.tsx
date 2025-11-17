import type { RandomJoke } from "@/types";

interface FetchedRandomJokeProps {
  randomJoke: RandomJoke;
}

export const FetchedRandomJoke: React.FC<FetchedRandomJokeProps> = ({
  randomJoke,
}) => {
  return (
    <div className="joke-container">
      <h2>ランダムジョーク</h2>
      <p className="joke-setup">{randomJoke.setup}</p>
      <p className="joke-punchline">{randomJoke.punchline}</p>
    </div>
  );
};