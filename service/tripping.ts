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

export type LatLong = { latitude: number; longitude: number };

// Calculates the angle the user has to walk to from their position (S) to the target (T).
export function targetAngle(self: LatLong, target: LatLong): number {
  const relativeTargetX = target.longitude - self.longitude;
  const relativeTargetY = target.latitude - self.latitude;
  return Math.atan2(relativeTargetX, relativeTargetY) * (180 / Math.PI);
}

const winterthur = { latitude: 47.4970697, longitude: 8.718835 };
const richterswil = { latitude: 47.208373, longitude: 8.707486 };
