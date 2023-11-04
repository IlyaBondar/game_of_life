import GameOfLife from "@/components/game/GameOfLife";

export default async function Game() {
    return (
    <main className="flex flex-col items-center">
      <h1 className="text-lg font-bold my-1">
        Example of &quot;Game of Life&quot;
      </h1>
      <a href="https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life"
        target="_blank"
        className="text-blue-600 dark:text-blue-500 hover:underline"
      >additional information</a>
      <GameOfLife />
    </main>
  );
}