import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";
// import App from "../App";
import Scoreboard from "../components/Scoreboard";

// test("Create a snapshot test for App", () => {
//   const appRender = render(<App />);
//   expect(appRender).toMatchSnapshot();
// });

test("Create a snapshot test for Scoreboard", () => {
  const scoreBoardRender = render(<Scoreboard />);
  expect(scoreBoardRender).toMatchSnapshot();
});

it("shows properly formatted minutes and seconds", () => {
  render(<Scoreboard timeRemaining={899} />);

  const timeP = screen.getByTestId("time");

  expect(timeP).toHaveTextContent("14:59");
});
