import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store";
import { toggleVotingActivity } from "../../slices/voteSlice";
import "../../styling/popup.css";
import ja from "/ja.jpg";
import nein from "/nein.jpg";

const Vote: React.FC = () => {
  const dispatch = useDispatch();
  const votingActive = useSelector(
    (state: RootState) => state.vote.votingActive
  );

  const handleToggleVoting = () => {
    dispatch(toggleVotingActivity());
  };

  return (
    <div className="voteContainer">
      {votingActive && (
        <div className={`vote${votingActive ? "visibile-vote" : ""}`}>
          <div className="voteContainer">
            {votingActive && (
              <div className={`vote${votingActive ? "visible-vote" : ""}`}>
                <div className="voteBox">
                  <p className="buttonsLabel">
                    Do you wish for these indivials to have congressional power?
                  </p>
                  <div className="buttonsContainer">
                    {" "}
                    {/* Add this wrapper for buttons */}
                    <div className="ya">
                      <button
                        className="ya_button"
                        onClick={handleToggleVoting}
                        style={{ backgroundImage: `url(${ja})` }}
                      ></button>
                    </div>
                    <div className="nein">
                      <button
                        className="nein_button"
                        onClick={handleToggleVoting}
                        style={{ backgroundImage: `url(${nein})` }}
                      ></button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Vote;
