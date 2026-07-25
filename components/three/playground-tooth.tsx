"use client";

import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { useCursor } from "@react-three/drei";
import * as THREE from "three";
import {
  odontogramPlaygroundConditions,
  type PlaygroundConditionKey,
} from "@/lib/odontogram-conditions";

export function PlaygroundTooth({
  geometry,
  position,
  condition,
  onClick,
}: {
  geometry: THREE.BufferGeometry;
  position: [number, number, number];
  condition: PlaygroundConditionKey;
  onClick: () => void;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);
  useCursor(hovered);

  const meta = odontogramPlaygroundConditions.find((c) => c.key === condition)!;
  const isExtracted = condition === "extraction";

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    const targetScale = isExtracted ? 0.35 : hovered ? 1.15 : 1;
    const next = THREE.MathUtils.lerp(
      groupRef.current.scale.x,
      targetScale,
      delta * 8
    );
    groupRef.current.scale.setScalar(next);
    groupRef.current.rotation.y += delta * (hovered ? 0.7 : 0.15);
  });

  return (
    <group
      ref={groupRef}
      position={position}
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
      }}
      onPointerOut={(e) => {
        e.stopPropagation();
        setHovered(false);
      }}
    >
      <mesh geometry={geometry} scale={0.55}>
        <meshPhysicalMaterial
          color={meta.color}
          roughness={0.3}
          metalness={condition === "crown" ? 0.4 : 0.05}
          clearcoat={0.8}
          clearcoatRoughness={0.15}
          transparent={isExtracted}
          opacity={isExtracted ? 0.35 : 1}
        />
      </mesh>
    </group>
  );
}
