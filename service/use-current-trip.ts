import { Connection } from "./transport";
import React, { useContext } from "react";

export type CurrentTrip = {
  currentTrip: Connection | null;
  setCurrentTrip: (trip: Connection | null) => void;
};

export const CurrentTripContext = React.createContext<CurrentTrip>({
  currentTrip: null,
  setCurrentTrip: console.error,
});

function useCurrentTrip(): CurrentTrip {
  return useContext(CurrentTripContext);
}

export default useCurrentTrip;
