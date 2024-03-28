import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from "../../store"
import { toggleVotingActivity } from '../../slices/voteSlice'
import '../../styling/popup.css';

const Vote: React.FC = () => {
  const dispatch = useDispatch();
  const votingActive = useSelector((state: RootState) => state.vote.votingActive);

  const handleToggleVoting = () => {
    dispatch(toggleVotingActivity());
  };

  return (
    <div className="voteContainer">  
      {votingActive && (
        <div className={`vote${votingActive ? 'visibile-vote' : ''}`}>
          <div className='voteBox'>
            <div className="ya">
              <button className="ya_button" onClick={handleToggleVoting}>ya</button>
            </div>
            <div className="nein">
            <button className="nein_button" onClick={handleToggleVoting}>nein</button>
            </div>
            </div>
          </div>)}
    </div>  
  );
};

export default Vote;

