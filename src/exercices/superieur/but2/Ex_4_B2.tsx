import { useState, type ReactNode } from 'react';
import { Cadre, Chargement, Enonce, MathTex, Questions, Titre, apercuExpression, choisir, entier, fraction, texFrac, useTirage, verifierPrimitive, type Fraction, type Question } from './_commun.ts';

/**
 * Exercice : trouver une primitive en repérant la forme u'·g(u).
 *
 *   A : 3j x² (x³ + c)ⁿ            →  j/(n+1) · (x³ + c)ⁿ⁺¹
 *   B : (2x + b)/(x² + bx + c)     →  ln(x² + bx + c)             (discriminant < 0)
 *   C : k x e^(−x²)                →  −(k/2) e^(−x²)
 *   D : cos x · sinⁿ x             →  sinⁿ⁺¹ x /(n+1)
 *   E : 1/(x + a)ⁿ                 →  −1/((n−1)(x + a)ⁿ⁻¹)
 *   F : cos(k√x)/√x                →  (2/k) sin(k√x)
 * Domaine de test : x > 0. La réponse est vérifiée en dérivant la saisie : toute primitive est acceptée.
 */

/* ===== Logique ===== */

export type Exercice =
  | { famille: 'A'; j: number; n: number; c: number }
  | { famille: 'B'; b: number; c: number }
  | { famille: 'C'; k: number }
  | { famille: 'D'; n: number }
  | { famille: 'E'; n: number; a: number }
  | { famille: 'F'; k: number };

export function genererExercice(): Exercice {
  const famille = choisir(['A', 'B', 'C', 'D', 'E', 'F'] as const);
  switch (famille) {
    case 'A': return { famille, j: entier(1, 3), n: entier(2, 4), c: choisir([-2, -1, 1, 2, 3]) };
    case 'B': {
      const b = entier(1, 4);
      return { famille, b, c: Math.floor((b * b) / 4) + entier(1, 3) };
    }
    case 'C': return { famille, k: entier(2, 6) };
    case 'D': return { famille, n: entier(2, 4) };
    case 'E': return { famille, n: entier(2, 4), a: entier(1, 5) };
    case 'F': return { famille, k: entier(2, 4) };
  }
}

const sg = (n: number) => (n < 0 ? `- ${-n}` : `+ ${n}`);

/** f et une primitive F, en saisie « clavier » (pour la vérification). */
export function ascii(e: Exercice): { f: string; F: string } {
  switch (e.famille) {
    case 'A': return { f: `${3 * e.j}*x^2*(x^3 ${sg(e.c)})^${e.n}`, F: `${e.j}/${e.n + 1}*(x^3 ${sg(e.c)})^${e.n + 1}` };
    case 'B': return { f: `(2*x + ${e.b})/(x^2 + ${e.b}*x + ${e.c})`, F: `ln(x^2 + ${e.b}*x + ${e.c})` };
    case 'C': return { f: `${e.k}*x*e^(-x^2)`, F: `-${e.k}/2*e^(-x^2)` };
    case 'D': return { f: `cos(x)*sin(x)^${e.n}`, F: `sin(x)^${e.n + 1}/${e.n + 1}` };
    case 'E': return { f: `1/(x + ${e.a})^${e.n}`, F: `-1/(${e.n - 1}*(x + ${e.a})^${e.n - 1})` };
    case 'F': return { f: `cos(${e.k}*sqrt(x))/sqrt(x)`, F: `2/${e.k}*sin(${e.k}*sqrt(x))` };
  }
}

const POINTS = [0.7, 1.3, 1.9, 2.6, 3.4];
const RETIRER = /^\s*F\s*(\(x\))?\s*=/i;

