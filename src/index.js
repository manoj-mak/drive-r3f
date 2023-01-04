import "./index.css";
import { createRoot } from "react-dom/client";
import { Canvas } from "@react-three/fiber";
import { Scene } from "./Scene";
import { Physics } from "@react-three/cannon";
import  Phone  from "./Phone";






createRoot(document.getElementById("root")).render(
  <>
    <Canvas>
      <Physics
        broadphase="SAP"
        gravity={[0, -2.6, 0]}
      >
        <Scene />
      </Physics>
    </Canvas>

    <Phone />
    

    <div class="controls">
      <p>press w a s d to move</p>
      
      <p>press r to reset</p>
      <button id="Up">up</button>
      <button id="Down">down</button>
      <button id="Left">left</button>
      <button id="Right">right</button>
      
      
      
    </div>

    <div class="tools">
      <button id="reset">reset</button>
      <button id="cam">camera</button>
    </div>
  </>
);
