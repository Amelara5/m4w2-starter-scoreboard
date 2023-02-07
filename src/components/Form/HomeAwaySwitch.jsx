import PropTypes from "prop-types";

// https://dev.to/themesberg/building-a-tailwind-css-toggleswitch-component-4pc3
export default function HomeAwaySwitch({ handleToggle }) {
  return (
    <label
      htmlFor="switch"
      className="switch relative flex cursor-pointer items-center"
    >
      <span
        className="mr-1 text-sm"
        data-testid="home-toggle"
        role="complementary"
      >
        Home
      </span>
      <input
        type="checkbox"
        id="switch"
        className="sr-only"
        onChange={handleToggle}
        defaultChecked
      />
      <span className="h-6 w-12 rounded-full bg-gray-800" />
      <span
        className="ml-1 text-sm"
        data-testid="away-toggle"
        role="complementary"
      >
        Away
      </span>
    </label>
  );
}

HomeAwaySwitch.propTypes = {
  handleToggle: PropTypes.func.isRequired,
};
