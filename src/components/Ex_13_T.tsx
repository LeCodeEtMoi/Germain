import { useState } from 'react';
import {
  Astuce, Boutons, Calcul, Cadre, Chargement, Choix, Correction, Donnees, Enonce, Formulaire, MessageIncompris, MessageSucces,
  Retour, Titre, ZoneRetour, useTirage,
} from './ExerciceUI.tsx';
import {
  type Vec3, choisir, combinaison, entier, entreParentheses, nombre, triplet, vecAleatoire, vecCross, vecDot, vecNul,
} from '../lib/maths.ts';

/**
 * Exercice : position relative de deux plans.
 *
 * (P1) : a1x + b1y + c1z + d1 = 0 ; (P2) : a2x + b2y + c2z + d2 = 0.
 * Quatre cas, tirés avec la même probabilité :
 *   - confondus ; strictement parallèles (n⃗2 = k·n⃗1)
 *   - sécants et perpendiculaires (n⃗1 · n⃗2 = 0)
 *   - sécants et non perpendiculaires
 * La bonne réponse est CALCULÉE à partir des équations affichées.
 */

/* ===== Logique ===== */

export type Position = 'confondus' | 'paralleles' | 'perpendiculaires' | 'secants';

export type Plan = { n: Vec3; d: number };
export type Exercice = { P1: Plan; P2: Plan };

/** Position réelle des deux plans, d'après leurs équations. */
export function position({ P1, P2 }: Exercice): Position {
  if (vecNul(vecCross(P1.n, P2.n))) {
    // normaux colinéaires : n2 = k·n1 avec k = rapport d'une coordonnée non nulle
    const i = P1.n.findIndex((c) => c !== 0);
    const k = P2.n[i] / P1.n[i];
    return P2.d === k * P1.d ? 'confondus' : 'paralleles';
  }
  return vecDot(P1.n, P2.n) === 0 ? 'perpendiculaires' : 'secants';
}

export function genererExercice(voulu: Position = choisir<Position>(['confondus', 'paralleles', 'perpendiculaires', 'secants'])): Exercice {
  for (;;) {
    const n1 = vecAleatoire(-3, 3);
    if (vecNul(n1)) continue;
    const d1 = entier(-6, 6);
    let P2: Plan;
    if (voulu === 'confondus' || voulu === 'paralleles') {
      const k = choisir([-3, -2, 2, 3]);
      const n2: Vec3 = [k * n1[0], k * n1[1], k * n1[2]];
      P2 = { n: n2, d: voulu === 'confondus' ? k * d1 : k * d1 + choisir([-1, 1]) * entier(1, 4) };
    } else {
      const n2 = vecAleatoire(-3, 3);
      if (vecNul(n2) || vecNul(vecCross(n1, n2))) continue;
      if ((vecDot(n1, n2) === 0) !== (voulu === 'perpendiculaires')) continue;
      P2 = { n: n2, d: entier(-6, 6) };
    }
    const exo = { P1: { n: n1, d: d1 }, P2 };
    if (position(exo) !== voulu) continue;
    return exo;
  }
}

export const equationPlan = ({ n, d }: Plan) => `${combinaison([[n[0], 'x'], [n[1], 'y'], [n[2], 'z'], [d, '']])} = 0`;

const LIBELLES: Record<Position, string> = {
  confondus: 'confondus',
  paralleles: 'strictement parallèles',
  perpendiculaires: 'sécants et perpendiculaires',
  secants: 'sécants et non perpendiculaires',
};

/* ===== Affichage ===== */

