import FontAwesome from "@expo/vector-icons/FontAwesome";
import { UserCredential } from "firebase/auth";
import React, { useContext, useEffect, useState } from "react";
import {
  Button,
  Dimensions,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";

import Colors from "../../constants/Colors";
import { CredentialsContext, firebase } from "../../service/firebase";
import { Text, TextInput } from "../Themed";

const { width } = Dimensions.get("window");

const Settings = ({ credentials }: { credentials: UserCredential }) => {
  const { setCredentials } = useContext(CredentialsContext);
  const [locations, setLocations] = useState<string[]>([]);
  const [newLocation, setNewLocation] = useState("");
  const [error, setError] = useState<string | null>(null);

  const colorScheme = useColorScheme();

  useEffect(() => {
    const unsub = firebase.listenLocations(credentials.user.uid, setLocations);
    return () => unsub();
  }, []);

  const addLocation = () => {
    if (!newLocation) {
      return;
    }
    setError(null);
    const updated = [...locations, newLocation.trim()];
    firebase
      .setLocations(credentials.user.uid, updated)
      .then(() => setNewLocation(""))
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

  return (
    <View style={styles.container}>
      <Text>Logged in as {credentials.user.email}</Text>
      <View style={styles.locations}>
        <View>
          <TextInput
            value={newLocation}
            onChangeText={setNewLocation}
            accessibilityLabel="Add new Location"
            style={styles.locationInput}
          />
          <Button title="Add new" onPress={addLocation} />
          {error && <Text>{error}</Text>}
        </View>
        <FlatList
          data={locations}
          renderItem={({ item, index }) => (
            <View style={styles.locationItem}>
              <Text>{item}</Text>
              <TouchableOpacity onPress={() => removeLocation(index)}>
                <FontAwesome
                  size={40}
                  name="trash"
                  color={Colors[colorScheme ?? "light"].text}
                />
              </TouchableOpacity>
            </View>
          )}
        />
      </View>
      <View style={styles.footer}>
        <Button title="Logout" onPress={() => setCredentials(null)} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
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
    paddingTop: 5,
    paddingBottom: 5,
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    width: 0.8 * width,
    alignItems: "center",
  },
  footer: {
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: "grey",
  },
});

export default Settings;
