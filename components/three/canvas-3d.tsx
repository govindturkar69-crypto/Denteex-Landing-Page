"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { ToothModel } from "@/components/three/tooth-model";
import { OrbitNodes } from "@/components/three/orbit-nodes";

export default function Canvas3D() {
  return (
    <Canvas
      dpr={[1, 2]}
      camera={{ position: [0, 0, 5.2], fov: 40 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      className="!touch-none"
    >
      <ambientLight intensity={0.65} />
      <directionalLight position={[3, 4, 5]} intensity={1.4} color="#ffffff" />
      <pointLight position={[-3, -2, 2]} intensity={12} color="#5fd7c8" />
      <pointLight position={[3, -1, -2]} intensity={10} color="#ff9b6a" />
      <Suspense fallback={null}>
        <ToothModel />
        <OrbitNodes />
      </Suspense>
    </Canvas>
  );
}
