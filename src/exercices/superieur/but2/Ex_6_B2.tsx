import { useState } from 'react';
import { Cadre, Chargement, Enonce, MathTex, Questions, Titre, entier, melanger, permuter, useTirage, type Question } from './_commun.ts';

/**
 * Exercice : suite d'intégrales Jₙ = ∫₁^e xᵐ (ln x)ⁿ dx.
 *
 *   Intégration par parties (u = (ln x)ⁿ, v' = xᵐ) :  (m+1) Jₙ + n Jₙ₋₁ = e^(m+1)       (n ≥ 1)
 *   J₀ = (e^(m+1) − 1)/(m+1).
 *   0 ≤ ln x ≤ 1 sur [1, e] → Jₙ décroît, et  e^(m+1)/(n+m+2) ≤ Jₙ ≤ e^(m+1)/(n+m+1)  →  n Jₙ → e^(m+1).
 */

/* ===== Logique ===== */

export type Exercice = { m: number; N: number; ordre: number[] };

export function genererExercice(): Exercice {
  return { m: entier(1, 3), N: entier(2, 3), ordre: melanger([0, 1, 2, 3]) };
}

export const C = (e: Exercice) => Math.exp(e.m + 1);

/** Jₙ par la relation de récurrence. */
export function J(e: Exercice, n: number): number {
  let j = (C(e) - 1) / (e.m + 1);
  for (let i = 1; i <= n; i++) j = (C(e) - i * j) / (e.m + 1);
  return j;
}

export const questions = (exo: Exercice): Question[] => {
  const { m, N } = exo;
  const E = `e^{${m + 1}}`;
  return [
    {
      type: 'choix', id: 'rec', libelle: <>Quelle relation obtient-on, pour <MathTex tex="n\ge1" />, par intégration par parties ?</>, attendu: 'bonne',
      options: permuter(
        [
          { valeur: 'bonne', contenu: <MathTex tex={`${m + 1}J_n+n\\,J_{n-1}=${E}`} /> },
          { valeur: 'signe', contenu: <MathTex tex={`${m + 1}J_n-n\\,J_{n-1}=${E}`} /> },
          { valeur: 'exp', contenu: <MathTex tex={`${m + 1}J_n+n\\,J_{n-1}=e^{${m}}`} /> },
          { valeur: 'coef', contenu: <MathTex tex={`J_n+n\\,J_{n-1}=${E}`} /> },
        ],
        exo.ordre,
      ),
    },
    {
      type: 'nombre', id: 'j0', libelle: <>Calcule <MathTex tex="J_0" /> (valeur décimale, au centième).</>, attendu: J(exo, 0), tolerance: 0.0051,
      placeholder: 'Ex : 3,19', aide: 'Valeur approchée à 0,01 près.',
    },
    {
      type: 'nombre', id: 'jn', libelle: <>Calcule <MathTex tex={`J_{${N}}`} /> (au centième).</>, attendu: J(exo, N), tolerance: 0.011,
      placeholder: 'Ex : 1,60', aide: 'Valeur approchée à 0,01 près : garde au moins 3 décimales dans tes calculs intermédiaires.',
    },
    {
      type: 'nombre', id: 'lim', libelle: <>Calcule <MathTex tex="\lim_{n\to+\infty} n\,J_n" /> (au centième).</>, attendu: C(exo), tolerance: 0.0051,
      placeholder: 'Ex : 7,39', aide: 'Valeur approchée à 0,01 près.',
    },
  ];
};

/* ===== Affichage ===== */

const dec = (x: number, d = 4) => x.toFixed(d).replace('.', '{,}');

