import { createElement, useEffect, useRef, useState } from 'react';
import MathTex from './MathTex.tsx';
import {
  Astuce, Boutons, Cadre, Calcul, Champ, Chargement, Correction, Enonce, Formulaire, MessageIncompris, MessageSucces,
  Retour, Titre, ZoneRetour, useTirage,
} from './ExerciceUI.tsx';
import { analyser, entier, equivalents, type Noeud } from '../lib/maths.ts';

/**
 * Exercice : dériver f(x) = a·x^b.
 *
 * Maths : f'(x) = a·b·x^(b−1).
 * La saisie se fait dans un champ mathématique MathLive (LaTeX). Elle est lue par
 * l'analyseur de maths.ts, puis comparée numériquement à a·b·x^(b−1) en plusieurs
 * valeurs de x : toute écriture équivalente est acceptée (12x^3, 12*x^{3}, 4·3x³, 12x\cdot x^2…).
 * Si MathLive ne se charge pas, un champ texte ordinaire prend le relais.
 */

/* ===== Logique ===== */

export type Exercice = { a: number; b: number };

export const genererExercice = (): Exercice => ({ a: entier(2, 10), b: entier(2, 5) });

const POINTS = [-2.3, -0.7, 0.6, 1.4, 2.9];

const texMonome = (c: number, e: number) => (e === 0 ? `${c}` : e === 1 ? `${c}x` : `${c}x^{${e}}`);
const asciiMonome = (c: number, e: number) => (e === 0 ? `${c}` : `${c}*x^${e}`);

const lire = (texte: string, noeud: boolean): Noeud | null => {
  const r = analyser(texte, { variables: ['x'], latex: noeud });
  return r.ok ? r.noeud : null;
};

export type Verdict =
  | { type: 'incompris'; raison: string }
  | { type: 'correct' }
  | { type: 'faux'; indice: string };

/**
 * @param saisie texte saisi (LaTeX si `latex`, sinon écriture au clavier : 12x^3)
 */
export function verifier({ a, b }: Exercice, saisie: string, latex: boolean): Verdict {
  if (saisie.trim() === '') return { type: 'incompris', raison: 'Écris ta dérivée avant de valider.' };
  const lu = analyser(saisie, { variables: ['x'], latex });
  if (!lu.ok) return { type: 'incompris', raison: lu.message };

  const egal = (ascii: string) => {
    const ref = lire(ascii, false);
    if (!ref) throw new Error(`Expression de référence illisible : ${ascii}`);
    return equivalents(lu.noeud, ref, 'x', POINTS);
  };

  if (egal(asciiMonome(a * b, b - 1))) return { type: 'correct' };

  // Faux : on cherche l'erreur classique pour donner un conseil précis
  let indice = "Ta réponse n'est pas la dérivée de f. Applique la formule (a·xⁿ)' = a·n·xⁿ⁻¹.";
  if (egal(asciiMonome(a, b))) {
    indice = "Tu as recopié f(x) : il faut la dériver.";
  } else if (egal(asciiMonome(a, b - 1))) {
    indice = "Tu as oublié de multiplier par l'exposant : la dérivée de a·xⁿ est a·n·xⁿ⁻¹, pas a·xⁿ⁻¹.";
  } else if (egal(asciiMonome(a * b, b))) {
    indice = "Tu as bien multiplié par l'exposant, mais il faut aussi le diminuer de 1.";
  } else if (egal(asciiMonome(b, b - 1))) {
    indice = "Le coefficient a de la fonction doit rester en facteur : on obtient a×n, pas seulement n.";
  } else if (egal(asciiMonome(a * b, b - 2))) {
    indice = "L'exposant ne se diminue qu'une seule fois : n devient n − 1.";
  } else if (egal(`${a}/${b + 1}*x^${b + 1}`)) {
    indice = "Tu as calculé une primitive (on augmente l'exposant). Pour dériver, on le diminue de 1.";
  }
  return { type: 'faux', indice };
}

/* ===== Affichage ===== */

type EtatMathLive = 'attente' | 'pret' | 'echec';

