import React from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { Link, Text } from "../Themed";
import useCurrentTrip from "../../service/use-current-trip";

const CurrentTrip = () => {
  const [currentTrip, setCurrentTrip] = useCurrentTrip();
  return (
    <View>
      {currentTrip ? (
        <View>
          <Text>{currentTrip.from.station.name}</Text>
          <Text>{currentTrip.to.station.name}</Text>
          <FlatList
            data={currentTrip.sections}
            renderItem={({ item }) => (
              <View>
                <Text>
                  {item.departure.station.name} to {item.arrival.station.name}
                </Text>
              </View>
            )}
          />
        </View>
      ) : (
        <View>
          <Text>No current trip.</Text>
          <Link href="/new-trip">
            <Text>whaaat</Text>
          </Link>
          <Text>No current trip.</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({});

export default CurrentTrip;
