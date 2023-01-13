import "./index.css";
import React,{useState,useEffect,Suspense} from 'react';
//import { createRoot } from "react-dom/client";
import { Canvas } from "@react-three/fiber";
import { Scene } from "./Scene";
import { Physics } from "@react-three/cannon";
import  Phone  from "./Phone";
import Lottie from "lottie-react";
import LoadingCar from "./loading.json";
import Rotate from "./rotate.json"










function App() {

    const [Loading, setLoading] = useState(true);
    const [Started,setStarted ] = useState(true)
    

    const LoadingScreen = () => {
        if (!Loading) {return null;}
        else{
          return (
            <div className="loading">
                 <Lottie loop={true} animationData={LoadingCar} />
            </div>
        );
        }
        
        
    };


    const LandingScreen = () => {
      return (
        <div className="landing">
          <h1>Invincible Driver</h1>
          <h2>Controls</h2>
          <h3>w/up, s/down, a/left, d/right</h3>
          
          <div className="rotate">
                 <Lottie loop={true} animationData={Rotate} />
            </div>
          <button className="start" onClick={() =>{
            setStarted(false);
            setLoading(true);
          } }>Start</button>
        </div>
      )
    };

   
   
    
     
    


   

    

   //check if all the elements in canvas are loaded
    useEffect(() => {

        setTimeout(() => {
            setLoading(false);
        }, 5000);
        
    }, [Started,Loading]);
   



 

    return (

      <>

      {Started ? (<LandingScreen />) : 
      
      (<>
        <LoadingScreen />
        
        
         <Canvas>
         <Physics
           broadphase="SAP"
           gravity={[0, -2.6, 0]}
         >
           <Suspense fallback={null}>
           <Scene />
           </Suspense>
         </Physics>
       </Canvas>
       
       
        
    
        <Phone />
        
    
        <div class="controls">
          
          <button >
            <img id="Up" className="c-img" src="./up.png" alt="up"/>
          </button>
          <button >
            <img id="Down" className="c-img" src="./down.png" alt="down"/>
          </button>
          <button >
            <img id="Left" className="c-img" src="./left.png" alt="left"/>
          </button>
          <button >
            <img id="Right" className="c-img" src="./right.png" alt="right"/>
          </button>
          
          
          
          
        </div>
    
        <div class="tools">
        <button >
            <img id="reset" className="c-img" src="./reset.png" alt="right"/>
          </button>
        <button >
            <img id="cam" className="c-img" src="./cam.png" alt="right"/>
        </button>
        </div>
         </>)
      
      
      
      }
       
                
                
      </>
      
            
        
      
    )
    
    
  }
  
  export default App
  