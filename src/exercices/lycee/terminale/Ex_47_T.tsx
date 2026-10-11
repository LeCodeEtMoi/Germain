import { useState } from 'react';
import MathTex from '@/components/math/MathTex.tsx';
import { Cadre, Chargement, Enonce, Titre, useTirage } from '@/components/exercice/ExerciceUI.tsx';
import Questions, { type Question } from '@/components/exercice/Questions.tsx';
import { choisir, entier, melanger, nombre } from '@/lib/maths.ts';

/**
 * Exercice : théorème des gendarmes pour uₙ = m + b·g(n)/n  (n ≥ 1, g ∈ {sin, cos, (−1)ⁿ}).
 *
 *   |g(n)| ≤ 1  donc  m − b/n ≤ uₙ ≤ m + b/n, et les deux bornes tendent vers m.
 */

/* ===== Logique ===== */

export type Oscillation = 'sin' | 'cos' | 'alt';
export type Exercice = { m: number; b: number; g: Oscillation; ordre: string[] };

export function genererExercice(): Exercice {
  let m = 0;
  while (m === 0) m = entier(-3, 5);
  return { m, b: entier(1, 4), g: choisir<Oscillation>(['sin', 'cos', 'alt']), ordre: melanger(['gendarmes', 'inutile', 'inverse', 'faux']) };
}

const gTex = (g: Oscillation) => (g === 'sin' ? '\\sin(n)' : g === 'cos' ? '\\cos(n)' : '(-1)^{n}');

export function propositionsTex({ m, b }: Pick<Exercice, 'm' | 'b'>): Record<string, string> {
  const bas = `${m} - \\frac{${b}}{n}`;
  const haut = `${m} + \\frac{${b}}{n}`;
  return {
    gendarmes: `${bas} \\le u_n \\le ${haut}`,
    inutile: `${m - b} \\le u_n \\le ${m + b}`,
    inverse: `${haut} \\le u_n \\le ${bas}`,
    faux: `${m} \\le u_n \\le ${haut}`,
  };
}

export const questions = (exo: Exercice): Question[] => {
  const p = propositionsTex(exo);
  return [
    {
      type: 'choix',
      id: 'encadrement',
      libelle: <>Quel encadrement, vrai pour tout n ≥ 1, permet de conclure avec le théorème des gendarmes ?</>,
      attendu: 'gendarmes',
      options: exo.ordre.map((id) => ({ valeur: id, contenu: <MathTex tex={p[id]} /> })),
    },
    { type: 'nombre', id: 'limite', libelle: <>Limite de <MathTex tex="(u_n)" /> :</>, attendu: exo.m, placeholder: 'Ex : 3' },
  ];
};

/* ===== Affichage ===== */

export default function Gendarmes() {
  const [exo, regenerer] = useTirage(genererExercice);
  const [essai, setEssai] = useState(0);
  if (!exo) return <Chargement />;

  const { m, b, g } = exo;
  const p = propositionsTex(exo);
  const osc = b === 1 ? gTex(g) : `${b}${gTex(g)}`;

  return (
    <Cadre>
      <Titre />
      <Enonce>
        <p>
          Soit <MathTex tex="(u_n)" /> la suite définie pour tout entier <MathTex tex="n \ge 1" /> par :
        </p>
        <div className="exercice-formule">
          <MathTex tex={`u_n = ${m} + \\frac{${osc}}{n}`} />
        </div>
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
            <MathTex tex={`${p.gendarmes}`} /> avec deux bornes de limite {nombre(m)} : <MathTex tex={`\\lim_{n\\to+\\infty} u_n = ${m}`} />.
          </p>
        }
        correction={
          <>
            <li>
              Pour tout n, <MathTex tex={`-1 \\le ${gTex(g)} \\le 1`} />. En multipliant par <MathTex tex={`\\frac{${b}}{n} > 0`} /> (le sens ne change pas) :{' '}
              <MathTex tex={`-\\frac{${b}}{n} \\le \\frac{${osc}}{n} \\le \\frac{${b}}{n}`} />.
            </li>
            <li>
              En ajoutant {nombre(m)} : <MathTex tex={p.gendarmes} />.
            </li>
            <li>
              Or <MathTex tex={`\\frac{${b}}{n} \\to 0`} />, donc les deux bornes tendent vers {nombre(m)}.
            </li>
            <li>
              Théorème des gendarmes : <MathTex tex={`\\lim_{n \\to +\\infty} u_n = ${m}`} />.
            </li>
          </>
        }
        conseils={
          <>
            <li>
              Les deux bornes doivent avoir <strong>la même limite</strong> : l’encadrement <MathTex tex={p.inutile} /> est vrai mais ne permet pas de conclure.
            </li>
            <li>La borne de gauche doit être plus petite que celle de droite pour tout n.</li>
            <li>
              Pour encadrer un quotient dont le numérateur oscille, utilise <MathTex tex="-1 \le \sin n \le 1" /> (ou cos, ou (−1)ⁿ) puis divise par n, positif.
            </li>
          </>
        }
      />
    </Cadre>
  );
}
