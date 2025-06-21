import React, { useState } from "react";

export type Point3D = {
  x: number;
  y: number;
  z: number;
};

interface RandomPoint3DProps {
  min?: number; // minimum coordonnée (par défaut 0)
  max?: number; // maximum coordonnée (par défaut 10)
  onGenerate?: (point: Point3D) => void; // callback quand un point est généré
}

export const generateRandomPoint = (min: number = 0, max: number = 10): Point3D => {
  const rand = () => Math.floor(Math.random() * (max - min + 1)) + min;
  return { x: rand(), y: rand(), z: rand() };
};

export function RandomPoint3D({ min = 0, max = 10, onGenerate }: RandomPoint3DProps) {
  const [point, setPoint] = useState<Point3D>(() => generateRandomPoint(min, max));

  function handleGenerate() {
    const newPoint = generateRandomPoint(min, max);
    setPoint(newPoint);
    if (onGenerate) onGenerate(newPoint);
  }

  return (
    <div className="p-4 border rounded-md max-w-sm mx-auto bg-white shadow">
      <p>
        {point.x} {point.y} {point.z}
      </p>
    </div>
  );
}
