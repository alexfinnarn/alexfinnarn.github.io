// src/components/FractalWeb.tsx
import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Text } from '@react-three/drei';
import * as THREE from 'three';
import { useSpring, animated } from '@react-spring/three';

// Define the structure for a web node
interface WebNode {
    id: string;
    label: string;
    url?: string;
    x: number;
    y: number;
    z: number;
    children?: WebNode[];
}

// Navigation state stored in localStorage
interface NavState {
    currentNodeId: string;
    zoomLevel: number;
    path: string[];
}

interface WebStrandProps {
    start: THREE.Vector3;
    end: THREE.Vector3;
    thickness?: number;
    color?: string;
    highlighted?: boolean;
}

const WebStrand = ({ start, end, thickness = 0.01, color = '#aaaaaa', highlighted = false }: WebStrandProps) => {
    const ref = useRef<THREE.Mesh>(null);

    // Calculate the midpoint and length of the strand
    const midpoint = new THREE.Vector3().addVectors(start, end).multiplyScalar(0.5);
    const direction = new THREE.Vector3().subVectors(end, start);
    const length = direction.length();

    // Calculate the rotation to align the cylinder with the strand direction
    const quaternion = new THREE.Quaternion();
    const startingDirection = new THREE.Vector3(0, 1, 0);
    direction.normalize();
    quaternion.setFromUnitVectors(startingDirection, direction);

    // Create spring animation for highlight effect. Only the colour is spring-driven:
    // geometry `args` are constructor arguments and cannot take an animated value.
    const { glowColor } = useSpring({
        glowColor: highlighted ? '#ffffff' : color,
        config: { tension: 170, friction: 26 }
    });
    const radius = highlighted ? thickness * 2 : thickness;

    return (
        <animated.mesh
            ref={ref}
            position={midpoint}
            quaternion={quaternion}
        >
            <cylinderGeometry args={[radius, radius, length, 6]} />
            <animated.meshStandardMaterial color={glowColor} emissive={glowColor} emissiveIntensity={highlighted ? 2 : 0.2} />
        </animated.mesh>
    );
};

interface WebNodeProps {
    node: WebNode;
    onClick: (node: WebNode) => void;
    isActive: boolean;
    isHighlighted: boolean;
    onPointerOver?: () => void;
    onPointerOut?: () => void;
}

const WebNode = ({ node, onClick, isActive, isHighlighted, onPointerOver, onPointerOut }: WebNodeProps) => {
    const nodeRef = useRef<THREE.Mesh>(null);

    const { scale, nodeColor } = useSpring({
        scale: isHighlighted ? 1.5 : 1,
        nodeColor: isActive ? '#6495ED' : isHighlighted ? '#99ccff' : '#445566',
        config: { tension: 170, friction: 26 }
    });

    return (
        <group position={[node.x, node.y, node.z]}>
            <animated.mesh
                ref={nodeRef}
                scale={scale}
                onClick={() => onClick(node)}
                onPointerOver={onPointerOver}
                onPointerOut={onPointerOut}
            >
                <sphereGeometry args={[0.05, 16, 16]} />
                <animated.meshStandardMaterial
                    color={nodeColor}
                    emissive={nodeColor}
                    emissiveIntensity={isActive ? 2 : 0.5}
                />
            </animated.mesh>

            <Text
                position={[0, -0.1, 0]}
                fontSize={0.05}
                color={isActive ? '#ffffff' : '#aaaaaa'}
                anchorX="center"
                anchorY="middle"
            >
                {node.label}
            </Text>
        </group>
    );
};

