import React, {createContext, useContext, useState, Suspense, useEffect, useRef} from 'react';
import {Canvas, useLoader, useThree} from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import {OrbitControls, Html, Environment, useProgress} from '@react-three/drei';
import * as THREE from 'three';
// @todo Will theatre.js ever release 1.0?

const SceneContext = createContext(null);

export function ShippingContainerBuild() {
  const [sceneData, setSceneData] = useState({
    text: 'Shipping Container Build',
    isInteriorView: false,
  });

  return (
    <SceneContext.Provider value={{sceneData, setSceneData}}>
      <Canvas
        camera={{position: [-20, 10, 40], fov: 75}}
        style={{width: '100vw', height: '100vh'}}
      >
        <Suspense fallback={<Loader/>}>
          <CameraController />
          <ambientLight intensity={0.5}/>
          <pointLight position={[10, 10, 10]}/>
          <Environment
            files="https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/2k/evening_road_01_2k.hdr"
            ground={{height: 10, radius: 100, scale: 100}}
            rotation={[0, 1.7, 0]}
          />
          <InfoPanel/>
          <GrassPatch/>
          <Deck/>
          <Container/>
          <Fence/>
          <Roof/>
          <ModelInContainer
            name="Bed"
            url="/models/bed.glb"
            position={[1.7, 0, 18]}
            scale={3.2}
            rotation={[0, Math.PI / 2, 0]}
            onClick={(e) => {
              // handle click events
            }}
          />
        </Suspense>
      </Canvas>
    </SceneContext.Provider>
  );
}

function Loader() {
  const {progress} = useProgress();
  return <Html center>{progress} % loaded</Html>;
}

function ModelInContainer({ url, ...props }) {
  const gltf = useLoader(GLTFLoader, url);

  return (
    <primitive object={gltf.scene} {...props} />
  );
}

function CameraController() {
  const { camera } = useThree();
  const { sceneData } = useContext(SceneContext);
  const orbitControlsRef = useRef();

  useEffect(() => {
    const targetPosition = sceneData.isInteriorView
      ? [-2, 5, 0]     // Interior position
      : [-20, 10, 40]; // Exterior position

    // Update camera position
    camera.position.set(targetPosition[0], targetPosition[1], targetPosition[2]);
    camera.updateProjectionMatrix();

    // Update OrbitControls constraints based on view
    if (orbitControlsRef.current) {
      if (sceneData.isInteriorView) {
        // Set the target (look-at point) for interior view
        orbitControlsRef.current.target.set(-3, 4, 0);
        // Constrain the distance from target
        orbitControlsRef.current.minDistance = 2;  // Minimum distance from target
        orbitControlsRef.current.maxDistance = 8;  // Maximum distance from target
        // Allow full vertical rotation for interior
        orbitControlsRef.current.minPolarAngle = 0;
        orbitControlsRef.current.maxPolarAngle = Math.PI;
        // Add this line to rotate the camera 180 degrees
        orbitControlsRef.current.setAzimuthalAngle(Math.PI);
      } else {
        // Reset target for exterior view
        orbitControlsRef.current.target.set(0, 0, 0);
        // Reset distance constraints
        orbitControlsRef.current.minDistance = 5;
        orbitControlsRef.current.maxDistance = 100;
        // Maintain your existing exterior view constraints
        orbitControlsRef.current.minPolarAngle = Math.PI / 2.5;
        orbitControlsRef.current.maxPolarAngle = Math.PI / 2.55;
      }
    }

  }, [sceneData.isInteriorView, camera]);

  return (
    <OrbitControls
      ref={orbitControlsRef}
      autoRotateSpeed={0.85}
      zoomSpeed={0.75}
      enablePan={sceneData.isInteriorView}
      // rotation={{x: 0, y: 20, z: 0}}
    />
  );
}

