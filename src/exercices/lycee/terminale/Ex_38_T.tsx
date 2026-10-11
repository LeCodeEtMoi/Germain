import { useState } from 'react';
import MathTex from '@/components/math/MathTex.tsx';
import { Cadre, Chargement, Enonce, Titre, useTirage } from '@/components/exercice/ExerciceUI.tsx';
import Questions, { type Question } from '@/components/exercice/Questions.tsx';
import { combinaison, entier } from '@/lib/maths.ts';

/**
 * Exercice : intégration par parties, I = ∫ de a à b de x·e^(kx) dx.
 *
 *   u(x) = x, v′(x) = e^(kx)  →  I = [x·e^(kx)/k] − ∫ e^(kx)/k dx = [ (kx − 1)·e^(kx) / k² ]
 *
 * Paramètres choisis petits (k = 1 ou 2, bornes ≤ 3) pour garder des valeurs raisonnables.
 * La réponse est comparée à la valeur exacte à 0,0051 près : on accepte une valeur arrondie au centième
 * ou une écriture exacte avec e (comme (e^2+1)/4).
 */

/* ===== Logique ===== */

export type Exercice = { k: number; a: number; b: number };

export function genererExercice(): Exercice {
  const a = entier(0, 1);
  return { k: entier(1, 2), a, b: a + entier(1, 2) };
}

const primitive = (k: number, x: number) => ((k * x - 1) / (k * k)) * Math.exp(k * x);
export const valeur = ({ k, a, b }: Exercice) => primitive(k, b) - primitive(k, a);

export const questions = (exo: Exercice): Question[] => [
  {
    type: 'nombre',
    id: 'I',
    libelle: <>Valeur de <MathTex tex="I" /> :</>,
    attendu: valeur(exo),
    tolerance: 0.0051,
    placeholder: 'Ex : 12,35',
    aide: 'Valeur arrondie au centième (virgule ou point), ou valeur exacte avec e (par exemple (3*e^2+1)/4).',
  },
];

/* ===== Affichage ===== */

export default function IntegrationParties() {
  const [exo, regenerer] = useTirage(genererExercice);
  const [essai, setEssai] = useState(0);
  if (!exo) return <Chargement />;

  const { k, a, b } = exo;
  const v = valeur(exo);
  const vTex = v.toFixed(2).replace('.', '{,}');
  const kx = k === 1 ? 'x' : `${k}x`;
  const numerateur = combinaison([[k * b - 1, `e^{${k * b}}`], [-(k * a - 1), a === 0 ? '' : `e^{${k * a}}`]], true);

  return (
    <Cadre>
      <Titre />
      <Enonce>
        <p>À l’aide d’une intégration par parties, calcule :</p>
        <div className="exercice-formule">
          <MathTex tex={`I = \\int_{${a}}^{${b}} x\\, e^{${kx}} \\, dx`} />
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
            <MathTex tex={`I = \\frac{${numerateur}}{${k * k}} \\approx ${vTex}`} />.
          </p>
        }
        correction={
          <>
            <li>
              On pose <MathTex tex="u(x) = x" /> et <MathTex tex={`v'(x) = e^{${kx}}`} />, donc <MathTex tex="u'(x) = 1" /> et <MathTex tex={`v(x) = ${k === 1 ? '' : `\\frac{1}{${k}}`}e^{${kx}}`} />.
            </li>
            <li>
              Formule : <MathTex tex="\int_a^b u v' = \left[uv\right]_a^b - \int_a^b u' v" />. Ici :
              <div className="exercice-formule">
                <MathTex tex={`I = \\left[ ${k === 1 ? 'x' : `\\frac{x}{${k}}`} e^{${kx}} \\right]_{${a}}^{${b}} - \\int_{${a}}^{${b}} ${k === 1 ? '' : `\\frac{1}{${k}}`} e^{${kx}} \\, dx`} />
              </div>
            </li>
            <li>
              Une primitive de <MathTex tex={`${k === 1 ? '' : `\\frac{1}{${k}}`}e^{${kx}}`} /> est <MathTex tex={`\\frac{1}{${k * k}} e^{${kx}}`} />, donc
              <div className="exercice-formule">
                <MathTex tex={`I = \\left[ \\frac{${kx} - 1}{${k * k}} e^{${kx}} \\right]_{${a}}^{${b}}`} />
              </div>
            </li>
            <li>
              <MathTex tex={`I = \\frac{${numerateur}}{${k * k}} \\approx ${vTex}`} />.
            </li>
          </>
        }
        conseils={
          <>
            <li>
              Choisis u = x (qui se simplifie en le dérivant) et v′ = e^(kx) : le calcul de l’intégrale restante est immédiat.
            </li>
            <li>
              Une primitive de <MathTex tex="e^{kx}" /> est <MathTex tex="\frac{1}{k}e^{kx}" /> : n’oublie pas le facteur <MathTex tex="\frac1k" />, il apparaît deux fois (donc <MathTex tex="\frac{1}{k^{2}}" />).
            </li>
            <li>
              Pense que <MathTex tex="e^{0} = 1" /> quand la borne vaut 0, et garde les valeurs exactes jusqu’à la fin avant d’arrondir.
            </li>
          </>
        }
      />
    </Cadre>
  );
}
