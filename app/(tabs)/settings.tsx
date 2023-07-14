import { SafeAreaView, StyleSheet } from "react-native";

import AccountSettings from "../../components/settings/AccountSettings";

export default function TabTwoScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <AccountSettings />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
