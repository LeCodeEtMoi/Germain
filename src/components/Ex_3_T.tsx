import { useState } from 'react';
import {
  Astuce, Boutons, Cadre, Calcul, Choix, Chargement, Correction, Donnees, Enonce, Formulaire,
  MessageIncompris, MessageSucces, Retour, Titre, ZoneRetour, useTirage,
} from './ExerciceUI.tsx';
import {
  choisir, entier, entreParentheses, nombre, signeAleatoire, triplet, vecAleatoire, vecCross, vecDot,
  vecNul, vecSub, type Vec3,
} from '../lib/maths.ts';

/**
 * Exercice : un vecteur est-il normal au plan (ABC) ?
 *
 * Maths : A, B, C ne sont pas alignés (garanti au tirage). Un vecteur n est
 * normal au plan (ABC) ⇔ n ≠ 0, n · AB = 0 et n · AC = 0.
 * La réponse attendue est toujours recalculée à partir de ces deux produits
 * scalaires, en entiers : même si le tirage « fautif » retombe par hasard sur
 * un vecteur normal, la solution reste exacte.
 */

/* ===== Logique ===== */

export type Exercice = { A: Vec3; B: Vec3; C: Vec3; n: Vec3 };

const pgcd = (a: number, b: number): number => (b === 0 ? Math.abs(a) : pgcd(b, a % b));

export function estNormal({ A, B, C, n }: Exercice) {
  return !vecNul(n) && vecDot(n, vecSub(B, A)) === 0 && vecDot(n, vecSub(C, A)) === 0;
}

export function genererExercice(normal = Math.random() < 0.5): Exercice {
  for (;;) {
    const A = vecAleatoire(-3, 3);
    const B = vecAleatoire(-3, 3);
    const C = vecAleatoire(-3, 3);
    const produit = vecCross(vecSub(B, A), vecSub(C, A));
    if (vecNul(produit)) continue; // A, B, C alignés (ou confondus) : pas de plan
    const d = pgcd(pgcd(produit[0], produit[1]), produit[2]);
    const n0 = produit.map((c) => c / d) as Vec3; // vecteur normal « réduit »
    if (n0.some((c) => Math.abs(c) > 12)) continue; // nombres raisonnables

    let n: Vec3;
    if (normal) {
      n = n0.map((c) => c * choisir([1, 1, -1, 2])) as Vec3; // un multiple est aussi normal
    } else {
      n = [...n0] as Vec3;
      n[entier(0, 2)] += entier(1, 3) * signeAleatoire();
    }
    if (vecNul(n) || n.some((c) => Math.abs(c) > 14)) continue; // n nul : pas un vecteur normal, et l'énoncé serait ambigu

    const exo = { A, B, C, n };
    if (estNormal(exo) !== normal) continue; // le cas tiré doit être celui voulu
    return exo;
  }
}

/* ===== Affichage ===== */

export default function VecteurNormal() {
  const [exo, regenerer] = useTirage(genererExercice);
  const [reponse, setReponse] = useState<string | null>(null);
  const [retour, setRetour] = useState<null | 'vide' | 'correct' | 'faux'>(null);

  if (!exo) return <Chargement />;

  const { A, B, C, n } = exo;
  const AB = vecSub(B, A);
  const AC = vecSub(C, A);
  const sAB = vecDot(n, AB);
  const sAC = vecDot(n, AC);
  const normal = estNormal(exo);

  function valider() {
    if (reponse === null) return setRetour('vide');
    setRetour((reponse === 'oui') === normal ? 'correct' : 'faux');
  }

  function nouvelExercice() {
    regenerer();
    setReponse(null);
    setRetour(null);
  }

  const produitScalaire = (v: Vec3) =>
    `${entreParentheses(n[0])}×${entreParentheses(v[0])} + ${entreParentheses(n[1])}×${entreParentheses(v[1])} + ${entreParentheses(n[2])}×${entreParentheses(v[2])}`;

  return (
    <Cadre>
      <Titre />
      <Enonce>
        <p>
          Dans un repère orthonormé de l'espace, les points A, B, C ne sont pas alignés. Le vecteur n⃗ est-il normal au plan
          (ABC) ?
        </p>
      </Enonce>
      <Donnees
        elements={[
          ['Point A', triplet(A)],
          ['Point B', triplet(B)],
          ['Point C', triplet(C)],
          ['Vecteur n⃗', triplet(n)],
        ]}
      />

      <Formulaire onValider={valider}>
        <Choix
          legende="Ta réponse"
          enLigne
          valeur={reponse}
          onChange={setReponse}
          options={[
            { valeur: 'oui', contenu: 'Oui, n⃗ est normal au plan (ABC)' },
            { valeur: 'non', contenu: "Non, n⃗ n'est pas normal" },
          ]}
        />
        <Boutons onNouveau={nouvelExercice} />
      </Formulaire>

      <ZoneRetour>
        {retour === 'vide' && <MessageIncompris raison="Choisis une réponse avant de valider." />}
        {retour === 'correct' && (
          <MessageSucces>
            <p>
              n⃗ · AB = {nombre(sAB)} et n⃗ · AC = {nombre(sAC)}
              {normal ? " : les deux produits scalaires sont nuls, n⃗ est bien normal au plan." : " : au moins l'un n'est pas nul, n⃗ n'est pas normal."}
            </p>
          </MessageSucces>
        )}
        {retour === 'faux' && (
          <Retour type="faux">
            <p>
              Oups, une erreur s'est glissée. Le vecteur n⃗ {normal ? 'est' : "n'est pas"} normal au plan (ABC).
            </p>
            <Correction>
              <li>
                n⃗ est normal au plan (ABC) s'il est orthogonal à deux vecteurs non colinéaires du plan, par exemple AB et AC (ils
                ne sont pas colinéaires car A, B, C ne sont pas alignés).
              </li>
              <li>
                <Calcul>AB = {triplet(AB)}</Calcul> et <Calcul>AC = {triplet(AC)}</Calcul>.
              </li>
              <li>
                <Calcul>
                  n⃗ · AB = {produitScalaire(AB)} = {nombre(sAB)}
                </Calcul>
                .
              </li>
              <li>
                <Calcul>
                  n⃗ · AC = {produitScalaire(AC)} = {nombre(sAC)}
                </Calcul>
                .
              </li>
              <li>
                {normal
                  ? 'Les deux produits scalaires sont nuls : n⃗ est orthogonal à AB et à AC, donc normal au plan (ABC).'
                  : `${sAB !== 0 && sAC !== 0 ? "Aucun des deux produits scalaires n'est nul" : "L'un des deux produits scalaires n'est pas nul"} : n⃗ n'est pas orthogonal à tout le plan, il n'est donc pas normal.`}
              </li>
            </Correction>
            <Astuce titre="Pour réussir la prochaine fois">
              <ul>
                <li>Il faut les deux produits scalaires nuls : un seul ne suffit pas.</li>
                <li>Un multiple d'un vecteur normal est encore normal : n⃗ n'a pas besoin d'être égal au produit vectoriel AB ∧ AC.</li>
                <li>Écris les coordonnées négatives entre parenthèses pour ne pas te tromper de signe.</li>
              </ul>
            </Astuce>
          </Retour>
        )}
      </ZoneRetour>
    </Cadre>
  );
}
