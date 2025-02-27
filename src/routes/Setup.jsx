import PropTypes from "prop-types";
import Button from "../components/Buttons/Button";
import { NumericalInput, Select } from "../components/Form";
import CONFIG from "../config";
function Setup({ setButtons, setPeriods, setTimePerPeriod, setGameOn }) {
  return (
    <>
      <Select
        id="sport-select"
        options={CONFIG.map((sport) => sport.sport)}
        handleChange={(e) => {
          const selectedSport = CONFIG.find(
            (sport) => sport.sport === e.target.value
          );
          setButtons(selectedSport.buttons);
        }}
      />

      <NumericalInput
        id="periods"
        placeholder="Number of Periods"
        handleBlur={(e) => {
          setPeriods(parseInt(e.target.value));
        }}
      />

      <NumericalInput
        id="time"
        placeholder="Time per period? (minutes)"
        handleBlur={(e) => {
          setTimePerPeriod(parseInt(e.target.value));
        }}
      />

      <Button
        colorClass="bg-green-500"
        text="Go"
        handleClick={() => {
          setGameOn(true);
          console.log("Click");
        }}
      />
    </>
  );
}

Setup.propTypes = {
  setButtons: PropTypes.func.isRequired,
  setPeriods: PropTypes.func.isRequired,
  setTimePerPeriod: PropTypes.func.isRequired,
  setGameOn: PropTypes.func.isRequired,
};

export default Setup;
