import React, { useState } from 'react';
import MathTex from '@/components/MathTex';

function getRandomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateProblem() {
  const EX = getRandomInt(-5, 5);
  const VX = getRandomInt(1, 5);
  const EY = getRandomInt(-5, 5);
  const a = getRandomInt(2, 4);

  return {
    EX,
    VX,
    EY,
    a,
    E_X_plus_Y: EX + EY,
    E_aX: a * EX,
    V_aX: a * a * VX
  };
}

export default function EsperanceVarianceExercise() {
  const [problem, setProblem] = useState(generateProblem());
  const [showCorrection, setShowCorrection] = useState(false);

  const newExercise = () => {
    setProblem(generateProblem());
    setShowCorrection(false);
  };

  return (
    <div className="box">
      <h2 className="title is-4">Espérance et Variance</h2>
      <p>On considère deux variables aléatoires <MathTex tex="X" /> et <MathTex tex="Y" /> telles que :</p>
      <ul>
        <li><MathTex tex={`E(X) = ${problem.EX}`} /></li>
        <li><MathTex tex={`V(X) = ${problem.VX}`} /></li>
        <li><MathTex tex={`E(Y) = ${problem.EY}`} /></li>
      </ul>

      <p>Calculer les valeurs suivantes :</p>
      <ul>
        <li><MathTex tex={`E(X + Y)`} /></li>
        <li><MathTex tex={`E(${problem.a}X)`} /></li>
        <li><MathTex tex={`V(${problem.a}X)`} /></li>
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
            <li><MathTex tex={`E(X + Y) = E(X) + E(Y) = ${problem.EX} + ${problem.EY} = ${problem.E_X_plus_Y}`} /></li>
            <li><MathTex tex={`E(${problem.a}X) = ${problem.a} \\cdot E(X) = ${problem.a} \\cdot ${problem.EX} = ${problem.E_aX}`} /></li>
            <li><MathTex tex={`V(${problem.a}X) = ${problem.a}^2 \\cdot V(X) = ${problem.a ** 2} \\cdot ${problem.VX} = ${problem.V_aX}`} /></li>
          </ul>
        </div>
      )}
    </div>
  );
}
