import React, { useState } from 'react';
import MathTex from '@/components/MathTex';

function getRandomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateProblem() {
  const n = getRandomInt(3, 8); // nombre de variables aléatoires
  const p = getRandomInt(1, 9) / 10; // paramètre p dans [0.1, 0.9]

  return {
    n,
    p,
    esperance: n * p,
  };
}

export default function SommeBernoulli() {
  const [problem, setProblem] = useState(generateProblem());
  const [showCorrection, setShowCorrection] = useState(false);

  const newExercise = () => {
    setProblem(generateProblem());
    setShowCorrection(false);
  };

  return (
    <div className="box">
      <h2 className="title is-4">Somme de variables de loi Bernoulli</h2>
      <p>Soient <MathTex tex={`X_1, X_2, \\dots, X_${problem.n}`} /> des variables aléatoires **indépendantes** suivant la loi de Bernoulli de paramètre <MathTex tex={`p = ${problem.p}`} />.</p>

      <p>On définit <MathTex tex={`S = X_1 + X_2 + \\dots + X_${problem.n}`} />.</p>

      <p>Questions :</p>
      <ul>
        <li>Quelle est la loi de <MathTex tex="S" /> ?</li>
        <li>Déterminer son espérance <MathTex tex="E(S)" />.</li>
      </ul>

      <button className="button is-primary mt-4" onClick={() => setShowCorrection(true)}>
        Afficher la correction
      </button>
      <button className="button is-light mt-4 ml-2" onClick={newExercise}>
        Nouvel exercice
      </button>

      {showCorrection && (
        <div className="notification is-info mt-4">
          <h3 className="title is-5">Correction</h3>
          <ul>
            <li><MathTex tex={`S \\sim \\mathcal{B}(${problem.n}, ${problem.p})`} /></li>
            <li><MathTex tex={`E(S) = n \\cdot p = ${problem.n} \\cdot ${problem.p} = ${problem.esperance}`} /></li>
          </ul>
          <p>Interprétation : la variable aléatoire \( S \) suit une **loi binomiale** car c’est la somme de \( ${problem.n} \) essais de Bernoulli indépendants avec la même probabilité de succès.</p>
        </div>
      )}
    </div>
  );
}
