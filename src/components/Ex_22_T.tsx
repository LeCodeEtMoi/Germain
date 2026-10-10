import { useState } from 'react';
import MathTex from './MathTex.tsx';
import {
  Astuce, Boutons, Cadre, ChampLigne, Chargement, Correction, Enonce, Formulaire, MessageIncompris, MessageSucces, Retour, Titre,
  ZoneRetour, useTirage,
} from './ExerciceUI.tsx';
import { melanger, valeurDuTexte } from '../lib/maths.ts';
import { type Ang, type ValeurTrig, VALEURS, ang, memeAng, texAng, texteAng, valeur } from '../lib/trigo.ts';

/**
 * Exercice : compléter un tableau de valeurs remarquables de sin(x) et cos(x).
 *
 * Six angles sont tirés au hasard parmi les multiples de π/6 et de π/4 compris entre −π et 2π
 * (donc pas seulement les angles du premier quadrant). Les valeurs attendues sont calculées avec Math.sin / Math.cos
 * puis reconnues parmi 0, ±1/2, ±√2/2, ±√3/2, ±1 : il n'y a aucune valeur écrite à la main.
 *
 * Correction : chaque case est lue comme une expression (1/2, 0,5, √3/2, sqrt(3)/2, −√2/2…) et comparée par sa valeur.
 */

/* ===== Logique ===== */

const ANGLES: Ang[] = (() => {
  const liste: Ang[] = [];
  for (const d of [6, 4]) for (let k = -d; k <= 2 * d; k++) if (!liste.some((a) => memeAng(a, ang(k, d)))) liste.push(ang(k, d));
  return liste;
})();

export type Ligne = { x: Ang; sin: ValeurTrig; cos: ValeurTrig };
export type Exercice = { lignes: Ligne[] };

/** La valeur remarquable égale à un nombre donné. */
export function reconnaitre(v: number): ValeurTrig {
  const trouvee = VALEURS.find((r) => Math.abs(r.num - v) < 1e-9);
  if (!trouvee) throw new Error(`Valeur non remarquable : ${v}`);
  return trouvee;
}

export function genererExercice(): Exercice {
  const choisis = melanger(ANGLES).slice(0, 6);
  return {
    lignes: choisis.map((x) => ({ x, sin: reconnaitre(Math.sin(valeur(x))), cos: reconnaitre(Math.cos(valeur(x))) })),
  };
}

export function caseJuste(saisie: string, attendue: ValeurTrig): boolean {
  const v = valeurDuTexte(saisie.replace(/[−–—]/g, '-'));
  return v !== null && Math.abs(v - attendue.num) < 1e-9;
}

/** Angle de référence α ∈ [0 ; π/2] : distance au multiple de π le plus proche. |sin x| = sin α et |cos x| = cos α. */
export function angleReference(x: Ang): Ang {
  let meilleur: Ang | null = null;
  for (let k = -4; k <= 4; k++) {
    const dist = ang(Math.abs(x.n - k * x.d), x.d);
    if (meilleur === null || dist.n * meilleur.d < meilleur.n * dist.d) meilleur = dist;
  }
  return meilleur as Ang;
}

const quadrant = (x: Ang): string => {
  const sx = Math.sin(valeur(x));
  const cx = Math.cos(valeur(x));
  const s = Math.abs(sx) < 1e-9 ? 0 : Math.sign(sx);
  const c = Math.abs(cx) < 1e-9 ? 0 : Math.sign(cx);
  if (s === 0 || c === 0) return 'sur un axe du cercle trigonométrique';
  return `${s > 0 ? 'sin positif' : 'sin négatif'}, ${c > 0 ? 'cos positif' : 'cos négatif'}`;
};

/* ===== Affichage ===== */

type Saisies = { sin: string; cos: string }[];

