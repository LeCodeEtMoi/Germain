import React, { useState } from 'react';
import MathTex from '@/components/MathTex';

const ExerciceFonctionPrix = () => {
  const [showCorrection, setShowCorrection] = useState(false);

  // Seuils de tarification fixes
  const seuil1 = 100;
  const seuil2 = 200;
  const max = 500;

  const f = (x: number): number => {
    if (x <= 100) {
      return 0.5 * x;
    } else if (x <= 200) {
      // Pour assurer la continuité : f(100) = 50, donc f(x) = 50 + a(x - 100)
      return 50 + 0.3 * (x - 100); // pente 0.3
    } else {
      // Pour assurer la continuité : f(200) = 80, donc f(x) = 80 + b(x - 200)
      return 80 + 0.25 * (x - 200); // pente 0.25
    }
  };

  return (
    <div className="box my-5">
      <h2 className="title is-4">Tarifs et continuité d'une fonction par morceaux</h2>

      <p className="mb-3">Un grossiste pratique les tarifs suivants :</p>
      <ul className="mb-4">
        <li>• Pour moins de <MathTex tex="100\ \ell" />, le litre coûte 0,50&nbsp;€.</li>
        <li>• Pour <MathTex tex="100 \leq x < 200" />, le litre coûte 0,40&nbsp;€.</li>
        <li>• Pour <MathTex tex="200 \leq x \leq 500" />, le litre coûte 0,35&nbsp;€.</li>
      </ul>

      <p>On appelle <MathTex tex="x" /> le nombre de litres consommés, et <MathTex tex="f(x)" /> le prix payé en euros.</p>

      <ol className="mt-4">
        <li className="mb-2">
          1. Déterminer l'expression de <MathTex tex="f(x)" /> pour <MathTex tex="x \in [0; 500]" />.
        </li>
        <li className="mb-4">
          2. La fonction <MathTex tex="f" /> est-elle continue sur <MathTex tex="[0; 500]" /> ?
        </li>
      </ol>

      <button
        className="button is-primary"
        onClick={() => setShowCorrection(!showCorrection)}
      >
        {showCorrection ? 'Masquer la correction' : 'Afficher la correction'}
      </button>

      {showCorrection && (
      <div className="content mt-5" style={{ marginBottom: '8rem' }}>
          <h3 className="title is-5">Correction</h3>

          <p><strong>1. Détermination de f(x)</strong></p>
          <ul>
            <li><MathTex tex="x \in [0; 100[" /> : <MathTex tex="f(x) = 0.5x" /></li>
            <li><MathTex tex="x \in [100; 200[" /> : <MathTex tex="f(x) = 0.4x" /></li>
            <li><MathTex tex="x \in [200; 500]" /> : <MathTex tex="f(x) = 0.35x" /></li>
          </ul>

          <p><strong>2. Étude de la continuité</strong></p>
          <p>On étudie la continuité aux points <MathTex tex="x = 100" /> et <MathTex tex="x = 200" /> :</p>

          <p>
            • En <MathTex tex="x = 100" /> :<br />
            Limite à gauche : <MathTex tex="\lim\limits_{x \to 100^-} f(x) = 0.5 \times 100 = 50" /><br />
            Valeur exacte : <MathTex tex="f(100) = 0.4 \times 100 = 40" /><br />
            <strong>⇒ Discontinuité en <MathTex tex="x = 100" /></strong>
          </p>

          <p>
            • En <MathTex tex="x = 200" /> :<br />
            Limite à gauche : <MathTex tex="\lim\limits_{x \to 200^-} f(x) = 0.4 \times 200 = 80" /><br />
            Valeur exacte : <MathTex tex="f(200) = 0.35 \times 200 = 70" /><br />
            <strong>⇒ Discontinuité en <MathTex tex="x = 200" /></strong>
          </p>

          <p>
            <strong>Conclusion :</strong> la fonction <MathTex tex="f" /> n’est pas continue sur <MathTex tex="[0; 500]" /> car elle présente des sauts aux points <MathTex tex="x = 100" /> et <MathTex tex="x = 200" />.
          </p>
        </div>
      )}
    </div>
  );
};

export default ExerciceFonctionPrix;
