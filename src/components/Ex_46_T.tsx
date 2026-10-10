import { useState } from 'react';
import MathTex from './MathTex.tsx';
import { Cadre, Chargement, Enonce, Titre, useTirage } from './ExerciceUI.tsx';
import Questions, { type Question } from './Questions.tsx';
import { combinaison, entier, melanger, signeAleatoire } from '../lib/maths.ts';

/**
 * Exercice : théorème de comparaison pour une suite uₙ = s·a·n + b·sin(n)  (s = ±1, n ∈ ℕ).
 *
 *   s = +1 :  uₙ ≥ a·n − b  et a·n − b → +∞   donc uₙ → +∞
 *   s = −1 :  uₙ ≤ −a·n + b et −a·n + b → −∞  donc uₙ → −∞
 *
 * Question 1 : choisir le bon encadrement (3 mauvaises propositions, toutes fausses pour au moins un n).
 * Question 2 : la limite.
 */

/* ===== Logique ===== */

export type Exercice = { s: 1 | -1; a: number; b: number; ordre: string[] };

export type Proposition = { id: string; relation: '\\ge' | '\\le'; constante: number };

/** Les quatre propositions : 'bonne' est la seule vraie pour tout n ≥ 0. */
export function propositions({ s, b }: Pick<Exercice, 's' | 'b'>): Proposition[] {
  return s === 1
    ? [
        { id: 'bonne', relation: '\\ge', constante: -b },
        { id: 'signe', relation: '\\ge', constante: b },
        { id: 'sens', relation: '\\le', constante: -b },
        { id: 'sans', relation: '\\ge', constante: 0 },
      ]
    : [
        { id: 'bonne', relation: '\\le', constante: b },
        { id: 'signe', relation: '\\le', constante: -b },
        { id: 'sens', relation: '\\ge', constante: b },
        { id: 'sans', relation: '\\le', constante: 0 },
      ];
}

export function genererExercice(): Exercice {
  return { s: signeAleatoire(), a: entier(1, 4), b: entier(1, 5), ordre: melanger(['bonne', 'signe', 'sens', 'sans']) };
}

export const suiteTex = ({ s, a, b }: Pick<Exercice, 's' | 'a' | 'b'>) => `${combinaison([[s * a, 'n']], true)} + ${b === 1 ? '' : b}\\sin(n)`;
export const bornesTex = ({ s, a }: Pick<Exercice, 's' | 'a'>, c: number) => combinaison([[s * a, 'n'], [c, '']], true);

export const questions = (exo: Exercice): Question[] => {
  const props = propositions(exo);
  return [
    {
      type: 'choix',
      id: 'encadrement',
      libelle: <>Parmi ces inégalités, laquelle est vraie pour tout entier naturel n ?</>,
      attendu: 'bonne',
      options: exo.ordre.map((id) => {
        const p = props.find((q) => q.id === id) as Proposition;
        return { valeur: id, contenu: <MathTex tex={`u_n ${p.relation} ${bornesTex(exo, p.constante)}`} /> };
      }),
    },
    {
      type: 'choix',
      id: 'limite',
      libelle: <>Quelle est la limite de <MathTex tex="(u_n)" /> ?</>,
      attendu: exo.s === 1 ? 'plus' : 'moins',
      enLigne: true,
      options: [
        { valeur: 'plus', contenu: <MathTex tex="+\infty" /> },
        { valeur: 'moins', contenu: <MathTex tex="-\infty" /> },
        { valeur: 'zero', contenu: <MathTex tex="0" /> },
        { valeur: 'aucune', contenu: 'la suite n’a pas de limite' },
      ],
    },
  ];
};

/* ===== Affichage ===== */

export default function ThTheoremeComparaison() {
  const [exo, regenerer] = useTirage(genererExercice);
  const [essai, setEssai] = useState(0);
  if (!exo) return <Chargement />;

  const { s, a, b } = exo;
  const bonne = propositions(exo)[0];
  const minore = s === 1;
  const bornee = bornesTex(exo, bonne.constante);
  const sinus = b === 1 ? '\\sin(n)' : `${b}\\sin(n)`;

  return (
    <Cadre>
      <Titre />
      <Enonce>
        <p>
          Soit <MathTex tex="(u_n)" /> la suite définie pour tout entier naturel n par :
        </p>
        <div className="exercice-formule">
          <MathTex tex={`u_n = ${suiteTex(exo)}`} />
        </div>
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
            <MathTex tex={`u_n ${bonne.relation} ${bornee}`} /> et <MathTex tex={`${bornee} \\to ${minore ? '+' : '-'}\\infty`} />, donc{' '}
            <MathTex tex={`\\lim_{n \\to +\\infty} u_n = ${minore ? '+' : '-'}\\infty`} />.
          </p>
        }
        correction={
          <>
            <li>
              Pour tout n, <MathTex tex="-1 \le \sin(n) \le 1" />, donc, en multipliant par {b}, <MathTex tex={`-${b} \\le ${sinus} \\le ${b}`} />.
            </li>
            <li>
              On ajoute <MathTex tex={`${combinaison([[s * a, 'n']], true)}`} /> à chaque membre : {minore ? 'en gardant la partie gauche' : 'en gardant la partie droite'},{' '}
              <MathTex tex={`u_n ${bonne.relation} ${bornee}`} />.
            </li>
            <li>
              On étudie la suite de comparaison <MathTex tex={`v_n = ${bornee}`} /> : <MathTex tex={`v_n \\to ${minore ? '+' : '-'}\\infty`} /> car le coefficient de n est{' '}
              {minore ? 'positif' : 'négatif'}.
            </li>
            <li>
              Théorème de comparaison : {minore ? 'si u_n ≥ v_n à partir d’un certain rang et v_n → +∞, alors u_n → +∞' : 'si u_n ≤ v_n à partir d’un certain rang et v_n → −∞, alors u_n → −∞'}.
              Donc <MathTex tex={`\\lim u_n = ${minore ? '+' : '-'}\\infty`} />.
            </li>
          </>
        }
        conseils={
          <>
            <li>
              Pour minorer (resp. majorer) <MathTex tex="u_n" />, remplace le terme qui oscille par sa plus petite (resp. plus grande) valeur : ici <MathTex tex={`${sinus}`} /> est entre{' '}
              <MathTex tex={`-${b}`} /> et <MathTex tex={`${b}`} />.
            </li>
            <li>
              Si <MathTex tex="u_n \to +\infty" />, on a besoin d’un <em>minorant</em> qui tend vers +∞ ; si <MathTex tex="u_n \to -\infty" />, d’un <em>majorant</em> qui tend vers −∞.
            </li>
            <li>La suite oscillante n’empêche pas d’avoir une limite : le terme dominant ici est le terme en n.</li>
          </>
        }
      />
    </Cadre>
  );
}
