import { Eye, Zap, RotateCcw } from "lucide-react";
import { DiamondIcon, ExplosionIcon, ShieldIcon } from "../components/icons";
import type { DieFace } from "../components/dice";

// Helpers for consistent icon sizing/color
const icon = (Node: React.ComponentType<any>) => (
  <Node size={18} color="#000" />
);

// 1) 피격 주사위 (D6)
export const hitD6: readonly DieFace[] = [
  { label: "Any", value: "any" },
  { label: "TR", value: "torso" },
  { label: "LA", value: "left-arm" },
  { label: "RA", value: "right-arm" },
  { label: "CS", value: "chassis" },
  { label: "BP", value: "backpack" },
];

// 2) 약한 공격 (D8) - yellow emphasis
// Mapping based on description; using icons to represent faces
export const weakAttackD8: readonly DieFace[] = [
  { label: <DiamondIcon filled={false} />, value: "◇" },
  { label: <DiamondIcon filled={true} />, value: "◆", weight: 2 },
  { label: <DiamondIcon filled={true} />, value: "◆", weight: 2 },
  {
    label: (
      <div style={{ display: "flex", gap: 2 }}>
        <DiamondIcon filled />
        <DiamondIcon filled />
      </div>
    ),
    value: "◆◆",
    weight: 2,
  },
  {
    label: (
      <div style={{ display: "flex", gap: 2 }}>
        <DiamondIcon filled />
        <DiamondIcon filled />
      </div>
    ),
    value: "◆◆",
    weight: 2,
  },
  { label: icon(Eye), value: "eye" },
  { label: icon(Zap), value: "zap" },
  { label: " ", value: "blank" },
];

// 3) 강한 공격 (D8) - red emphasis
export const strongAttackD8: readonly DieFace[] = [
  { label: <DiamondIcon />, value: "◇" },
  { label: <ExplosionIcon filled />, value: "explosion", weight: 4 },
  { label: <ExplosionIcon filled />, value: "explosion", weight: 4 },
  { label: <ExplosionIcon filled />, value: "explosion", weight: 4 },
  { label: <ExplosionIcon filled />, value: "explosion", weight: 4 },
  { label: <ExplosionIcon />, value: "explosion-outline" },
  { label: icon(Zap), value: "zap" },
  { label: icon(Eye), value: "eye" },
];

// 4) 방어 (D8) - gray emphasis
export const defenseD8: readonly DieFace[] = [
  {
    label: (
      <div style={{ display: "flex", gap: 2 }}>
        <ShieldIcon />
        <ShieldIcon />
      </div>
    ),
    value: "shieldx2",
  },
  { label: <ShieldIcon filled />, value: "shield", weight: 2 },
  { label: icon(Zap), value: "zap" },
  { label: icon(Zap), value: "zap" },
  { label: icon(RotateCcw), value: "rotate" },
  { label: icon(Eye), value: "eye" },
  { label: " ", value: "blank" },
  { label: " ", value: "blank" },
];

// 5) 회피 (D8)
export const dodgeD8: readonly DieFace[] = [
  { label: icon(RotateCcw), value: "rotate" },
  { label: icon(RotateCcw), value: "rotate" },
  { label: icon(Eye), value: "eye" },
  { label: icon(Eye), value: "eye" },
  { label: icon(Zap), value: "zap" },
  { label: " ", value: "blank" },
  { label: " ", value: "blank" },
  { label: " ", value: "blank" },
];
