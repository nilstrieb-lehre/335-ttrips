import { router } from "expo-router";
import React, { useState } from "react";
import { FlatList, StyleSheet, TouchableOpacity, View } from "react-native";

import { Connection, Section } from "../../service/transport";
import useCurrentTrip from "../../service/use-current-trip";
import { renderDate, useBackground, useForeground } from "../../service/utils";
import { Text } from "../Themed";

type ConnectionsProps = {
  data: Connection[];
};

const Connections = ({ data }: ConnectionsProps) => {
  const searchStationBackground = useBackground();

  const searchStationForeground = useForeground();
  const { setCurrentTrip } = useCurrentTrip();
  const [{ width }, setDimension] = useState({ width: 0, height: 0 });

  const renderItem = ({ item }: { item: Connection }) => {
    const sectionsWithoutWalk = item.sections.filter((val) => val.walk == null);
    const from = renderDate(item.from.departure!, true);
    const to = renderDate(item.to.arrival!, true);

    const duration = item.duration.substring(3).split(":");
    const durationHours = parseInt(duration[0], 10);
    let durationMinutes = parseInt(duration[1], 10);
    if (parseInt(duration[2], 10) > 0) {
      durationMinutes++;
    }

    const hourFormatted = durationHours > 0 ? `${durationHours}hrs ` : "";

    const startDate = new Date(item.from.departure!).getTime();

    const totalDurationOfTrip =
      new Date(item.to.arrival!).getTime() - startDate;

    const mapPointToPosition = (item: Section) => {
      const arrival = new Date(item.arrival.arrival!).getTime();
      const percentage = (arrival - startDate) / totalDurationOfTrip;
      return width * percentage;
    };

    const points: React.ReactNode[] = sectionsWithoutWalk
      .slice(0, sectionsWithoutWalk.length - 1)
      .map(mapPointToPosition)
      .map((left) => (
        <View
          key={left}
          style={[
            styles.stationPointsAbsolute,
            { left, backgroundColor: searchStationForeground },
          ]}
        />
      ));

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
          <View
            style={styles.stationDrawing}
            onLayout={(e) => setDimension(e.nativeEvent.layout)}
          >
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
            {points}
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
          <Text>
            {hourFormatted}
            {durationMinutes}min
          </Text>
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
  stationPointsAbsolute: {
    width: 10,
    height: 10,
    borderRadius: 5,
    position: "absolute",
  },
});

export default Connections;
