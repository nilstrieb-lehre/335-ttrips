// https://transport.opendata.ch/docs.html

type Datetime = string;
type Seconds = number;

export type Location = {
  id: string;
  type?: "station" | "poi" | "address" | "refine";
  name: string;
  score: number | null;
  coordinate: Coordinate;
  distance: number | null;
};

export type Coordinate = {
  type: string;
  x: number;
  y: number;
};

export type Connection = {
  from: Stop;
  to: Stop;
  duration: string;
  products: string[];
  sections: Section[];
};

export type Stop = {
  station: Location;
  arrival: Datetime | null;
  departure: Datetime | null;
  delay: number | null;
  platform: string | null;
};

export type Section = {
  journey: Journey | null;
  walk: null | { duration: Seconds | null };
  departure: Stop;
  arrival: Stop;
};

export type Journey = {
  name: string;
  category: string;
  number: string;
  operator: string;
  to: string;
  passList: Stop[];
};

export type LocationsParams = {
  x?: string;
  y?: string;
  query?: string;
  type?: "all" | "station" | "poi" | "address";
};

export type LocationsResponse = {
  stations: Location[];
};

const BASE = "https://transport.opendata.ch/v1";

export async function locations(
  params?: LocationsParams,
): Promise<LocationsResponse> {
  const res = await fetch(
    `${BASE}/locations?${new URLSearchParams(params ?? {})}`,
  );
  if (!res.ok) {
    throw res;
  }

  return res.json();
}

export type ConnectionsParams = {
  from: string;
  to: string;
  via?: string;
  date?: string;
  time?: string;
  isArrivalTime?: "0" | "1";
  limit?: string;
  page?: string;
};
export type ConnectionsResponse = {
  connections: Connection[];
};

export async function connections(
  params: ConnectionsParams,
): Promise<ConnectionsResponse> {
  const res = await fetch(`${BASE}/connections?${new URLSearchParams(params)}`);
  if (!res.ok) {
    throw res;
  }

  return res.json();
}
