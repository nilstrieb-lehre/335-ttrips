import { router } from "expo-router";
import React from "react";
import { FlatList, StyleSheet, TouchableOpacity, View } from "react-native";

import { Connection } from "../../service/transport";
import useCurrentTrip from "../../service/use-current-trip";
import { renderDate } from "../../service/utils";
import { Text } from "../Themed";

type Props = {
  trips: Connection[];
};

const TripList = ({ trips }: Props) => {
  const { setCurrentTrip } = useCurrentTrip();

  return (
    <View style={styles.container}>
      <FlatList
        scrollEnabled={false}
        data={trips}
        renderItem={({ item }) => (
          <View>
            <TouchableOpacity
              onPress={() => {
                setCurrentTrip(item);
                // Go to the current trip
                router.replace("/");
              }}
            >
              <Text>
                {item.from.station.name} - {item.to.station.name}
              </Text>
              <Text>
                {renderDate(item.from.departure!)} -{" "}
                {renderDate(item.to.arrival!)}
              </Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    borderTopColor: "grey",
    borderTopWidth: 2,
  },
  trip: {
    borderWidth: 1,
    borderColor: "grey",
  },
});

export default TripList;
