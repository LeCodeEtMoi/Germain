import React, { useState } from 'react';
import  MathTex  from '@/components/MathTex';

const ExerciceConvexiteDerivee = () => {
  const [showCorrection, setShowCorrection] = useState(false);

  // Données aléatoires
  const a = -2;
  const b = 0;
  const c = 4;
  const fpa = 5;
  const fpb = -2;
  const fpc = 5;

  return (
    <div className="box my-5">
      <h2 className="title is-4">Étude de la convexité à partir du tableau de variation de <MathTex tex="f'" /></h2>
      <p>
        On considère une fonction <MathTex tex="f" /> deux fois dérivable sur <MathTex tex="\mathbb{R}" />.
        On donne ci-dessous le tableau de variation de sa dérivée <MathTex tex="f'" /> :
      </p>

      <div className="table-container my-4">
        <table className="table is-bordered has-text-centered is-fullwidth">
          <thead>
            <tr>
              <th><MathTex tex="x" /></th>
              <th><MathTex tex={String(a)} /></th>
              <th><MathTex tex={String(b)} /></th>
              <th><MathTex tex={String(c)} /></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><MathTex tex="f'(x)" /></td>
              <td><MathTex tex={String(fpa)} /></td>
              <td><MathTex tex={String(fpb)} /></td>
              <td><MathTex tex={String(fpc)} /></td>
            </tr>
            <tr>
              <td>Variations</td>
              <td colSpan={2}>↘️</td>
              <td colSpan={2}>↗️</td>
            </tr>
          </tbody>
        </table>
      </div>

      <p>
        <strong>Question :</strong> Déterminer les intervalles sur lesquels la fonction <MathTex tex="f" /> est convexe ou concave.
        En déduire le signe de la dérivée seconde <MathTex tex="f''(x)" />.
      </p>

      <button
        className="button is-info mt-4"
        onClick={() => setShowCorrection(!showCorrection)}
      >
        {showCorrection ? 'Masquer la correction' : 'Afficher la correction'}
      </button>

      {showCorrection && (
        <div className="content mt-4">
          <h3 className="title is-5">Correction</h3>

          <p>
            On sait que si <MathTex tex="f'" /> est décroissante sur un intervalle, alors <MathTex tex="f''" /> est négative et donc <MathTex tex="f" /> est <strong>concave</strong> sur cet intervalle.
          </p>

          <p>
            Si <MathTex tex="f'" /> est croissante, alors <MathTex tex="f''" /> est positive et donc <MathTex tex="f" /> est <strong>convexe</strong>.
          </p>

          <ul>
            <li>
              Sur <MathTex tex={`[${a}, ${b}]`} />, <MathTex tex="f'" /> décroît ⇒ <MathTex tex="f''(x) < 0" /> ⇒ <strong><MathTex tex="f" /> est concave</strong>.
            </li>
            <li>
              Sur <MathTex tex={`[${b}, ${c}]`} />, <MathTex tex="f'" /> croît ⇒ <MathTex tex="f''(x) > 0" /> ⇒ <strong><MathTex tex="f" /> est convexe</strong>.
            </li>
          </ul>

          <p><strong>Conclusion :</strong></p>
          <ul>
            <li><MathTex tex="f" /> est concave sur <MathTex tex={`[${a}, ${b}]`} /></li>
            <li><MathTex tex="f" /> est convexe sur <MathTex tex={`[${b}, ${c}]`} /></li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default ExerciceConvexiteDerivee;
