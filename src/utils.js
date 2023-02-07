//  TODO: Write a function that takes in seconds and returns a string with minutes:seconds
function minutesAndSeconds(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainder = seconds % 60;
  if (remainder) {
    if (remainder < 10) {
      return `${minutes}:0${remainder}`;
    } else {
      return `${minutes}:${remainder}`;
    }
  } else {
    return `${minutes}:00`;
  }
}

export default minutesAndSeconds;
