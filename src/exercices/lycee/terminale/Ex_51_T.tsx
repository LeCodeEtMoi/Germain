import { useState } from 'react';
import MathTex from '@/components/math/MathTex.tsx';
import { Cadre, Chargement, Enonce, Titre, useTirage } from '@/components/exercice/ExerciceUI.tsx';
import Questions, { type Question } from '@/components/exercice/Questions.tsx';
import { choisir, entier, fraction, type Fraction } from '@/lib/maths.ts';
import { AIDE_FRACTION, attenduFraction, texFrac } from '@/lib/reponses.ts';

/**
 * Exercice : suite récurrente u_{n+1} = f(u_n) avec f(x) = a·x(1 − x), a = A/2 (A = 3 ou 4), u₀ = k/10.
 *
 *   f(x) = x  ⇔  x = 0 ou x = ℓ = (a − 1)/a = (A − 2)/A
 *   0 < u₀ < ℓ ≤ 1/2 : f est croissante sur [0 ; 1/2], donc [0 ; ℓ] est stable, et f(x) − x = x(a − 1 − ax) ≥ 0 sur [0 ; ℓ]
 *   ⇒ (uₙ) croissante, majorée par ℓ, elle converge vers l'unique point fixe non nul ℓ.
 *
 * (Dans l'énoncé d'origine u₀ = −0,1 sortait de l'intervalle [0 ; 1] et la correction était fausse.)
 */

/* ===== Logique ===== */

export type Exercice = { A: 3 | 4; k: number };

export function genererExercice(): Exercice {
  const A = choisir<3 | 4>([3, 4]);
  return { A, k: entier(1, A === 3 ? 3 : 4) };
}

export const ell = ({ A }: Exercice): Fraction => fraction(A - 2, A);
export const u1 = ({ A, k }: Exercice): Fraction => fraction(A * k * (10 - k), 200);
const aTex = (A: number) => (A === 4 ? '2' : '\\frac{3}{2}');

export const questions = (exo: Exercice): Question[] => {
  const l = attenduFraction(ell(exo));
  const u = attenduFraction(u1(exo));
  return [
    { type: 'nombre', id: 'point', libelle: <>Solution non nulle de l’équation <MathTex tex="f(x) = x" /> :</>, attendu: l.attendu, tolerance: l.tolerance, placeholder: 'Ex : 1/3', aide: AIDE_FRACTION },
    { type: 'nombre', id: 'u1', libelle: <><MathTex tex="u_1" /> =</>, attendu: u.attendu, tolerance: u.tolerance, placeholder: 'Ex : 0,18', aide: AIDE_FRACTION },
    {
      type: 'choix', id: 'sens', libelle: <>La suite <MathTex tex="(u_n)" /> est :</>, attendu: 'croissante', enLigne: true,
      options: [
        { valeur: 'croissante', contenu: 'croissante' },
        { valeur: 'decroissante', contenu: 'décroissante' },
        { valeur: 'aucune', contenu: 'ni croissante ni décroissante' },
      ],
    },
    { type: 'nombre', id: 'limite', libelle: <>Limite de <MathTex tex="(u_n)" /> :</>, attendu: l.attendu, tolerance: l.tolerance, placeholder: 'Ex : 1/3', aide: AIDE_FRACTION },
  ];
};

/* ===== Affichage ===== */

export default function SuiteRecurrente() {
  const [exo, regenerer] = useTirage(genererExercice);
  const [essai, setEssai] = useState(0);
  if (!exo) return <Chargement />;

  const { A, k } = exo;
  const l = ell(exo);
  const v1 = u1(exo);
  const u0 = k / 10;
  const u0Tex = String(u0).replace('.', '{,}');
  const a1 = A - 2; // a − 1 = (A − 2)/2

  return (
    <Cadre>
      <Titre />
      <Enonce>
        <p>
          Soit <MathTex tex="f" /> la fonction définie sur <MathTex tex="[0\,;\,1]" /> par <MathTex tex={`f(x) = ${aTex(A)}\\,x(1 - x)`} />. On définit la suite <MathTex tex="(u_n)" /> par{' '}
          <MathTex tex={`u_0 = ${u0Tex}`} /> et, pour tout entier naturel n, <MathTex tex="u_{n+1} = f(u_n)" />.
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
            La suite est croissante, majorée par <MathTex tex={`${texFrac(l)}`} />, et converge vers <MathTex tex={`\\ell = ${texFrac(l)}`} />.
          </p>
        }
        correction={
          <>
            <li>
              <MathTex tex={`f(x) = x \\iff x\\left(${aTex(A)}(1 - x) - 1\\right) = 0 \\iff x\\left(${a1 === 1 ? '\\frac{1}{2}' : '1'} - ${aTex(A)}x\\right) = 0`} />, donc x = 0 ou{' '}
              <MathTex tex={`x = ${texFrac(l)}`} />. La solution non nulle est <MathTex tex={`\\ell = ${texFrac(l)}`} />.
            </li>
            <li>
              <MathTex tex={`u_1 = f(u_0) = ${aTex(A)} \\times ${u0Tex} \\times (1 - ${u0Tex}) = ${texFrac(v1)}`} />.
            </li>
            <li>
              <MathTex tex="f" /> est croissante sur <MathTex tex="[0\,;\,\frac{1}{2}]" /> (parabole de sommet en <MathTex tex="x = \frac{1}{2}" />) et <MathTex tex={`\\ell = ${texFrac(l)} \\le \\frac{1}{2}`} /> : si{' '}
              <MathTex tex={`0 \\le u_n \\le ${texFrac(l)}`} />, alors <MathTex tex={`0 = f(0) \\le u_{n+1} \\le f(${texFrac(l)}) = ${texFrac(l)}`} />. Tous les termes sont dans <MathTex tex={`[0\\,;\\,${texFrac(l)}]`} />.
            </li>
            <li>
              Pour x dans cet intervalle, <MathTex tex={`f(x) - x = x\\left(${a1 === 1 ? '\\frac{1}{2}' : '1'} - ${aTex(A)}x\\right) \\ge 0`} />, donc <MathTex tex="u_{n+1} \ge u_n" /> : la suite est croissante.
            </li>
            <li>
              Croissante et majorée, elle converge vers une limite qui vérifie <MathTex tex="f(\ell) = \ell" />, donc 0 ou <MathTex tex={`${texFrac(l)}`} />. Comme <MathTex tex={`u_n \\ge u_0 = ${u0Tex} > 0`} />, la limite n’est pas 0 :{' '}
              <MathTex tex={`\\lim u_n = ${texFrac(l)}`} />.
            </li>
          </>
        }
        conseils={
          <>
            <li>Un point fixe se trouve en résolvant f(x) = x, puis en écartant la solution 0 si la suite part au-dessus de 0.</li>
            <li>Pour la monotonie, étudie le signe de f(x) − x sur l’intervalle où se trouvent les termes.</li>
            <li>Une suite croissante et majorée converge ; sa limite est un point fixe de f.</li>
          </>
        }
      />
    </Cadre>
  );
}
