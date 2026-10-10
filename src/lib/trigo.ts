import { type Borne, type Intervalle, type Union, borne } from './intervalles.ts';
import { MOINS } from './maths.ts';

/**
 * Trigonométrie exacte : angles de la forme (n/d)·π et valeurs remarquables.
 * Sert aux exercices sur les équations et inéquations dans ]−π ; π] ou [0 ; 2π].
 */

/* ---------- Angles (n/d)·π ---------- */

export type Ang = { n: number; d: number }; // d > 0, fraction réduite

const pgcd = (a: number, b: number): number => (b === 0 ? Math.abs(a) : pgcd(b, a % b));

export function ang(n: number, d = 1): Ang {
  const g = pgcd(n, d) || 1;
  const s = d < 0 ? -1 : 1;
  return { n: (s * n) / g, d: (s * d) / g };
}
export const plus = (a: Ang, b: Ang) => ang(a.n * b.d + b.n * a.d, a.d * b.d);
export const oppose = (a: Ang) => ang(-a.n, a.d);
export const valeur = (a: Ang) => (a.n / a.d) * Math.PI;
export const memeAng = (a: Ang, b: Ang) => a.n * b.d === b.n * a.d;
export const comparerAng = (a: Ang, b: Ang) => a.n * b.d - b.n * a.d;
export const PI = ang(1);
export const DEUX_PI = ang(2);

/** « 5π/6 », « −π/6 », « π », « 2π », « 0 ». */
export function texteAng(a: Ang): string {
  if (a.n === 0) return '0';
  const signe = a.n < 0 ? MOINS : '';
  const n = Math.abs(a.n);
  return `${signe}${n === 1 ? '' : n}π${a.d === 1 ? '' : `/${a.d}`}`;
}

export function texAng(a: Ang): string {
  if (a.n === 0) return '0';
  const signe = a.n < 0 ? '-' : '';
  const n = Math.abs(a.n);
  const haut = `${n === 1 ? '' : n}\\pi`;
  return a.d === 1 ? `${signe}${haut}` : `${signe}\\frac{${haut}}{${a.d}}`;
}

export const borneAng = (a: Ang): Borne => borne(valeur(a), texteAng(a));

/* ---------- Domaines ---------- */

export type Domaine = { lo: Ang; hi: Ang; loFerme: boolean; hiFerme: boolean; texte: string };

export const DOMAINE_PI: Domaine = { lo: ang(-1), hi: PI, loFerme: false, hiFerme: true, texte: ']−π ; π]' };
export const DOMAINE_2PI: Domaine = { lo: ang(0), hi: DEUX_PI, loFerme: true, hiFerme: true, texte: '[0 ; 2π]' };

const dansDomaine = (a: Ang, d: Domaine) => {
  const c1 = comparerAng(a, d.lo);
  const c2 = comparerAng(a, d.hi);
  return (c1 > 0 || (c1 === 0 && d.loFerme)) && (c2 < 0 || (c2 === 0 && d.hiFerme));
};

/* ---------- Valeurs remarquables ---------- */

export type ValeurTrig = {
  num: number;
  texte: string; // « −√2/2 »
  tex: string; // « -\frac{\sqrt{2}}{2} »
  asin: Ang; // arcsin(v)
  acos: Ang; // arccos(v)
};

const positives = [
  { num: 0, texte: '0', tex: '0', asin: ang(0), acos: ang(1, 2) },
  { num: 0.5, texte: '1/2', tex: '\\frac{1}{2}', asin: ang(1, 6), acos: ang(1, 3) },
  { num: Math.SQRT2 / 2, texte: '√2/2', tex: '\\frac{\\sqrt{2}}{2}', asin: ang(1, 4), acos: ang(1, 4) },
  { num: Math.sqrt(3) / 2, texte: '√3/2', tex: '\\frac{\\sqrt{3}}{2}', asin: ang(1, 3), acos: ang(1, 6) },
  { num: 1, texte: '1', tex: '1', asin: ang(1, 2), acos: ang(0) },
];

export const VALEURS: ValeurTrig[] = [
  ...positives.slice(1).map((p) => ({
    num: -p.num,
    texte: `${MOINS}${p.texte}`,
    tex: `-${p.tex}`,
    asin: oppose(p.asin),
    acos: plus(PI, oppose(p.acos)),
  })).reverse(),
  ...positives,
];

/** Les valeurs ±1/2, ±√2/2, ±√3/2 (jamais 0, ±1 : pas de racine double ni de racine en ±π). */
export const VALEURS_COURANTES = VALEURS.filter((v) => Math.abs(v.num) !== 0 && Math.abs(v.num) !== 1);

export type FonctionTrig = 'sin' | 'cos';
export const fonction = (t: FonctionTrig) => (t === 'sin' ? Math.sin : Math.cos);