function InfoPanel() {
  const {camera} = useThree();
  const {sceneData, setSceneData} = useContext(SceneContext);

  function toggleInteriorView(e, value) {
    e.stopPropagation();
    console.log('setting value:', value);
    setSceneData((prevSceneData) => ({
      ...prevSceneData,
      isInteriorView: value,
    }));
  }

  return (
    <Html
      position={[camera.top, camera.left, 0]}
      // style={{
      //   pointerEvents: 'none'
      // }}
    >
      <button onClick={(e) => toggleInteriorView(e, true)}>
        Interior
      </button>
      <button onClick={(e) => toggleInteriorView(e, false)}>
        Exterior
      </button>
      <div style={{
        minWidth: '200px',
        maxWidth: 'calc(100vw - 40px)',
        padding: '8px',
        background: 'white',
        borderRadius: '4px',
        boxShadow: '0 2px 6px rgba(0, 0, 0, 0.2)',
        pointerEvents: 'auto'
      }}>
        <p style={{
          color: 'black',
          fontSize: '18px',
          margin: 0
        }} dangerouslySetInnerHTML={{__html: sceneData.text}}/>
      </div>
    </Html>
  );
}

function Deck() {
  const woodTexture = useLoader(THREE.TextureLoader, '/images/wood-plank-texture.jpg');
  woodTexture.wrapS = THREE.RepeatWrapping;
  woodTexture.wrapT = THREE.RepeatWrapping;
  woodTexture.repeat.set(10, 20);

  return (
    <ClickableMesh position={[-10, 0, 10]}
                   name={'Deck'}>
      <boxGeometry args={[16, 0.4, 20]}/>
      <meshBasicMaterial map={woodTexture}/>
    </ClickableMesh>
  );
}

function Container() {
  const containerTexture = useLoader(THREE.TextureLoader, '/images/shipping-container-texture.jpg');
  containerTexture.wrapS = THREE.RepeatWrapping;
  containerTexture.wrapT = THREE.RepeatWrapping;

  // Container dimensions (same as before)
  const width = 8;
  const height = 9.5;
  const depth = 40;

  return (
    <group>
      {/* Floor */}
      <ClickableMesh position={[2, height / 2 - height / 2, 0]} rotation={[-Math.PI / 2, 0, 0]} name="Container Floor">
        <planeGeometry args={[width, depth]}/>
        <meshBasicMaterial map={containerTexture} side={THREE.DoubleSide}/>
      </ClickableMesh>

      {/* Ceiling */}
      <ClickableMesh position={[2, height / 2 + height / 2, 0]} rotation={[Math.PI / 2, 0, 0]} name="Container Ceiling">
        <planeGeometry args={[width, depth]}/>
        <meshBasicMaterial map={containerTexture} side={THREE.DoubleSide}/>
      </ClickableMesh>

      {/* Left wall */}
      <ClickableMesh position={[2 - width / 2, height / 2, 0]} rotation={[0, Math.PI / 2, 0]} name="Container Left Wall">
        <planeGeometry args={[depth, height]}/>
        <meshBasicMaterial map={containerTexture} side={THREE.DoubleSide}/>
      </ClickableMesh>

      {/* Right wall */}
      <ClickableMesh position={[2 + width / 2, height / 2, 0]} rotation={[0, -Math.PI / 2, 0]} name="Container Right Wall">
        <planeGeometry args={[depth, height]}/>
        <meshBasicMaterial map={containerTexture} side={THREE.DoubleSide}/>
      </ClickableMesh>

      {/* Back wall */}
      <ClickableMesh position={[2, height / 2, -depth / 2]} name="Container Back Wall">
        <planeGeometry args={[width, height]}/>
        <meshBasicMaterial map={containerTexture} side={THREE.DoubleSide}/>
      </ClickableMesh>

      {/* Front wall */}
      <ClickableMesh position={[2, height / 2, depth / 2]} rotation={[0, Math.PI, 0]} name="Container Front Wall">
        <planeGeometry args={[width, height]}/>
        <meshBasicMaterial map={containerTexture} side={THREE.DoubleSide}/>
      </ClickableMesh>

      <Door/>
      <Windows/>
    </group>
  );
}

