import React, { useState } from "react";
import { Button, ScrollView, StyleSheet, View } from "react-native";
import { Text } from "../Themed";
import Location from "./Location";
import {
  Connection,
  connections as fetchConnections,
} from "../../service/transport";
import TripList from "./TripList";

const NewTrips = () => {
  const [fromLocation, setFromLocation] = useState<string | null>(null);
  const [toLocation, setToLocation] = useState<string | null>(null);

  const [connections, setConnections] = useState<Connection[]>([]);

  const onStartTrip = () => {
    if (!fromLocation || !toLocation) {
      return;
    }

    fetchConnections({ from: fromLocation, to: toLocation })
      .then((c) => setConnections(c.connections))
      .catch(console.error);
  };

  return (
    <ScrollView>
      <Text>From</Text>
      <Location setLocation={setFromLocation} />
      <View style={styles.separator} />
      <Text>To</Text>
      <Location setLocation={setToLocation} />
      <Button title="lets gooo" onPress={onStartTrip} />
      {connections && <TripList trips={connections} />}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});

export default NewTrips;
