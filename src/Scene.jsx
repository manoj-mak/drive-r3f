import {
  Environment,
  OrbitControls,
  PerspectiveCamera,
  Stars,
} from "@react-three/drei";
import {  useEffect, useState } from "react";
import { Car } from "./Car";
import { Ground } from "./Ground";
import { Road } from "./Road";
import { ColliderBox } from "./ColliderBox";
import { CrashPoint } from "./CrashPoint";





export function Scene() {
  const [thirdPerson, setThirdPerson] = useState(false);
  const [firstPerson, setFirstPerson] = useState(true);
  const [cameraPosition, setCameraPosition] = useState([-6, 3.9, 6.21]);
  const [ cameraFov, setCameraFov ] = useState(26.5);


  


  
    
   
    
  
  
  
  




  useEffect(() => {

  //cycle through camera views
 const cam = document.getElementById('cam');
  cam.addEventListener('click', function() {
    if (thirdPerson) {
      setFirstPerson(false);
      setThirdPerson(false);
      setCameraPosition([-6, 3.9, 6.21 + Math.random() * 0.01]);
      setCameraFov(38);
    } else if (firstPerson) {
      setFirstPerson(false);
      setThirdPerson(true);
      setCameraPosition([-6, 3.9, 6.21 + Math.random() * 0.01]);
      setCameraFov(40);
      
    } else if (!thirdPerson && !firstPerson) {
      setFirstPerson(true);
      setThirdPerson(false);
      setCameraPosition([-6, 3.9, 6.21 + Math.random() * 0.01]);
      setCameraFov(22.0);
      
    }
  });
  
  }, [thirdPerson, firstPerson]);


  
 

  


    

  

 

  return (
    <>
      <Environment
        files={process.env.PUBLIC_URL + "/textures/envmap.hdr"}
        background={"both"}
      />

      <PerspectiveCamera makeDefault position={cameraPosition} fov={cameraFov} />
      {!thirdPerson && (
        <OrbitControls target={[-2.64, -0.71, 0.03]} />
      )}
      <Stars />
      

      
     

      <ambientLight intensity={0.2} />
      <Ground />
      <Road />
      <ColliderBox position={[-2.08, 0, -3.8]} scale={[0.1, 1, 24.5]}/>
      <ColliderBox position={[-0.95, 0, -3.8]} scale={[0.1, 1, 24.5]}/>
      <ColliderBox position={[-1.54,0,3.9]} scale={[0.65, 1, 0.4]}/>
      <CrashPoint position={[-1.54,0,-72]} scale={[0.65, 1, 0.5]}/>
     
      <ColliderBox position={[-2.08, 0, -44.2]} scale={[0.1, 1, 55.8]}/>
      <ColliderBox position={[-0.95, 0, -44.2]} scale={[0.1, 1, 55.8]}/>
     
      <Car thirdPerson={thirdPerson} firstPerson={firstPerson} />
      </>
  );
}
