/**
 * Point d'entrée UNIQUE des exercices de Prépa 2ᵉ année.
 *
 * Tous les fichiers Ex_*_P2.tsx importent leurs outils depuis ce fichier.
 * Si l'un de ces chemins ne correspond pas à l'organisation de ton projet,
 * c'est ICI (et seulement ici) qu'il faut le corriger.
 */
export { useTirage, Chargement, Cadre, Titre, Enonce } from '@/components/exercice/ExerciceUI.tsx';
export { default as Questions, type Question } from '@/components/exercice/Questions.tsx';
export { default as MathTex } from '@/components/math/MathTex.tsx';
export { entier, choisir, melanger, signeAleatoire, nombre, entreParentheses, fraction, texteFraction, type Fraction } from '@/lib/maths.ts';
export { attenduFraction, AIDE_FRACTION, texFrac } from '@/lib/reponses.ts';
export * from '@/lib/prepa.ts';
