import React, { useEffect, useState } from "react";
import {
  Button,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { UserCredential } from "firebase/auth";
import { Text } from "../Themed";
import { firebase } from "../../service/firebase";

const Settings = ({ credentials }: { credentials: UserCredential }) => {
  const [locations, setLocations] = useState<string[]>([]);

  useEffect(() => {
    const unsub = firebase.listenLocations(credentials.user.uid, setLocations);
    return () => unsub();
  });

  const addLocation = () => {};

  return (
    <View>
      <Text>Logged in as {credentials.user.email}</Text>
      <View>
        <Button title="Add new" onPress={addLocation} />
      </View>
      <FlatList
        style={styles.list}
        data={locations}
        renderItem={({ item }) => (
          <View>
            <Text>{item}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  list: {
    maxHeight: 500,
  },
});

export default Settings;
