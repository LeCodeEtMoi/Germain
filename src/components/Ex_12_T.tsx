import { useState } from 'react';
import {
  Astuce, Boutons, Calcul, Cadre, Chargement, Choix, Correction, Donnees, Enonce, Formulaire, MessageIncompris, MessageSucces,
  Retour, Systeme, Titre, ZoneRetour, useTirage,
} from './ExerciceUI.tsx';
import {
  type Vec3, choisir, combinaison, entier, entreParentheses, lignesParametriques, nombre, triplet, vecAleatoire, vecCross, vecDot,
  vecNul,
} from '../lib/maths.ts';

/**
 * Exercice : position relative d'une droite et d'un plan.
 *
 * Le plan (P) : ax + by + cz + d = 0, de vecteur normal n⃗(a ; b ; c).
 * La droite (Δ) passe par A, de vecteur directeur u⃗.
 * Quatre cas, tirés avec la même probabilité :
 *   - incluse            : n⃗ · u⃗ = 0 et A ∈ (P)
 *   - strictement parallèle : n⃗ · u⃗ = 0 et A ∉ (P)
 *   - orthogonale        : u⃗ colinéaire à n⃗
 *   - sécante, non orthogonale : n⃗ · u⃗ ≠ 0 et u⃗ non colinéaire à n⃗
 *
 * La bonne réponse (`position`) est CALCULÉE à partir des données affichées, jamais écrite à la main.
 */

/* ===== Logique ===== */

export type Position = 'incluse' | 'parallele' | 'orthogonale' | 'secante';

export type Exercice = { n: Vec3; d: number; A: Vec3; u: Vec3 };

/** Position réelle de la droite par rapport au plan, d'après les données. */
export function position({ n, d, A, u }: Exercice): Position {
  if (vecNul(vecCross(n, u))) return 'orthogonale';
  if (vecDot(n, u) !== 0) return 'secante';
  return vecDot(n, A) + d === 0 ? 'incluse' : 'parallele';
}

export function genererExercice(voulu: Position = choisir<Position>(['incluse', 'parallele', 'orthogonale', 'secante'])): Exercice {
  for (;;) {
    const n = vecAleatoire(-3, 3);
    if (vecNul(n)) continue;
    const A = vecAleatoire(-4, 4);
    const d0 = -vecDot(n, A); // le plan passe par A
    let u: Vec3 | null = null;
    let d = d0;

    if (voulu === 'orthogonale') {
      const k = choisir([-2, -1, 1, 2]);
      u = [k * n[0], k * n[1], k * n[2]];
      d = d0 + entier(-6, 6);
    } else if (voulu === 'secante') {
      u = vecAleatoire(-3, 3);
      if (vecNul(u) || vecDot(n, u) === 0 || vecNul(vecCross(n, u))) continue;
      d = d0 + entier(-6, 6);
    } else {
      // n · u = 0 : on cherche un vecteur directeur orthogonal à n
      const candidats: Vec3[] = [];
      for (let x = -3; x <= 3; x++)
        for (let y = -3; y <= 3; y++)
          for (let z = -3; z <= 3; z++) {
            const v: Vec3 = [x, y, z];
            if (!vecNul(v) && vecDot(n, v) === 0) candidats.push(v);
          }
      if (candidats.length === 0) continue;
      u = choisir(candidats);
      if (voulu === 'parallele') d = d0 + choisir([-1, 1]) * entier(1, 5);
    }
    const exo: Exercice = { n, d, A, u };
    if (position(exo) !== voulu) continue;
    return exo;
  }
}

export const equationPlan = ({ n, d }: Pick<Exercice, 'n' | 'd'>) =>
  `${combinaison([[n[0], 'x'], [n[1], 'y'], [n[2], 'z'], [d, '']])} = 0`;

const LIBELLES: Record<Position, string> = {
  parallele: 'Strictement parallèle au plan (P)',
  orthogonale: 'Orthogonale au plan (P)',
  incluse: 'Incluse dans le plan (P)',
  secante: 'Sécante au plan (P) et non orthogonale à (P)',
};

/* ===== Affichage ===== */

