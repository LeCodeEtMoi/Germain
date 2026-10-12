import { useState } from 'react';
import { Cadre, Chargement, Enonce, MathTex, Questions, Titre, choisir, entier, melanger, nombre, permuter, useTirage, type Question } from './_commun.ts';

/**
 * Exercice : raccorder deux morceaux pour que f soit continue puis dérivable.
 *
 *   forme 1 : f(x) = x² + p x + a  (x ≤ 0),   b e^(k x)  (x > 0),   p = b k
 *             continuité en 0 : a = b ;  dérivabilité en 0 : p = b k  →  b = p/k, a = b
 *   forme 2 : f(x) = x² + p x + q  (x ≤ 1),   a x + b  (x > 1)
 *             continuité en 1 : 1 + p + q = a + b ;  dérivabilité : 2 + p = a  →  a = p + 2, b = q − 1
 */

/* ===== Logique ===== */

export type Exercice =
  | { forme: 1; p: number; k: number; ordre: number[] }
  | { forme: 2; p: number; q: number; ordre: number[] };

export function genererExercice(): Exercice {
  const ordre = melanger([0, 1, 2, 3]);
  if (choisir([1, 2]) === 1) {
    const k = choisir([-3, -2, -1, 2, 3]);
    const b = choisir([-3, -2, -1, 1, 2, 3, 4]);
    return { forme: 1, p: b * k, k, ordre };
  }
  for (;;) {
    const p = entier(-5, 5);
    const q = entier(-5, 5);
    if (p !== -2 && q !== 1) return { forme: 2, p, q, ordre };
  }
}

export type Solution = { a: number; b: number; derivee: number };

export function solution(e: Exercice): Solution {
  if (e.forme === 1) {
    const b = e.p / e.k;
    return { a: b, b, derivee: e.p };
  }
  return { a: e.p + 2, b: e.q - 1, derivee: e.p + 2 };
}

/** Valeur des deux morceaux (pour les tests) : gauche et droite en x. */
export function morceaux(e: Exercice, a: number, b: number): { gauche: (x: number) => number; droite: (x: number) => number; x0: number } {
  if (e.forme === 1) return { gauche: (x) => x * x + e.p * x + a, droite: (x) => b * Math.exp(e.k * x), x0: 0 };
  return { gauche: (x) => x * x + e.p * x + e.q, droite: (x) => a * x + b, x0: 1 };
}

export const questions = (exo: Exercice): Question[] => {
  const s = solution(exo);
  if (exo.forme === 1) {
    const { p, k } = exo;
    return [
      {
        type: 'choix', id: 'cond', libelle: <>Quelle équation traduit la <strong>dérivabilité</strong> de <MathTex tex="f" /> en <MathTex tex="0" /> (une fois la continuité acquise) ?</>,
        attendu: 'bk',
        options: permuter(
          [
            { valeur: 'bk', contenu: <><MathTex tex={`${p}=${k < 0 ? `b\\times(${k})` : `${k}b`}`} /> (la dérivée à gauche vaut <MathTex tex={`${p}`} />, celle à droite <MathTex tex={`${k}b`} />)</> },
            { valeur: 'ab', contenu: <><MathTex tex="a=b" /></> },
            { valeur: 'b1', contenu: <><MathTex tex={`${p}=b`} /></> },
            { valeur: 'a0', contenu: <><MathTex tex={`a=${p}`} /></> },
          ],
          exo.ordre,
        ),
      },
      { type: 'nombre', id: 'b', libelle: <>Valeur de <MathTex tex="b" /> pour que <MathTex tex="f" /> soit dérivable en 0 :</>, attendu: s.b, placeholder: 'Ex : 2', aide: 'Un nombre entier.' },
      { type: 'nombre', id: 'a', libelle: <>Valeur de <MathTex tex="a" /> pour que <MathTex tex="f" /> soit continue en 0 :</>, attendu: s.a, placeholder: 'Ex : 2', aide: 'Un nombre entier.' },
    ];
  }
  const { p, q } = exo;
  return [
    {
      type: 'choix', id: 'cond', libelle: <>Quelle équation traduit la <strong>dérivabilité</strong> de <MathTex tex="f" /> en <MathTex tex="1" /> ?</>,
      attendu: 'a2p',
      options: permuter(
        [
          { valeur: 'a2p', contenu: <><MathTex tex={`a=2\\times1${p < 0 ? `-${-p}` : `+${p}`}`} /> (égalité des dérivées en 1)</> },
          { valeur: 'ab', contenu: <><MathTex tex={`a+b=1${p < 0 ? `-${-p}` : `+${p}`}${q < 0 ? `-${-q}` : `+${q}`}`} /> (égalité des valeurs en 1)</> },
          { valeur: 'a1', contenu: <><MathTex tex={`a=${p}`} /></> },
          { valeur: 'b2', contenu: <><MathTex tex={`b=2${p < 0 ? `-${-p}` : `+${p}`}`} /></> },
        ],
        exo.ordre,
      ),
    },
    { type: 'nombre', id: 'a', libelle: <>Valeur de <MathTex tex="a" /> pour que <MathTex tex="f" /> soit dérivable en 1 :</>, attendu: s.a, placeholder: 'Ex : 2', aide: 'Un nombre entier.' },
    { type: 'nombre', id: 'b', libelle: <>Valeur de <MathTex tex="b" /> correspondante :</>, attendu: s.b, placeholder: 'Ex : 2', aide: 'Un nombre entier.' },
  ];
};

/* ===== Affichage ===== */

