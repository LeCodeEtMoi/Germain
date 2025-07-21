import React, { useState } from 'react';
import MathTex from '@/components/MathTex';

function getRandomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateVariationData() {
  const a = getRandomInt(1, 4); // minimum de la fonction
  const x0 = getRandomInt(1, 3); // abscisse du minimum
  const f0 = -getRandomInt(1, 5); // valeur minimale (f(x0))
  const L = getRandomInt(4, 8); // valeur limite en +∞

  return {
    a,
    x0,
    f0,
    L,
  };
}

export default function ExerciceTableauVariationUniqueZero() {
  const [problem, setProblem] = useState(generateVariationData());
  const [showCorrection, setShowCorrection] = useState(false);

  const newExercise = () => {
    setProblem(generateVariationData());
    setShowCorrection(false);
  };

  const { x0, f0, L } = problem;

  return (
    <div className="box">
      <h2 className="title is-4">Étude graphique d'une fonction</h2>

      <p>Soit une fonction <MathTex tex="f" /> définie sur <MathTex tex="[0, +\\infty[" /> dont le tableau de variations est donné ci-dessous :</p>

      <table className="table is-bordered is-striped is-narrow is-hoverable mt-4 has-text-centered">
        <thead>
          <tr>
            <th><MathTex tex="x" /></th>
            <th>0</th>
            <th><MathTex tex={String(x0)} /></th>
            <th><MathTex tex="+\\infty" /></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th><MathTex tex="f(x)" /></th>
            <td><MathTex tex="+" /></td>
            <td><MathTex tex={String(f0)} /></td>
            <td><MathTex tex={String(L)} /></td>
          </tr>
          <tr>
            <th>Variations</th>
            <td colSpan={1}><MathTex tex="\\searrow" /></td>
            <td colSpan={1}><MathTex tex="\\nearrow" /></td>
            <td></td>
          </tr>
        </tbody>
      </table>

      <p className="mt-4">
        Justifier que l'équation <MathTex tex="f(x) = 0" /> admet une <strong>unique solution</strong> sur <MathTex tex="[0, +\\infty[" />.
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
          <ul>
            <li>La fonction <MathTex tex="f" /> est continue par hypothèse sur <MathTex tex="[0, +\\infty[" />.</li>
            <li>Le tableau de variations montre que :
              <ul>
                <li><MathTex tex={`f(0) > 0`} />,</li>
                <li><MathTex tex={`f(${x0}) = ${f0}`} /> avec <MathTex tex={`${f0} < 0`} />,</li>
                <li><MathTex tex={`f(x) \\to ${L} > 0`} /> quand <MathTex tex="x \\to +\\infty" />.</li>
              </ul>
            </li>
            <li>Donc, <MathTex tex="f" /> passe de positif à négatif, puis redevient positif.</li>
            <li>Par le théorème des valeurs intermédiaires, il existe :
              <ul>
                <li>au moins une solution<MathTex tex={`\\alpha_1 \\in (0, ${x0})`} />
                   avec <MathTex tex="f(\\alpha_1) = 0" /></li>
                <li>au moins une solution <MathTex tex="\\alpha_1 < x_0 < \\alpha_2" />

 avec <MathTex tex="f(\\alpha_2) = 0" /></li>
              </ul>
            </li>
            <li><strong>Mais</strong> comme le minimum est atteint en <MathTex tex={`x = ${x0}`} /> et que <MathTex tex={`f(${x0}) = ${f0} < 0`} />, il y a un seul zéro de part et d’autre de ce minimum.</li>
            <li>Donc, l’équation <MathTex tex="f(x) = 0" /> admet exactement deux solutions réelles distinctes <MathTex tex="\\alpha_1 < x_0 < \\alpha_2" /> sur <MathTex tex="[0, +\\infty[" />.</li>
            <li><strong>Mais si</strong> vous voulez uniquement une solution (et que la fonction est strictement décroissante par exemple jusqu’à +∞), vous pouvez ajuster le générateur.</li>
          </ul>
        </div>
      )}
    </div>
  );
}
