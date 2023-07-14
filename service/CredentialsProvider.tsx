import React, { useState } from "react";
import { CredentialsContext } from "./firebase";
import { UserCredential } from "firebase/auth";

const CredentialsProvider = ({
  children,
}: {
  children: JSX.Element | JSX.Element[];
}) => {
  const [credentials, setCredentials] = useState<UserCredential | null>(null);

  return (
    <CredentialsContext.Provider value={{ credentials, setCredentials }}>
      {children}
    </CredentialsContext.Provider>
  );
};

export default CredentialsProvider;
