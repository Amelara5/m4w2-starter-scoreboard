import "@testing-library/jest-dom";
import { cleanup, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach } from "vitest";

afterEach(() => {
  cleanup();
});

export function setup(component) {
  return {
    user: userEvent.setup(),
    ...render(component),
  };
}
