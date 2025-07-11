import React, { useState } from 'react';

function generateAuxiliaryFunctionExercise() {
  // Valeurs aléatoires pour varier légèrement les constantes
  const a = 2 + Math.floor(Math.random() * 3); // entre 2 et 4
  const b = 1 + Math.floor(Math.random() * 3); // entre 1 et 3
  const c = 1 + Math.floor(Math.random() * 4); // entre 1 et 4

  const phi = `ϕ(x) = x^2 - ${b} + ${c} ln(x)`;
  const fx = `(x^2 - ${a}x - ${b} - ${c}ln(x)) / x`;

  return {
    phi,
    fx,
    a,
    b,
    c,
  };
}

export default function EtudeFonctionAuxiliaire() {
  const [exercise, setExercise] = useState(generateAuxiliaryFunctionExercise());
  const [showCorrection, setShowCorrection] = useState(false);

  return (
    <div className="box content">
      <h2 className="title is-4">Étudier une fonction à l'aide d'une fonction auxiliaire</h2>
      <p>
        Soit la fonction <strong>f</strong> définie sur ]0 ; +∞[ par :
      </p>
      <pre>
        f(x) = {exercise.fx}
      </pre>
      <ol>
        <li>
          Soit <strong>ϕ</strong> définie sur ]0 ; +∞[ par :
          <pre>{exercise.phi}</pre>
          <ul>
            <li>a) Calculer ϕ(1) et la limite de ϕ en 0</li>
            <li>b) Étudier les variations de ϕ sur ]0 ; +∞[. En déduire le signe de ϕ(x).</li>
          </ul>
        </li>
        <li>
          a) Calculer les limites de f aux bornes de ]0 ; +∞[.
          <br />
          b) Montrer que, sur ]0 ; +∞[, <strong>f'(x) = ϕ(x)/x²</strong>.<br />
          En déduire le tableau de variations de f.
        </li>
      </ol>

      <div className="buttons mt-4">
        <button className="button is-primary" onClick={() => setShowCorrection(true)}>
          Afficher la correction
        </button>
        <button
          className="button is-light"
          onClick={() => {
            setExercise(generateAuxiliaryFunctionExercise());
            setShowCorrection(false);
          }}
        >
          Nouvel exercice
        </button>
      </div>

      {showCorrection && (
        <div className="notification is-info mt-4">
          <h3 className="title is-5">Correction</h3>
          <p>
            On définit la fonction auxiliaire ϕ(x) = x² - {exercise.b} + {exercise.c}·ln(x).<br />
            • ϕ(1) = 1 - {exercise.b} + {exercise.c}·ln(1) = {1 - exercise.b}.<br />
            • lim(x→0⁺) ϕ(x) = -∞ (car ln(x) → -∞).<br />
            • ϕ'(x) = 2x + {exercise.c}/x, donc signe de ϕ'(x) &gt; 0 : ϕ est strictement croissante.<br />
            • On en déduit que ϕ(x) &lt; 0 puis &gt; 0, donc on peut étudier le signe.<br />
            <br />
            Pour f(x) = ({`x² - ${exercise.a}x - ${exercise.b} - ${exercise.c}ln(x)`}) / x :<br />
            • On étudie lim(x→0⁺) f(x) et lim(x→∞) f(x).<br />
            • f'(x) = ϕ(x) / x², donc f' a le signe de ϕ.<br />
            • On peut ainsi dresser le tableau de variations de f.
          </p>
        </div>
      )}
    </div>
  );
}
