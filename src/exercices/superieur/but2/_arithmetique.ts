/**
 * Arithmétique modulaire et chiffrement affine — exercices Ex_26_B2 à Ex_31_B2.
 *
 * Complète _crypto.ts (qui garde l'alphabet, les décalages et les modes opératoires).
 * Les noms évitent ceux de lib/but.ts, réexporté par _commun.ts : d'où
 * « indicatriceEuler » plutôt que « phi », déjà pris par la loi normale.
 */
import { entier } from '@/lib/maths.ts';
import { ALPHABET, mod, versLettre, versNombre } from './_crypto.ts';

/* ================================================================
   Divisibilité
================================================================ */

export function pgcd(a: number, b: number): number {
  let x = Math.abs(a);
  let y = Math.abs(b);
  while (y !== 0) [x, y] = [y, x % y];
  return x;
}

export const sontPremiersEntreEux = (a: number, b: number): boolean => pgcd(a, b) === 1;

/** Diviseurs de n strictement compris entre 1 et n. */
export function diviseursStricts(n: number): number[] {
  const d: number[] = [];
  for (let k = 2; k * k <= n; k++) {
    if (n % k === 0) {
      d.push(k);
      if (k !== n / k) d.push(n / k);
    }
  }
  return d.sort((x, y) => x - y);
}

/** Nombre d'éléments inversibles de Z/nZ : φ(n). */
export function indicatriceEuler(n: number): number {
  let total = 0;
  for (let k = 1; k <= n; k++) if (pgcd(k, n) === 1) total++;
  return total;
}

/** Les inversibles de Z/nZ, dans l'ordre croissant. */
export function inversiblesDe(n: number): number[] {
  const r: number[] = [];
  for (let k = 1; k < n; k++) if (pgcd(k, n) === 1) r.push(k);
  return r;
}

/**
 * Les diviseurs de zéro de Z/nZ : les classes k̄ non nulles telles qu'il existe
 * m̄ ≠ 0̄ avec k̄ × m̄ = 0̄, c'est-à-dire exactement les k avec pgcd(k, n) > 1.
 */
export function diviseursDeZero(n: number): number[] {
  const r: number[] = [];
  for (let k = 1; k < n; k++) if (pgcd(k, n) > 1) r.push(k);
  return r;
}

/** Le partenaire m̄ ≠ 0̄ qui annule k̄ : m = n / pgcd(k, n). */
export const annulateurDe = (k: number, n: number): number => n / pgcd(k, n);

/* ================================================================
   Euclide — Bézout
================================================================ */

export interface LigneEuclide {
  /** Numéro de ligne : −1 et 0 pour l'initialisation, puis 1, 2, 3… */
  i: number;
  a: number | null;
  b: number | null;
  r: number;
  q: number | null;
  u: number;
  v: number;
}

/**
 * Algorithme d'Euclide étendu présenté en tableau.
 * Chaque ligne vérifie  n × u + a × v = r  ; la dernière ligne de reste non nul
 * donne le pgcd et un couple de Bézout.
 *
 * n est le plus grand des deux (le modulo), a le second.
 */
export function tableauEuclide(n: number, a: number): LigneEuclide[] {
  const lignes: LigneEuclide[] = [
    { i: -1, a: null, b: null, r: n, q: null, u: 1, v: 0 },
    { i: 0, a: null, b: null, r: a, q: null, u: 0, v: 1 },
  ];
  let i = 1;
  while (lignes[lignes.length - 1].r !== 0) {
    const avant = lignes[lignes.length - 2];
    const courant = lignes[lignes.length - 1];
    const q = Math.floor(avant.r / courant.r);
    lignes.push({
      i,
      a: avant.r,
      b: courant.r,
      r: avant.r - q * courant.r,
      q,
      u: avant.u - q * courant.u,
      v: avant.v - q * courant.v,
    });
    i++;
  }
  return lignes;
}

