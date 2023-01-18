import React from 'react';
import './FullPageImage.css'
import final from './assets/end-msg1.png';

const EndMessage = ({ }) => {
  return (
    <div className="FullPageImage" style={{backgroundImage: `url(${final})`,}}>
      {/*<img src={Message} alt="Full Page message" className="center-img"  />*/}
    </div>
  );
}

export default EndMessage; 