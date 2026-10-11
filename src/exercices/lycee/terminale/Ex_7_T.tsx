import { useState } from 'react';
import {
  Astuce, Boutons, Cadre, Calcul, Champ, Choix, Chargement, Correction, Enonce, Formulaire, MessageIncompris,
  MessageSucces, Retour, Systeme, Titre, ZoneRetour, useTirage,
} from '@/components/exercice/ExerciceUI.tsx';
import {
  colineaires, entier, entreParentheses, lignesParametriques, nombre, produitMixte, signeAleatoire, triplet, valeurDuTexte,
  vecAdd, vecAleatoire, vecCross, vecDot, vecNul, vecScale, vecSub, type Vec3,
} from '@/lib/maths.ts';

/**
 * Exercice : position relative de deux droites de l'espace.
 *
 * Maths (u₁, u₂ : vecteurs directeurs, A₁ ∈ (d₁), A₂ ∈ (d₂)) :
 *   - u₁ ∧ u₂ = 0 (colinéaires) : droites confondues si A₁A₂ ∧ u₁ = 0, strictement parallèles sinon ;
 *   - u₁ ∧ u₂ ≠ 0 : sécantes si le produit mixte A₁A₂ · (u₁ ∧ u₂) = 0, non coplanaires sinon.
 * La réponse attendue est toujours recalculée par `classer` à partir des données affichées,
 * en entiers (aucun arrondi). Pour deux droites sécantes, le point d'intersection est construit
 * à l'avance (P = A₁ + r₀u₁ = A₂ + s₀u₂) et reste donc un point à coordonnées entières.
 */

/* ===== Logique ===== */

export type Relation = 'confondues' | 'paralleles' | 'secantes' | 'gauches';

export type Exercice = {
  A1: Vec3;
  u1: Vec3;
  A2: Vec3;
  u2: Vec3;
  relation: Relation;
  /** Seulement pour des droites sécantes : point d'intersection et paramètres correspondants */
  intersection: { P: Vec3; r: number; s: number } | null;
};

export function classer(A1: Vec3, u1: Vec3, A2: Vec3, u2: Vec3): Relation {
  const A1A2 = vecSub(A2, A1);
  if (colineaires(u1, u2)) return colineaires(A1A2, u1) ? 'confondues' : 'paralleles';
  return produitMixte(A1A2, u1, u2) === 0 ? 'secantes' : 'gauches';
}

const egaux = (p: Vec3, q: Vec3) => p[0] === q[0] && p[1] === q[1] && p[2] === q[2];
const directeur = (): Vec3 => {
  for (;;) {
    const u = vecAleatoire(-3, 3);
    if (!vecNul(u)) return u;
  }
};

export function genererExercice(relation: Relation = (['confondues', 'paralleles', 'secantes', 'gauches'] as const)[entier(0, 3)]): Exercice {
  for (;;) {
    const u1 = directeur();
    let A1 = vecAleatoire(-5, 5);
    let A2: Vec3;
    let u2: Vec3;
    let intersection: Exercice['intersection'] = null;

    if (relation === 'secantes') {
      u2 = directeur();
      if (colineaires(u1, u2)) continue;
      const P = vecAleatoire(-5, 5);
      const r = entier(-2, 2);
      const s = entier(-2, 2);
      A1 = vecSub(P, vecScale(u1, r));
      A2 = vecSub(P, vecScale(u2, s));
      intersection = { P, r, s };
    } else if (relation === 'paralleles' || relation === 'confondues') {
      u2 = vecScale(u1, entier(1, 2) * signeAleatoire());
      A2 = relation === 'confondues' ? vecAdd(A1, vecScale(u1, entier(-3, 3))) : vecAleatoire(-5, 5);
    } else {
      u2 = directeur();
      if (colineaires(u1, u2)) continue;
      A2 = vecAleatoire(-5, 5);
    }

    if (classer(A1, u1, A2, u2) !== relation) continue; // le cas tiré doit être celui voulu
    if (egaux(A1, A2) && egaux(u1, u2)) continue; // deux systèmes identiques : sans intérêt
    return { A1, u1, A2, u2, relation, intersection };
  }
}

export type Verdict =
  | { type: 'incompris'; raison: string }
  | { type: 'correct' }
  | { type: 'faux'; cause: 'relation' | 'point' };

