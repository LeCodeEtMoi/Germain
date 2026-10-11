/**
 * Niveaux scolaires de Germain, partagés par les pages « Exercices » et « Leçons ».
 *
 * Pour ajouter ou renommer un niveau, on ne modifie que ce fichier.
 *
 * Où mettre les fichiers de chaque niveau :
 *   - exercices : composants dans   src/exercices/<dossier>/Ex_*.tsx
 *                 liste du niveau :  src/pages/exercices/<slug>.astro
 *   - leçons    : pages dans        src/pages/lecons/<slug>/<nom>.astro   (avec un bloc `leconMeta`)
 *                 liste du niveau :  générée automatiquement (src/pages/lecons/[niveau].astro)
 */
import fs from 'node:fs';
import path from 'node:path';

export type Niveau = {
  /** Adresse : /exercices/<slug>/ et /lecons/<slug>/ */
  slug: string;
  /** Pastille courte */
  court: string;
  nom: string;
  resume: string;
  /** Dossier des composants d'exercices, dans src/exercices/ */
  dossier: string;
};

export type Cycle = { id: string; nom: string; niveaux: Niveau[] };

export const cycles: Cycle[] = [
  {
    id: 'college',
    nom: 'Collège',
    niveaux: [
      { slug: '6eme', court: '6ᵉ', nom: 'Sixième', resume: 'Nombres, fractions, premières figures.', dossier: 'college/6eme' },
      { slug: '5eme', court: '5ᵉ', nom: 'Cinquième', resume: 'Calcul littéral, symétries, proportionnalité.', dossier: 'college/5eme' },
      { slug: '4eme', court: '4ᵉ', nom: 'Quatrième', resume: 'Puissances, Pythagore, équations.', dossier: 'college/4eme' },
      { slug: '3eme', court: '3ᵉ', nom: 'Troisième', resume: 'Fonctions, Thalès, préparation du brevet.', dossier: 'college/3eme' },
    ],
  },
  {
    id: 'lycee',
    nom: 'Lycée',
    niveaux: [
      { slug: 'seconde', court: '2ⁿᵈᵉ', nom: 'Seconde', resume: 'Fonctions, vecteurs, probabilités.', dossier: 'lycee/seconde' },
      { slug: 'premiere', court: '1ʳᵉ', nom: 'Première', resume: 'Dérivation, suites, second degré.', dossier: 'lycee/premiere' },
      { slug: 'terminale', court: 'Tˡᵉ', nom: 'Terminale', resume: 'Limites, intégrales, logarithme, probabilités…', dossier: 'lycee/terminale' },
    ],
  },
  {
    id: 'superieur',
    nom: 'Études supérieures',
    niveaux: [
      { slug: 'superieur', court: 'Sup', nom: 'Supérieur', resume: 'Analyse, algèbre linéaire, probabilités.', dossier: 'superieur' },
    ],
  },
];

export const tousNiveaux: Niveau[] = cycles.flatMap((c) => c.niveaux);

/* ---------- Comptage (lu au moment du build) ---------- */

const racine = process.cwd();

/** Nombre d'exercices d'un niveau : fichiers Ex_*.tsx de src/exercices/<dossier>/ */
export function compterExercices(niveau: Niveau): number {
  const dossier = path.join(racine, 'src/exercices', niveau.dossier);
  return fs.existsSync(dossier) ? fs.readdirSync(dossier).filter((f) => /^Ex_.*\.tsx$/.test(f)).length : 0;
}

/** Pages de leçons d'un niveau : fichiers .astro de src/pages/lecons/<slug>/ (hors index et fichiers _privés) */
export function fichiersLecons(niveau: Niveau): string[] {
  const dossier = path.join(racine, 'src/pages/lecons', niveau.slug);
  if (!fs.existsSync(dossier)) return [];
  return fs
    .readdirSync(dossier)
    .filter((f) => f.endsWith('.astro') && f !== 'index.astro' && !f.startsWith('_') && !f.includes('['))
    .sort((a, b) => a.localeCompare(b, 'fr', { numeric: true }));
}

export const compterLecons = (niveau: Niveau): number => fichiersLecons(niveau).length;

export function lireFichierLecon(niveau: Niveau, fichier: string): string {
  return fs.readFileSync(path.join(racine, 'src/pages/lecons', niveau.slug, fichier), 'utf8');
}

/**
 * Lit le bloc `const <nom> = { ... }` d'une page .astro (sans exécuter le code) :
 * une propriété par ligne, texte sur une seule ligne, accolade fermante seule en début de ligne.
 */
export function lireMeta(source: string, nom: string): Record<string, string | number> | null {
  const bloc = source.match(new RegExp(`const\\s+${nom}\\s*=\\s*\\{([\\s\\S]*?)^\\}`, 'm'))?.[1];
  if (bloc === undefined) return null;
  const meta: Record<string, string | number> = {};
  const propriete = /^\s*([A-Za-z_]\w*)\s*:\s*(?:(['"`])((?:\\.|(?!\2)[^\\])*)\2|(-?\d+(?:\.\d+)?))\s*,?\s*(?:\/\/.*)?$/gm;
  for (const m of bloc.matchAll(propriete)) {
    meta[m[1]] = m[4] !== undefined ? Number(m[4]) : m[3].replace(/\\(.)/g, '$1');
  }
  return meta;
}

export const pluriel = (n: number, unite: string) => `${n} ${unite}${n > 1 ? 's' : ''}`;