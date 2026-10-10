import { useState } from 'react';
import MathTex from './MathTex.tsx';
import { Cadre, Chargement, Enonce, Titre, useTirage } from './ExerciceUI.tsx';
import Questions, { apercuExpression, type Question } from './Questions.tsx';
import { combinaison, entier, fraction, type Fraction } from '../lib/maths.ts';
import { AIDE_FRACTION, attenduFraction, texFrac, verifierFonction } from '../lib/reponses.ts';

/**
 * Exercice : f(x) = a·x³ + b·x² + c·x + d.
 *
 *   f''(x) = 6a·x + 2b = 0  ⇔  x = −b/(3a)   (point d'inflexion)
 *   a > 0 : concave avant, convexe après.     a < 0 : l'inverse.
 */

/* ===== Logique ===== */

export type Exercice = { a: number; b: number; c: number; d: number };

const nonNul = (min: number, max: number) => {
  let n = 0;
  while (n === 0) n = entier(min, max);
  return n;
};

export function genererExercice(): Exercice {
  return { a: nonNul(-3, 3), b: nonNul(-6, 6), c: entier(-5, 5), d: entier(-5, 5) };
}

export const inflexion = ({ a, b }: Exercice): Fraction => fraction(-b, 3 * a);
export const asciiSeconde = ({ a, b }: Exercice) => `${6 * a}*x+(${2 * b})`;
export const asciiPremiere = ({ a, b, c }: Exercice) => `${3 * a}*x^2+(${2 * b})*x+(${c})`;
export const convexeApres = ({ a }: Exercice) => a > 0;

const POINTS = [-2.3, -0.7, 0.4, 1.6, 3.1];

export const questions = (exo: Exercice): Question[] => {
  const xi = attenduFraction(inflexion(exo));
  return [
    {
      type: 'expression', id: 'seconde', libelle: <><MathTex tex="f''(x)" /> =</>, placeholder: 'Ex : 12x - 4',
      aide: 'Dérive deux fois. Écris au clavier : 12x - 4.',
      verifier: (s) => verifierFonction(s, asciiSeconde(exo), 'x', POINTS, {
        retirer: /^\s*f\s*(''|"|′′)\s*\(\s*x\s*\)\s*=/,
        alternatives: [{ ascii: asciiPremiere(exo), indice: 'Tu as calculé la dérivée première f\'(x) : il faut dériver une seconde fois.' }],
      }),
      apercu: (s) => apercuExpression(s, "f''(x)", { retirer: /^\s*f\s*(''|"|′′)\s*\(\s*x\s*\)\s*=/ }),
    },
    {
      type: 'nombre', id: 'inflexion', libelle: <>Valeur de x pour laquelle <MathTex tex="f''(x) = 0" /> :</>, attendu: xi.attendu, tolerance: xi.tolerance, placeholder: 'Ex : 1/3', aide: AIDE_FRACTION,
    },
    {
      type: 'choix', id: 'convexe', libelle: <>La fonction f est convexe sur :</>, attendu: convexeApres(exo) ? 'apres' : 'avant',
      options: [
        { valeur: 'avant', contenu: <MathTex tex={`]-\\infty\\,;\\,${texFrac(inflexion(exo))}]`} /> },
        { valeur: 'apres', contenu: <MathTex tex={`[${texFrac(inflexion(exo))}\\,;\\,+\\infty[`} /> },
        { valeur: 'tout', contenu: <MathTex tex="\mathbb{R}" /> },
      ],
    },
  ];
};

/* ===== Affichage ===== */

export default function ConvexiteSeconde() {
  const [exo, regenerer] = useTirage(genererExercice);
  const [essai, setEssai] = useState(0);
  if (!exo) return <Chargement />;

  const { a, b, c, d } = exo;
  const xi = inflexion(exo);
  const fTex = combinaison([[a, 'x^{3}'], [b, 'x^{2}'], [c, 'x'], [d, '']], true);
  const f1 = combinaison([[3 * a, 'x^{2}'], [2 * b, 'x'], [c, '']], true);
  const f2 = combinaison([[6 * a, 'x'], [2 * b, '']], true);
  const apres = convexeApres(exo);
  const x = texFrac(xi);

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
        <p>Étudie la convexité de f à l’aide de sa dérivée seconde.</p>
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
            <MathTex tex={`f''(x) = ${f2}`} /> s’annule en <MathTex tex={`x = ${x}`} />, point d’inflexion : f est {apres ? 'concave' : 'convexe'} avant et {apres ? 'convexe' : 'concave'} après.
          </p>
        }
        correction={
          <>
            <li>
              On dérive une première fois : <MathTex tex={`f'(x) = ${f1}`} />.
            </li>
            <li>
              Puis une seconde fois : <MathTex tex={`f''(x) = ${f2}`} />.
            </li>
            <li>
              <MathTex tex={`f''(x) = 0 \\iff ${f2} = 0 \\iff x = ${x}`} />.
            </li>
            <li>
              <MathTex tex="f''" /> est une fonction affine de coefficient directeur <MathTex tex={`${6 * a}`} />, qui est {apres ? 'positif' : 'négatif'} : <MathTex tex="f''" /> est {apres ? 'négative' : 'positive'} avant{' '}
              <MathTex tex={`${x}`} /> et {apres ? 'positive' : 'négative'} après.
            </li>
            <li>
              Donc f est {apres ? 'concave' : 'convexe'} sur <MathTex tex={`]-\\infty\\,;\\,${x}]`} /> et <strong>{apres ? 'convexe' : 'concave'}</strong> sur <MathTex tex={`[${x}\\,;\\,+\\infty[`} />.
              Comme <MathTex tex="f''" /> change de signe en <MathTex tex={`${x}`} />, c’est l’abscisse d’un point d’inflexion.
            </li>
          </>
        }
        conseils={
          <>
            <li>Dérive deux fois : <MathTex tex="(ax^3)'' = 6ax" /> et <MathTex tex="(bx^2)'' = 2b" />. Les termes de degré 1 et 0 disparaissent à la seconde dérivation.</li>
            <li>Le signe de <MathTex tex="f''" /> se lit comme celui d’une fonction affine : fais attention au signe du coefficient de x.</li>
            <li>Convexe ⇔ <MathTex tex="f'' \ge 0" /> ; concave ⇔ <MathTex tex="f'' \le 0" />.</li>
          </>
        }
      />
    </Cadre>
  );
}
