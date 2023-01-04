import {
  Environment,
  OrbitControls,
  PerspectiveCamera,
} from "@react-three/drei";
import { Suspense, useEffect, useState } from "react";
import { Car } from "./Car";
import { Ground } from "./Ground";
import { Track } from "./Track";

export function Scene() {
  const [thirdPerson, setThirdPerson] = useState(false);
  const [firstPerson, setFirstPerson] = useState(true);
  const [cameraPosition, setCameraPosition] = useState([-6, 3.9, 6.21]);
  const [ cameraFov, setCameraFov ] = useState(20);



  

  




  useEffect(() => {

  //cycle through camera views
 const cam = document.getElementById('cam');
  cam.addEventListener('click', function() {
    if (thirdPerson) {
      setFirstPerson(false);
      setThirdPerson(false);
      setCameraPosition([-6, 3.9, 6.21 + Math.random() * 0.01]);
      setCameraFov(33);
    } else if (firstPerson) {
      setFirstPerson(false);
      setThirdPerson(true);
      setCameraPosition([-6, 3.9, 6.21 + Math.random() * 0.01]);
      setCameraFov(40);
      
    } else if (!thirdPerson && !firstPerson) {
      setFirstPerson(true);
      setThirdPerson(false);
      setCameraPosition([-6, 3.9, 6.21 + Math.random() * 0.01]);
      setCameraFov(27);
      
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
      <Track />
      <Car thirdPerson={thirdPerson} firstPerson={firstPerson} />
    </Suspense>
  );
}