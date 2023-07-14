import React, { useContext } from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "../Themed";
import { CredentialsContext } from "../../service/firebase";
import Settings from "./Settings";
import Login from "./Login";

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