const signe = (n: number) => (n < 0 ? `-${-n}` : `+${n}`);
const termeP = (p: number) => (p === 0 ? '' : `${p < 0 ? '-' : '+'}${Math.abs(p) === 1 ? '' : Math.abs(p)}x`);

export default function RaccordFonction() {
  const [exo, regenerer] = useTirage(genererExercice);
  const [essai, setEssai] = useState(0);
  if (!exo) return <Chargement />;

  const s = solution(exo);
  const kx = exo.forme === 1 ? (exo.k === -1 ? '-x' : `${exo.k}x`) : '';

  return (
    <Cadre>
      <Titre />
      <Enonce>
        {exo.forme === 1 ? (
          <>
            <p>
              Soit <MathTex tex="a" /> et <MathTex tex="b" /> deux réels, et <MathTex tex="f" /> la fonction définie sur <MathTex tex="\mathbb R" /> par :
            </p>
            <div className="exercice-formule">
              <MathTex tex={`f(x)=\\begin{cases}x^{2}${termeP(exo.p)}+a & \\text{si } x\\le 0\\\\ b\\,e^{${kx}} & \\text{si } x>0\\end{cases}`} />
            </div>
            <p>On cherche <MathTex tex="a" /> et <MathTex tex="b" /> pour que <MathTex tex="f" /> soit dérivable en <MathTex tex="0" />.</p>
          </>
        ) : (
          <>
            <p>
              Soit <MathTex tex="a" /> et <MathTex tex="b" /> deux réels, et <MathTex tex="f" /> la fonction définie sur <MathTex tex="\mathbb R" /> par :
            </p>
            <div className="exercice-formule">
              <MathTex tex={`f(x)=\\begin{cases}x^{2}${termeP(exo.p)}${signe(exo.q)} & \\text{si } x\\le 1\\\\ ax+b & \\text{si } x>1\\end{cases}`} />
            </div>
            <p>On cherche <MathTex tex="a" /> et <MathTex tex="b" /> pour que <MathTex tex="f" /> soit dérivable en <MathTex tex="1" />.</p>
          </>
        )}
      </Enonce>
      <Questions
        key={essai}
        questions={questions(exo)}
        onNouveau={() => {
          regenerer();
          setEssai((x) => x + 1);
        }}
        succes={
          <p>
            <MathTex tex={`a=${nombre(s.a)}`} />, <MathTex tex={`b=${nombre(s.b)}`} /> : {' '}
            <MathTex tex="f" /> est dérivable en {exo.forme === 1 ? '0' : '1'} et <MathTex tex={`f'(${exo.forme === 1 ? 0 : 1})=${nombre(s.derivee)}`} />.
          </p>
        }
        correction={
          exo.forme === 1 ? (
            <>
              <li>
                Chaque morceau est dérivable (sur <MathTex tex="]-\infty\,;0[" /> et sur <MathTex tex="]0\,;+\infty[" />). Tout se joue en <MathTex tex="0" />.
              </li>
              <li>
                <strong>Continuité en 0.</strong> À gauche : <MathTex tex="f(0)=a" />. À droite : <MathTex tex={`\\lim_{x\\to0^+}b\\,e^{${kx}}=b`} />. Donc <MathTex tex="a=b" />.
              </li>
              <li>
                <strong>Dérivabilité en 0.</strong> À gauche : <MathTex tex={`f'(x)=2x${signe(exo.p)}`} />, donc <MathTex tex={`f_g'(0)=${nombre(exo.p)}`} />. À droite : <MathTex tex={`f'(x)=${exo.k}b\\,e^{${kx}}`} />, donc <MathTex tex={`f_d'(0)=${exo.k}b`} />. Il faut <MathTex tex={`${nombre(exo.p)}=${exo.k}b`} />, soit <MathTex tex={`b=${nombre(s.b)}`} />.
              </li>
              <li>
                Avec <MathTex tex="a=b" /> : <MathTex tex={`a=${nombre(s.a)}`} />.
              </li>
            </>
          ) : (
            <>
              <li>
                Chaque morceau est dérivable ; tout se joue en <MathTex tex="1" />.
              </li>
              <li>
                <strong>Dérivabilité en 1.</strong> À gauche : <MathTex tex={`f'(x)=2x${signe(exo.p)}`} />, donc <MathTex tex={`f_g'(1)=${nombre(exo.p + 2)}`} />. À droite : <MathTex tex="f'(x)=a" />. Il faut <MathTex tex={`a=${nombre(s.a)}`} />.
              </li>
              <li>
                <strong>Continuité en 1.</strong> À gauche : <MathTex tex={`f(1)=1${signe(exo.p)}${signe(exo.q)}=${nombre(1 + exo.p + exo.q)}`} />. À droite : <MathTex tex="\lim_{x\to1^+}(ax+b)=a+b" />. Donc <MathTex tex={`${nombre(s.a)}+b=${nombre(1 + exo.p + exo.q)}`} />, soit <MathTex tex={`b=${nombre(s.b)}`} />.
              </li>
            </>
          )
        }
        conseils={
          <>
            <li>Une fonction dérivable est continue : on commence donc par la continuité, qui donne une première équation (égalité des limites à gauche et à droite).</li>
            <li>La dérivabilité demande l’égalité des <strong>dérivées</strong> des deux morceaux au point de raccord, à ne pas confondre avec l’égalité des valeurs.</li>
            <li>Erreur fréquente : oublier la dérivée du facteur de l’exponentielle, <MathTex tex="(e^{kx})'=k\,e^{kx}" />.</li>
          </>
        }
      />
    </Cadre>
  );
}
