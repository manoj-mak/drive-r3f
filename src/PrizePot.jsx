import React, { useState,useEffect } from 'react';
import Lottie from "lottie-react";
import Conf from "./assets/confetti.json";

function PrizePot({ prizePot }) {
    const [prize, setPrize] = useState(0);
    const [Confetti, setConfetti] = useState(false);


    //get the prize pot from local storage to update
    useEffect(() => {
        setInterval(() => {
            const prizePot = localStorage.getItem('score');
            if (prizePot != null) {
                setPrize(prizePot);
            }
            else{
                setPrize(0);
            }
            
            
        }, 500);
    }, [prizePot]);

    //confetti animation
    useEffect(() => {
      if (prize > 0) {
      
            setConfetti(true);
       
        setTimeout(() => {
            setConfetti(false);
        }, 2000);
      }
    }, [prize]);


   


  return (
    <div style={{ position: 'fixed', top: '10px', right: '10px', width: 'auto', height: 'auto', zIndex: 2 }}>
    <div style={{  display:'flex',flexDirection:'row',fontFamily:'Fjalla One',fontSize:'1.5em'}}>
       <div style={{color:'red',marginRight:'5px'}}> Prize Pot : </div>
       <h7 id='prizecount' style={{color:'white',marginRight:'5px'}}> {prize}</h7>
       {Confetti ? (<Lottie style={{position: 'absolute', top: '-100%', right: '0px',zIndex:3}} animationData={Conf} />) : null}
    </div>
     
 </div>
);
  
}

export default PrizePot;
