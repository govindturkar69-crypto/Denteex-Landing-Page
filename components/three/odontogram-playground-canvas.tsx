"use client";

import { useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import { createToothGeometry } from "@/components/three/tooth-geometry";
import { PlaygroundTooth } from "@/components/three/playground-tooth";
import {
  PLAYGROUND_TOOTH_COUNT,
  type PlaygroundConditionKey,
} from "@/lib/odontogram-conditions";

export default function OdontogramPlaygroundCanvas({
  conditions,
  onToothClick,
}: {
  conditions: PlaygroundConditionKey[];
  onToothClick: (index: number) => void;
}) {
  const geometry = useMemo(() => createToothGeometry(48), []);

  const positions = useMemo(() => {
    const spacing = 1.15;
    const start = -((PLAYGROUND_TOOTH_COUNT - 1) * spacing) / 2;
    return Array.from(
      { length: PLAYGROUND_TOOTH_COUNT },
      (_, i): [number, number, number] => [start + i * spacing, 0, 0]
    );
  }, []);

  return (
    <Canvas
      dpr={[1, 2]}
      camera={{ position: [0, 0.6, 6.5], fov: 35 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
    >
      <ambientLight intensity={0.7} />
      <directionalLight position={[3, 4, 5]} intensity={1.3} color="#ffffff" />
      <pointLight position={[-3, -1, 2]} intensity={10} color="#5fd7c8" />
      <pointLight position={[3, -1, -2]} intensity={8} color="#ff9b6a" />
      {positions.map((position, i) => (
        <PlaygroundTooth
          key={i}
          geometry={geometry}
          position={position}
          condition={conditions[i]}
          onClick={() => onToothClick(i)}
        />
      ))}
    </Canvas>
  );
}
