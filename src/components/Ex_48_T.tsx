import { useState } from 'react';
import MathTex from './MathTex.tsx';
import { Cadre, Chargement, Donnees, Enonce, Titre, useTirage } from './ExerciceUI.tsx';
import Questions, { type Question } from './Questions.tsx';
import { entier, fraction, melanger, type Fraction } from '../lib/maths.ts';
import { AIDE_FRACTION, attenduFraction, texFrac } from '../lib/reponses.ts';

/**
 * Exercice : suites adjacentes, moyenne arithmético-géométrique.
 *
 *   u₀ = k·p², v₀ = k·q² (0 < p < q, donc u₀ < v₀ et √(u₀v₀) = k·p·q est entier)
 *   uₙ₊₁ = √(uₙ·vₙ)  (moyenne géométrique)      vₙ₊₁ = (uₙ + vₙ)/2  (moyenne arithmétique)
 *
 *   Pour tout n :  uₙ ≤ vₙ,  (uₙ) croissante,  (vₙ) décroissante : elles convergent vers la même limite.
 *
 * (Dans l'énoncé d'origine les deux formules étaient échangées, ce qui rendait les monotonies fausses.)
 */

/* ===== Logique ===== */

export type Exercice = { k: number; p: number; q: number; ordre: string[] };

const COUPLES: [number, number][] = [[1, 2], [1, 3], [2, 3], [1, 4], [3, 4], [2, 5], [1, 5]];

export function genererExercice(): Exercice {
  const [p, q] = COUPLES[entier(0, COUPLES.length - 1)];
  return { k: entier(1, 3), p, q, ordre: melanger(['bonne', 'inverse', 'croissantes', 'decroissantes']) };
}

export const termes = ({ k, p, q }: Exercice) => ({ u0: k * p * p, v0: k * q * q, u1: k * p * q, v1: fraction(k * (p * p + q * q), 2) as Fraction });

export const questions = (exo: Exercice): Question[] => {
  const t = termes(exo);
  const v1 = attenduFraction(t.v1);
  return [
    { type: 'nombre', id: 'u1', libelle: <><MathTex tex="u_1" /> =</>, attendu: t.u1, placeholder: 'Ex : 6' },
    { type: 'nombre', id: 'v1', libelle: <><MathTex tex="v_1" /> =</>, attendu: v1.attendu, tolerance: v1.tolerance, placeholder: 'Ex : 6,5', aide: AIDE_FRACTION },
    {
      type: 'choix',
      id: 'sens',
      libelle: <>Quelles sont les variations de ces suites (pour tout n) ?</>,
      attendu: 'bonne',
      options: exo.ordre.map((id) => ({
        valeur: id,
        contenu:
          id === 'bonne' ? <><MathTex tex="(u_n)" /> est croissante et <MathTex tex="(v_n)" /> est décroissante</> :
          id === 'inverse' ? <><MathTex tex="(u_n)" /> est décroissante et <MathTex tex="(v_n)" /> est croissante</> :
          id === 'croissantes' ? <>les deux suites sont croissantes</> :
          <>les deux suites sont décroissantes</>,
      })),
    },
  ];
};

/* ===== Affichage ===== */

export default function MoyenneArithmeticoGeometrique() {
  const [exo, regenerer] = useTirage(genererExercice);
  const [essai, setEssai] = useState(0);
  if (!exo) return <Chargement />;

  const t = termes(exo);

  return (
    <Cadre>
      <Titre />
      <Enonce>
        <p>On considère les deux suites définies par :</p>
      </Enonce>
      <Donnees
        elements={[
          ['Départ', <MathTex key="d" tex={`u_0 = ${t.u0} \\quad v_0 = ${t.v0}`} />],
          ['Suite (u)', <MathTex key="r" tex="u_{n+1} = \sqrt{u_n\, v_n}" />],
          ['Suite (v)', <MathTex key="s" tex="v_{n+1} = \frac{u_n + v_n}{2}" />],
        ]}
      />
      <Questions
        key={essai}
        questions={questions(exo)}
        onNouveau={() => {
          regenerer();
          setEssai((e) => e + 1);
        }}
        succes={
          <p>
            <MathTex tex={`u_1 = ${t.u1}`} />, <MathTex tex={`v_1 = ${texFrac(t.v1)}`} />, et ces suites convergent vers une même limite (elles sont adjacentes).
          </p>
        }
        correction={
          <>
            <li>
              <MathTex tex={`u_1 = \\sqrt{u_0 \\, v_0} = \\sqrt{${t.u0} \\times ${t.v0}} = \\sqrt{${t.u0 * t.v0}} = ${t.u1}`} />.
            </li>
            <li>
              <MathTex tex={`v_1 = \\frac{u_0 + v_0}{2} = \\frac{${t.u0} + ${t.v0}}{2} = ${texFrac(t.v1)}`} />.
            </li>
            <li>
              Montrons par récurrence que <MathTex tex="0 < u_n \le v_n" />. C’est vrai pour n = 0 ({t.u0} &lt; {t.v0}). Si c’est vrai au rang n, alors{' '}
              <MathTex tex="v_{n+1} - u_{n+1} = \frac{u_n + v_n}{2} - \sqrt{u_n v_n} = \frac{(\sqrt{v_n} - \sqrt{u_n})^{2}}{2} \ge 0" />.
            </li>
            <li>
              Variations : <MathTex tex="u_{n+1} = \sqrt{u_n v_n} \ge \sqrt{u_n \times u_n} = u_n" /> (car <MathTex tex="v_n \ge u_n" />), donc <MathTex tex="(u_n)" /> est croissante ;{' '}
              <MathTex tex="v_{n+1} = \frac{u_n + v_n}{2} \le \frac{v_n + v_n}{2} = v_n" />, donc <MathTex tex="(v_n)" /> est décroissante.
            </li>
            <li>
              <MathTex tex="(u_n)" /> est croissante et majorée par <MathTex tex={`v_0 = ${t.v0}`} />, <MathTex tex="(v_n)" /> est décroissante et minorée par <MathTex tex={`u_0 = ${t.u0}`} /> : elles convergent
              (théorème de la limite monotone), vers <MathTex tex="\ell" /> et <MathTex tex="\ell'" />.
            </li>
            <li>
              En passant à la limite dans <MathTex tex="v_{n+1} = \frac{u_n + v_n}{2}" /> : <MathTex tex="\ell' = \frac{\ell + \ell'}{2}" />, donc <MathTex tex="\ell = \ell'" />.
            </li>
          </>
        }
        conseils={
          <>
            <li>Applique les formules dans l’ordre donné : u₁ utilise u₀ <em>et</em> v₀ (les deux), de même pour v₁.</li>
            <li>
              La moyenne géométrique <MathTex tex="\sqrt{ab}" /> est toujours plus petite que la moyenne arithmétique <MathTex tex="\frac{a+b}{2}" /> : la suite u (géométrique) reste donc en dessous de v.
            </li>
            <li>Pour les variations, compare chaque terme au précédent en utilisant uₙ ≤ vₙ.</li>
          </>
        }
      />
    </Cadre>
  );
}
