// Outils de calcul pour les exercices de cryptographie.
// Convention : A = 0, B = 1, …, Z = 25 ; « _ » représente l'espace.

export const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
export const ESPACE = "_";

/** Reste positif de a modulo n. */
export const mod = (a: number, n = 26): number => ((a % n) + n) % n;

export const versNombre = (lettre: string): number => ALPHABET.indexOf(lettre);
export const versLettre = (n: number): string => ALPHABET[mod(n)];

// ---------- Hasard ----------

/** Entier aléatoire entre min et max inclus. */
export function hasard(min: number, max: number): number {
  return min + Math.floor(Math.random() * (max - min + 1));
}

export function choisir<T>(liste: readonly T[]): T {
  return liste[Math.floor(Math.random() * liste.length)];
}

export function melanger<T>(liste: readonly T[]): T[] {
  const copie = [...liste];
  for (let i = copie.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copie[i], copie[j]] = [copie[j], copie[i]];
  }
  return copie;
}

/** Permutation aléatoire de 1..n, différente de l'identité. */
export function permutationAleatoire(n: number): number[] {
  const identite = Array.from({ length: n }, (_, i) => i + 1);
  let p = melanger(identite);
  while (p.every((v, i) => v === i + 1)) p = melanger(identite);
  return p;
}

/** Clé de substitution aléatoire : les 26 images de A..Z. */
export function cleSubstitutionAleatoire(): string {
  return melanger(ALPHABET.split("")).join("");
}

// ---------- Textes ----------

export function sansAccents(s: string): string {
  return s.normalize("NFD").replace(/[̀-ͯ]/g, "");
}

/** Majuscules sans accents, uniquement A..Z (et « _ » si demandé). */
export function normaliser(s: string, garderEspace = false): string {
  const motif = garderEspace ? /[^A-Z_]/g : /[^A-Z]/g;
  return sansAccents(s).toUpperCase().replace(motif, "");
}

/** Remplace chaque lettre par f(lettre) et laisse le reste intact. */
function surLettres(texte: string, f: (n: number, rang: number) => number): string {
  let rang = 0;
  return texte.replace(/[A-Z]/g, (l) => versLettre(f(versNombre(l), rang++)));
}

// ---------- César ----------

export function decaler(texte: string, k: number): string {
  return surLettres(texte, (x) => x + k);
}

// ---------- Substitution mono-alphabétique ----------

export function substituer(texte: string, cle: string): string {
  return texte.replace(/[A-Z]/g, (l) => cle[versNombre(l)]);
}

export function inverserSubstitution(cle: string): string {
  const inverse = Array<string>(26);
  cle.split("").forEach((image, i) => (inverse[versNombre(image)] = ALPHABET[i]));
  return inverse.join("");
}

// ---------- Vigenère ----------

/** sens = 1 pour chiffrer, -1 pour déchiffrer. La clé se répète. */
export function vigenere(texte: string, cle: string, sens: 1 | -1): string {
  return surLettres(texte, (x, rang) => x + sens * versNombre(cle[rang % cle.length]));
}

// ---------- Permutation par blocs ----------

/** Remplace les espaces par « _ » et découpe en blocs de n, le dernier complété par « _ ». */
export function decouperBlocs(texte: string, n: number): string[] {
  let s = texte.replace(/ /g, ESPACE);
  while (s.length % n !== 0) s += ESPACE;
  const blocs: string[] = [];
  for (let i = 0; i < s.length; i += n) blocs.push(s.slice(i, i + n));
  return blocs;
}

/** Case i du bloc chiffré = lettre n° cle[i] du bloc clair (numérotation à partir de 1). */
export function permuterBloc(bloc: string, cle: number[]): string {
  return cle.map((k) => bloc[k - 1]).join("");
}

export function inverserPermutation(cle: number[]): number[] {
  const inverse = Array<number>(cle.length);
  cle.forEach((k, i) => (inverse[k - 1] = i + 1));
  return inverse;
}

export function factorielle(n: number): bigint {
  let r = 1n;
  for (let i = 2n; i <= BigInt(n); i++) r *= i;
  return r;
}

// ---------- César en mode CBC (blocs d'une lettre, ⊕ = somme modulo 26) ----------

export interface EtapeCbc {
  m: number;
  precedent: number;
  c: number;
}

