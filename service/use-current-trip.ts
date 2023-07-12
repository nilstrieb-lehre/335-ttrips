import { Connection } from "./transport";
import useAsyncStorage from "./use-async-storage";

function useCurrentTrip(): [
  Connection | null,
  (trip: Connection | null) => void,
] {
  return useAsyncStorage<Connection | null>("current-trip", null);
}

export default useCurrentTrip;
