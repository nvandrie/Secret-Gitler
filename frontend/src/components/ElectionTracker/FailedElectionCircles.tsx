import React from "react";
import "../../styling/Gameplay.css";

const FailedElectionCircles: React.FC<{ count: number }> = ({ count }) => {
  const renderCirclesWithArrows = () => {
    const circlesWithArrows = [];
    for (let i = 0; i < 3; i++) {
      if (i < count + 1) {
        circlesWithArrows.push(
          <React.Fragment key={i}>
            <div className="progress filled">{i}</div>
            {i < 2 && <div className="arrow">&#9660;</div>}
          </React.Fragment>
        );
      } else {
        circlesWithArrows.push(
          <React.Fragment key={i}>
            <div className="progress">{i}</div>
            {i < 2 && <div className="arrow">&#9660;</div>}
          </React.Fragment>
        );
      }
    }
    return circlesWithArrows;
  };

  return <div className="progress-container">{renderCirclesWithArrows()}</div>;
};

export default FailedElectionCircles;
