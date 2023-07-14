import React, { useContext } from "react";

import Login from "./Login";
import Settings from "./Settings";
import { CredentialsContext } from "../../service/firebase";

const AccountSettings = () => {
  const { credentials } = useContext(CredentialsContext);

  return (
    <>{credentials ? <Settings credentials={credentials} /> : <Login />}</>
  );
};

export default AccountSettings;
