import {
  Environment,
  OrbitControls,
  PerspectiveCamera,
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
      setCameraFov(23.0);
      
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

      
     

      <ambientLight intensity={0.2} />
      <Ground />
      <Road />
      <ColliderBox position={[-1.92, 0, -3.8]} scale={[0.1, 1, 15.8]}/>
      <ColliderBox position={[-1.165, 0, -3.8]} scale={[0.1, 1, 15.8]}/>
      <ColliderBox position={[-1.54,0,3.9]} scale={[0.65, 1, 0.4]}/>
      <CrashPoint position={[-1.54,0,-11.2]} scale={[0.65, 1, 0.4]}/>
      
      
      <Car thirdPerson={thirdPerson} firstPerson={firstPerson} />
      </>
  );
}
