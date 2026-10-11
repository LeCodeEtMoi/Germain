import { useState } from 'react';
import {
  Astuce, Boutons, Cadre, Calcul, Choix, Chargement, Correction, Donnees, Enonce, Formulaire, MessageIncompris,
  MessageSucces, Retour, Systeme, Titre, ZoneRetour, useTirage,
} from '@/components/exercice/ExerciceUI.tsx';
import {
  affine, colineaires, entier, fraction, lignesParametriques, memeFraction, nombre, signeAleatoire, texteFraction, triplet,
  vecAdd, vecAleatoire, vecNul, vecScale, vecSub, type Fraction, type Vec3,
} from '@/lib/maths.ts';

/**
 * Exercice : un point M appartient-il à la droite (Δ) donnée par une représentation paramétrique ?
 *
 * Maths : M ∈ (Δ) ⇔ il existe un réel t tel que M = A + t·u
 *   ⇔ pour chaque coordonnée : (M − A)ᵢ = t·uᵢ, avec le MÊME t.
 *   Coordonnée où uᵢ = 0 : il faut Mᵢ = Aᵢ ; sinon t = (Mᵢ − Aᵢ)/uᵢ (fraction exacte).
 * Comme u ≠ 0, c'est équivalent à : AM et u colinéaires (produit vectoriel nul).
 * La réponse attendue est calculée avec la méthode des fractions exactes ; le test
 * automatique vérifie qu'elle coïncide avec le produit vectoriel sur des milliers de tirages.
 */

/* ===== Logique ===== */

export type Exercice = { A: Vec3; u: Vec3; M: Vec3 };

export type EtudeCoordonnee =
  | { type: 'fixe'; axe: number; egal: boolean } // uᵢ = 0 : Mᵢ doit valoir Aᵢ
  | { type: 'parametre'; axe: number; t: Fraction }; // uᵢ ≠ 0 : valeur de t imposée par cette coordonnée

export function etudier({ A, u, M }: Exercice): { coordonnees: EtudeCoordonnee[]; surLaDroite: boolean } {
  const coordonnees: EtudeCoordonnee[] = [0, 1, 2].map((axe) =>
    u[axe] === 0
      ? { type: 'fixe', axe, egal: M[axe] === A[axe] }
      : { type: 'parametre', axe, t: fraction(M[axe] - A[axe], u[axe]) }
  );
  const valeursT = coordonnees.flatMap((c) => (c.type === 'parametre' ? [c.t] : []));
  const fixesOk = coordonnees.every((c) => c.type !== 'fixe' || c.egal);
  const memeT = valeursT.every((t) => memeFraction(t, valeursT[0]));
  return { coordonnees, surLaDroite: fixesOk && memeT };
}

export function genererExercice(surLaDroite = Math.random() < 0.5): Exercice {
  for (;;) {
    const A = vecAleatoire(-6, 6);
    const u = vecAleatoire(-4, 4);
    if (vecNul(u)) continue; // un vecteur directeur n'est jamais nul
    const t = entier(-4, 4);
    let M = vecAdd(A, vecScale(u, t));
    if (!surLaDroite) {
      // On écarte M d'un point de la droite, puis on vérifie qu'il n'y est vraiment plus :
      // si u est parallèle à un axe, décaler dans cette direction laisserait M sur la droite.
      M = [...M] as Vec3;
      M[entier(0, 2)] += entier(1, 3) * signeAleatoire();
    }
    if (colineaires(vecSub(M, A), u) !== surLaDroite) continue;
    return { A, u, M };
  }
}

/* ===== Affichage ===== */

const termeT = (c: number) => (c === 1 ? 't' : c === -1 ? '−t' : `${nombre(c)}t`);
const NOMS = ['x', 'y', 'z'];

