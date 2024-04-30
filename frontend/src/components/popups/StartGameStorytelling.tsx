import React, { useEffect, useState } from "react";
import "../../styling/popup.css";

const StartGameStorytelling: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Set isVisible to true when the component mounts
    setIsVisible(true);
  }, []);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div className={`story_telling_container ${isVisible ? "visible" : ""}`}>
      {isVisible && (
        <div className="centered-rectangle">
          <p>Among you there are...</p>
          <p className="RedText">4 Liberals, 1 Fascist, and 1 Hitler</p>
          <p>
            Either team may win by filling their board with their respective
            policies.
          </p>
          <p className="center-two-line">
            REMEMBER! After 3 fascist policies have been played, the fascists
            and Hitler may win by electing Hitler chancellor...
          </p>
          <button className="Button" onClick={toggleVisibility}>
            Okay
          </button>
        </div>
      )}
    </div>
  );
};

export default StartGameStorytelling;
