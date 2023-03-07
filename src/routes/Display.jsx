import PropTypes from "prop-types";
import { useState } from "react";
import Button from "../components/Buttons/Button";
import Buttons from "../components/Buttons/Buttons";
import { HomeAwaySwitch } from "../components/Form";
import Scoreboard from "../components/Scoreboard";

function Display({ buttons, periods, timePerPeriod }) {
  function justAClick() {
    console.log("Click");
  }
  const [homeScore, setHomeScore] = useState(0);
  const [awayScore, setAwayScore] = useState(0);
  const [homeAway, setHomeAway] = useState("away");
  const [timeRemaining, setTimeRemaining] = useState(
    //Seconds to minutes
    timePerPeriod * 60
  );

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
        currentPeriod={periods}
      />

      <div className="flex gap-x-8">
        {/* TODO: Add the colored buttons */}
        <Button
          colorClass={"bg-green-500"}
          text={"Start"}
          handleClick={justAClick}
        />
        <Button
          colorClass={"bg-orange-500"}
          text={"Stop"}
          handleClick={justAClick}
        />
        <Button
          colorClass={"bg-amber-500"}
          text={"Next period"}
          handleClick={justAClick}
        />
        <Button
          colorClass={"bg-red-500"}
          text={"Reset board"}
          handleClick={justAClick}
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
