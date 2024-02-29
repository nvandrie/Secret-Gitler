import LandingOptions from "../components/LandingOptions";
import { useState } from "react";
import text_logo from '/text_logo.png';
import '../styling/App.css';

function LandingPage() {
    const landingOptions = ['default', 'signup', 'login'];

    const [authState, setAuthState] = useState<string>(landingOptions[0]);

    return (
        <div className="LandingPage">
            <img src={text_logo} alt="Image"/>
            <LandingOptions authState={authState} setAuthState={setAuthState}/>
        </div>
    )
}

export default LandingPage;