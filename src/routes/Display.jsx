import { useState } from "react";
import Buttons from "../components/Buttons/Buttons";
import { HomeAwaySwitch } from "../components/Form";
import Scoreboard from "../components/Scoreboard";

function Display() {
  const [buttons, setButtons] = useState([]);
  const [homeScore, setHomeScore] = useState(0);
  const [awayScore, setAwayScore] = useState(0);
  const [homeAway, setHomeAway] = useState("away");
  const [periods, setPeriods] = useState(2);
  const [currentPeriod, setCurrentPeriod] = useState(1);
  const [minutes, setMinutes] = useState(15);
  return (
    <>
      <HomeAwaySwitch
        handleToggle={() => {
          setHomeAway((prev) => (prev === "home" ? "away" : "home"));
        }}
      />

      <Buttons
        buttons={buttons}
        handleClick={(e) => {
          if (homeAway === "home") {
            setHomeScore((prev) => prev + Number(e.target.dataset.count));
          } else {
            setAwayScore((prev) => prev + Number(e.target.dataset.count));
          }
        }}
      />

      <Scoreboard
        homeScore={homeScore}
        awayScore={awayScore}
        minutes={minutes}
        currentPeriod={currentPeriod}
      />
    </>
  );
}

export default Display;
