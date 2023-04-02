import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App";
import CONFIG from "../config";

it("renders the correct buttons whenever a sport is selected", async () => {
  const user = userEvent.setup();
  render(<App />);

  const select = screen.getByRole("combobox");

  // Select the first actual choice (not the placeholder option)
  // TODO: Avoid hardcoding the selection. Instead use the first choice from the config.
  const sportSelection = CONFIG[0].sport;
  // await user.selectOptions(select, "⚽/🏒");
  await user.selectOptions(select, sportSelection);

  const buttons = screen.getAllByRole("button");

  expect(buttons).toHaveLength(CONFIG[0].buttons.length);
});

test("renders App", () => {
  const rendered = render(<App />);
  expect(rendered).toMatchSnapshot();
});

it("limits the period to the number of periods specified in the config", async () => {
  const user = userEvent.setup();
  render(<App />);

  const periodInput = screen.getByLabelText(/Periods/i);
  const goBtn = screen.getByRole("button", { name: /Go/i });

  await user.type(periodInput, "2");
  await user.click(goBtn);

  const nextPeriodBtn = await screen.findByRole("button", {
    name: /Next Period/i,
  });
  const periodP = await screen.findByTestId("period");

  await user.click(nextPeriodBtn);
  await user.click(nextPeriodBtn);

  expect(periodP).toHaveTextContent("2");
});

it("start with the correct time remaining", async () => {
  const user = userEvent.setup();
  render(<App />);

  const timeInput = screen.getByLabelText(/Time/i);
  const goBtn = screen.getByRole("button", { name: /Go/i });

  await user.type(timeInput, "5");
  await user.click(goBtn);

  const startBtn = await screen.findByRole("button", { name: /Start/i });
  const timeRemaining = await screen.findByTestId("time");

  await user.click(startBtn);
  await waitFor(() => {
    expect(timeRemaining).toHaveTextContent("5:00");
  });
});
