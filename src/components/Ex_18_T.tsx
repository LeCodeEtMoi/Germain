import { useState } from 'react';
import {
  Astuce, Boutons, BlocCode, Cadre, Chargement, Choix, Correction, Enonce, Formulaire, MessageIncompris, MessageSucces, Retour,
  Titre, ZoneRetour, useTirage,
} from './ExerciceUI.tsx';
import MathTex from './MathTex.tsx';
import { type Pas, appliquerPas, codePas, pyNombre, texPas } from '../lib/algo.ts';
import { choisir, entier, melanger } from '../lib/maths.ts';

/**
 * Exercice : que renvoie une fonction qui calcule la somme des premiers termes d'une suite ?
 *
 *   def somme(n):
 *       u = u0
 *       s = 0
 *       for i in range(n + 1):
 *           s = s + u
 *           u = u * 0.5          (ou  u * 2, u * 3, u + d)
 *       return s
 *
 * La bonne réponse est calculée en SIMULANT le script, y compris le type du résultat : avec un coefficient décimal,
 * Python renvoie un flottant (175.0 et non 175). Les propositions sont écrites comme Python les affiche.
 * Distracteurs : somme de n termes, somme de n + 2 termes, dernière valeur de u.
 */

/* ===== Logique ===== */

export type Donnees = { u0: number; pas: Pas; n: number };
export type Exercice = Donnees & { options: string[]; bonne: string };

/** Les valeurs successives de s et de u, avec leur type Python (flottant ou entier). */
export function executer({ u0, pas }: Donnees, tours: number) {
  const decimal = pas.op === '*' && !Number.isInteger(pas.k);
  let u = u0;
  let uFlottant = false;
  let s = 0;
  let sFlottant = false;
  const lignes: { i: number; s: number; sTexte: string; u: number; uTexte: string }[] = [];
  for (let i = 0; i < tours; i++) {
    s += u;
    sFlottant = sFlottant || uFlottant;
    u = appliquerPas(pas, u);
    uFlottant = uFlottant || decimal;
    lignes.push({ i, s, sTexte: pyNombre(s, sFlottant), u, uTexte: pyNombre(u, uFlottant) });
  }
  return { s, sTexte: pyNombre(s, sFlottant), u, uTexte: pyNombre(u, uFlottant), lignes };
}

export function genererExercice(): Exercice {
  for (;;) {
    const type = choisir(['demi', 'double', 'triple', 'plus']);
    const pas: Pas =
      type === 'demi' ? { op: '*', k: 0.5 } : type === 'double' ? { op: '*', k: 2 } : type === 'triple' ? { op: '*', k: 3 } : { op: '+', k: choisir([-1, 1]) * entier(2, 7) };
    const u0 = type === 'demi' ? choisir([40, 64, 80, 100, 160, 200]) : type === 'plus' ? entier(1, 20) : entier(1, 10);
    const donnees: Donnees = { u0, pas, n: entier(2, 4) };
    const { n } = donnees;
    const bonne = executer(donnees, n + 1).sTexte;
    const options = melanger([bonne, executer(donnees, n).sTexte, executer(donnees, n + 2).sTexte, executer(donnees, n + 1).uTexte]);
    if (new Set(options).size === 4) return { ...donnees, options, bonne };
  }
}

/** Le script Python affiché. */
export const script = ({ u0, pas }: Donnees) =>
  `def somme(n):\n    u = ${u0}\n    s = 0\n    for i in range(n + 1):\n        s = s + u\n        ${codePas(pas)}\n    return s`;

/* ===== Affichage ===== */

export default function SommeTermes() {
  const [exo, regenerer] = useTirage(genererExercice);
  const [reponse, setReponse] = useState<string | null>(null);
  const [retour, setRetour] = useState<null | 'vide' | 'correct' | 'faux'>(null);

  if (!exo) return <Chargement />;

  const { u0, pas, n } = exo;
  const exe = executer(exo, n + 1);

  function valider() {
    if (reponse === null) return setRetour('vide');
    setRetour(reponse === exo?.bonne ? 'correct' : 'faux');
  }

  function nouvelExercice() {
    regenerer();
    setReponse(null);
    setRetour(null);
  }

  const avant = (i: number) => (i === 0 ? { s: '0', u: String(u0) } : { s: exe.lignes[i - 1].sTexte, u: exe.lignes[i - 1].uTexte });

  return (
    <Cadre>
      <Titre />
      <Enonce>
        <p>
          On considère la suite <MathTex tex="(u_n)" /> définie par <MathTex tex={`u_0 = ${u0}`} /> et, pour tout entier naturel n,{' '}
          <MathTex tex={texPas(pas)} />. On souhaite calculer la somme de ses premiers termes avec le script Python ci-dessous.
        </p>
      </Enonce>
      <BlocCode legende="Script Python">{script(exo)}</BlocCode>

      <Formulaire onValider={valider}>
        <Choix
          legende={
            <>
              Que renvoie l'appel <code>somme({n})</code> ?
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
              <code>somme({n})</code> renvoie bien <code>{exo.bonne}</code> : la somme de u₀ à u{n === 2 ? '₂' : n === 3 ? '₃' : '₄'}.
            </p>
          </MessageSucces>
        )}
        {retour === 'faux' && (
          <Retour type="faux">
            <p>
              Oups, une erreur s'est glissée. <code>somme({n})</code> renvoie <code>{exo.bonne}</code>.
              {exo.bonne.includes('.') && !(reponse ?? '').includes('.') && Number(reponse) === Number(exo.bonne)
                ? ' La valeur est la bonne, mais Python écrit un flottant : le résultat s’affiche avec « .0 ».'
                : ''}
            </p>
            <Correction>
              <li>
                Initialisation : <code>u = {u0}</code> et <code>s = 0</code>. <code>range({n} + 1)</code> = <code>range({n + 1})</code> : la
                boucle fait {n + 1} tours (i = 0, …, {n}).
              </li>
              {exe.lignes.map((l) => (
                <li key={l.i}>
                  i = {l.i} : <code>s</code> devient{' '}
                  <code>
                    {avant(l.i).s} + {avant(l.i).u} = {l.sTexte}
                  </code>
                  , puis <code>{codePas(pas)}</code> donne <code>u = {l.uTexte}</code>.
                </li>
              ))}
              <li>
                La fonction renvoie <code>s</code> : <code>{exo.bonne}</code>.
              </li>
            </Correction>
            <Astuce titre="Pour réussir la prochaine fois">
              <ul>
                <li>La boucle fait n + 1 tours : elle additionne les n + 1 termes u₀, …, uₙ.</li>
                <li>s reçoit u AVANT que u soit modifié : le premier terme ajouté est la valeur initiale.</li>
                <li>Un nombre décimal (comme 0.5) dans un calcul rend le résultat flottant : Python affiche alors 175.0.</li>
              </ul>
            </Astuce>
          </Retour>
        )}
      </ZoneRetour>
    </Cadre>
  );
}
