/**
 * Outils communs aux exercices de cryptographie (Ex_11_B2 … Ex_25_B2).
 * Convention : A = 0, B = 1, …, Z = 25 ; « _ » représente l'espace.
 *
 * Toutes les réponses en texte passent par le type de question « expression »
 * de Questions.tsx, avec les vérificateurs de la fin de ce fichier.
 */
import { choisir, entier, melanger } from '@/lib/maths.ts';
import type { ResultatExpression } from '@/lib/reponses.ts';

export const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
export const ESPACE = '_';

/** Reste positif de a modulo n. */
export const mod = (a: number, n = 26): number => ((a % n) + n) % n;

export const versNombre = (lettre: string): number => ALPHABET.indexOf(lettre);
export const versLettre = (n: number): string => ALPHABET[mod(n)];

/** Majuscules sans accents, uniquement A..Z (et « _ » si demandé). */
export function lettresSeules(texte: string, garderEspace = false): string {
  const s = texte.normalize('NFD').replace(/[̀-ͯ]/g, '').toUpperCase();
  return s.replace(garderEspace ? /[^A-Z_]/g : /[^A-Z]/g, '');
}

/** Applique f à chaque lettre A..Z du texte, laisse le reste intact. */
function surLettres(texte: string, f: (x: number, rang: number) => number): string {
  let rang = 0;
  return texte.replace(/[A-Z]/g, (l) => versLettre(f(versNombre(l), rang++)));
}

/* ================================================================
   Décalage (César), substitution, Vigenère
================================================================ */

export const decaler = (texte: string, k: number): string => surLettres(texte, (x) => x + k);

/** La clé d'une substitution est la liste des 26 images de A..Z. */
export const cleSubstitutionAleatoire = (): string => melanger(ALPHABET.split('')).join('');

export const substituer = (texte: string, cle: string): string =>
  texte.replace(/[A-Z]/g, (l) => cle[versNombre(l)]);

export function inverserSubstitution(cle: string): string {
  const inverse = Array<string>(26);
  cle.split('').forEach((image, i) => (inverse[versNombre(image)] = ALPHABET[i]));
  return inverse.join('');
}

/** sens = 1 pour chiffrer, −1 pour déchiffrer ; la clé se répète. */
export const vigenere = (texte: string, cle: string, sens: 1 | -1): string =>
  surLettres(texte, (x, rang) => x + sens * versNombre(cle[rang % cle.length]));

/* ================================================================
   Permutation par blocs
================================================================ */

/** Remplace les espaces par « _ », découpe en blocs de n, complète le dernier par « _ ». */
export function decouperBlocs(texte: string, n: number): string[] {
  let s = texte.replace(/ /g, ESPACE);
  while (s.length % n !== 0) s += ESPACE;
  const blocs: string[] = [];
  for (let i = 0; i < s.length; i += n) blocs.push(s.slice(i, i + n));
  return blocs;
}

/** Case i du bloc chiffré = lettre n° cle[i] du bloc clair (numérotation à partir de 1). */
export const permuterBloc = (bloc: string, cle: number[]): string => cle.map((k) => bloc[k - 1]).join('');

export function inverserPermutation(cle: number[]): number[] {
  const inverse = Array<number>(cle.length);
  cle.forEach((k, i) => (inverse[k - 1] = i + 1));
  return inverse;
}

/** Permutation aléatoire de 1..n, différente de l'identité. */
export function permutationAleatoire(n: number): number[] {
  const identite = Array.from({ length: n }, (_, i) => i + 1);
  let p = melanger(identite);
  while (p.every((v, i) => v === i + 1)) p = melanger(identite);
  return p;
}

/* ================================================================
   César en mode CBC : blocs d'une lettre, ⊕ = somme modulo 26
================================================================ */

export interface EtapeCbc {
  m: number;
  precedent: number;
  c: number;
}

/** c_i = E_k(m_i ⊕ c_{i−1}) = m_i + c_{i−1} + k (mod 26), avec c_0 = IV. */
export function cbcChiffrer(clair: string, k: number, iv: number): EtapeCbc[] {
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

/** m_i = D_k(c_i) ⊖ c_{i−1} = c_i − k − c_{i−1} (mod 26). */
export function cbcDechiffrer(chiffre: string, k: number, iv: number): EtapeCbc[] {
  const etapes: EtapeCbc[] = [];
  let precedent = iv;
  for (const l of chiffre) {
    const c = versNombre(l);
    etapes.push({ m: mod(c - k - precedent), precedent, c });
    precedent = c;
  }
  return etapes;
}

/* ================================================================
   Schéma de Feistel sur des mots de 4 bits (n = 2)
================================================================ */

export const MOTS2 = ['00', '01', '10', '11'] as const;
export type Fonction2 = Record<string, string>;

export const xor = (a: string, b: string): string =>
  a.split('').map((bit, i) => (bit === b[i] ? '0' : '1')).join('');

export const estBijective = (f: Fonction2): boolean => new Set(Object.values(f)).size === 4;

export function fonctionAleatoire2(bijective?: boolean): Fonction2 {
  for (;;) {
    const images = bijective === true ? melanger(MOTS2) : MOTS2.map(() => choisir(MOTS2));
    const f: Fonction2 = {};
    MOTS2.forEach((x, i) => (f[x] = images[i]));
    if (bijective === undefined || estBijective(f) === bijective) return f;
  }
}

/** F(g‖d) = d ‖ (g ⊕ f(d)) */
export const feistel = (m: string, f: Fonction2): string => m.slice(2) + xor(m.slice(0, 2), f[m.slice(2)]);

/** F⁻¹(g′‖d′) = (d′ ⊕ f(g′)) ‖ g′ */
export const feistelInverse = (c: string, f: Fonction2): string => xor(c.slice(2), f[c.slice(0, 2)]) + c.slice(0, 2);

export const motAleatoire4 = (): string => Array.from({ length: 4 }, () => choisir(['0', '1'])).join('');

/* ================================================================
   Fréquences
================================================================ */

/** Compte les lettres d'un texte, de la plus fréquente à la moins fréquente. */
export function frequences(texte: string): [string, number][] {
  const compte = new Map<string, number>();
  for (const l of texte.replace(/[^A-Z]/g, '')) compte.set(l, (compte.get(l) ?? 0) + 1);
  return [...compte.entries()].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));
}

