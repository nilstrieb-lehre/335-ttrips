import React, { useState } from "react";
import {
  Button,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { Text, TextInput } from "../Themed";
import { Location, locations } from "../../service/transport";

type Props = {
  setLocation: (location: string) => void;
};

const SearchLocation = ({ setLocation }: Props) => {
  const [query, setQuery] = useState("");
  const [stations, setStations] = useState<Location[]>([]);

  const search = () => {
    if (!query) {
      return;
    }
    console.log("search");
    locations({ query })
      .then((res) => setStations(res.stations))
      .catch(console.error);
  };

  return (
    <View>
      <TextInput style={styles.customInput} onChangeText={setQuery} />
      <Button title="Search" onPress={search} />
      <View style={styles.stations}>
        {stations.length > 0 && (
          <FlatList
            data={stations}
            renderItem={({ item }) => (
              <View>
                <TouchableOpacity onPress={() => setLocation(item.name)}>
                  <Text>{item.name}</Text>
                </TouchableOpacity>
              </View>
            )}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  customInput: {
    borderWidth: 1,
    borderColor: "grey",
    height: 40,
  },
  stations: {
    height: 50,
  },
});

export default SearchLocation;