// Generate a fractal web level recursively
const generateFractalLevel = (depth = 0, maxDepth = 3, parentId = 'root', centerX = 0, centerY = 0, centerZ = 0, radius = 1): WebNode[] => {
    if (depth > maxDepth) return [];

    const nodes: WebNode[] = [];
    const childCount = depth === 0 ? 5 : Math.max(2, 5 - depth);
    const childRadius = radius * 0.4;

    // Create the center node for this level
    const centerNode: WebNode = {
        id: parentId,
        label: depth === 0 ? 'Home' : `Hub ${parentId}`,
        url: depth === 0 ? '/' : `/hub/${parentId}`,
        x: centerX,
        y: centerY,
        z: centerZ,
        children: []
    };

    nodes.push(centerNode);

    // Create child nodes in a circular pattern
    for (let i = 0; i < childCount; i++) {
        const angle = (i / childCount) * Math.PI * 2;
        const x = centerX + Math.cos(angle) * radius;
        const y = centerY + Math.sin(angle) * radius;
        const z = centerZ + (Math.random() - 0.5) * 0.2; // Small z variation for 3D effect

        const nodeType = ['Project', 'Blog', 'Gallery', 'About', 'Contact'][i % 5];
        const nodeId = `${parentId}-${i}`;

        const childNode: WebNode = {
            id: nodeId,
            label: `${nodeType} ${depth + 1}-${i}`,
            url: `/${nodeType.toLowerCase()}/${nodeId}`,
            x, y, z,
            children: []
        };

        nodes.push(childNode);

        // Connect center to child node (implicit in render)
        centerNode.children?.push(childNode);

        // Recursively generate next level for this node
        if (depth < maxDepth) {
            const nextLevelNodes = generateFractalLevel(
                depth + 1,
                maxDepth,
                nodeId,
                x, y, z,
                childRadius
            );

            nodes.push(...nextLevelNodes);
        }
    }

    return nodes;
};

// Flatten the node tree into an array for easier rendering
const flattenNodes = (nodes: WebNode[]): WebNode[] => {
    const result: WebNode[] = [];

    const traverse = (node: WebNode) => {
        result.push(node);
        if (node.children) {
            node.children.forEach(traverse);
        }
    };

    nodes.forEach(traverse);
    return result;
};

