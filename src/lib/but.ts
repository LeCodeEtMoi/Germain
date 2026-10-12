/**
 * Outils des exercices de BUT Informatique 2ᵉ année (src/exercices/superieur/but2/).
 * À placer dans src/lib/but.ts
 *
 *   - loi normale centrée réduite : fonction de répartition Φ (et valeurs de la table)
 *   - écriture décimale à la française pour le TeX (virgule)
 */

/** Fonction d'erreur, par la série de Taylor (précise à 1e-15 pour |x| ≤ 4). */
export function erf(x: number): number {
  if (Math.abs(x) > 6) return Math.sign(x);
  let somme = x;
  let terme = x;
  for (let n = 1; n < 120; n++) {
    terme *= (-x * x) / n;
    somme += terme / (2 * n + 1);
  }
  return (2 / Math.sqrt(Math.PI)) * somme;
}

/** Φ(z) : fonction de répartition de la loi normale N(0 ; 1). */
export const phi = (z: number): number => 0.5 * (1 + erf(z / Math.SQRT2));

/** Arrondi à d décimales. */
export const arrondi = (x: number, d: number): number => Math.round(x * 10 ** d) / 10 ** d;

/** Nombre décimal pour le TeX, avec virgule : texDec(1.6) → « 1{,}6 » ; texDec(-0.5) → « -0{,}5 ». */
export const texDec = (x: number, d?: number): string => {
  const s = d === undefined ? String(x) : x.toFixed(d);
  return s.replace('.', '{,}');
};

/** Nombre décimal pour le texte courant, avec virgule : « 1,6 ». */
export const txtDec = (x: number, d?: number): string => (d === undefined ? String(x) : x.toFixed(d)).replace('.', ',').replace('-', '−');

/** Quantiles de la loi normale utilisés dans les exercices : p → z (valeurs de la table, 2 décimales). */
export const QUANTILES: { p: number; z: number; zExact: number }[] = [
  { p: 0.9, z: 1.28, zExact: 1.2815515655446004 },
  { p: 0.95, z: 1.645, zExact: 1.6448536269514722 },
  { p: 0.975, z: 1.96, zExact: 1.959963984540054 },
  { p: 0.99, z: 2.33, zExact: 2.3263478740408408 },
];
