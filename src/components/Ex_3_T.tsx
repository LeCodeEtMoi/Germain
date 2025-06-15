import React, { useState, useEffect } from "react";

export default function PointInLine3D() {
  const [point, setPoint] = useState({ x: 0, y: 0, z: 0 });
  const [line, setLine] = useState({ x0: 0, y0: 0, z0: 0, a: 1, b: 1, c: 1 });
  const [result, setResult] = useState<boolean | null>(null);

  const generateRandom = () => {
    const rand = () => Math.floor(Math.random() * 21 - 10); // [-10, 10]
    setPoint({ x: rand(), y: rand(), z: rand() });
    setLine({
      x0: rand(),
      y0: rand(),
      z0: rand(),
      a: rand() || 1,
      b: rand() || 1,
      c: rand() || 1,
    });
    setResult(null);
  };

  useEffect(() => {
    generateRandom();
  }, []);

  const checkIfBelongs = () => {
    const { x, y, z } = point;
    const { x0, y0, z0, a, b, c } = line;

    const tx = a !== 0 ? (x - x0) / a : null;
    const ty = b !== 0 ? (y - y0) / b : null;
    const tz = c !== 0 ? (z - z0) / c : null;

    const values = [tx, ty, tz].filter((v): v is number => v !== null);

    if (values.length === 0) {
        setResult(true); // Cas où tous les coefficients directeurs sont nuls
        return;
    }

    const belongs = values.every((v) => Math.abs(v - values[0]) < 1e-6);

    setResult(belongs);
  };

  return (
    <div className="box content">
      <h2 className="title is-4">Exercice : Point dans une droite de l'espace</h2>
      <p>
        Soit le point <strong>M({point.x}; {point.y}; {point.z})</strong> et la droite (Δ) définie par :<br />
        x = {line.x0} + {line.a}t ; y = {line.y0} + {line.b}t ; z = {line.z0} + {line.c}t
      </p>

      <div className="field is-grouped">
        <div className="control">
            <button className="button is-primary" onClick={checkIfBelongs}>Vérifier si M ∈ (Δ)</button>
        </div>
        <div className="control">
            <button className="button is-light" onClick={generateRandom}>🔁 Nouvel exercice</button>
        </div>
      </div>

      {result !== null && (
        <div className={`notification ${result ? "is-success" : "is-danger"} is-light mt-4`}>
            <button className="delete" onClick={() => setResult(null)}></button>
            {result
                ? "✅ Le point appartient à la droite."
                : "❌ Le point n'appartient pas à la droite."}
        </div>
      )}
    </div>
  );
}
