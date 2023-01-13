import React, { useState } from "react";
import "./Quiz.css";
import cam from "./cam.png";
import notch from "./notch.PNG";



  



const Modal = ({ isOpen, closeModal }) => {

    //get time
    const date = new Date();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const time = hours + ":" + minutes;
  

    function Quiz() {
        // Properties
        const [showResults, setShowResults] = useState(false);
        const [currentQuestion, setCurrentQuestion] = useState(0);
        const [score, setScore] = useState(0);
      
        const questions = [
          {
            text: "Who is the father of luke skywalker?",
            options: [
              { id: 0, text: "Obi wan", isCorrect: false },
              { id: 1, text: "Darth Vader", isCorrect: true },
              { id: 2, text: "Yoda", isCorrect: false },
              { id: 3, text: "Owen", isCorrect: false },
            ],
          },
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
          if (isCorrect) {
            setScore(score + 1);
          }
      
          if (currentQuestion + 1 < questions.length) {
            setCurrentQuestion(currentQuestion + 1);
          } else {
            setShowResults(true);
          }
        };
      
        /* Resets the game back to default */
        const restartGame = () => {
          setScore(0);
          setCurrentQuestion(0);
          setShowResults(false);
        };
      
        return (
          <div className="App">
            {/* 1. Header  */}
            <h5 id="title">Invincible driver</h5>
      
            {/* 2. Current Score  */}
            <h6 id="score">prize: {(score*500)}</h6>
      
            {/* 3. Show results or show the question game  */}
            {showResults ? (
              /* 4. Final Results */
              <div className="final-results">
                <h4>Final Results</h4>
                <h4>
                  {score} out of {questions.length} correct 
                  
                </h4>
                <button onClick={restartGame}>Restart</button>
              </div>
            ) : (
              /* 5. Question Card  */
              <div className="question-card">
                {/* Current Question  */}
            
                <h5 className="question-text">{questions[currentQuestion].text}</h5>
      
                {/* List of possible answers  */}
                <ul>
                  {questions[currentQuestion].options.map((option) => {
                    return (
                      <li
                        key={option.id}
                        onClick={() => optionClicked(option.isCorrect)}
                      >
                        {option.text}
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}
          </div>
        );
      }

    
   
    return (
        
            <div className={`modal ${isOpen ? 'open' : 'closed'}`}>
           
                
           
                
                
                <div className="modal-content">
                <img src={notch} alt="front-cam" className="front-cam" />
                <Quiz />
                  
        </div>
                
              {/* Your modal content goes here */}
              

            </div>
          
    )
       
} 

export default Modal;
  