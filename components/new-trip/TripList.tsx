import React from "react";
import { FlatList, StyleSheet, TouchableOpacity, View } from "react-native";
import { Connection } from "../../service/transport";
import { Text } from "../Themed";
import { renderDate } from "../../service/utils";
import useCurrentTrip from "../../service/use-current-trip";

type Props = {
  trips: Connection[];
};

const TripList = ({ trips }: Props) => {
  const [_currentTrip, setCurrentTrip] = useCurrentTrip();

  return (
    <View style={styles.container}>
      <FlatList
        scrollEnabled={false}
        data={trips}
        renderItem={({ item }) => (
          <View>
            <TouchableOpacity onPress={() => setCurrentTrip(item)}>
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
