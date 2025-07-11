import React, { useState } from 'react';

// Génération aléatoire d'expressions ln ou exp
function generateLnExpProblem() {
  const isLn = Math.random() < 0.5;
  if (isLn) {
    const a = Math.floor(Math.random() * 4) + 2; // a entre 2 et 5
    const b = Math.floor(Math.random() * 3) + 1; // b entre 1 et 3
    const value = Math.floor(Math.random() * 3) + 2; // résultat entre 2 et 4
    const right = value;
    return {
      type: 'ln',
      question: `ln(${a}x + ${b}) = ${right}`,
      domain: `x > ${(-b / a).toFixed(2)}`,
      solution: `x = ${(Math.exp(right) - b) / a}`
    };
  } else {
    const a = Math.floor(Math.random() * 3) + 1;
    const b = Math.floor(Math.random() * 3) + 1;
    const right = Math.floor(Math.random() * 10) + 1;
    return {
      type: 'exp',
      question: `e^(${a}x - ${b}) > ${right}`,
      domain: 'x ∈ ℝ',
      solution: `x > ${(Math.log(right) + b) / a}`
    };
  }
}

export default function LnExpEquation() {
  const [problem, setProblem] = useState(generateLnExpProblem());
  const [showCorrection, setShowCorrection] = useState(false);

  return (
    <div className="columns is-centered mt-6">
      <div className="column is-8">
        <div className="box content">
          <h2 className="title is-4">Équation/Inéquation avec ln ou exp</h2>
          <p>Résolvez l’équation ou inéquation suivante :</p>

          <p className="has-text-centered is-size-5 my-4">
            <strong>{problem.question}</strong>
          </p>

          <button className="button is-primary mr-2" onClick={() => setShowCorrection(true)}>
            Afficher la correction
          </button>
          <button className="button is-light" onClick={() => { setProblem(generateLnExpProblem()); setShowCorrection(false); }}>
            Nouvel exercice
          </button>

          {showCorrection && (
            <div className="notification is-info mt-4">
              <h3 className="title is-5">Correction</h3>
              <ul>
                <li><strong>1.</strong> Domaine de définition : <em>{problem.domain}</em></li>
                {problem.type === 'ln' && (
                  <>
                    <li><strong>2.</strong> On applique la fonction exponentielle de chaque côté.</li>
                    <li><strong>3.</strong> On isole x et on simplifie.</li>
                  </>
                )}
                {problem.type === 'exp' && (
                  <>
                    <li><strong>2.</strong> On applique le logarithme de chaque côté.</li>
                    <li><strong>3.</strong> On isole x et on simplifie.</li>
                  </>
                )}
                <li><strong>4.</strong> Solution : <strong>{problem.solution}</strong></li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