export default function SuiteIntegrales() {
  const [exo, regenerer] = useTirage(genererExercice);
  const [essai, setEssai] = useState(0);
  if (!exo) return <Chargement />;

  const { m, N } = exo;
  const E = `e^{${m + 1}}`;
  const suite = Array.from({ length: N + 1 }, (_, i) => J(exo, i));

  return (
    <Cadre>
      <Titre />
      <Enonce>
        <p>
          Pour tout entier <MathTex tex="n\ge0" />, on pose :
        </p>
        <div className="exercice-formule">
          <MathTex tex={`J_n=\\int_1^{e}x^{${m}}\\,(\\ln x)^n\\,\\mathrm dx`} />
        </div>
      </Enonce>
      <Questions
        key={essai}
        questions={questions(exo)}
        onNouveau={() => {
          regenerer();
          setEssai((x) => x + 1);
        }}
        succes={
          <p>
            <MathTex tex={`J_0=${dec(suite[0])}`} />, <MathTex tex={`J_{${N}}=${dec(suite[N])}`} /> et <MathTex tex={`n\\,J_n\\to ${E}\\approx ${dec(exo ? Math.exp(m + 1) : 0, 2)}`} />.
          </p>
        }
        correction={
          <>
            <li>
              <strong>Calcul de <MathTex tex="J_0" />.</strong> <MathTex tex={`J_0=\\int_1^e x^{${m}}\\,\\mathrm dx=\\dfrac{${E}-1}{${m + 1}}\\approx ${dec(suite[0])}`} />.
            </li>
            <li>
              <strong>Relation de récurrence.</strong> Pour <MathTex tex="n\ge1" />, on pose <MathTex tex="u=(\ln x)^n" /> et <MathTex tex={`v'=x^{${m}}`} />, donc <MathTex tex="u'=\dfrac{n(\ln x)^{n-1}}{x}" /> et <MathTex tex={`v=\\dfrac{x^{${m + 1}}}{${m + 1}}`} />. Alors{' '}
              <MathTex tex={`J_n=\\Big[\\dfrac{x^{${m + 1}}(\\ln x)^n}{${m + 1}}\\Big]_1^e-\\dfrac{n}{${m + 1}}J_{n-1}=\\dfrac{${E}}{${m + 1}}-\\dfrac{n}{${m + 1}}J_{n-1}`} />, soit <MathTex tex={`${m + 1}J_n+nJ_{n-1}=${E}`} />.
            </li>
            <li>
              <strong>Calcul de <MathTex tex={`J_{${N}}`} />.</strong> On enchaîne : {suite.slice(1).map((v, i) => (
                <span key={i}>
                  <MathTex tex={`J_{${i + 1}}=\\dfrac{${E}-${i + 1}J_{${i}}}{${m + 1}}\\approx ${dec(v)}`} />{i + 1 < N ? ', ' : '.'}{' '}
                </span>
              ))}
            </li>
            <li>
              <strong>Limite.</strong> Sur <MathTex tex="[1\,;e]" />, <MathTex tex="0\le\ln x\le1" />, donc <MathTex tex="J_{n+1}\le J_n" />. En combinant avec la relation de récurrence : <MathTex tex={`\\dfrac{${E}}{n+${m + 2}}\\le J_n\\le\\dfrac{${E}}{n+${m + 1}}`} />. En multipliant par <MathTex tex="n" /> et en faisant tendre <MathTex tex="n" /> vers l’infini (théorème des gendarmes) : <MathTex tex={`nJ_n\\to ${E}\\approx ${dec(Math.exp(m + 1), 2)}`} />.
            </li>
          </>
        }
        conseils={
          <>
            <li>Pour une suite d’intégrales, une intégration par parties donne souvent une relation entre <MathTex tex="J_n" /> et <MathTex tex="J_{n-1}" /> : cherche-la avant tout calcul.</li>
            <li>Dans cette relation, le crochet vaut <MathTex tex={`\\frac{e^{${m + 1}}}{${m + 1}}`} /> en <MathTex tex="e" /> et <MathTex tex="0" /> en <MathTex tex="1" /> (car <MathTex tex="\ln 1=0" />) : c’est ce qui fait disparaître la borne inférieure.</li>
            <li>Pour la limite, encadre <MathTex tex="J_n" /> grâce à la monotonie de la suite plutôt que de calculer une valeur générale.</li>
          </>
        }
      />
    </Cadre>
  );
}
