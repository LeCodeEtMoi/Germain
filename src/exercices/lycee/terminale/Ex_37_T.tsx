import { useState } from 'react';
import MathTex from '@/components/math/MathTex.tsx';
import { Cadre, Chargement, Enonce, Titre, useTirage } from '@/components/exercice/ExerciceUI.tsx';
import Questions, { type Question } from '@/components/exercice/Questions.tsx';
import { combinaison, entier, fraction, signeAleatoire, type Fraction } from '@/lib/maths.ts';
import { AIDE_FRACTION, attenduFraction, texFrac } from '@/lib/reponses.ts';

/**
 * Exercice : calculer ∫ de a à b de (m·x + p) dx.
 *
 *   ∫ (mx + p) dx = [m·x²/2 + p·x]  →  m(b² − a²)/2 + p(b − a), calculé en fraction exacte.
 */

/* ===== Logique ===== */

export type Exercice = { m: number; p: number; a: number; b: number };

export function genererExercice(): Exercice {
  const a = entier(-3, 2);
  return { m: signeAleatoire() * entier(1, 5), p: signeAleatoire() * entier(1, 6), a, b: a + entier(1, 4) };
}

export const valeur = ({ m, p, a, b }: Exercice): Fraction => fraction(m * (b * b - a * a) + 2 * p * (b - a), 2);

export const questions = (exo: Exercice): Question[] => {
  const { attendu, tolerance } = attenduFraction(valeur(exo));
  return [
    {
      type: 'nombre',
      id: 'I',
      libelle: <>Valeur de l’intégrale <MathTex tex="I" /> :</>,
      attendu,
      tolerance,
      placeholder: 'Ex : 7/2',
      aide: AIDE_FRACTION,
    },
  ];
};

/* ===== Affichage ===== */

export default function IntegraleAffine() {
  const [exo, regenerer] = useTirage(genererExercice);
  const [essai, setEssai] = useState(0);
  if (!exo) return <Chargement />;

  const { m, p, a, b } = exo;
  const v = valeur(exo);
  const fTex = combinaison([[m, 'x'], [p, '']], true);
  const c2 = fraction(m, 2); // coefficient de x² dans F
  const coefX2 = c2.d === 1 && Math.abs(c2.n) === 1 ? (c2.n < 0 ? '-' : '') : texFrac(c2);
  const Ftex = `${coefX2}x^{2} ${p < 0 ? '-' : '+'} ${Math.abs(p) === 1 ? '' : Math.abs(p)}x`;
  const F = (x: number) => fraction(m * x * x + 2 * p * x, 2);

  return (
    <Cadre>
      <Titre />
      <Enonce>
        <p>Calcule l’intégrale suivante :</p>
        <div className="exercice-formule">
          <MathTex tex={`I = \\int_{${a}}^{${b}} \\left(${fTex}\\right) dx`} />
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
              Une primitive de <MathTex tex={`${fTex}`} /> est <MathTex tex={`F(x) = ${Ftex}`} /> (primitive de <MathTex tex="x" /> : <MathTex tex="\frac{x^{2}}{2}" />, primitive d’une constante p : <MathTex tex="px" />).
            </li>
            <li>
              <MathTex tex={`F(${b}) = ${texFrac(F(b))}`} /> et <MathTex tex={`F(${a}) = ${texFrac(F(a))}`} />.
            </li>
            <li>
              <MathTex tex={`I = F(${b}) - F(${a}) = ${texFrac(F(b))} - ${F(a).n < 0 ? `\\left(${texFrac(F(a))}\\right)` : texFrac(F(a))} = ${texFrac(v)}`} />.
            </li>
          </>
        }
        conseils={
          <>
            <li>
              Primitive terme à terme : <MathTex tex="x \mapsto x" /> donne <MathTex tex="\frac{x^{2}}{2}" /> (et non x²).
            </li>
            <li>Calcule F(b) et F(a) séparément ; attention aux signes quand a est négatif.</li>
            <li>La constante p devient p·x dans la primitive.</li>
          </>
        }
      />
    </Cadre>
  );
}