/* ================================================================
   Vérification des réponses en texte (type de question « expression »)
================================================================ */

/**
 * Compare la saisie au texte attendu, en ignorant accents, casse et ponctuation.
 * `bourrage` : les « _ » de complétion à la fin sont facultatifs.
 */
export function verifierTexte(attendu: string, options: { espaces?: boolean; bourrage?: boolean } = {}) {
  const { espaces = false, bourrage = false } = options;
  const nettoyer = (s: string) => {
    let t = lettresSeules(s, espaces);
    if (bourrage) t = t.replace(/_+$/, '');
    return t;
  };
  const cible = nettoyer(attendu);
  return (saisie: string): ResultatExpression => {
    const s = nettoyer(saisie);
    if (s === '') return { ok: false, incompris: 'Écris ta réponse en lettres (A à Z), sans chiffres.' };
    if (s === cible) return { ok: true };
    if (s.length !== cible.length)
      return { ok: false, indice: `Ta réponse compte ${s.length} lettres au lieu de ${cible.length} : il manque ou il reste des lettres.` };
    return { ok: false };
  };
}

/** Une suite de 0 et de 1 de la même longueur que `attendu`. */
export function verifierBits(attendu: string) {
  return (saisie: string): ResultatExpression => {
    const s = saisie.replace(/[\s;,]/g, '');
    if (!/^[01]+$/.test(s)) return { ok: false, incompris: 'Écris uniquement des 0 et des 1 (exemple : 0110).' };
    if (s.length !== attendu.length)
      return { ok: false, incompris: `Il faut exactement ${attendu.length} bits, ta réponse en compte ${s.length}.` };
    return s === attendu ? { ok: true } : { ok: false };
  };
}

/* ================================================================
   Textes originaux des énoncés (sans accents)
================================================================ */

export const PHRASES = [
  'LES MATHS SONT PARTOUT',
  'UN SECRET BIEN GARDE',
  'RENDEZ VOUS A MIDI',
  'LA CLE RESTE CACHEE',
  'LA TOUR TIENT DEBOUT',
  'LE CODE EST CASSE',
];

export const MOTS_LONGS = ['ALGORITHME', 'PROTOCOLE', 'SIGNATURE', 'CERTIFICAT', 'INTEGRITE', 'SERVEUR', 'PASSERELLE'];

export const MOTS_MOYENS = ['THEOREME', 'FRACTION', 'EQUATION', 'VECTEUR', 'SPIRALE', 'PROGRAMME'];

export const MOTS_CLES = ['SOPHIE', 'EULER', 'GAUSS', 'FERMAT', 'PRIME', 'TOUR'];

export const MOTS_COURTS = ['MATIN', 'TERRE', 'PORTE', 'SALLE', 'ROUGE', 'TABLE'];

/** Textes assez longs pour l'analyse des fréquences : E y est toujours la lettre la plus fréquente. */
export const TEXTES_FREQUENCES = [
  'SOPHIE GERMAIN EST NEE A PARIS EN MIL SEPT CENT SOIXANTE SEIZE. ELLE A APPRIS LES MATHEMATIQUES SEULE, LA NUIT, DANS LES LIVRES DE LA BIBLIOTHEQUE DE SON PERE. POUR ECHANGER AVEC LES SAVANTS DE SON EPOQUE, ELLE SIGNAIT SES LETTRES DU NOM DE MONSIEUR LE BLANC.',
  'UN MESSAGE CHIFFRE PAR SUBSTITUTION GARDE LA STRUCTURE DE LA LANGUE. LES LETTRES LES PLUS FREQUENTES DU TEXTE CLAIR RESTENT LES PLUS FREQUENTES DU TEXTE CHIFFRE. IL SUFFIT DONC DE COMPTER LES SYMBOLES, DE REPERER LES MOTS COURTS, PUIS DE DEVINER PEU A PEU LE RESTE DU MESSAGE.',
  'LE CODE DE CESAR DECALE CHAQUE LETTRE DE QUELQUES RANGS DANS L ALPHABET. IL SE CASSE EN QUELQUES MINUTES, CAR IL N EXISTE QUE VINGT SIX DECALAGES. UNE SUBSTITUTION QUELCONQUE OFFRE BEAUCOUP PLUS DE CLES, MAIS ELLE RESTE FRAGILE FACE A L ANALYSE DES FREQUENCES.',
];

/** Entier aléatoire : alias local de entier(), pour les exercices de ce dossier. */
export const hasard = entier;

/** Nombre en notation scientifique TeX : 2,09 × 10¹¹ → « 2{,}09\times 10^{11} ». */
export function texPuissance10(x: number, chiffres = 3): string {
  const [mantisse, exposant] = x.toExponential(chiffres - 1).split('e');
  return `${mantisse.replace('.', '{,}')}\\times 10^{${Number(exposant)}}`;
}
