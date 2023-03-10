import React, { useState,useEffect } from "react";
import "./Quiz.css";
import cam from "./assets/cam.png";
import notch from "./assets/notch.PNG";
import Enable from "./assets/sounds/open.wav";
import Lottie from "lottie-react";
import Right from "./assets/correct.json";
import Wrong from "./assets/wrong.json";
import KaChing from "./assets/sounds/ka-ching.mp3";
import Nope from "./assets/sounds/wrong.mp3";



  



const Modal = ({ isOpen, closeModal }) => {

    //get time
    const date = new Date();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const time = hours + ":" + minutes;
    const [sound] = useState(() => new Audio(Enable));
    const [sound2] = useState(() => new Audio(KaChing));
    const [sound3] = useState(() => new Audio(Nope));
    

  

    function Quiz() {
        // Properties
        const [showResults, setShowResults] = useState(false);
        const [currentQuestion, setCurrentQuestion] = useState(0);
        const [score, setScore] = useState(1000);
        const [Started, setStarted] = useState(false);
        const [correct, setCorrect] = useState(false);
        const [tag, setTag] = useState('first');

        //make a timer
        const [time, setTime] = useState(10);

        useEffect(() => {
          if (time > 0) {
            setTimeout(() => setTime(time - 1), 1000);
          } else {
            setTime(0);
            setStarted(true);
            sound.play();
          }
        }, [time]);
        
      
        const questions = [
          {
            text: "Which country hosted the 2022 fifa world cup?",
            options: [
              { id: 0, text: "Qatar", isCorrect: true },
              { id: 1, text: "Saudi", isCorrect: false },
              { id: 2, text: "Tunisia", isCorrect: false },
              { id: 3, text: "Morocco", isCorrect: false },
            ],
          },
          {
            text: "What is the largest state in India?",
            options: [
              { id: 0, text: "Mizoram", isCorrect: false },
              { id: 1, text: "Rajasthan", isCorrect: true },
              { id: 2, text: "Maharashtra", isCorrect: false },
              { id: 3, text: "Karnataka", isCorrect: false },
            ],
          },
          {
            text: "Which Indian film bagged the golden-globes award in 2023?",
            options: [
              { id: 0, text: "Kantara", isCorrect: false },
              { id: 1, text: "RRR", isCorrect: true },
              { id: 2, text: "Brahmastra", isCorrect: false },
              { id: 3, text: "Gangubai", isCorrect: false },
            ],
          },
          {
            text: "What is the largest state in India?",
            options: [
              { id: 0, text: "Mizoram", isCorrect: false },
              { id: 1, text: "Rajasthan", isCorrect: true },
              { id: 2, text: "Maharashtra", isCorrect: false },
              { id: 3, text: "Karnataka", isCorrect: false },
            ],
          },
          {
            text: "which gaming console is made by microsoft?",
            options: [
              { id: 0, text: "Gameboy", isCorrect: false },
              { id: 1, text: "Xbox", isCorrect: true },
              { id: 2, text: "Playstation", isCorrect: true },
              { id: 3, text: "Switch", isCorrect: false },
            ],
          },
        ];
      
        // Helper Functions
      
        /* A possible answer was clicked */
        const optionClicked = (isCorrect) => {
          // Increment the score
          
          
          setTag('next');
          setTime(12);
          if (isCorrect) {
            setScore(score * 10);
            setShowResults(true);
            sound2.play();
            setCorrect(true);
            //save the score in local storage
            localStorage.setItem("score", score);
            console.log(score, "score")
          } else{
            console.log("wrong")
            sound3.play();
            setShowResults(true);
            setCorrect(false);
          }
      
          if (currentQuestion + 1 < questions.length) {
            setCurrentQuestion(currentQuestion + 1);
          } else {
            setShowResults(true);
          }
        };

        useEffect(() => {
          setTimeout(() => {
            
            setShowResults(false);
            setStarted(false);
            
          }, 3000);
        }, [showResults]);

       


      
      
       

        
      
        return (
          <div className="App">

           
              <>
            
              {Started ? (<div className="question-card">
                  
                 {showResults ? (
                 <div style={{display: "flex", alignItems: "center", justifyContent: "center",flexDirection:"column"}}>
                  {/* result */}
                  
                  <Lottie style={{width:'120%',height:'100%',}} animationData={correct ? Right : Wrong} />
                  
                  
                  
                  <h5 className="result-text">{correct ? "Your answer is correct !" : "Sorry ! your answer is wrong"}</h5>
                  </div>
                  
                  
                  ) : (<div>
                  {/* Current Question  */}
                  <div className="q-layout">
                  
                  <h5 className="question-text">{questions[currentQuestion].text}</h5>
                  </div>
        
                  {/* List of possible answers  */}
                  <ul id="answers">
                    {questions[currentQuestion].options.map((option) => {
                      return (
                        <li
                          key={option.id}
                          //assign id as question number
                          
                          onClick={() => {
                              optionClicked(option.isCorrect)
                              setShowResults(true)
                              //console.log(currentQuestion)
                              //save the question number in local storage

                              localStorage.setItem("question", currentQuestion);
                          }}
                        >
                          {option.text}
                        </li>
                      );
                    })}
                  </ul>
                  </div>
                  
                 )}
                  
                  
                  
                </div>)
                : (<div className="landing-card">
                   
                <img className="m-title"  src="./m-title.png" alt="fortune"/>
                {/* make a counter for 5 secs  */}
                <h5 className="result-text" style={{color:'white',}}>Your {tag} question coming in</h5>
                <h4 className="time">{time}</h4>

              </div>)}
                </>
            


            
            
      
            
            
             
            
          </div>
        );
      }

    
   
    return (
      
            <div className={`modal ${isOpen ? 'open' : 'closed'}`}>
           
                
           
                
           <div className="modal-stand left"></div>
           <div className="modal-stand right"></div>
                <div className="modal-content">
                <img src={notch} alt="front-cam" className="front-cam" />
                <Quiz />
                
                  
        </div>
                
              {/* Your modal content goes here */}
              

            </div>
          
    )
       
} 

export default Modal;
  