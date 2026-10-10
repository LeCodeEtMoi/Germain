import { useState } from 'react';
import MathTex from './MathTex.tsx';
import {
  Astuce, Boutons, Cadre, Chargement, Choix, Correction, Enonce, Formulaire, MessageIncompris, MessageSucces, Retour, Titre,
  ZoneRetour, useTirage,
} from './ExerciceUI.tsx';
import { choisir, combinaison, entier } from '../lib/maths.ts';

/**
 * Exercice : continuité et dérivabilité d'une fonction définie par morceaux.
 *
 *   f(x) = a·x² + b   si x ≤ x₀
 *   f(x) = c·x + d    si x > x₀
 *
 * Les trois situations sont tirées avec la même probabilité (l'énoncé d'origine ne donnait presque jamais une fonction
 * continue) :
 *   · non continue en x₀ ;
 *   · continue mais non dérivable en x₀ ;
 *   · continue et dérivable en x₀ (c = 2·a·x₀).
 * La bonne réponse est CALCULÉE à partir des coefficients : limites à gauche et à droite, puis nombres dérivés.
 */

/* ===== Logique ===== */

export type Cas = 'discontinue' | 'continue' | 'derivable';

export type Exercice = { a: number; b: number; c: number; d: number; x0: number };

/** Valeur et dérivée à gauche, valeur et dérivée à droite, en x₀. */
export function bilan({ a, b, c, d, x0 }: Exercice) {
  return {
    gauche: a * x0 * x0 + b,
    droite: c * x0 + d,
    deriveeGauche: 2 * a * x0,
    deriveeDroite: c,
  };
}

export function situation(exo: Exercice): Cas {
  const t = bilan(exo);
  if (t.gauche !== t.droite) return 'discontinue';
  return t.deriveeGauche === t.deriveeDroite ? 'derivable' : 'continue';
}

export function genererExercice(voulu: Cas = choisir<Cas>(['discontinue', 'continue', 'derivable'])): Exercice {
  for (;;) {
    const a = choisir([-1, 1]) * entier(1, 4);
    const b = entier(-5, 5);
    const x0 = choisir([-2, -1, 1, 2, 3]);
    const gauche = a * x0 * x0 + b;
    let c = 2 * a * x0;
    if (voulu === 'continue') c = entier(-8, 8);
    if (voulu === 'discontinue') c = entier(-8, 8);
    let d = gauche - c * x0;
    if (voulu === 'discontinue') d += choisir([-1, 1]) * entier(1, 4);
    const exo = { a, b, c, d, x0 };
    if (situation(exo) === voulu) return exo;
  }
}

const LIBELLES: Record<Cas, string> = {
  discontinue: "f n'est pas continue en x₀",
  continue: "f est continue en x₀ mais n'est pas dérivable en x₀",
  derivable: 'f est continue et dérivable en x₀',
};

/* ===== Affichage ===== */

