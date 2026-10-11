import { useState } from 'react';
import {
  Astuce, Boutons, BlocCode, Cadre, Calcul, Chargement, Choix, Correction, Enonce, Formulaire, MessageIncompris, MessageSucces,
  Retour, Titre, ZoneRetour, useTirage,
} from '@/components/exercice/ExerciceUI.tsx';
import { choisir, entier, melanger } from '@/lib/maths.ts';

/**
 * Exercice : que renvoie une fonction Python qui construit la liste des premiers termes d'une suite ?
 *
 *   def liste_termes(n):
 *       L = []
 *       u = u0
 *       for i in range(n + 1):
 *           L.append(u)
 *           u = a * u + b
 *       return L
 *
 * La bonne réponse est calculée en SIMULANT la boucle. Les trois mauvaises propositions sont les erreurs classiques :
 * oublier le dernier terme (range(n)), en ajouter un (range(n + 2)), ou décaler la liste (partir de u₁).
 */

/* ===== Logique ===== */

export type Donnees = { u0: number; a: number; b: number; n: number };
export type Exercice = Donnees & { options: Proposition[] };

/** Exécute le script : les termes u_0 … u_(tours-1). */
export function executer({ u0, a, b }: Donnees, tours: number, depart = 0): number[] {
  const L: number[] = [];
  let u = u0;
  for (let i = 0; i < depart; i++) u = a * u + b;
  for (let i = 0; i < tours; i++) {
    L.push(u);
    u = a * u + b;
  }
  return L;
}

export const texteListe = (L: number[]) => `[${L.join(', ')}]`;

export type Proposition = { valeur: string; juste: boolean; erreur?: string };

export function genererExercice(): Exercice {
  for (;;) {
    const donnees: Donnees = { u0: entier(1, 9), a: choisir([2, 3]), b: choisir([-1, 1]) * entier(1, 6), n: entier(2, 4) };
    // on évite la suite constante, qui rendrait les propositions confondues
    if (new Set(executer(donnees, donnees.n + 2)).size === donnees.n + 2) return { ...donnees, options: propositions(donnees) };
  }
}

/** Les quatre propositions (la bonne et trois erreurs), dans un ordre aléatoire. */
export function propositions(exo: Donnees): Proposition[] {
  const { n } = exo;
  return melanger<Proposition>([
    { valeur: texteListe(executer(exo, n + 1)), juste: true },
    { valeur: texteListe(executer(exo, n)), juste: false, erreur: `Il manque le dernier terme : range(n + 1) fait n + 1 = ${n + 1} tours, pas ${n}.` },
    { valeur: texteListe(executer(exo, n + 2)), juste: false, erreur: `Il y a un terme de trop : la boucle fait n + 1 = ${n + 1} tours, pas ${n + 2}.` },
    { valeur: texteListe(executer(exo, n + 1, 1)), juste: false, erreur: "La liste doit commencer par la valeur initiale de u, avant le premier calcul." },
  ]);
}

/** Le script Python affiché. */
export const script = ({ u0, a, b }: Donnees) =>
  `def liste_termes(n):\n    L = []\n    u = ${u0}\n    for i in range(n + 1):\n        L.append(u)\n        u = ${a} * u ${b < 0 ? '-' : '+'} ${Math.abs(b)}\n    return L`;

/* ===== Affichage ===== */

export default function ListeTermes() {
  const [exo, regenerer] = useTirage(genererExercice);
  const [reponse, setReponse] = useState<string | null>(null);
  const [retour, setRetour] = useState<null | 'vide' | 'correct' | 'faux'>(null);

  if (!exo) return <Chargement />;

  const { u0, a, b, n, options: liste } = exo;
  const juste = liste.find((p) => p.juste) as Proposition;
  const choisie = liste.find((p) => p.valeur === reponse);

  function valider() {
    if (reponse === null) return setRetour('vide');
    setRetour(choisie?.juste ? 'correct' : 'faux');
  }

  function nouvelExercice() {
    regenerer();
    setReponse(null);
    setRetour(null);
  }

  // Déroulement pas à pas, pour la correction
  const tours: { i: number; ajout: number; apres: number[]; suivant: number }[] = [];
  let u = u0;
  const L: number[] = [];
  for (let i = 0; i <= n; i++) {
    L.push(u);
    const suivant = a * u + b;
    tours.push({ i, ajout: u, apres: [...L], suivant });
    u = suivant;
  }

  return (
    <Cadre>
      <Titre />
      <Enonce>
        <p>
          On considère la fonction Python suivante, qui prend en paramètre un entier <code>n</code>.
        </p>
      </Enonce>
      <BlocCode fichier="script.py" legende="Script Python">{script(exo)}</BlocCode>

      <Formulaire onValider={valider}>
        <Choix
          legende={
            <>
              Que renvoie l'appel <code>liste_termes({n})</code> ?
            </>
          }
          valeur={reponse}
          onChange={setReponse}
          options={liste.map((p) => ({ valeur: p.valeur, contenu: <code>{p.valeur}</code> }))}
        />
        <Boutons onNouveau={nouvelExercice} />
      </Formulaire>

      <ZoneRetour>
        {retour === 'vide' && <MessageIncompris raison="Choisis une réponse avant de valider." />}
        {retour === 'correct' && (
          <MessageSucces>
            <p>
              <code>liste_termes({n})</code> renvoie bien <code>{juste.valeur}</code> : la liste des termes u₀ à u{subscript(n)}.
            </p>
          </MessageSucces>
        )}
        {retour === 'faux' && (
          <Retour type="faux">
            <p>
              Oups, une erreur s'est glissée. La bonne réponse est <code>{juste.valeur}</code>.
              {choisie?.erreur ? ` ${choisie.erreur}` : ''}
            </p>
            <Correction>
              <li>
                Initialisation : <code>L = []</code> et <code>u = {u0}</code>.
              </li>
              <li>
                <code>range({n} + 1)</code> = <code>range({n + 1})</code> : la boucle fait {n + 1} tours (i = 0, 1, …, {n}).
              </li>
              {tours.map((t) => (
                <li key={t.i}>
                  i = {t.i} : <code>L.append({t.ajout})</code>, donc <code>L = {texteListe(t.apres)}</code> ; puis{' '}
                  <Calcul>
                    u = {a} × {t.ajout < 0 ? `(${t.ajout})` : t.ajout} {b < 0 ? '−' : '+'} {Math.abs(b)} = {t.suivant}
                  </Calcul>
                  .
                </li>
              ))}
              <li>
                La fonction renvoie <code>L</code> : <code>{juste.valeur}</code>.
              </li>
            </Correction>
            <Astuce titre="Pour réussir la prochaine fois">
              <ul>
                <li>range(n + 1) donne n + 1 tours : les valeurs de i vont de 0 à n.</li>
                <li>L.append(u) est exécuté AVANT le calcul du terme suivant : le premier élément de la liste est la valeur initiale.</li>
                <li>Écris un tableau avec i, u et L à chaque tour : c'est la méthode la plus sûre.</li>
              </ul>
            </Astuce>
          </Retour>
        )}
      </ZoneRetour>
    </Cadre>
  );
}

const CHIFFRES = '₀₁₂₃₄₅₆₇₈₉';
const subscript = (k: number) => String(k).split('').map((c) => CHIFFRES[Number(c)]).join('');
