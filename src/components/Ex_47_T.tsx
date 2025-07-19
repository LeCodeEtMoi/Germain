import React, { useState } from 'react';
import MathTex from '@/components/MathTex';

function getRandomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateProblem() {
  const a = getRandomInt(1, 5) * (Math.random() < 0.5 ? -1 : 1);
  const k = getRandomInt(1, 3);
  return {
    a,
    k,
    simplifiedExponent: k === 1 ? '' : `^{${k}}`,
    limit: 0,
  };
}

export default function ExoGendarmes() {
  const [problem, setProblem] = useState(generateProblem());
  const [showCorrection, setShowCorrection] = useState(false);

  const newExercise = () => {
    setProblem(generateProblem());
    setShowCorrection(false);
  };

  return (
    <div className="box">
      <h2 className="title is-4">Théorème des gendarmes – Limite d’une suite</h2>

      <p>On considère la suite définie pour tout entier naturel <MathTex tex="n \geq 1" /> par :</p>

      <p className="mt-2">
        <MathTex tex={`u_n = \\frac{${problem.a}\\sin(n)}{n${problem.simplifiedExponent}}`} />
      </p>

      <p className="mt-4">Déterminer la limite de <MathTex tex="u_n" /> lorsque <MathTex tex="n \\to +\\infty" />.</p>

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
            On sait que pour tout <MathTex tex="n \in \mathbb{N}" />, on a :
            <br />
            <MathTex tex={`-1 \\leq \\sin(n) \\leq 1`} />
          </p>
          <p className="mt-3">
            En multipliant par {problem.a} (constante), on obtient :
            <br />
            <MathTex tex={`${-Math.abs(problem.a)} \\leq ${problem.a}\\sin(n) \\leq ${Math.abs(problem.a)}`} />
          </p>
          <p className="mt-3">
            En divisant par <MathTex tex={`n${problem.simplifiedExponent}`} />, strictement positif, on encadre :
            <br />
            <MathTex tex={`\\frac{${-Math.abs(problem.a)}}{n${problem.simplifiedExponent}} \\leq u_n \\leq \\frac{${Math.abs(problem.a)}}{n${problem.simplifiedExponent}}`} />
          </p>
          <p className="mt-3">
            Or, <MathTex tex={`\\frac{${Math.abs(problem.a)}}{n${problem.simplifiedExponent}} \\to 0`} /> quand <MathTex tex="n \\to +\\infty" />.
          </p>
          <p className="mt-3">
            Par le théorème des gendarmes, on en déduit que :
            <br />
            <MathTex tex={`\\lim_{n \\to +\\infty} u_n = 0`} />
          </p>
        </div>
      )}
    </div>
  );
}
