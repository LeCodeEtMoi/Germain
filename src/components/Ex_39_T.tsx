import { useState } from 'react';
import MathTex from './MathTex.tsx';
import { Cadre, Chargement, Enonce, Titre, useTirage } from './ExerciceUI.tsx';
import Questions, { type Question } from './Questions.tsx';
import { entier, fraction, signeAleatoire, type Fraction } from '../lib/maths.ts';
import { AIDE_FRACTION, attenduFraction, texFrac } from '../lib/reponses.ts';

/**
 * Exercice : aire entre la courbe de f(x) = c·xⁿ et l'axe des abscisses sur [a ; b].
 *
 * Les bornes sont choisies pour que f ne change pas de signe sur [a ; b] (0 n'est pas à l'intérieur de l'intervalle).
 * Une aire est positive : A = |∫ f| ; l'intégrale est négative quand f est négative.
 */

/* ===== Logique ===== */

export type Exercice = { c: number; n: number; a: number; b: number };

export function genererExercice(): Exercice {
  const c = signeAleatoire() * entier(1, 3);
  const n = entier(1, 3);
  let a: number;
  let b: number;
  if (Math.random() < 0.5) {
    a = entier(0, 3);
    b = a + entier(1, 3);
  } else {
    b = -entier(0, 3);
    a = b - entier(1, 3);
  }
  return { c, n, a, b };
}

/** Intégrale de f sur [a ; b], en fraction exacte. */
export const integrale = ({ c, n, a, b }: Exercice): Fraction => fraction(c * (b ** (n + 1) - a ** (n + 1)), n + 1);
export const aire = (exo: Exercice): Fraction => {
  const i = integrale(exo);
  return fraction(Math.abs(i.n), i.d);
};
/** f est-elle négative sur [a ; b] ? */
export const negative = (exo: Exercice) => exo.c * ((exo.a + exo.b) / 2) ** exo.n < 0;

export const questions = (exo: Exercice): Question[] => {
  const { attendu, tolerance } = attenduFraction(aire(exo));
  return [
    {
      type: 'nombre',
      id: 'A',
      libelle: <>Aire <MathTex tex="\mathcal{A}" /> en unités d’aire :</>,
      attendu,
      tolerance,
      placeholder: 'Ex : 7/3',
      aide: AIDE_FRACTION,
    },
  ];
};

/* ===== Affichage ===== */

export default function AireCourbe() {
  const [exo, regenerer] = useTirage(genererExercice);
  const [essai, setEssai] = useState(0);
  if (!exo) return <Chargement />;

  const { c, n, a, b } = exo;
  const neg = negative(exo);
  const I = integrale(exo);
  const A = aire(exo);
  const fTex = `${c === 1 ? '' : c === -1 ? '-' : c}x${n === 1 ? '' : `^{${n}}`}`;
  const cf = fraction(c, n + 1);
  const coefF = cf.d === 1 && Math.abs(cf.n) === 1 ? (cf.n < 0 ? '-' : '') : texFrac(cf);

  return (
    <Cadre>
      <Titre />
      <Enonce>
        <p>
          Soit <MathTex tex="f" /> la fonction définie sur ℝ par :
        </p>
        <div className="exercice-formule">
          <MathTex tex={`f(x) = ${fTex}`} />
        </div>
        <p>
          On note <MathTex tex="\mathcal{A}" /> l’aire, en unités d’aire, du domaine compris entre la courbe de f, l’axe des abscisses et les droites d’équations{' '}
          <MathTex tex={`x = ${a}`} /> et <MathTex tex={`x = ${b}`} />.
        </p>
      </Enonce>
      <Questions
        key={essai}
        questions={questions(exo)}
        onNouveau={() => {
          regenerer();
          setEssai((e) => e + 1);
        }}
        succes={
          <p>
            <MathTex tex={`\\mathcal{A} = ${neg ? '-' : ''}\\int_{${a}}^{${b}} f(x)\\,dx = ${texFrac(A)}`} /> unités d’aire.
          </p>
        }
        correction={
          <>
            <li>
              Sur <MathTex tex={`[${a}\\,;\\,${b}]`} />, <MathTex tex="f" /> est {neg ? 'négative' : 'positive'} (signe de <MathTex tex={fTex} /> quand x est{' '}
              {a >= 0 && b > 0 ? 'positif' : 'négatif'}).
            </li>
            <li>
              Donc <MathTex tex={`\\mathcal{A} = ${neg ? '-' : ''}\\int_{${a}}^{${b}} f(x)\\,dx`} />.
            </li>
            <li>
              Une primitive de f est <MathTex tex={`F(x) = ${coefF}x^{${n + 1}}`} />, d’où <MathTex tex={`\\int_{${a}}^{${b}} f(x)\\,dx = F(${b}) - F(${a}) = ${texFrac(I)}`} />.
            </li>
            <li>
              {neg ? (
                <>
                  Cette intégrale est négative car f est négative : l’aire est son opposé, <MathTex tex={`\\mathcal{A} = ${texFrac(A)}`} /> unités d’aire.
                </>
              ) : (
                <>
                  L’intégrale est positive, donc <MathTex tex={`\\mathcal{A} = ${texFrac(A)}`} /> unités d’aire.
                </>
              )}
            </li>
          </>
        }
        conseils={
          <>
            <li>
              Une aire est toujours positive : si <MathTex tex="f \le 0" /> sur l’intervalle, l’aire vaut <MathTex tex="-\int f" />.
            </li>
            <li>
              Détermine d’abord le signe de f sur [a ; b] ; ne confonds pas <MathTex tex="x^{3}" /> (négatif pour x négatif) et <MathTex tex="x^{2}" /> (toujours positif).
            </li>
            <li>
              Calcule la primitive avec le bon coefficient : <MathTex tex={`\\int c\\,x^{n}\\,dx = \\frac{c}{n+1}x^{n+1}`} />.
            </li>
            <li>Mets les bornes négatives entre parenthèses quand tu calcules F(a).</li>
          </>
        }
      />
    </Cadre>
  );
}
