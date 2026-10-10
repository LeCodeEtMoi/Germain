import { useState } from 'react';
import MathTex from './MathTex.tsx';
import { Cadre, Chargement, Donnees, Enonce, Titre, useTirage } from './ExerciceUI.tsx';
import Questions, { type Question } from './Questions.tsx';
import { entier, fraction, type Fraction } from '../lib/maths.ts';
import { AIDE_FRACTION, attenduFraction, texFrac } from '../lib/reponses.ts';

/**
 * Exercice : inégalité de Bienaymé-Tchebychev.
 *
 *   P(|X − E(X)| ≥ δ) ≤ V(X)/δ²          donc  P(|X − E(X)| < δ) ≥ 1 − V(X)/δ²
 *
 * δ ∈ {2, …, 6} et 1 ≤ V(X) < δ² : le majorant est strictement entre 0 et 1.
 */

/* ===== Logique ===== */

export type Exercice = { mu: number; v: number; delta: number };

export function genererExercice(): Exercice {
  const delta = entier(2, 6);
  return { mu: entier(-5, 10), v: entier(1, delta * delta - 1), delta };
}

export const majorant = ({ v, delta }: Exercice): Fraction => fraction(v, delta * delta);
export const minorant = ({ v, delta }: Exercice): Fraction => fraction(delta * delta - v, delta * delta);

/** « X − μ » écrit proprement : X, X − 3 ou X + 2. */
export const xmoins = (mu: number) => (mu === 0 ? 'X' : mu > 0 ? `X - ${mu}` : `X + ${-mu}`);

export const questions = (exo: Exercice): Question[] => {
  const M = attenduFraction(majorant(exo));
  const m = attenduFraction(minorant(exo));
  return [
    {
      type: 'nombre', id: 'maj', libelle: <>Majorant de <MathTex tex={`P(|${xmoins(exo.mu)}| \\ge ${exo.delta})`} /> donné par l’inégalité :</>,
      attendu: M.attendu, tolerance: M.tolerance, placeholder: 'Ex : 5/9', aide: AIDE_FRACTION,
    },
    {
      type: 'nombre', id: 'min', libelle: <>Minorant de <MathTex tex={`P(|${xmoins(exo.mu)}| < ${exo.delta})`} /> qui en découle :</>,
      attendu: m.attendu, tolerance: m.tolerance, placeholder: 'Ex : 4/9', aide: AIDE_FRACTION,
    },
  ];
};

/* ===== Affichage ===== */

export default function BienaymeTchebychev() {
  const [exo, regenerer] = useTirage(genererExercice);
  const [essai, setEssai] = useState(0);
  if (!exo) return <Chargement />;

  const { mu, v, delta } = exo;
  const M = majorant(exo);
  const m = minorant(exo);

  return (
    <Cadre>
      <Titre />
      <Enonce>
        <p>
          Soit <MathTex tex="X" /> une variable aléatoire d’espérance et de variance connues :
        </p>
      </Enonce>
      <Donnees
        elements={[
          ['Espérance', <MathTex key="e" tex={`E(X) = ${mu}`} />],
          ['Variance', <MathTex key="v" tex={`V(X) = ${v}`} />],
          ['Écart', <MathTex key="d" tex={`\\delta = ${delta}`} />],
        ]}
      />
      <Enonce>
        <p>
          À l’aide de l’inégalité de Bienaymé-Tchebychev, donne un majorant de la probabilité que X s’écarte de son espérance d’au moins δ, puis un minorant de la
          probabilité qu’elle s’en écarte de strictement moins que δ.
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
            <MathTex tex={`P(|${xmoins(mu)}| \\ge ${delta}) \\le ${texFrac(M)}`} /> et <MathTex tex={`P(|${xmoins(mu)}| < ${delta}) \\ge ${texFrac(m)}`} />.
          </p>
        }
        correction={
          <>
            <li>
              Inégalité de Bienaymé-Tchebychev : pour tout réel <MathTex tex="\delta > 0" />, <MathTex tex="P(|X - E(X)| \ge \delta) \le \frac{V(X)}{\delta^{2}}" />.
            </li>
            <li>
              Ici : <MathTex tex={`P(|${xmoins(mu)}| \\ge ${delta}) \\le \\frac{${v}}{${delta}^{2}} = \\frac{${v}}{${delta * delta}}`} />
              {M.d !== delta * delta ? <> = <MathTex tex={texFrac(M)} /></> : null}.
            </li>
            <li>
              L’événement <MathTex tex={`|${xmoins(mu)}| < ${delta}`} /> est le contraire de <MathTex tex={`|${xmoins(mu)}| \\ge ${delta}`} /> :{' '}
              <MathTex tex={`P(|${xmoins(mu)}| < ${delta}) = 1 - P(|${xmoins(mu)}| \\ge ${delta}) \\ge 1 - ${texFrac(M)} = ${texFrac(m)}`} />.
            </li>
          </>
        }
        conseils={
          <>
            <li>
              C’est la variance (et non l’écart-type) qui apparaît au numérateur, et δ est élevé au carré au dénominateur.
            </li>
            <li>
              Le minorant se déduit du majorant par passage au contraire : le sens de l’inégalité s’inverse (≤ devient ≥).
            </li>
            <li>L’espérance ne sert pas dans le calcul, elle fixe seulement le centre de l’intervalle.</li>
          </>
        }
      />
    </Cadre>
  );
}
