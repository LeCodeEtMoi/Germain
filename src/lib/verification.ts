// Fonctions de comparaison entre la saisie de l'élève et la réponse attendue.
// « incompris » : la saisie est illisible, elle n'est pas comptée comme fausse.
import { lireNombre, normaliser } from "./crypto";

export type Verdict = "correct" | "faux" | "incompris";

/** Compare deux textes en ignorant espaces, ponctuation, accents et casse. */
export function verifierTexte(attendu: string, garderEspace = false) {
  return (saisie: string): Verdict => {
    const s = normaliser(saisie, garderEspace);
    if (s === "") return "incompris";
    return s === normaliser(attendu, garderEspace) ? "correct" : "faux";
  };
}

/** Comme verifierTexte, mais tolère l'absence des « _ » de complétion à la fin. */
export function verifierTexteAvecBourrage(attendu: string) {
  return (saisie: string): Verdict => {
    const s = normaliser(saisie, true).replace(/_+$/, "");
    if (s === "") return "incompris";
    return s === normaliser(attendu, true).replace(/_+$/, "") ? "correct" : "faux";
  };
}

/** Une suite de chiffres binaires de longueur donnée. */
export function verifierBits(attendu: string) {
  return (saisie: string): Verdict => {
    const s = saisie.replace(/\s/g, "");
    if (!/^[01]+$/.test(s) || s.length !== attendu.length) return "incompris";
    return s === attendu ? "correct" : "faux";
  };
}

/** Un nombre, avec une tolérance relative (0 = valeur exacte). */
export function verifierNombre(attendu: number, toleranceRelative = 0) {
  return (saisie: string): Verdict => {
    const n = lireNombre(saisie);
    if (n === null) return "incompris";
    const ecart = Math.abs(n - attendu);
    return ecart <= Math.max(toleranceRelative * Math.abs(attendu), 1e-12) ? "correct" : "faux";
  };
}

/** Une liste d'entiers, dans l'ordre (ordre = true) ou non. */
export function verifierListe(attendu: number[], ordre = true) {
  return (saisie: string): Verdict => {
    const nombres = (saisie.match(/\d+/g) ?? []).map(Number);
    if (nombres.length === 0) return "incompris";
    const a = ordre ? nombres : [...nombres].sort((x, y) => x - y);
    const b = ordre ? attendu : [...attendu].sort((x, y) => x - y);
    return a.length === b.length && a.every((v, i) => v === b[i]) ? "correct" : "faux";
  };
}
