import { SafeAreaView, StyleSheet } from "react-native";

import CurrentTrip from "../../components/current-trip/CurrentTrip";

export default function TabOneScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <CurrentTrip />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
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
