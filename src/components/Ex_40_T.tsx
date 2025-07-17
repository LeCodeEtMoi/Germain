import React, { useState } from 'react';
import MathTex from '@/components/MathTex';

function getRandomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateProblem() {
  const a = getRandomInt(1, 4);
  const b = a + getRandomInt(1, 3);
  const coef = getRandomInt(1, 3);
  const fType = Math.random() > 0.5 ? 'x' : 'cos(x)';
  const m = fType === 'x' ? coef * a : -coef;
  const M = fType === 'x' ? coef * b : coef;

  return {
    a,
    b,
    f: `${coef === 1 ? '' : coef}·${fType}`,
    m,
    M,
    lowerBound: m * (b - a),
    upperBound: M * (b - a),
  };
}

export default function IntegralBoundingExercise() {
  const [problem, setProblem] = useState(generateProblem());
  const [showCorrection, setShowCorrection] = useState(false);

  const newProblem = () => {
    setProblem(generateProblem());
    setShowCorrection(false);
  };

  return (
    <div className="box">
      <h2 className="title is-4">Encadrement d'une intégrale</h2>
      <p>On considère la fonction :</p>
      <MathTex tex={`f(x) = ${problem.f}`} />
      <p>Définie sur l’intervalle <MathTex tex={`[${problem.a}; ${problem.b}]`} />.</p>
      <p>
        On admet que pour tout <MathTex tex="x" /> de cet intervalle : <br />
        <MathTex tex={`${problem.m} \\leq f(x) \\leq ${problem.M}`} />
      </p>
      <p>Encadrez l'intégrale <MathTex tex={`\\int_{${problem.a}}^{${problem.b}} f(x) dx`} />.</p>

      <button className="button is-primary mt-4" onClick={() => setShowCorrection(true)}>Afficher la correction</button>
      <button className="button is-light mt-4 ml-2" onClick={newProblem}>Nouvel exercice</button>

      {showCorrection && (
        <div className="notification is-info mt-4">
          <h3 className="title is-5">Correction</h3>
          <p>
            D’après l’encadrement donné, on a :
          </p>
          <MathTex tex={`\\int_{${problem.a}}^{${problem.b}} f(x) dx \\in [${problem.lowerBound} ; ${problem.upperBound}]`} />
        </div>
      )}
    </div>
  );
}
