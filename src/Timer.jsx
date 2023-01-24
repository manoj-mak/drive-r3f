import React, { useState, useEffect } from 'react';


function Timer() {
    const [timeLeft, setTimeLeft] = useState(70);
    
  
    useEffect(() => {
      const intervalId = setInterval(() => {
        if (timeLeft > 0) {
          setTimeLeft(timeLeft - 1);
          if(timeLeft===18){
            localStorage.setItem('question', 2);
          }
        } else {
          console.log('Time is up');
          clearInterval(intervalId);
        }
      }, 1000);
      return () => clearInterval(intervalId);
    }, [timeLeft]);
  
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
  
    return (
      <div style={{ position: 'absolute', top: '10px', left: '10px',fontFamily:'Fjalla One',fontSize:'1.5em',color:'white', }}>
        {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
      </div>
    );
  }

export default Timer;


