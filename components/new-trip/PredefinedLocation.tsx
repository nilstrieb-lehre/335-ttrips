import { Text, View } from "../Themed";
import { StyleSheet, TouchableOpacity } from "react-native";
import React from "react";

type Props = {
  name: string;
  setLocation: (location: string) => void;
};

export const PredefinedLocation = ({ name, setLocation }: Props) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => setLocation(name)}>
        <Text>{name}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 100,
    width: 100,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "grey",
  },
});
