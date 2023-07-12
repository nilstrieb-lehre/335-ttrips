import React from "react";
import { Button, StyleSheet } from "react-native";
import { View } from "../Themed";
import { PredefinedLocation } from "./PredefinedLocation";
import SearchLocation from "./SearchLocation";
import CurrentLocation from "./CurrentLocation";

type Props = {
  setLocation: (location: string) => void;
};

const Location = ({ setLocation }: Props) => {
  return (
    <View>
      <SearchLocation setLocation={setLocation} />
      <CurrentLocation />
      <View style={styles.predefined}>
        <PredefinedLocation name="Schaffhausen" setLocation={setLocation} />
        <PredefinedLocation name="Winterthur" setLocation={setLocation} />
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
