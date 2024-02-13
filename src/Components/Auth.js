import React from "react";
import { useFirebase } from "../Context/Firebase";

export const Auth = () => {
  const { signIn } = useFirebase();
  return (
    <div>
      <button onClick={signIn}>Sign In With Google</button>
    </div>
  );
};
