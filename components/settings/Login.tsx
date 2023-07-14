import React, { useContext, useState } from "react";
import { Button, StyleSheet, View } from "react-native";

import { CredentialsContext, firebase } from "../../service/firebase";
import { Text, TextInput } from "../Themed";

const Login = () => {
  const { setCredentials } = useContext(CredentialsContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

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
    <View>
      <Text>E-Mail</Text>
      <TextInput
        value={email}
        onChangeText={setEmail}
        accessibilityLabel="Email input"
      />
      <Text>Password</Text>
      <TextInput
        value={password}
        onChangeText={setPassword}
        accessibilityLabel="Password input"
        secureTextEntry
      />
      <View>
        <Button onPress={login} title="Login" />
        <Button onPress={createUser} title="Create account" />
      </View>
      {errorMessage && <Text>{errorMessage}</Text>}
    </View>
  );
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const styles = StyleSheet.create({});

export default Login;
