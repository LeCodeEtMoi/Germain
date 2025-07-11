import React, { useState } from 'react';

// Utilitaire de génération aléatoire d'entiers
function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Générateur de fonction trigonométrique de degré 2, donnant lieu à une équation de degré 3
function generateTrigInequation() {
  const type = Math.random() < 0.5 ? 'cos' : 'sin';
  const u = type;
  const a = randomInt(1, 3);
  const b = randomInt(-6, 6);
  const c = randomInt(-4, 4);

  const fExpression = `${a}${u}²(x) ${b >= 0 ? '+' : '-'} ${Math.abs(b)}${u}(x) ${c >= 0 ? '+' : '-'} ${Math.abs(c)}`;
  const reducedForm = `${a}u² ${b >= 0 ? '+' : '-'} ${Math.abs(b)}u ${c >= 0 ? '+' : '-'} ${Math.abs(c)}`;
  const checkValue = a * 1 * 1 + b * 1 + c; // f(1)
  return { type, a, b, c, fExpression, reducedForm, checkValue };
}

export default function TrigInequationDegree3() {
  const [problem, setProblem] = useState(generateTrigInequation());
  const [showCorrection, setShowCorrection] = useState(false);

  const { type, a, b, c, fExpression, reducedForm, checkValue } = problem;

  const u = `${type}`;

  return (
    <div className="columns is-centered mt-6">
      <div className="column is-10">
        <div className="box content">
          <h2 className="title is-4">Inéquation trigonométrique de degré 3</h2>
          <p>Soit la fonction f définie sur ℝ par :</p>
          <p className="has-text-centered mb-4"><strong>f(x) = {fExpression}</strong></p>
          <p>On souhaite résoudre l’inéquation suivante :</p>
          <p className="has-text-centered mb-4"><strong>{fExpression} &gt; 0</strong> sur <strong>[0, 2π]</strong></p>

          <ol>
            <li>Vérifier que f(1) = {checkValue}</li>
            <li>Exprimer f(x) sous la forme : <strong>f(x) = {reducedForm}</strong> avec u = {u}</li>
            <li>Étudier le signe de f(x)</li>
            <li>En déduire les solutions de l’inéquation sur [0, 2π]</li>
          </ol>

          <div className="buttons mt-4">
            <button className="button is-primary" onClick={() => setShowCorrection(true)}>Afficher la correction</button>
            <button className="button is-light" onClick={() => { setProblem(generateTrigInequation()); setShowCorrection(false); }}>
              Nouvel exercice
            </button>
          </div>

          {showCorrection && (
            <div className="notification is-info mt-4">
              <h3 className="title is-5">Correction</h3>
              <ul>
                <li><strong>1.</strong> f(1) = {a}×1² + {b}×1 + {c} = <strong>{checkValue}</strong></li>
                <li><strong>2.</strong> Posons u = {u}, alors f(x) = <strong>{reducedForm}</strong></li>
                <li>
                  <strong>3.</strong> Étude de signe :
                  <ul>
                    <li>On résout <strong>{a}u² + {b}u + {c} &gt; 0</strong></li>
                    <li>Discriminant Δ = {b}² - 4×{a}×{c} = {b * b - 4 * a * c}</li>
                    <li>Racines (si Δ ≥ 0) : <br />
                      u₁ = {((-b - Math.sqrt(b * b - 4 * a * c)) / (2 * a)).toFixed(2)} <br />
                      u₂ = {((-b + Math.sqrt(b * b - 4 * a * c)) / (2 * a)).toFixed(2)}
                    </li>
                    <li>On dresse le tableau de signes selon le tableau de variations d’un trinôme.</li>
                  </ul>
                </li>
                <li>
                  <strong>4.</strong> Ensuite, on cherche les x ∈ [0, 2π] tels que {type}(x) ∈ les bons intervalles en fonction du signe.
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
