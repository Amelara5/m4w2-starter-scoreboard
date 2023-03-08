import { useState } from "react";
import Display from "./routes/Display";
import Setup from "./routes/Setup";

function App() {
  const [gameOn, setGameOn] = useState(false);
  const [buttons, setButtons] = useState([]);
  const [periods, setPeriods] = useState(0);
  const [timePerPeriod, setTimePerPeriod] = useState(1);

  return (
    <>
      <h1 className="my-4 text-center text-3xl font-extrabold">
        Scoreboard App
      </h1>
      <main
        className="flex flex-col items-center gap-y-4
      "
      >
        {gameOn ? (
          <Display
            buttons={buttons}
            periods={periods}
            timePerPeriod={timePerPeriod}
          />
        ) : (
          <Setup
            setButtons={setButtons}
            setPeriods={setPeriods}
            setTimePerPeriod={setTimePerPeriod}
            setGameOn={setGameOn}
          />
        )}
      </main>
    </>
  );
}

export default App;
