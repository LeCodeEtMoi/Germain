import React, { useState } from 'react';

// Génération aléatoire d'expressions à simplifier avec les propriétés algébriques de ln
function generateLnSimplificationProblem() {
  const choice = Math.floor(Math.random() * 4);
  let question = '';
  let solution = '';

// L'aléatoire est entre 10 et 20 pour avoir des nombres plus grands
  switch (choice) {
    case 0:
      // ln(a/b) = ln(a) - ln(b)
      const a1 = Math.floor(Math.random() * 5) + 10;
      const b1 = Math.floor(Math.random() * 5) + 10;
      question = `ln(${a1}/${b1})`;
      solution = `ln(${a1}) - ln(${b1})`;
      break;
    case 1:
      // ln(a) + ln(b) = ln(ab)
      const a2 = Math.floor(Math.random() * 4) + 10;
      const b2 = Math.floor(Math.random() * 4) + 10;
      question = `ln(${a2}) + ln(${b2})`;
      solution = `ln(${a2 * b2})`;
      break;
    case 2:
      // ln(a^b) = b*ln(a)
      const base = Math.floor(Math.random() * 4) + 10;
      const expo = Math.floor(Math.random() * 3) + 10;
      question = `ln(${base}^${expo})`;
      solution = `${expo} * ln(${base})`;
      break;
    case 3:
      // ln(sqrt(a)) = (1/2) * ln(a)
      const a3 = Math.floor(Math.random() * 10) + 2;
      question = `ln(√${a3})`;
      solution = `(1/2) * ln(${a3})`;
      break;
  }

  return {
    question,
    solution,
  };
}

export default function LnAlgebraicProperties() {
  const [problem, setProblem] = useState(generateLnSimplificationProblem());
  const [showCorrection, setShowCorrection] = useState(false);

  return (
    <div className="columns is-centered mt-6">
      <div className="column is-8">
        <div className="box content">
          <h2 className="title is-4">Simplification avec les propriétés de ln</h2>
          <p>Simplifiez l'expression suivante :</p>

          <p className="has-text-centered is-size-5 my-4">
            <strong>{problem.question}</strong>
          </p>

          <button className="button is-primary mr-2" onClick={() => setShowCorrection(true)}>
            Afficher la correction
          </button>
          <button
            className="button is-light"
            onClick={() => {
              setProblem(generateLnSimplificationProblem());
              setShowCorrection(false);
            }}
          >
            Nouvel exercice
          </button>

          {showCorrection && (
            <div className="notification is-info mt-4">
              <h3 className="title is-5">Correction</h3>
              <ul>
                <li><strong>Rappel :</strong> ln(ab) = ln(a) + ln(b), ln(a/b) = ln(a) - ln(b), ln(a^n) = n·ln(a), ln(√a) = (1/2)·ln(a)</li>
                <li><strong>Expression simplifiée :</strong> {problem.solution}</li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}