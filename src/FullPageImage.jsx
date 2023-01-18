import React from 'react';
import './FullPageImage.css'
import Message from './assets/prize.png';

const FullPageImage = ({ }) => {
  return (
    <div className="FullPageImage" style={{backgroundImage: `url(${Message})`}}>
      {/*<img src={Message} alt="Full Page message" className="center-img"  />*/}
    </div>
  );
}

export default FullPageImage;
