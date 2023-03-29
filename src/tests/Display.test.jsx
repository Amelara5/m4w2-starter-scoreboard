import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, test } from "vitest";
import Display from "../routes/Display";

test("inital render", () => {
  const rendered = render(
    <Display buttons={[1, 2, 3]} periods={2} timePerPeriod={10} />
  );
  expect(rendered).toMatchSnapshot();
});

it("updates the Away score", async () => {
  const user = userEvent.setup();
  render(<Display buttons={[1]} periods={3} timePerPeriod={12} />);

  const awayScore = screen.getByTestId("away-score");

  const awayBtn = screen.getByRole("button", { name: "1" });
  await user.click(awayBtn);

  expect(awayScore).toHaveTextContent(1);
});

it("updates the Home and Away score based on the toggles", async () => {
  const user = userEvent.setup();
  render(<Display buttons={[0]} periods={2} timePerPeriod={3} />);

  const toggleButton = screen.getByRole("checkbox");
  const homeScore = screen.getByTestId("home-score");
  const awayScore = screen.getByTestId("away-score");
  const addPoint = screen.getByRole("button", { name: "1" });

  //  First add a point to Away
  await user.click(addPoint);
  //  Second switch the toggle to add a point to Home
  await user.click(toggleButton);
  await user.click(addPoint);
  //  Finally switch back to Away and a point
  await user.click(toggleButton);
  await user.click(addPoint);

  expect(awayScore).toHaveTextContent(2);
  expect(homeScore).toHaveTextContent(1);
  // console.log(toggleButton);
  // console.log(homeScore);
  // console.log(awayScore);
});

it("advances the period only up to the max periods", async () => {});
