import { useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';


export function Windshield() {
  // Load a glTF resource
  const gltf = useLoader(GLTFLoader, 'models/glass.glb');

  //set the position of the model
  gltf.scene.position.set(0, 0, 0);

  return <primitive object={gltf.scene}  />;
}