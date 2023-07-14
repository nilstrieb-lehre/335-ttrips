import React, { useContext } from "react";
import { StyleSheet, View } from "react-native";

import Login from "./Login";
import Settings from "./Settings";
import { CredentialsContext } from "../../service/firebase";
import { Text } from "../Themed";

const AccountSettings = () => {
  const { credentials } = useContext(CredentialsContext);

  return (
    <View>
      <Text style={styles.title}>Account</Text>
      {credentials ? <Settings credentials={credentials} /> : <Login />}
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default AccountSettings;
