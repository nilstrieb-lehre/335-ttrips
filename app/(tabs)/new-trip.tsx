import { StyleSheet } from "react-native";
import { View } from "../../components/Themed";
import NewTrips from "../../components/new-trip/NewTrips";

export default function NewTrip() {
  return (
    <View style={styles.container}>
      <NewTrips />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
