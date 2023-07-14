import { renderDate } from "../utils";

it("should render the date correctly", () => {
  const date = new Date("2023-01-02T08:07:06Z");
  const rendered = renderDate(date);

  expect(rendered).toMatchInlineSnapshot(`"02.01.2023 09:07"`);
});

it("should render the time correctly", () => {
  const date = new Date("2023-01-02T08:07:06Z");
  const rendered = renderDate(date, true);

  expect(rendered).toMatchInlineSnapshot(`"09:07"`);
});
