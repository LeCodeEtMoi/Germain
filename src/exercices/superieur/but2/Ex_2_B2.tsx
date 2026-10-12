import { useState, type ReactNode } from 'react';
import {
  AIDE_FRACTION, Cadre, Chargement, Enonce, MathTex, Questions, Titre, attenduFraction, choisir, entier, fraction, melanger, permuter, texFrac, useTirage,
  type Fraction, type Question,
} from './_commun.ts';

/**
 * Exercice : limites en 0 (ou en 1) par la règle de L'Hôpital.
 *
 *   A : sin(ax) / (bx)                 → a/b          (1 application)
 *   B : ln(1 + ax) / (bx)              → a/b          (1 application)
 *   C : (e^(ax) − e^(−ax)) / sin(bx)   → 2a/b         (1 application)
 *   D : (x − 1) / (xⁿ − 1) en 1        → 1/n          (1 application)
 *   E : (e^(ax) − 1 − ax) / (bx²)      → a²/(2b)      (2 applications)
 *   F : (1 − cos(ax)) / (bx²)          → a²/(2b)      (2 applications)
 */

/* ===== Logique ===== */

export type Exercice =
  | { famille: 'A' | 'B'; a: number; b: number; ordre: number[] }
  | { famille: 'C'; a: number; b: number; ordre: number[] }
  | { famille: 'D'; n: number; ordre: number[] }
  | { famille: 'E' | 'F'; a: number; b: number; ordre: number[] };

export function genererExercice(): Exercice {
  const famille = choisir(['A', 'B', 'C', 'D', 'E', 'F'] as const);
  const ordre = melanger([0, 1, 2]);
  if (famille === 'D') return { famille, n: entier(2, 5), ordre };
  for (;;) {
    const a = entier(2, 6);
    const b = entier(2, 6);
    if (famille !== 'E' && famille !== 'F' ? a !== b : true) return { famille, a, b, ordre } as Exercice;
  }
}

/** Limite exacte. */
export function limite(e: Exercice): Fraction {
  switch (e.famille) {
    case 'A':
    case 'B': return fraction(e.a, e.b);
    case 'C': return fraction(2 * e.a, e.b);
    case 'D': return fraction(1, e.n);
    case 'E':
    case 'F': return fraction(e.a * e.a, 2 * e.b);
  }
}

/** Nombre d'applications successives de la règle de L'Hôpital nécessaires. */
export const nbApplications = (e: Exercice) => (e.famille === 'E' || e.famille === 'F' ? 2 : 1);

/** Numérateur, dénominateur et point d'évaluation (pour les tests numériques). */
export function quotient(e: Exercice): { num: (x: number) => number; den: (x: number) => number; x0: number } {
  switch (e.famille) {
    case 'A': return { num: (x) => Math.sin(e.a * x), den: (x) => e.b * x, x0: 0 };
    case 'B': return { num: (x) => Math.log(1 + e.a * x), den: (x) => e.b * x, x0: 0 };
    case 'C': return { num: (x) => Math.exp(e.a * x) - Math.exp(-e.a * x), den: (x) => Math.sin(e.b * x), x0: 0 };
    case 'D': return { num: (x) => x - 1, den: (x) => x ** e.n - 1, x0: 1 };
    case 'E': return { num: (x) => Math.exp(e.a * x) - 1 - e.a * x, den: (x) => e.b * x * x, x0: 0 };
    case 'F': return { num: (x) => 1 - Math.cos(e.a * x), den: (x) => e.b * x * x, x0: 0 };
  }
}

export const questions = (exo: Exercice): Question[] => [
  {
    type: 'nombre', id: 'lim', libelle: <>Calcule la limite <MathTex tex={`\\ell=\\lim_{x\\to ${exo.famille === 'D' ? 1 : 0}} f(x)`} />.</>, ...attenduFraction(limite(exo)),
    placeholder: 'Ex : 3/4', aide: AIDE_FRACTION,
  },
  {
    type: 'choix', id: 'nb', libelle: <>Combien de fois faut-il appliquer la règle de L’Hôpital pour lever l’indétermination ?</>,
    attendu: String(nbApplications(exo)),
    options: permuter(
      [
        { valeur: '1', contenu: <>Une seule fois</> },
        { valeur: '2', contenu: <>Deux fois</> },
        { valeur: '3', contenu: <>Trois fois</> },
      ],
      exo.ordre,
    ),
    enLigne: true,
  },
];

/* ===== Affichage ===== */

const puissance = (base: string, e: number) => (e === 1 ? base : `${base}^{${e}}`);

