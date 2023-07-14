import { UserCredential } from "firebase/auth";
import React, { useState } from "react";

import { CredentialsContext } from "./firebase";

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
