import React, { useState } from 'react';
import MathTex from '@/components/MathTex';

function getRandomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateProblem() {
  const k = getRandomInt(1, 3);
  const a = getRandomInt(1, 4);
  const b = getRandomInt(1, 5);

  const limit = a; // Car lim (a + b/n^k) = a
  const isPositive = b >= 0;

  return { k, a, b, limit, isPositive };
}

export default function ExoTheoremeComparaison() {
  const [problem, setProblem] = useState(generateProblem());
  const [showCorrection, setShowCorrection] = useState(false);

  const newExercise = () => {
    setProblem(generateProblem());
    setShowCorrection(false);
  };

  return (
    <div className="box">
      <h2 className="title is-4">Théorème de comparaison – Limite d’une suite</h2>
      <p>Soit la suite définie pour tout entier naturel <MathTex tex="n \geq 1" /> par :</p>

      <p className="mt-2">
        <MathTex tex={`U_n = \\frac{${problem.a}n^{${problem.k}} + ${problem.b}}{n^{${problem.k}}}`} />
      </p>

      <p className="mt-4">
        1. Montrer que <MathTex tex={`U_n ${problem.isPositive ? '\\geq' : '\\leq'} 1`} /> pour tout <MathTex tex="n \geq 1" />.
      </p>
      <p>
        2. En déduire la limite de <MathTex tex="U_n" />.
      </p>

      <button className="button is-primary mt-4" onClick={() => setShowCorrection(true)}>
        Afficher la correction
      </button>
      <button className="button is-light mt-4 ml-2" onClick={newExercise}>
        Nouvel exercice
      </button>

      {showCorrection && (
        <div className="notification is-info mt-4">
          <h3 className="title is-5">Correction</h3>
          <p>
            On peut écrire :
            <br />
            <MathTex
              tex={`U_n = \\frac{${problem.a}n^{${problem.k}} + ${problem.b}}{n^{${problem.k}}} = ${problem.a} + \\frac{${problem.b}}{n^{${problem.k}}}`}
            />
          </p>
          <p className="mt-3">
            Comme <MathTex tex={`\\frac{${problem.b}}{n^{${problem.k}}}`} /> est {problem.isPositive ? 'positif' : 'négatif'} pour tout <MathTex tex="n \geq 1" />, on a :
          </p>
          <p className="mt-2">
            <MathTex tex={`U_n ${problem.isPositive ? '\\geq' : '\\leq'} ${problem.a}`} />
          </p>
          <p className="mt-4">
            Enfin, comme <MathTex tex={`\\frac{${problem.b}}{n^{${problem.k}}} \\to 0`} />, on obtient :
            <br />
            <MathTex tex={`\\lim_{n \\to +\\infty} U_n = ${problem.a}`} />
          </p>
        </div>
      )}
    </div>
  );
}
