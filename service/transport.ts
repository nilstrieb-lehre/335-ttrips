// https://transport.opendata.ch/docs.html

export type Location = {
  id: string;
  type: "station" | "poi" | "address" | "refine";
  name: string;
  score: number | null;
  coordinates: Coordinate;
  distance: number | null;
};

export type Coordinate = {
  type: string;
  x: number;
  y: number;
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

const BASE = "http://transport.opendata.ch/v1";

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
