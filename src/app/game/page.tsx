import Matrix from "@/components/Matrix";

export default async function Game() {
    return (
    <main className="flex flex-col items-center">
      <h1 className="text-lg font-bold my-1">
        Example of Game of Life
      </h1>
      <a href="https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life" target="_blank">additional information</a>
      <Matrix />
    </main>
  );
}