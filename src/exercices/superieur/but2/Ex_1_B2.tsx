import { useState, type ReactNode } from 'react';
import { Cadre, Chargement, Enonce, MathTex, Questions, Titre, apercuExpression, choisir, entier, useTirage, verifierFonction, type Question } from './_commun.ts';

/**
 * Exercice : dériver une fonction composée, un produit ou un quotient.
 *
 *   A : (xᵐ + a)ⁿ          →  n m x^(m−1) (xᵐ + a)^(n−1)
 *   B : (x³ + a)/(x − b)   →  (2x³ − 3b x² − a)/(x − b)²
 *   C : e^(x² + a x)       →  (2x + a) e^(x² + a x)
 *   D : ln(x² + a)         →  2x/(x² + a)
 *   E : x² e^(k x)         →  (2x + k x²) e^(k x)
 *   F : sin(ln(a + x²))    →  2x/(a + x²) · cos(ln(a + x²))
 *
 * La réponse saisie est comparée à f' en plusieurs points : toute écriture équivalente est acceptée.
 */

/* ===== Logique ===== */

export type Exercice =
  | { famille: 'A'; m: number; n: number; a: number }
  | { famille: 'B'; a: number; b: number }
  | { famille: 'C'; a: number }
  | { famille: 'D'; a: number }
  | { famille: 'E'; k: number }
  | { famille: 'F'; a: number };

export function genererExercice(): Exercice {
  const famille = choisir(['A', 'B', 'C', 'D', 'E', 'F'] as const);
  switch (famille) {
    case 'A': return { famille, m: choisir([2, 3]), n: entier(3, 5), a: entier(1, 5) };
    case 'B': return { famille, a: entier(1, 5), b: entier(2, 4) };
    case 'C': return { famille, a: choisir([-3, -2, -1, 1, 2, 3]) };
    case 'D': return { famille, a: entier(1, 6) };
    case 'E': return { famille, k: choisir([-3, -2, -1, 2, 3]) };
    case 'F': return { famille, a: entier(1, 4) };
  }
}

/** f et f' en saisie « clavier » (pour la vérification). */
export function ascii(e: Exercice): { f: string; d: string } {
  switch (e.famille) {
    case 'A': return { f: `(x^${e.m} + ${e.a})^${e.n}`, d: `${e.n * e.m}*x^${e.m - 1}*(x^${e.m} + ${e.a})^${e.n - 1}` };
    case 'B': return { f: `(x^3 + ${e.a})/(x - ${e.b})`, d: `(2*x^3 - ${3 * e.b}*x^2 - ${e.a})/(x - ${e.b})^2` };
    case 'C': return { f: `e^(x^2 + (${e.a})*x)`, d: `(2*x + (${e.a}))*e^(x^2 + (${e.a})*x)` };
    case 'D': return { f: `ln(x^2 + ${e.a})`, d: `2*x/(x^2 + ${e.a})` };
    case 'E': return { f: `x^2*e^((${e.k})*x)`, d: `(2*x + (${e.k})*x^2)*e^((${e.k})*x)` };
    case 'F': return { f: `sin(ln(${e.a} + x^2))`, d: `2*x/(${e.a} + x^2)*cos(ln(${e.a} + x^2))` };
  }
}

/** Erreurs classiques (oubli de la dérivée de l'intérieur, etc.) avec le message à afficher. */
function erreurs(e: Exercice): { ascii: string; indice: string }[] {
  switch (e.famille) {
    case 'A': return [{ ascii: `${e.n}*(x^${e.m} + ${e.a})^${e.n - 1}`, indice: 'Tu as oublié le facteur u′ : la dérivée de uⁿ est n·u′·uⁿ⁻¹, pas seulement n·uⁿ⁻¹.' }];
    case 'C': return [{ ascii: ascii(e).f, indice: 'Tu as recopié f : la dérivée de eᵘ est u′·eᵘ, il faut multiplier par la dérivée de l’exposant.' }];
    case 'D': return [{ ascii: `1/(x^2 + ${e.a})`, indice: 'Tu as oublié u′ : la dérivée de ln(u) est u′/u, avec u′ = 2x ici.' }];
    case 'F': return [{ ascii: `cos(ln(${e.a} + x^2))`, indice: 'Tu as oublié la dérivée de l’intérieur : (sin∘g)′ = g′ · cos(g), ici g = ln(a + x²) donc g′ = 2x/(a + x²).' }];
    default: return [];
  }
}

