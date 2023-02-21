import PropTypes from "prop-types";

export default function Button({ colorClass, text, handleClick }) {
  return (
    <button
      className={`rounded ${colorClass} px-4 py-2 text-white`}
      data-count={text}
      onClick={handleClick}
    >
      {text}
    </button>
  );
}

Button.defaultProps = {
  colorClass: "bg-blue-500",
};

Button.propTypes = {
  colorClass: PropTypes.string,
  text: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  handleClick: PropTypes.func.isRequired,
};