export const questions = (exo: Exercice): Question[] => [
  {
    type: 'expression',
    id: 'primitive',
    libelle: <>Une primitive : <MathTex tex="F(x)=" /></>,
    placeholder: 'Ex : ln(x^2+1)',
    aide: 'Écris au clavier : e^(-x^2), sin(x)^3/3, 2/3*sin(3*sqrt(x)), ln(…)… La constante « + C » est facultative.',
    verifier: (s) => verifierPrimitive(ascii(exo).f, s, POINTS),
    apercu: (s) => apercuExpression(s, 'F(x)', { retirer: RETIRER, constantes: ['c'] }),
  },
];

/* ===== Affichage ===== */

const signeTex = (n: number) => (n < 0 ? `-${-n}` : `+${n}`);
const coef = (fr: Fraction) => (fr.d === 1 ? (fr.n === 1 ? '' : `${fr.n}`) : texFrac(fr));

function presentation(e: Exercice): { f: string; F: string; etapes: ReactNode } {
  switch (e.famille) {
    case 'A': {
      const g = `x^{3}${signeTex(e.c)}`;
      const k = fraction(e.j, e.n + 1);
      return {
        f: `${3 * e.j}x^{2}(${g})^{${e.n}}`,
        F: `${coef(k)}(${g})^{${e.n + 1}}`,
        etapes: (
          <>
            <li>
              Avec <MathTex tex={`u(x)=${g}`} />, on a <MathTex tex="u'(x)=3x^{2}" />. Donc <MathTex tex={`f=${e.j}\\times u'\\,u^{${e.n}}`} />.
            </li>
            <li>
              Une primitive de <MathTex tex={`u'u^{${e.n}}`} /> est <MathTex tex={`\\dfrac{u^{${e.n + 1}}}{${e.n + 1}}`} />. D’où <MathTex tex={`F(x)=${e.j}\\times\\dfrac{(${g})^{${e.n + 1}}}{${e.n + 1}}`} />.
            </li>
          </>
        ),
      };
    }
    case 'B': {
      const u = `x^{2}+${e.b}x+${e.c}`;
      return {
        f: `\\dfrac{2x+${e.b}}{${u}}`,
        F: `\\ln(${u})`,
        etapes: (
          <>
            <li>
              Le numérateur est la dérivée du dénominateur : avec <MathTex tex={`u(x)=${u}`} />, <MathTex tex={`u'(x)=2x+${e.b}`} />. Donc <MathTex tex="f=\dfrac{u'}{u}" />.
            </li>
            <li>
              Le discriminant <MathTex tex={`\\Delta=${e.b * e.b}-${4 * e.c}=${e.b * e.b - 4 * e.c}`} /> est négatif : <MathTex tex="u>0" /> sur <MathTex tex="\mathbb R" />, et <MathTex tex="F=\ln(u)" /> convient (sans valeur absolue).
            </li>
          </>
        ),
      };
    }
    case 'C': return {
      f: `${e.k}x\\,e^{-x^{2}}`,
      F: `-${texFrac(fraction(e.k, 2))}\\,e^{-x^{2}}`,
      etapes: (
        <>
          <li>
            Avec <MathTex tex="u(x)=-x^{2}" />, <MathTex tex="u'(x)=-2x" />, donc <MathTex tex={`${e.k}x=-\\dfrac{${e.k}}{2}\\,u'`} />.
          </li>
          <li>
            Une primitive de <MathTex tex="u'e^{u}" /> est <MathTex tex="e^{u}" />. D’où <MathTex tex={`F(x)=-\\dfrac{${e.k}}{2}\\,e^{-x^{2}}`} />.
          </li>
        </>
      ),
    };
    case 'D': return {
      f: `\\cos x\\,\\sin^{${e.n}}x`,
      F: `\\dfrac{\\sin^{${e.n + 1}}x}{${e.n + 1}}`,
      etapes: (
        <>
          <li>
            Avec <MathTex tex="u=\sin x" />, <MathTex tex="u'=\cos x" />, donc <MathTex tex={`f=u'\\,u^{${e.n}}`} />.
          </li>
          <li>
            Une primitive de <MathTex tex={`u'u^{${e.n}}`} /> est <MathTex tex={`\\dfrac{u^{${e.n + 1}}}{${e.n + 1}}`} />.
          </li>
        </>
      ),
    };
    case 'E': return {
      f: `\\dfrac{1}{(x+${e.a})^{${e.n}}}`,
      F: `-\\dfrac{1}{${e.n - 1 === 1 ? '' : e.n - 1}(x+${e.a})^{${e.n - 1}}}`,
      etapes: (
        <>
          <li>
            On écrit <MathTex tex={`f(x)=(x+${e.a})^{-${e.n}}`} />, de la forme <MathTex tex={`u'u^{-${e.n}}`} /> avec <MathTex tex={`u=x+${e.a}`} /> et <MathTex tex="u'=1" />.
          </li>
          <li>
            Une primitive de <MathTex tex={`u'u^{-${e.n}}`} /> est <MathTex tex={`\\dfrac{u^{-${e.n - 1}}}{-${e.n - 1}}`} />, soit <MathTex tex={`-\\dfrac{1}{${e.n - 1}(x+${e.a})^{${e.n - 1}}}`} />.
          </li>
        </>
      ),
    };
    case 'F': return {
      f: `\\dfrac{\\cos(${e.k}\\sqrt x)}{\\sqrt x}`,
      F: `\\dfrac{2}{${e.k}}\\sin(${e.k}\\sqrt x)`,
      etapes: (
        <>
          <li>
            Avec <MathTex tex={`u(x)=${e.k}\\sqrt x`} />, <MathTex tex={`u'(x)=\\dfrac{${e.k}}{2\\sqrt x}`} />, donc <MathTex tex={`\\dfrac{1}{\\sqrt x}=\\dfrac{2}{${e.k}}\\,u'`} />.
          </li>
          <li>
            Une primitive de <MathTex tex="u'\cos u" /> est <MathTex tex="\sin u" />. D’où <MathTex tex={`F(x)=\\dfrac{2}{${e.k}}\\sin(${e.k}\\sqrt x)`} />.
          </li>
        </>
      ),
    };
  }
}