export function verifier(exo: Exercice, choix: string | null, saisies: [string, string, string]): Verdict {
  if (choix === null) return { type: 'incompris', raison: 'Choisis une position relative avant de valider.' };
  if (choix !== exo.relation) return { type: 'faux', cause: 'relation' };
  if (exo.relation !== 'secantes') return { type: 'correct' };

  if (saisies.some((s) => s.trim() === '')) {
    return { type: 'incompris', raison: "Les droites sont sécantes : écris aussi les trois coordonnées de leur point d'intersection." };
  }
  const valeurs = saisies.map(valeurDuTexte);
  if (valeurs.some((v) => v === null)) {
    return { type: 'incompris', raison: 'Chaque coordonnée doit être un nombre (par exemple 3, −2 ou 1/2).' };
  }
  const P = exo.intersection!.P;
  const juste = valeurs.every((v, i) => Math.abs((v as number) - P[i]) < 1e-9);
  return juste ? { type: 'correct' } : { type: 'faux', cause: 'point' };
}

/* ===== Affichage ===== */

const OPTIONS: { valeur: Relation; contenu: string }[] = [
  { valeur: 'confondues', contenu: 'Confondues' },
  { valeur: 'paralleles', contenu: 'Strictement parallèles' },
  { valeur: 'secantes', contenu: 'Sécantes' },
  { valeur: 'gauches', contenu: 'Non coplanaires' },
];
const NOMS_RELATION: Record<Relation, string> = {
  confondues: 'confondues',
  paralleles: 'strictement parallèles',
  secantes: 'sécantes',
  gauches: 'non coplanaires',
};

