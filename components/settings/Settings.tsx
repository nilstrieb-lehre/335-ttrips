import FontAwesome from "@expo/vector-icons/FontAwesome";
import { UserCredential } from "firebase/auth";
import React, { useContext, useEffect, useState } from "react";
import {
  FlatList,
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";

import Colors from "../../constants/Colors";
import sharedStyles from "../../constants/sharedStyles";
import { CredentialsContext, firebase } from "../../service/firebase";
import { useBackground } from "../../service/utils";
import { Text, TextInput } from "../Themed";
import debounce from "../../service/debounce";
import { Location, locations as getLocations } from "../../service/transport";

type LocationProps = {
  filled: boolean;
  name: string;
  onPress: () => void;
};

const LocationDisplay = ({ filled, name, onPress }: LocationProps) => {
  const backgroundColor = useBackground();
  const colorScheme = useColorScheme();
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.locationItem, { backgroundColor }]}
    >
      {filled ? (
        <FontAwesome
          name="star"
          size={24}
          color={Colors[colorScheme ?? "light"].text}
        />
      ) : (
        <FontAwesome
          name="star-o"
          size={24}
          color={Colors[colorScheme ?? "light"].text}
        />
      )}
      <Text style={styles.locationText}>{name}</Text>
    </TouchableOpacity>
  );
};

const Settings = ({ credentials }: { credentials: UserCredential }) => {
  const { setCredentials } = useContext(CredentialsContext);
  const [locations, setLocations] = useState<string[]>([]);
  const [newLocation, setNewLocation] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [searchModeActive, setSearchModeActive] = useState(false);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState<Location[]>([]);

  const handleSearchChange = debounce((val) => setSearch(val), 500);

  useEffect(() => {
    const unsub = firebase.listenLocations(credentials.user.uid, setLocations);
    return () => unsub();
  }, []);

  useEffect(() => {
    getLocations({ query: search }).then((res) =>
      setSearchResults(res.stations),
    );
  }, [search]);

  const addLocation = (item: Location) => {
    setError(null);
    const updated = [...locations, item.name];
    console.log("called");
    setNewLocation("");
    setSearchModeActive(false);
    firebase
      .setLocations(credentials.user.uid, updated)
      .catch(() => setError("An error occurred when adding a location"));
  };

  const removeLocation = (idx: number) => {
    setError(null);
    const updated = [...locations];
    updated.splice(idx, 1);
    firebase
      .setLocations(credentials.user.uid, updated)
      .catch(() => setError("An error occurred when removing the location"));
  };

  const renderLocation = ({ item, index }: { item: string; index: number }) => (
    <LocationDisplay filled name={item} onPress={() => removeLocation(index)} />
  );

  return (
    <View style={styles.container}>
      <View style={styles.loginView}>
        <Text>Logged in as {credentials.user.email}</Text>
        <TouchableOpacity onPress={() => setCredentials(null)}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.locations}>
        <View>
          <TextInput
            value={newLocation}
            onFocus={() => setSearchModeActive(true)}
            onChangeText={(val) => {
              handleSearchChange(val);
              setNewLocation(val);
            }}
            accessibilityLabel="Add new Location"
            style={[sharedStyles.input, { width: "100%" }]}
          />
          {error && <Text>{error}</Text>}
        </View>

        {!searchModeActive ? (
          <>
            <Text style={[sharedStyles.title, { marginTop: 15 }]}>
              Saved locations
            </Text>
            <FlatList data={locations} renderItem={renderLocation} />
          </>
        ) : (
          <FlatList
            data={searchResults}
            renderItem={({ item, index }) => (
              <LocationDisplay
                key={index}
                name={item.name}
                filled={false}
                onPress={() => {
                  console.log("called");
                  addLocation(item);
                }}
              />
            )}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    minWidth: "80%",
    flex: 1,
  },
  locations: {
    paddingTop: 10,
    marginTop: 10,
    borderTopWidth: 1,
    borderTopColor: "grey",
  },
  locationInput: {
    marginBottom: 5,
    padding: 3,
  },
  locationItem: {
    padding: 15,
    marginVertical: 5,
    borderRadius: 5,
    flex: 1,
    flexDirection: "row",
    maxWidth: "100%",
    alignItems: "center",
  },
  footer: {
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: "grey",
  },
  loginView: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  logoutText: {
    color: "#0345fc",
  },
  locationText: {
    marginLeft: 35,
  },
});

export default Settings;
