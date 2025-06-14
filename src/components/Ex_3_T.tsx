import React, { useState, useEffect } from "react";

export default function PointInLine3D() {
  const [point, setPoint] = useState({ x: 0, y: 0, z: 0 });
  const [line, setLine] = useState({ x0: 0, y0: 0, z0: 0, a: 1, b: 1, c: 1 });
  const [result, setResult] = useState(null);

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

    const values = [tx, ty, tz].filter((v) => v !== null);

    const belongs = values.every((v) => Math.abs(v - values[0]) < 1e-6);

    setResult(belongs);
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Exercice : Point dans une droite de l'espace</h2>
      <p>
        Soit le point <strong>M({point.x}; {point.y}; {point.z})</strong> et la droite (Δ) définie par :<br />
        x = {line.x0} + {line.a}t ; y = {line.y0} + {line.b}t ; z = {line.z0} + {line.c}t
      </p>
      <button style={styles.button} onClick={checkIfBelongs}>Vérifier si M ∈ (Δ)</button>
      {result !== null && (
        <p style={{ color: result ? "green" : "red", fontWeight: "bold" }}>
          {result
            ? "✅ Le point appartient à la droite."
            : "❌ Le point n'appartient pas à la droite."}
        </p>
      )}
      <button style={styles.buttonSecondary} onClick={generateRandom}>🔁 Générer un autre exercice</button>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "600px",
    margin: "auto",
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    fontFamily: "sans-serif",
    marginTop: "40px",
    backgroundColor: "#f9f9f9",
  },
  title: {
    fontSize: "20px",
    fontWeight: "bold",
    marginBottom: "10px",
  },
  button: {
    marginTop: "10px",
    padding: "10px 20px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  buttonSecondary: {
    marginTop: "10px",
    padding: "10px 20px",
    backgroundColor: "#6c757d",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
};
