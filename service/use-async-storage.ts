import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

function useAsyncStorage<T>(
  name: string,
  initialValue: T,
): [T, (value: T) => void] {
  const [value, setValue] = useState(initialValue);

  const set = (item: T) => {
    AsyncStorage.setItem(name, JSON.stringify(item)).then(() => setValue(item));
  };

  useEffect(() => {
    AsyncStorage.getItem(name)
      .then((value) => {
        if (value === null) {
          set(initialValue);
        } else {
          setValue(JSON.parse(value));
        }
      })
      .catch(() => {});
  }, []);

  return [value, set];
}

export default useAsyncStorage;
