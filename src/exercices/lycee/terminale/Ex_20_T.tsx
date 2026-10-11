import { useState } from 'react';
import MathTex from '@/components/math/MathTex.tsx';
import {
  Astuce, Boutons, BlocCode, Cadre, Chargement, Choix, Correction, Enonce, Formulaire, MessageIncompris, MessageSucces, Retour,
  Titre, ZoneRetour, useTirage,
} from '@/components/exercice/ExerciceUI.tsx';
import { type Comparateur, type Pas, appliquerPas, codePas, comparer, texPas } from '@/lib/algo.ts';
import { choisir, entier, melanger } from '@/lib/maths.ts';

/**
 * Exercice : que renvoie un script qui cherche le seuil d'une SOMME de termes ?
 *
 *   def seuil_somme():
 *       n = 0
 *       u = u0
 *       s = u0
 *       while s <= S:         (ou  s < S)
 *           n = n + 1
 *           u = u + r         (ou  u * k)
 *           s = s + u
 *       return n
 *
 * Suite arithmétique ou géométrique à termes positifs. La bonne réponse est calculée en SIMULANT le script.
 * Distracteurs : n − 1, n + 1 et la dernière valeur de s.
 */

/* ===== Logique ===== */

export type Donnees = { u0: number; pas: Pas; S: number; op: Comparateur };
export type Exercice = Donnees & { options: string[]; bonne: string };

export function executer({ u0, pas, S, op }: Donnees) {
  let n = 0;
  let u = u0;
  let s = u0;
  const lignes = [{ n, u, s, continue: comparer(op, s, S) }];
  while (comparer(op, s, S)) {
    n += 1;
    u = appliquerPas(pas, u);
    s += u;
    lignes.push({ n, u, s, continue: comparer(op, s, S) });
    if (n > 1000) throw new Error('Boucle infinie');
  }
  return { n, s, lignes };
}

export function genererExercice(): Exercice {
  for (;;) {
    const geometrique = Math.random() < 0.35;
    const pas: Pas = geometrique ? { op: '*', k: choisir([2, 3]) } : { op: '+', k: entier(2, 9) };
    const donnees: Donnees = {
      u0: geometrique ? entier(1, 4) : entier(1, 12),
      pas,
      S: geometrique ? entier(20, 400) : entier(30, 250),
      op: choisir<Comparateur>(['<=', '<']),
    };
    const { n, s } = executer(donnees);
    if (n < 3 || n > 8) continue;
    const options = melanger([String(n), String(n - 1), String(n + 1), String(s)]);
    if (new Set(options).size === 4) return { ...donnees, options, bonne: String(n) };
  }
}

/** Le script Python affiché. */
export const script = ({ u0, pas, S, op }: Donnees) =>
  `def seuil_somme():\n    n = 0\n    u = ${u0}\n    s = ${u0}\n    while s ${op} ${S}:\n        n = n + 1\n        ${codePas(pas)}\n        s = s + u\n    return n`;

/* ===== Affichage ===== */

export default function SeuilSomme() {
  const [exo, regenerer] = useTirage(genererExercice);
  const [reponse, setReponse] = useState<string | null>(null);
  const [retour, setRetour] = useState<null | 'vide' | 'correct' | 'faux'>(null);

  if (!exo) return <Chargement />;

  const { u0, pas, S, op } = exo;
  const exe = executer(exo);
  const cibleTex = op === '<=' ? `S_n > ${S}` : `S_n \\ge ${S}`;

  function valider() {
    if (reponse === null) return setRetour('vide');
    setRetour(reponse === exo?.bonne ? 'correct' : 'faux');
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
        <p>
          On considère la suite <MathTex tex="(u_n)" /> définie par <MathTex tex={`u_0 = ${u0}`} /> et, pour tout entier naturel n,{' '}
          <MathTex tex={texPas(pas)} />. On note <MathTex tex="S_n = u_0 + u_1 + \dots + u_n" />.
        </p>
        <p>
          On souhaite trouver le plus petit entier n tel que <MathTex tex={cibleTex} />. On a écrit le script Python suivant.
        </p>
      </Enonce>
      <BlocCode fichier="seuil_somme.py" legende="Script Python" focus={[5]}>{script(exo)}</BlocCode>

      <Formulaire onValider={valider}>
        <Choix
          legende={
            <>
              Que renvoie l'appel <code>seuil_somme()</code> ?
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
              Quand la boucle s'arrête, <code>s</code> vaut {exe.s} : <code>seuil_somme()</code> renvoie bien <code>{exo.bonne}</code>.
            </p>
          </MessageSucces>
        )}
        {retour === 'faux' && (
          <Retour type="faux">
            <p>
              Oups, une erreur s'est glissée. <code>seuil_somme()</code> renvoie <code>{exo.bonne}</code>
              {reponse === String(exe.s) ? " (tu as donné la dernière valeur de s, mais la fonction renvoie n)." : '.'}
            </p>
            <Correction>
              <li>
                Initialisation : <code>n = 0</code>, <code>u = {u0}</code>, <code>s = {u0}</code>. La boucle continue tant que{' '}
                <code>
                  s {op} {S}
                </code>
                .
              </li>
              {exe.lignes.map((l) => (
                <li key={l.n}>
                  n = {l.n}, u = {l.u}, s = {l.s} :{' '}
                  <code>
                    {l.s} {op} {S}
                  </code>{' '}
                  est {l.continue ? 'vrai : on continue (n augmente, u et s sont mis à jour).' : 'faux : la boucle s’arrête.'}
                </li>
              ))}
              <li>
                La fonction renvoie <code>n</code>, soit <code>{exo.bonne}</code> : c'est le premier rang pour lequel <MathTex tex={cibleTex} />.
              </li>
            </Correction>
            <Astuce titre="Pour réussir la prochaine fois">
              <ul>
                <li>Dans le tableau, teste la condition sur s à chaque ligne, avant de continuer.</li>
                <li>n, u et s sont mis à jour dans l'ordre du script : n d'abord, puis u, puis s (avec le nouveau u).</li>
                <li>La fonction renvoie n, pas la somme s.</li>
              </ul>
            </Astuce>
          </Retour>
        )}
      </ZoneRetour>
    </Cadre>
  );
}
