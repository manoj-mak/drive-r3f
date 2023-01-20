import React from 'react';
import './FullPageImage.css'
import Message from './assets/bg-op.jpg';

const FullPageImage = ({ }) => {
  return (
    <div className="FullPageImage" style={{backgroundImage: `url(${Message})`}}>
      <img className="fortune" src="./fortune.png" alt="fortune"/>
    </div>
  );
}

export default FullPageImage;
