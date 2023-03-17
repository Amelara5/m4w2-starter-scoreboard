import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import Button from "../components/Buttons/Button";
import Buttons from "../components/Buttons/Buttons";
import { HomeAwaySwitch } from "../components/Form";
import Scoreboard from "../components/Scoreboard";

function Display({ buttons, periods, timePerPeriod }) {
  // function justAClick() {
  //   console.log("Click");
  // }
  const [homeScore, setHomeScore] = useState(0);
  const [awayScore, setAwayScore] = useState(0);
  const [homeAway, setHomeAway] = useState("away");
  const [currentPeriod, setCurrentPeriod] = useState(1);
  const [timeRemaining, setTimeRemaining] = useState(
    // Seconds to minutes
    timePerPeriod * 60
  );
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  useEffect(() => {
    if (timeRemaining && isTimerRunning) {
      const intervalId = setInterval(() => {
        setTimeRemaining((prev) => prev - 1);
      }, 1000);

      return () => {
        clearInterval(intervalId);
      };
    }
  }, [timeRemaining, isTimerRunning]);
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
        timeRemaining={timeRemaining}
        currentPeriod={currentPeriod}
      />

      <div className="flex gap-x-8">
        {/* TODO: Add the colored buttons */}
        <Button
          colorClass={"bg-green-500"}
          text={"Start"}
          handleClick={() => {
            setIsTimerRunning((prev) => !prev);
          }}
        />
        <Button
          colorClass={"bg-orange-500"}
          text={"Stop"}
          handleClick={() => {
            setIsTimerRunning((prev) => !prev);
          }}
        />
        <Button
          colorClass={"bg-amber-500"}
          text={"Next period"}
          handleClick={() => {
            if (periods > currentPeriod) {
              setCurrentPeriod((prev) => prev + 1);
              setTimeRemaining(timePerPeriod * 60);
            }
            // More optimal way
            // setCurrentPeriod((prev) => (prev < periods ? prev + 1 : prev));
          }}
        />
        <Button
          colorClass={"bg-red-500"}
          text={"Reset board"}
          handleClick={() => {
            window.location.reload(false);
          }}
        />
      </div>
    </>
  );
}

Display.propTypes = {
  buttons: PropTypes.arrayOf(PropTypes.number).isRequired,
  periods: PropTypes.number.isRequired,
  timePerPeriod: PropTypes.number.isRequired,
};

export default Display;
