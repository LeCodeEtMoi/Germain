import React, { useState } from 'react';
import MathTex from '@/components/MathTex';

function getRandomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateProblem() {
  const a = getRandomInt(1, 3); // a ≠ 0
  const b = getRandomInt(-5, 5);
  const c = getRandomInt(-5, 5);
  const alpha = getRandomInt(0, 3); // valeur d'alpha
  const x1 = -10;
  const x2 = alpha;
  const f1 = a * x1 * x1 + b * x1 + c;
  const f2 = a * x2 * x2 + b * x2 + c;
  const k = getRandomInt(Math.min(f1, f2) + 1, Math.max(f1, f2) - 1); // valeur "atteinte" entre x1 et x2

  return {
    a, b, c, alpha, x1, x2, f1, f2, k
  };
}

export default function ExContinuitéTVI() {
  const [problem, setProblem] = useState(generateProblem());
  const [showCorrection, setShowCorrection] = useState(false);

  const { a, b, c, alpha, x1, x2, f1, f2, k } = problem;

  const newExercise = () => {
    setProblem(generateProblem());
    setShowCorrection(false);
  };

  return (
    <div className="box">
      <h2 className="title is-4">Continuité, dérivabilité, TVI</h2>

      <p>Soit la fonction <MathTex tex={`f(x) = ${a}x^2 ${b >= 0 ? '+ ' + b : '- ' + -b}x ${c >= 0 ? '+ ' + c : '- ' + -c}`} /> définie sur ℝ.</p>

      <ul>
        <li>Pourquoi <MathTex tex="f" /> est-elle continue sur ℝ ?</li>
        <li>Pourquoi est-elle dérivable sur ℝ ?</li>
        <li>Dresser son tableau de variation.</li>
        <li>Montrer que l'équation <MathTex tex={`f(x) = ${k}`} /> admet au moins une solution sur <MathTex tex={`(-\\infty, ${alpha}]`} />.</li>
        <li>Donner un encadrement au dixième près de cette solution.</li>
      </ul>

      <div className="buttons mt-4">
        <button className="button is-primary" onClick={() => setShowCorrection(true)}>Afficher la correction</button>
        <button className="button is-light ml-2" onClick={newExercise}>Nouvel exercice</button>
      </div>

      {showCorrection && (
        <div className="notification is-info mt-4">
          <h3 className="title is-5">Correction</h3>
          <ul>
            <li>La fonction <MathTex tex="f" /> est un polynôme, donc elle est continue sur ℝ.</li>
            <li>Elle est également dérivable sur ℝ, car les polynômes sont dérivables partout.</li>
            <li>
              Sa dérivée est : <MathTex tex={`f'(x) = ${2 * a}x ${b >= 0 ? '+ ' + b : '- ' + -b}`} /> <br />
              Le signe de <MathTex tex="f'(x)" /> dépend de <MathTex tex={`x = -\\frac{${b}}{${2 * a}}`} />, ce qui est le sommet de la parabole.
            </li>
            <li>
              On a <MathTex tex={`f(${x1}) = ${f1}`} /> et <MathTex tex={`f(${x2}) = ${f2}`} />. <br />
              Puisque <MathTex tex={`${k}`} /> est strictement entre ces deux valeurs, et que <MathTex tex="f" /> est continue, on applique le théorème des valeurs intermédiaires (TVI) : <br />
              Il existe <MathTex tex={`x_0 \\in (${x1}, ${x2})`} /> tel que <MathTex tex={`f(x_0) = ${k}`} />.
            </li>
            <li>
              On cherche un encadrement de la solution par dichotomie (au dixième près, non effectué ici dynamiquement mais laissé à l’élève comme suggestion).
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
