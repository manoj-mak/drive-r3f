import "./index.css";
import React,{useState,useEffect,Suspense,useRef} from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
//import { createRoot } from "react-dom/client";
import { Canvas } from "@react-three/fiber";
import { CameraShake } from "@react-three/drei"
import { Scene } from "./Scene";
import { Physics } from "@react-three/cannon";
import  Phone  from "./Phone";
import Lottie from "lottie-react";
import LoadingCar from "./assets/loading.json";
import Timer from "./Timer";
import PrizePot from "./PrizePot";
import Rotate from "./assets/rotate.json"
import FullPageImage from "./FullPageImage";
import FullPageLottie from "./FullPageLottie";
import EndMessage from "./EndMessage" 
import Explode from "./assets/explode.json"
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import GlassCrack from "./GlassCrack";
import FullPageBg from "./FullPageBg";




const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    borderRadius: '10px',
  },
};

// bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement('#modal');

var clearAllTimeouts = (function () {
  var noop = function () {},
      firstId = window.setTimeout(noop, 0);
  return function () {
      var lastId = window.setTimeout(noop, 0);
      console.log('Removing', lastId - firstId, 'timeout handlers');
      while (firstId != lastId)
          window.clearTimeout(++firstId);
  };
}());

var clearAllIntervals = (function () {
  var noop = function () {},
      firstId = window.setInterval(noop, 0);
  return function () {
      var lastId = window.setInterval(noop, 0);
      console.log('Removing', lastId - firstId, 'interval handlers');
      while (firstId != lastId)
          window.clearInterval(++firstId);
  };
}());
    
 








