import React, { useState } from 'react';
import MathTex from '@/components/MathTex';

function getRandomElement<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

const possibleA = [5, 10, 20, 50];
const approxLn2 = Math.log(2); // pour le calcul de k

export default function ExoMedicament() {
  const A = getRandomElement(possibleA);
  const exactK = approxLn2 / 3;
  const limitQ = A / exactK;

  const [userStep, setUserStep] = useState(0);
  const [showCorrection, setShowCorrection] = useState(false);

  const next = () => setUserStep((s) => s + 1);

  return (
    <div className="box content">
      <h2 className="title is-4">Modélisation d’un médicament dans le sang</h2>
      <p>
        On injecte un médicament à concentration constante. Sa quantité dans le sang au temps <MathTex tex={'t'} /> est modélisée par la fonction <MathTex tex={'Q(t)'} />, solution de :
      </p>
      <MathTex tex={`Q'(t) = ${A} - k Q(t)`} />
      <p>avec <MathTex tex={'Q(0) = 0'} /> et <MathTex tex={'k > 0'} /> constant.</p>

      <ol className="mt-4">
        <li><strong>Exprimez</strong> <MathTex tex={'Q(t)'} /> en fonction de <MathTex tex={'A'} />, <MathTex tex={'k'} /> et <MathTex tex={'t'} />.</li>
        <li className="mt-2"><strong>Déterminez</strong> <MathTex tex={'\lim_{t \to +\infty} Q(t)'} />. Cette limite dépend-elle de <MathTex tex={'k'} /> ? Interprétez.</li>
        <li className="mt-2">
          Sachant que <MathTex tex={`Q(3) = \dfrac{1}{2} \cdot \dfrac{${A}}{k}`} />, <strong>calculez</strong> la valeur de <MathTex tex={'k'} />.
        </li>
      </ol>

      <div className="buttons mt-4">
        {!showCorrection && (
          <button className="button is-primary" onClick={() => setShowCorrection(true)}>
            Afficher la correction
          </button>
        )}
      </div>

      {showCorrection && (
        <div className="mt-5">
          <h3 className="title is-5">Correction</h3>

          <p><strong>1. Résolution :</strong></p>
          <MathTex tex={`Q(t) = \\frac{${A}}{k} \left(1 - e^{-kt} \right)`} />

          <p className="mt-3"><strong>2. Limite :</strong></p>
          <MathTex tex={`\\lim_{t \to +\infty} Q(t) = \\frac{${A}}{k}`} />
          <p>
            Oui, cette limite dépend de <MathTex tex={'k'} />. Plus <MathTex tex={'k'} /> est grand, plus le médicament est éliminé rapidement,
            donc la quantité stabilisée <em>diminue</em>.
          </p>

          <p className="mt-3"><strong>3. Calcul de k :</strong></p>
          <p>
            On résout : <MathTex tex={`\\frac{${A}}{k} \left(1 - e^{-3k} \right) = \\frac{1}{2} \cdot \\frac{${A}}{k}`} />
          </p>
          <p>
            <MathTex tex={`1 - e^{-3k} = 0.5 \Rightarrow e^{-3k} = 0.5 \Rightarrow k = \\frac{\\ln(2)}{3} \approx ${exactK.toFixed(3)}`} />
          </p>
          <p>
            La limite <MathTex tex={'Q(t)'} /> vaut donc environ <strong>{limitQ.toFixed(2)} mg</strong>.
          </p>
        </div>
      )}
    </div>
  );
}