export default function PrimitivesComposees() {
  const [exo, regenerer] = useTirage(genererExercice);
  const [essai, setEssai] = useState(0);
  if (!exo) return <Chargement />;

  const { f, F, etapes } = presentation(exo);

  return (
    <Cadre>
      <Titre />
      <Enonce>
        <p>
          Détermine une primitive sur <MathTex tex="]0\,;+\infty[" /> de la fonction <MathTex tex="f" /> définie par :
        </p>
        <div className="exercice-formule">
          <MathTex tex={`f(x)=${f}`} />
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
            Une primitive est <MathTex tex={`F(x)=${F}`} /> (à une constante près).
          </p>
        }
        correction={
          <>
            {etapes}
            <li>
              Vérification : en dérivant <MathTex tex={`F(x)=${F}`} />, on retrouve bien <MathTex tex={`f(x)=${f}`} />.
            </li>
          </>
        }
        conseils={
          <>
            <li>Cherche une fonction <MathTex tex="u" /> dont la dérivée apparaît (à une constante près) dans l’expression : c’est le signe d’une forme <MathTex tex="u'\,g(u)" />.</li>
            <li>Formulaire : <MathTex tex="u'u^{n}\to\frac{u^{n+1}}{n+1}" />, <MathTex tex="\frac{u'}{u}\to\ln\lvert u\rvert" />, <MathTex tex="u'e^{u}\to e^{u}" />, <MathTex tex="u'\cos u\to\sin u" />.</li>
            <li>Dérive ta réponse pour vérifier : tu dois retrouver exactement <MathTex tex="f" />. Une constante multiplicative manquante est l’erreur la plus fréquente.</li>
          </>
        }
      />
    </Cadre>
  );
}
