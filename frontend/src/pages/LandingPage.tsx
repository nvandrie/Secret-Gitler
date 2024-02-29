import LandingOptions from "../components/LandingOptions";
import { useState } from "react";

function LandingPage() {
    const landingOptions = ['default', 'signup', 'login'];

    const [authState, setAuthState] = useState<string>(landingOptions[0]);

    return (
        <div>
            <LandingOptions authState={authState} setAuthState={setAuthState}/>
        </div>
    )
}

export default LandingPage;