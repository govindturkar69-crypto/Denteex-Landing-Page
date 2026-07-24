"use client";

import dynamic from "next/dynamic";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { CanvasErrorBoundary } from "@/components/three/canvas-error-boundary";

const Canvas3D = dynamic(() => import("@/components/three/canvas-3d"), {
  ssr: false,
  loading: () => <GradientFallback />,
});

function GradientFallback() {
  return (
    <div className="relative flex h-full w-full items-center justify-center">
      <div className="animate-pulse-glow size-56 rounded-full bg-gradient-to-br from-teal-glow/40 to-coral-glow/40 blur-2xl sm:size-72" />
    </div>
  );
}

export function HeroScene() {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <GradientFallback />;
  }

  return (
    <CanvasErrorBoundary fallback={<GradientFallback />}>
      <Canvas3D />
    </CanvasErrorBoundary>
  );
}
