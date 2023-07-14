import { Foundation, MaterialIcons } from "@expo/vector-icons";
import {
  getCurrentPositionAsync,
  LocationAccuracy,
  LocationObject,
  requestForegroundPermissionsAsync,
  watchPositionAsync,
} from "expo-location";
import { router } from "expo-router";
import React, {
  RefObject,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  ScrollView,
  StyleProp,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";

import SearchLocation from "./SearchLocation";
import Colors from "../../constants/Colors";
import debounce from "../../service/debounce";
import { CredentialsContext, firebase } from "../../service/firebase";
import {
  Connection,
  connections as getConnections,
  Location,
  locations,
} from "../../service/transport";
import Connections from "../Connections";
import { Text, useThemeColor } from "../Themed";

type SearchViewProps = {
  onFocus?: (el: ActiveInput) => void;
  onBlur?: () => void;
  fromValue: string;
  toValue: string;
  onFromChange: (val: string) => void;
  onToChange: (val: string) => void;
  fromRef?: RefObject<TextInput>;
  toRef?: RefObject<TextInput>;
};
const SearchView = (props: SearchViewProps) => {
  const searchStationBackground = useThemeColor(
    {
      light: Colors.searchView.light.background,
      dark: Colors.searchView.dark.background,
    },
    "background",
  );

  return (
    <View
      style={[{ backgroundColor: searchStationBackground }, styles.searchView]}
    >
      <StationConnection />
      <View style={styles.searchStations}>
        <SearchLocation
          label="From"
          borderBottom
          onFocus={() => props.onFocus && props.onFocus(ActiveInput.FROM)}
          onBlur={props.onBlur}
          value={props.fromValue}
          onLocationInput={props.onFromChange}
          textInputRef={props.fromRef}
        />
        <SearchLocation
          label="To"
          onBlur={props.onBlur}
          onFocus={() => props.onFocus && props.onFocus(ActiveInput.TO)}
          value={props.toValue}
          onLocationInput={props.onToChange}
          textInputRef={props.toRef}
        />
      </View>
    </View>
  );
};

const StationConnection = () => {
  const searchStationForeground = useThemeColor(
    { light: Colors.searchView.light.text, dark: Colors.searchView.dark.text },
    "text",
  );

  return (
    <View style={styles.stationView}>
      <View
        style={[
          { backgroundColor: searchStationForeground },
          styles.stationPoint,
        ]}
      />
      <View
        style={[
          { backgroundColor: searchStationForeground },
          styles.stationPoint,
        ]}
      />
      <View
        style={[
          { backgroundColor: searchStationForeground },
          styles.stationConnection,
        ]}
      />
    </View>
  );
};
const ResultElement = ({
  children,
  withTopBorder = true,
  withBottomBorder = true,
  style,
  hasIcon = false,
  onPress,
}: {
  children?: React.ReactNode | React.ReactNode[];
  withTopBorder?: boolean;
  withBottomBorder?: boolean;
  style?: StyleProp<ViewStyle>;
  hasIcon?: boolean;
  onPress?: () => void;
}) => {
  const borderColor = useThemeColor(
    { light: Colors.searchView.light.text, dark: Colors.searchView.dark.text },
    "text",
  );

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.resultElement,
        { borderColor },
        withTopBorder && { borderTopWidth: 1 },
        withBottomBorder && { borderBottomWidth: 1 },
        style,
        !hasIcon && { paddingLeft: 15 + 24 + 20 },
      ]}
    >
      <View
        style={
          Array.isArray(children) &&
          children.length > 1 && {
            flex: 1,
            flexDirection: "row",
            alignItems: "center",
          }
        }
      >
        {children}
      </View>
    </TouchableOpacity>
  );
};

type ResultViewProps = {
  searchValue: string;
  setSearchValue: (val: string) => void;
  predefinedLocations: string[];
};

const searchCache = new Map<string, Location[]>();

const ResultView = ({
  searchValue,
  setSearchValue,
  predefinedLocations,
}: ResultViewProps) => {
  const [searchResults, setSearchResults] = useState<Location[]>([]);
  const backgroundColor = useThemeColor(
    {
      light: Colors.searchView.light.background,
      dark: Colors.searchView.dark.background,
    },
    "background",
  );

  const foreGround = useThemeColor(
    { light: Colors.searchView.light.text, dark: Colors.searchView.dark.text },
    "text",
  );

  useEffect(() => {
    const cacheHit = searchCache.get(searchValue);
    if (cacheHit != null) {
      setSearchResults(cacheHit);
      return;
    }
    locations({ query: searchValue }).then((val) =>
      setSearchResults(val.stations),
    );
  }, [searchValue]);

  return (
    <View style={[styles.resultView, { backgroundColor }]}>
      <ScrollView
        contentContainerStyle={{ alignItems: "center" }}
        keyboardShouldPersistTaps="handled"
      >
        {searchValue.length === 0 && (
          <ResultElement
            style={{ marginBottom: 35 }}
            onPress={() => setSearchValue("Current Location")}
            hasIcon
          >
            <MaterialIcons name="my-location" size={24} color={foreGround} />
            <Text style={{ marginLeft: 20 }}>Current Location</Text>
          </ResultElement>
        )}

        {predefinedLocations
          .filter(
            (val) =>
              val.toLowerCase().includes(searchValue.toLowerCase()) ||
              searchValue.toLowerCase().includes(val.toLowerCase()),
          )
          .map((item, index) => (
            <ResultElement
              key={index}
              hasIcon
              withTopBorder={index === 0}
              onPress={() => setSearchValue(item)}
              style={
                index === predefinedLocations.length - 1 && { marginBottom: 35 }
              }
            >
              <Foundation name="star" size={24} color={foreGround} />
              <Text style={{ marginLeft: 20 }}>{item}</Text>
            </ResultElement>
          ))}

        {searchResults.map((val, idx) => (
          <ResultElement
            key={val.name}
            onPress={() => setSearchValue(val.name)}
            withTopBorder={idx === 0}
          >
            <Text>{val.name}</Text>
          </ResultElement>
        ))}
      </ScrollView>
    </View>
  );
};