function App() {

    const [Loading, setLoading] = useState(true);
    const [Started,setStarted ] = useState(true);
    const [instruct,setInstruct] = useState(false);
    const [Crashed, setCrashed] = useState(false);
    const [Shake, setShake] = useState(false);
    const [Prize, setPrize] = useState(false);
    const [Message, setMessage] = useState(false);
    const [Fade, setFade] = useState(false);
    
    
    let subtitle;
  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = '#f00';
  }

  function closeModal() {
    setIsOpen(false);
  }

  
  

   


    

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
      if(Started==true && instruct==false){
        return (
          <div className="landing">
            
            
            <div className="rotate">
                   <Lottie loop={true} animationData={Rotate} />
              </div>
            <img className="title" src="./title.png" alt="title"/>
            <button className="start" onClick={() =>{
              //setStarted(false);
              setInstruct(true);
              localStorage.clear();
              
            } }>
              <img style={{borderRadius:'45px'}} src="./bg-button1.jpg" alt="start"/>
            </button>
          </div>
        )
      } else if(Started==true && instruct==true){
        return (
          <div className="ins">
            
            
            <img className="instruct" src="./ins.png" alt="start"/>
            <button className="start" onClick={() =>{
              
              setStarted(false);
              setLoading(true);
              localStorage.setItem('score', 0);
              
            } }>
              <img style={{borderRadius:'45px'}} src="./bg-button2.jpg" alt="start"/>
            </button>
          
            
            
           
          </div>
        )
      }
      
    };

   


    

    

   
   
    
  //checking for crash   
  useEffect (() => { 

    //keep checking for no of questions in local storage
    const interval = setInterval(() => {
      //console.log(localStorage.getItem('question'));
      if (localStorage.getItem('question') == 2) {
        //simulate crash
        console.log("crash");
        //localStorage.removeItem('question');
        clearInterval(interval);
        setCrashed(true);
        openModal();
        

      }
      else{
        //remove local storage
        localStorage.removeItem('question');
      }
    }
    , 800);
    return () => clearInterval(interval);

    
  
    
   
  }, []);


  //disable context menu
  useEffect(() => {
    document.addEventListener('contextmenu', event => event.preventDefault());
  }, []);
   
    
    


   

    

   //check if all the elements in canvas are loaded
    useEffect(() => {

        setTimeout(() => {
            setLoading(false);
        }, 5000);
        
    }, [Started,Loading]);


    
    
   //camera shake config
   const config = {
    maxYaw: 0.1, // Max amount camera can yaw in either direction
    maxPitch: 0.01, // Max amount camera can pitch in either direction
    maxRoll: 0.2, // Max amount camera can roll in either direction
    yawFrequency: 0.2, // Frequency of the the yaw rotation
    pitchFrequency: 0.1, // Frequency of the pitch rotation
    rollFrequency: 0.1, // Frequency of the roll rotation
    intensity: 0.5, // initial intensity of the shake
    decay: true, // should the intensity decay over time
    decayRate: 0.85, // if decay = true this is the rate at which intensity will reduce at
    controls: undefined, // if using orbit controls, pass a ref here so we can update the rotation
  }

  useEffect(() => {
    if(Crashed==true){
      setTimeout(() => {
        setShake(true);
        clearTimeout();
      }, 800);
    }
  }, [Crashed,]);


  useEffect(() => {
    if(Shake==true){
      setTimeout(() => {
        //setPrize(true);
        setFade(true);
        clearTimeout();
      }, 8000);
    }
  }, [Shake]);


  useEffect(() => {
    if(Fade==true){
      setTimeout(() => {
        setPrize(true);
        clearTimeout();
      }, 5000);
    }
  }, [Fade]);

  useEffect(() => {
    if(Prize==true){
      setTimeout(() => {
        setMessage(true);
        setPrize(false);
        clearTimeout();
        //setFade(false);
        //localStorage.removeItem('question');
      }, 6000);
    }
  }, [Prize]);

  useEffect(() => {
    window.addEventListener('beforeunload', () => {
      localStorage.clear();

      //clear all timeouts and intervals
      clearAllIntervals();
      clearAllTimeouts();



    });
  }, []);

  



    
    
   



    


   



 

    return (

      <>

      {Started ? (<LandingScreen />) : 
      
      (<>
        <LoadingScreen />
        
        
         <Canvas id="cv" >
         <Physics
           broadphase="SAP"
           gravity={[0, -2.6, 0]}
         >
           <Suspense fallback={null}>
           <Scene />
           </Suspense>
         </Physics>
         {!Shake ? null : (<CameraShake intensity={0.6} />)}
         
          
       </Canvas>
       
       
        
        {Crashed ? null : (<Timer />)}
        {Crashed ? null : ( <PrizePot  />)}
        {Crashed ? null : (<Phone />)}
        {Shake ? (<GlassCrack/>) : (null)}

        <TransitionGroup>
       {Shake ? (
       <CSSTransition
        key="lottie"
        timeout={500}
        classNames="lottie"
        >
        <FullPageLottie />
        </CSSTransition>
        ) : null}
      </TransitionGroup>

      <TransitionGroup>
       {Fade ? (
       <CSSTransition
        key="fade"
        timeout={2000}
        classNames="fade"
        >
        <FullPageBg />
        </CSSTransition>
        ) : null}
      </TransitionGroup>
        
        <TransitionGroup>
       {Prize ? (
       <CSSTransition
        key="prize"
        timeout={500}
        classNames="prize"
        >
        <FullPageImage />
        </CSSTransition>
        ) : null}
      </TransitionGroup>

        
        <TransitionGroup>
       {Message ? (
       <CSSTransition
        key="message"
        timeout={500}
        classNames="message"
        >
        <EndMessage />
        </CSSTransition>
        ) : null}
      </TransitionGroup>
        
    
        <div className="controls">
          
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
    
        <div className="tools">
        <button >
            <img id="reset" className="c-img" src="./reset.png" alt="right"/>
          </button>
        <button >
            <img id="cam" className="c-img" src="./cam.png" alt="right"/>
        </button>
        </div>

        <div id="steer-left" className="steering-left"></div>
        <div id="steer-right" className="steering-right"></div>
         </>)
      
      
      
      }

        
       
                
                
      </>
      
            
        
      
    )
    
    
  }
  
  export default App
  
