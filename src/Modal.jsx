import React from "react";
import cross from "./cross.png";
import cam from "./cam.png";



  



const Modal = ({ isOpen, closeModal }) => {

    //get time
    const date = new Date();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const time = hours + ":" + minutes;
   
    return (
        
            <div className={`modal ${isOpen ? 'open' : 'closed'}`}>
           
                
           
                
                
                <div className="modal-content">
                <img src={cam} alt="front-cam" className="front-cam" />
                  
        </div>
                
              {/* Your modal content goes here */}
            </div>
          
    )
       
} 

export default Modal;
  