import { useState } from 'react';
import { Cadre, Chargement, Enonce, MathTex, Questions, Titre, entier, melanger, nombre, permuter, texSomme, useTirage, type Question } from './_commun.ts';

/**
 * Exercice : norme « perturbée » sur C([0,1], ℝ).
 *
 *   N(f) = ‖f‖∞ + p |f(0)| + q |f(1)|        (p, q entiers ≥ 1)
 *
 *   ‖f‖∞ ≤ N(f) ≤ (1 + p + q) ‖f‖∞ ; la minoration est une égalité si f(0) = f(1) = 0,
 *   la majoration est une égalité pour f = 1.
 */

/* ===== Logique ===== */

/** f₀(t) = α t + β */
export type Exercice = { p: number; q: number; alpha: number; beta: number; ordre: number[] };

export const supAffine = ({ alpha, beta }: Exercice) => Math.max(Math.abs(beta), Math.abs(alpha + beta));
export const valeurN = (e: Exercice) => supAffine(e) + e.p * Math.abs(e.beta) + e.q * Math.abs(e.alpha + e.beta);
export const constanteMajoration = ({ p, q }: Exercice) => 1 + p + q;
export const constanteMinoration = () => 1;

export function genererExercice(): Exercice {
  const p = entier(1, 5);
  const q = entier(1, 5);
  for (;;) {
    const alpha = entier(-5, 5);
    const beta = entier(-5, 5);
    if (alpha !== 0 && beta !== 0) return { p, q, alpha, beta, ordre: melanger([0, 1, 2, 3]) };
  }
}

export const questions = (exo: Exercice): Question[] => {
  const { p, q } = exo;
  return [
    { type: 'nombre', id: 'N', libelle: <>Calcule <MathTex tex="N(f_0)" />.</>, attendu: valeurN(exo), placeholder: 'Ex : 15', aide: 'Un entier.' },
    {
      type: 'nombre', id: 'C', libelle: <>Plus petite constante <MathTex tex="C" /> telle que <MathTex tex="N(f)\le C\,\lVert f\rVert_\infty" /> pour toute <MathTex tex="f\in E" /> :</>,
      attendu: constanteMajoration(exo), placeholder: 'Ex : 8', aide: 'Un entier.',
    },
    {
      type: 'choix', id: 'c',
      libelle: <>Plus grande constante <MathTex tex="c>0" /> telle que <MathTex tex="c\,\lVert f\rVert_\infty\le N(f)" /> pour toute <MathTex tex="f\in E" /> :</>,
      attendu: 'un',
      options: permuter([
        { valeur: 'un', contenu: <MathTex tex="c=1" /> },
        { valeur: 'inv', contenu: <MathTex tex={`c=\\dfrac1{${1 + p + q}}`} /> },
        { valeur: 'pq', contenu: <MathTex tex={`c=${p + q}`} /> },
        { valeur: 'zero', contenu: <>aucune : <MathTex tex="\lVert\cdot\rVert_\infty" /> et <MathTex tex="N" /> ne sont pas équivalentes</> },
      ], exo.ordre),
      enLigne: false,
    },
  ];
};

/* ===== Affichage ===== */

export default function NormePerturbee() {
  const [exo, regenerer] = useTirage(genererExercice);
  const [essai, setEssai] = useState(0);
  if (!exo) return <Chargement />;

  const { p, q, alpha, beta } = exo;
  const f0 = texSomme([[alpha, 't'], [beta, '']]);
  const f1 = alpha + beta;
  const sup = supAffine(exo);

  return (
    <Cadre>
      <Titre />
      <Enonce>
        <p>
          Soit <MathTex tex="E=\mathcal C([0,1],\mathbb R)" /> muni de la norme <MathTex tex="\lVert f\rVert_\infty=\sup_{t\in[0,1]}\lvert f(t)\rvert" />. Pour <MathTex tex="f\in E" />, on pose :
        </p>
        <p style={{ textAlign: 'center' }}>
          <MathTex tex={`N(f)=\\lVert f\\rVert_\\infty+${p}\\,\\lvert f(0)\\rvert+${q}\\,\\lvert f(1)\\rvert`} />
        </p>
        <p>
          On admet que <MathTex tex="N" /> est une norme sur <MathTex tex="E" />. On considère <MathTex tex={`f_0(t)=${f0}`} />.
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
            <MathTex tex={`N(f_0)=${valeurN(exo)}`} />, et <MathTex tex={`\\lVert f\\rVert_\\infty\\le N(f)\\le ${1 + p + q}\\lVert f\\rVert_\\infty`} /> avec des constantes optimales : les deux normes sont équivalentes.
          </p>
        }
        correction={
          <>
            <li>
              <MathTex tex="f_0" /> est affine : <MathTex tex="\lVert f_0\rVert_\infty" /> est atteint en une extrémité. <MathTex tex={`f_0(0)=${nombre(beta)}`} /> et <MathTex tex={`f_0(1)=${nombre(f1)}`} />, donc{' '}
              <MathTex tex={`\\lVert f_0\\rVert_\\infty=\\max(${Math.abs(beta)},${Math.abs(f1)})=${sup}`} />.
            </li>
            <li>
              <MathTex tex={`N(f_0)=${sup}+${p}\\times${Math.abs(beta)}+${q}\\times${Math.abs(f1)}=${valeurN(exo)}`} />.
            </li>
            <li>
              Majoration : <MathTex tex="\lvert f(0)\rvert\le\lVert f\rVert_\infty" /> et <MathTex tex="\lvert f(1)\rvert\le\lVert f\rVert_\infty" />, donc{' '}
              <MathTex tex={`N(f)\\le(1+${p}+${q})\\lVert f\\rVert_\\infty=${1 + p + q}\\lVert f\\rVert_\\infty`} />. Pour la fonction constante <MathTex tex="f=1" /> : <MathTex tex={`N(1)=1+${p}+${q}=${1 + p + q}`} /> et <MathTex tex="\lVert 1\rVert_\infty=1" />, l’égalité a lieu : <MathTex tex={`C=${1 + p + q}`} /> est optimale.
            </li>
            <li>
              Minoration : <MathTex tex="N(f)\ge\lVert f\rVert_\infty" /> car les deux autres termes sont positifs, donc <MathTex tex="c=1" /> convient. C’est la meilleure : pour une fonction « tente » avec <MathTex tex="f(0)=f(1)=0" /> et <MathTex tex="f(1/2)=1" />, on a <MathTex tex="N(f)=\lVert f\rVert_\infty=1" />, on ne peut donc pas prendre <MathTex tex="c>1" />.
            </li>
          </>
        }
        conseils={
          <>
            <li>Pour des constantes optimales, il faut toujours une fonction qui réalise l’égalité : constante pour la majoration ici, nulle aux bords pour la minoration.</li>
            <li>Ne confonds pas « constante qui marche » et « meilleure constante » : <MathTex tex="c=1/(1+p+q)" /> convient aussi, mais n’est pas la plus grande.</li>
            <li>Dès qu’on a <MathTex tex="c\,N_1\le N_2\le C\,N_1" /> avec <MathTex tex="c>0" />, les normes sont équivalentes.</li>
          </>
        }
      />
    </Cadre>
  );
}
