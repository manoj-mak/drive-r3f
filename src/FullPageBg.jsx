import React from 'react';
import './FullPageImage.css'
import Message1 from './assets/black.jpg';

const FullPageBg = ({ }) => {
  return (
    <div className="FullPageImage" style={{backgroundImage: `url(${Message1})`}}>
      
    </div>
  );
}

export default FullPageBg;