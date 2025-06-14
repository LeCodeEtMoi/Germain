import React, { useState } from "react";

type Point3D = {
  x: number;
  y: number;
  z: number;
};

interface RandomPoint3DProps {
  min?: number; // minimum coordonnée (par défaut 0)
  max?: number; // maximum coordonnée (par défaut 10)
  onGenerate?: (point: Point3D) => void; // callback quand un point est généré
}

export function RandomPoint3D({ min = 0, max = 10, onGenerate }: RandomPoint3DProps) {
  const [point, setPoint] = useState<Point3D>(() => generatePoint());

  function generatePoint(): Point3D {
    const randCoord = () => Math.random() * (max - min) + min;
    return {
      x: parseFloat(randCoord().toFixed(2)),
      y: parseFloat(randCoord().toFixed(2)),
      z: parseFloat(randCoord().toFixed(2)),
    };
  }

  function handleGenerate() {
    const newPoint = generatePoint();
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
