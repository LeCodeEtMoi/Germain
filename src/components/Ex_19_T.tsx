import { useState } from 'react';
import MathTex from './MathTex.tsx';
import {
  Astuce, Boutons, BlocCode, Cadre, Champ, ChampLigne, Chargement, Correction, Enonce, Formulaire, MessageIncompris, MessageSucces,
  Retour, Titre, ZoneRetour, useTirage,
} from './ExerciceUI.tsx';
import {
  type Comparateur, type Pas, appliquerPas, codePas, comparer, contraire, lireCondition, memeCondition, texComparateur, texPas,
} from '../lib/algo.ts';
import { choisir, entier, valeurDuTexte } from '../lib/maths.ts';

/**
 * Exercice : compléter un script de seuil, puis dire ce qu'il renvoie.
 *
 * Suite arithmétique (u + r) ou géométrique (u × k), croissante ou décroissante, avec un seuil numérique S.
 * Deux réponses :
 *   1. la condition du while (le contraire de la cible « u_n > S », « u_n ≥ S », « u_n < S » ou « u_n ≤ S ») ;
 *   2. la valeur n renvoyée, calculée en simulant le script.
 * La condition est lue puis comparée à la bonne sur de nombreuses valeurs de u autour de S (égalité comprise).
 */

/* ===== Logique ===== */

export type Exercice = { u0: number; pas: Pas; S: number; cible: Comparateur; n: number };

/** Plus petit n tel que la cible soit atteinte (simulation du script). */
export function simuler(pas: Pas, u0: number, S: number, cible: Comparateur): { n: number; suite: number[] } {
  let u = u0;
  let n = 0;
  const suite = [u];
  while (!comparer(cible, u, S)) {
    u = appliquerPas(pas, u);
    suite.push(u);
    n++;
    if (n > 10000) throw new Error('Boucle infinie');
  }
  return { n, suite };
}

export function genererExercice(): Exercice {
  for (;;) {
    const type = choisir(['plus', 'moins', 'fois']);
    let pas: Pas;
    let u0: number;
    let S: number;
    let cible: Comparateur;
    if (type === 'plus') {
      pas = { op: '+', k: entier(2, 9) };
      u0 = entier(0, 20);
      S = entier(50, 200);
      cible = choisir<Comparateur>(['>', '>=']);
    } else if (type === 'moins') {
      pas = { op: '+', k: -entier(2, 9) };
      u0 = entier(100, 300);
      S = entier(0, 60);
      cible = choisir<Comparateur>(['<', '<=']);
    } else {
      pas = { op: '*', k: choisir([2, 3]) };
      u0 = entier(1, 5);
      S = entier(100, 1000);
      cible = choisir<Comparateur>(['>', '>=']);
    }
    const { n } = simuler(pas, u0, S, cible);
    if (n >= 3 && n <= 25) return { u0, pas, S, cible, n };
  }
}

function casAutourDe(S: number) {
  return Array.from({ length: 81 }, (_, i) => ({ u: S + (i - 40) * 0.25 }));
}

export type Verdict =
  | { type: 'incompris'; raison: string }
  | { type: 'resultat'; condition: boolean; valeur: boolean; indice?: string };

export function verifier(exo: Exercice, saisieCondition: string, saisieValeur: string): Verdict {
  const lue = lireCondition(saisieCondition, ['u']);
  if (!lue.ok) return { type: 'incompris', raison: lue.message };
  if (saisieValeur.trim() === '') return { type: 'incompris', raison: 'Indique aussi la valeur renvoyée par seuil().' };
  const v = valeurDuTexte(saisieValeur);
  if (v === null || !Number.isInteger(v)) return { type: 'incompris', raison: 'La valeur renvoyée est un nombre entier (par exemple 12).' };

  const cas = casAutourDe(exo.S);
  const bonne = (env: Record<string, number>) => comparer(contraire(exo.cible), env.u, exo.S);
  const arret = (env: Record<string, number>) => comparer(exo.cible, env.u, exo.S);
  const condition = memeCondition(lue.condition, bonne, cas);
  let indice: string | undefined;
  if (!condition) {
    if (memeCondition(lue.condition, arret, cas)) indice = "Tu as écrit la condition d'arrêt : le while doit continuer tant que la cible n'est pas atteinte.";
    else if (memeCondition(lue.condition, bonne, cas.filter((c) => c.u !== exo.S))) indice = "La condition est presque bonne, mais pas quand u est égal au seuil : regarde < et <=.";
  }
  return { type: 'resultat', condition, valeur: v === exo.n, indice };
}

const texteCible = (c: Comparateur, S: number) => `u_n ${texComparateur(c)} ${S}`;