function Windows() {
  return (
    <>
      {/* West window */}
      <ClickableMesh position={[6, 6, 12]}
                     rotation={[0, Math.PI / 2, 0]}
                     name={'West Window'}>
        <boxGeometry args={[3, 3, 0.1]}/>
        <meshBasicMaterial color={0x87ceeb} transparent opacity={0.75}/>
      </ClickableMesh>

      {/* East window */}
      <ClickableMesh position={[6, 6, -12]}
                     rotation={[0, Math.PI / 2, 0]}
                     name={'East Window'}>
        <boxGeometry args={[3, 3, 0.1]}/>
        <meshBasicMaterial color={0x87ceeb} transparent opacity={0.75}/>
      </ClickableMesh>
    </>
  );
}

function Door() {
  return (
    <ClickableMesh position={[-2, 4, 4]}
                   name={'Door'}
                   rotation={[0, Math.PI / 2, 0]}>
      <boxGeometry args={[3, 5, 0.1]}/>
      <meshBasicMaterial color={0x8B4513}/>
    </ClickableMesh>
  );
}

function GrassPatch() {
  return (
    <ClickableMesh position={[-10, 0, -10]} name={'Grass Patch'}>
      <boxGeometry args={[16, 0.1, 20]}/>
      <meshBasicMaterial color="green"/>
    </ClickableMesh>
  );
}

function Fence() {
  const woodTexture = useLoader(THREE.TextureLoader, '/images/wood-plank-texture.jpg');
  woodTexture.wrapS = THREE.RepeatWrapping;
  woodTexture.wrapT = THREE.RepeatWrapping;
  woodTexture.repeat.set(2, 2);

  return (
    <group>
      {/* Create fence posts */}
      {[...Array(4)].map((_, index) => (
        <group key={`fence-section-${index}`}>
          {/* Front Post */}
          <ClickableMesh name={`Front Post ${index}`} position={[-18 + index * 4, 2, 20]}>
            <boxGeometry args={[0.4, 4, 0.4]}/>
            <meshStandardMaterial map={woodTexture}/>
          </ClickableMesh>

          {/* Top rail */}
          <ClickableMesh name={`Front Top Rail ${index}`} position={[-16 + index * 4, 3.5, 20]}>
            <boxGeometry args={[4, 0.4, 0.4]}/>
            <meshStandardMaterial map={woodTexture}/>
          </ClickableMesh>

          {/* Bottom rail */}
          <ClickableMesh name={`Front Bottom Rail ${index}`} position={[-16 + index * 4, 1.5, 20]}>
            <boxGeometry args={[4, 0.4, 0.4]}/>
            <meshStandardMaterial map={woodTexture}/>
          </ClickableMesh>
        </group>
      ))}

      {/* Side fences */}
      {[...Array(10)].map((_, index) => (
        <group key={`side-fence-${index}`}>
          {/* Left side */}
          <ClickableMesh name={`Left side Post ${index}`} position={[-18, 2, 20 - index * 4]}>
            <boxGeometry args={[0.4, 4, 0.4]}/>
            <meshStandardMaterial map={woodTexture}/>
          </ClickableMesh>

          {/* Side rails */}
          <ClickableMesh name={`Left Side Top Rail ${index}`} position={[-18, 3.5, 18 - index * 4]}>
            <boxGeometry args={[0.4, 0.4, 4]}/>
            <meshStandardMaterial map={woodTexture}/>
          </ClickableMesh>
          <ClickableMesh name={`Left Side Bottom Rail ${index}`} position={[-18, 1.5, 18 - index * 4]}>
            <boxGeometry args={[0.4, 0.4, 4]}/>
            <meshStandardMaterial map={woodTexture}/>
          </ClickableMesh>
        </group>
      ))}

      {/* Back fence */}
      {[...Array(4)].map((_, index) => (
        <group key={`back-fence-section-${index}`}>
          {/* Back Post */}
          <ClickableMesh name={`Back Post ${index}`} position={[-18 + index * 4, 2, -20]}>
            <boxGeometry args={[0.4, 4, 0.4]}/>
            <meshStandardMaterial map={woodTexture}/>
          </ClickableMesh>

          {/* Top rail */}
          <ClickableMesh name={`Back Top Rail ${index}`} position={[-16 + index * 4, 3.5, -20]}>
            <boxGeometry args={[4, 0.4, 0.4]}/>
            <meshStandardMaterial map={woodTexture}/>
          </ClickableMesh>

          {/* Bottom rail */}
          <ClickableMesh name={`Back Bottom Rail ${index}`} position={[-16 + index * 4, 1.5, -20]}>
            <boxGeometry args={[4, 0.4, 0.4]}/>
            <meshStandardMaterial map={woodTexture}/>
          </ClickableMesh>
        </group>
      ))}
    </group>
  );
}

