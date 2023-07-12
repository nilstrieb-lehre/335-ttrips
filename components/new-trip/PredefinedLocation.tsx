import { Text, View } from "../Themed";
import { StyleSheet, TouchableOpacity } from "react-native";
import React from "react";

export const PredefinedLocation = ({ name }: { name: string }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity>
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
