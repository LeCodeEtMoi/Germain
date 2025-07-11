import React, { useState } from 'react';

// Génère une fonction trigonométrique quadratique
function generateTrigFunction() {
  const type = Math.random() < 0.5 ? 'cos' : 'sin';
  const a = Math.floor(Math.random() * 5 + 1); // 1 à 5
  const b = -2 * a; // pour avoir un minimum ou maximum clair
  const c = 0;

  const expression = `${a}${type}²(x) ${b >= 0 ? '+' : '-'} ${Math.abs(b)}${type}(x)`;
  return {
    type,
    a,
    b,
    c,
    expression,
  };
}

export default function TrigFunctionStudy() {
  const [func, setFunc] = useState(generateTrigFunction());
  const [showCorrection, setShowCorrection] = useState(false);

  const { type, a, b, expression } = func;

  const period = '2π';
  const interval = '[0, 2π]';

  const extremumPoint = b / (2 * a); // racine de la dérivée réduite
  const extremumTrig = type === 'cos' ? `cos(x) = ${extremumPoint}` : `sin(x) = ${extremumPoint}`;
  const derivée = `f'(x) = ${2 * a}${type}(x)·${type === 'cos' ? '-sin(x)' : 'cos(x)'} + ${b}${type === 'cos' ? '-sin(x)' : 'cos(x)'}`;

  return (
    <div className="columns is-centered mt-6">
      <div className="column is-10">
        <div className="box content">
          <h2 className="title is-4">Étude d’une fonction trigonométrique</h2>
          <p>On considère la fonction suivante définie sur ℝ :</p>
          <p className="has-text-centered my-4"><strong>f(x) = {expression}</strong></p>

          <ol>
            <li><strong>Montrer que f est périodique</strong></li>
            <li><strong>Quel intervalle peut-on prendre comme intervalle d’étude ?</strong></li>
            <li><strong>Dresser le tableau de variation de f sur [0, 2π]</strong></li>
          </ol>

          <div className="buttons mt-4">
            <button className="button is-primary" onClick={() => setShowCorrection(true)}>Afficher la correction</button>
            <button className="button is-light" onClick={() => { setFunc(generateTrigFunction()); setShowCorrection(false); }}>
              Nouvel exercice
            </button>
          </div>

          {showCorrection && (
            <div className="notification is-info mt-4">
              <h3 className="title is-5">Correction</h3>
              <ul>
                <li><strong>1. f est périodique</strong> car elle est composée de fonctions périodiques de période <strong>{period}</strong> (cos² ou sin²).</li>
                <li><strong>2. Intervalle d’étude</strong> : <strong>{interval}</strong>, une période complète suffit à étudier f.</li>
                <li><strong>3. Étude des variations :</strong>
                  <ul>
                    <li>Posons <strong>u(x) = {type}(x)</strong>, alors <strong>f(x) = {a}·u² + {b}·u</strong></li>
                    <li>C’est une fonction polynomiale du second degré en u, qui atteint un extremum pour <strong>u = {extremumPoint}</strong> donc {extremumTrig}</li>
                    <li>La dérivée est : <code>{derivée}</code></li>
                    <li>On étudie les signes de cette dérivée sur [0, 2π] pour en déduire le tableau de variations.</li>
                  </ul>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
