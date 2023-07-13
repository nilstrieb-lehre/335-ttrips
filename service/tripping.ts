// Helpers about computing properties about the current trip.

import { Connection, Stop } from "./transport";

export function nextStop(connection: Connection): Stop | undefined {
  const currentTime = new Date();

  if (
    connection.from.departure &&
    new Date(connection.from.departure) > currentTime
  ) {
    return connection.from;
  }

  return connection.sections.find((section) => {
    const expectedArrival = section.arrival.arrival;
    return expectedArrival && new Date(expectedArrival) > currentTime;
  })?.arrival;
}
