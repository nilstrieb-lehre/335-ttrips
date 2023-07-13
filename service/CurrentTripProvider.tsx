import React from "react";
import useAsyncStorage from "./use-async-storage";
import { Connection } from "./transport";
import { CurrentTripContext } from "./use-current-trip";

const CurrentTripProvider = ({
  children,
}: {
  children: JSX.Element | JSX.Element[];
}) => {
  const [trip, setTrip] = useAsyncStorage<Connection | null>(
    "current-trip",
    null,
  );

  return (
    <CurrentTripContext.Provider
      value={{ currentTrip: trip, setCurrentTrip: setTrip }}
    >
      {children}
    </CurrentTripContext.Provider>
  );
};

export default CurrentTripProvider;
