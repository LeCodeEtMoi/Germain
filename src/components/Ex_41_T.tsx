import { useState } from 'react';
import MathTex from './MathTex.tsx';
import { Cadre, Chargement, Donnees, Enonce, Titre, useTirage } from './ExerciceUI.tsx';
import Questions, { type Question } from './Questions.tsx';
import { entier, nombre, signeAleatoire } from '../lib/maths.ts';

/**
 * Exercice : espérance et variance de X + Y et de aX + b.
 *
 *   E(X + Y) = E(X) + E(Y)          E(aX + b) = a·E(X) + b
 *   V(aX + b) = a²·V(X)             V(X + Y) = V(X) + V(Y)   (X et Y indépendantes)
 *
 * Toutes les valeurs sont entières : les réponses sont exactes.
 */

/* ===== Logique ===== */

export type Exercice = { EX: number; VX: number; EY: number; VY: number; a: number; b: number };

export function genererExercice(): Exercice {
  return {
    EX: entier(-5, 5),
    VX: entier(1, 6),
    EY: entier(-5, 5),
    VY: entier(1, 6),
    a: signeAleatoire() * entier(2, 4),
    b: signeAleatoire() * entier(1, 5),
  };
}

export const resultats = ({ EX, VX, EY, VY, a, b }: Exercice) => ({
  esperanceSomme: EX + EY,
  esperanceAffine: a * EX + b,
  varianceAffine: a * a * VX,
  varianceSomme: VX + VY,
});

export const questions = (exo: Exercice): Question[] => {
  const r = resultats(exo);
  const ab = `${exo.a}X ${exo.b < 0 ? '-' : '+'} ${Math.abs(exo.b)}`;
  return [
    { type: 'nombre', id: 'e1', libelle: <><MathTex tex="E(X + Y)" /> =</>, attendu: r.esperanceSomme, placeholder: 'Ex : 3' },
    { type: 'nombre', id: 'e2', libelle: <><MathTex tex={`E(${ab})`} /> =</>, attendu: r.esperanceAffine, placeholder: 'Ex : -7' },
    { type: 'nombre', id: 'v1', libelle: <><MathTex tex={`V(${ab})`} /> =</>, attendu: r.varianceAffine, placeholder: 'Ex : 18' },
    { type: 'nombre', id: 'v2', libelle: <><MathTex tex="V(X + Y)" /> =</>, attendu: r.varianceSomme, placeholder: 'Ex : 5' },
  ];
};

/* ===== Affichage ===== */

export default function EsperanceVariance() {
  const [exo, regenerer] = useTirage(genererExercice);
  const [essai, setEssai] = useState(0);
  if (!exo) return <Chargement />;

  const { EX, VX, EY, VY, a, b } = exo;
  const r = resultats(exo);
  const ab = `${a}X ${b < 0 ? '-' : '+'} ${Math.abs(b)}`;
  const p = (n: number) => (n < 0 ? `(${n})` : `${n}`);

  return (
    <Cadre>
      <Titre />
      <Enonce>
        <p>
          Soient <MathTex tex="X" /> et <MathTex tex="Y" /> deux variables aléatoires <strong>indépendantes</strong> telles que :
        </p>
      </Enonce>
      <Donnees
        elements={[
          ['Pour X', <MathTex key="x" tex={`E(X) = ${EX} \\quad V(X) = ${VX}`} />],
          ['Pour Y', <MathTex key="y" tex={`E(Y) = ${EY} \\quad V(Y) = ${VY}`} />],
        ]}
      />
      <Questions
        key={essai}
        questions={questions(exo)}
        onNouveau={() => {
          regenerer();
          setEssai((e) => e + 1);
        }}
        succes={
          <p>
            <MathTex tex={`E(X+Y) = ${r.esperanceSomme}`} />, <MathTex tex={`E(${ab}) = ${r.esperanceAffine}`} />, <MathTex tex={`V(${ab}) = ${r.varianceAffine}`} /> et{' '}
            <MathTex tex={`V(X+Y) = ${r.varianceSomme}`} />.
          </p>
        }
        correction={
          <>
            <li>
              L’espérance est linéaire : <MathTex tex={`E(X + Y) = E(X) + E(Y) = ${p(EX)} + ${p(EY)} = ${r.esperanceSomme}`} />.
            </li>
            <li>
              <MathTex tex={`E(${ab}) = ${a} \\times E(X) ${b < 0 ? '-' : '+'} ${Math.abs(b)} = ${a} \\times ${p(EX)} ${b < 0 ? '-' : '+'} ${Math.abs(b)} = ${r.esperanceAffine}`} />.
            </li>
            <li>
              Pour la variance, la constante {nombre(b)} ne compte pas et le coefficient est élevé au carré :{' '}
              <MathTex tex={`V(${ab}) = ${p(a)}^{2} \\times V(X) = ${a * a} \\times ${VX} = ${r.varianceAffine}`} />.
            </li>
            <li>
              X et Y sont indépendantes, donc <MathTex tex={`V(X + Y) = V(X) + V(Y) = ${VX} + ${VY} = ${r.varianceSomme}`} />.
            </li>
          </>
        }
        conseils={
          <>
            <li>
              <MathTex tex="V(aX + b) = a^{2}V(X)" /> : b disparaît et a est au carré (même si a est négatif, la variance reste positive).
            </li>
            <li>
              <MathTex tex="V(X+Y) = V(X) + V(Y)" /> n’est vrai que si X et Y sont indépendantes, alors que <MathTex tex="E(X+Y) = E(X) + E(Y)" /> est toujours vrai.
            </li>
            <li>
              Ne confonds pas <MathTex tex="E(aX+b) = aE(X) + b" /> (la constante b reste) et la variance (elle disparaît).
            </li>
          </>
        }
      />
    </Cadre>
  );
}