export default function DroitePlan() {
  const [exo, regenerer] = useTirage(genererExercice);
  const [reponse, setReponse] = useState<string | null>(null);
  const [retour, setRetour] = useState<null | 'vide' | 'correct' | 'faux'>(null);

  if (!exo) return <Chargement />;

  const { n, d, A, u } = exo;
  const juste = position(exo);
  const s = vecDot(n, u);
  const valeurA = vecDot(n, A) + d;

  function valider() {
    if (reponse === null) return setRetour('vide');
    setRetour(reponse === juste ? 'correct' : 'faux');
  }

  function nouvelExercice() {
    regenerer();
    setReponse(null);
    setRetour(null);
  }

  const produit = (a: Vec3, b: Vec3) => a.map((c, i) => `${entreParentheses(c)}×${entreParentheses(b[i])}`).join(' + ');

  return (
    <Cadre>
      <Titre />
      <Enonce>
        <p>Dans l'espace muni d'un repère orthonormé, on considère le plan (P) et la droite (Δ) suivants.</p>
      </Enonce>
      <Donnees elements={[['Plan (P) : équation cartésienne', equationPlan(exo)]]} />
      <Systeme legende="Droite (Δ) : représentation paramétrique (u ∈ ℝ)" lignes={lignesParametriques(A, u, 'u')} />

      <Formulaire onValider={valider}>
        <Choix
          legende="La droite (Δ) est :"
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
              Le vecteur directeur u⃗ {triplet(u)} et le vecteur normal n⃗ {triplet(n)} donnent n⃗ · u⃗ = {nombre(s)}
              {juste === 'orthogonale' ? ' et ils sont colinéaires.' : '.'}
            </p>
          </MessageSucces>
        )}
        {retour === 'faux' && (
          <Retour type="faux">
            <p>Oups, une erreur s'est glissée. La droite est : {LIBELLES[juste].charAt(0).toLowerCase() + LIBELLES[juste].slice(1)}.</p>
            <Correction>
              <li>
                Un vecteur normal au plan se lit sur l'équation : <Calcul>n⃗ {triplet(n)}</Calcul>. Un vecteur directeur de (Δ) se
                lit sur la représentation paramétrique (coefficients de u) : <Calcul>u⃗ {triplet(u)}</Calcul>.
              </li>
              <li>
                On calcule le produit scalaire :{' '}
                <Calcul>
                  n⃗ · u⃗ = {produit(n, u)} = {nombre(s)}
                </Calcul>
                .
              </li>
              {s !== 0 ? (
                <>
                  <li>
                    Le produit scalaire n'est pas nul : u⃗ n'est pas orthogonal à n⃗, donc la droite n'est ni parallèle au plan ni
                    incluse dans le plan. Elle est sécante au plan.
                  </li>
                  <li>
                    {juste === 'orthogonale'
                      ? 'Les coordonnées de u⃗ et de n⃗ sont proportionnelles : u⃗ est colinéaire à n⃗. La droite est donc orthogonale au plan.'
                      : "Les coordonnées de u⃗ et de n⃗ ne sont pas proportionnelles : u⃗ n'est pas colinéaire à n⃗. La droite est sécante au plan mais n'est pas orthogonale à lui."}
                  </li>
                </>
              ) : (
                <>
                  <li>
                    Le produit scalaire est nul : u⃗ est orthogonal à n⃗, donc la droite est parallèle au plan ou incluse dans le
                    plan.
                  </li>
                  <li>
                    Pour trancher, on teste si le point A {triplet(A)} de la droite est dans le plan :{' '}
                    <Calcul>
                      {produit(n, A)} + {entreParentheses(d)} = {nombre(valeurA)}
                    </Calcul>
                    .
                  </li>
                  <li>
                    {valeurA === 0
                      ? "Il vaut 0 : A est dans le plan. La droite a un point commun avec le plan et lui est parallèle : elle est incluse dans le plan."
                      : "Il ne vaut pas 0 : A n'est pas dans le plan. La droite est parallèle au plan sans le toucher : elle est strictement parallèle."}
                  </li>
                </>
              )}
            </Correction>
            <Astuce titre="Pour réussir la prochaine fois">
              <ul>
                <li>n⃗ · u⃗ = 0 signifie « parallèle OU incluse » : il faut ensuite tester un point de la droite.</li>
                <li>Une droite orthogonale au plan a un vecteur directeur colinéaire à n⃗ (et non orthogonal à n⃗).</li>
                <li>Si n⃗ · u⃗ ≠ 0, la droite coupe toujours le plan en un seul point.</li>
              </ul>
            </Astuce>
          </Retour>
        )}
      </ZoneRetour>
    </Cadre>
  );
}