const FractalWebScene = ({ onNavigate }: { onNavigate: (url: string) => void }) => {
    // Generate the entire fractal web structure
    const webStructure = React.useMemo(() => generateFractalLevel(), []);
    const flatNodes = React.useMemo(() => flattenNodes(webStructure), [webStructure]);

    // Load the last saved position from localStorage
    const [navState, setNavState] = useState<NavState>(() => {
        if (typeof window !== 'undefined') {
            const saved = localStorage.getItem('webNavState');
            return saved ? JSON.parse(saved) : { currentNodeId: 'root', zoomLevel: 0, path: ['root'] };
        }
        return { currentNodeId: 'root', zoomLevel: 0, path: ['root'] };
    });

    const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);
    const { camera } = useThree();
    const controlsRef = useRef<React.ComponentRef<typeof OrbitControls>>(null);

    // Find the current node
    const currentNode = flatNodes.find(node => node.id === navState.currentNodeId) || flatNodes[0];

    // Save navigation state to localStorage when it changes
    useEffect(() => {
        if (typeof window !== 'undefined') {
            localStorage.setItem('webNavState', JSON.stringify(navState));
        }
    }, [navState]);

    // Handle clicking on a node
    const handleNodeClick = (node: WebNode) => {
        // If the node has children, zoom to it
        if (node.children && node.children.length > 0) {
            const newPath = [...navState.path];
            if (navState.currentNodeId !== node.id) {
                newPath.push(node.id);
            }

            setNavState({
                currentNodeId: node.id,
                zoomLevel: navState.zoomLevel + 1,
                path: newPath
            });

            // Trigger camera animation to zoom to node
            animateCamera(node);
        } else if (node.url) {
            // If it's a leaf node, navigate to its URL
            onNavigate(node.url);
        }
    };

    // Handle zoom back out
    const handleZoomOut = () => {
        if (navState.path.length > 1) {
            const newPath = [...navState.path];
            newPath.pop();
            const parentId = newPath[newPath.length - 1];
            const parentNode = flatNodes.find(node => node.id === parentId);

            if (parentNode) {
                setNavState({
                    currentNodeId: parentNode.id,
                    zoomLevel: navState.zoomLevel - 1,
                    path: newPath
                });

                // Trigger camera animation to zoom out
                animateCamera(parentNode, true);
            }
        }
    };

    // Animate camera to focus on a node
    const animateCamera = (targetNode: WebNode, isZoomingOut = false) => {
        const targetPosition = new THREE.Vector3(targetNode.x, targetNode.y, targetNode.z + 1);
        const startPosition = camera.position.clone();
        const duration = 1000; // ms
        const startTime = Date.now();

        const animateCameraPosition = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // Ease-in-out function for smooth movement
            const ease = progress < 0.5
                ? 2 * progress * progress
                : -1 + (4 - 2 * progress) * progress;

            // Linear interpolation between positions
            const newPosition = new THREE.Vector3().lerpVectors(
                startPosition,
                targetPosition,
                ease
            );

            camera.position.copy(newPosition);
            camera.lookAt(targetNode.x, targetNode.y, targetNode.z);

            if (progress < 1) {
                requestAnimationFrame(animateCameraPosition);
            } else {
                // When animation completes, update controls target
                if (controlsRef.current) {
                    controlsRef.current.target.set(targetNode.x, targetNode.y, targetNode.z);
                }
            }
        };

        animateCameraPosition();
    };

    // Filter which nodes to show based on current path
    const visibleNodes = flatNodes.filter(node => {
        // Show nodes that are direct children of the current node
        if (node.id === currentNode.id) return true;
        const parent = flatNodes.find(n => n.children?.some(child => child.id === node.id));
        return parent && parent.id === currentNode.id;
    });

    // Create connections between nodes
    const connections = visibleNodes.flatMap(node => {
        if (!node.children) return [];

        return node.children
            .filter(child => visibleNodes.some(n => n.id === child.id))
            .map(child => ({
                from: new THREE.Vector3(node.x, node.y, node.z),
                to: new THREE.Vector3(child.x, child.y, child.z),
                highlighted: node.id === hoveredNodeId || child.id === hoveredNodeId,
                id: `${node.id}-${child.id}`
            }));
    });

    // Add back button if we're not at the root
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape' || e.key === 'Backspace') {
                handleZoomOut();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [handleZoomOut]);

    return (
        <>
            {/* Ambient light for general illumination */}
            <ambientLight intensity={0.3} />

            {/* Directional light for shadows and highlights */}
            <directionalLight position={[5, 5, 5]} intensity={0.5} />
            <directionalLight position={[-5, -5, -5]} intensity={0.3} />

            {/* Point light at camera position for better visibility */}
            <pointLight position={[0, 0, 3]} intensity={0.5} />

            {/* Controls for camera movement */}
            <OrbitControls
                ref={controlsRef}
                enableZoom={true}
                enablePan={true}
                enableRotate={true}
                minDistance={0.5}
                maxDistance={10}
            />

            {/* Draw connections between nodes */}
            {connections.map(connection => (
                <WebStrand
                    key={connection.id}
                    start={connection.from}
                    end={connection.to}
                    highlighted={connection.highlighted}
                />
            ))}

            {/* Draw nodes */}
            {visibleNodes.map(node => (
                <WebNode
                    key={node.id}
                    node={node}
                    onClick={handleNodeClick}
                    isActive={node.id === navState.currentNodeId}
                    isHighlighted={node.id === hoveredNodeId}
                    onPointerOver={() => setHoveredNodeId(node.id)}
                    onPointerOut={() => setHoveredNodeId(null)}
                />
            ))}

            {/* Back button if not at root level */}
            {navState.path.length > 1 && (
                <group position={[0, -1.5, 0]}>
                    <Text
                        position={[0, 0, 0]}
                        fontSize={0.1}
                        color="#ffffff"
                        anchorX="center"
                        anchorY="middle"
                        onClick={handleZoomOut}
                    >
                        ← Back
                    </Text>
                </group>
            )}

            {/* Path breadcrumb */}
            <group position={[0, 1.5, 0]}>
                <Text
                    position={[0, 0, 0]}
                    fontSize={0.05}
                    color="#aaaaaa"
                    anchorX="center"
                    anchorY="middle"
                >
                    {navState.path.join(' > ')}
                </Text>
            </group>
        </>
    );
};

const FractalWeb: React.FC = () => {
    const [currentUrl, setCurrentUrl] = useState('/');

    const handleNavigate = (url: string) => {
        // For demo, just update state, but you could redirect here
        setCurrentUrl(url);
        console.log(`Navigating to: ${url}`);

        // To actually navigate:
        // window.location.href = url;
    };

    return (
        <div style={{ width: '100%', height: '80vh' }}>
            <Canvas camera={{ position: [0, 0, 3], fov: 50 }}>
                <FractalWebScene onNavigate={handleNavigate} />
            </Canvas>

            <div style={{
                position: 'absolute',
                bottom: '10px',
                left: '10px',
                background: 'rgba(0,0,0,0.5)',
                padding: '10px',
                borderRadius: '5px',
                color: 'white'
            }}>
                <p>Current Location: {currentUrl}</p>
                <p>Click on nodes to navigate</p>
                <p>Press ESC to zoom out</p>
            </div>
        </div>
    );
};

export default FractalWeb;