export default function TableauValeurs() {
  const [exo, regenerer] = useTirage(genererExercice);
  const [saisies, setSaisies] = useState<Saisies>(() => Array.from({ length: 6 }, () => ({ sin: '', cos: '' })));
  const [verifie, setVerifie] = useState<null | { vide: boolean; justes: { sin: boolean; cos: boolean }[] }>(null);

  if (!exo) return <Chargement />;

  function modifier(i: number, champ: 'sin' | 'cos', v: string) {
    setSaisies((prec) => prec.map((s, j) => (j === i ? { ...s, [champ]: v } : s)));
  }

  function valider() {
    const e = exo as Exercice;
    const vide = saisies.some((s) => s.sin.trim() === '' || s.cos.trim() === '');
    setVerifie({
      vide,
      justes: e.lignes.map((l, i) => ({ sin: caseJuste(saisies[i].sin, l.sin), cos: caseJuste(saisies[i].cos, l.cos) })),
    });
  }

  function nouvelExercice() {
    regenerer();
    setSaisies(Array.from({ length: 6 }, () => ({ sin: '', cos: '' })));
    setVerifie(null);
  }

  const tout = verifie && !verifie.vide && verifie.justes.every((j) => j.sin && j.cos);
  const nbFaux = verifie ? verifie.justes.reduce((s, j) => s + (j.sin ? 0 : 1) + (j.cos ? 0 : 1), 0) : 0;

  return (
    <Cadre>
      <Titre />
      <Enonce>
        <p>Complète le tableau avec les valeurs exactes de sin(x) et cos(x) (fractions et racines, pas de valeur approchée).</p>
      </Enonce>

      <Formulaire onValider={valider}>
        <div className="exercice-tableau-conteneur">
          <table className="exercice-tableau">
            <thead>
              <tr>
                <th scope="col">x</th>
                <th scope="col">sin(x)</th>
                <th scope="col">cos(x)</th>
              </tr>
            </thead>
            <tbody>
              {exo.lignes.map((l, i) => (
                <tr key={texteAng(l.x)}>
                  <th scope="row">
                    <MathTex tex={texAng(l.x)} />
                  </th>
                  <td>
                    <ChampLigne etiquette={`sin(${texteAng(l.x)})`} valeur={saisies[i].sin} onChange={(v) => modifier(i, 'sin', v)} placeholder="Ex : 1/2" />
                  </td>
                  <td>
                    <ChampLigne etiquette={`cos(${texteAng(l.x)})`} valeur={saisies[i].cos} onChange={(v) => modifier(i, 'cos', v)} placeholder="Ex : √3/2" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="exercice-aide">Tu peux écrire √3/2, sqrt(3)/2, 1/2, 0,5, -√2/2… Pour 0, écris 0.</p>
        <Boutons onNouveau={nouvelExercice} />
      </Formulaire>

      <ZoneRetour>
        {verifie?.vide && <MessageIncompris raison="Remplis toutes les cases du tableau avant de valider." />}
        {tout && (
          <MessageSucces>
            <p>Les douze valeurs sont justes.</p>
          </MessageSucces>
        )}
        {verifie && !verifie.vide && !tout && (
          <Retour type="faux">
            <p>
              Oups, une erreur s'est glissée : {nbFaux} case{nbFaux > 1 ? 's sont fausses' : ' est fausse'}. Voici le tableau corrigé (✓ juste, ✗ à revoir).
            </p>
            <div className="exercice-tableau-conteneur">
              <table className="exercice-tableau">
                <thead>
                  <tr>
                    <th scope="col">x</th>
                    <th scope="col">sin(x)</th>
                    <th scope="col">cos(x)</th>
                  </tr>
                </thead>
                <tbody>
                  {exo.lignes.map((l, i) => (
                    <tr key={texteAng(l.x)}>
                      <th scope="row">
                        <MathTex tex={texAng(l.x)} />
                      </th>
                      <td className={verifie.justes[i].sin ? 'exercice-juste' : 'exercice-faux'}>
                        {verifie.justes[i].sin ? '✓' : '✗'} <MathTex tex={l.sin.tex} />
                      </td>
                      <td className={verifie.justes[i].cos ? 'exercice-juste' : 'exercice-faux'}>
                        {verifie.justes[i].cos ? '✓' : '✗'} <MathTex tex={l.cos.tex} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <Correction>
              <li>
                Valeurs de référence sur [0 ; π/2] : sin(0) = 0, sin(π/6) = 1/2, sin(π/4) = √2/2, sin(π/3) = √3/2, sin(π/2) = 1 ; et cos(x) = sin(π/2 − x) donne cos(0) = 1,
                cos(π/6) = √3/2, cos(π/4) = √2/2, cos(π/3) = 1/2, cos(π/2) = 0.
              </li>
              {exo.lignes.map((l, i) => {
                const alpha = angleReference(l.x);
                const ra = reconnaitre(Math.sin(valeur(alpha)));
                const rc = reconnaitre(Math.cos(valeur(alpha)));
                const faux = !(verifie.justes[i].sin && verifie.justes[i].cos);
                if (!faux) return null;
                return (
                  <li key={texteAng(l.x)}>
                    <MathTex tex={`x = ${texAng(l.x)}`} /> : l'angle de référence est <MathTex tex={`\\alpha = ${texAng(alpha)}`} /> (distance au multiple de π le plus proche), avec sin(α) ={' '}
                    <MathTex tex={ra.tex} /> et cos(α) = <MathTex tex={rc.tex} />. Position : {quadrant(l.x)}. Donc{' '}
                    <MathTex tex={`\\sin(${texAng(l.x)}) = ${l.sin.tex}`} /> et <MathTex tex={`\\cos(${texAng(l.x)}) = ${l.cos.tex}`} />.
                  </li>
                );
              })}
            </Correction>
            <Astuce titre="Pour réussir la prochaine fois">
              <ul>
                <li>Ramène toujours l'angle au premier quadrant (angle de référence), puis choisis les signes avec le cercle trigonométrique.</li>
                <li>sin est l'ordonnée du point du cercle et cos son abscisse : sin(−x) = −sin(x) et cos(−x) = cos(x).</li>
                <li>sin(π − x) = sin(x) et cos(π − x) = −cos(x) ; sin(π + x) = −sin(x) et cos(π + x) = −cos(x).</li>
              </ul>
            </Astuce>
          </Retour>
        )}
      </ZoneRetour>
    </Cadre>
  );
}
