import React from 'react';
import './FullPageImage.css'
import Message from './assets/bg-op.jpg';

const EndMessage = ({ }) => {
  return (
    <div className="FullPageImage" style={{backgroundImage: `url(${Message})`}}>
      <img className="fortune" src="./dont.png" alt="dont"/>
    </div>
  );
}

export default EndMessage;