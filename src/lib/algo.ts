import { analyser, evaluer } from './maths.ts';

/**
 * Outils pour les exercices d'algorithmique (Python).
 */

/** Écrit un nombre comme Python l'affiche : 175.0 pour un flottant entier, 175 pour un entier. */
export const pyNombre = (x: number, flottant: boolean) => (flottant && Number.isInteger(x) ? `${x}.0` : String(x));

/* ---------- Condition d'une boucle while saisie par l'élève ---------- */

type Condition = (env: Record<string, number>) => boolean;
export type LectureCondition = { ok: true; condition: Condition } | { ok: false; message: string };

const COMPARAISON = /(<=|>=|==|!=|<|>)/g;

/**
 * Lit une condition Python simple : « u <= A », « A >= u », « not u > A », « 1.02*u < 4000 »…
 * Une seule comparaison, éventuellement précédée de « not ». `variables` : les noms autorisés (en minuscules).
 */
export function lireCondition(saisie: string, variables: string[]): LectureCondition {
  let texte = saisie.trim().replace(/≤/g, '<=').replace(/≥/g, '>=').replace(/≠/g, '!=');
  if (texte === '') return { ok: false, message: 'Écris la condition de la boucle avant de valider.' };

  let negation = false;
  for (;;) {
    const m = texte.match(/^not\b\s*(.*)$/i);
    if (!m) break;
    negation = !negation;
    texte = m[1].trim();
    const entoure = texte.match(/^\((.*)\)$/);
    if (entoure && !/[()]/.test(entoure[1].replace(/\([^()]*\)/g, ''))) texte = entoure[1].trim();
  }

  const operateurs: string[] = texte.match(COMPARAISON) ?? [];
  if (operateurs.length === 0) return { ok: false, message: 'Une condition compare deux valeurs avec <, <=, >, >=, == ou !=.' };
  if (operateurs.length > 1) return { ok: false, message: 'Écris une seule comparaison (par exemple u <= A).' };
  const [gauche, droite] = texte.split(operateurs[0]);
  if (gauche.trim() === '' || droite.trim() === '') return { ok: false, message: 'Il manque une valeur de chaque côté du signe de comparaison.' };

  const g = analyser(gauche.replace(/\*\*/g, '^'), { variables });
  const d = analyser(droite.replace(/\*\*/g, '^'), { variables });
  if (!g.ok) return { ok: false, message: `À gauche du signe : ${g.message}` };
  if (!d.ok) return { ok: false, message: `À droite du signe : ${d.message}` };
  const op = operateurs[0];
  const condition: Condition = (env) => {
    const x = evaluer(g.noeud, env);
    const y = evaluer(d.noeud, env);
    const r = op === '<' ? x < y : op === '<=' ? x <= y : op === '>' ? x > y : op === '>=' ? x >= y : op === '==' ? x === y : x !== y;
    return negation ? !r : r;
  };
  return { ok: true, condition };
}

/** La condition saisie donne-t-elle le même résultat que la référence pour tous les cas testés ? */
export function memeCondition(condition: Condition, reference: Condition, cas: Record<string, number>[]): boolean {
  return cas.every((env) => condition(env) === reference(env));
}

/** Valeurs de u autour d'un seuil (le seuil lui-même compris : c'est ce qui distingue < de <=). */
export function casAutour(seuil: number, variable = 'u', pas = 0.25, nombre = 40): Record<string, number>[] {
  const cas: Record<string, number>[] = [];
  for (let k = -nombre; k <= nombre; k++) cas.push({ [variable]: seuil + k * pas });
  return cas;
}

/* ---------- Suites définies par récurrence, comparaisons, boucles ---------- */

export type Comparateur = '<' | '<=' | '>' | '>=';

const CONTRAIRES: Record<Comparateur, Comparateur> = { '<': '>=', '<=': '>', '>': '<=', '>=': '<' };
/** Le contraire d'une comparaison : u > A  devient  u <= A. */
export const contraire = (c: Comparateur): Comparateur => CONTRAIRES[c];

export const comparer = (c: Comparateur, x: number, y: number) =>
  c === '<' ? x < y : c === '<=' ? x <= y : c === '>' ? x > y : x >= y;

/** Le signe en TeX : \le, \ge… */
export const texComparateur = (c: Comparateur) => (c === '<=' ? '\\le' : c === '>=' ? '\\ge' : c);

/** Passage d'un terme au suivant : u × k (op « * ») ou u + k (op « + », k peut être négatif). */
export type Pas = { op: '*' | '+'; k: number };

export const appliquerPas = (p: Pas, u: number) => (p.op === '*' ? u * p.k : u + p.k);

/** « u = u * 1.5 », « u = u + 7 », « u = u - 7 » */
export function codePas(p: Pas): string {
  if (p.op === '*') return `u = u * ${p.k}`;
  return p.k < 0 ? `u = u - ${-p.k}` : `u = u + ${p.k}`;
}

const virgule = (x: number) => String(x).replace('.', '{,}');

/** u_{n+1} = 1{,}5 \times u_n, u_{n+1} = u_n + 7, u_{n+1} = u_n - 7 */
export function texPas(p: Pas): string {
  if (p.op === '*') return `u_{n+1} = ${virgule(p.k)} \\times u_n`;
  return `u_{n+1} = u_n ${p.k < 0 ? '-' : '+'} ${Math.abs(p.k)}`;
}

/** Le pas écrit en toutes lettres : « on multiplie par 1,5 », « on ajoute 7 », « on retranche 7 ». */
export function phrasePas(p: Pas): string {
  if (p.op === '*') return `on multiplie par ${String(p.k).replace('.', ',')}`;
  return p.k < 0 ? `on retranche ${-p.k}` : `on ajoute ${p.k}`;
}
