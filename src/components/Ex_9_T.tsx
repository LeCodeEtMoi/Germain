import { useState } from 'react';
import MathTex from './MathTex.tsx';
import {
  Astuce, Boutons, Cadre, Calcul, Choix, Chargement, Correction, Enonce, Formulaire, MessageIncompris, MessageSucces,
  Retour, Titre, ZoneRetour, useTirage,
} from './ExerciceUI.tsx';
import { binomial, entier, grandNombre, melanger } from '../lib/maths.ts';

/**
 * Exercice : dénombrer des groupes avec une contrainte (« exactement e élèves de SES »).
 *
 * Maths : sur n élèves, s ont choisi SES (les n − s autres ont choisi autre chose).
 * Un groupe de g élèves contenant exactement e élèves de SES se forme en deux étapes :
 *   1) choisir les e élèves de SES parmi s : C(s, e) ;
 *   2) choisir les g − e autres élèves parmi les n − s non-SES : C(n − s, g − e).
 * Principe multiplicatif : C(s, e) × C(n − s, g − e).
 * (L'ancienne version utilisait C(n − g, e), qui n'a aucun sens ici.)
 * Les quatre propositions ont des valeurs toutes différentes (vérifié en BigInt).
 */

/* ===== Logique ===== */

export type TypeProposition = 'bonne' | 'somme' | 'reste' | 'puissances';
export type Proposition = { type: TypeProposition; tex: string; valeur: bigint };
export type Exercice = {
  n: number; // élèves du groupe de la professeure
  g: number; // taille du groupe à former
  e: number; // nombre d'élèves de SES voulus
  physique: number;
  ses: number;
  llce: number;
  propositions: Proposition[];
};

const C = (n: number, k: number) => `\\binom{${n}}{${k}}`;

export function genererExercice(): Exercice {
  for (;;) {
    const n = entier(27, 40);
    const physique = entier(5, 12);
    const ses = entier(5, 12);
    const llce = n - physique - ses; // reste de la classe : toujours ≥ 3
    const g = entier(4, 10);
    const e = entier(2, Math.min(ses, g - 1)); // au moins un élève hors SES dans le groupe
    const autres = n - ses; // élèves non-SES (physique-chimie + LLCE)
    if (llce < 3 || g - e > autres) continue;

    const propositions: Proposition[] = [
      { type: 'bonne', tex: `${C(ses, e)} \\times ${C(autres, g - e)}`, valeur: binomial(ses, e) * binomial(autres, g - e) },
      { type: 'somme', tex: `${C(ses, e)} + ${C(autres, g - e)}`, valeur: binomial(ses, e) + binomial(autres, g - e) },
      { type: 'reste', tex: `${C(ses, e)} \\times ${C(n, g - e)}`, valeur: binomial(ses, e) * binomial(n, g - e) },
      {
        type: 'puissances',
        tex: `${ses}^{${e}} \\times ${autres}^{${g - e}}`,
        valeur: BigInt(ses) ** BigInt(e) * BigInt(autres) ** BigInt(g - e),
      },
    ];
    if (new Set(propositions.map((p) => p.valeur)).size !== propositions.length) continue; // valeurs toutes différentes
    return { n, g, e, physique, ses, llce, propositions: melanger(propositions) };
  }
}

/* ===== Affichage ===== */

export default function CombinaisonsContrainte() {
  const [exo, regenerer] = useTirage(genererExercice);
  const [choisi, setChoisi] = useState<string | null>(null);
  const [retour, setRetour] = useState<null | 'vide' | 'correct' | 'faux'>(null);

  if (!exo) return <Chargement />;

  const { n, g, e, physique, ses, llce, propositions } = exo;
  const autres = n - ses;
  const bonne = propositions.find((p) => p.type === 'bonne')!;

  function valider() {
    if (choisi === null) return setRetour('vide');
    setRetour(propositions[Number(choisi)].type === 'bonne' ? 'correct' : 'faux');
  }

  function nouvelExercice() {
    regenerer();
    setChoisi(null);
    setRetour(null);
  }

  const pourquoi: Record<Exclude<TypeProposition, 'bonne'>, string> = {
    somme: "Les deux choix se font l'un après l'autre : chaque façon de choisir les élèves de SES peut être combinée avec chaque façon de choisir les autres. On multiplie, on n'additionne pas.",
    reste: `Les ${g - e} autres élèves ne doivent pas être pris parmi les ${n} élèves : ce choix pourrait contenir des élèves de SES, et le groupe n'aurait alors plus exactement ${e} élèves de SES. Il faut les prendre parmi les ${autres} élèves qui n'ont pas choisi SES.`,
    puissances: "Cette expression compte des choix avec répétition et dans l'ordre. Dans un groupe, les élèves sont tous différents et leur ordre n'a pas d'importance : il faut des combinaisons.",
  };

  return (
    <Cadre>
      <Titre />
      <Enonce>
        <p>Une professeure de terminale Spé Maths s'intéresse à l'autre spécialité des {n} élèves de son groupe :</p>
        <ul>
          <li>{physique} élèves ont choisi la spécialité physique-chimie ;</li>
          <li>{ses} élèves ont choisi la spécialité SES ;</li>
          <li>{llce} élèves ont choisi la spécialité LLCE espagnol.</li>
        </ul>
        <p>
          Elle veut former un groupe de {g} élèves comportant exactement {e} élèves ayant choisi la spécialité SES. De combien
          de façons différentes peut-elle former un tel groupe ?
        </p>
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
                Le groupe contient exactement {e} élève{e > 1 ? 's' : ''} de SES, donc {g - e} élève{g - e > 1 ? 's' : ''} qui n'ont pas
                choisi SES.
              </li>
              <li>
                On choisit les {e} élèves de SES parmi les {ses} : <Calcul>C({ses}, {e}) = {grandNombre(binomial(ses, e))}</Calcul>{' '}
                possibilités.
              </li>
              <li>
                On choisit les {g - e} autres élèves parmi ceux qui n'ont pas choisi SES, soit {physique} + {llce} = {autres} élèves :{' '}
                <Calcul>C({autres}, {g - e}) = {grandNombre(binomial(autres, g - e))}</Calcul> possibilités.
              </li>
              <li>
                Les deux choix sont indépendants : on multiplie (principe multiplicatif).{' '}
                <Calcul>
                  {grandNombre(binomial(ses, e))} × {grandNombre(binomial(autres, g - e))} = {grandNombre(bonne.valeur)}
                </Calcul>{' '}
                groupes.
              </li>
              <li>
                Pourquoi les autres propositions sont fausses :
                <ul>
                  {propositions
                    .filter((p) => p.type !== 'bonne')
                    .map((p) => (
                      <li key={p.type}>
                        <MathTex tex={p.tex} /> {propositions[Number(choisi)].type === p.type && <strong>(ta réponse) </strong>}
                        {pourquoi[p.type as Exclude<TypeProposition, 'bonne'>]}
                      </li>
                    ))}
                </ul>
              </li>
            </Correction>
            <Astuce titre="Pour réussir la prochaine fois">
              <ul>
                <li>Découpe le groupe en catégories : ici, les élèves de SES et les autres.</li>
                <li>Pour chaque catégorie, choisis le bon nombre d'élèves parmi ceux de cette catégorie seulement.</li>
                <li>Quand les choix sont successifs et indépendants, on multiplie les nombres de possibilités.</li>
              </ul>
            </Astuce>
          </Retour>
        )}
      </ZoneRetour>
    </Cadre>
  );
}
