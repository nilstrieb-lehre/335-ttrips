export function renderDate(
  d: number | string | Date,
  renderDate = true,
): string {
  const date = new Date(d);

  const p = (n: number) => n.toString().padStart(2, "0");

  const formattedDate = `${p(date.getDay())}.${p(
    date.getMonth(),
  )}.${date.getFullYear()}`;

  return `${renderDate ? `${formattedDate} ` : ""}${p(date.getHours())}:${p(
    date.getMinutes(),
  )}`;
}
