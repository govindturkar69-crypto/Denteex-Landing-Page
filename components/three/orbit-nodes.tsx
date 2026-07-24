"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

type Node = {
  radius: number;
  speed: number;
  offset: number;
  tilt: number;
  size: number;
  color: string;
};

const NODES: Node[] = [
  { radius: 1.5, speed: 0.35, offset: 0, tilt: 0.35, size: 0.07, color: "#5fd7c8" },
  { radius: 1.75, speed: -0.25, offset: 2.1, tilt: -0.5, size: 0.05, color: "#ff9b6a" },
  { radius: 1.3, speed: 0.45, offset: 4.2, tilt: 0.15, size: 0.045, color: "#5fd7c8" },
  { radius: 1.9, speed: -0.18, offset: 1.1, tilt: -0.2, size: 0.06, color: "#ff9b6a" },
];

function OrbitNode({ node }: { node: Node }) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime * node.speed + node.offset;
    ref.current.position.set(
      Math.cos(t) * node.radius,
      Math.sin(t) * node.radius * node.tilt,
      Math.sin(t) * node.radius * 0.6
    );
  });

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[node.size, 16, 16]} />
      <meshStandardMaterial
        color={node.color}
        emissive={node.color}
        emissiveIntensity={1.4}
        roughness={0.3}
        toneMapped={false}
      />
    </mesh>
  );
}

export function OrbitNodes() {
  const nodes = useMemo(() => NODES, []);
  return (
    <group>
      {nodes.map((node, i) => (
        <OrbitNode key={i} node={node} />
      ))}
    </group>
  );
}
