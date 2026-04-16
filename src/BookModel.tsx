import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF, Center } from "@react-three/drei";
import { useRef } from "react";

import * as THREE from 'three';

function Book() {
    const { scene } = useGLTF("/models/book.glb");

    const pivotRef = useRef<THREE.Group>(null);

    // Smooth rotation animation
    useFrame(() => {
        if (pivotRef.current) {
            pivotRef.current.rotation.y += 0.005;
        }
    });

    return (
        <group ref={pivotRef}>
            {/* SHIFT PIVOT (simulate spine on left side) */}
            <group position={[0, 0., 0]}>
                {/* CENTER MODEL AUTOMATICALLY */}
                <Center>
                    <primitive object={scene} scale={0.105} position={[-0.5, 0, 0]} />
                </Center>
            </group>
        </group>
    );
}

export default function BookModel() {
    return (
        <Canvas camera={{ position: [0, 1, 3], fov: 50 }}>
            <ambientLight intensity={1} />
            <directionalLight position={[2, 5, 6]} intensity={1.5} />

            <Book />

            <OrbitControls enableZoom={false} />
        </Canvas>
    );
}