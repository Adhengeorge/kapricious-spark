import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Sphere, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

function GlobeWireframe({ scrollY }: { scrollY: number }) {
  const meshRef = useRef<THREE.Group>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  const pointsRef = useRef<THREE.Points>(null);

  // Generate grid lines (latitude/longitude)
  const gridLines = useMemo(() => {
    const lines: THREE.BufferGeometry[] = [];
    const radius = 2;

    // Latitude lines
    for (let i = 1; i < 8; i++) {
      const phi = (i / 8) * Math.PI;
      const points: THREE.Vector3[] = [];
      for (let j = 0; j <= 64; j++) {
        const theta = (j / 64) * Math.PI * 2;
        points.push(
          new THREE.Vector3(
            radius * Math.sin(phi) * Math.cos(theta),
            radius * Math.cos(phi),
            radius * Math.sin(phi) * Math.sin(theta)
          )
        );
      }
      const geometry = new THREE.BufferGeometry().setFromPoints(points);
      lines.push(geometry);
    }

    // Longitude lines
    for (let i = 0; i < 12; i++) {
      const theta = (i / 12) * Math.PI * 2;
      const points: THREE.Vector3[] = [];
      for (let j = 0; j <= 64; j++) {
        const phi = (j / 64) * Math.PI;
        points.push(
          new THREE.Vector3(
            radius * Math.sin(phi) * Math.cos(theta),
            radius * Math.cos(phi),
            radius * Math.sin(phi) * Math.sin(theta)
          )
        );
      }
      const geometry = new THREE.BufferGeometry().setFromPoints(points);
      lines.push(geometry);
    }

    return lines;
  }, []);

  // Generate scattered points on sphere surface
  const dotGeometry = useMemo(() => {
    const positions = new Float32Array(800 * 3);
    for (let i = 0; i < 800; i++) {
      const phi = Math.acos(2 * Math.random() - 1);
      const theta = Math.random() * Math.PI * 2;
      const r = 2.02;
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.cos(phi);
      positions[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta);
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return geo;
  }, []);

  useFrame((_, delta) => {
    if (meshRef.current) {
      // Base rotation + scroll-driven rotation
      meshRef.current.rotation.y += delta * 0.15;
      meshRef.current.rotation.y += scrollY * 0.0001;
      meshRef.current.rotation.x = scrollY * 0.0003;
    }
    if (glowRef.current) {
      glowRef.current.rotation.y = meshRef.current?.rotation.y || 0;
      glowRef.current.rotation.x = meshRef.current?.rotation.x || 0;
    }
    if (pointsRef.current) {
      pointsRef.current.rotation.y = meshRef.current?.rotation.y || 0;
      pointsRef.current.rotation.x = meshRef.current?.rotation.x || 0;
    }
  });

  return (
    <group>
      {/* Inner glow sphere */}
      <Sphere ref={glowRef} args={[1.9, 32, 32]}>
        <MeshDistortMaterial
          color="#0d9488"
          emissive="#0d9488"
          emissiveIntensity={0.15}
          transparent
          opacity={0.08}
          distort={0.2}
          speed={1.5}
        />
      </Sphere>

      {/* Wireframe grid */}
      <group ref={meshRef}>
        {gridLines.map((geo, i) => (
          <lineSegments key={i} geometry={geo}>
            <lineBasicMaterial
              color="#2dd4bf"
              transparent
              opacity={0.25}
            />
          </lineSegments>
        ))}
      </group>

      {/* Scattered dots */}
      <points ref={pointsRef} geometry={dotGeometry}>
        <pointsMaterial
          color="#5eead4"
          size={0.02}
          transparent
          opacity={0.6}
          sizeAttenuation
        />
      </points>

      {/* Outer atmosphere glow */}
      <Sphere args={[2.15, 32, 32]}>
        <meshBasicMaterial
          color="#0d9488"
          transparent
          opacity={0.04}
          side={THREE.BackSide}
        />
      </Sphere>
    </group>
  );
}

interface Globe3DProps {
  scrollY: number;
  className?: string;
}

const Globe3D = ({ scrollY, className = "" }: Globe3DProps) => {
  return (
    <div className={`${className}`} style={{ width: "100%", height: "100%" }}>
      <Canvas
        camera={{ position: [0, 0, 5.5], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.3} />
        <pointLight position={[5, 5, 5]} intensity={0.8} color="#2dd4bf" />
        <pointLight position={[-5, -3, -5]} intensity={0.4} color="#a855f7" />
        <GlobeWireframe scrollY={scrollY} />
      </Canvas>
    </div>
  );
};

export default Globe3D;
