import { useState } from 'react';
import MathTex from '@/components/math/MathTex.tsx';
import {
  Astuce, Boutons, Cadre, Calcul, Choix, Chargement, Correction, Enonce, Formulaire, MessageIncompris, MessageSucces,
  Retour, Titre, ZoneRetour, useTirage,
} from '@/components/exercice/ExerciceUI.tsx';
import { arrangements, binomial, entier, grandNombre, melanger } from '@/lib/maths.ts';

/**
 * Exercice : dénombrer les groupes de k élèves parmi n (combinaisons).
 *
 * Maths : former un groupe = choisir k élèves parmi n, sans ordre ni répétition : C(n, k) possibilités.
 * Les trois propositions fausses sont les erreurs classiques :
 *   - arrangement  n(n−1)…(n−k+1) : l'ordre compte, chaque groupe est compté k! fois ;
 *   - somme        n + (n−1) + … : une addition ne dénombre pas des choix successifs ;
 *   - puissance    n^k : tirages avec remise, dans l'ordre.
 * Les valeurs numériques des quatre propositions sont calculées en BigInt (exact) et on
 * vérifie qu'elles sont toutes différentes ; le mélange est un vrai mélange de Fisher–Yates.
 */

/* ===== Logique ===== */

export type TypeProposition = 'combinaison' | 'arrangement' | 'somme' | 'puissance';
export type Proposition = { type: TypeProposition; tex: string; valeur: bigint };
export type Exercice = { n: number; k: number; propositions: Proposition[] };

/** « 27 \times 26 \times 25 » ou « 27 \times 26 \times \cdots \times 18 » quand c'est long. */
function listeDescendante(n: number, k: number, operateur: string): string {
  const termes = Array.from({ length: k }, (_, i) => String(n - i));
  const garde = k <= 4 ? termes : [termes[0], termes[1], '\\cdots', termes[k - 1]];
  return garde.join(` ${operateur} `);
}

const sommeDescendante = (n: number, k: number) => BigInt((k * (2 * n - k + 1)) / 2);

export function genererExercice(): Exercice {
  const n = entier(27, 40);
  const k = entier(3, 10);
  const propositions: Proposition[] = [
    { type: 'combinaison', tex: `\\binom{${n}}{${k}}`, valeur: binomial(n, k) },
    { type: 'arrangement', tex: listeDescendante(n, k, '\\times'), valeur: arrangements(n, k) },
    { type: 'somme', tex: listeDescendante(n, k, '+'), valeur: sommeDescendante(n, k) },
    { type: 'puissance', tex: `${n}^{${k}}`, valeur: BigInt(n) ** BigInt(k) },
  ];
  return { n, k, propositions: melanger(propositions) };
}

const factorielle = (k: number) => Array.from({ length: k }, (_, i) => BigInt(i + 1)).reduce((a, b) => a * b, 1n);

/* ===== Affichage ===== */

export default function Combinaisons() {
  const [exo, regenerer] = useTirage(genererExercice);
  const [choisi, setChoisi] = useState<string | null>(null);
  const [retour, setRetour] = useState<null | 'vide' | 'correct' | 'faux'>(null);

  if (!exo) return <Chargement />;

  const { n, k, propositions } = exo;
  const bonne = propositions.find((p) => p.type === 'combinaison')!;

  function valider() {
    if (choisi === null) return setRetour('vide');
    setRetour(propositions[Number(choisi)].type === 'combinaison' ? 'correct' : 'faux');
  }

  function nouvelExercice() {
    regenerer();
    setChoisi(null);
    setRetour(null);
  }

  const pourquoi: Record<Exclude<TypeProposition, 'combinaison'>, string> = {
    arrangement: `Cette expression compte les groupes en tenant compte de l'ordre (premier élève, deuxième élève…). Un même groupe est alors compté ${k}! = ${grandNombre(factorielle(k))} fois : on obtient ${grandNombre(arrangements(n, k))} au lieu de ${grandNombre(bonne.valeur)}.`,
    somme: `Une somme ne dénombre pas des choix successifs : pour des choix qui s'enchaînent, on multiplie, on n'additionne pas. Ici elle vaut seulement ${grandNombre(sommeDescendante(n, k))}.`,
    puissance: `Elle compte des tirages avec répétition (un élève pourrait être choisi plusieurs fois) et dans l'ordre. Or un groupe contient ${k} élèves différents, sans ordre.`,
  };

  return (
    <Cadre>
      <Titre />
      <Enonce>
        <p>Une professeure enseigne la spécialité mathématiques dans une classe de {n} élèves de terminale.</p>
        <p>Elle veut former un groupe de {k} élèves.</p>
        <p>De combien de façons différentes peut-elle former un tel groupe ?</p>
      </Enonce>

      <Formulaire onValider={valider}>
        <Choix
          legende="Choisis la bonne expression"
          valeur={choisi}
          onChange={setChoisi}
          options={propositions.map((p, i) => ({ valeur: String(i), contenu: <MathTex tex={p.tex} /> }))}
        />
        <Boutons onNouveau={nouvelExercice} />
      </Formulaire>

      <ZoneRetour>
        {retour === 'vide' && <MessageIncompris raison="Choisis une proposition avant de valider." />}
        {retour === 'correct' && (
          <MessageSucces>
            <p>
              Il y a <MathTex tex={bonne.tex} /> = {grandNombre(bonne.valeur)} groupes possibles.
            </p>
          </MessageSucces>
        )}
        {retour === 'faux' && (
          <Retour type="faux">
            <p>Oups, une erreur s'est glissée. La bonne réponse est :</p>
            <div className="exercice-formule">
              <MathTex tex={bonne.tex} />
            </div>
            <Correction>
              <li>
                Un groupe est un ensemble d'élèves : l'ordre n'a pas d'importance, et un élève ne peut pas y figurer deux fois.
              </li>
              <li>
                On choisit donc {k} élèves parmi {n}, sans ordre et sans répétition : c'est une combinaison.
              </li>
              <li>
                Le nombre de groupes est <Calcul>C({n}, {k}) = {n}! ÷ ({k}! × {n - k}!) = {grandNombre(bonne.valeur)}</Calcul>.
              </li>
              <li>
                Pourquoi les autres propositions sont fausses :
                <ul>
                  {propositions
                    .filter((p) => p.type !== 'combinaison')
                    .map((p) => (
                      <li key={p.type}>
                        <MathTex tex={p.tex} /> {propositions[Number(choisi)].type === p.type && <strong>(ta réponse) </strong>}
                        {pourquoi[p.type as Exclude<TypeProposition, 'combinaison'>]}
                      </li>
                    ))}
                </ul>
              </li>
            </Correction>
            <Astuce titre="Pour réussir la prochaine fois">
              <ul>
                <li>Pose-toi deux questions : l'ordre compte-t-il ? Peut-on répéter un élément ?</li>
                <li>Ni ordre ni répétition : combinaison, « k parmi n ». Ordre sans répétition : arrangement, qui vaut k! fois plus.</li>
                <li>Pour passer d'un arrangement à une combinaison, on divise par k!.</li>
              </ul>
            </Astuce>
          </Retour>
        )}
      </ZoneRetour>
    </Cadre>
  );
}
