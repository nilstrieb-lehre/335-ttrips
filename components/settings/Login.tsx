import React, { useContext, useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";

import { CredentialsContext, firebase } from "../../service/firebase";
import { Text, TextInput } from "../Themed";
import { useBackground } from "../../service/utils";
import sharedStyles from "../../constants/sharedStyles";

const Login = () => {
  const { setCredentials } = useContext(CredentialsContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const backgroundColor = useBackground();

  const login = () => {
    if (email && password) {
      firebase.login(email, password, setCredentials, setErrorMessage);
    }
  };
  const createUser = () => {
    if (email && password) {
      firebase.createUser(email, password, setCredentials, setErrorMessage);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={sharedStyles.title}>Account</Text>
      <Text>E-Mail</Text>
      <TextInput
        value={email}
        onChangeText={setEmail}
        autoCapitalize={"none"}
        accessibilityLabel="Email input"
        style={sharedStyles.input}
      />
      <Text>Password</Text>
      <TextInput
        value={password}
        onChangeText={setPassword}
        accessibilityLabel="Password input"
        style={sharedStyles.input}
        secureTextEntry
      />
      <View>
        <TouchableOpacity
          onPress={login}
          style={[sharedStyles.button, { backgroundColor }]}
        >
          <Text>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={createUser}
          style={[sharedStyles.button, { backgroundColor }]}
        >
          <Text>Create account</Text>
        </TouchableOpacity>
      </View>
      {errorMessage && <Text>{errorMessage}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    justifyContent: "center",
  },
});

export default Login;