/** Toutes les solutions de t(x) = v dans le domaine, triées. */
export function racines(t: FonctionTrig, v: ValeurTrig, d: Domaine): Ang[] {
  const base: Ang[] = [];
  for (let k = -3; k <= 3; k++) {
    const tour = ang(2 * k);
    if (t === 'sin') base.push(plus(v.asin, tour), plus(plus(PI, oppose(v.asin)), tour));
    else base.push(plus(v.acos, tour), plus(oppose(v.acos), tour));
  }
  const uniques: Ang[] = [];
  for (const a of base) if (dansDomaine(a, d) && !uniques.some((u) => memeAng(u, a))) uniques.push(a);
  return uniques.sort(comparerAng);
}

/* ---------- Ensemble des solutions d'une inéquation g(x) ⊳ 0 ---------- */

export type Comparaison = '<' | '>' | '<=' | '>=';
export const symbole = (op: Comparaison) => (op === '<=' ? '≤' : op === '>=' ? '≥' : op);
const verifie = (op: Comparaison, y: number) =>
  op === '<' ? y < 0 : op === '>' ? y > 0 : op === '<=' ? y <= 0 : y >= 0;

/**
 * Ensemble des x du domaine tels que g(x) ⊳ 0, sachant que les racines de g dans le domaine sont `zeros`
 * (et que g ne s'annule nulle part ailleurs). Renvoie null si l'ensemble contient un point isolé.
 */
export function resoudre(g: (x: number) => number, zeros: Ang[], d: Domaine, op: Comparaison): Union | null {
  const points: Ang[] = [d.lo];
  for (const z of zeros) if (comparerAng(z, d.lo) > 0 && comparerAng(z, d.hi) < 0) points.push(z);
  points.push(d.hi);
  points.sort(comparerAng);
  const estZero = (a: Ang) => zeros.some((z) => memeAng(z, a));

  // Suite alternée : point, intervalle, point, intervalle, …, point
  type Element = { satisfait: boolean; gauche: Ang; droite: Ang; point: boolean };
  const elements: Element[] = [];
  points.forEach((p, i) => {
    const y = estZero(p) ? 0 : g(valeur(p));
    const appartient = i > 0 && i < points.length - 1 ? true : i === 0 ? d.loFerme : d.hiFerme;
    elements.push({ satisfait: appartient && verifie(op, y), gauche: p, droite: p, point: true });
    if (i < points.length - 1) {
      const milieu = (valeur(p) + valeur(points[i + 1])) / 2;
      const ym = g(milieu);
      if (Math.abs(ym) < 1e-9) throw new Error('Racine manquante dans la liste des zéros');
      elements.push({ satisfait: verifie(op, ym), gauche: p, droite: points[i + 1], point: false });
    }
  });

  const union: Union = [];
  let i = 0;
  while (i < elements.length) {
    if (!elements[i].satisfait) {
      i++;
      continue;
    }
    let j = i;
    while (j + 1 < elements.length && elements[j + 1].satisfait) j++;
    const premier = elements[i];
    const dernier = elements[j];
    if (i === j && premier.point) return null; // point isolé
    const intervalle: Intervalle = {
      lo: borneAng(premier.gauche),
      hi: borneAng(dernier.droite),
      loFerme: premier.point,
      hiFerme: dernier.point,
    };
    union.push(intervalle);
    i = j + 1;
  }
  return union;
}

/* ---------- Signe de g sur chaque intervalle (pour les corrections) ---------- */

export type SigneSurIntervalle = { gauche: Ang; droite: Ang; positif: boolean };

/** Signe de g entre deux racines consécutives (ou une racine et une borne du domaine). */
export function signes(g: (x: number) => number, zeros: Ang[], d: Domaine): SigneSurIntervalle[] {
  const points: Ang[] = [d.lo, ...zeros.filter((z) => comparerAng(z, d.lo) > 0 && comparerAng(z, d.hi) < 0), d.hi].sort(comparerAng);
  const res: SigneSurIntervalle[] = [];
  for (let i = 0; i < points.length - 1; i++) {
    const milieu = (valeur(points[i]) + valeur(points[i + 1])) / 2;
    res.push({ gauche: points[i], droite: points[i + 1], positif: g(milieu) > 0 });
  }
  return res;
}

/** Le nombre x est-il dans le domaine ? (comparaison avec une petite tolérance) */
export function dansDomaineNum(x: number, d: Domaine): boolean {
  const lo = valeur(d.lo);
  const hi = valeur(d.hi);
  const e = 1e-9;
  return (x > lo + e || (d.loFerme && Math.abs(x - lo) <= e)) && (x < hi - e || (d.hiFerme && Math.abs(x - hi) <= e));
}
