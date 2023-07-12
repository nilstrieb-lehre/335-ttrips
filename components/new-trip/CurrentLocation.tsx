import React from "react";
import { Button, StyleSheet, View } from "react-native";

const CurrentLocation = () => {
  return (
    <View>
      <Button title="Use current location" onPress={() => alert("no!")} />
    </View>
  );
};

const styles = StyleSheet.create({});

export default CurrentLocation;
