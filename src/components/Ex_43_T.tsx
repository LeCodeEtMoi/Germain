import React, { useState } from 'react';
import MathTex from '@/components/MathTex';

function getRandomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateProblem() {
  const mean = getRandomInt(500, 1500); // espérance E(D) en m³/s
  const variance = getRandomInt(1000, 5000); // variance V(D)
  const stdDev = Math.sqrt(variance);
  const a = getRandomInt(2, 4) * stdDev; // seuil autour de la moyenne (k * écart-type)

  return {
    mean,
    variance,
    stdDev: Math.round(stdDev * 100) / 100,
    a: Math.round(a * 100) / 100,
    upperBoundProb: Math.round((variance / (a * a)) * 10000) / 10000,
  };
}

export default function InegaliteBienayme() {
  const [problem, setProblem] = useState(generateProblem());
  const [showCorrection, setShowCorrection] = useState(false);

  const newExercise = () => {
    setProblem(generateProblem());
    setShowCorrection(false);
  };

  return (
    <div className="box">
      <h2 className="title is-4">Inégalité de Bienaymé-Tchebychev</h2>

      <p>On étudie le débit <MathTex tex="D" /> (en m³/s) d’un fleuve à un instant <MathTex tex="t" />. On sait que :</p>
      <ul>
        <li><MathTex tex={`E(D) = ${problem.mean}`} /></li>
        <li><MathTex tex={`V(D) = ${problem.variance}`} /></li>
      </ul>

      <p>Donner une majoration de la probabilité suivante :</p>
      <p>
        <MathTex tex={`P(|D - ${problem.mean}| \geq ${problem.a})`} />
      </p>

      <p>Interpréter ce résultat dans le contexte.</p>

      <p className="mt-4">En déduire une minoration de la probabilité que le débit soit compris entre <MathTex tex={`${problem.mean - problem.a}`} /> et <MathTex tex={`${problem.mean + problem.a}`} />.</p>

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
            <li>
              <strong>Inégalité de Bienaymé-Tchebychev :</strong><br />
              <MathTex tex={`P(|D - ${problem.mean}| \geq ${problem.a}) \leq \frac{${problem.variance}}{(${problem.a})^2} = ${problem.upperBoundProb}`} />
            </li>
            <li className="mt-3">
              <strong>Interprétation :</strong><br />
              La probabilité que le débit s’écarte de plus de {problem.a} m³/s de la moyenne {problem.mean} m³/s est inférieure à {problem.upperBoundProb}.
            </li>
            <li className="mt-3">
              <strong>Minoration de la probabilité :</strong><br />
              <MathTex tex={`P(${problem.mean - problem.a} < D < ${problem.mean + problem.a}) \geq 1 - ${problem.upperBoundProb} = ${Math.round((1 - problem.upperBoundProb) * 10000) / 10000}`} />
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
