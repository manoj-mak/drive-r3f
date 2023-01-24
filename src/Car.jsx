import { useBox, useRaycastVehicle } from "@react-three/cannon";
import { useFrame, useLoader } from "@react-three/fiber";
import { useEffect, useRef,useState } from "react";
import { Quaternion, Vector3 } from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useControls } from "./useControls";
import { useWheels } from "./useWheels";
import { WheelDebug } from "./WheelDebug";
import DriveSound from "./assets/sounds/drive.mp3";



export function Car({ thirdPerson,firstPerson }) {
  // thanks to the_86_guy!
  // https://sketchfab.com/3d-models/low-poly-car-muscle-car-2-ac23acdb0bd54ab38ea72008f3312861
  let result = useLoader(
    GLTFLoader,
    process.env.PUBLIC_URL + "/models/car-wo-steering-red.glb"
  ).scene;

  //add steering wheel
  let steeringWheel = useLoader(
    GLTFLoader,
    process.env.PUBLIC_URL + "/models/steering1.glb"
  ).scene;

  const steeringWheelRef = useRef();
  const [steeringAngle, setSteeringAngle] = useState(0);
  const [xRotation, setXRotation] = useState(0);
  const [yRotation, setYRotation] = useState(0);
  const [zRotation, setZRotation] = useState(0);
  const [Left, setLeft] = useState(null);
  const [Move, setMove] = useState(false);
  const [sound] = useState(() => new Audio(DriveSound));



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

  //start moving the car
  setInterval(() => {
    //get question number from local storage
    var questionNumber = localStorage.getItem("question");
    if(questionNumber < 2){
      
      vehicleApi.applyEngineForce(5, 2);
      vehicleApi.applyEngineForce(5, 3);
    } else {
      //stop the car

      vehicleApi.applyEngineForce(0, 2);
      vehicleApi.applyEngineForce(0, 3);
      //chassisApi.velocity.set(0, 0, 0);
      //chassisApi.angularVelocity.set(0, 0, 0);
      //chassisApi.rotation.set(0, 0, 0);

      //stop the sound
      sound.pause();
      
    }
 
 }, 2000);

 useEffect(() => {
  //play sound after 3 seconds
  setTimeout(() => {
    sound.play();
  }
  , 3000);

  
  
 }, []);


  useControls(vehicleApi, chassisApi, setSteeringAngle);

  document.getElementById("steer-left").onmouseenter = function() {Enter1()};
  document.getElementById("steer-left").onmouseleave = function() {Leave1()};
  document.getElementById("steer-right").onmouseenter = function() {Enter()};
  document.getElementById("steer-right").onmouseleave = function() {Leave()};

  var n = 0;

  function Enter() {

   setLeft(true);
   vehicleApi.setSteeringValue(-0.003, 2);
   vehicleApi.setSteeringValue(-0.003, 3);
      vehicleApi.setSteeringValue(0.002, 0);
      vehicleApi.setSteeringValue(0.002, 1);
    
    
  }
  function Leave() {
    setLeft(false);
    vehicleApi.setSteeringValue(0.002, 2);
        vehicleApi.setSteeringValue(0.002, 3);
        vehicleApi.setSteeringValue(-0.001, 0);
        vehicleApi.setSteeringValue(-0.001, 1);
  }
  function Enter1() {
    setLeft(false);
    vehicleApi.setSteeringValue(0.001, 2);
    vehicleApi.setSteeringValue(0.001, 3);
    vehicleApi.setSteeringValue(-0.0005, 0);
    vehicleApi.setSteeringValue(-0.0005, 1);
  }
  function Leave1() {}

  

  

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

   
    
    
    let cameraPosition = position.clone().add(wDir.clone().multiplyScalar(0.11));
    state.camera.position.copy(cameraPosition);
    state.camera.quaternion.copy(quaternion);

   

    

    
  });

 


  
 var n = 0;
 if(Left==true){
  var righty = setTimeout(() => {
    //setXRotation(xRotation + 0.01);
      // setYRotation(yRotation + 0.01);
    clearTimeout(lefty);
    if(zRotation >= -0.09) {
      setZRotation(zRotation - 0.01);
      console.log('right', zRotation)

      
    }
   
    console.log('right', zRotation)
    
  }, 10);

} else if(Left==false) {
  var lefty = setTimeout(() => {
    //setXRotation(xRotation - 0.01);
    //setYRotation(yRotation - 0.01);
    clearTimeout(righty);
    if(zRotation <= 0.09) {
      setZRotation(zRotation + 0.01);
      console.log('left', zRotation)
    }
    
  }, 10);
  
 } 
  
  
  






 


  useEffect(() => {
    if (!steeringWheel) return;

    let mesh = steeringWheel;
    mesh.scale.set(0.0012, 0.0012, 0.0012);

    mesh.children[0].position.set(-365, -5, -67);
  }, [steeringAngle]);



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
        <primitive object={steeringWheel}  position={[0.056, -0.0065, -0.05]} scale={[0.0015, 0.0015, 0.0015]} rotation={[xRotation * Math.PI,yRotation * Math.PI,zRotation * Math.PI]} />
      </group>
      
      {/* <mesh ref={chassisBody}>
        <meshBasicMaterial transparent={true} opacity={0.3} />
        <boxGeometry args={chassisBodyArgs} />
      </mesh> */}
      
<pointLight position={[-1.5, 0.5, 3]} />
      <WheelDebug wheelRef={wheels[0]} radius={wheelRadius} />
      <WheelDebug wheelRef={wheels[1]} radius={wheelRadius} />
      <WheelDebug wheelRef={wheels[2]} radius={wheelRadius} />
      <WheelDebug wheelRef={wheels[3]} radius={wheelRadius} />

    </group>
  );
}
