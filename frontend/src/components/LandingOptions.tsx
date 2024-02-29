import React from 'react';
import SignUp from './SignUp';
import LogIn from './LogIn';

interface AuthProps {
  authState: string;
  setAuthState: React.Dispatch<React.SetStateAction<string>>;
}

const LandingOptions: React.FC<AuthProps> = ( { authState, setAuthState } ) => {
  return (
    <div>
      {authState === 'default' && (
        <div>
          <button onClick={() => setAuthState("login")}> Log In Here</button>
          <button onClick={() => setAuthState("signup")}>Sign Up Here</button>
        </div>
      )}
      {authState === 'signup' && <SignUp />}
      {authState === 'login' && <LogIn />}
    </div>
  );
};

export default LandingOptions;