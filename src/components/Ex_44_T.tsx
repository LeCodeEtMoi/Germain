import { useState } from 'react';
import MathTex from './MathTex.tsx';
import { Cadre, Chargement, Donnees, Enonce, Titre, useTirage } from './ExerciceUI.tsx';
import Questions, { type Question } from './Questions.tsx';
import { choisir, entier, fraction, type Fraction } from '../lib/maths.ts';
import { AIDE_FRACTION, attenduFraction } from '../lib/reponses.ts';

/**
 * Exercice : loi des grands nombres (version Bienaymé-Tchebychev).
 *
 * X₁, …, Xₙ indépendantes, de même loi, E(Xᵢ) = m, V(Xᵢ) = v ; Mₙ = (X₁ + … + Xₙ)/n.
 *   V(Mₙ) = v/n
 *   P(|Mₙ − m| ≥ ε) ≤ v/(n·ε²)
 *   v/(n·ε²) ≤ 1/K  ⇔  n ≥ K·v/ε²      (plus petit entier n)
 *
 * n ∈ {50, 100, 200, 400} et ε ∈ {0,5 ; 1 ; 2} : toutes les réponses sont des décimaux exacts ou des entiers.
 */

/* ===== Logique ===== */

export type Exercice = { m: number; v: number; n: number; eps: 0.5 | 1 | 2; K: number };

export function genererExercice(): Exercice {
  return {
    m: entier(1, 20),
    v: entier(1, 9),
    n: choisir([50, 100, 200, 400]),
    eps: choisir([0.5, 1, 2] as const),
    K: choisir([10, 20, 100]),
  };
}

/** ε² sous forme de fraction : 1/4, 1 ou 4. */
const epsCarre = (eps: Exercice['eps']): Fraction => (eps === 0.5 ? fraction(1, 4) : eps === 1 ? fraction(1, 1) : fraction(4, 1));

export const varianceMoyenne = ({ v, n }: Exercice): Fraction => fraction(v, n);
export const majorant = ({ v, n, eps }: Exercice): Fraction => {
  const e = epsCarre(eps);
  return fraction(v * e.d, n * e.n);
};
/** Plus petit entier n tel que v/(n ε²) ≤ 1/K, c'est-à-dire n ≥ K·v/ε². */
export const nMinimal = ({ v, K, eps }: Exercice): number => {
  const e = epsCarre(eps);
  return Math.ceil((K * v * e.d) / e.n);
};
export const dec = (f: Fraction) => String(Number((f.n / f.d).toFixed(6))).replace('.', '{,}');
export const pourcent = (K: number) => `${100 / K}`.replace('.', ',');

export const questions = (exo: Exercice): Question[] => {
  const V = attenduFraction(varianceMoyenne(exo));
  const M = attenduFraction(majorant(exo));
  return [
    { type: 'nombre', id: 'V', libelle: <><MathTex tex={`V(M_{${exo.n}})`} /> =</>, attendu: V.attendu, tolerance: V.tolerance, placeholder: 'Ex : 0,04', aide: AIDE_FRACTION },
    {
      type: 'nombre', id: 'bound',
      libelle: <>Majorant de <MathTex tex={`P(|M_{${exo.n}} - ${exo.m}| \\ge ${String(exo.eps).replace('.', '{,}')})`} /> donné par l’inégalité de Bienaymé-Tchebychev :</>,
      attendu: M.attendu, tolerance: M.tolerance, placeholder: 'Ex : 0,16', aide: AIDE_FRACTION,
    },
    {
      type: 'nombre', id: 'n',
      libelle: <>Plus petit entier n garantissant que ce majorant soit inférieur ou égal à {pourcent(exo.K)} % :</>,
      attendu: nMinimal(exo), placeholder: 'Ex : 250', aide: 'Un entier.',
    },
  ];
};

/* ===== Affichage ===== */

export default function LoiGrandsNombres() {
  const [exo, regenerer] = useTirage(genererExercice);
  const [essai, setEssai] = useState(0);
  if (!exo) return <Chargement />;

  const { m, v, n, eps, K } = exo;
  const epsTex = String(eps).replace('.', '{,}');
  const e2 = epsCarre(eps);
  const e2Tex = eps === 0.5 ? '0{,}25' : String(e2.n);
  const Vn = varianceMoyenne(exo);
  const bound = majorant(exo);
  const nmin = nMinimal(exo);

  return (
    <Cadre>
      <Titre />
      <Enonce>
        <p>
          Soient <MathTex tex="X_1, X_2, \dots, X_n" /> des variables aléatoires indépendantes, de même loi, d’espérance <MathTex tex="m" /> et de variance{' '}
          <MathTex tex="v" />. On note <MathTex tex="M_n = \frac{X_1 + X_2 + \dots + X_n}{n}" /> leur moyenne.
        </p>
      </Enonce>
      <Donnees
        elements={[
          ['Espérance', <MathTex key="m" tex={`m = ${m}`} />],
          ['Variance', <MathTex key="v" tex={`v = ${v}`} />],
          ['Taille', <MathTex key="n" tex={`n = ${n}`} />],
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
            <MathTex tex={`V(M_{${n}}) = ${dec(Vn)}`} />, majorant <MathTex tex={`${dec(bound)}`} /> et n = {nmin}. Plus n est grand, plus la moyenne se concentre autour de m.
          </p>
        }
        correction={
          <>
            <li>
              Les variables sont indépendantes, donc <MathTex tex="V(X_1 + \dots + X_n) = n\,v" />. Comme <MathTex tex="M_n = \frac{1}{n}(X_1 + \dots + X_n)" />,{' '}
              <MathTex tex={`V(M_n) = \\frac{1}{n^{2}} \\times n\\,v = \\frac{v}{n} = \\frac{${v}}{${n}} = ${dec(Vn)}`} />. (Et <MathTex tex={`E(M_n) = m = ${m}`} />.)
            </li>
            <li>
              Inégalité de Bienaymé-Tchebychev appliquée à <MathTex tex="M_n" /> :{' '}
              <MathTex tex={`P(|M_n - m| \\ge \\varepsilon) \\le \\frac{V(M_n)}{\\varepsilon^{2}} = \\frac{${dec(Vn)}}{${epsTex}^{2}} = \\frac{${dec(Vn)}}{${e2Tex}} = ${dec(bound)}`} />.
            </li>
            <li>
              On veut <MathTex tex={`\\frac{v}{n\\,\\varepsilon^{2}} \\le \\frac{1}{${K}}`} />, soit <MathTex tex={`n \\ge \\frac{${K} \\times ${v}}{${e2Tex}} = ${String((K * v * e2.d) / e2.n).replace('.', '{,}')}`} />. Le plus petit entier convenable est <strong>{nmin}</strong>.
            </li>
          </>
        }
        conseils={
          <>
            <li>
              <MathTex tex="V(M_n) = \frac{v}{n}" /> (et non <MathTex tex="\frac{v}{\sqrt{n}}" /> ni <MathTex tex="v" />) : la variance de la moyenne diminue quand n augmente.
            </li>
            <li>
              Dans l’inégalité, ε est élevé au carré. Ici <MathTex tex={`\\varepsilon = ${epsTex}`} />, donc <MathTex tex={`\\varepsilon^{2} = ${e2Tex}`} />.
            </li>
            <li>
              Pour trouver n, résous l’inégalité en isolant n, puis prends le plus petit <em>entier</em> qui convient (arrondi vers le haut si le résultat n’est pas entier).
            </li>
          </>
        }
      />
    </Cadre>
  );
}
