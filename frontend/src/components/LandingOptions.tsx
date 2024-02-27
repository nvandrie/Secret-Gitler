import React from "react";

const LandingOptions = (props: { setAuthState: (state: string) => void }) => {
  return (
    <div>
      <button onClick={() => props.setAuthState("LogIn")}> Log In Here</button>
      <button onClick={() => props.setAuthState("SignUp")}>Sign Up Here</button>
    </div>
  );
};
