import React from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "../Themed";
import Location from "./Location";

const NewTrips = () => {
  return (
    <View>
      <Text>From</Text>
      <Location />
      <View style={styles.separator} />
      <Text>To</Text>
      <Location />
    </View>
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
