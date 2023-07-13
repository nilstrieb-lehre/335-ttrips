import React from "react";
import { StyleSheet, View } from "react-native";
import { Link, Text } from "../Themed";
import useCurrentTrip from "../../service/use-current-trip";
import { nextStop } from "../../service/tripping";
import StationCompass from "./StationCompass";

const CurrentTrip = () => {
  const { currentTrip } = useCurrentTrip();
  return (
    <View>
      {currentTrip ? (
        <View>
          <View>
            <Text>
              {currentTrip.from.station.name} to {currentTrip.to.station.name}
            </Text>
            <Text>
              Next stop: {nextStop(currentTrip)?.station.name ?? "unknown"}
            </Text>
          </View>
          <StationCompass />
        </View>
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

const styles = StyleSheet.create({});

export default CurrentTrip;
