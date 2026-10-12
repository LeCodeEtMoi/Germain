import { useState } from 'react';
import {
  AIDE_FRACTION, Cadre, Chargement, Enonce, MathTex, Questions, Titre, attenduFraction, choisir, fAdd, fDiv, fMul, fSub, fraction, texFrac, useTirage,
  type Fraction, type Question,
} from './_commun.ts';

/**
 * Exercice : fonction de répartition définie par morceaux.
 *
 *   F(x) = 0                    si x < −1
 *        = p (1 − x²)           si −1 ≤ x ≤ 0
 *        = p + a x/(x + c)      si x > 0                 (limite 1 en +∞  ⇒  a = 1 − p)
 *   P(X ≤ −1/2)        = 3p/4
 *   P(−1/2 < X < t)    = F(t) − F(−1/2) = p/4 + a t/(t + c)
 *   f(x) = F'(x) = a c/(x + c)²  pour x > 0
 */

/* ===== Logique ===== */

export type Exercice = { p: Fraction; c: number; t: number };

const PROBAS: Fraction[] = [fraction(1, 5), fraction(1, 4), fraction(1, 3), fraction(2, 5), fraction(1, 2), fraction(3, 5), fraction(2, 3), fraction(3, 4)];

export function genererExercice(): Exercice {
  return { p: choisir(PROBAS), c: choisir([1, 2, 3]), t: choisir([1, 2, 3, 4]) };
}

export const aVal = ({ p }: Exercice): Fraction => fSub(fraction(1), p);
export const probaGauche = ({ p }: Exercice): Fraction => fMul(p, fraction(3, 4));
export const probaIntervalle = (e: Exercice): Fraction => fAdd(fMul(e.p, fraction(1, 4)), fMul(aVal(e), fraction(e.t, e.t + e.c)));
export const densiteEn1 = (e: Exercice): Fraction => fDiv(fMul(aVal(e), fraction(e.c)), fraction((1 + e.c) ** 2));

/** F(x), en flottant (pour les tests). */
export function repartition(e: Exercice, x: number): number {
  const p = e.p.n / e.p.d;
  if (x < -1) return 0;
  if (x <= 0) return p * (1 - x * x);
  return p + (1 - p) * x / (x + e.c);
}

export const questions = (exo: Exercice): Question[] => [
  { type: 'nombre', id: 'a', libelle: <>Détermine la valeur de <MathTex tex="a" /> pour que <MathTex tex="F" /> soit une fonction de répartition.</>, ...attenduFraction(aVal(exo)), placeholder: 'Ex : 3/5', aide: AIDE_FRACTION },
  { type: 'nombre', id: 'pg', libelle: <>Calcule <MathTex tex="P\!\left(X\le-\tfrac12\right)" />.</>, ...attenduFraction(probaGauche(exo)), placeholder: 'Ex : 3/20', aide: AIDE_FRACTION },
  { type: 'nombre', id: 'pi', libelle: <>Calcule <MathTex tex={`P\\!\\left(-\\tfrac12<X<${exo.t}\\right)`} />.</>, ...attenduFraction(probaIntervalle(exo)), placeholder: 'Ex : 7/10', aide: AIDE_FRACTION },
  { type: 'nombre', id: 'f1', libelle: <>Quelle est la valeur de la densité <MathTex tex="f(1)" /> ?</>, ...attenduFraction(densiteEn1(exo)), placeholder: 'Ex : 2/9', aide: AIDE_FRACTION },
];

/* ===== Affichage ===== */

export default function FonctionRepartition() {
  const [exo, regenerer] = useTirage(genererExercice);
  const [essai, setEssai] = useState(0);
  if (!exo) return <Chargement />;

  const { p, c, t } = exo;
  const a = aVal(exo);
  const pg = probaGauche(exo);
  const pi = probaIntervalle(exo);
  const f1 = densiteEn1(exo);
  const ft = fMul(a, fraction(t, t + c));
  const xc = c === 1 ? 'x+1' : `x+${c}`;

  return (
    <Cadre>
      <Titre />
      <Enonce>
        <p>
          Soit <MathTex tex="X" /> une variable aléatoire dont la fonction de répartition <MathTex tex="F" /> est donnée par :
        </p>
        <div className="exercice-formule">
          <MathTex tex={`F(x)=\\begin{cases}0 & \\text{si } x<-1\\\\ ${texFrac(p)}\\,(1-x^{2}) & \\text{si } -1\\le x\\le0\\\\ ${texFrac(p)}+a\\,\\dfrac{x}{${xc}} & \\text{si } x>0\\end{cases}`} />
        </div>
        <p>
          où <MathTex tex="a" /> est un réel. On admet que <MathTex tex="X" /> est une variable à densité.
        </p>
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
            <MathTex tex={`a=${texFrac(a)}`} />, <MathTex tex={`P(X\\le-\\tfrac12)=${texFrac(pg)}`} />, <MathTex tex={`P(-\\tfrac12<X<${t})=${texFrac(pi)}`} /> et <MathTex tex={`f(1)=${texFrac(f1)}`} />.
          </p>
        }
        correction={
          <>
            <li>
              <strong>Valeur de a.</strong> Une fonction de répartition tend vers 1 en <MathTex tex="+\infty" /> : <MathTex tex={`\\lim_{x\\to+\\infty}\\Big(${texFrac(p)}+a\\dfrac{x}{${xc}}\\Big)=${texFrac(p)}+a=1`} />, donc <MathTex tex={`a=${texFrac(a)}`} />. (Elle est bien continue en 0 : <MathTex tex={`F(0)=${texFrac(p)}`} /> des deux côtés.)
            </li>
            <li>
              <strong>Probabilité.</strong> <MathTex tex={`P(X\\le-\\tfrac12)=F(-\\tfrac12)=${texFrac(p)}\\Big(1-\\tfrac14\\Big)=${texFrac(pg)}`} />.
            </li>
            <li>
              <strong>Intervalle.</strong> Pour une variable à densité, <MathTex tex="P(\alpha<X<\beta)=F(\beta)-F(\alpha)" />. Ici <MathTex tex={`F(${t})=${texFrac(p)}+${texFrac(ft)}`} /> et <MathTex tex={`F(-\\tfrac12)=${texFrac(pg)}`} />, d’où <MathTex tex={`P=${texFrac(pi)}`} />.
            </li>
            <li>
              <strong>Densité.</strong> Pour <MathTex tex="x>0" />, <MathTex tex={`f(x)=F'(x)=a\\,\\dfrac{(${xc})-x}{(${xc})^{2}}=\\dfrac{${c === 1 ? 'a' : `${c}a`}}{(${xc})^{2}}`} />, donc <MathTex tex={`f(1)=\\dfrac{${c}\\times${texFrac(a)}}{${(1 + c) ** 2}}=${texFrac(f1)}`} />.
            </li>
          </>
        }
        conseils={
          <>
            <li>Une fonction de répartition est croissante, continue (variable à densité), de limite 0 en <MathTex tex="-\infty" /> et 1 en <MathTex tex="+\infty" />.</li>
            <li>La densité est la dérivée de <MathTex tex="F" />, morceau par morceau (ne mélange pas les expressions des différents intervalles).</li>
            <li>Erreur fréquente : calculer <MathTex tex="F(\beta)+F(\alpha)" /> au lieu de <MathTex tex="F(\beta)-F(\alpha)" />.</li>
          </>
        }
      />
    </Cadre>
  );
}