export default function PositionRelative() {
  const [exo, regenerer] = useTirage(genererExercice);
  const [choix, setChoix] = useState<string | null>(null);
  const [xyz, setXyz] = useState<[string, string, string]>(['', '', '']);
  const [verdict, setVerdict] = useState<Verdict | null>(null);

  if (!exo) return <Chargement />;

  const { A1, u1, A2, u2, relation, intersection } = exo;

  function valider() {
    setVerdict(verifier(exo as Exercice, choix, xyz));
  }

  function nouvelExercice() {
    regenerer();
    setChoix(null);
    setXyz(['', '', '']);
    setVerdict(null);
  }

  const A1A2 = vecSub(A2, A1);
  const croise = vecCross(u1, u2);
  const colin = colineaires(u1, u2);
  const mixte = vecDot(A1A2, croise);
  const triplets = (v: Vec3, w: Vec3) => (
    <Calcul>
      ({entreParentheses(v[1])}×{entreParentheses(w[2])} − {entreParentheses(v[2])}×{entreParentheses(w[1])} ;{' '}
      {entreParentheses(v[2])}×{entreParentheses(w[0])} − {entreParentheses(v[0])}×{entreParentheses(w[2])} ;{' '}
      {entreParentheses(v[0])}×{entreParentheses(w[1])} − {entreParentheses(v[1])}×{entreParentheses(w[0])})
    </Calcul>
  );

  return (
    <Cadre>
      <Titre />
      <Enonce>
        <p>On considère les droites (d₁) et (d₂) données par leurs représentations paramétriques. Quelle est leur position relative ?</p>
      </Enonce>
      <div className="exercice-donnees">
        <Systeme legende="(d₁), avec r ∈ ℝ" lignes={lignesParametriques(A1, u1, 'r')} />
        <Systeme legende="(d₂), avec s ∈ ℝ" lignes={lignesParametriques(A2, u2, 's')} />
      </div>

      <Formulaire onValider={valider}>
        <Choix legende="Les droites (d₁) et (d₂) sont :" options={OPTIONS} valeur={choix} onChange={setChoix} />
        {choix === 'secantes' && (
          <div className="exercice-champs">
            {(['x', 'y', 'z'] as const).map((nom, i) => (
              <Champ
                key={nom}
                libelle={`${nom} du point d'intersection`}
                valeur={xyz[i]}
                onChange={(v) => setXyz((ancien) => ancien.map((c, j) => (j === i ? v : c)) as [string, string, string])}
                placeholder={nom}
                maxLength={20}
              />
            ))}
          </div>
        )}
        <Boutons onNouveau={nouvelExercice} />
      </Formulaire>

      <ZoneRetour>
        {verdict?.type === 'incompris' && <MessageIncompris raison={verdict.raison} />}
        {verdict?.type === 'correct' && (
          <MessageSucces>
            <p>
              Les droites sont bien {NOMS_RELATION[relation]}
              {intersection && <>, et leur point d'intersection est {triplet(intersection.P)}</>}.
            </p>
          </MessageSucces>
        )}
        {verdict?.type === 'faux' && (
          <Retour type="faux">
            <p>
              Oups, une erreur s'est glissée.{' '}
              {verdict.cause === 'relation'
                ? `Les droites sont ${NOMS_RELATION[relation]}.`
                : `La position est correcte (sécantes), mais le point d'intersection est ${triplet(intersection!.P)}.`}
            </p>
            <Correction>
              <li>
                Vecteurs directeurs : <Calcul>u₁ = {triplet(u1)}</Calcul> et <Calcul>u₂ = {triplet(u2)}</Calcul>. Points :{' '}
                <Calcul>A₁ = {triplet(A1)}</Calcul> (sur d₁) et <Calcul>A₂ = {triplet(A2)}</Calcul> (sur d₂).
              </li>
              <li>
                On teste si u₁ et u₂ sont colinéaires avec le produit vectoriel : <Calcul>u₁ ∧ u₂ = </Calcul>{' '}
                {triplets(u1, u2)} = <Calcul>{triplet(croise)}</Calcul>.{' '}
                {colin ? 'Il est nul : les droites sont parallèles ou confondues.' : "Il n'est pas nul : les droites ne sont pas parallèles."}
              </li>
              {colin ? (
                <li>
                  On regarde si A₂ est sur (d₁) : <Calcul>A₁A₂ = {triplet(A1A2)}</Calcul>. Le produit vectoriel{' '}
                  <Calcul>A₁A₂ ∧ u₁ = {triplet(vecCross(A1A2, u1))}</Calcul>{' '}
                  {relation === 'confondues'
                    ? 'est nul : A₂ est sur (d₁), les droites sont confondues.'
                    : "n'est pas nul : A₂ n'est pas sur (d₁), les droites sont strictement parallèles."}
                </li>
              ) : (
                <>
                  <li>
                    On calcule le produit mixte : <Calcul>A₁A₂ = {triplet(A1A2)}</Calcul>, puis{' '}
                    <Calcul>
                      A₁A₂ · (u₁ ∧ u₂) = {entreParentheses(A1A2[0])}×{entreParentheses(croise[0])} + {entreParentheses(A1A2[1])}×
                      {entreParentheses(croise[1])} + {entreParentheses(A1A2[2])}×{entreParentheses(croise[2])} = {nombre(mixte)}
                    </Calcul>
                    .
                  </li>
                  <li>
                    {relation === 'secantes'
                      ? 'Le produit mixte est nul : les droites sont coplanaires et non parallèles, donc sécantes.'
                      : 'Le produit mixte n’est pas nul : les droites ne sont pas dans un même plan, elles sont non coplanaires.'}
                  </li>
                </>
              )}
              {intersection && (
                <li>
                  Point d'intersection : pour <Calcul>r = {nombre(intersection.r)}</Calcul> on obtient{' '}
                  <Calcul>A₁ + r·u₁ = {triplet(intersection.P)}</Calcul>, et pour <Calcul>s = {nombre(intersection.s)}</Calcul>{' '}
                  on obtient <Calcul>A₂ + s·u₂ = {triplet(intersection.P)}</Calcul> : c'est le même point.
                </li>
              )}
            </Correction>
            <Astuce titre="Pour réussir la prochaine fois">
              <ul>
                <li>Commence toujours par comparer les vecteurs directeurs : colinéaires ou non ?</li>
                <li>Des vecteurs directeurs non colinéaires ne suffisent pas pour dire « sécantes » : il faut vérifier la coplanarité.</li>
                <li>Pour le point d'intersection, résous A₁ + r·u₁ = A₂ + s·u₂ puis remplace r (ou s) dans la représentation.</li>
              </ul>
            </Astuce>
          </Retour>
        )}
      </ZoneRetour>
    </Cadre>
  );
}
