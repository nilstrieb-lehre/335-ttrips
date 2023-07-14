import React from "react";
import { StyleSheet, View } from "react-native";

import StationCompass from "./StationCompass";
import TripProgress from "./TripProgress";
import { Connection } from "../../service/transport";
import { nextStop } from "../../service/tripping";
import useCurrentTrip from "../../service/use-current-trip";
import { Link, Text } from "../Themed";

const TripInfo = ({ currentTrip }: { currentTrip: Connection }) => {
  const next = nextStop(currentTrip);

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>
          {currentTrip.from.station.name} → {currentTrip.to.station.name}
        </Text>
      </View>
      {next && <StationCompass nextStation={next.station.coordinate} />}
      <TripProgress currentTrip={currentTrip} />
    </View>
  );
};

const CurrentTrip = () => {
  const { currentTrip } = useCurrentTrip();

  return (
    <View>
      {currentTrip ? (
        <TripInfo currentTrip={currentTrip} />
      ) : (
        <View>
          <Text>No current trip.</Text>
          <Link href="/new-trip">
            <Text>Create new trip</Text>
          </Link>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: 20,
  },
  title: {
    fontSize: 15,
    marginBottom: 5,
  },
});

export default CurrentTrip;
