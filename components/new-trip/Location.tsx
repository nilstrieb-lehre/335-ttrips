import React from "react";
import { StyleSheet } from "react-native";
import { TextInput, View } from "../Themed";
import { PredefinedLocation } from "./PredefinedLocation";
import SearchLocation from "./SearchLocation";
import CurrentLocation from "./CurrentLocation";

const Location = () => {
  return (
    <View>
      <SearchLocation />
      <CurrentLocation />
      <View style={styles.predefined}>
        <PredefinedLocation name="home" />
        <PredefinedLocation name="work" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  predefined: {
    display: "flex",
    flexDirection: "row",
  },
});

export default Location;
