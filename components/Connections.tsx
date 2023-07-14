import { router } from "expo-router";
import React from "react";
import { FlatList, StyleSheet, TouchableOpacity, View } from "react-native";

import { Text, useThemeColor } from "./Themed";
import Colors from "../constants/Colors";
import { Connection } from "../service/transport";
import useCurrentTrip from "../service/use-current-trip";
import { renderDate } from "../service/utils";

type ConnectionsProps = {
  data: Connection[];
};

const Connections = ({ data }: ConnectionsProps) => {
  const searchStationBackground = useThemeColor(
    {
      light: Colors.searchView.light.background,
      dark: Colors.searchView.dark.background,
    },
    "background",
  );

  const searchStationForeground = useThemeColor(
    { light: Colors.searchView.light.text, dark: Colors.searchView.dark.text },
    "text",
  );
  const { setCurrentTrip } = useCurrentTrip();

  const renderItem = ({ item }: { item: Connection }) => {
    const from = renderDate(item.from.departure!, false);
    const to = renderDate(item.to.arrival!, false);

    return (
      <TouchableOpacity
        style={[
          styles.connection,
          { backgroundColor: searchStationBackground },
        ]}
        key={item.from.departure}
        onPress={() => {
          setCurrentTrip(item);
          router.replace("/");
        }}
      >
        <Text>Headed to {item.sections[0].arrival.station.name}</Text>
        <View style={styles.times}>
          <Text>{from}</Text>
          <View style={styles.stationDrawing}>
            <View
              style={[
                styles.stationPoint,
                { backgroundColor: searchStationForeground },
              ]}
            />
            <View
              style={[
                styles.stationConnection,
                { backgroundColor: searchStationForeground },
              ]}
            />
            <View
              style={[
                styles.stationPoint,
                { backgroundColor: searchStationForeground },
              ]}
            />
          </View>
          <Text>{to}</Text>
        </View>
        <View style={styles.duration}>
          <Text>{item.duration}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <FlatList
      data={data}
      contentContainerStyle={styles.container}
      renderItem={renderItem}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    minWidth: "100%",
    marginTop: 25,
  },
  connection: {
    display: "flex",
    width: "100%",
    height: 100,
    marginVertical: 2,
    borderRadius: 15,
    padding: 15,
  },
  times: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  stationDrawing: {
    position: "relative",
    flex: 1,
    maxWidth: "70%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  duration: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  stationPoint: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  stationConnection: {
    position: "absolute",
    width: "98%",
    height: 5,
    left: 2,
  },
});

export default Connections;
