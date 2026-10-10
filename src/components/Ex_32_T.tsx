import { useState } from 'react';
import MathTex from './MathTex.tsx';
import { Cadre, Chargement, Donnees, Enonce, Titre, useTirage } from './ExerciceUI.tsx';
import Questions, { apercuExpression, type Question, type ResultatExpression } from './Questions.tsx';
import { analyser, choisir, deriver, equivalents, nombre } from '../lib/maths.ts';

/**
 * Exercice : reconnaître une fonction usuelle multipliée par une constante k.
 *
 * f = k·g avec g parmi ln, exp, 1/x, √x, cos, sin. On donne f′, une valeur f(x₀) et une propriété (variation ou période).
 * Ces trois informations déterminent f de façon unique (f′ donne f à une constante près, f(x₀) fixe la constante).
 *
 * Correction : la saisie est lue par l'analyseur et comparée à k·g en plusieurs points de ]0 ; +∞[.
 * Si sa dérivée est la bonne mais que la valeur imposée n'est pas respectée, on le dit.
 */

/* ===== Logique ===== */

export type Base = {
  id: string;
  g: string; // saisie ASCII de g
  fTex: (c: number) => string; // c·g en TeX
  dTex: (c: number) => string; // dérivée de c·g en TeX
  x0: number;
  g0: number; // g(x0)
  propriete: (k: number) => string; // propriété de variation / période
};

const coefTex = (c: number, corps: string) => (c === 1 ? corps : c === -1 ? `-${corps}` : `${c}${corps}`);
const variation = (sens: 'croissante' | 'decroissante', k: number, domaine: string) => {
  const croissante = (sens === 'croissante') === (k > 0);
  return `f est strictement ${croissante ? 'croissante' : 'décroissante'} sur ${domaine}`;
};

export const BASES: Base[] = [
  { id: 'ln', g: 'ln(x)', fTex: (c) => coefTex(c, '\\ln(x)'), dTex: (c) => `${c < 0 ? '-' : ''}\\frac{${Math.abs(c)}}{x}`, x0: 1, g0: 0, propriete: (k) => `${variation('croissante', k, ']0 ; +∞[')}` },
  { id: 'exp', g: 'e^x', fTex: (c) => coefTex(c, 'e^{x}'), dTex: (c) => coefTex(c, 'e^{x}'), x0: 0, g0: 1, propriete: (k) => `${variation('croissante', k, 'ℝ')}` },
  { id: 'inv', g: '1/x', fTex: (c) => `${c < 0 ? '-' : ''}\\frac{${Math.abs(c)}}{x}`, dTex: (c) => `${-c < 0 ? '-' : ''}\\frac{${Math.abs(c)}}{x^{2}}`, x0: 1, g0: 1, propriete: (k) => `${variation('decroissante', k, ']0 ; +∞[')}` },
  { id: 'sqrt', g: 'sqrt(x)', fTex: (c) => coefTex(c, '\\sqrt{x}'), dTex: (c) => `${c < 0 ? '-' : ''}\\frac{${Math.abs(c)}}{2\\sqrt{x}}`, x0: 4, g0: 2, propriete: (k) => `${variation('croissante', k, ']0 ; +∞[')}` },
  { id: 'cos', g: 'cos(x)', fTex: (c) => coefTex(c, '\\cos(x)'), dTex: (c) => coefTex(-c, '\\sin(x)'), x0: 0, g0: 1, propriete: () => 'f est périodique de période 2π' },
  { id: 'sin', g: 'sin(x)', fTex: (c) => coefTex(c, '\\sin(x)'), dTex: (c) => coefTex(c, '\\cos(x)'), x0: 0, g0: 0, propriete: () => 'f est périodique de période 2π' },
];

export type Exercice = { base: string; k: number };

export function genererExercice(): Exercice {
  const base = BASES[Math.floor(Math.random() * BASES.length)];
  const k = choisir([1, 1, 2, 3, -1, -2, 4]);
  return { base: base.id, k };
}

export const baseDe = (id: string) => BASES.find((b) => b.id === id) as Base;
const POINTS = [0.7, 1.3, 1.9, 2.6, 3.4];

/** Solution attendue, en saisie ASCII. */
export const solution = ({ base, k }: Exercice) => `${k}*(${baseDe(base).g})`;

