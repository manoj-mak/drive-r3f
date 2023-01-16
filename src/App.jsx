import "./index.css";
import React,{useState,useEffect,Suspense} from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
//import { createRoot } from "react-dom/client";
import { Canvas } from "@react-three/fiber";
import { Scene } from "./Scene";
import { Physics } from "@react-three/cannon";
import  Phone  from "./Phone";
import Lottie from "lottie-react";
import LoadingCar from "./loading.json";
import Rotate from "./rotate.json"
import Crash from "./crashed.json"


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

// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement('#modal');










function App() {

    const [Loading, setLoading] = useState(true);
    const [Started,setStarted ] = useState(true);
    const [Crashed, setCrashed] = useState(false);
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

   
   
    
     
  useEffect (() => { 

    //keep checking for no of questions in local storage
    const interval = setInterval(() => {
      //console.log(localStorage.getItem('question'));
      if (localStorage.getItem('question') == 3) {
        //simulate crash
        console.log("crash");
        localStorage.removeItem('question');
        clearInterval(interval);
        setCrashed(true);
        openModal();

      }
      else{
        //remove local storage
        localStorage.removeItem('question');
      }
    }
    , 2000);
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
       
       
        
    
        {Crashed ? null : (<Phone />)}
        
    
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

        <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        shouldCloseOnOverlayClick={false}
        contentLabel=" Modal"
        >
        
        
                 <Lottie loop={true} animationData={Crash} />
            
        <h2>You Crashed!</h2>
      </Modal>
       
                
                
      </>
      
            
        
      
    )
    
    
  }
  
  export default App
  
