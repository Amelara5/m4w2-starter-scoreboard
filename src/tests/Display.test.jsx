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
