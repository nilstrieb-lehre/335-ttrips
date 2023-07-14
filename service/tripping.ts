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

export type CurrentPosition =
  | {
      type: "AtStation";
      stationIndex: number;
    }
  | { type: "EnRoute"; beforeStationIndex: number };

const date = (date: string | null) => (date ? new Date(date) : null);

class StationListBuilder {
  stations: StopStation[];
  currentPosition: CurrentPosition;
  now: Date;

  constructor(from: Stop) {
    this.stations = [
      {
        station: from.station,
        arrival: null,
        arrivalPlatform: null,
        departure: date(from.departure),
        departurePlatform: from.platform,
      },
    ];
    // Initially, we are at the first station.
    this.currentPosition = {
      type: "AtStation",
      stationIndex: 0,
    };
    this.now = new Date();
  }

  /**
   * Patches up the last station to set the departure for the next section.
   * @param departure The departure of the current section, an existing station.
   */
  addDeparture(departure: Stop) {
    const time = date(departure.departure);

    this.stations[this.stations.length - 1].departure = time;
    this.stations[this.stations.length - 1].departurePlatform =
      departure.platform;

    if (time && time < this.now) {
      // We are past this departure, so we are currently en route towards the station we will
      // add next. Or we're done.
      this.currentPosition = {
        type: "EnRoute",
        beforeStationIndex: this.stations.length,
      };
    }
  }

  /**
   * Add a new arrival for a section. This adds the new station.
   * @param arrival The arrival for this section.
   */
  addArrival(arrival: Stop) {
    const time = date(arrival.arrival);

    const addedStation = this.stations.length;

    this.stations.push({
      station: arrival.station,
      arrival: time,
      arrivalPlatform: arrival.platform,
      departure: null,
      departurePlatform: null,
    });

    if (time && time < this.now) {
      // We have arrived the station, so we are currently at that station.
      this.currentPosition = {
        type: "AtStation",
        stationIndex: addedStation,
      };
    }
  }
}

export function tripToStopStations(
  trip: Connection,
): [StopStation[], CurrentPosition] {
  const builder = new StationListBuilder(trip.from);

  for (const section of trip.sections) {
    builder.addDeparture(section.departure);
    builder.addArrival(section.arrival);
  }

  return [builder.stations, builder.currentPosition];
}