export default function PlanPlan() {
  const [exo, regenerer] = useTirage(genererExercice);
  const [reponse, setReponse] = useState<string | null>(null);
  const [retour, setRetour] = useState<null | 'vide' | 'correct' | 'faux'>(null);

  if (!exo) return <Chargement />;

  const { P1, P2 } = exo;
  const juste = position(exo);
  const produitScalaire = vecDot(P1.n, P2.n);
  const colineaires = juste === 'confondus' || juste === 'paralleles';
  const i = P1.n.findIndex((c) => c !== 0);
  const k = P2.n[i] / P1.n[i];

  function valider() {
    if (reponse === null) return setRetour('vide');
    setRetour(reponse === juste ? 'correct' : 'faux');
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
        <p>Dans l'espace muni d'un repère orthonormé, on considère les deux plans suivants.</p>
      </Enonce>
      <Donnees elements={[['Plan (P₁)', equationPlan(P1)], ['Plan (P₂)', equationPlan(P2)]]} />

      <Formulaire onValider={valider}>
        <Choix
          legende="Les plans (P₁) et (P₂) sont :"
          valeur={reponse}
          onChange={setReponse}
          options={(Object.keys(LIBELLES) as Position[]).map((valeur) => ({ valeur, contenu: LIBELLES[valeur] }))}
        />
        <Boutons onNouveau={nouvelExercice} />
      </Formulaire>

      <ZoneRetour>
        {retour === 'vide' && <MessageIncompris raison="Choisis une réponse avant de valider." />}
        {retour === 'correct' && (
          <MessageSucces>
            <p>
              Avec n⃗₁ {triplet(P1.n)} et n⃗₂ {triplet(P2.n)}, les plans sont {LIBELLES[juste]}.
            </p>
          </MessageSucces>
        )}
        {retour === 'faux' && (
          <Retour type="faux">
            <p>Oups, une erreur s'est glissée. Les plans sont {LIBELLES[juste]}.</p>
            <Correction>
              <li>
                On lit les vecteurs normaux sur les équations : <Calcul>n⃗₁ {triplet(P1.n)}</Calcul> et{' '}
                <Calcul>n⃗₂ {triplet(P2.n)}</Calcul>.
              </li>
              {colineaires ? (
                <>
                  <li>
                    Les coordonnées sont proportionnelles : <Calcul>n⃗₂ = {nombre(k)} × n⃗₁</Calcul>. Les vecteurs normaux sont
                    colinéaires, donc les plans sont parallèles ou confondus.
                  </li>
                  <li>
                    Pour trancher, on multiplie l'équation de (P₁) par {nombre(k)} : les coefficients de x, y, z deviennent ceux de
                    (P₂), et la constante devient <Calcul>{nombre(k)} × {entreParentheses(P1.d)} = {nombre(k * P1.d)}</Calcul>.
                  </li>
                  <li>
                    {juste === 'confondus'
                      ? `La constante de (P₂) est ${nombre(P2.d)} : c'est la même. Les deux équations sont proportionnelles, les plans sont confondus.`
                      : `La constante de (P₂) est ${nombre(P2.d)}, différente de ${nombre(k * P1.d)}. Les plans sont parallèles et distincts : strictement parallèles.`}
                  </li>
                </>
              ) : (
                <>
                  <li>
                    Les coordonnées ne sont pas proportionnelles : n⃗₁ et n⃗₂ ne sont pas colinéaires. Les plans ne sont donc ni
                    parallèles ni confondus : ils sont sécants.
                  </li>
                  <li>
                    On calcule le produit scalaire :{' '}
                    <Calcul>
                      n⃗₁ · n⃗₂ = {P1.n.map((c, j) => `${entreParentheses(c)}×${entreParentheses(P2.n[j])}`).join(' + ')} ={' '}
                      {nombre(produitScalaire)}
                    </Calcul>
                    .
                  </li>
                  <li>
                    {produitScalaire === 0
                      ? 'Il est nul : les vecteurs normaux sont orthogonaux, donc les plans sont perpendiculaires.'
                      : "Il n'est pas nul : les vecteurs normaux ne sont pas orthogonaux, donc les plans ne sont pas perpendiculaires."}
                  </li>
                </>
              )}
            </Correction>
            <Astuce titre="Pour réussir la prochaine fois">
              <ul>
                <li>Commence toujours par tester la colinéarité des vecteurs normaux (plans parallèles ou confondus).</li>
                <li>Deux plans parallèles sont confondus seulement si toute l'équation est proportionnelle, constante comprise.</li>
                <li>Deux plans sont perpendiculaires si et seulement si leurs vecteurs normaux sont orthogonaux (produit scalaire nul).</li>
              </ul>
            </Astuce>
          </Retour>
        )}
      </ZoneRetour>
    </Cadre>
  );
}