/* ===== Affichage ===== */

export default function SeuilNumerique() {
  const [exo, regenerer] = useTirage(genererExercice);
  const [condition, setCondition] = useState('');
  const [valeur, setValeur] = useState('');
  const [verdict, setVerdict] = useState<Verdict | null>(null);

  if (!exo) return <Chargement />;

  const { u0, pas, S, cible, n } = exo;
  const attendue = `u ${contraire(cible)} ${S}`;
  const { suite } = simuler(pas, u0, S, cible);

  function valider() {
    setVerdict(verifier(exo as Exercice, condition, valeur));
  }

  function nouvelExercice() {
    regenerer();
    setCondition('');
    setValeur('');
    setVerdict(null);
  }

  const reussi = verdict?.type === 'resultat' && verdict.condition && verdict.valeur;

  return (
    <Cadre>
      <Titre />
      <Enonce>
        <p>
          On considère la suite <MathTex tex="(u_n)" /> définie par <MathTex tex={`u_0 = ${u0}`} /> et, pour tout entier naturel n,{' '}
          <MathTex tex={texPas(pas)} />.
        </p>
        <p>
          On cherche le plus petit entier n tel que <MathTex tex={texteCible(cible, S)} />. Complète la condition du{' '}
          <code>while</code> pour que <code>seuil()</code> renvoie ce nombre n, puis indique la valeur renvoyée.
        </p>
      </Enonce>

      <Formulaire onValider={valider}>
        <BlocCode legende="Script Python">
          {`def seuil():\n    n = 0\n    u = ${u0}\n    while `}
          <ChampLigne etiquette="Condition du while" valeur={condition} onChange={setCondition} placeholder="u … " maxLength={30} />
          {` :\n        ${codePas(pas)}\n        n = n + 1\n    return n`}
        </BlocCode>
        <p className="exercice-aide">Écris la condition comme en Python (opérateurs &lt;, &lt;=, &gt;, &gt;=), avec la lettre u.</p>
        <Champ libelle="Valeur renvoyée par seuil()" valeur={valeur} onChange={setValeur} maxLength={8} placeholder="Ex : 12" />
        <Boutons onNouveau={nouvelExercice} />
      </Formulaire>

      <ZoneRetour>
        {verdict?.type === 'incompris' && <MessageIncompris raison={verdict.raison} />}
        {reussi && (
          <MessageSucces>
            <p>
              <code>while {attendue}</code> convient, et <code>seuil()</code> renvoie bien {n} : <MathTex tex={`u_{${n}} = ${suite[n]}`} />.
            </p>
          </MessageSucces>
        )}
        {verdict?.type === 'resultat' && !reussi && (
          <Retour type="faux">
            <p>
              Oups, une erreur s'est glissée.{' '}
              {verdict.condition ? 'La condition est bonne, mais la valeur renvoyée est fausse.' : verdict.valeur ? 'La valeur est bonne, mais la condition est fausse.' : 'La condition et la valeur sont à revoir.'}{' '}
              {verdict.indice}
            </p>
            <Correction>
              <li>
                On cherche le premier rang où <MathTex tex={texteCible(cible, S)} /> est vrai. Tant que ce n'est pas le cas, la boucle doit
                continuer : la condition est le <strong>contraire</strong> de la cible, c'est-à-dire{' '}
                <code>
                  u {contraire(cible)} {S}
                </code>
                .
              </li>
              <li>
                Les premiers termes sont : {suite.slice(0, Math.min(suite.length, 6)).join(' ; ')}
                {suite.length > 6 ? ' ; …' : ''}. Le terme <MathTex tex={`u_{${n}}`} /> vaut {suite[n]} et {n === 0 ? '' : <>le terme précédent <MathTex tex={`u_{${n - 1}}`} /> vaut {suite[n - 1]}</>}
                {n === 0 ? '' : ' : '}
                <MathTex tex={texteCible(cible, S)} /> est vrai pour la première fois à n = {n}.
              </li>
              <li>
                Le script compte les tours avec <code>n = n + 1</code> : il renvoie <code>{n}</code>.
              </li>
            </Correction>
            <Astuce titre="Pour réussir la prochaine fois">
              <ul>
                <li>La condition d'un while décrit quand on CONTINUE, pas quand on s'arrête.</li>
                <li>Le contraire de &gt; est &lt;= ; le contraire de &gt;= est &lt;.</li>
                <li>Pour la valeur renvoyée, cherche le premier terme qui atteint le seuil et lis son rang n.</li>
              </ul>
            </Astuce>
          </Retour>
        )}
      </ZoneRetour>
    </Cadre>
  );
}
