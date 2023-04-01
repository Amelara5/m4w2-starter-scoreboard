import { act, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, test, vi } from "vitest";
import Display from "../routes/Display";

test("inital render", () => {
  const rendered = render(
    <Display buttons={[1, 2, 3]} periods={2} timePerPeriod={10} />
  );
  expect(rendered).toMatchSnapshot();
});

it("updates the Away score", async () => {
  const user = userEvent.setup();
  render(<Display buttons={[1, 2, 3]} periods={3} timePerPeriod={12} />);

  const awayScore = screen.getByTestId("away-score");

  const awayBtn = screen.getByRole("button", { name: "2" });
  await user.click(awayBtn);

  expect(awayScore).toHaveTextContent(2);
});

it("updates the Home and Away score based on the toggles", async () => {
  const user = userEvent.setup();
  render(<Display buttons={[1, 2, 3]} periods={2} timePerPeriod={3} />);

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
});

it("advances the period only up to the max periods", async () => {
  const user = userEvent.setup();
  render(<Display buttons={[1, 2, 3, 6]} periods={4} timePerPeriod={15} />);

  const periodNumber = screen.getByTestId("period");
  const periodButton = screen.getByRole("button", { name: "Next period" });

  await user.click(periodButton);
  await user.click(periodButton);
  await user.click(periodButton);
  await user.click(periodButton);
  await user.click(periodButton);
  await user.click(periodButton);

  expect(periodNumber).toHaveTextContent(4);
});

describe("Timer 🤡", () => {
  beforeAll(() => {
    vi.useFakeTimers();
  });

  test("timer reflects MM:SS accurately", async () => {
    const user = userEvent.setup({ delay: null });
    render(<Display buttons={[1, 2, 3]} periods={2} timePerPeriod={10} />);

    const startBtn = screen.getByRole("button", { name: "Start" });
    const timeDisplay = screen.getByTestId("time");

    await user.click(startBtn);

    await waitFor(() => {
      expect(timeDisplay).toHaveTextContent("10:00");
    });

    act(() => {
      // 30 seconds
      vi.advanceTimersByTime(30000);
    });

    await waitFor(() => {
      expect(timeDisplay).toHaveTextContent("9:30");
    });

    act(() => {
      // 6 more seconds
      vi.advanceTimersByTime(6000);
    });

    await waitFor(() => {
      expect(timeDisplay).toHaveTextContent("9:24");
    });

    act(() => {
      // 1 second left! ⏳
      vi.advanceTimersByTime(563000);
    });

    await waitFor(() => {
      expect(timeDisplay).toHaveTextContent("0:01");
    });
  });

  it("stops and restarts timer", async () => {
    const user = userEvent.setup({ delay: null });
    render(<Display buttons={[1, 2, 3]} periods={2} timePerPeriod={10} />);

    const startBtn = screen.getByRole("button", { name: "Start" });
    const stopBtn = screen.getByRole("button", { name: "Stop" });
    const timeDisplay = screen.getByTestId("time");

    await user.click(startBtn);

    act(() => {
      // 30 seconds
      vi.advanceTimersByTime(30000);
    });

    await user.click(stopBtn);

    act(() => {
      // 30 seconds
      vi.advanceTimersByTime(30000);
    });

    await waitFor(() => {
      expect(timeDisplay).toHaveTextContent("9:30");
    });

    await user.click(startBtn);

    act(() => {
      // 6 more seconds
      vi.advanceTimersByTime(6000);
    });

    await waitFor(() => {
      expect(timeDisplay).toHaveTextContent("9:24");
    });
  });

  it("resets the time display when period is advanced", async () => {
    const user = userEvent.setup({ delay: null });
    render(<Display buttons={[1, 2, 3]} periods={2} timePerPeriod={3} />);

    const startBtn = screen.getByRole("button", { name: "Start" });
    const nextPeriodBtn = screen.getByRole("button", { name: "Next period" });
    const timeDisplay = screen.getByTestId("time");

    await user.click(startBtn);

    act(() => {
      // 30 seconds
      vi.advanceTimersByTime(30000);
    });

    await waitFor(() => {
      expect(timeDisplay).toHaveTextContent("2:30");
    });

    await user.click(nextPeriodBtn);

    await waitFor(() => {
      expect(timeDisplay).toHaveTextContent("3:00");
    });
  });
});
