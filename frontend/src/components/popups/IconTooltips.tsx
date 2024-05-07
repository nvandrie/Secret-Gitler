import React, { useState } from "react";
import "../../styling/popup.css";

const IconTooltips: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div className="icon-tooltips-container">
      <button
        className="icon-tooltips-toggle-button"
        onClick={toggleVisibility}
      >
        {isVisible ? "Close Icon Tooltips" : "Open Icon Tooltips"}
      </button>
      {isVisible && (
        <div className="icon-tooltips-content">
          <h2>Icons and Descriptions</h2>
          <ul className="icon-list">
            <li className="icon-item">
              <div className="icon-wrapper">
                <svg
                  className={`crown ${"president"}`}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 576 512"
                >
                  <g className={"president"} stroke="black" strokeWidth="6">
                    <path d="M309 106c11.4-7 19-19.7 19-34c0-22.1-17.9-40-40-40s-40 17.9-40 40c0 14.4 7.6 27 19 34L209.7 220.6c-9.1 18.2-32.7 23.4-48.6 10.7L72 160c5-6.7 8-15 8-24c0-22.1-17.9-40-40-40S0 113.9 0 136s17.9 40 40 40c.2 0 .5 0 .7 0L86.4 427.4c5.5 30.4 32 52.6 63 52.6H426.6c30.9 0 57.4-22.1 63-52.6L535.3 176c.2 0 .5 0 .7 0c22.1 0 40-17.9 40-40s-17.9-40-40-40s-40 17.9-40 40c0 9 3 17.3 8 24l-89.1 71.3c-15.9 12.7-39.5 7.5-48.6-10.7L309 106z" />
                  </g>
                </svg>
              </div>
              <div className="description">
                The player with the yellow crown is the President.
              </div>
            </li>
            <li className="icon-item">
              <div className="icon-wrapper">
                <svg
                  className={`crown ${"chancellor"}`}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 576 512"
                >
                  <g className={"chancellor"} stroke="black" strokeWidth="6">
                    <path d="M309 106c11.4-7 19-19.7 19-34c0-22.1-17.9-40-40-40s-40 17.9-40 40c0 14.4 7.6 27 19 34L209.7 220.6c-9.1 18.2-32.7 23.4-48.6 10.7L72 160c5-6.7 8-15 8-24c0-22.1-17.9-40-40-40S0 113.9 0 136s17.9 40 40 40c.2 0 .5 0 .7 0L86.4 427.4c5.5 30.4 32 52.6 63 52.6H426.6c30.9 0 57.4-22.1 63-52.6L535.3 176c.2 0 .5 0 .7 0c22.1 0 40-17.9 40-40s-17.9-40-40-40s-40 17.9-40 40c0 9 3 17.3 8 24l-89.1 71.3c-15.9 12.7-39.5 7.5-48.6-10.7L309 106z" />
                  </g>
                </svg>
              </div>
              <div className="description">
                The player with the red crown is the Chancellor.
              </div>
            </li>
            <li className="icon-item">
              <div className="icon-wrapper">
                <img src="misc/PlayerIconFilled.png" alt="Filled Player Icon" />
              </div>
              <div className="description">
                A player with a darkened icon is ineligible to be Chancellor.
              </div>
            </li>
            <li className="icon-item">
              <div className="icon-wrapper">
                <img
                  src="misc/PlayerIconUnfilled.png"
                  alt="Unfilled Player Icon"
                />
              </div>
              <div className="description">
                A player with a lightened icon is elibible to be Chancellor.
              </div>
            </li>
            <li className="icon-item">
              <div className="icon-wrapper">
                <img
                  src="misc/ElectionTrackerEmpty.png"
                  alt="Election Tracker No Fails"
                />
              </div>
              <div className="description">
                This represents a reset Election Tracker. Zero governments have
                failed this cycle.
              </div>
            </li>
            <li className="icon-item">
              <div className="icon-wrapper">
                <img
                  src="misc/ElectionTrackerFilled.png"
                  alt="Election Tracker Two Fails"
                />
              </div>
              <div className="description">
                This Election Tracker displays that two governments have failed
                this cycle. If a third fails, the top card from the deck will be
                played and the Election Tracker will reset.
              </div>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default IconTooltips;
