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

export function createToothGeometry(segments = 72) {
  const points = PROFILE_POINTS.map(([x, y]) => new THREE.Vector2(x, y));
  return new THREE.LatheGeometry(points, segments);
}
