import React, { useState } from 'react';
import  MathTex  from '@/components/MathTex';

// Fonction pour générer aléatoirement une fonction polynomiale du 3e degré
function generatePolynomial() {
  // On s'assure que a ≠ 0 pour un polynôme de degré 3
  const a = Math.floor(Math.random() * 3 + 1); // 1 à 3
  const b = Math.floor(Math.random() * 10 - 5); // -5 à 4
  const c = Math.floor(Math.random() * 6 - 3);  // -3 à 2
  const d = Math.floor(Math.random() * 6 - 3);  // -3 à 2
  return { a, b, c, d };
}

const ExerciceConvexiteAvancee = () => {
  const [showCorrection, setShowCorrection] = useState(false);
  const { a, b, c, d } = generatePolynomial();

  const f = (x: number) => a * x ** 3 + b * x ** 2 + c * x + d;
  const fPrime = (x: number) => 3 * a * x ** 2 + 2 * b * x + c;
  const fSeconde = (x: number) => 6 * a * x + 2 * b;

  // Calcul des points d’inflexion où f''(x) = 0
  const xInflexion = -b / (3 * a);

  return (
    <div className="box my-5">
      <h2 className="title is-4">Convexité d'une fonction à partir de <MathTex tex="f''(x)" /></h2>

      <p>Soit la fonction <MathTex tex={`f(x) = ${a}x^3 ${b >= 0 ? '+' : ''}${b}x^2 ${c >= 0 ? '+' : ''}${c}x ${d >= 0 ? '+' : ''}${d}`} />.</p>

      <p>On souhaite étudier la convexité et la concavité de <MathTex tex="f" /> sur <MathTex tex="\mathbb{R}" /> à partir du signe de <MathTex tex="f''(x)" />.</p>

      <ol className="my-4">
        <li>1. Calculer la dérivée seconde <MathTex tex="f''(x)" />.</li>
        <li>2. Résoudre <MathTex tex="f''(x) = 0" /> pour trouver les points d'inflexion éventuels.</li>
        <li>3. Étudier le signe de <MathTex tex="f''(x)" /> sur <MathTex tex="\mathbb{R}" /> et en déduire les intervalles de convexité et de concavité de <MathTex tex="f" />.</li>
      </ol>

      <button className="button is-link mt-4" onClick={() => setShowCorrection(!showCorrection)}>
        {showCorrection ? 'Masquer la correction' : 'Afficher la correction'}
      </button>

      {showCorrection && (
        <div className="content mt-4">
          <h3 className="title is-5">Correction</h3>

          <p><strong>1. Dérivée seconde :</strong></p>
          <p><MathTex tex={`f''(x) = ${6 * a}x ${2 * b >= 0 ? '+' : ''}${2 * b}`} /></p>

          <p><strong>2. Résolution de <MathTex tex="f''(x) = 0" /></strong></p>
          <p>
            On résout : <MathTex tex={`${6 * a}x + ${2 * b} = 0`} /> ⇔ 
            <MathTex tex={`x = ${xInflexion.toFixed(2)}`} />
          </p>

          <p><strong>3. Étude du signe de <MathTex tex="f''(x)" /></strong></p>
          <ul>
            <li>
              Pour <MathTex tex={`x < ${xInflexion.toFixed(2)}`} /> : <MathTex tex="f''(x)" /> est de signe {6 * a < 0 ? 'négatif' : 'positif'} ⇒ <strong>f est {6 * a < 0 ? 'concave' : 'convexe'}</strong>.
            </li>
            <li>
              Pour <MathTex tex={`x > ${xInflexion.toFixed(2)}`} /> : <MathTex tex="f''(x)" /> est de signe {6 * a > 0 ? 'positif' : 'négatif'} ⇒ <strong>f est {6 * a > 0 ? 'convexe' : 'concave'}</strong>.
            </li>
          </ul>

          <p>
            <strong>Conclusion :</strong> la fonction f change de concavité en <MathTex tex={`x = ${xInflexion.toFixed(2)}`} />, ce qui est un <em>point d'inflexion</em>.
          </p>
        </div>
      )}
    </div>
  );
};

export default ExerciceConvexiteAvancee;
