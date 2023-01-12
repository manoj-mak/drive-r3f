import { useBox } from "@react-three/cannon";

const debug = false;

export function CrashPoint({ position, scale }) {
  useBox(() => ({
    args: scale,
    position,
    type: "Static",
    onCollide: (e) => {
      //alert("crash point reached !");
        console.log("crashpoint reached", e);
    
    }
  }));

  return (
    debug && (
      <mesh position={position}>
        <boxGeometry args={scale} />
        <meshBasicMaterial transparent={true} opacity={0.95} />
      </mesh>
    )
  );
}