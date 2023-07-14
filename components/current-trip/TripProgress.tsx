import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Connection } from "../../service/transport";
import { Text } from "../Themed";
import { tripToStopStations } from "../../service/tripping";
import { renderDate } from "../../service/utils";

const TripProgress = ({ currentTrip }: { currentTrip: Connection }) => {
  const [[stations, currentPosition], setStations] = useState(
    tripToStopStations(currentTrip),
  );

  useEffect(() => {
    setStations(tripToStopStations(currentTrip));

    const timer = setInterval(
      () => setStations(tripToStopStations(currentTrip)),
      10_000,
    );

    return () => clearInterval(timer);
  }, [currentTrip, setStations]);

  return (
    <ScrollView style={styles.container}>
      {stations.map((station, idx) => {
        const isAtStation =
          currentPosition.type === "AtStation" &&
          currentPosition.stationIndex === idx;

        const isBeforeStation =
          currentPosition.type === "EnRoute" &&
          currentPosition.beforeStationIndex === idx;

        return (
          <View
            style={[
              styles.station,
              isBeforeStation ? { borderTopColor: "red" } : {},
            ]}
            key={idx}
          >
            <View style={styles.times}>
              <Text>{station.arrival && renderDate(station.arrival)}</Text>
              <Text>{station.departure && renderDate(station.departure)}</Text>
            </View>
            <View style={styles.name}>
              <Text style={isAtStation ? { color: "red" } : {}}>
                {station.station.name}
              </Text>
            </View>
            <View style={styles.platforms}>
              <Text>{station.arrivalPlatform}</Text>
              <Text>{station.departurePlatform}</Text>
            </View>
          </View>
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  station: {
    borderTopWidth: 1,
    borderTopColor: "grey",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 5,
    paddingBottom: 5,
  },
  times: {
    marginRight: 10,
  },
  platforms: {
    display: "flex",
    alignItems: "flex-end",
  },
  name: {
    display: "flex",
    justifyContent: "center",
  },
});

export default TripProgress;
