import React from 'react';
import './FullPageImage.css'
import Message from './assets/bg-op.jpg';
import Lottie from "lottie-react";
import Explode from "./assets/explode.json"
import WPExplode from "./assets/wpexplode.json"


const FullPageLottie = ({ }) => {
  return (
    <div className="FullPageLottie">
      <Lottie loop={false} animationData={WPExplode} speed={0.1} />
      <Lottie loop={false} animationData={Explode}  />
    </div>
  );
}

export default FullPageLottie;