export interface Bezout {
  d: number;
  /** n × u + a × v = d */
  u: number;
  v: number;
  lignes: LigneEuclide[];
}

export function bezout(n: number, a: number): Bezout {
  const lignes = tableauEuclide(n, a);
  const derniere = lignes[lignes.length - 2]; // la dernière avant le reste nul
  return { d: derniere.r, u: derniere.u, v: derniere.v, lignes };
}

/**
 * Inverse de a dans Z/nZ, entre 0 et n − 1, ou null si pgcd(a, n) ≠ 1.
 * Il vaut v (mod n), où n × u + a × v = 1.
 */
export function inverseModulaire(a: number, n: number): number | null {
  const { d, v } = bezout(n, mod(a, n));
  return d === 1 ? mod(v, n) : null;
}

/** a^p modulo n, par exponentiation rapide (exact même pour de grands exposants). */
export function puissanceMod(a: number, p: number, n: number): number {
  let base = mod(a, n);
  let reste = p;
  let r = 1;
  while (reste > 0) {
    if (reste % 2 === 1) r = (r * base) % n;
    base = (base * base) % n;
    reste = Math.floor(reste / 2);
  }
  return r;
}

/* ================================================================
   Chiffrement affine  f(x) = a x + b  (mod 26)
================================================================ */

/** Les a possibles : premiers avec 26, et différents de 1 (qui donnerait un simple décalage). */
export const CLES_AFFINES = inversiblesDe(26).filter((a) => a !== 1);

export const affineChiffrerLettre = (lettre: string, a: number, b: number): string =>
  versLettre(a * versNombre(lettre) + b);

export const affineChiffrer = (texte: string, a: number, b: number): string =>
  texte.replace(/[A-Z]/g, (l) => affineChiffrerLettre(l, a, b));

/** Coefficients de la fonction de déchiffrement f⁻¹(y) = a' y + b'. */
export function cleInverseAffine(a: number, b: number): { a: number; b: number } {
  const aPrime = inverseModulaire(a, 26);
  if (aPrime === null) throw new Error(`${a} n'est pas inversible modulo 26`);
  return { a: aPrime, b: mod(-aPrime * b) };
}

export function affineDechiffrer(texte: string, a: number, b: number): string {
  const inv = cleInverseAffine(a, b);
  return affineChiffrer(texte, inv.a, inv.b);
}

/* ================================================================
   Tirages
================================================================ */

/** Une clé affine (a, b) tirée au hasard, avec a inversible modulo 26 et a ≠ 1. */
export function cleAffineAleatoire(): { a: number; b: number } {
  return { a: CLES_AFFINES[entier(0, CLES_AFFINES.length - 1)], b: entier(1, 25) };
}

/**
 * Deux lettres claires distinctes dont l'écart est inversible modulo 26 :
 * c'est la condition pour que le système de l'attaque ait une solution unique.
 */
export function couplePourAttaque(): [string, string] {
  for (;;) {
    const x1 = entier(0, 25);
    const x2 = entier(0, 25);
    if (x1 !== x2 && pgcd(mod(x1 - x2), 26) === 1) return [ALPHABET[x1], ALPHABET[x2]];
  }
}

/* ================================================================
   Affichage
================================================================ */

/** « 5̄ » : une classe de congruence, en TeX. Accepte un nombre ou un nom (« k »). */
export const texClasse = (k: number | string): string => `\\overline{${k}}`;

/** Signe explicite pour écrire une combinaison : 3 → « + 3 », −3 → « − 3 ». */
export const texSigne = (k: number): string => (k < 0 ? `- ${Math.abs(k)}` : `+ ${k}`);

/** « f(x) = 9x + 8 », avec le terme constant omis s'il est nul. */
export const texAffine = (a: number, b: number, nom = 'f', variable = 'x'): string =>
  `${nom}(${variable}) = ${a === 1 ? '' : a}${variable}${b === 0 ? '' : ` ${texSigne(b)}`}`;
