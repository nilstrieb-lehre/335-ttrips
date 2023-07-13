export function renderDate(d: number | string | Date): string {
  const date = new Date(d);

  const p = (n: number) => n.toString().padStart(2, "0");

  return `${p(date.getDay())}.${p(date.getMonth())}.${date.getFullYear()} ${p(
    date.getHours(),
  )}:${p(date.getMinutes())}`;
}