function presentation(e: Exercice): { f: string; point: number; etapes: ReactNode } {
  switch (e.famille) {
    case 'A': return {
      f: `\\dfrac{\\sin(${e.a}x)}{${e.b}x}`, point: 0,
      etapes: (
        <li>
          Numérateur et dénominateur sont dérivables et tendent vers 0. <MathTex tex={`\\dfrac{(\\sin(${e.a}x))'}{(${e.b}x)'}=\\dfrac{${e.a}\\cos(${e.a}x)}{${e.b}}\\xrightarrow[x\\to0]{}\\dfrac{${e.a}\\cos 0}{${e.b}}=\\dfrac{${e.a}}{${e.b}}`} />.
        </li>
      ),
    };
    case 'B': return {
      f: `\\dfrac{\\ln(1+${e.a}x)}{${e.b}x}`, point: 0,
      etapes: (
        <li>
          Les deux termes tendent vers 0. <MathTex tex={`\\dfrac{(\\ln(1+${e.a}x))'}{(${e.b}x)'}=\\dfrac{\\frac{${e.a}}{1+${e.a}x}}{${e.b}}=\\dfrac{${e.a}}{${e.b}(1+${e.a}x)}\\xrightarrow[x\\to0]{}\\dfrac{${e.a}}{${e.b}}`} />.
        </li>
      ),
    };
    case 'C': return {
      f: `\\dfrac{e^{${e.a}x}-e^{-${e.a}x}}{\\sin(${e.b}x)}`, point: 0,
      etapes: (
        <li>
          Les deux termes tendent vers 0. <MathTex tex={`\\dfrac{${e.a}e^{${e.a}x}+${e.a}e^{-${e.a}x}}{${e.b}\\cos(${e.b}x)}\\xrightarrow[x\\to0]{}\\dfrac{${e.a}+${e.a}}{${e.b}}=\\dfrac{${2 * e.a}}{${e.b}}`} />.
        </li>
      ),
    };
    case 'D': return {
      f: `\\dfrac{x-1}{x^{${e.n}}-1}`, point: 1,
      etapes: (
        <li>
          Les deux termes tendent vers 0 en 1. <MathTex tex={`\\dfrac{(x-1)'}{(x^{${e.n}}-1)'}=\\dfrac{1}{${e.n}${puissance('x', e.n - 1)}}\\xrightarrow[x\\to1]{}\\dfrac{1}{${e.n}}`} />.
        </li>
      ),
    };
    case 'E': return {
      f: `\\dfrac{e^{${e.a}x}-1-${e.a}x}{${e.b}x^{2}}`, point: 0,
      etapes: (
        <>
          <li>
            Première application : <MathTex tex={`\\dfrac{${e.a}e^{${e.a}x}-${e.a}}{${2 * e.b}x}`} />. En 0 on obtient encore <MathTex tex="\frac00" /> : la règle s’applique une seconde fois.
          </li>
          <li>
            Seconde application : <MathTex tex={`\\dfrac{${e.a * e.a}e^{${e.a}x}}{${2 * e.b}}\\xrightarrow[x\\to0]{}\\dfrac{${e.a * e.a}}{${2 * e.b}}`} />.
          </li>
        </>
      ),
    };
    case 'F': return {
      f: `\\dfrac{1-\\cos(${e.a}x)}{${e.b}x^{2}}`, point: 0,
      etapes: (
        <>
          <li>
            Première application : <MathTex tex={`\\dfrac{${e.a}\\sin(${e.a}x)}{${2 * e.b}x}`} />. En 0 on obtient encore <MathTex tex="\frac00" /> : la règle s’applique une seconde fois.
          </li>
          <li>
            Seconde application : <MathTex tex={`\\dfrac{${e.a * e.a}\\cos(${e.a}x)}{${2 * e.b}}\\xrightarrow[x\\to0]{}\\dfrac{${e.a * e.a}}{${2 * e.b}}`} />.
          </li>
        </>
      ),
    };
  }
}

export default function LimitesHopital() {
  const [exo, regenerer] = useTirage(genererExercice);
  const [essai, setEssai] = useState(0);
  if (!exo) return <Chargement />;

  const { f, point, etapes } = presentation(exo);
  const l = limite(exo);
  const nb = nbApplications(exo);

  return (
    <Cadre>
      <Titre />
      <Enonce>
        <p>
          On considère la fonction <MathTex tex="f" /> définie au voisinage de <MathTex tex={`${point}`} /> (sauf en <MathTex tex={`${point}`} />) par :
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
            <MathTex tex={`\\lim_{x\\to ${point}}f(x)=${texFrac(l)}`} />, obtenue en appliquant la règle de L’Hôpital {nb === 1 ? 'une fois' : 'deux fois'}.
          </p>
        }
        correction={
          <>
            <li>
              En <MathTex tex={`${point}`} />, le numérateur et le dénominateur tendent tous deux vers 0 : c’est une forme indéterminée <MathTex tex="\frac00" />. Ils sont dérivables, on peut donc étudier le quotient des dérivées.
            </li>
            {etapes}
            <li>
              Comme la limite du quotient des dérivées existe, c’est aussi la limite de <MathTex tex="f" /> : <MathTex tex={`\\ell=${texFrac(l)}`} />.
            </li>
          </>
        }
        conseils={
          <>
            <li>Vérifie toujours que c’est bien une forme indéterminée (<MathTex tex="\frac00" /> ou <MathTex tex="\frac\infty\infty" />) avant d’appliquer la règle.</li>
            <li>On dérive le numérateur et le dénominateur <strong>séparément</strong> : ce n’est pas la dérivée du quotient.</li>
            <li>Si on retombe sur <MathTex tex="\frac00" /> après une dérivation, on recommence ; sinon on s’arrête et on calcule la limite.</li>
            <li>Les développements limités donnent un contrôle : <MathTex tex="\sin u\sim u" />, <MathTex tex="\ln(1+u)\sim u" />, <MathTex tex="1-\cos u\sim u^2/2" />.</li>
          </>
        }
      />
    </Cadre>
  );
}