const POINTS = [0.7, 1.3, -1.1, -2.6, 0.4];
const RETIRER = /^\s*f\s*('|′)?\s*(\(x\))?\s*=/i;

export const questions = (exo: Exercice): Question[] => [
  {
    type: 'expression',
    id: 'derivee',
    libelle: <>Dérivée : <MathTex tex="f'(x)=" /></>,
    placeholder: 'Ex : 2x*e^(x^2)',
    aide: 'Écris au clavier : e^(x^2+3x), ln(x^2+1), 3*x^2/(x-2)^2, cos(2x)… N’oublie pas les parenthèses.',
    verifier: (s) => verifierFonction(s, ascii(exo).d, 'x', POINTS, { retirer: RETIRER, alternatives: erreurs(exo) }),
    apercu: (s) => apercuExpression(s, "f'(x)", { retirer: RETIRER }),
  },
];

/* ===== Affichage ===== */

const puissance = (base: string, e: number) => (e === 1 ? base : `${base}^{${e}}`);
const signe = (n: number) => (n < 0 ? `-${-n}` : `+${n}`);
/** « +2x », « -x », « +3x^{2} » : terme c·v avec son signe, sans coefficient 1. */
const terme = (c: number, v: string) => `${c < 0 ? '-' : '+'}${Math.abs(c) === 1 ? '' : Math.abs(c)}${v}`;

function presentation(exo: Exercice): { f: string; d: string; etapes: ReactNode } {
  switch (exo.famille) {
    case 'A': {
      const { m, n, a } = exo;
      return {
        f: `(x^{${m}}+${a})^{${n}}`,
        d: `${n * m}${puissance('x', m - 1)}(x^{${m}}+${a})^{${n - 1}}`,
        etapes: (
          <>
            <li>
              On reconnaît <MathTex tex="f=u^{n}" /> avec <MathTex tex={`u(x)=x^{${m}}+${a}`} /> et <MathTex tex={`n=${n}`} />. La formule est <MathTex tex="(u^n)'=n\,u'\,u^{n-1}" />.
            </li>
            <li>
              <MathTex tex={`u'(x)=${m}${puissance('x', m - 1)}`} />.
            </li>
            <li>
              Donc <MathTex tex={`f'(x)=${n}\\times ${m}${puissance('x', m - 1)}\\,(x^{${m}}+${a})^{${n - 1}}=${n * m}${puissance('x', m - 1)}(x^{${m}}+${a})^{${n - 1}}`} />.
            </li>
          </>
        ),
      };
    }
    case 'B': {
      const { a, b } = exo;
      return {
        f: `\\dfrac{x^{3}+${a}}{x-${b}}`,
        d: `\\dfrac{2x^{3}-${3 * b}x^{2}-${a}}{(x-${b})^{2}}`,
        etapes: (
          <>
            <li>
              Quotient <MathTex tex="f=\frac{u}{v}" /> avec <MathTex tex={`u=x^{3}+${a}`} /> et <MathTex tex={`v=x-${b}`} />. La formule est <MathTex tex="\left(\frac uv\right)'=\frac{u'v-uv'}{v^2}" />.
            </li>
            <li>
              <MathTex tex={`u'=3x^{2}`} /> et <MathTex tex="v'=1" />.
            </li>
            <li>
              Numérateur : <MathTex tex={`3x^{2}(x-${b})-(x^{3}+${a})=3x^{3}-${3 * b}x^{2}-x^{3}-${a}=2x^{3}-${3 * b}x^{2}-${a}`} />.
            </li>
            <li>
              Donc <MathTex tex={`f'(x)=\\dfrac{2x^{3}-${3 * b}x^{2}-${a}}{(x-${b})^{2}}`} />.
            </li>
          </>
        ),
      };
    }
    case 'C': {
      const { a } = exo;
      const ua = `x^{2}${terme(a, 'x')}`;
      return {
        f: `e^{${ua}}`,
        d: `(2x${signe(a)})\\,e^{${ua}}`,
        etapes: (
          <>
            <li>
              <MathTex tex="f=e^{u}" /> avec <MathTex tex={`u(x)=${ua}`} />. La formule est <MathTex tex="(e^u)'=u'\,e^u" />.
            </li>
            <li>
              <MathTex tex={`u'(x)=2x${signe(a)}`} />.
            </li>
            <li>
              Donc <MathTex tex={`f'(x)=(2x${signe(a)})\\,e^{${ua}}`} />.
            </li>
          </>
        ),
      };
    }
    case 'D': {
      const { a } = exo;
      return {
        f: `\\ln(x^{2}+${a})`,
        d: `\\dfrac{2x}{x^{2}+${a}}`,
        etapes: (
          <>
            <li>
              <MathTex tex="f=\ln(u)" /> avec <MathTex tex={`u(x)=x^{2}+${a}`} /> (strictement positif, donc <MathTex tex="f" /> est définie sur <MathTex tex="\mathbb R" />). La formule est <MathTex tex="(\ln u)'=\frac{u'}{u}" />.
            </li>
            <li>
              <MathTex tex="u'(x)=2x" />, donc <MathTex tex={`f'(x)=\\dfrac{2x}{x^{2}+${a}}`} />.
            </li>
          </>
        ),
      };
    }
    case 'E': {
      const { k } = exo;
      const kx = k === -1 ? '-x' : `${k}x`;
      return {
        f: `x^{2}e^{${kx}}`,
        d: `(2x${terme(k, 'x^{2}')})\\,e^{${kx}}`,
        etapes: (
          <>
            <li>
              Produit <MathTex tex="f=uv" /> avec <MathTex tex="u=x^{2}" /> et <MathTex tex={`v=e^{${kx}}`} />. La formule est <MathTex tex="(uv)'=u'v+uv'" />.
            </li>
            <li>
              <MathTex tex="u'=2x" /> et <MathTex tex={`v'=${k}\\,e^{${kx}}`} /> (dérivée d’une exponentielle composée).
            </li>
            <li>
              Donc <MathTex tex={`f'(x)=2x\\,e^{${kx}}+x^{2}\\times ${k < 0 ? `(${k})` : k}\\,e^{${kx}}=(2x${terme(k, 'x^{2}')})\\,e^{${kx}}`} />.
            </li>
          </>
        ),
      };
    }
    case 'F': {
      const { a } = exo;
      return {
        f: `\\sin\\big(\\ln(${a}+x^{2})\\big)`,
        d: `\\dfrac{2x}{${a}+x^{2}}\\cos\\big(\\ln(${a}+x^{2})\\big)`,
        etapes: (
          <>
            <li>
              Deux compositions : <MathTex tex="f=\sin(g)" /> avec <MathTex tex={`g(x)=\\ln(${a}+x^{2})`} />. On a <MathTex tex="f'=g'\cos(g)" />.
            </li>
            <li>
              <MathTex tex="g=\ln(w)" /> avec <MathTex tex={`w=${a}+x^{2}`} />, donc <MathTex tex={`g'=\\dfrac{w'}{w}=\\dfrac{2x}{${a}+x^{2}}`} />.
            </li>
            <li>
              Donc <MathTex tex={`f'(x)=\\dfrac{2x}{${a}+x^{2}}\\cos\\big(\\ln(${a}+x^{2})\\big)`} />.
            </li>
          </>
        ),
      };
    }
  }
}

export default function DeriveesComposees() {
  const [exo, regenerer] = useTirage(genererExercice);
  const [essai, setEssai] = useState(0);
  if (!exo) return <Chargement />;

  const { f, d, etapes } = presentation(exo);

  return (
    <Cadre>
      <Titre />
      <Enonce>
        <p>
          Calcule la dérivée de la fonction <MathTex tex="f" /> définie par :
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
            <MathTex tex={`f'(x)=${d}`} />
          </p>
        }
        correction={
          <>
            {etapes}
            <li>
              Réponse : <MathTex tex={`f'(x)=${d}`} />.
            </li>
          </>
        }
        conseils={
          <>
            <li>Repère d’abord la structure : somme, produit, quotient ou composée. Chaque structure a sa formule.</li>
            <li>Pour une composée, dérive « l’extérieur » puis multiplie par la dérivée de « l’intérieur » : <MathTex tex="(g\circ u)'=u'\times g'(u)" />.</li>
            <li>Un résultat factorisé est plus facile à étudier (signe de la dérivée) : cherche le facteur commun.</li>
          </>
        }
      />
    </Cadre>
  );
}
