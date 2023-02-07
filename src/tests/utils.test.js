import minutesAndSeconds from "../utils";
test("verifying minutesAndSeconds works properly", () => {
  expect(minutesAndSeconds(0)).toBe("0:00");
  expect(minutesAndSeconds(1)).toBe("0:01");
  expect(minutesAndSeconds(60)).toBe("1:00");
  expect(minutesAndSeconds(61)).toBe("1:01");
  expect(minutesAndSeconds(3599)).toBe("59:59");
  expect(minutesAndSeconds(3600)).toBe("60:00");
  expect(minutesAndSeconds(3601)).toBe("60:01");
});
