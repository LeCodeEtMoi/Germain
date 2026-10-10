import { useState } from 'react';
import MathTex from './MathTex.tsx';
import { Cadre, Chargement, Enonce, Titre, useTirage } from './ExerciceUI.tsx';
import Questions, { apercuExpression, type Question } from './Questions.tsx';
import { combinaison, entier } from '../lib/maths.ts';
import { verifierFonction } from '../lib/reponses.ts';

/**
 * Exercice : composées de f(x) = a·x + b et g(x) = c·x² + d.
 *
 *   f∘g(x) = f(g(x)) = a·c·x² + a·d + b
 *   g∘f(x) = g(f(x)) = c(a·x + b)² + d = c·a²·x² + 2abc·x + c·b² + d
 *
 * La saisie est lue par l'analyseur et comparée en plusieurs points : toute écriture équivalente est acceptée
 * (forme développée ou factorisée). Si l'élève donne l'autre composée, on le lui dit.
 */

/* ===== Logique ===== */

export type Exercice = { a: number; b: number; c: number; d: number };

const nonNul = (min: number, max: number) => {
  let n = 0;
  while (n === 0) n = entier(min, max);
  return n;
};

export function genererExercice(): Exercice {
  return { a: entier(1, 4), b: nonNul(-5, 5), c: entier(1, 3), d: nonNul(-5, 5) };
}

const POINTS = [-2.3, -0.7, 0.4, 1.6, 3.1];
const p = (n: number) => `(${n})`;
export const asciiFG = ({ a, b, c, d }: Exercice) => `${a}*(${c}*x^2+${p(d)})+${p(b)}`;
export const asciiGF = ({ a, b, c, d }: Exercice) => `${c}*(${a}*x+${p(b)})^2+${p(d)}`;

/** Coefficients développés. */
export const developpeFG = ({ a, b, c, d }: Exercice) => ({ x2: a * c, x1: 0, x0: a * d + b });
export const developpeGF = ({ a, b, c, d }: Exercice) => ({ x2: c * a * a, x1: 2 * a * b * c, x0: c * b * b + d });
export const poly = (t: { x2: number; x1: number; x0: number }) => combinaison([[t.x2, 'x^{2}'], [t.x1, 'x'], [t.x0, '']], true);

export const questions = (exo: Exercice): Question[] => [
  {
    type: 'expression', id: 'fg', libelle: <><MathTex tex="f \circ g(x) = f(g(x))" /> =</>, placeholder: 'Ex : 6x^2 - 1',
    aide: 'Écris au clavier : 6x^2 + 4x - 3 (la forme factorisée est aussi acceptée).',
    verifier: (s) => verifierFonction(s, asciiFG(exo), 'x', POINTS, {
      alternatives: [{ ascii: asciiGF(exo), indice: 'Tu as calculé g(f(x)) : pour f∘g(x), on remplace x dans f par g(x).' }],
    }),
    apercu: (s) => apercuExpression(s, 'f(g(x))'),
  },
  {
    type: 'expression', id: 'gf', libelle: <><MathTex tex="g \circ f(x) = g(f(x))" /> =</>, placeholder: 'Ex : 4x^2 + 12x + 5',
    aide: 'Pense à développer le carré : (ax + b)² = a²x² + 2abx + b².',
    verifier: (s) => verifierFonction(s, asciiGF(exo), 'x', POINTS, {
      alternatives: [
        { ascii: asciiFG(exo), indice: 'Tu as calculé f(g(x)) : pour g∘f(x), on remplace x dans g par f(x).' },
        { ascii: `${exo.c}*${p(exo.a)}^2*x^2+${p(exo.b * exo.b * exo.c + exo.d)}`, indice: 'Attention : (ax + b)² n’est pas égal à a²x² + b² ; il manque le double produit 2abx.' },
      ],
    }),
    apercu: (s) => apercuExpression(s, 'g(f(x))'),
  },
];

/* ===== Affichage ===== */

export default function FonctionComposee() {
  const [exo, regenerer] = useTirage(genererExercice);
  const [essai, setEssai] = useState(0);
  if (!exo) return <Chargement />;

  const { a, b, c, d } = exo;
  const fTex = combinaison([[a, 'x'], [b, '']], true);
  const gTex = combinaison([[c, 'x^{2}'], [d, '']], true);
  const FG = developpeFG(exo);
  const GF = developpeGF(exo);
  const sg = (n: number) => (n < 0 ? `- ${-n}` : `+ ${n}`);

  return (
    <Cadre>
      <Titre />
      <Enonce>
        <p>On considère les deux fonctions définies sur ℝ par :</p>
        <div className="exercice-formule">
          <MathTex tex={`f(x) = ${fTex} \\qquad g(x) = ${gTex}`} />
        </div>
        <p>Détermine l’expression des deux fonctions composées.</p>
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
            <MathTex tex={`f(g(x)) = ${poly(FG)}`} /> et <MathTex tex={`g(f(x)) = ${poly(GF)}`} />.
          </p>
        }
        correction={
          <>
            <li>
              <MathTex tex="f \circ g(x) = f(g(x))" /> : on remplace x par <MathTex tex={`g(x)`} /> dans f.
              <div className="exercice-formule">
                <MathTex tex={`f(g(x)) = ${a}\\left(${gTex}\\right) ${sg(b)} = ${poly(FG)}`} />
              </div>
            </li>
            <li>
              <MathTex tex="g \circ f(x) = g(f(x))" /> : on remplace x par <MathTex tex="f(x)" /> dans g.
              <div className="exercice-formule">
                <MathTex tex={`g(f(x)) = ${c}\\left(${fTex}\\right)^{2} ${sg(d)}`} />
              </div>
            </li>
            <li>
              On développe le carré avec <MathTex tex="(\alpha x + \beta)^{2} = \alpha^{2}x^{2} + 2\alpha\beta x + \beta^{2}" /> :{' '}
              <MathTex tex={`\\left(${fTex}\\right)^{2} = ${poly({ x2: a * a, x1: 2 * a * b, x0: b * b })}`} />.
            </li>
            <li>
              Puis <MathTex tex={`g(f(x)) = ${poly(GF)}`} />.
            </li>
          </>
        }
        conseils={
          <>
            <li>
              Dans <MathTex tex="f \circ g" />, on applique g d’abord puis f : on écrit f(g(x)). L’ordre change le résultat (<MathTex tex="f \circ g \neq g \circ f" /> en général).
            </li>
            <li>
              Ne développe jamais <MathTex tex="(ax + b)^{2}" /> en <MathTex tex="a^{2}x^{2} + b^{2}" /> : il y a le double produit <MathTex tex="2abx" />.
            </li>
            <li>Mets les coefficients négatifs entre parenthèses quand tu remplaces.</li>
          </>
        }
      />
    </Cadre>
  );
}
