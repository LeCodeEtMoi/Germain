import { analyser, evaluer } from './maths.ts';

/**
 * Ensembles de solutions : réunions d'intervalles.
 * Sert aux exercices d'inéquations (trigonométrie, ln, exp).
 *
 * L'élève écrit sa réponse au clavier : « ]π/6 ; 5π/6[ », « ]-π ; -π/3[ ∪ ]π/3 ; π] »,
 * « ]-1/2 ; +∞[ », « ∅ ». Les bornes sont lues comme des expressions (π, e, ln, √…)
 * et comparées par leur valeur : « 5π/6 » et « 5*pi/6 » sont la même borne.
 */

export type Borne = { v: number; texte: string };
export type Intervalle = { lo: Borne; hi: Borne; loFerme: boolean; hiFerme: boolean };
export type Union = Intervalle[]; // tableau vide = ensemble vide

export const borne = (v: number, texte: string): Borne => ({ v, texte });
export const moinsInfini = borne(-Infinity, '−∞');
export const plusInfini = borne(Infinity, '+∞');

const EPS = 1e-9;
const memeValeur = (x: number, y: number) => (x === y ? true : Math.abs(x - y) <= EPS * Math.max(1, Math.abs(x), Math.abs(y)));

/** Trie, et fusionne les intervalles qui se touchent ou se chevauchent. */
export function normaliser(union: Union): Union {
  const tries = [...union].sort((p, q) => p.lo.v - q.lo.v || (q.loFerme ? 1 : 0) - (p.loFerme ? 1 : 0));
  const res: Union = [];
  for (const cur of tries) {
    const dernier = res[res.length - 1];
    if (dernier) {
      const chevauche =
        cur.lo.v < dernier.hi.v - EPS ||
        (memeValeur(cur.lo.v, dernier.hi.v) && (cur.loFerme || dernier.hiFerme));
      if (chevauche) {
        if (cur.hi.v > dernier.hi.v + EPS || (memeValeur(cur.hi.v, dernier.hi.v) && cur.hiFerme)) {
          dernier.hi = cur.hi;
          dernier.hiFerme = cur.hiFerme;
        }
        continue;
      }
    }
    res.push({ ...cur });
  }
  return res;
}

export function memeUnion(a: Union, b: Union): boolean {
  const x = normaliser(a);
  const y = normaliser(b);
  return (
    x.length === y.length &&
    x.every(
      (p, i) =>
        memeValeur(p.lo.v, y[i].lo.v) &&
        memeValeur(p.hi.v, y[i].hi.v) &&
        (p.loFerme === y[i].loFerme || !Number.isFinite(p.lo.v)) &&
        (p.hiFerme === y[i].hiFerme || !Number.isFinite(p.hi.v))
    )
  );
}

/** « ]π/6 ; 5π/6[ ∪ ]7π/6 ; 11π/6[ » ou « ∅ ». */
export function texteUnion(union: Union): string {
  if (union.length === 0) return '∅';
  return union
    .map((i) => `${i.loFerme ? '[' : ']'}${i.lo.texte} ; ${i.hi.texte}${i.hiFerme ? ']' : '['}`)
    .join(' ∪ ');
}

/** Le point x appartient-il à l'ensemble ? (sert aux tests) */
export function contient(union: Union, x: number): boolean {
  return union.some(
    (i) => (x > i.lo.v || (i.loFerme && x === i.lo.v)) && (x < i.hi.v || (i.hiFerme && x === i.hi.v))
  );
}

/* ---------- Lecture de la saisie ---------- */

export type LectureUnion = { ok: true; union: Union } | { ok: false; message: string };

const VIDE = /^(?:∅|\{\}|vide|aucune?(?:solutions?)?|pas(?:de)?solutions?|s=∅)$/i;

function lireBorne(texte: string): Borne | null {
  const t = texte.trim();
  if (/^\+?(?:∞|inf|infini|infinity)$/i.test(t)) return plusInfini;
  if (/^[-−–]\s*(?:∞|inf|infini|infinity)$/i.test(t)) return moinsInfini;
  const a = analyser(t, {});
  if (!a.ok) return null;
  const v = evaluer(a.noeud);
  return Number.isFinite(v) ? borne(v, t) : null;
}