enum ActiveInput {
  FROM,
  TO,
}

const NewTrips = () => {
  const [predefinedLocations, setPredefinedLocations] = useState<string[]>([]);
  const { credentials } = useContext(CredentialsContext);

  useEffect(() => {
    const unsub = credentials
      ? firebase.listenLocations(credentials.user.uid, setPredefinedLocations)
      : () => {};

    return () => unsub();
  }, [credentials?.user.uid]);

  useEffect(() => {
    async function requestPermission() {
      const { status } = await requestForegroundPermissionsAsync();
      if (status !== "granted") {
        router.replace("/");
      }
    }
    requestPermission().then(() => console.log("watching location"));
  }, []);

  const [activeElement, setActiveElement] = useState<ActiveInput | null>(null);
  const [fromValue, setFromValue] = useState("");
  const [toValue, setToValue] = useState("");
  const [connections, setConnections] = useState<Connection[]>();
  const fromRef = useRef<TextInput>(null);
  const toRef = useRef<TextInput>(null);

  const handleFocus = (ae: ActiveInput) => {
    setSearchValue("");
    if (ae === ActiveInput.FROM) setFromValue("");
    else setToValue("");

    setActiveElement(ae);
  };
  const handleSearchChange = debounce((val) => setSearchValue(val), 500);

  const handleSelection = async (val: string) => {
    const newFromVal = activeElement === ActiveInput.FROM ? val : fromValue;
    const newToVal = activeElement === ActiveInput.TO ? val : toValue;
    if (activeElement === ActiveInput.FROM) {
      setFromValue(val);
      if (toValue === "") toRef.current?.focus();
      else fromRef.current?.blur();
    } else if (activeElement === ActiveInput.TO) {
      setToValue(val);
      toRef.current?.blur();
    }

    setActiveElement(null);
    if (newFromVal.length > 0 && newToVal.length > 0) {
      console.log("Fetching connections");
      try {
        const from =
          newFromVal === "Current Location"
            ? await findNearestStation()
            : newFromVal;
        const to =
          newToVal === "Current Location"
            ? await findNearestStation()
            : newToVal;

        await getConnections({ from, to })
          .then((connections) => setConnections(connections.connections))
          .then(() => console.log("Fetched connections"));
      } catch (e) {
        console.error(e);
      }
    }
  };

  const findNearestStation = async (): Promise<string> => {
    const location = await getCurrentPositionAsync();
    return locations({
      x: location.coords.longitude.toString(10),
      y: location.coords.latitude.toString(10),
    }).then((res) => res.stations[0].name);
  };

  const [searchValue, setSearchValue] = useState("");

  return (
    <View style={styles.container}>
      <SearchView
        onFocus={handleFocus}
        fromValue={fromValue}
        toValue={toValue}
        onBlur={() => setActiveElement(null)}
        onFromChange={(val) => {
          setFromValue(val);
          handleSearchChange(val);
        }}
        onToChange={(val) => {
          setToValue(val);
          handleSearchChange(val);
        }}
        fromRef={fromRef}
        toRef={toRef}
      />
      {activeElement != null && (
        <ResultView
          searchValue={searchValue}
          setSearchValue={handleSelection}
          predefinedLocations={predefinedLocations}
        />
      )}
      {connections && activeElement == null && (
        <Connections data={connections} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "90%",
  },
  searchView: {
    flex: 1,
    minHeight: 100,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    borderRadius: 15,
    width: "80%",
    maxHeight: 100,
    marginTop: 10,
  },
  stationPoint: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  stationView: {
    position: "relative",
    display: "flex",
    height: "65%",
    flexDirection: "column",
    justifyContent: "space-between",
    width: 25,
    paddingHorizontal: 10,
  },
  stationConnection: {
    position: "absolute",
    left: 12.5,
    top: 5,
    height: "85%",
    width: 5,
  },
  searchStations: {
    flex: 1,
    flexDirection: "column",
    marginLeft: 10,
  },
  resultElement: {
    width: "100%",
    paddingVertical: 2,
    minHeight: 60,
    display: "flex",
    justifyContent: "center",
    paddingHorizontal: 15,
  },
  resultView: {
    flex: 1,
    minWidth: "98%",
    flexDirection: "column",
    marginTop: 25,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingTop: 25,
  },
});

export default NewTrips;
