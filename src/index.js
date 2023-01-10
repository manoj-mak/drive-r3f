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
  </>
);
