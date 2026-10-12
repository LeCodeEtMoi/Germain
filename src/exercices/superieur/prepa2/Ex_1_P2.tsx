import { useState } from 'react';
import { Cadre, Chargement, Enonce, MathTex, Questions, Titre, choisir, entier, nombre, useTirage, type Question } from './_commun.ts';

/**
 * Exercice : une norme définie par un supremum de fonctions affines.
 *
 *   N(x, y) = sup_{t ∈ [0,1]} | x + λ t y |
 *
 * t ↦ x + λ t y est affine, donc |x + λ t y| est convexe : son maximum sur [0,1] est atteint en une extrémité.
 *   N(x, y) = max( |x| , |x + λ y| )
 * Meilleure constante : N(x, y) ≤ (1 + λ) · max(|x|,|y|), avec égalité en (1, 1).
 */

/* ===== Logique ===== */

export type Exercice = { lam: number; a: number; b: number };
export type OuAtteint = 'zero' | 'un' | 'deux' | 'interieur';

/** N(a, b) = max(|a|, |a + λb|) */
export const valeurN = ({ lam, a, b }: Exercice) => Math.max(Math.abs(a), Math.abs(a + lam * b));

export const ouAtteint = ({ lam, a, b }: Exercice): OuAtteint => {
  const g0 = Math.abs(a);
  const g1 = Math.abs(a + lam * b);
  return g0 === g1 ? 'deux' : g0 > g1 ? 'zero' : 'un';
};

/** Plus petite constante k telle que N(x,y) ≤ k·max(|x|,|y|) pour tout (x,y). */
export const meilleureConstante = ({ lam }: Exercice) => 1 + lam;

export function genererExercice(): Exercice {
  const lam = entier(2, 5);
  // On vise une situation au hasard (0, 1 ou les deux extrémités) pour que les trois cas se rencontrent.
  const cible = choisir<OuAtteint>(['zero', 'un', 'un', 'deux']);
  for (let essai = 0; ; essai++) {
    const b = entier(-6, 6);
    // cas d'égalité |a| = |a + λb| : a = −λb/2
    const a = cible === 'deux' ? (-lam * b) / 2 : entier(-6, 6);
    if (a === 0 || b === 0 || !Number.isInteger(a) || Math.abs(a) > 9) continue;
    const exo = { lam, a, b };
    if (essai > 500 || ouAtteint(exo) === cible) return exo;
  }
}

export const questions = (exo: Exercice): Question[] => {
  const { lam, a, b } = exo;
  return [
    {
      type: 'nombre', id: 'N', libelle: <>Calcule <MathTex tex={`N(${nombre(a)}\\,;\\,${nombre(b)})`} />.</>, attendu: valeurN(exo), placeholder: 'Ex : 7',
      aide: 'Un entier.',
    },
    {
      type: 'choix', id: 'ou',
      libelle: <>Pour <MathTex tex={`(x,y)=(${nombre(a)}\\,;\\,${nombre(b)})`} />, le maximum de <MathTex tex={`t\\mapsto\\lvert x+${lam}ty\\rvert`} /> sur <MathTex tex="[0\,;\,1]" /> est atteint :</>,
      attendu: ouAtteint(exo),
      options: [
        { valeur: 'zero', contenu: <>uniquement en <MathTex tex="t=0" /></> },
        { valeur: 'un', contenu: <>uniquement en <MathTex tex="t=1" /></> },
        { valeur: 'deux', contenu: <>en <MathTex tex="t=0" /> et en <MathTex tex="t=1" /></> },
        { valeur: 'interieur', contenu: <>en un point de <MathTex tex="]0\,;\,1[" /></> },
      ],
    },
    {
      type: 'nombre', id: 'k',
      libelle: <>Plus petite constante <MathTex tex="k" /> telle que <MathTex tex="N(x,y)\le k\,\max(\lvert x\rvert,\lvert y\rvert)" /> pour tout <MathTex tex="(x,y)\in\mathbb R^2" /> :</>,
      attendu: meilleureConstante(exo), placeholder: 'Ex : 4', aide: 'Un entier.',
    },
  ];
};

/* ===== Affichage ===== */

