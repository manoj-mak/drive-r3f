import React,{useState,useEffect} from 'react';
import './FullPageImage.css'
import Message from './assets/bg-op.jpg';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

const FullPageImage = ({ }) => {

  const [show, setShow] = React.useState(false);
  return (
    <div className="FullPageImage" style={{backgroundImage: `url(${Message})`}}>
      <img className="fortune" src="./fortune.png" alt="fortune"/>
    </div>
  );
}

export default FullPageImage;