export function verifier(exo: Exercice, saisie: string): ResultatExpression {
  const lu = analyser(saisie.replace(/^\s*f\s*(\(x\))?\s*=/i, ''), { variables: ['x'] });
  if (!lu.ok) return { ok: false, incompris: lu.message };
  const ref = analyser(solution(exo), { variables: ['x'] });
  if (!ref.ok) throw new Error('Solution illisible');
  if (equivalents(lu.noeud, ref.noeud, 'x', POINTS)) return { ok: true };
  const dRef = deriver(ref.noeud, 'x');
  if (equivalents(deriver(lu.noeud, 'x'), dRef, 'x', POINTS)) {
    const b = baseDe(exo.base);
    return { ok: false, indice: `Ta fonction a bien la dérivée donnée, mais elle ne vérifie pas f(${b.x0}) = ${exo.k * b.g0} : il manque ou il y a une constante en trop.` };
  }
  return { ok: false, indice: 'La dérivée de ta fonction n’est pas celle de l’énoncé.' };
}

export function questions(exo: Exercice): Question[] {
  return [
    {
      type: 'expression',
      id: 'f',
      libelle: 'Donne l’expression de f(x) :',
      placeholder: 'Ex : 2ln(x), -e^x, 3/x…',
      aide: 'Écris au clavier : ln(x), e^x, 1/x, sqrt(x), cos(x), sin(x), avec un coefficient si besoin (3*ln(x)).',
      verifier: (s) => verifier(exo, s),
      apercu: (s) => apercuExpression(s, 'f(x)', { retirer: /^\s*f\s*(\(x\))?\s*=/i }),
    },
  ];
}

/* ===== Affichage ===== */

export default function FonctionUsuelle() {
  const [exo, regenerer] = useTirage(genererExercice);
  const [essai, setEssai] = useState(0);
  if (!exo) return <Chargement />;

  const b = baseDe(exo.base);
  const { k } = exo;
  const fTex = b.fTex(k);
  const valeur = k * b.g0;

  return (
    <Cadre>
      <Titre />
      <Enonce>
        <p>
          Une fonction <MathTex tex="f" /> est de la forme <MathTex tex="f = k \times g" />, où k est un réel non nul et g une fonction usuelle (logarithme,
          exponentielle, inverse, racine carrée, cosinus ou sinus). On sait que :
        </p>
      </Enonce>
      <Donnees
        elements={[
          ['Dérivée', <MathTex key="d" tex={`f'(x) = ${b.dTex(k)}`} />],
          ['Une valeur', <MathTex key="v" tex={`f(${b.x0}) = ${valeur}`} />],
        ]}
      />
      <Enonce>
        <p>De plus, {b.propriete(k).replace(/^f/, 'f')}.</p>
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
            Oui : <MathTex tex={`f(x) = ${fTex}`} />.
          </p>
        }
        correction={
          <>
            <li>
              On cherche d’abord quelle fonction usuelle a, au coefficient près, la dérivée donnée : <MathTex tex={`f'(x) = ${b.dTex(k)}`} /> est la dérivée de{' '}
              <MathTex tex={fTex} /> (à une constante près).
            </li>
            <li>
              Les primitives de f′ sont donc de la forme <MathTex tex={`${fTex} + C`} />.
            </li>
            <li>
              On utilise <MathTex tex={`f(${b.x0}) = ${valeur}`} /> : comme <MathTex tex={`${fTex}`} /> vaut déjà {nombre(valeur)} en {b.x0}, on obtient <MathTex tex="C = 0" />.
            </li>
            <li>
              Conclusion : <MathTex tex={`f(x) = ${fTex}`} />. Cela est cohérent avec la propriété donnée : {b.propriete(k)}.
            </li>
          </>
        }
        conseils={
          <>
            <li>Connais par cœur les dérivées usuelles : ln → 1/x ; eˣ → eˣ ; 1/x → −1/x² ; √x → 1/(2√x) ; cos → −sin ; sin → cos.</li>
            <li>Une dérivée ne détermine f qu’à une constante près : la valeur donnée sert à fixer cette constante.</li>
            <li>Fais attention au signe de k : il change le sens de variation et le signe de la dérivée.</li>
          </>
        }
      />
    </Cadre>
  );
}
