import { useState, type ReactNode } from 'react';
import MathTex from './MathTex.tsx';
import { Cadre, Chargement, Enonce, Titre, useTirage } from './ExerciceUI.tsx';
import Questions, { apercuExpression, type Question } from './Questions.tsx';
import { choisir, entier } from '../lib/maths.ts';
import { verifierPrimitive } from '../lib/reponses.ts';

/**
 * Exercice : trouver une primitive dans trois situations classiques.
 *
 *   A : f(x) = xⁿ + c/x             sur ]0 ; +∞[   →  F(x) = xⁿ⁺¹/(n+1) + c·ln(x)
 *   B : f(x) = c/x²                 sur ]0 ; +∞[   →  F(x) = −c/x
 *   C : f(x) = (2x + p)/(x² + px + q)³  sur ℝ      →  F(x) = −1/(2(x² + px + q)²)   (forme u′/u³, avec x² + px + q > 0)
 *
 * Correction : on DÉRIVE la réponse saisie (dérivation symbolique) et on compare à f en plusieurs points.
 * Toute primitive est acceptée, avec ou sans « + C », sous n'importe quelle écriture équivalente.
 */

/* ===== Logique ===== */

export type Exercice =
  | { famille: 'A'; n: number; c: number }
  | { famille: 'B'; c: number }
  | { famille: 'C'; p: number; q: number };

export function genererExercice(): Exercice {
  const famille = choisir(['A', 'B', 'C'] as const);
  if (famille === 'A') return { famille, n: entier(2, 5), c: entier(1, 6) };
  if (famille === 'B') return { famille, c: entier(1, 6) };
  const p = entier(1, 4);
  // x² + px + q > 0 pour tout x  ⇔  p² − 4q < 0
  const q = Math.floor((p * p) / 4) + entier(1, 3);
  return { famille, p, q };
}

/** f en saisie ASCII. */
export function fAscii(exo: Exercice): string {
  switch (exo.famille) {
    case 'A': return `x^${exo.n} + ${exo.c}/x`;
    case 'B': return `${exo.c}/x^2`;
    case 'C': return `(2*x + ${exo.p})/(x^2 + ${exo.p}*x + ${exo.q})^3`;
  }
}

const POINTS = [0.7, 1.3, 1.9, 2.6, 3.4];

export const questions = (exo: Exercice): Question[] => [
  {
    type: 'expression',
    id: 'F',
    libelle: 'Une primitive F de f :  F(x) =',
    placeholder: 'Ex : x^4/4 + 3ln(x)',
    aide: 'Écris au clavier : x^4/4, 3ln(x), -2/x, 1/(2(x^2+1))… Le « + C » est facultatif.',
    verifier: (s) => verifierPrimitive(fAscii(exo), s, POINTS),
    apercu: (s) => apercuExpression(s, 'F(x)', { retirer: /^\s*F\s*(\(x\))?\s*=/i, constantes: ['c'] }),
  },
];

/* ===== Affichage ===== */

export default function PrimitivesClassiques() {
  const [exo, regenerer] = useTirage(genererExercice);
  const [essai, setEssai] = useState(0);
  if (!exo) return <Chargement />;

  let fTex: string;
  let FTex: string;
  let domaine = ']0 ; +\\infty[';
  let etapes: ReactNode;
  if (exo.famille === 'A') {
    const { n, c } = exo;
    fTex = `x^{${n}} + \\frac{${c}}{x}`;
    FTex = `\\frac{x^{${n + 1}}}{${n + 1}} + ${c === 1 ? '' : c}\\ln(x)`;
    etapes = (
      <>
        <li>On primitive terme à terme.</li>
        <li>
          Une primitive de <MathTex tex={`x^{${n}}`} /> est <MathTex tex={`\\frac{x^{${n + 1}}}{${n + 1}}`} /> (règle <MathTex tex="\frac{x^{n+1}}{n+1}" />).
        </li>
        <li>
          Une primitive de <MathTex tex="\frac{1}{x}" /> est <MathTex tex="\ln(x)" /> sur ]0 ; +∞[, donc une primitive de <MathTex tex={`\\frac{${c}}{x}`} /> est{' '}
          <MathTex tex={`${c === 1 ? '' : c}\\ln(x)`} />.
        </li>
        <li>
          Total : <MathTex tex={`F(x) = ${FTex}`} />.
        </li>
      </>
    );
  } else if (exo.famille === 'B') {
    const { c } = exo;
    fTex = `\\frac{${c}}{x^{2}}`;
    FTex = `-\\frac{${c}}{x}`;
    etapes = (
      <>
        <li>
          On écrit <MathTex tex={`f(x) = ${c}x^{-2}`} />.
        </li>
        <li>
          Avec la règle <MathTex tex="\frac{x^{n+1}}{n+1}" /> pour <MathTex tex="n = -2" /> : une primitive de <MathTex tex="x^{-2}" /> est <MathTex tex="\frac{x^{-1}}{-1} = -\frac{1}{x}" />.
        </li>
        <li>
          Donc <MathTex tex={`F(x) = ${FTex}`} />.
        </li>
      </>
    );
  } else {
    const { p, q } = exo;
    const u = `x^{2} + ${p}x + ${q}`;
    domaine = '\\mathbb{R}';
    fTex = `\\frac{2x + ${p}}{(${u})^{3}}`;
    FTex = `-\\frac{1}{2(${u})^{2}}`;
    etapes = (
      <>
        <li>
          On pose <MathTex tex={`u(x) = ${u}`} />, donc <MathTex tex={`u'(x) = 2x + ${p}`} />. Le dénominateur ne s’annule jamais car <MathTex tex={`${p}^2 - 4 \\times ${q} = ${p * p - 4 * q} < 0`} />.
        </li>
        <li>
          Alors <MathTex tex="f = \frac{u'}{u^{3}} = u' \times u^{-3}" />.
        </li>
        <li>
          Une primitive de <MathTex tex="u' u^{n}" /> est <MathTex tex="\frac{u^{n+1}}{n+1}" /> : ici <MathTex tex="n = -3" />, donc <MathTex tex="\frac{u^{-2}}{-2}" />.
        </li>
        <li>
          Ainsi <MathTex tex={`F(x) = ${FTex}`} />.
        </li>
      </>
    );
  }

  return (
    <Cadre>
      <Titre />
      <Enonce>
        <p>
          Soit <MathTex tex="f" /> la fonction définie sur <MathTex tex={domaine} /> par :
        </p>
        <div className="exercice-formule">
          <MathTex tex={`f(x) = ${fTex}`} />
        </div>
        <p>Détermine une primitive F de f.</p>
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
            En dérivant ta réponse, on retrouve bien f(x). Par exemple, <MathTex tex={`F(x) = ${FTex}`} /> convient.
          </p>
        }
        correction={
          <>
            {etapes}
            <li>
              Vérification : on dérive F et on doit retrouver f. Toute autre primitive s’obtient en ajoutant une constante C.
            </li>
          </>
        }
        conseils={
          <>
            <li>Vérifie toujours en dérivant ta réponse : tu dois retrouver exactement f(x).</li>
            <li>
              Pour <MathTex tex="\frac{1}{x^{2}}" />, écris d’abord <MathTex tex="x^{-2}" /> : la règle des puissances marche pour tout <MathTex tex="n" /> sauf{' '}
              <MathTex tex="n = -1" />, où la primitive est <MathTex tex="\ln(x)" />.
            </li>
            <li>
              Pour une fraction de la forme <MathTex tex="\frac{u'}{u^{n}}" />, repère u et u′ avant de primitiver.
            </li>
          </>
        }
      />
    </Cadre>
  );
}
