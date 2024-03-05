import React from 'react';
import SignUp from './SignUp';
import LogIn from './LogIn';
import '../styling/App.css';

interface AuthProps {
  authState: string;
  setAuthState: React.Dispatch<React.SetStateAction<string>>;
}

const LandingOptions: React.FC<AuthProps> = ({ authState, setAuthState }) => {
  return (
    <div>
      {authState === "default" && (
        <div className="LandingButtonContainer">
          <button onClick={() => setAuthState("login")} className="LandingButton">
            {" "}
            Log In
          </button>
          <button onClick={() => setAuthState("signup")} className="LandingButton">
            Sign Up
          </button>
        </div>
      )}
      {authState === 'signup' && <SignUp />}
      {authState === 'login' && <LogIn />}
    </div>
  );
};

export default LandingOptions;
