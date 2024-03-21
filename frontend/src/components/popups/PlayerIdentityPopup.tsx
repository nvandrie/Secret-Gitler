import React, { useState } from 'react';
import '../../styling/popup.css'; // Styles for the component
import liberal_identity from "/liberal_identity.png";
import facist_identity from "/facist_identity.png"

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
          <div className="identiy-outline">
            <img src={liberal_identity} alt="Image" className="identity" />
          </div>
          <div className="identiy-outline">
            <img src={liberal_identity} alt="Image" className="identity" />
          </div>
          </div>
          </div>
      </div>
    </div>
  );
};

export default Popup;

