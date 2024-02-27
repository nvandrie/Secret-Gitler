import React from 'react';

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
      {authState === 'signup' && <p>SignUp component here</p>}
      {authState === 'login' && <p>Login component here</p>}
    </div>
  );
};

export default LandingOptions;