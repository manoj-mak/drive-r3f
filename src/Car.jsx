import { useBox, useRaycastVehicle } from "@react-three/cannon";
import { useFrame, useLoader } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import { Quaternion, Vector3 } from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useControls } from "./useControls";
import { useWheels } from "./useWheels";
import { WheelDebug } from "./WheelDebug";


export function Car({ thirdPerson,firstPerson }) {
  // thanks to the_86_guy!
  // https://sketchfab.com/3d-models/low-poly-car-muscle-car-2-ac23acdb0bd54ab38ea72008f3312861
  let result = useLoader(
    GLTFLoader,
    process.env.PUBLIC_URL + "/models/car3.glb"
  ).scene;

  const position = [-1.5, 0.5, 3];
  const width = 0.15;
  const height = 0.07;
  const front = 0.15;
  const wheelRadius = 0.05;

  const chassisBodyArgs = [width, height, front * 2];
  const [chassisBody, chassisApi] = useBox(
    () => ({
      allowSleep: false,
      args: chassisBodyArgs,
      mass: 150,
      position,
    }),
    useRef(null),
  );

  const [wheels, wheelInfos] = useWheels(width, height, front, wheelRadius);

  const [vehicle, vehicleApi] = useRaycastVehicle(
    () => ({
      chassisBody,
      wheelInfos,
      wheels,
    }),
    useRef(null),
  );

  useControls(vehicleApi, chassisApi);

  useFrame((state) => {
    if(!thirdPerson) return;

    let position = new Vector3(0,0,0);
    position.setFromMatrixPosition(chassisBody.current.matrixWorld);

    let quaternion = new Quaternion(0, 0, 0, 0);
    quaternion.setFromRotationMatrix(chassisBody.current.matrixWorld);

    let wDir = new Vector3(0,0,1);
    wDir.applyQuaternion(quaternion);
    wDir.normalize();

    let cameraPosition = position.clone().add(wDir.clone().multiplyScalar(1).add(new Vector3(0, 0.3, 0)));
    
    wDir.add(new Vector3(0, 0.2, 0));
    state.camera.position.copy(cameraPosition);
    state.camera.lookAt(position);
  });

  useFrame((state) => {
    if(!firstPerson) return;
    
    let position = new Vector3(0,0,0);
    position.setFromMatrixPosition(chassisBody.current.matrixWorld);
  
    let quaternion = new Quaternion(0, 0, 0, 0);
    quaternion.setFromRotationMatrix(chassisBody.current.matrixWorld);
    //for car2
    //let wDir = new Vector3(0.0028,0.0018,0.01);

    //for car3
    let wDir = new Vector3(0.0017,0.0021,0.01);
    wDir.applyQuaternion(quaternion);
    wDir.normalize();
    
    let cameraPosition = position.clone().add(wDir.clone().multiplyScalar(0.13));
    state.camera.position.copy(cameraPosition);
    state.camera.quaternion.copy(quaternion);
    
  });










  useEffect(() => {
    if (!result) return;

    let mesh = result;
    mesh.scale.set(0.0012, 0.0012, 0.0012);

    mesh.children[0].position.set(-365, -5, -67);
  }, [result]);

  return (
    <group ref={vehicle} name="vehicle">
      <group ref={chassisBody} name="chassisBody">
        <primitive object={result} rotation-y={Math.PI} position={[-0.4, -0.1, 0]}/>
      </group>
      
      {/* <mesh ref={chassisBody}>
        <meshBasicMaterial transparent={true} opacity={0.3} />
        <boxGeometry args={chassisBodyArgs} />
      </mesh> */}

     
      <WheelDebug wheelRef={wheels[0]} radius={wheelRadius} />
      <WheelDebug wheelRef={wheels[1]} radius={wheelRadius} />
      <WheelDebug wheelRef={wheels[2]} radius={wheelRadius} />
      <WheelDebug wheelRef={wheels[3]} radius={wheelRadius} />
    </group>
  );
}
