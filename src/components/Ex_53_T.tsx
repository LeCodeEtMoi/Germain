import React, { useState } from 'react';
import  MathTex  from '@/components/MathTex';

const ExerciceFonctionComposee = () => {
  const [showCorrection, setShowCorrection] = useState(false);

  // Génération aléatoire des coefficients
  const a = Math.floor(Math.random() * 4 + 1); // 1 à 4
  const b = Math.floor(Math.random() * 10 - 5); // -5 à 4
  const c = Math.floor(Math.random() * 3 + 1); // 1 à 3
  const d = Math.floor(Math.random() * 10 - 5); // -5 à 4

  // Fonctions
  const f = (x: number) => a * x + b;
  const g = (x: number) => c * x * x + d;

  // Composition
  const fComposeG = (x: number) => f(g(x));
  const gComposeF = (x: number) => g(f(x));

  return (
    <div className="box my-5">
      <h2 className="title is-4">Calcul d'une fonction composée</h2>

      <p>On considère deux fonctions définies par :</p>
      <ul>
        <li><MathTex tex={`f(x) = ${a}x ${b >= 0 ? '+ ' + b : '- ' + Math.abs(b)}`} /></li>
        <li><MathTex tex={`g(x) = ${c}x^2 ${d >= 0 ? '+ ' + d : '- ' + Math.abs(d)}`} /></li>
      </ul>

      <ol className="mt-3">
        <li>
          1. Calculer l'expression de <MathTex tex="f \circ g(x)" />, c’est-à-dire <MathTex tex="f(g(x))" />.
        </li>
        <li className="mt-2">
          2. Calculer l'expression de <MathTex tex="g \circ f(x)" />, c’est-à-dire <MathTex tex="g(f(x))" />.
        </li>
      </ol>

      <button className="button is-link mt-4" onClick={() => setShowCorrection(!showCorrection)}>
        {showCorrection ? 'Masquer la correction' : 'Afficher la correction'}
      </button>

      {showCorrection && (
        <div className="content mt-4">
          <h3 className="title is-5">Correction</h3>

          <p><strong>1. Calcul de <MathTex tex="f(g(x))" /></strong></p>
          <p>
            On remplace <MathTex tex="x" /> par <MathTex tex={`g(x) = ${c}x^2 ${d >= 0 ? '+ ' + d : '- ' + Math.abs(d)}`} /> dans <MathTex tex={`f(x) = ${a}x ${b >= 0 ? '+ ' + b : '- ' + Math.abs(b)}`} /> :
          </p>
          <MathTex tex={`f(g(x)) = ${a}(${c}x^2 ${d >= 0 ? '+ ' + d : '- ' + Math.abs(d)}) ${b >= 0 ? '+ ' + b : '- ' + Math.abs(b)}`} />
          <MathTex tex={`= ${a * c}x^2 ${a * d + b >= 0 ? '+ ' + (a * d + b) : '- ' + Math.abs(a * d + b)}`} />

          <p><strong>2. Calcul de <MathTex tex="g(f(x))" /></strong></p>
          <p>
            On remplace <MathTex tex="x" /> par <MathTex tex={`f(x) = ${a}x ${b >= 0 ? '+ ' + b : '- ' + Math.abs(b)}`} /> dans <MathTex tex={`g(x) = ${c}x^2 ${d >= 0 ? '+ ' + d : '- ' + Math.abs(d)}`} /> :
          </p>
          <MathTex tex={`g(f(x)) = ${c}(${a}x ${b >= 0 ? '+ ' + b : '- ' + Math.abs(b)})^2 ${d >= 0 ? '+ ' + d : '- ' + Math.abs(d)}`} />
          <MathTex tex={`= ${c}(${a*a}x^2 ${2*a*b >= 0 ? '+ ' + 2*a*b : '- ' + Math.abs(2*a*b)}x ${b*b >= 0 ? '+ ' + b*b : '- ' + Math.abs(b*b)}) ${d >= 0 ? '+ ' + d : '- ' + Math.abs(d)}`} />
          <MathTex tex={`= ${c*a*a}x^2 ${c*2*a*b >= 0 ? '+ ' + c*2*a*b : '- ' + Math.abs(c*2*a*b)}x ${c*b*b + d >= 0 ? '+ ' + (c*b*b + d) : '- ' + Math.abs(c*b*b + d)}`} />
        </div>
      )}
    </div>
  );
};

export default ExerciceFonctionComposee;