export function lireUnion(saisie: string): LectureUnion {
  const texte = saisie
    .replace(/[−–—]/g, '-')
    .replace(/ /g, ' ')
    .trim();
  if (texte === '') return { ok: false, message: 'Écris ta réponse avant de valider.' };
  if (VIDE.test(texte.replace(/\s+/g, ''))) return { ok: true, union: [] };

  const morceaux = texte.split(/\s*(?:∪|U|\bu\b)\s*/).filter((m) => m.trim() !== '');
  const union: Union = [];
  for (const m of morceaux) {
    const g = m.trim().match(/^([\[\]()])(.+)([\[\]()])$/);
    if (!g) {
      return {
        ok: false,
        message: `Je ne comprends pas « ${m.trim()} ». Écris des intervalles comme ]a ; b[ ou [a ; b], séparés par ∪.`,
      };
    }
    const [, ouvrant, milieu, fermant] = g;
    if (ouvrant === ')' || fermant === '(') {
      return { ok: false, message: `Les crochets de « ${m.trim()} » sont dans le mauvais sens.` };
    }
    const separateur = milieu.includes(';') ? ';' : milieu.split(',').length === 2 ? ',' : null;
    const parties = separateur ? milieu.split(separateur) : [];
    if (parties.length !== 2) {
      return { ok: false, message: `Il faut deux bornes séparées par un point-virgule dans « ${m.trim()} ».` };
    }
    const lo = lireBorne(parties[0]);
    const hi = lireBorne(parties[1]);
    if (!lo) return { ok: false, message: `Je ne comprends pas la borne « ${parties[0].trim()} ».` };
    if (!hi) return { ok: false, message: `Je ne comprends pas la borne « ${parties[1].trim()} ».` };
    if (lo.v > hi.v) return { ok: false, message: `Dans « ${m.trim()} », la borne de gauche est plus grande que celle de droite.` };
    union.push({
      lo,
      hi,
      loFerme: ouvrant === '[' && Number.isFinite(lo.v),
      hiFerme: fermant === ']' && Number.isFinite(hi.v),
    });
  }
  if (union.length === 0) return { ok: false, message: 'Je ne trouve aucun intervalle dans ta réponse.' };
  return { ok: true, union };
}

/* ---------- Correction d'une réponse « réunion d'intervalles » ---------- */

export type VerdictUnion =
  | { type: 'incompris'; raison: string }
  | { type: 'correct' }
  | { type: 'faux'; indice: string };

const sansCrochets = (u: Union): Union => u.map((i) => ({ ...i, loFerme: false, hiFerme: false }));

/** Indice sur l'erreur la plus fréquente, sachant que la réponse lue n'est pas la bonne. */
export function indiceUnion(lue: Union, reponse: Union): string {
  if (memeUnion(sansCrochets(lue), sansCrochets(reponse))) {
    return "Les bornes sont bonnes, mais pas les crochets : un crochet est fermé seulement si la borne est atteinte (inégalité large ou valeur du domaine).";
  }
  if (normaliser(lue).length < normaliser(reponse).length) {
    return "Il manque un intervalle : l'ensemble des solutions est une réunion de plusieurs morceaux.";
  }
  return "L'ensemble que tu donnes n'est pas celui des solutions.";
}

/** Lit la saisie et la compare à la bonne réponse, avec un indice sur l'erreur la plus fréquente. */
export function comparerUnion(saisie: string, reponse: Union): VerdictUnion {
  const lue = lireUnion(saisie);
  if (!lue.ok) return { type: 'incompris', raison: lue.message };
  if (memeUnion(lue.union, reponse)) return { type: 'correct' };
  return { type: 'faux', indice: indiceUnion(lue.union, reponse) };
}

/* ---------- Opérations sur les réunions d'intervalles ---------- */

/** Intersection de deux réunions d'intervalles. */
export function intersection(a: Union, b: Union): Union {
  const res: Union = [];
  for (const p of a) {
    for (const q of b) {
      let lo = p.lo;
      let loFerme = p.loFerme;
      if (q.lo.v > lo.v || (q.lo.v === lo.v && !q.loFerme)) {
        lo = q.lo;
        loFerme = q.loFerme;
      } else if (q.lo.v === lo.v) loFerme = p.loFerme && q.loFerme;
      let hi = p.hi;
      let hiFerme = p.hiFerme;
      if (q.hi.v < hi.v || (q.hi.v === hi.v && !q.hiFerme)) {
        hi = q.hi;
        hiFerme = q.hiFerme;
      } else if (q.hi.v === hi.v) hiFerme = p.hiFerme && q.hiFerme;
      if (lo.v < hi.v || (lo.v === hi.v && loFerme && hiFerme)) res.push({ lo, hi, loFerme, hiFerme });
    }
  }
  return normaliser(res);
}

/** Une demi-droite : ]b ; +∞[, [b ; +∞[, ]−∞ ; b[ ou ]−∞ ; b]. */
export function demiDroite(b: Borne, versLaDroite: boolean, ferme: boolean): Union {
  return versLaDroite
    ? [{ lo: b, hi: plusInfini, loFerme: ferme, hiFerme: false }]
    : [{ lo: moinsInfini, hi: b, loFerme: false, hiFerme: ferme }];
}

/** « x > 3 », « x ≤ ln(2)/3 » : une inégalité sur x, lue comme une demi-droite. null si la saisie n'a pas cette forme. */
export function lireInegalite(saisie: string): Union | null {
  const m = saisie
    .replace(/[−–—]/g, '-')
    .trim()
    .match(/^x\s*(<=|>=|≤|≥|<|>)\s*(.+)$/i);
  if (!m) return null;
  const b = lireBorne(m[2]);
  if (!b) return null;
  const op = m[1].replace('≤', '<=').replace('≥', '>=');
  return demiDroite(b, op.startsWith('>'), op.length === 2);
}
