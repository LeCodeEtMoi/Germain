import { useState } from 'react';
import MathTex from './MathTex.tsx';
import {
  Astuce, Boutons, BlocCode, Cadre, ChampLigne, Chargement, Correction, Enonce, Formulaire, MessageIncompris, MessageSucces,
  Retour, Titre, ZoneRetour, useTirage,
} from './ExerciceUI.tsx';
import {
  type Comparateur, type Pas, codePas, comparer, contraire, lireCondition, memeCondition, texComparateur, texPas,
} from '../lib/algo.ts';
import { choisir } from '../lib/maths.ts';

/**
 * Exercice : compléter la condition d'une boucle while (seuil d'une suite géométrique).
 *
 * Une suite croissante (u × k, k > 1) ou décroissante (u × k, k < 1) est tirée au hasard, ainsi que la cible :
 *   croissante  →  « u_n > A » ou « u_n ≥ A »        décroissante  →  « u_n < A » ou « u_n ≤ A ».
 * La boucle doit continuer tant que la cible n'est PAS atteinte : c'est le contraire de la cible.
 *
 * Correction : la condition de l'élève est lue (u <= A, A >= u, not u > A, …) puis comparée à la bonne condition sur
 * de nombreux couples (u, A) autour du seuil, égalité comprise. Toute écriture équivalente est acceptée.
 */

/* ===== Logique ===== */

export type Exercice = { u0: number; pas: Pas; cible: Comparateur };

export function genererExercice(): Exercice {
  const croissante = Math.random() < 0.5;
  return croissante
    ? { u0: choisir([100, 500, 1000, 2000]), pas: { op: '*', k: choisir([1.02, 1.05, 1.1, 1.5, 2]) }, cible: choisir<Comparateur>(['>', '>=']) }
    : { u0: choisir([50, 200, 1000, 4000]), pas: { op: '*', k: choisir([0.95, 0.9, 0.8, 0.5]) }, cible: choisir<Comparateur>(['<', '<=']) };
}

const SEUILS = [3, 50.5, 2000];
const CAS = SEUILS.flatMap((A) => Array.from({ length: 81 }, (_, i) => ({ u: A + (i - 40) * 0.25, a: A })));
const CAS_SANS_EGALITE = CAS.filter((c) => c.u !== c.a);

export type Verdict =
  | { type: 'incompris'; raison: string }
  | { type: 'correct' }
  | { type: 'faux'; indice: string };

export function verifier(exo: Exercice, saisie: string): Verdict {
  const lue = lireCondition(saisie, ['u', 'a']);
  if (!lue.ok) return { type: 'incompris', raison: lue.message };
  const bonne = (env: Record<string, number>) => comparer(contraire(exo.cible), env.u, env.a);
  const arret = (env: Record<string, number>) => comparer(exo.cible, env.u, env.a);
  if (memeCondition(lue.condition, bonne, CAS)) return { type: 'correct' };
  if (memeCondition(lue.condition, arret, CAS)) {
    return { type: 'faux', indice: "Tu as écrit la condition d'arrêt. Or while répète la boucle tant que la condition est vraie : il faut écrire le contraire." };
  }
  if (memeCondition(lue.condition, bonne, CAS_SANS_EGALITE)) {
    return { type: 'faux', indice: "Presque : la condition est bonne sauf quand u est égal à A. Regarde si l'inégalité doit être stricte (<, >) ou large (<=, >=)." };
  }
  return { type: 'faux', indice: "Cette condition ne donne pas le bon résultat : elle ne s'arrête pas au bon moment." };
}

const texteCible = (c: Comparateur) => `u_n ${texComparateur(c)} A`;
const motCible = (c: Comparateur) => ({ '>': 'strictement supérieur à', '>=': 'supérieur ou égal à', '<': 'strictement inférieur à', '<=': 'inférieur ou égal à' })[c];

/* ===== Affichage ===== */

export default function SeuilWhile() {
  const [exo, regenerer] = useTirage(genererExercice);
  const [saisie, setSaisie] = useState('');
  const [verdict, setVerdict] = useState<Verdict | null>(null);

  if (!exo) return <Chargement />;

  const { u0, pas, cible } = exo;
  const attendue = `u ${contraire(cible)} A`;

  function valider() {
    setVerdict(verifier(exo as Exercice, saisie));
  }

  function nouvelExercice() {
    regenerer();
    setSaisie('');
    setVerdict(null);
  }

  return (
    <Cadre>
      <Titre />
      <Enonce>
        <p>
          On considère la suite <MathTex tex="(u_n)" /> définie par <MathTex tex={`u_0 = ${u0}`} /> et, pour tout entier naturel n,{' '}
          <MathTex tex={texPas(pas)} />.
        </p>
        <p>
          Pour un réel A donné, on cherche le plus petit entier n tel que <MathTex tex={texteCible(cible)} />. Complète la
          condition de la boucle <code>while</code> pour que <code>seuil(A)</code> renvoie ce nombre n.
        </p>
      </Enonce>

      <Formulaire onValider={valider}>
        <BlocCode legende="Script Python">
          {`def seuil(A):\n    n = 0\n    u = ${u0}\n    while `}
          <ChampLigne etiquette="Condition du while" valeur={saisie} onChange={setSaisie} placeholder="u … A" maxLength={30} />
          {` :\n        ${codePas(pas)}\n        n = n + 1\n    return n`}
        </BlocCode>
        <p className="exercice-aide">Écris la condition comme en Python, avec u et A (opérateurs &lt;, &lt;=, &gt;, &gt;=).</p>
        <Boutons onNouveau={nouvelExercice} />
      </Formulaire>

      <ZoneRetour>
        {verdict?.type === 'incompris' && <MessageIncompris raison={verdict.raison} />}
        {verdict?.type === 'correct' && (
          <MessageSucces>
            <p>
              La boucle continue tant que la cible n'est pas atteinte : <code>while {attendue}</code>.
            </p>
          </MessageSucces>
        )}
        {verdict?.type === 'faux' && (
          <Retour type="faux">
            <p>Oups, une erreur s'est glissée. {verdict.indice}</p>
            <Correction>
              <li>
                On cherche le premier rang n pour lequel u est {motCible(cible)} A, c'est-à-dire <MathTex tex={texteCible(cible)} />.
              </li>
              <li>
                Tant que ce n'est pas le cas, il faut continuer : la boucle <code>while</code> s'exécute tant que sa condition est
                vraie. La condition à écrire est donc le <strong>contraire</strong> de la cible.
              </li>
              <li>
                Le contraire de « u {cible} A » est « u {contraire(cible)} A ». Ici, on écrit <code>while {attendue}</code>.
              </li>
              <li>
                À chaque tour, <code>{codePas(pas)}</code> calcule le terme suivant et <code>n = n + 1</code> compte le nombre de
                tours. Quand la boucle s'arrête, u est le premier terme à atteindre la cible, et n son rang.
              </li>
            </Correction>
            <Astuce titre="Pour réussir la prochaine fois">
              <ul>
                <li>while = « tant que » : la condition décrit ce qui se passe AVANT d'arriver au seuil, pas le moment où on l'atteint.</li>
                <li>Le contraire de &gt; est &lt;= (et non &lt;) ; le contraire de &gt;= est &lt;.</li>
                <li>Pour vérifier, teste le script à la main avec une petite valeur de A.</li>
              </ul>
            </Astuce>
          </Retour>
        )}
      </ZoneRetour>
    </Cadre>
  );
}