export default function SupAffine() {
  const [exo, regenerer] = useTirage(genererExercice);
  const [essai, setEssai] = useState(0);
  if (!exo) return <Chargement />;

  const { lam, a, b } = exo;
  const g0 = Math.abs(a);
  const v1 = a + lam * b;
  const g1 = Math.abs(v1);
  const lieu = ouAtteint(exo);
  const phraseLieu = lieu === 'deux' ? 'aux deux extrémités (les deux valeurs sont égales)' : lieu === 'zero' ? 'en t = 0' : 'en t = 1';
  const u = `(${nombre(a)}\\,;\\,${nombre(b)})`;

  return (
    <Cadre>
      <Titre />
      <Enonce>
        <p>
          Sur <MathTex tex="\mathbb R^2" />, on pose, pour tout <MathTex tex="(x,y)" /> :
        </p>
        <p style={{ textAlign: 'center' }}>
          <MathTex tex={`N(x,y)=\\sup_{t\\in[0,1]}\\,\\lvert x+${lam}\\,t\\,y\\rvert`} />
        </p>
        <p>
          On admet que <MathTex tex="N" /> est une norme sur <MathTex tex="\mathbb R^2" />. On note <MathTex tex="\lVert (x,y)\rVert_\infty=\max(\lvert x\rvert,\lvert y\rvert)" />.
        </p>
      </Enonce>
      <Questions
        key={essai}
        questions={questions(exo)}
        onNouveau={() => {
          regenerer();
          setEssai((e) => e + 1);
        }}
        succes={
          <p>
            <MathTex tex={`N${u}=${valeurN(exo)}`} />, le maximum est atteint {phraseLieu}, et la meilleure constante est <MathTex tex={`k=1+${lam}=${lam + 1}`} />.
          </p>
        }
        correction={
          <>
            <li>
              Pour <MathTex tex="(x,y)" /> fixé, <MathTex tex={`t\\mapsto x+${lam}ty`} /> est <strong>affine</strong>. Sa valeur absolue est convexe, donc son maximum sur <MathTex tex="[0\,;\,1]" /> est atteint à une extrémité :{' '}
              <MathTex tex={`N(x,y)=\\max\\big(\\lvert x\\rvert,\\lvert x+${lam}y\\rvert\\big)`} />.
            </li>
            <li>
              Pour <MathTex tex={u} /> : <MathTex tex={`\\lvert x\\rvert=${g0}`} /> en <MathTex tex="t=0" /> et <MathTex tex={`\\lvert ${nombre(a)}+${lam}\\times${b < 0 ? `(${nombre(b)})` : b}\\rvert=\\lvert ${nombre(v1)}\\rvert=${g1}`} /> en <MathTex tex="t=1" />. Donc{' '}
              <MathTex tex={`N${u}=\\max(${g0},${g1})=${valeurN(exo)}`} />, atteint {phraseLieu}.
            </li>
            <li>
              Majoration : <MathTex tex={`\\lvert x+${lam}ty\\rvert\\le\\lvert x\\rvert+${lam}t\\lvert y\\rvert\\le(1+${lam})\\lVert(x,y)\\rVert_\\infty`} /> car <MathTex tex="t\le 1" />.
            </li>
            <li>
              Cette constante ne peut pas être améliorée : en <MathTex tex="(x,y)=(1,1)" />, <MathTex tex="\lVert(x,y)\rVert_\infty=1" /> et <MathTex tex={`N(1,1)=\\max(1,1+${lam})=${lam + 1}`} />. La plus petite constante est donc <MathTex tex={`k=${lam + 1}`} />.
            </li>
          </>
        }
        conseils={
          <>
            <li>Un supremum de valeurs absolues de fonctions <strong>affines</strong> en <MathTex tex="t" /> se calcule aux bornes : regarde <MathTex tex="t=0" /> et <MathTex tex="t=1" />.</li>
            <li>Erreur fréquente : chercher le maximum en annulant une dérivée. Ici la fonction est affine (ou sa valeur absolue), le maximum est toujours en bout d’intervalle.</li>
            <li>Pour prouver qu’une constante est optimale, exhibe un vecteur qui réalise l’égalité (ici <MathTex tex="(1,1)" />).</li>
          </>
        }
      />
    </Cadre>
  );
}
