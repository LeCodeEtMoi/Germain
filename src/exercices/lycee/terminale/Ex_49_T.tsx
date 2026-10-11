import { useState } from 'react';
import MathTex from '@/components/math/MathTex.tsx';
import { Cadre, Chargement, Enonce, Titre, useTirage } from '@/components/exercice/ExerciceUI.tsx';
import Questions, { type Question } from '@/components/exercice/Questions.tsx';
import { combinaison, entier, nombre } from '@/lib/maths.ts';

/**
 * Exercice : théorème des valeurs intermédiaires pour f(x) = a·x² + b·x + c sur [0 ; 5] (a > 0, b ≥ 0).
 *
 *   f′(x) = 2ax + b ≥ 0 : f est strictement croissante sur [0 ; 5] et continue.
 *   k est un entier choisi strictement entre f(n) et f(n+1) pour un entier n de {0, …, 4} :
 *   f(x) = k a donc UNE seule solution α sur [0 ; 5], et n < α < n + 1.
 */

/* ===== Logique ===== */

export type Exercice = { a: number; b: number; c: number; k: number; n: number };

export const f = ({ a, b, c }: Pick<Exercice, 'a' | 'b' | 'c'>, x: number) => a * x * x + b * x + c;

export function genererExercice(): Exercice {
  for (;;) {
    const a = entier(1, 3);
    const b = entier(0, 4);
    const c = entier(-12, -1);
    const n = entier(0, 4);
    const ecart = f({ a, b, c }, n + 1) - f({ a, b, c }, n);
    if (ecart < 2) continue;
    return { a, b, c, n, k: f({ a, b, c }, n) + entier(1, ecart - 1) };
  }
}

export const questions = (exo: Exercice): Question[] => [
  {
    type: 'nombre',
    id: 'n',
    libelle: <>L’unique solution α vérifie <MathTex tex="n < \alpha < n + 1" />. Quel est l’entier n ?</>,
    attendu: exo.n,
    placeholder: 'Ex : 2',
    aide: 'Calcule f(0), f(1), f(2)… et repère où la valeur k est dépassée.',
  },
  {
    type: 'choix',
    id: 'nombre',
    libelle: <>Combien l’équation <MathTex tex={`f(x) = ${exo.k}`} /> a-t-elle de solutions dans l’intervalle [0 ; 5] ?</>,
    attendu: '1',
    enLigne: true,
    options: [
      { valeur: '0', contenu: 'aucune' },
      { valeur: '1', contenu: 'exactement une' },
      { valeur: '2', contenu: 'exactement deux' },
      { valeur: '?', contenu: 'on ne peut pas le savoir' },
    ],
  },
];

/* ===== Affichage ===== */

export default function ValeursIntermediaires() {
  const [exo, regenerer] = useTirage(genererExercice);
  const [essai, setEssai] = useState(0);
  if (!exo) return <Chargement />;

  const { a, b, c, k, n } = exo;
  const valeurs = [0, 1, 2, 3, 4, 5].map((x) => f(exo, x));
  const fTex = combinaison([[a, 'x^{2}'], [b, 'x'], [c, '']], true);
  const dTex = combinaison([[2 * a, 'x'], [b, '']], true);

  return (
    <Cadre>
      <Titre />
      <Enonce>
        <p>
          Soit <MathTex tex="f" /> la fonction définie sur ℝ par :
        </p>
        <div className="exercice-formule">
          <MathTex tex={`f(x) = ${fTex}`} />
        </div>
        <p>
          On considère l’équation <MathTex tex={`f(x) = ${k}`} /> sur l’intervalle [0 ; 5]. On admet que f est continue sur ℝ car c’est une fonction polynôme.
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
            <MathTex tex={`f(${n}) = ${valeurs[n]} < ${k} < ${valeurs[n + 1]} = f(${n + 1})`} /> : l’unique solution α est dans <MathTex tex={`]${n}\\,;\\,${n + 1}[`} />.
          </p>
        }
        correction={
          <>
            <li>
              <MathTex tex="f" /> est dérivable, avec <MathTex tex={`f'(x) = ${dTex}`} />, qui est positif pour x &gt; 0 : f est strictement croissante sur [0 ; 5].
            </li>
            <li>
              Valeurs :
              <div className="exercice-tableau-conteneur">
                <table className="exercice-tableau">
                  <thead>
                    <tr>
                      <th scope="row">x</th>
                      {valeurs.map((_, x) => (
                        <th key={x}>{x}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope="row">f(x)</th>
                      {valeurs.map((v, x) => (
                        <td key={x}>{v}</td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
            </li>
            <li>
              <MathTex tex={`f(${n}) = ${valeurs[n]}`} /> est inférieur à {nombre(k)} et <MathTex tex={`f(${n + 1}) = ${valeurs[n + 1]}`} /> est supérieur à {nombre(k)}.
            </li>
            <li>
              f est continue et strictement croissante sur <MathTex tex={`[${n}\\,;\\,${n + 1}]`} /> : d’après le théorème des valeurs intermédiaires (corollaire des fonctions strictement monotones), l’équation{' '}
              <MathTex tex={`f(x) = ${k}`} /> a une unique solution α dans <MathTex tex={`]${n}\\,;\\,${n + 1}[`} />, et comme f est strictement croissante sur [0 ; 5], c’est la seule sur [0 ; 5].
            </li>
          </>
        }
        conseils={
          <>
            <li>Le théorème des valeurs intermédiaires donne l’existence ; pour l’unicité, il faut la stricte monotonie.</li>
            <li>
              Compare k à f(n) et f(n+1) : on cherche les deux entiers consécutifs qui l’encadrent.
            </li>
            <li>Vérifie les hypothèses : f continue sur l’intervalle, et k compris entre les valeurs aux extrémités.</li>
          </>
        }
      />
    </Cadre>
  );
}
