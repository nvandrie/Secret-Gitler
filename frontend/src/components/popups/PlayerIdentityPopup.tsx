import React, { useState, useEffect } from "react";
import "../../styling/popup.css"; // Styles for the component
import { useAppSelector } from "../../hooks/redux-hooks";
import { searchIdentityByName } from "../PartyCheck";
import liberal_identity from "/identities/liberal_identity.png";
import fascist_identity from "/identities/fascist_identity.png";
import hitler_identity from "/identities/hitler_identity.png";
import fascist_party from "/party_membership_cards/fascist_party_mem.png";
import liberal_party from "/party_membership_cards/liberal_party_mem.png";

const Popup: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [playerIdentity, setPlayerIdentity] = useState<string | null>(null);
  const basicUserInfo = useAppSelector((state) => state.auth.basicUserInfo);

  useEffect(() => {
    const fetchIdentity = async () => {
      try {
        if (basicUserInfo?.name) {
          const identity = await searchIdentityByName(basicUserInfo.name);
          setPlayerIdentity(identity);
        }
      } catch (error) {
        console.error("Error fetching identity:", error);
      }
    };

    if (basicUserInfo?.name) {
      fetchIdentity();
    }
  }, [basicUserInfo?.name]);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div className={`bottom-slide-up ${isVisible ? "visible" : ""}`}>
      <div className="bottom-slide-items">
        <div className="trigger" onClick={toggleVisibility}>
          <div className={`content ${isVisible ? "visible" : ""}`}>
            <p>{isVisible ? "Hide Your Identity" : "View Your Identity"}</p>
          </div>
          <h1 className="title-text">Your Identity</h1>
          <div className="identities">
            <div className="identity-outline">
              <img
                src={
                  playerIdentity === "liberal"
                    ? liberal_identity
                    : playerIdentity === "fascist"
                    ? fascist_identity
                    : playerIdentity === "hitler"
                    ? hitler_identity
                    : ""
                }
                alt="Identity"
                className="identity"
              />
            </div>
            <div className="identity-outline">
              <img
                src={
                  playerIdentity === "liberal" ? liberal_party : fascist_party
                }
                alt="Image"
                className="identity"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Popup;
