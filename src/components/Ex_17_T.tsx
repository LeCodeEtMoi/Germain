import { useState } from 'react';
import {
  Astuce, Boutons, BlocCode, Cadre, Chargement, Choix, Correction, Enonce, Formulaire, MessageIncompris, MessageSucces, Retour,
  Titre, ZoneRetour, useTirage,
} from './ExerciceUI.tsx';
import { type Comparateur, comparer, pyNombre } from '../lib/algo.ts';
import { choisir, entier, melanger } from '../lib/maths.ts';

/**
 * Exercice : que renvoie un script avec une boucle while ?
 *
 *   def seuil():
 *       n = 0
 *       u = u0
 *       while u >= S:           (ou  u > S)
 *           u = r * u + c
 *           n = n + 1
 *       return n
 *
 * Les paramètres sont tirés de façon que la boucle s'arrête toujours (la suite décroît vers c/(1 − r) < S) après
 * 3 à 7 tours. La bonne réponse est calculée en SIMULANT le script avec les mêmes nombres flottants que Python
 * (r = 0,5 ; 0,25 ; 0,75 : les calculs sont exacts, l'égalité u = S est donc bien testée).
 * Distracteurs : n − 1, n + 1 et la dernière valeur de u (écrite comme Python l'écrit, par exemple 22.5).
 */

/* ===== Logique ===== */

export type Donnees = { u0: number; r: number; c: number; S: number; op: Comparateur };
export type Execution = { n: number; u: number; trace: { n: number; u: number; continue: boolean }[] };
export type Exercice = Donnees & { options: string[]; bonne: string };

/** Exécute le script (au plus 1000 tours, par sécurité). */
export function executer({ u0, r, c, S, op }: Donnees): Execution | null {
  let n = 0;
  let u = u0;
  const trace: Execution['trace'] = [];
  for (;;) {
    const encore = comparer(op, u, S);
    trace.push({ n, u, continue: encore });
    if (!encore) return { n, u, trace };
    u = r * u + c;
    n += 1;
    if (n > 1000) return null;
  }
}

export function genererExercice(): Exercice {
  for (let essai = 0; essai < 10000; essai++) {
    const r = choisir([0.5, 0.25, 0.75]);
    const c = entier(1, 12);
    const limite = c / (1 - r);
    const S = entier(10, 60);
    const u0 = choisir([80, 100, 120, 150, 200]);
    const op = choisir<Comparateur>(['>=', '>']);
    if (!(limite < S - 1 && u0 > S)) continue;
    const donnees: Donnees = { u0, r, c, S, op };
    const exe = executer(donnees);
    if (!exe || exe.n < 3 || exe.n > 7) continue;
    const bonne = String(exe.n);
    const options = melanger([bonne, String(exe.n - 1), String(exe.n + 1), pyNombre(exe.u, true)]);
    if (new Set(options).size !== 4) continue;
    return { ...donnees, options, bonne };
  }
  // Valeurs de secours (jamais atteintes en pratique) : le script de l'énoncé d'origine
  return { u0: 100, r: 0.5, c: 10, S: 25, op: '>=', options: ['4', '5', '6', '22.5'], bonne: '5' };
}

/** Le script Python affiché. */
export const script = ({ u0, r, c, S, op }: Donnees) =>
  `def seuil():\n    n = 0\n    u = ${u0}\n    while u ${op} ${S}:\n        u = ${r} * u + ${c}\n        n = n + 1\n    return n`;

/* ===== Affichage ===== */

export default function SeuilWhileAnalyse() {
  const [exo, regenerer] = useTirage(genererExercice);
  const [reponse, setReponse] = useState<string | null>(null);
  const [retour, setRetour] = useState<null | 'vide' | 'correct' | 'faux'>(null);

  if (!exo) return <Chargement />;

  const { u0, r, c, S, op } = exo;
  const exe = executer(exo) as Execution;

  function valider() {
    if (reponse === null) return setRetour('vide');
    setRetour(reponse === exo?.bonne ? 'correct' : 'faux');
  }

  function nouvelExercice() {
    regenerer();
    setReponse(null);
    setRetour(null);
  }

  // Les valeurs de u : entier au départ, flottants ensuite (comme en Python)
  const valeur = (t: { n: number; u: number }) => pyNombre(t.u, t.n > 0);
  const dernierU = pyNombre(exe.u, exe.n > 0);

  return (
    <Cadre>
      <Titre />
      <Enonce>
        <p>On considère la fonction Python suivante.</p>
      </Enonce>
      <BlocCode legende="Script Python">{script(exo)}</BlocCode>

      <Formulaire onValider={valider}>
        <Choix
          legende={
            <>
              Que renvoie l'appel <code>seuil()</code> ?
            </>
          }
          enLigne
          valeur={reponse}
          onChange={setReponse}
          options={exo.options.map((o) => ({ valeur: o, contenu: <code>{o}</code> }))}
        />
        <Boutons onNouveau={nouvelExercice} />
      </Formulaire>

      <ZoneRetour>
        {retour === 'vide' && <MessageIncompris raison="Choisis une réponse avant de valider." />}
        {retour === 'correct' && (
          <MessageSucces>
            <p>
              La boucle s'arrête quand <code>u</code> vaut {dernierU} : <code>seuil()</code> renvoie bien <code>{exo.bonne}</code>.
            </p>
          </MessageSucces>
        )}
        {retour === 'faux' && (
          <Retour type="faux">
            <p>
              Oups, une erreur s'est glissée. <code>seuil()</code> renvoie <code>{exo.bonne}</code>
              {reponse === dernierU ? " (tu as donné la dernière valeur de u, mais la fonction renvoie n)." : '.'}
            </p>
            <Correction>
              <li>
                Initialisation : <code>n = 0</code> et <code>u = {u0}</code>. La boucle continue tant que{' '}
                <code>
                  u {op} {S}
                </code>{' '}
                est vrai.
              </li>
              {exe.trace.map((t) => (
                <li key={t.n}>
                  n = {t.n}, u = {valeur(t)} :{' '}
                  <code>
                    {valeur(t)} {op} {S}
                  </code>{' '}
                  est {t.continue ? 'vrai' : 'faux'}.{' '}
                  {t.continue ? (
                    <>
                      On entre dans la boucle : <code>u = {r} × {valeur(t)} + {c}</code> donne{' '}
                      {pyNombre(r * t.u + c, true)} et n devient {t.n + 1}.
                    </>
                  ) : (
                    'La condition est fausse : la boucle s’arrête.'
                  )}
                </li>
              ))}
              <li>
                La fonction renvoie <code>n</code>, c'est-à-dire <code>{exo.bonne}</code> (et non la valeur de u).
              </li>
            </Correction>
            <Astuce titre="Pour réussir la prochaine fois">
              <ul>
                <li>Tiens un tableau n / u / condition : à chaque ligne, teste la condition AVANT de modifier u et n.</li>
                <li>Fais attention à l'égalité : avec &gt;=, la boucle continue encore quand u est exactement égal au seuil.</li>
                <li>Vérifie ce que renvoie <code>return</code> : ici n, pas u.</li>
              </ul>
            </Astuce>
          </Retour>
        )}
      </ZoneRetour>
    </Cadre>
  );
}
