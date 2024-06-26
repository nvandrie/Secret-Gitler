import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store";
import { toggleVotingActivity } from "../../slices/voteSlice";
import "../../styling/popup.css";
import ja from "/voting_cards/ja.jpg";
import nein from "/voting_cards/nein.jpg";
import axiosInstance from "../../api/axiosInstance";
import { useAppSelector } from "../../hooks/redux-hooks";

interface VoteProps {
  president: string;
  candidate: string;
}

const Vote: React.FC<VoteProps> = ({ president, candidate }) => {
  const dispatch = useDispatch();
  const votingActive = useSelector(
    (state: RootState) => state.vote.votingActive
  );
  const basicUserInfo = useAppSelector((state) => state.auth.basicUserInfo);

  const handleToggleVoting = (vote: "ja" | "nein") => {
    axiosInstance.post("/api/tally-vote", {
      vote: vote,
      player: basicUserInfo?.name,
    });
    dispatch(toggleVotingActivity());
  };

  return (
    <div className={`voteContainer ${votingActive ? "votingActive" : ""}`}>
      {votingActive && (
        <div className={`vote${votingActive ? "visibile-vote" : ""}`}>
          <div className="voteContainer">
            {votingActive && (
              <div className={`vote${votingActive ? "visible-vote" : ""}`}>
                <div className="voteBox">
                  <p className="buttonsLabel">
                    President <span className="outlinedText">{president}</span>{" "}
                    has nominated{" "}
                    <span className="outlinedText">{candidate}</span> as
                    Chancellor. Do you approve of this government?
                  </p>
                  <div className="buttonsContainer">
                    {" "}
                    {/* Add this wrapper for buttons */}
                    <div className="ya">
                      <button
                        className="ya_button"
                        onClick={() => handleToggleVoting("ja")}
                        style={{ backgroundImage: `url(${ja})` }}
                      ></button>
                    </div>
                    <div className="nein">
                      <button
                        className="nein_button"
                        onClick={() => handleToggleVoting("nein")}
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
