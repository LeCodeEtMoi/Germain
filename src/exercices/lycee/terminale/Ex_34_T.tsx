import { useState } from 'react';
import MathTex from '@/components/math/MathTex.tsx';
import { Cadre, Chargement, Enonce, Titre, useTirage } from '@/components/exercice/ExerciceUI.tsx';
import Questions, { apercuExpression, type Question } from '@/components/exercice/Questions.tsx';
import { combinaison, entier, fraction, signeAleatoire, type Fraction } from '@/lib/maths.ts';
import { verifieResidu, type ResultatExpression } from '@/lib/reponses.ts';

/**
 * Exercice : résoudre a·y′ = b·y + c  (a, b non nuls).
 *
 *   y′ = (b/a)·y + c/a      solutions : y(x) = C·e^((b/a)x) − c/b
 *
 * Correction : on lit la fonction saisie, on la DÉRIVE, et on vérifie a·y′ = b·y + c pour plusieurs x
 * et plusieurs valeurs de la constante C. La solution générale doit contenir une constante (la lettre C).
 */

/* ===== Logique ===== */

export type Exercice = { a: number; b: number; c: number };

export function genererExercice(): Exercice {
  return { a: entier(1, 4), b: signeAleatoire() * entier(1, 5), c: entier(-6, 6) };
}

const POINTS = [-1.3, -0.4, 0.3, 0.9, 1.7];

export function verifier({ a, b, c }: Exercice, saisie: string): ResultatExpression {
  const texte = saisie.replace(/^\s*y\s*(\(x\))?\s*=/i, '');
  const complet = verifieResidu(texte, 'x', (_x, y, dy) => a * dy - b * y - c, POINTS);
  if (!complet.lecture.ok) return { ok: false, incompris: complet.lecture.message };
  if (complet.verifie) {
    return complet.avecConstante
      ? { ok: true }
      : { ok: false, indice: 'Ta fonction est bien une solution, mais ce n’est qu’une solution particulière : la solution générale contient une constante C.' };
  }
  const homogene = verifieResidu(texte, 'x', (_x, y, dy) => a * dy - b * y, POINTS);
  if (c !== 0 && homogene.verifie) {
    return { ok: false, indice: 'Ta fonction résout l’équation sans le second membre « c », mais pas l’équation complète : il manque une solution particulière.' };
  }
  return { ok: false, indice: 'En remplaçant y et y′ par ta fonction et sa dérivée, l’égalité a·y′ = b·y + c n’est pas vérifiée.' };
}

export const questions = (exo: Exercice): Question[] => [
  {
    type: 'expression',
    id: 'y',
    libelle: 'Solutions de l’équation :  y(x) =',
    placeholder: 'Ex : C*e^(2x) - 3',
    aide: 'Écris la solution générale avec la lettre C : C*e^(2x) + 1/2, C*e^(-x/3)… (fractions avec /, exponentielle avec e^( )).',
    verifier: (s) => verifier(exo, s),
    apercu: (s) => apercuExpression(s, 'y(x)', { retirer: /^\s*y\s*(\(x\))?\s*=/i, constantes: ['c'] }),
  },
];

/* ===== Affichage ===== */

const texFraction = ({ n, d }: Fraction) => (d === 1 ? `${Math.abs(n)}` : `\\frac{${Math.abs(n)}}{${d}}`);
const signeFraction = (f: Fraction) => (f.n < 0 ? '-' : '');
export const expo = (r: Fraction) => `e^{${signeFraction(r)}${r.d === 1 && Math.abs(r.n) === 1 ? '' : texFraction(r)}x}`;

export default function EquationLineaire() {
  const [exo, regenerer] = useTirage(genererExercice);
  const [essai, setEssai] = useState(0);
  if (!exo) return <Chargement />;

  const { a, b, c } = exo;
  const r = fraction(b, a);
  const k = fraction(-c, b);
  const eq = `${a === 1 ? '' : a}y' = ${combinaison([[b, 'y'], [c, '']], true)}`;
  const kTex = k.n === 0 ? '' : ` ${k.n < 0 ? '-' : '+'} ${texFraction(k)}`;
  const solTex = `C${expo(r)}${kTex}`;
  const droite = c === 0 ? `${signeFraction(r)}${texFraction(r)}y` : `${signeFraction(r)}${texFraction(r)}y ${c < 0 ? '-' : '+'} ${texFraction(fraction(c, a))}`;

  return (
    <Cadre>
      <Titre />
      <Enonce>
        <p>Résous sur ℝ l’équation différentielle :</p>
        <div className="exercice-formule">
          <MathTex tex={eq} />
        </div>
        <p>Donne toutes les solutions (avec la constante C).</p>
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
            Les solutions sont les fonctions <MathTex tex={`y(x) = ${solTex}`} />, C réel.
          </p>
        }
        correction={
          <>
            <li>
              On met l’équation sous la forme <MathTex tex="y' = \alpha y + \beta" /> en divisant par {a} : <MathTex tex={`y' = ${droite}`} />.
            </li>
            <li>
              Sans second membre, <MathTex tex={`y' = ${signeFraction(r)}${texFraction(r)}y`} /> a pour solutions <MathTex tex={`y = C${expo(r)}`} />.
            </li>
            <li>
              {c === 0 ? (
                <>Le second membre est nul : il n’y a pas de solution particulière à ajouter.</>
              ) : (
                <>
                  Solution constante <MathTex tex="y = k" /> : alors <MathTex tex="y' = 0" />, donc <MathTex tex={`0 = ${b}k ${c < 0 ? '-' : '+'} ${Math.abs(c)}`} />, d’où{' '}
                  <MathTex tex={`k = ${signeFraction(k)}${texFraction(k)}`} />.
                </>
              )}
            </li>
            <li>
              Solutions générales : <MathTex tex={`y(x) = ${solTex}`} />, avec C réel.
            </li>
          </>
        }
        conseils={
          <>
            <li>
              Ramène toujours l’équation à <MathTex tex="y' = \alpha y + \beta" /> : l’exposant est <MathTex tex="\alpha x" /> avec <MathTex tex="\alpha = \frac{b}{a}" />, pas b.
            </li>
            <li>
              La solution constante vaut <MathTex tex="-\frac{c}{b}" /> : attention au signe.
            </li>
            <li>Vérifie en remplaçant dans l’équation de départ : a·y′ doit être égal à b·y + c.</li>
          </>
        }
      />
    </Cadre>
  );
}
