/**
 * Outils communs aux exercices de Prépa 2ᵉ année (src/exercices/superieur/prepa2/).
 * À placer dans src/lib/prepa.ts
 *
 *   1. Fractions exactes
 *   2. Polynômes (coefficients par degré croissant)
 *   3. Écriture TeX (sommes, polynômes, matrices)
 */
import { fraction, type Fraction } from './maths.ts';

/* ================================================================
   1. Fractions exactes
================================================================ */

export const fAdd = (p: Fraction, q: Fraction): Fraction => fraction(p.n * q.d + q.n * p.d, p.d * q.d);
export const fSub = (p: Fraction, q: Fraction): Fraction => fraction(p.n * q.d - q.n * p.d, p.d * q.d);
export const fMul = (p: Fraction, q: Fraction): Fraction => fraction(p.n * q.n, p.d * q.d);
export const fDiv = (p: Fraction, q: Fraction): Fraction => fraction(p.n * q.d, p.d * q.n);
export const fAbs = (p: Fraction): Fraction => ({ n: Math.abs(p.n), d: p.d });
export const fVal = (p: Fraction) => p.n / p.d;

/* ================================================================
   2. Polynômes : tableau de coefficients, degré croissant
      [a0, a1, a2] représente a0 + a1 X + a2 X²
================================================================ */

export type Poly = number[];

export const polyAdd = (p: Poly, q: Poly): Poly => Array.from({ length: Math.max(p.length, q.length) }, (_, k) => (p[k] ?? 0) + (q[k] ?? 0));

export function polyMul(p: Poly, q: Poly): Poly {
  const r: Poly = Array(Math.max(p.length + q.length - 1, 1)).fill(0);
  p.forEach((a, i) => q.forEach((b, j) => (r[i + j] += a * b)));
  return r;
}

/** P(Q(X)) par la méthode de Horner (pour les tests et les vérifications). */
export function polyCompose(p: Poly, q: Poly): Poly {
  let r: Poly = [0];
  for (let k = p.length - 1; k >= 0; k--) r = polyAdd(polyMul(r, q), [p[k]]);
  return r;
}

export const polyDeriv = (p: Poly): Poly => (p.length <= 1 ? [0] : p.slice(1).map((a, i) => a * (i + 1)));

export const factorielle = (n: number): number => (n <= 1 ? 1 : n * factorielle(n - 1));

/** Σ |aₖ| */
export const normeSomme = (p: Poly) => p.reduce((s, a) => s + Math.abs(a), 0);

/* ================================================================
   3. Écriture TeX
================================================================ */

/**
 * Somme de termes « coefficient · monôme » : texSomme([[2, 'x^2'], [-1, 'xy'], [3, '']]) → « 2x^2 - xy + 3 ».
 * Les coefficients nuls sont omis ; le monôme vide désigne un terme constant.
 */
export function texSomme(termes: [number, string][]): string {
  let s = '';
  for (const [c, m] of termes) {
    if (c === 0) continue;
    const abs = Math.abs(c);
    const corps = m === '' ? `${abs}` : abs === 1 ? m : `${abs}${m}`;
    s += s === '' ? (c < 0 ? `-${corps}` : corps) : c < 0 ? ` - ${corps}` : ` + ${corps}`;
  }
  return s === '' ? '0' : s;
}

/** Polynôme en TeX, degré décroissant : texPoly([4, -1, 0, 2]) → « 2X^{3} - X + 4 ». */
export function texPoly(p: Poly, v = 'X'): string {
  const termes: [number, string][] = [];
  for (let k = p.length - 1; k >= 0; k--) termes.push([p[k], k === 0 ? '' : k === 1 ? v : `${v}^{${k}}`]);
  return texSomme(termes);
}

/** Matrice en TeX. */
export const texMat = (lignes: (string | number)[][]): string =>
  `\\begin{pmatrix}${lignes.map((l) => l.join(' & ')).join(' \\\\ ')}\\end{pmatrix}`;

/** Réordonne une liste selon `ordre` (permutation des indices) : permuter(['a','b','c'], [2,0,1]) → ['c','a','b']. */
export const permuter = <T,>(liste: readonly T[], ordre: readonly number[]): T[] => ordre.map((i) => liste[i]);
