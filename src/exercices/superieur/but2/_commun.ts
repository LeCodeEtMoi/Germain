/**
 * Point d'entrée des exercices de BUT Informatique 2ᵉ année.
 * Il reprend celui de la Prépa 2ᵉ année : si les chemins d'import doivent être corrigés,
 * c'est dans  ../prepa2/_commun.ts  qu'il faut le faire (un seul fichier pour les deux sections).
 */
export * from '../prepa2/_commun.ts';

/* Outils propres au BUT 2 (arrondi, phi, QUANTILES, texDec, txtDec…) :
   sans cette ligne, Ex_8_B2 et Ex_9_B2 ne compilent pas. */
export * from '@/lib/but.ts';
