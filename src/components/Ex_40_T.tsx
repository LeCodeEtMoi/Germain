import { useState } from 'react';
import MathTex from './MathTex.tsx';
import { Cadre, Chargement, Enonce, Titre, useTirage } from './ExerciceUI.tsx';
import Questions, { type Question } from './Questions.tsx';
import { entier, nombre, signeAleatoire } from '../lib/maths.ts';

/**
 * Exercice : encadrer ∫ de a à b de f(x) dx avec f(x) = c·x (a > 0).
 *
 *   f est monotone : son minimum m et son maximum M sur [a ; b] sont f(a) et f(b), dans l'ordre selon le signe de c.
 *   m(b − a) ≤ ∫ f ≤ M(b − a)
 *
 * (La vraie valeur c(b² − a²)/2 est toujours dans l'encadrement : vérifié dans les tests.)
 */

/* ===== Logique ===== */

export type Exercice = { c: number; a: number; b: number };

export function genererExercice(): Exercice {
  const a = entier(1, 3);
  return { c: signeAleatoire() * entier(1, 4), a, b: a + entier(1, 3) };
}

export const minMax = ({ c, a, b }: Exercice) => {
  const fa = c * a;
  const fb = c * b;
  return { m: Math.min(fa, fb), M: Math.max(fa, fb) };
};

export const bornes = (exo: Exercice) => {
  const { m, M } = minMax(exo);
  const l = exo.b - exo.a;
  return { bas: m * l, haut: M * l };
};

export const questions = (exo: Exercice): Question[] => {
  const { bas, haut } = bornes(exo);
  return [
    { type: 'nombre', id: 'bas', libelle: <>Borne inférieure : <MathTex tex="m(b - a)" /> =</>, attendu: bas, placeholder: 'Ex : 6' },
    { type: 'nombre', id: 'haut', libelle: <>Borne supérieure : <MathTex tex="M(b - a)" /> =</>, attendu: haut, placeholder: 'Ex : 18' },
  ];
};

/* ===== Affichage ===== */

export default function EncadrementIntegrale() {
  const [exo, regenerer] = useTirage(genererExercice);
  const [essai, setEssai] = useState(0);
  if (!exo) return <Chargement />;

  const { c, a, b } = exo;
  const { m, M } = minMax(exo);
  const { bas, haut } = bornes(exo);
  const fTex = `${c === 1 ? '' : c === -1 ? '-' : c}x`;
  const croissante = c > 0;

  return (
    <Cadre>
      <Titre />
      <Enonce>
        <p>
          Soit <MathTex tex="f" /> la fonction définie sur <MathTex tex={`[${a}\\,;\\,${b}]`} /> par <MathTex tex={`f(x) = ${fTex}`} />, et{' '}
          <MathTex tex={`I = \\int_{${a}}^{${b}} f(x)\\,dx`} />.
        </p>
        <p>
          Soient m le minimum et M le maximum de f sur <MathTex tex={`[${a}\\,;\\,${b}]`} />. On a, pour tout x de cet intervalle,{' '}
          <MathTex tex="m \le f(x) \le M" />, donc <MathTex tex="m(b - a) \le I \le M(b - a)" />.
        </p>
        <p>Détermine les deux bornes de cet encadrement.</p>
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
            <MathTex tex={`${bas} \\le I \\le ${haut}`} /> (la valeur exacte est <MathTex tex={`I = ${(c * (b * b - a * a)) / 2}`} />).
          </p>
        }
        correction={
          <>
            <li>
              <MathTex tex={`f(x) = ${fTex}`} /> est {croissante ? 'croissante' : 'décroissante'} sur l’intervalle (le coefficient {nombre(c)} est {croissante ? 'positif' : 'négatif'}).
            </li>
            <li>
              Son {croissante ? 'minimum est en a et son maximum en b' : 'maximum est en a et son minimum en b'} :{' '}
              <MathTex tex={`f(${a}) = ${c * a}`} /> et <MathTex tex={`f(${b}) = ${c * b}`} />, donc <MathTex tex={`m = ${m}`} /> et <MathTex tex={`M = ${M}`} />.
            </li>
            <li>
              La longueur de l’intervalle est <MathTex tex={`b - a = ${b} - ${a} = ${b - a}`} />.
            </li>
            <li>
              <MathTex tex={`m(b - a) = ${m < 0 ? `(${m})` : m} \\times ${b - a} = ${bas}`} /> et <MathTex tex={`M(b - a) = ${M < 0 ? `(${M})` : M} \\times ${b - a} = ${haut}`} />.
            </li>
            <li>
              Conclusion : <MathTex tex={`${bas} \\le I \\le ${haut}`} />.
            </li>
          </>
        }
        conseils={
          <>
            <li>
              Si le coefficient de x est négatif, la fonction décroît : le minimum est <MathTex tex="f(b)" /> et le maximum <MathTex tex="f(a)" /> (ne les inverse pas).
            </li>
            <li>
              La borne inférieure doit toujours être plus petite que la borne supérieure : c’est un bon contrôle.
            </li>
            <li>Multiplie bien par la longueur b − a de l’intervalle, pas par b.</li>
          </>
        }
      />
    </Cadre>
  );
}
