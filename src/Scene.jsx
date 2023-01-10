import {
  Environment,
  OrbitControls,
  PerspectiveCamera,
} from "@react-three/drei";
import { Suspense, useEffect, useState } from "react";
import { Car } from "./Car";
import { Ground } from "./Ground";
import { Track } from "./Track";
import { Road } from "./Road";
import { ColliderBox } from "./ColliderBox";




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
      setCameraFov(26.5);
      
    }
  });
  
  }, [thirdPerson, firstPerson]);
    

  

 

  return (
    <Suspense fallback={null}>
      <Environment
        files={process.env.PUBLIC_URL + "/textures/envmap.hdr"}
        background={"both"}
      />

      <PerspectiveCamera makeDefault position={cameraPosition} fov={cameraFov} />
      {!thirdPerson && (
        <OrbitControls target={[-2.64, -0.71, 0.03]} />
      )}

      
     


      <Ground />
      <Road />
      <ColliderBox position={[-1.92, 0, -2.2]} scale={[0.1, 1, 15.8]}/>
      <ColliderBox position={[-1.165, 0, -2.2]} scale={[0.1, 1, 15.8]}/>
      
      
      <Car thirdPerson={thirdPerson} firstPerson={firstPerson} />
    </Suspense>
  );
}
