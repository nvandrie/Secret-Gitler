import React, { useState } from 'react';
import '../../styling/popup.css'; // Styles for the component

const Popup: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div className={`bottom-slide-up ${isVisible ? 'visible' : ''}`} >
      <div className="bottom-slide-items">
      <div className="trigger" onClick={toggleVisibility}>
      <div className={`content ${isVisible ? 'visible' : ''}`}>
        <p>{isVisible ? 'Hide Your Identity' : 'View Your Identity'}</p>
      </div>
        <h1 className='title-text'>Your Identity</h1>
        <div className='identities'>
          <div className="rectangle">
                  <div className="inner-rectangle"></div>
          </div>
          <div className="rectangle">
                  <div className="inner-rectangle"></div>
          </div>
          </div>
          </div>
      </div>
    </div>
  );
};

export default Popup;

