import { valeurDuTexte } from './maths.ts';
import { type LectureUnion, type Union, lireInegalite, lireUnion } from './intervalles.ts';

/**
 * Lecture des réponses des exercices d'équations et d'inéquations (ln, exp).
 */

export type LectureSolution = { ok: true; vide: true } | { ok: true; vide: false; v: number } | { ok: false; message: string };

/** Équation à une seule solution : « 3 », « x = (e^2-1)/3 », « S = {ln(5)/2} », « ∅ ». */
export function lireSolution(saisie: string): LectureSolution {
  const t = saisie
    .replace(/[−–—]/g, '-')
    .replace(/[{}]/g, ' ')
    .replace(/^\s*s\s*=/i, '')
    .replace(/^\s*x\s*=/i, '')
    .trim();
  if (t === '') return { ok: false, message: 'Écris ta réponse avant de valider.' };
  if (/^(∅|vide|aucune?(\s+solution)?|pas\s+de\s+solution)$/i.test(t)) return { ok: true, vide: true };
  const v = valeurDuTexte(t);
  if (v === null) return { ok: false, message: `Je ne comprends pas « ${t} ». Écris un nombre ou une expression comme (e^2-1)/3 ou ln(5)/2.` };
  return { ok: true, vide: false, v };
}

/** Inéquation : « x > 3 » ou un intervalle comme « ]3 ; +∞[ ». */
export function lireEnsemble(saisie: string): LectureUnion {
  if (saisie.trim() === '') return { ok: false, message: 'Écris ta réponse avant de valider.' };
  const demi = lireInegalite(saisie);
  if (demi) return { ok: true, union: demi };
  return lireUnion(saisie);
}

export const procheNombre = (x: number, y: number) => Math.abs(x - y) <= 1e-9 * Math.max(1, Math.abs(x), Math.abs(y));

export type { Union };
