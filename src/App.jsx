import Display from "./routes/Display";
import Setup from "./routes/Setup";

function App() {
  return (
    <>
      <h1 className="my-4 text-center text-3xl font-extrabold">
        Scoreboard App
      </h1>
      <Display />
      <Setup />
    </>
  );
}

export default App;
