// Helpers about computing properties about the current trip.

import { Connection, Location, Stop } from "./transport";

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

export type StopStation = {
  station: Location;
  arrival: Date | null;
  arrivalPlatform: string | null;
  departure: Date | null;
  departurePlatform: string | null;
};

export function tripToStopStations(trip: Connection): StopStation[] {
  const date = (date: string | null) => (date ? new Date(date) : null);

  const stations: StopStation[] = [
    {
      station: trip.from.station,
      arrival: null,
      arrivalPlatform: null,
      departure: date(trip.from.departure),
      departurePlatform: trip.from.platform,
    },
  ];

  for (const section of trip.sections) {
    stations[stations.length - 1].departure = date(section.departure.departure);
    stations[stations.length - 1].departurePlatform =
      section.departure.platform;

    stations.push({
      station: section.arrival.station,
      arrival: date(section.arrival.arrival),
      arrivalPlatform: section.arrival.platform,
      departure: null,
      departurePlatform: null,
    });
  }

  return stations;
}