/** c_i = E_k(m_i ⊕ c_{i-1}) = m_i + c_{i-1} + k (mod 26), avec c_0 = IV. */
export function cbcCesarChiffrer(clair: string, k: number, iv: number): EtapeCbc[] {
  const etapes: EtapeCbc[] = [];
  let precedent = iv;
  for (const l of clair) {
    const m = versNombre(l);
    const c = mod(m + precedent + k);
    etapes.push({ m, precedent, c });
    precedent = c;
  }
  return etapes;
}

/** m_i = D_k(c_i) ⊖ c_{i-1} = c_i − k − c_{i-1} (mod 26). */
export function cbcCesarDechiffrer(chiffre: string, k: number, iv: number): EtapeCbc[] {
  const etapes: EtapeCbc[] = [];
  let precedent = iv;
  for (const l of chiffre) {
    const c = versNombre(l);
    etapes.push({ m: mod(c - k - precedent), precedent, c });
    precedent = c;
  }
  return etapes;
}

// ---------- Feistel sur des mots de 4 bits (n = 2) ----------

export const MOTS2 = ["00", "01", "10", "11"] as const;
export type Fonction2 = Record<string, string>;

export function xor(a: string, b: string): string {
  return a
    .split("")
    .map((bit, i) => (bit === b[i] ? "0" : "1"))
    .join("");
}

export function fonctionAleatoire(bijective?: boolean): Fonction2 {
  for (;;) {
    const images =
      bijective === true ? melanger(MOTS2) : MOTS2.map(() => choisir(MOTS2));
    const f: Fonction2 = {};
    MOTS2.forEach((x, i) => (f[x] = images[i]));
    if (bijective === undefined || estBijective(f) === bijective) return f;
  }
}

export function estBijective(f: Fonction2): boolean {
  return new Set(Object.values(f)).size === 4;
}

/** F(g‖d) = d ‖ (g ⊕ f(d)) */
export function feistel(m: string, f: Fonction2): string {
  const g = m.slice(0, 2);
  const d = m.slice(2);
  return d + xor(g, f[d]);
}

/** F⁻¹(g'‖d') = (d' ⊕ f(g')) ‖ g' */
export function feistelInverse(c: string, f: Fonction2): string {
  const g = c.slice(0, 2);
  const d = c.slice(2);
  return xor(d, f[g]) + g;
}

export function motAleatoire4(): string {
  return Array.from({ length: 4 }, () => choisir(["0", "1"])).join("");
}

// ---------- Nombres ----------

/**
 * Lit un nombre écrit librement : « 6,67 × 10^-7 », « 6.67e-7 », « 2^127 », « 1 800 ».
 * Renvoie null si la saisie est illisible.
 */
export function lireNombre(saisie: string): number | null {
  let s = saisie
    .replace(/[\s  ]/g, "")
    .replace(/,/g, ".")
    .replace(/−/g, "-")
    .replace(/(?:×|x|\*|·)10\^/gi, "e");
  if (s === "") return null;
  const puissance = s.match(/^(\d+(?:\.\d+)?)\^(-?\d+(?:\.\d+)?)$/);
  if (puissance) return Math.pow(Number(puissance[1]), Number(puissance[2]));
  s = s.replace(/^10\^/, "1e");
  if (!/^-?\d*\.?\d+(?:e-?\d+)?$/i.test(s)) return null;
  const n = Number(s);
  return Number.isFinite(n) ? n : null;
}

/** Écrit un nombre en français, en notation scientifique s'il est très grand ou très petit. */
export function formaterNombre(x: number, chiffres = 3): string {
  if (x !== 0 && (Math.abs(x) >= 1e7 || Math.abs(x) < 1e-3)) {
    const [mantisse, exposant] = x.toExponential(chiffres - 1).split("e");
    return `${mantisse.replace(".", ",")} × 10^${Number(exposant)}`;
  }
  return x.toLocaleString("fr-FR", { maximumSignificantDigits: chiffres + 3 });
}

/** Compte les lettres d'un texte, de la plus fréquente à la moins fréquente. */
export function frequences(texte: string): [string, number][] {
  const compte = new Map<string, number>();
  for (const l of texte.replace(/[^A-Z]/g, "")) compte.set(l, (compte.get(l) ?? 0) + 1);
  return [...compte.entries()].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));
}
