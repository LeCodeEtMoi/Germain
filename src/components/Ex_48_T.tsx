import React, { useState } from 'react';
import MathTex from '@/components/MathTex';

function getRandomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateProblem() {
  const a = getRandomInt(1, 3); // u0 = a, v0 = a + 2
  return {
    u0: a,
    v0: a + 2
  };
}

export default function ExoSuitesMonotones() {
  const [problem, setProblem] = useState(generateProblem());
  const [showCorrection, setShowCorrection] = useState(false);

  const newExercise = () => {
    setProblem(generateProblem());
    setShowCorrection(false);
  };

  return (
    <div className="box">
      <h2 className="title is-4">Théorème de convergence des suites monotones</h2>

      <p>
        On considère deux suites définies par récurrence :
      </p>
      <ul>
        <li><MathTex tex={`u_0 = ${problem.u0}`} /></li>
        <li><MathTex tex={`v_0 = ${problem.v0}`} /></li>
        <li><MathTex tex={`u_{n+1} = \\frac{u_n + v_n}{2}`} /></li>
        <li><MathTex tex={`v_{n+1} = \\sqrt{u_n v_n}`} /></li>
      </ul>

      <p className="mt-3">
        Montrer que <MathTex tex="(u_n)" /> est croissante, <MathTex tex="(v_n)" /> est décroissante, et que ces suites convergent vers la même limite.
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
            On a <MathTex tex={`u_0 = ${problem.u0} < ${problem.v0} = v_0`} />.  
            Montrons que cette propriété est conservée à chaque rang.
          </p>

          <p className="mt-3">
            Si <MathTex tex="u_n \leq v_n" />, alors :
            <ul>
              <li><MathTex tex="u_{n+1} = \frac{u_n + v_n}{2} \leq \frac{v_n + v_n}{2} = v_n" /></li>
              <li><MathTex tex="v_{n+1} = \sqrt{u_n v_n} \geq \sqrt{u_n u_n} = u_n" /></li>
            </ul>
          </p>

          <p>
            Donc on a toujours <MathTex tex="u_n \leq v_n" /> et :
            <ul>
              <li><MathTex tex="u_{n+1} \geq u_n" /> ⇒ la suite <MathTex tex="(u_n)" /> est croissante,</li>
              <li><MathTex tex="v_{n+1} \leq v_n" /> ⇒ la suite <MathTex tex="(v_n)" /> est décroissante.</li>
            </ul>
          </p>

          <p className="mt-3">
            De plus, on a toujours <MathTex tex="u_n \leq v_n" /> donc :
            <ul>
              <li><MathTex tex="(u_n)" /> est croissante et **majorée** par <MathTex tex="v_0" /></li>
              <li><MathTex tex="(v_n)" /> est décroissante et **minorée** par <MathTex tex="u_0" /></li>
            </ul>
          </p>

          <p>
            Par le **théorème de convergence des suites monotones**, les deux suites **convergent**.
          </p>

          <p className="mt-3">
            En fait, on a même <strong>convergence vers une même limite</strong> <MathTex tex="ℓ" /> :
            <br />
            Si <MathTex tex="u_n \to ℓ" /> et <MathTex tex="v_n \to ℓ" /> alors :
            <ul>
              <li><MathTex tex="u_{n+1} = \frac{u_n + v_n}{2} \to \frac{ℓ + ℓ}{2} = ℓ" /></li>
              <li><MathTex tex="v_{n+1} = \sqrt{u_n v_n} \to \sqrt{ℓ \cdot ℓ} = ℓ" /></li>
            </ul>
            Donc les deux suites convergent vers la même limite ℓ.
          </p>

          <p className="mt-3">
            Ce processus est une forme de **moyenne arithmético-géométrique**, connue pour converger vers une valeur entre <MathTex tex="u_0" /> et <MathTex tex="v_0" />.
          </p>
        </div>
      )}
    </div>
  );
}
