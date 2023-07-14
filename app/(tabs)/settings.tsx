import { StyleSheet } from "react-native";

import EditScreenInfo from "../../components/EditScreenInfo";
import { Text, View } from "../../components/Themed";
import AccountSettings from "../../components/settings/AccountSettings";

export default function TabTwoScreen() {
  return (
    <View style={styles.container}>
      <AccountSettings />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
