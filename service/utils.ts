import { useThemeColor } from "../components/Themed";
import Colors from "../constants/Colors";

export function renderDate(
  d: number | string | Date,
  timeOnly = false,
): string {
  const date = new Date(d);

  const p = (n: number) => n.toString().padStart(2, "0");

  const formattedDate = `${p(date.getDate())}.${p(
    date.getMonth() + 1,
  )}.${date.getFullYear()}`;

  return `${timeOnly ? "" : `${formattedDate} `}${p(date.getHours())}:${p(
    date.getMinutes(),
  )}`;
}

export function useForeground(): string {
  return useThemeColor(
    { light: Colors.searchView.light.text, dark: Colors.searchView.dark.text },
    "text",
  );
}

export function useBackground(): string {
  return useThemeColor(
    {
      light: Colors.searchView.light.background,
      dark: Colors.searchView.dark.background,
    },
    "background",
  );
}