function Roof() {
  const roofTexture = useLoader(THREE.TextureLoader, '/images/roof-slates-texture.jpg');
  roofTexture.wrapS = THREE.RepeatWrapping;
  roofTexture.wrapT = THREE.RepeatWrapping;
  // roofTexture.repeat.set(2, 2);

  // Dimensions including overhang
  const width = 10; // Container width (8) + 2 units overhang
  const height = 3.75; // Adjusted height for 37° pitch (tan(37°) * (width/2))
  const depth = 42; // Container depth (40) + 2 units overhang
  const roofStructureHeight = 0.75; // Height for purlins, insulation, and decking
  const y = 9.5 + roofStructureHeight; // Container height plus roof structure
  const roofAngle = Math.PI * 37 / 180; // 37 degrees in radians

  // Calculate the length of the sloped roof panel using trigonometry
  const slopedLength = width / 2 / Math.cos(roofAngle);

  return (
    <group position={[2, y, 0]}>
      {/* Left roof face */}
      <ClickableMesh
        position={[-width / 4, height / 2, 0]}
        rotation={[0, 0, roofAngle]}
        name={'Roof Left Panel'}>
        <boxGeometry args={[slopedLength, 0.3, depth]}/>
        <meshStandardMaterial map={roofTexture}/>
      </ClickableMesh>

      {/* Right roof face */}
      <ClickableMesh
        position={[width / 4, height / 2, 0]}
        rotation={[0, 0, -roofAngle]}
        name={'Roof Right Panel'}>
        <boxGeometry args={[slopedLength, 0.3, depth]}/>
        <meshStandardMaterial map={roofTexture}/>
      </ClickableMesh>

      {/* Front triangle */}
      <ClickableMesh
        position={[0, 0, depth / 2]}
        name={'Roof Front Face'}>
        <extrudeGeometry args={[
          new THREE.Shape()
            .moveTo(-width / 2, 0)
            .lineTo(0, height)
            .lineTo(width / 2, 0)
            .lineTo(-width / 2, 0),
          {depth: 0.3, bevelEnabled: false}
        ]}/>
        <meshStandardMaterial map={roofTexture}/>
      </ClickableMesh>

      {/* Back triangle */}
      <ClickableMesh
        position={[0, 0, -depth / 2]}
        name={'Roof Back Face'}>
        <extrudeGeometry args={[
          new THREE.Shape()
            .moveTo(-width / 2, 0)
            .lineTo(0, height)
            .lineTo(width / 2, 0)
            .lineTo(-width / 2, 0),
          {depth: 0.3, bevelEnabled: false}
        ]}/>
        <meshStandardMaterial map={roofTexture}/>
      </ClickableMesh>
    </group>
  );
}

function ClickableMesh({children, ...props}) {
  const {sceneData, setSceneData} = useContext(SceneContext);

  const handleClick = (e) => {
    e.stopPropagation();

    const {depth, height, width} = e.object.geometry.parameters;

    const theText = `Clicked the ${e.object.name}!
       <br>Depth: ${convertFeetToFeetAndInches(depth)} 
       <br>Height: ${convertFeetToFeetAndInches(height)} 
       <br>Width: ${convertFeetToFeetAndInches(width)}`;

    setSceneData((prevSceneData) => ({
      ...prevSceneData, // Preserve existing state
      text: theText,
    }));

    console.log(theText);
  };

  // Utility function to convert feet (decimal) to feet and inches.
  const convertFeetToFeetAndInches = (feetDecimal) => {
    const feet = Math.floor(feetDecimal);
    const inches = Math.round((feetDecimal - feet) * 12);

    // Handle edge case where rounding pushes inches to 12.
    return inches === 12 ? `${feet + 1} ft 0 in` : `${feet} ft ${inches} in`;
  };

  return (
    <mesh {...props} onDoubleClick={(e) => handleClick(e)}>
      {children}
    </mesh>
  );
}
