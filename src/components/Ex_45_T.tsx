import { useState } from 'react';
import MathTex from './MathTex.tsx';
import { Cadre, Chargement, Enonce, Titre, useTirage } from './ExerciceUI.tsx';
import Questions, { type Question } from './Questions.tsx';
import { choisir, entier, fraction, type Fraction } from '../lib/maths.ts';
import { AIDE_FRACTION, attenduFraction, texFrac } from '../lib/reponses.ts';

/**
 * Exercice : somme des résultats de n dés équilibrés à N faces.
 *
 *   E(Xᵢ) = (N + 1)/2          E(X) = n·(N + 1)/2
 *   V(Xᵢ) = (N² − 1)/12 (admis)        V(X) = n·(N² − 1)/12   (dés indépendants)
 */

/* ===== Logique ===== */

export type Exercice = { n: number; N: number };

export function genererExercice(): Exercice {
  return { n: entier(2, 5), N: choisir([4, 6, 8, 10, 12, 20]) };
}

export const espUnDe = ({ N }: Exercice): Fraction => fraction(N + 1, 2);
export const espSomme = ({ n, N }: Exercice): Fraction => fraction(n * (N + 1), 2);
export const varUnDe = ({ N }: Exercice): Fraction => fraction(N * N - 1, 12);
export const varSomme = ({ n, N }: Exercice): Fraction => fraction(n * (N * N - 1), 12);

export const questions = (exo: Exercice): Question[] => {
  const a = attenduFraction(espUnDe(exo));
  const b = attenduFraction(espSomme(exo));
  const c = attenduFraction(varSomme(exo));
  return [
    { type: 'nombre', id: 'e1', libelle: <><MathTex tex="E(X_i)" /> pour un seul dé =</>, attendu: a.attendu, tolerance: a.tolerance, placeholder: 'Ex : 3,5', aide: AIDE_FRACTION },
    { type: 'nombre', id: 'e', libelle: <><MathTex tex="E(X)" /> =</>, attendu: b.attendu, tolerance: b.tolerance, placeholder: 'Ex : 10,5', aide: AIDE_FRACTION },
    { type: 'nombre', id: 'v', libelle: <><MathTex tex="V(X)" /> =</>, attendu: c.attendu, tolerance: c.tolerance, placeholder: 'Ex : 35/6', aide: AIDE_FRACTION },
  ];
};

/* ===== Affichage ===== */

export default function SommeDes() {
  const [exo, regenerer] = useTirage(genererExercice);
  const [essai, setEssai] = useState(0);
  if (!exo) return <Chargement />;

  const { n, N } = exo;
  const E1 = espUnDe(exo);
  const E = espSomme(exo);
  const V1 = varUnDe(exo);
  const V = varSomme(exo);

  return (
    <Cadre>
      <Titre />
      <Enonce>
        <p>
          On lance <strong>{n}</strong> dés équilibrés à <strong>{N}</strong> faces numérotées de 1 à {N}. On note <MathTex tex="X_i" /> le résultat du i-ème dé et{' '}
          <MathTex tex={`X = X_1 + \\dots + X_{${n}}`} /> la somme obtenue. Les lancers sont indépendants.
        </p>
        <p>
          On admet que, pour un dé à {N} faces, <MathTex tex={`V(X_i) = \\frac{${N}^{2} - 1}{12} = ${texFrac(V1)}`} />.
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
            <MathTex tex={`E(X) = ${texFrac(E)}`} /> : en répétant l’expérience un grand nombre de fois, la moyenne des sommes obtenues se rapproche de cette valeur.
          </p>
        }
        correction={
          <>
            <li>
              Chaque <MathTex tex="X_i" /> suit la loi uniforme sur <MathTex tex={`\\{1\\,;\\,2\\,;\\,\\dots\\,;\\,${N}\\}`} /> :{' '}
              <MathTex tex={`E(X_i) = \\frac{1 + 2 + \\dots + ${N}}{${N}} = \\frac{${N} + 1}{2} = ${texFrac(E1)}`} />.
            </li>
            <li>
              Par linéarité de l’espérance : <MathTex tex={`E(X) = ${n} \\times ${texFrac(E1)} = ${texFrac(E)}`} />.
            </li>
            <li>
              Les dés sont indépendants, donc les variances s’additionnent : <MathTex tex={`V(X) = ${n} \\times V(X_i) = ${n} \\times ${texFrac(V1)} = ${texFrac(V)}`} />.
            </li>
          </>
        }
        conseils={
          <>
            <li>
              L’espérance d’un dé est la moyenne de ses faces, <MathTex tex="\frac{N+1}{2}" />, pas <MathTex tex="\frac{N}{2}" />.
            </li>
            <li>
              Pour la somme, multiplie l’espérance d’un dé par le nombre de dés. Pour la variance, additionne aussi les variances (c’est possible car les dés sont indépendants).
            </li>
            <li>Une somme de n dés varie entre n et nN : l’espérance doit être entre ces deux valeurs.</li>
          </>
        }
      />
    </Cadre>
  );
}
