import { useState } from 'react';
import {
  Astuce, Boutons, Cadre, Calcul, Choix, Chargement, Correction, Donnees, Enonce, Formulaire,
  MessageIncompris, MessageSucces, Retour, Titre, ZoneRetour, useTirage,
} from './ExerciceUI.tsx';
import {
  colineaires, entier, entreParentheses, nombre, produitMixte, triplet, vecAleatoire, vecAdd, vecCross, vecDot,
  vecScale, vecSub, type Vec3,
} from '../lib/maths.ts';

/**
 * Exercice : quatre points sont-ils coplanaires ?
 *
 * Maths : A, B, C ne sont pas alignés (on le garantit au tirage). Alors
 *   A, B, C, D coplanaires  ⇔  AD ∈ Vect(AB, AC)  ⇔  AD · (AB ∧ AC) = 0.
 * Le produit mixte est calculé en entiers : aucun arrondi, la réponse attendue
 * est toujours exacte. On tire un cas coplanaire une fois sur deux (D = A + s·AB + t·AC).
 */

/* ===== Logique ===== */

export type Exercice = { A: Vec3; B: Vec3; C: Vec3; D: Vec3 };

const horsLimites = (p: Vec3, max: number) => p.some((c) => Math.abs(c) > max);
const egaux = (p: Vec3, q: Vec3) => p[0] === q[0] && p[1] === q[1] && p[2] === q[2];

export function genererExercice(coplanaire = Math.random() < 0.5): Exercice {
  for (;;) {
    const A = vecAleatoire(-4, 4);
    const u = vecAleatoire(-2, 2);
    const v = vecAleatoire(-2, 2);
    if (colineaires(u, v)) continue; // u ou v nul, ou alignés : A, B, C seraient alignés
    const B = vecAdd(A, u);
    const C = vecAdd(A, v);
    const D = coplanaire
      ? vecAdd(A, vecAdd(vecScale(u, entier(-2, 2)), vecScale(v, entier(-2, 2))))
      : vecAleatoire(-6, 6);
    if (horsLimites(D, 9) || [A, B, C].some((p) => egaux(p, D))) continue;
    // Le cas tiré doit être celui qu'on voulait
    if ((produitMixte(u, v, vecSub(D, A)) === 0) !== coplanaire) continue;
    return { A, B, C, D };
  }
}

/** Vrai si les quatre points sont dans un même plan (A, B, C non alignés). */
export const sontCoplanaires = ({ A, B, C, D }: Exercice) =>
  produitMixte(vecSub(B, A), vecSub(C, A), vecSub(D, A)) === 0;

/* ===== Affichage ===== */

type Reponse = 'oui' | 'non';

export default function Coplanarite() {
  const [exo, regenerer] = useTirage(genererExercice);
  const [reponse, setReponse] = useState<string | null>(null);
  const [retour, setRetour] = useState<null | 'vide' | 'correct' | 'faux'>(null);

  if (!exo) return <Chargement />;

  const { A, B, C, D } = exo;
  const AB = vecSub(B, A);
  const AC = vecSub(C, A);
  const AD = vecSub(D, A);
  const produit = vecCross(AB, AC);
  const mixte = vecDot(AD, produit);
  const coplanaire = mixte === 0;

  function valider() {
    if (reponse === null) return setRetour('vide');
    setRetour((reponse as Reponse) === (coplanaire ? 'oui' : 'non') ? 'correct' : 'faux');
  }

  function nouvelExercice() {
    regenerer();
    setReponse(null);
    setRetour(null);
  }

  return (
    <Cadre>
      <Titre />
      <Enonce>
        <p>Dans un repère de l'espace, on considère les points suivants. Les points A, B, C, D sont-ils coplanaires ?</p>
      </Enonce>
      <Donnees
        elements={[
          ['Point A', triplet(A)],
          ['Point B', triplet(B)],
          ['Point C', triplet(C)],
          ['Point D', triplet(D)],
        ]}
      />

      <Formulaire onValider={valider}>
        <Choix
          legende="Ta réponse"
          enLigne
          valeur={reponse}
          onChange={(v) => setReponse(v)}
          options={[
            { valeur: 'oui', contenu: 'Oui, ils sont coplanaires' },
            { valeur: 'non', contenu: 'Non, ils ne sont pas coplanaires' },
          ]}
        />
        <Boutons onNouveau={nouvelExercice} />
      </Formulaire>

      <ZoneRetour>
        {retour === 'vide' && <MessageIncompris raison="Choisis une réponse avant de valider." />}
        {retour === 'correct' && (
          <MessageSucces>
            <p>
              En effet, AD · (AB ∧ AC) = {nombre(mixte)}
              {coplanaire ? " : le produit mixte est nul, D est dans le plan (ABC)." : " ≠ 0 : D n'est pas dans le plan (ABC)."}
            </p>
          </MessageSucces>
        )}
        {retour === 'faux' && (
          <Retour type="faux">
            <p>
              Oups, une erreur s'est glissée. Les points {coplanaire ? 'sont' : 'ne sont pas'} coplanaires.
            </p>
            <Correction>
              <li>
                On calcule deux vecteurs et un troisième :{' '}
                <Calcul>AB = {triplet(AB)}</Calcul>, <Calcul>AC = {triplet(AC)}</Calcul>, <Calcul>AD = {triplet(AD)}</Calcul>.
              </li>
              <li>
                A, B, C ne sont pas alignés (AB et AC ne sont pas colinéaires). Les quatre points sont donc coplanaires
                exactement quand AD est dans le plan (ABC), c'est-à-dire quand le produit mixte{' '}
                <Calcul>AD · (AB ∧ AC)</Calcul> est nul.
              </li>
              <li>
                Produit vectoriel AB ∧ AC :{' '}
                <Calcul>
                  ({entreParentheses(AB[1])}×{entreParentheses(AC[2])} − {entreParentheses(AB[2])}×{entreParentheses(AC[1])} ;{' '}
                  {entreParentheses(AB[2])}×{entreParentheses(AC[0])} − {entreParentheses(AB[0])}×{entreParentheses(AC[2])} ;{' '}
                  {entreParentheses(AB[0])}×{entreParentheses(AC[1])} − {entreParentheses(AB[1])}×{entreParentheses(AC[0])}) ={' '}
                  {triplet(produit)}
                </Calcul>
                .
              </li>
              <li>
                Produit scalaire avec AD :{' '}
                <Calcul>
                  {entreParentheses(AD[0])}×{entreParentheses(produit[0])} + {entreParentheses(AD[1])}×{entreParentheses(produit[1])} +{' '}
                  {entreParentheses(AD[2])}×{entreParentheses(produit[2])} = {nombre(mixte)}
                </Calcul>
                .
              </li>
              <li>
                {coplanaire
                  ? 'Le produit mixte est nul : les points A, B, C, D sont coplanaires.'
                  : `Le produit mixte vaut ${nombre(mixte)}, il est différent de 0 : les points ne sont pas coplanaires.`}
              </li>
            </Correction>
            <Astuce titre="Pour réussir la prochaine fois">
              <ul>
                <li>Pars toujours du même point (ici A) pour écrire les trois vecteurs : B − A, C − A, D − A.</li>
                <li>Attention aux signes dans le produit vectoriel : chaque coordonnée est une différence de deux produits.</li>
                <li>Un produit mixte nul ne dépend pas de l'ordre des points : si tu trouves 0, vérifie en changeant de point de départ.</li>
              </ul>
            </Astuce>
          </Retour>
        )}
      </ZoneRetour>
    </Cadre>
  );
}