export default function Derivation() {
  const [exo, regenerer] = useTirage(genererExercice);
  const [saisie, setSaisie] = useState('');
  const [verdict, setVerdict] = useState<Verdict | null>(null);
  const [etat, setEtat] = useState<EtatMathLive>('attente');
  const champ = useRef<HTMLElement & { value: string }>(null);

  // MathLive est chargé dans le navigateur uniquement (il utilise le DOM)
  useEffect(() => {
    let actif = true;
    import('mathlive')
      .then(() => actif && setEtat('pret'))
      .catch(() => actif && setEtat('echec'));
    return () => {
      actif = false;
    };
  }, []);

  // Le champ MathLive prévient à chaque frappe
  useEffect(() => {
    const el = champ.current;
    if (!el || etat !== 'pret') return;
    const surSaisie = () => setSaisie(el.value);
    el.addEventListener('input', surSaisie);
    return () => el.removeEventListener('input', surSaisie);
  }, [etat, exo]);

  if (!exo) return <Chargement />;

  const { a, b } = exo;

  function valider() {
    setVerdict(verifier(exo as Exercice, saisie, etat === 'pret'));
  }

  function nouvelExercice() {
    regenerer();
    setSaisie('');
    setVerdict(null);
    if (champ.current) champ.current.value = '';
  }

  return (
    <Cadre>
      <Titre />
      <Enonce>
        <p>Détermine la fonction dérivée de la fonction f définie sur ℝ par :</p>
        <div className="exercice-formule">
          <MathTex tex={`f(x) = ${texMonome(a, b)}`} />
        </div>
      </Enonce>

      <Formulaire onValider={valider}>
        {etat === 'echec' ? (
          <Champ
            libelle="f'(x) ="
            valeur={saisie}
            onChange={setSaisie}
            placeholder="Ex : 12x^3"
            aide="Écris la puissance avec ^ (par exemple 12x^3)."
          />
        ) : (
          <>
            <label className="exercice-label" id="libelle-derivee">
              f'(x) =
            </label>
            {createElement('math-field', {
              ref: champ,
              'aria-labelledby': 'libelle-derivee',
              'aria-label': "Saisie de la dérivée f'(x)",
            })}
            <p className="exercice-aide">
              Utilise ^ pour une puissance (x^3 donne x³) puis la flèche → pour sortir de l'exposant.
            </p>
          </>
        )}
        <Boutons onNouveau={nouvelExercice} />
      </Formulaire>

      <ZoneRetour>
        {verdict?.type === 'incompris' && <MessageIncompris raison={verdict.raison} />}
        {verdict?.type === 'correct' && (
          <MessageSucces>
            <p>
              Bien vu : <MathTex tex={`f'(x) = ${texMonome(a * b, b - 1)}`} />
            </p>
          </MessageSucces>
        )}
        {verdict?.type === 'faux' && (
          <Retour type="faux">
            <p>Oups, une erreur s'est glissée. {verdict.indice}</p>
            <Correction>
              <li>
                Pour une fonction <Calcul>a·xⁿ</Calcul>, la dérivée est <Calcul>a·n·xⁿ⁻¹</Calcul>.
              </li>
              <li>
                Ici, <Calcul>a = {a}</Calcul> et <Calcul>n = {b}</Calcul>.
              </li>
              <li>
                Le nouveau coefficient est <Calcul>a × n = {a} × {b} = {a * b}</Calcul>.
              </li>
              <li>
                Le nouvel exposant est <Calcul>n − 1 = {b} − 1 = {b - 1}</Calcul>.
              </li>
              <li>
                Donc <MathTex tex={`f'(x) = ${texMonome(a * b, b - 1)}`} />.
              </li>
            </Correction>
            <Astuce titre="Pour réussir la prochaine fois">
              <ul>
                <li>Deux choses changent : le coefficient est multiplié par l'exposant, et l'exposant diminue de 1.</li>
                <li>Une constante multiplicative reste en facteur quand on dérive.</li>
                <li>Pour vérifier : dérive un exemple simple, la dérivée de 3x² est 6x.</li>
              </ul>
            </Astuce>
          </Retour>
        )}
      </ZoneRetour>
    </Cadre>
  );
}
