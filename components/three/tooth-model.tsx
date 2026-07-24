"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const PROFILE_POINTS: [number, number][] = [
  [0.001, -1.3],
  [0.12, -1.15],
  [0.16, -0.9],
  [0.14, -0.6],
  [0.22, -0.35],
  [0.5, -0.05],
  [0.62, 0.15],
  [0.65, 0.35],
  [0.6, 0.55],
  [0.42, 0.72],
  [0.15, 0.82],
  [0.001, 0.85],
];

export function ToothModel({ interactive = true }: { interactive?: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  const target = useRef({ x: 0, y: 0 });

  const geometry = useMemo(() => {
    const points = PROFILE_POINTS.map(([x, y]) => new THREE.Vector2(x, y));
    return new THREE.LatheGeometry(points, 72);
  }, []);

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y += delta * 0.18;

    if (interactive) {
      target.current.x = state.pointer.y * 0.25;
      target.current.y = state.pointer.x * 0.4;
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        target.current.x,
        0.04
      );
      groupRef.current.rotation.z = THREE.MathUtils.lerp(
        groupRef.current.rotation.z,
        target.current.y * 0.15,
        0.04
      );
    }

    groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.6) * 0.12;
  });

  return (
    <group ref={groupRef} rotation={[0.15, 0.6, 0]}>
      <mesh geometry={geometry} castShadow receiveShadow>
        <meshPhysicalMaterial
          color="#f6f3ec"
          roughness={0.22}
          metalness={0.05}
          clearcoat={1}
          clearcoatRoughness={0.08}
          iridescence={0.5}
          iridescenceIOR={1.3}
          iridescenceThicknessRange={[100, 400]}
        />
      </mesh>
    </group>
  );
}
