import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CONFIG from "../config";
import App from "../App";

const choices = CONFIG.map((sport) => sport.sport);

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