export default function ContinuiteMorceaux() {
  const [exo, regenerer] = useTirage(genererExercice);
  const [reponse, setReponse] = useState<string | null>(null);
  const [retour, setRetour] = useState<null | 'vide' | 'correct' | 'faux'>(null);

  if (!exo) return <Chargement />;

  const { a, b, c, d, x0 } = exo;
  const juste = situation(exo);
  const t = bilan(exo);
  const f1 = combinaison([[a, 'x^{2}'], [b, '']], true);
  const f2 = combinaison([[c, 'x'], [d, '']], true);
  const x0Tex = String(x0);
  const lib = (cas: Cas) => LIBELLES[cas].replace('x₀', `x = ${x0}`).replace('x₀', `x = ${x0}`);

  function valider() {
    if (reponse === null) return setRetour('vide');
    setRetour(reponse === juste ? 'correct' : 'faux');
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
        <p>Soit f la fonction définie sur ℝ par :</p>
        <div className="exercice-formule">
          <MathTex
            tex={`f(x) = \\begin{cases} ${f1} & \\text{si } x \\le ${x0Tex} \\\\ ${f2} & \\text{si } x > ${x0Tex} \\end{cases}`}
          />
        </div>
        <p>Que peut-on dire de f en x = {x0} ?</p>
      </Enonce>

      <Formulaire onValider={valider}>
        <Choix
          legende="Choisis la bonne affirmation"
          valeur={reponse}
          onChange={setReponse}
          options={(Object.keys(LIBELLES) as Cas[]).map((valeur) => ({ valeur, contenu: lib(valeur) }))}
        />
        <Boutons onNouveau={nouvelExercice} />
      </Formulaire>

      <ZoneRetour>
        {retour === 'vide' && <MessageIncompris raison="Choisis une réponse avant de valider." />}
        {retour === 'correct' && (
          <MessageSucces>
            <p>
              {juste === 'discontinue'
                ? `Les limites à gauche (${t.gauche}) et à droite (${t.droite}) sont différentes : f n’est pas continue en ${x0}.`
                : juste === 'continue'
                  ? `Les deux morceaux se rejoignent (${t.gauche}), mais les nombres dérivés à gauche (${t.deriveeGauche}) et à droite (${t.deriveeDroite}) diffèrent.`
                  : `Les deux morceaux se rejoignent (${t.gauche}) avec le même nombre dérivé (${t.deriveeGauche}).`}
            </p>
          </MessageSucces>
        )}
        {retour === 'faux' && (
          <Retour type="faux">
            <p>Oups, une erreur s'est glissée. {lib(juste)}.</p>
            <Correction>
              <li>
                <strong>Continuité.</strong> À gauche de {x0}, f(x) = {f1.replace(/\^\{2\}/g, '²')}, donc{' '}
                <MathTex tex={`\\lim_{x \\to ${x0Tex}^-} f(x) = f(${x0Tex}) = ${t.gauche}`} />. À droite, f(x) = {f2},
                donc <MathTex tex={`\\lim_{x \\to ${x0Tex}^+} f(x) = ${t.droite}`} />.
              </li>
              {t.gauche !== t.droite ? (
                <li>
                  Les deux limites sont différentes ({t.gauche} ≠ {t.droite}) : f n'est pas continue en {x0}, donc elle n'est pas
                  dérivable en {x0}.
                </li>
              ) : (
                <>
                  <li>
                    Les deux limites sont égales à {t.gauche} = f({x0}) : f est continue en {x0}.
                  </li>
                  <li>
                    <strong>Dérivabilité.</strong> À gauche, f'(x) = {2 * a}x, donc le nombre dérivé à gauche est{' '}
                    <MathTex tex={`${2 * a} \\times ${x0 < 0 ? `(${x0})` : x0} = ${t.deriveeGauche}`} />. À droite, f'(x) = {c}, donc le
                    nombre dérivé à droite est {t.deriveeDroite}.
                  </li>
                  <li>
                    {t.deriveeGauche === t.deriveeDroite
                      ? `Les deux nombres dérivés sont égaux (${t.deriveeGauche}) : f est dérivable en ${x0}.`
                      : `Les nombres dérivés sont différents (${t.deriveeGauche} ≠ ${t.deriveeDroite}) : f n'est pas dérivable en ${x0} (la courbe a un point anguleux).`}
                  </li>
                </>
              )}
            </Correction>
            <Astuce titre="Pour réussir la prochaine fois">
              <ul>
                <li>Commence par la continuité : compare les valeurs obtenues à gauche et à droite du point.</li>
                <li>Une fonction non continue en un point n'est jamais dérivable en ce point.</li>
                <li>Pour la dérivabilité, compare les dérivées de chaque morceau (et non les valeurs de f) au point étudié.</li>
              </ul>
            </Astuce>
          </Retour>
        )}
      </ZoneRetour>
    </Cadre>
  );
}
