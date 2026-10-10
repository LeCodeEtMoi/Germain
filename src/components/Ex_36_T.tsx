import { useState } from 'react';
import MathTex from './MathTex.tsx';
import { Cadre, Chargement, Enonce, Titre, useTirage } from './ExerciceUI.tsx';
import Questions, { type Question } from './Questions.tsx';
import { entier, fraction, type Fraction } from '../lib/maths.ts';
import { AIDE_FRACTION, attenduFraction, parTex, texFrac } from '../lib/reponses.ts';

/**
 * Exercice : calculer ∫ de a à b de xⁿ dx  (n = 1, 2 ou 3).
 *
 *   ∫ xⁿ dx = [xⁿ⁺¹/(n+1)]  →  (bⁿ⁺¹ − aⁿ⁺¹)/(n+1), calculé en fraction exacte.
 */

/* ===== Logique ===== */

export type Exercice = { n: number; a: number; b: number };

export function genererExercice(): Exercice {
  const a = entier(-3, 2);
  return { n: entier(1, 3), a, b: a + entier(1, 4) };
}

export const valeur = ({ n, a, b }: Exercice): Fraction => fraction(b ** (n + 1) - a ** (n + 1), n + 1);

export const questions = (exo: Exercice): Question[] => {
  const { attendu, tolerance } = attenduFraction(valeur(exo));
  return [
    {
      type: 'nombre',
      id: 'I',
      libelle: <>Valeur de l’intégrale <MathTex tex="I" /> :</>,
      attendu,
      tolerance,
      placeholder: 'Ex : 7/3',
      aide: AIDE_FRACTION,
    },
  ];
};

/* ===== Affichage ===== */

export default function IntegralePuissance() {
  const [exo, regenerer] = useTirage(genererExercice);
  const [essai, setEssai] = useState(0);
  if (!exo) return <Chargement />;

  const { n, a, b } = exo;
  const v = valeur(exo);
  const Fa = `\\frac{${parTex(a)}^{${n + 1}}}{${n + 1}}`;
  const Fb = `\\frac{${parTex(b)}^{${n + 1}}}{${n + 1}}`;

  return (
    <Cadre>
      <Titre />
      <Enonce>
        <p>Calcule l’intégrale suivante :</p>
        <div className="exercice-formule">
          <MathTex tex={`I = \\int_{${a}}^{${b}} x^{${n}} \\, dx`} />
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
            <MathTex tex={`I = ${texFrac(v)}`} />.
          </p>
        }
        correction={
          <>
            <li>
              Une primitive de <MathTex tex={`x^{${n}}`} /> est <MathTex tex={`F(x) = \\frac{x^{${n + 1}}}{${n + 1}}`} />.
            </li>
            <li>
              <MathTex tex={`I = F(${b}) - F(${a}) = ${Fb} - ${a < 0 ? `\\left(${Fa}\\right)` : Fa}`} />.
            </li>
            <li>
              <MathTex tex={`I = ${texFrac(fraction(b ** (n + 1), n + 1))} - ${a < 0 ? '(' : ''}${texFrac(fraction(a ** (n + 1), n + 1))}${a < 0 ? ')' : ''} = ${texFrac(v)}`} />.
            </li>
          </>
        }
        conseils={
          <>
            <li>
              Calcule <MathTex tex="F(b)" /> et <MathTex tex="F(a)" /> séparément, puis fais la différence <MathTex tex="F(b) - F(a)" /> (pas l’inverse).
            </li>
            <li>
              Si a est négatif, mets-le entre parenthèses : <MathTex tex="(-2)^{3} = -8" /> mais <MathTex tex="(-2)^{2} = 4" />.
            </li>
            <li>N’oublie pas de diviser par n + 1 (l’exposant augmenté de 1).</li>
          </>
        }
      />
    </Cadre>
  );
}
