import { analyser, deriver, equivalents, evaluer, rapportConstant, type Fraction } from './maths.ts';

/**
 * Outils de correction partagés par les exercices 31 à 50.
 */

export type ResultatExpression = { ok: true } | { ok: false; incompris?: string; indice?: string };

/** Écrit un rapport sous forme de fraction simple quand c'est possible (2, 1/3, −0,5 → −1/2…). */
export function texteRapport(k: number): string {
  for (let d = 1; d <= 12; d++) {
    const n = Math.round(k * d);
    if (Math.abs(k - n / d) < 1e-7) return d === 1 ? String(n) : `${n}/${d}`;
  }
  return String(Math.round(k * 1000) / 1000);
}

/**
 * Valeur attendue + tolérance pour une réponse rationnelle.
 * Un nombre décimal exact (dénominateur 2, 4, 5, 8, 10…) doit être donné exactement.
 * Sinon (1/3, 7/12…), la fraction exacte ou un arrondi au centième est accepté.
 */
export function attenduFraction({ n, d }: Fraction): { attendu: number; tolerance: number } {
  let reste = d;
  while (reste % 2 === 0) reste /= 2;
  while (reste % 5 === 0) reste /= 5;
  return { attendu: n / d, tolerance: reste === 1 ? 0 : 0.0051 };
}

export const AIDE_FRACTION = 'Donne la valeur exacte (entier, décimal ou fraction comme 7/3). Si elle n’est pas décimale, un arrondi au centième est accepté.';

/**
 * F est-elle une primitive de f ? On dérive F (dérivation symbolique) et on compare à f en plusieurs points.
 * La constante « + C » est facultative.
 */
export function verifierPrimitive(f: string, saisie: string, points: number[]): ResultatExpression {
  const lu = analyser(saisie.replace(/^\s*F\s*(\(x\))?\s*=/i, ''), { variables: ['x'], constantes: ['c'] });
  if (!lu.ok) return { ok: false, incompris: lu.message };
  const ref = analyser(f, { variables: ['x'] });
  if (!ref.ok) throw new Error(`Fonction illisible : ${f}`);
  const derivee = deriver(lu.noeud, 'x');
  if (equivalents(derivee, ref.noeud, 'x', points)) return { ok: true };
  const k = rapportConstant(derivee, ref.noeud, 'x', points);
  if (k !== null && Math.abs(k) < 1e-9) return { ok: false, indice: 'Ta réponse est une constante : sa dérivée est nulle, ce n’est pas f(x).' };
  if (k !== null) return { ok: false, indice: `En dérivant ta réponse, on obtient ${texteRapport(k)} × f(x) : il faut corriger le coefficient (divise ta réponse par ${texteRapport(k)}).` };
  return { ok: false, indice: 'En dérivant ta réponse, on ne retrouve pas f(x) : ce n’est pas une primitive de f.' };
}

/** La fonction saisie (variable v, constante libre c) vérifie-t-elle residu(t, y, y') = 0 pour toute valeur de c ? */
export function verifieResidu(
  saisie: string,
  variable: string,
  residu: (t: number, y: number, dy: number) => number,
  points: number[]
): { lecture: ReturnType<typeof analyser>; verifie: boolean; avecConstante: boolean } {
  const lecture = analyser(saisie, { variables: [variable], constantes: ['c'] });
  if (!lecture.ok) return { lecture, verifie: false, avecConstante: false };
  const dy = deriver(lecture.noeud, variable);
  const verifie = [1.2345, 0.7, -2.1].every((c) =>
    points.every((t) => {
      const y = evaluer(lecture.noeud, { [variable]: t, c });
      const d = evaluer(dy, { [variable]: t, c });
      const r = residu(t, y, d);
      return Number.isFinite(r) && Math.abs(r) <= 1e-7 * Math.max(1, Math.abs(y), Math.abs(d));
    })
  );
  const avecConstante = evaluer(lecture.noeud, { [variable]: 0.5, c: 1 }) !== evaluer(lecture.noeud, { [variable]: 0.5, c: 2 });
  return { lecture, verifie, avecConstante };
}

/** Fraction en TeX avec son signe : 7/3 → \frac{7}{3} ; −1/2 → -\frac{1}{2} ; 4 → 4. */
export const texFrac = ({ n, d }: Fraction): string => (d === 1 ? `${n}` : `${n < 0 ? '-' : ''}\\frac{${Math.abs(n)}}{${d}}`);

/** Nombre entre parenthèses s'il est négatif (pour les calculs écrits en TeX). */
export const parTex = (n: number): string => (n < 0 ? `(${n})` : `${n}`);

/**
 * La saisie (fonction de `variable`) est-elle égale à `cible` en plusieurs points ?
 * `alternatives` : réponses fausses classiques, avec l'indice à donner si l'élève en a écrit une.
 */
export function verifierFonction(
  saisie: string,
  cible: string,
  variable: string,
  points: number[],
  options: { retirer?: RegExp; alternatives?: { ascii: string; indice: string }[]; indiceDefaut?: string } = {}
): ResultatExpression {
  const texte = options.retirer ? saisie.replace(options.retirer, '') : saisie;
  const lu = analyser(texte, { variables: [variable] });
  if (!lu.ok) return { ok: false, incompris: lu.message };
  const lire = (s: string) => {
    const a = analyser(s, { variables: [variable] });
    if (!a.ok) throw new Error(`Expression illisible : ${s}`);
    return a.noeud;
  };
  if (equivalents(lu.noeud, lire(cible), variable, points)) return { ok: true };
  for (const alt of options.alternatives ?? []) {
    if (equivalents(lu.noeud, lire(alt.ascii), variable, points)) return { ok: false, indice: alt.indice };
  }
  return { ok: false, indice: options.indiceDefaut ?? 'Ton expression ne donne pas les mêmes valeurs que la bonne : vérifie le développement terme à terme.' };
}