export default function PointSurDroite() {
  const [exo, regenerer] = useTirage(genererExercice);
  const [reponse, setReponse] = useState<string | null>(null);
  const [retour, setRetour] = useState<null | 'vide' | 'correct' | 'faux'>(null);

  if (!exo) return <Chargement />;

  const { A, u, M } = exo;
  const etude = etudier(exo);
  const surLaDroite = etude.surLaDroite;

  function valider() {
    if (reponse === null) return setRetour('vide');
    setRetour((reponse === 'oui') === surLaDroite ? 'correct' : 'faux');
  }

  function nouvelExercice() {
    regenerer();
    setReponse(null);
    setRetour(null);
  }

  const premierT = etude.coordonnees.find((c): c is Extract<EtudeCoordonnee, { type: 'parametre' }> => c.type === 'parametre');

  return (
    <Cadre>
      <Titre />
      <Enonce>
        <p>
          Dans l'espace, la droite (Δ) a pour représentation paramétrique le système ci-dessous, où t décrit ℝ. Le point M
          appartient-il à la droite (Δ) ?
        </p>
      </Enonce>
      <Donnees elements={[['Point M', triplet(M)]]} />
      <Systeme legende="Représentation paramétrique de (Δ), avec t ∈ ℝ" lignes={lignesParametriques(A, u, 't')} />

      <Formulaire onValider={valider}>
        <Choix
          legende="Ta réponse"
          enLigne
          valeur={reponse}
          onChange={setReponse}
          options={[
            { valeur: 'oui', contenu: 'Oui, M appartient à (Δ)' },
            { valeur: 'non', contenu: "Non, M n'appartient pas à (Δ)" },
          ]}
        />
        <Boutons onNouveau={nouvelExercice} />
      </Formulaire>

      <ZoneRetour>
        {retour === 'vide' && <MessageIncompris raison="Choisis une réponse avant de valider." />}
        {retour === 'correct' && (
          <MessageSucces>
            {surLaDroite && premierT && (
              <p>
                En effet, M est obtenu pour t = {texteFraction(premierT.t)}.
              </p>
            )}
          </MessageSucces>
        )}
        {retour === 'faux' && (
          <Retour type="faux">
            <p>
              Oups, une erreur s'est glissée. Le point M {surLaDroite ? 'appartient' : "n'appartient pas"} à la droite (Δ).
            </p>
            <Correction>
              <li>
                M appartient à (Δ) s'il existe <strong>un même réel t</strong> qui donne les trois coordonnées de M{' '}
                {triplet(M)}.
              </li>
              {etude.coordonnees.map((c) => {
                const nom = NOMS[c.axe];
                const diff = M[c.axe] - A[c.axe];
                const equation = `${nombre(M[c.axe])} = ${affine(A[c.axe], u[c.axe], 't')}`;
                return (
                  <li key={nom}>
                    Coordonnée {nom} : <Calcul>{equation}</Calcul>
                    {c.type === 'parametre' ? (
                      <>
                        , donc <Calcul>{termeT(u[c.axe])} = {nombre(diff)}</Calcul>, soit{' '}
                        <Calcul>t = {texteFraction(c.t)}</Calcul>.
                      </>
                    ) : (
                      <>
                        . Ici le coefficient de t est nul : {nom} vaut toujours {nombre(A[c.axe])} sur la droite. Or{' '}
                        {nom}
                        <sub>M</sub> = {nombre(M[c.axe])}, {c.egal ? 'c’est cohérent.' : 'ce qui est différent : M ne peut pas être sur la droite.'}
                      </>
                    )}
                  </li>
                );
              })}
              <li>
                {surLaDroite
                  ? `Les coordonnées conduisent à la même valeur t = ${premierT ? texteFraction(premierT.t) : ''} (et les coordonnées constantes concordent) : M appartient à (Δ).`
                  : etude.coordonnees.some((c) => c.type === 'fixe' && !c.egal)
                    ? 'Une coordonnée constante ne correspond pas : M n’appartient pas à (Δ).'
                    : 'Les coordonnées ne donnent pas la même valeur de t : M n’appartient pas à (Δ).'}
              </li>
            </Correction>
            <Astuce titre="Pour réussir la prochaine fois">
              <ul>
                <li>Il faut le même t pour les trois équations : trouver t avec x ne suffit pas.</li>
                <li>Si le coefficient de t est nul, la coordonnée est constante : on compare simplement les deux valeurs.</li>
                <li>Garde les fractions telles quelles (t = 1/3) plutôt que des valeurs arrondies.</li>
              </ul>
            </Astuce>
          </Retour>
        )}
      </ZoneRetour>
    </Cadre>
  );
}
