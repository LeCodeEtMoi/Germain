import { useState } from 'react';
import {
  AIDE_FRACTION, Cadre, Chargement, Enonce, MathTex, Questions, Titre, attenduFraction, choisir, entier, fMul, fraction, texFrac, useTirage,
  type Fraction, type Question,
} from './_commun.ts';

/**
 * Exercice : densité f(x) = k xⁿ sur [0 ; b] (nulle ailleurs).
 *
 *   ∫₀ᵇ k xⁿ dx = k bⁿ⁺¹/(n+1) = 1       →  k = (n+1)/bⁿ⁺¹
 *   E(X)    = (n+1) b /(n+2)
 *   P(X ≤ c) = (c/b)ⁿ⁺¹
 *   V(X)    = (n+1) b² /((n+3)(n+2)²)
 */

/* ===== Logique ===== */

export type Exercice = { n: number; b: number; c: number };

export function genererExercice(): Exercice {
  const n = entier(1, 3);
  const b = choisir([2, 3, 4]);
  return { n, b, c: entier(1, b - 1) };
}

export const constante = ({ n, b }: Exercice): Fraction => fraction(n + 1, b ** (n + 1));
export const esperance = ({ n, b }: Exercice): Fraction => fraction((n + 1) * b, n + 2);
export const probaInf = ({ n, b, c }: Exercice): Fraction => fraction(c ** (n + 1), b ** (n + 1));
export const variance = ({ n, b }: Exercice): Fraction => fraction((n + 1) * b * b, (n + 3) * (n + 2) ** 2);

export const questions = (exo: Exercice): Question[] => [
  { type: 'nombre', id: 'k', libelle: <>Détermine la constante <MathTex tex="k" /> pour que <MathTex tex="f" /> soit une densité de probabilité.</>, ...attenduFraction(constante(exo)), placeholder: 'Ex : 3/8', aide: AIDE_FRACTION },
  { type: 'nombre', id: 'E', libelle: <>Calcule l’espérance <MathTex tex="E(X)" />.</>, ...attenduFraction(esperance(exo)), placeholder: 'Ex : 8/3', aide: AIDE_FRACTION },
  { type: 'nombre', id: 'P', libelle: <>Calcule <MathTex tex={`P(X\\le ${exo.c})`} />.</>, ...attenduFraction(probaInf(exo)), placeholder: 'Ex : 1/4', aide: AIDE_FRACTION },
  { type: 'nombre', id: 'V', libelle: <>Calcule la variance <MathTex tex="V(X)" />.</>, ...attenduFraction(variance(exo)), placeholder: 'Ex : 2/9', aide: AIDE_FRACTION },
];

/* ===== Affichage ===== */

export default function DensitePuissance() {
  const [exo, regenerer] = useTirage(genererExercice);
  const [essai, setEssai] = useState(0);
  if (!exo) return <Chargement />;

  const { n, b, c } = exo;
  const k = constante(exo);
  const E = esperance(exo);
  const P = probaInf(exo);
  const V = variance(exo);
  const x = (e: number) => (e === 1 ? 'x' : `x^{${e}}`);
  const E2 = fraction((n + 1) * b * b, n + 3);
  const E2c = fMul(E, E);

  return (
    <Cadre>
      <Titre />
      <Enonce>
        <p>
          Soit <MathTex tex="X" /> une variable aléatoire de densité :
        </p>
        <div className="exercice-formule">
          <MathTex tex={`f(x)=\\begin{cases}k\\,${x(n)} & \\text{si } x\\in[0\\,;${b}]\\\\ 0 & \\text{sinon}\\end{cases}`} />
        </div>
        <p>
          où <MathTex tex="k" /> est une constante réelle.
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
            <MathTex tex={`k=${texFrac(k)}`} />, <MathTex tex={`E(X)=${texFrac(E)}`} />, <MathTex tex={`P(X\\le ${c})=${texFrac(P)}`} /> et <MathTex tex={`V(X)=${texFrac(V)}`} />.
          </p>
        }
        correction={
          <>
            <li>
              <strong>Constante.</strong> Il faut <MathTex tex="\int_{-\infty}^{+\infty}f=1" />, soit <MathTex tex={`\\int_0^{${b}}k\\,${x(n)}\\,\\mathrm dx=k\\,\\dfrac{${b}^{${n + 1}}}{${n + 1}}=1`} />, donc <MathTex tex={`k=\\dfrac{${n + 1}}{${b ** (n + 1)}}=${texFrac(k)}`} />.
            </li>
            <li>
              <strong>Espérance.</strong> <MathTex tex={`E(X)=\\int_0^{${b}}x\\,f(x)\\,\\mathrm dx=k\\,\\dfrac{${b}^{${n + 2}}}{${n + 2}}=${texFrac(E)}`} />.
            </li>
            <li>
              <strong>Probabilité.</strong> <MathTex tex={`P(X\\le ${c})=\\int_0^{${c}}k\\,${x(n)}\\,\\mathrm dx=k\\,\\dfrac{${c}^{${n + 1}}}{${n + 1}}=\\Big(\\dfrac{${c}}{${b}}\\Big)^{${n + 1}}=${texFrac(P)}`} />.
            </li>
            <li>
              <strong>Variance.</strong> Formule de Kœnig–Huygens : <MathTex tex="V(X)=E(X^2)-E(X)^2" />. Ici <MathTex tex={`E(X^2)=k\\,\\dfrac{${b}^{${n + 3}}}{${n + 3}}=${texFrac(E2)}`} /> et <MathTex tex={`E(X)^2=${texFrac(E2c)}`} />, donc <MathTex tex={`V(X)=${texFrac(V)}`} />.
            </li>
          </>
        }
        conseils={
          <>
            <li>Une densité est positive et d’intégrale 1 sur <MathTex tex="\mathbb R" /> : c’est la condition qui fixe <MathTex tex="k" />.</li>
            <li>Pour une loi continue, <MathTex tex="P(X\le c)=\int f" /> : les inégalités larges ou strictes donnent la même probabilité.</li>
            <li>Erreur fréquente : oublier de mettre l’espérance au carré dans <MathTex tex="V(X)=E(X^2)-E(X)^2" />, ou calculer <MathTex tex="E(X^2)" /> avec <MathTex tex="\int x\,f" />.</li>
          </>
        }
      />
    </Cadre>
  );
}
