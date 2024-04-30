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
    <div className={`full-screen-container ${isVisible ? "visible" : ""}`}>
      {isVisible && (
        <div className="centered-rectangle">
          <p>Among you there are...</p>
          <p>4 liberals, 1 fascist, and 1 Hitler</p>
          <p>
            Either team may win by filling their board with their respective
            policies...
          </p>
          <p>
            and the fascists and Hitler may win by electing Hitler chancellor
            after 3 fascist policies have been played.
          </p>
          <button onClick={toggleVisibility}>Okay</button>
        </div>
      )}
    </div>
  );
};

export default StartGameStorytelling;
