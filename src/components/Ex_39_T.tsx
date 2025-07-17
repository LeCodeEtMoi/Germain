import React, { useState } from 'react';
import MathTex from '@/components/MathTex';

const functions = [
  {
    id: 'x2',
    tex: 'f(x) = x^2',
    f: (x: number) => x * x,
    primitive: (x: number) => (1 / 3) * x ** 3,
    answerTex: '\\frac{1}{3}(x^3)',
  },
  {
    id: 'x3',
    tex: 'f(x) = x^3',
    f: (x: number) => x ** 3,
    primitive: (x: number) => (1 / 4) * x ** 4,
    answerTex: '\\frac{1}{4}(x^4)',
  },
  {
    id: '2x',
    tex: 'f(x) = 2x',
    f: (x: number) => 2 * x,
    primitive: (x: number) => x ** 2,
    answerTex: 'x^2',
  },
  {
    id: 'x+1',
    tex: 'f(x) = x + 1',
    f: (x: number) => x + 1,
    primitive: (x: number) => 0.5 * x ** 2 + x,
    answerTex: '\\frac{1}{2}x^2 + x',
  }
];

function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

const a = -5;
const b = -3;

export default function AireSousCourbe() {
  const [func] = useState(pickRandom(functions));
  const [showCorrection, setShowCorrection] = useState(false);

  const aire = Math.abs(func.primitive(b) - func.primitive(a));

  return (
    <div className="box content">
      <h2 className="title is-4">Aire sous une courbe</h2>
      <p>Soit la fonction définie par <MathTex tex={func.tex} />.</p>
      <p>On note <strong>A</strong> l’aire, en unités d’aire, de la région comprise entre la courbe de <MathTex tex="f" /> et l’axe des abscisses, entre <MathTex tex="x = -5" /> et <MathTex tex="x = -3" />.</p>

      <button className="button is-primary mt-4" onClick={() => setShowCorrection(true)}>
        Voir la correction
      </button>

      {showCorrection && (
        <div className="mt-5">
          <h3 className="title is-5">Correction</h3>
          <p>On utilise la formule : <MathTex tex="A = \int_{-5}^{-3} f(x) dx" /></p>
          <p>On connaît une primitive de <MathTex tex={func.tex} /> :</p>
          <p><MathTex tex={`F(x) = ${func.answerTex}`} /></p>
          <p>Donc :</p>
          <MathTex tex={`A = \\left[ F(x) \\right]_{-5}^{-3} = F(-3) - F(-5)`} />
          <p><strong>Aire ≈ {aire.toFixed(2)} unités d’aire</strong></p>
        </div>
      )}
    </div>
  );
}
