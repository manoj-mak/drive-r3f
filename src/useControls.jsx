import { useEffect, useState } from "react";

export const useControls = (vehicleApi, chassisApi) => {
  let [controls, setControls] = useState({ });
  let [direction, setDirection] = useState('');

  const reset = document.getElementById('reset');
  reset.addEventListener('click', function() {
      chassisApi.position.set(-1.5, 0.5, 3);
      chassisApi.velocity.set(0, 0, 0);
      chassisApi.angularVelocity.set(0, 0, 0);
      chassisApi.rotation.set(0, 0, 0);
  });

  useEffect(() => {
    const keyDownPressHandler = (e) => {
      setControls((controls) => ({ ...controls, [e.key.toLowerCase()]: true }));
    }

    const keyUpPressHandler = (e) => {
      setControls((controls) => ({ ...controls, [e.key.toLowerCase()]: false }));
    }

    const Up = document.getElementById('Up');
    const Down = document.getElementById('Down');
    const Left = document.getElementById('Left');
    const Right = document.getElementById('Right');

    const keyDownPressHandler2 = (e) => {
      if (e.target === Up) {
       //setControls((controls) => ({ ...controls, arrowup: true }));
       setDirection('up');
        console.log('up');
      } else if (e.target === Down) {
        //setControls((controls) => ({ ...controls, arrowdown: true }));
        setDirection('down');
        console.log('down');
      } else if (e.target === Left) {
        //setControls((controls) => ({ ...controls, arrowleft: true }));
        setDirection('left');
        console.log('left');
      } else if (e.target === Right) {
        //setControls((controls) => ({ ...controls, arrowright: true }));
        setDirection('right');
        console.log('right');
      }
    }

    



    


  
    window.addEventListener("keydown", keyDownPressHandler);
    window.addEventListener("keyup", keyUpPressHandler);
    window.addEventListener("mousedown", keyDownPressHandler2);
    
    
    return () => {
      window.removeEventListener("keydown", keyDownPressHandler);
      window.removeEventListener("keyup", keyUpPressHandler);
      window.removeEventListener("mousedown", keyDownPressHandler2);
      
     
      
      
    }
  }, []);

  

  useEffect(() => {
    if(!vehicleApi || !chassisApi) return;

    if (controls.w || controls.arrowup || direction === 'up') {
      vehicleApi.applyEngineForce(20, 2);
      vehicleApi.applyEngineForce(20, 3);
      if(direction === 'up') {
        setTimeout(() => {
          setDirection('');
          vehicleApi.applyEngineForce(0, 2);
          vehicleApi.applyEngineForce(0, 3);
        }, 500);
        
        

      }
      
    } else if (controls.s || controls.arrowdown || direction === 'down') {
      vehicleApi.applyEngineForce(-80, 2);
      vehicleApi.applyEngineForce(-80, 3);
       if(direction === 'down') {
        setTimeout(() => {
          setDirection('');
          vehicleApi.applyEngineForce(0, 2);
          vehicleApi.applyEngineForce(0, 3);
        }, 500);
        
        

       }
      
    } else {
      vehicleApi.applyEngineForce(0, 2);
      vehicleApi.applyEngineForce(0, 3);
    }

    if (controls.a || controls.arrowleft || direction === 'left') {
      vehicleApi.setSteeringValue(0.18, 2);
      vehicleApi.setSteeringValue(0.18, 3);
      vehicleApi.setSteeringValue(-0.1, 0);
      vehicleApi.setSteeringValue(-0.1, 1);

     
    } else if (controls.d || controls.arrowright || direction === 'right') {
      vehicleApi.setSteeringValue(-0.18, 2);
      vehicleApi.setSteeringValue(-0.18, 3);
      vehicleApi.setSteeringValue(0.1, 0);
      vehicleApi.setSteeringValue(0.1, 1);

      
    } else {
      for(let i = 0; i < 4; i++) {
        vehicleApi.setSteeringValue(0, i);
      }
    }

    



    if (controls.r) {
      chassisApi.position.set(-1.5, 0.5, 3);
      chassisApi.velocity.set(0, 0, 0);
      chassisApi.angularVelocity.set(0, 0, 0);
      chassisApi.rotation.set(0, 0, 0);
    }
  }, [controls, vehicleApi, chassisApi, direction,]);

  return controls;
}