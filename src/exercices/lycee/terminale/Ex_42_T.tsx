import { useState } from 'react';
import MathTex from '@/components/math/MathTex.tsx';
import { Cadre, Chargement, Enonce, Titre, useTirage } from '@/components/exercice/ExerciceUI.tsx';
import Questions, { type Question } from '@/components/exercice/Questions.tsx';
import { entier, fraction, type Fraction } from '@/lib/maths.ts';
import { AIDE_FRACTION, attenduFraction } from '@/lib/reponses.ts';

/**
 * Exercice : somme de n variables de Bernoulli indépendantes de paramètre p = k/10.
 *
 *   S suit la loi binomiale B(n ; p)     E(S) = n·p      V(S) = n·p·(1 − p)
 *
 * p est un multiple de 0,1 et les calculs se font en entiers : aucune erreur d'arrondi flottant.
 */

/* ===== Logique ===== */

export type Exercice = { n: number; k: number }; // p = k/10

export function genererExercice(): Exercice {
  return { n: entier(3, 12), k: entier(1, 9) };
}

export const esperance = ({ n, k }: Exercice): Fraction => fraction(n * k, 10);
export const variance = ({ n, k }: Exercice): Fraction => fraction(n * k * (10 - k), 100);
export const virgule = (x: number) => String(x).replace('.', '{,}');

export const questions = (exo: Exercice): Question[] => {
  const e = attenduFraction(esperance(exo));
  const v = attenduFraction(variance(exo));
  return [
    {
      type: 'choix',
      id: 'loi',
      libelle: <>Quelle est la loi de <MathTex tex="S" /> ?</>,
      attendu: 'np',
      enLigne: true,
      options: [
        { valeur: 'np', contenu: <MathTex tex={`\\mathcal{B}(${exo.n}\\,;\\,${virgule(exo.k / 10)})`} /> },
        { valeur: 'n1p', contenu: <MathTex tex={`\\mathcal{B}(${exo.n}\\,;\\,${virgule((10 - exo.k) / 10)})`} /> },
        { valeur: 'pn', contenu: <MathTex tex={`\\mathcal{B}(${virgule(exo.k / 10)}\\,;\\,${exo.n})`} /> },
      ],
    },
    { type: 'nombre', id: 'E', libelle: <><MathTex tex="E(S)" /> =</>, attendu: e.attendu, tolerance: e.tolerance, placeholder: 'Ex : 2,4', aide: AIDE_FRACTION },
    { type: 'nombre', id: 'V', libelle: <><MathTex tex="V(S)" /> =</>, attendu: v.attendu, tolerance: v.tolerance, placeholder: 'Ex : 1,68', aide: AIDE_FRACTION },
  ];
};

/* ===== Affichage ===== */

export default function SommeBernoulli() {
  const [exo, regenerer] = useTirage(genererExercice);
  const [essai, setEssai] = useState(0);
  if (!exo) return <Chargement />;

  const { n, k } = exo;
  const p = k / 10;
  const E = n * p;
  const V = (n * k * (10 - k)) / 100;

  return (
    <Cadre>
      <Titre />
      <Enonce>
        <p>
          On répète <strong>{n}</strong> fois, de façon indépendante, une épreuve de Bernoulli de paramètre <MathTex tex={`p = ${virgule(p)}`} />. Pour chaque
          épreuve <MathTex tex="i" />, la variable <MathTex tex="X_i" /> vaut 1 en cas de succès et 0 sinon. On pose :
        </p>
        <div className="exercice-formule">
          <MathTex tex={`S = X_1 + X_2 + \\dots + X_{${n}}`} />
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
            <MathTex tex={`S \\sim \\mathcal{B}(${n}\\,;\\,${virgule(p)})`} />, <MathTex tex={`E(S) = ${virgule(E)}`} /> et <MathTex tex={`V(S) = ${virgule(Number(V.toFixed(4)))}`} />.
          </p>
        }
        correction={
          <>
            <li>
              S compte le nombre de succès parmi {n} épreuves de Bernoulli indépendantes et identiques : S suit la loi binomiale{' '}
              <MathTex tex={`\\mathcal{B}(${n}\\,;\\,${virgule(p)})`} />. Le paramètre n est le nombre d’épreuves, p la probabilité de succès.
            </li>
            <li>
              <MathTex tex={`E(S) = n\\,p = ${n} \\times ${virgule(p)} = ${virgule(Number(E.toFixed(4)))}`} /> (aussi : somme de {n} espérances égales à p).
            </li>
            <li>
              <MathTex tex={`V(S) = n\\,p\\,(1-p) = ${n} \\times ${virgule(p)} \\times ${virgule(Number((1 - p).toFixed(4)))} = ${virgule(Number(V.toFixed(4)))}`} /> (somme de {n} variances égales à{' '}
              <MathTex tex="p(1-p)" /> car les épreuves sont indépendantes).
            </li>
          </>
        }
        conseils={
          <>
            <li>
              Une somme de n variables de Bernoulli indépendantes de même paramètre p suit <MathTex tex="\mathcal{B}(n\,;\,p)" /> : le nombre d’épreuves est écrit en premier.
            </li>
            <li>
              <MathTex tex="E = np" /> et <MathTex tex="V = np(1-p)" /> : n’oublie pas le facteur <MathTex tex="1-p" /> dans la variance.
            </li>
            <li>La variance n’est jamais supérieure à n·p quand p est une probabilité : c’est un bon contrôle.</li>
          </>
        }
      />
    </Cadre>
  );
}
