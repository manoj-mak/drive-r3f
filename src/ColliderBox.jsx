import { useBox, } from "@react-three/cannon";
import { useState } from "react";
import CrashSound from "./assets/sounds/crash.wav";


const debug = false;
var n = 0;

export function ColliderBox({ position, scale }) {
  const [sound] = useState(() => new Audio(CrashSound));
  const [collided, setCollided] = useState(false);
  useBox(() => ({
    args: scale,
    position,
    type: "Static",
    onCollide: (e) => {
      console.log("collided with", e);


      //get the sound to play only once
     
      if (n==0) {
        sound.play();
        setCollided(true);
        n=n+1;
      }


      
      
    
    }
  }));

  return (
    debug && (
      <mesh position={position}>
        <boxGeometry args={scale} />
        <meshBasicMaterial transparent={true} opacity={0.85} />
      </mesh>
    )
  );
}
