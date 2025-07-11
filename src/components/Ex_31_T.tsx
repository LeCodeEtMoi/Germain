import React, { useState } from 'react';

function generateTangentAnalysisProblem() {
  // Choix aléatoire de coefficients pour f(x) = a·ln(x) + b
  const a = Math.floor(Math.random() * 4) + 1; // entre 1 et 4
  const b = Math.floor(Math.random() * 5) - 2; // entre -2 et 2

  // f(x) = a ln(x) + b
  const fx = (x: number): number => a * Math.log(x) + b;
  const dfx = (x: number): number => a / x;
  const f1 = fx(1);
  const df1 = dfx(1);

  const tangent = `${df1}·(x - 1) + ${f1}`;

  // g(x) = ln(x) - x + 1
  const gx = (x: number): number => Math.log(x) - x + 1;
  const dgx = (x: number): number => 1 / x - 1;

  return {
    a,
    b,
    fx: `f(x) = ${a}·ln(x) + ${b}`,
    tangent,
    f1: f1.toFixed(2),
    df1: df1.toFixed(2),
    g1: gx(1).toFixed(2),
    gxExpression: 'g(x) = ln(x) - x + 1',
    dgxExpression: `g'(x) = 1/x - 1`,
  };
}

export default function LnTangentAnalysis() {
  const [problem, setProblem] = useState(generateTangentAnalysisProblem());
  const [showCorrection, setShowCorrection] = useState(false);

  return (
    <div className="columns is-centered mt-6">
      <div className="column is-10">
        <div className="box content">
          <h2 className="title is-4">Étude d'une tangente et fonction ln</h2>
          <p>Soit la fonction <strong>{problem.fx}</strong> définie sur ]0 ; +∞[.</p>

          <ol>
            <li>
              Déterminer l'équation de la tangente <strong>T₁</strong> à la courbe de <strong>f</strong> au point d'abscisse 1.
            </li>
            <li>
              <strong>a)</strong> Montrer qu'étudier la position relative de <strong>𝒞<sub>f</sub></strong> et de sa tangente revient à étudier le signe de <strong>{problem.a}(ln(x) - x + 1)</strong>.
            </li>
            <li>
              <strong>b)</strong> Soit <strong>{problem.gxExpression}</strong>. Étudier le signe de g(x).
            </li>
            <li>
              <strong>c)</strong> Calculer <strong>g(1)</strong> et en déduire le signe de g(x) sur ]0 ; +∞[.
            </li>
            <li>
              <strong>d)</strong> En déduire la position relative de <strong>𝒞<sub>f</sub></strong> et <strong>T₁</strong>.
            </li>
          </ol>

          <button className="button is-primary mr-2" onClick={() => setShowCorrection(true)}>
            Afficher la correction
          </button>
          <button
            className="button is-light"
            onClick={() => {
              setProblem(generateTangentAnalysisProblem());
              setShowCorrection(false);
            }}
          >
            Nouvel exercice
          </button>

          {showCorrection && (
            <div className="notification is-info mt-4">
              <h3 className="title is-5">Correction</h3>
              <ul>
                <li><strong>f(1) =</strong> {problem.f1} ; <strong>f'(1) =</strong> {problem.df1}</li>
                <li><strong>Équation de T₁ :</strong> y = {problem.tangent}</li>
                <li>On étudie le signe de g(x) = ln(x) - x + 1.</li>
                <li><strong>g'(x) =</strong> {problem.dgxExpression} → g décroît sur ]0 ; 1[ et croît sur ]1 ; +∞[</li>
                <li><strong>g(1) =</strong> {problem.g1}</li>
                <li><strong>Signe de g(x)</strong> : négatif puis positif, donc ln(x) &lt; x - 1 sur ]0 ; 1[ et ln(x) &gt; x - 1 sur ]1 ; +∞[</li>
                <li>Donc <strong>f(x) &lt; T₁(x)</strong> sur ]0 ; 1[ et <strong>f(x) &gt; T₁(x)</strong> sur ]1 ; +∞[</li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
