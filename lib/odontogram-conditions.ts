export const odontogramPlaygroundConditions = [
  {
    key: "healthy",
    label: "Healthy",
    color: "#f6f3ec",
    colorVar: "--muted-foreground",
  },
  {
    key: "cavity",
    label: "Cavity",
    color: "#c2542f",
    colorVar: "--destructive",
  },
  {
    key: "crown",
    label: "Crown",
    color: "#5fd7c8",
    colorVar: "--teal-glow",
  },
  {
    key: "extraction",
    label: "Extracted",
    color: "#8a8a8a",
    colorVar: "--muted-foreground",
  },
] as const;

export type PlaygroundConditionKey =
  (typeof odontogramPlaygroundConditions)[number]["key"];

const CYCLE_ORDER: PlaygroundConditionKey[] = [
  "healthy",
  "cavity",
  "crown",
  "extraction",
];

export function nextPlaygroundCondition(
  current: PlaygroundConditionKey
): PlaygroundConditionKey {
  const index = CYCLE_ORDER.indexOf(current);
  return CYCLE_ORDER[(index + 1) % CYCLE_ORDER.length];
}

export const PLAYGROUND_TOOTH_COUNT = 8;
