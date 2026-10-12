import { useState } from 'react';
import { Cadre, Chargement, Enonce, MathTex, Questions, Titre, choisir, entier, melanger, normeSomme, permuter, texPoly, useTirage, type Poly, type Question } from './_commun.ts';

/**
 * Exercice : continuité d'un endomorphisme de ℝ[X] muni de ‖P‖ = Σ |aₖ|.
 *
 * Une application linéaire est continue ⇔ il existe M tel que ‖φ(P)‖ ≤ M‖P‖ pour tout P.
 * On teste sur les Xⁿ, qui sont de norme 1.
 *
 *   décalage   P(X) ↦ P(X + c)  : ‖φ(Xⁿ)‖ = ‖(X + c)ⁿ‖ = (1 + |c|)ⁿ → +∞           : non continue
 *   dilatation P(X) ↦ P(cX)     : ‖φ(Xⁿ)‖ = |c|ⁿ ; continue ⇔ |c| ≤ 1                (norme 1)
 *   dérivation P ↦ P'           : ‖φ(Xⁿ)‖ = n → +∞                                     : non continue
 *   P ↦ (X − c) P              : ‖φ(P)‖ ≤ (1 + |c|)‖P‖, égalité pour P = 1           : continue
 */

/* ===== Logique ===== */

export type Type = 'decalage' | 'dilatation' | 'derivation' | 'multiplication';
export type Exercice = { type: Type; c: number; P: Poly; n: number; ordre: number[] };

/** Image d'un polynôme (formules directes, vérifiées dans les tests par composition de polynômes). */
export function image(type: Type, c: number, P: Poly): Poly {
  if (type === 'dilatation') return P.map((a, k) => a * c ** k);
  if (type === 'derivation') return P.length <= 1 ? [0] : P.slice(1).map((a, i) => a * (i + 1));
  if (type === 'multiplication') {
    const r: Poly = Array(P.length + 1).fill(0);
    P.forEach((a, k) => {
      r[k + 1] += a;
      r[k] += -c * a;
    });
    return r;
  }
  // décalage : P(X + c) = Σ aₖ (X + c)ᵏ, avec (X + c)ᵏ = Σᵢ C(k,i) c^(k−i) Xⁱ
  const r: Poly = Array(P.length).fill(0);
  P.forEach((a, k) => {
    let binom = 1;
    for (let i = 0; i <= k; i++) {
      r[i] += a * binom * c ** (k - i);
      binom = (binom * (k - i)) / (i + 1);
    }
  });
  return r;
}

export const normeImageMonome = (type: Type, c: number, n: number) => normeSomme(image(type, c, [...Array(n).fill(0), 1]));

export const estContinue = (type: Type, c: number) => type === 'multiplication' || (type === 'dilatation' && Math.abs(c) <= 1);

export function genererExercice(): Exercice {
  const type = choisir<Type>(['decalage', 'decalage', 'dilatation', 'dilatation', 'derivation', 'multiplication']);
  const c =
    type === 'decalage' ? choisir([-3, -2, -1, 1, 2, 3])
    : type === 'dilatation' ? choisir([-2, -1, 1, 2, 3])
    : type === 'multiplication' ? choisir([-3, -2, -1, 1, 2, 3])
    : 0;
  const P = [entier(-3, 3), entier(-3, 3), entier(-3, 3)];
  if (P[2] === 0) P[2] = choisir([-2, -1, 1, 2]);
  return { type, c, P, n: entier(4, 6), ordre: melanger([0, 1, 2, 3]) };
}

export const questions = (exo: Exercice): Question[] => {
  const continue_ = estContinue(exo.type, exo.c);
  return [
    { type: 'nombre', id: 'monome', libelle: <>Calcule <MathTex tex={`\\lVert\\varphi(X^{${exo.n}})\\rVert`} />.</>, attendu: normeImageMonome(exo.type, exo.c, exo.n), placeholder: 'Ex : 32', aide: 'Un entier.' },
    { type: 'nombre', id: 'P', libelle: <>Calcule <MathTex tex="\lVert\varphi(P)\rVert" />.</>, attendu: normeSomme(image(exo.type, exo.c, exo.P)), placeholder: 'Ex : 17', aide: 'Un entier.' },
    {
      type: 'choix', id: 'cont', libelle: <>L’application linéaire <MathTex tex="\varphi" /> est-elle continue ?</>,
      attendu: continue_ ? 'oui' : 'non',
      options: permuter(
        [
          { valeur: 'oui', contenu: <>Oui : il existe <MathTex tex="M" /> tel que <MathTex tex="\lVert\varphi(P)\rVert\le M\lVert P\rVert" /> pour tout <MathTex tex="P" />.</> },
          { valeur: 'non', contenu: <>Non : <MathTex tex="\lVert\varphi(X^n)\rVert/\lVert X^n\rVert" /> n’est pas borné quand <MathTex tex="n" /> varie.</> },
          { valeur: 'dimension', contenu: <>Oui : toute application linéaire est continue.</> },
          { valeur: 'indecidable', contenu: <>On ne peut pas décider sans connaître <MathTex tex="\lVert\varphi\rVert" />.</> },
        ],
        exo.ordre,
      ),
    },
  ];
};

const nomPhi = (t: Type, c: number) =>
  t === 'decalage' ? `\\varphi(P)=P(X${c < 0 ? '-' : '+'}${Math.abs(c)})`
  : t === 'dilatation' ? `\\varphi(P)=P(${c === -1 ? '-' : c === 1 ? '' : c}X)`
  : t === 'derivation' ? "\\varphi(P)=P'"
  : `\\varphi(P)=(X${c < 0 ? '+' : '-'}${Math.abs(c)})\\,P`;

/* ===== Affichage ===== */

export default function ContinuitePolynomes() {
  const [exo, regenerer] = useTirage(genererExercice);
  const [essai, setEssai] = useState(0);
  if (!exo) return <Chargement />;

  const { type, c, P, n } = exo;
  const imageP = image(type, c, P);
  const continue_ = estContinue(type, c);
  const normeMonome = normeImageMonome(type, c, n);
  const suite = type === 'decalage' ? `(1+${Math.abs(c)})^{m}` : type === 'dilatation' ? `${Math.abs(c)}^{m}` : 'm';

  return (
    <Cadre>
      <Titre />
      <Enonce>
        <p>
          On munit <MathTex tex="E=\mathbb R[X]" /> de la norme <MathTex tex="\lVert P\rVert=\sum_{k}\lvert a_k\rvert" /> pour <MathTex tex="P=\sum_k a_kX^k" />. Soit <MathTex tex="\varphi" /> l’endomorphisme de <MathTex tex="E" /> défini par :
        </p>
        <p style={{ textAlign: 'center' }}>
          <MathTex tex={nomPhi(type, c)} />
        </p>
        <p>
          On donne <MathTex tex={`P=${texPoly(P)}`} /> et <MathTex tex={`n=${n}`} />.
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
            <MathTex tex={`\\lVert\\varphi(X^{${n}})\\rVert=${normeMonome}`} />, <MathTex tex={`\\lVert\\varphi(P)\\rVert=${normeSomme(imageP)}`} />, et <MathTex tex="\varphi" /> {continue_ ? 'est continue.' : 'n’est pas continue.'}
          </p>
        }
        correction={
          <>
            <li>
              <strong>Image de <MathTex tex={`X^{${n}}`} />.</strong>{' '}
              {type === 'decalage' && (
                <>
                  <MathTex tex={`\\varphi(X^{${n}})=(X${c < 0 ? '-' : '+'}${Math.abs(c)})^{${n}}=\\sum_{i}\\binom{${n}}{i}(${c})^{${n}-i}X^i`} />. Pour <MathTex tex="c>0" /> tous les coefficients sont positifs, et leur somme vaut la valeur en 1 : <MathTex tex={`(1+${c})^{${n}}`} />. Si <MathTex tex="c<0" />, les signes alternent mais les valeurs absolues donnent <MathTex tex={`(1+\\lvert c\\rvert)^{${n}}`} />. Ici : <MathTex tex={`${normeMonome}`} />.
                </>
              )}
              {type === 'dilatation' && (
                <>
                  <MathTex tex={`\\varphi(X^{${n}})=(${c})^{${n}}X^{${n}}`} />, de norme <MathTex tex={`\\lvert ${c}\\rvert^{${n}}=${normeMonome}`} />.
                </>
              )}
              {type === 'derivation' && (
                <>
                  <MathTex tex={`\\varphi(X^{${n}})=${n}X^{${n - 1}}`} />, de norme <MathTex tex={`${n}`} />.
                </>
              )}
              {type === 'multiplication' && (
                <>
                  <MathTex tex={`\\varphi(X^{${n}})=X^{${n + 1}}${c < 0 ? '+' : '-'}${Math.abs(c)}X^{${n}}`} />, de norme <MathTex tex={`1+${Math.abs(c)}=${normeMonome}`} />.
                </>
              )}
            </li>
            <li>
              <strong>Image de <MathTex tex="P" />.</strong> <MathTex tex={`\\varphi(P)=${texPoly(imageP)}`} />, donc <MathTex tex={`\\lVert\\varphi(P)\\rVert=${imageP.map((a) => Math.abs(a)).filter((a) => a !== 0).join('+') || '0'}=${normeSomme(imageP)}`} />.
            </li>
            <li>
              <strong>Continuité.</strong> Les <MathTex tex="X^m" /> sont tous de norme 1. Pour une application linéaire, « continue » équivaut à « bornée sur la sphère unité ».{' '}
              {continue_ ? (
                type === 'multiplication' ? (
                  <>
                    Ici <MathTex tex={`\\lVert\\varphi(P)\\rVert\\le\\lVert XP\\rVert+\\lvert ${c}\\rvert\\lVert P\\rVert=(1+\\lvert ${c}\\rvert)\\lVert P\\rVert`} /> : <MathTex tex="\varphi" /> est continue, de norme <MathTex tex={`1+\\lvert ${c}\\rvert`} />.
                  </>
                ) : (
                  <>
                    Ici <MathTex tex={`\\lVert\\varphi(P)\\rVert=\\sum_k\\lvert ${c}\\rvert^k\\lvert a_k\\rvert\\le\\lVert P\\rVert`} /> car <MathTex tex={`\\lvert ${c}\\rvert\\le1`} /> : <MathTex tex="\varphi" /> est continue (c’est même une contraction).
                  </>
                )
              ) : (
                <>
                  Ici <MathTex tex={`\\lVert\\varphi(X^m)\\rVert=${suite}`} /> n’est pas borné quand <MathTex tex="m\to+\infty" /> : aucun <MathTex tex="M" /> ne convient, <MathTex tex="\varphi" /> n’est <strong>pas continue</strong>.
                </>
              )}
            </li>
          </>
        }
        conseils={
          <>
            <li>En dimension infinie, une application linéaire n’est <strong>pas</strong> toujours continue : c’est la différence fondamentale avec la dimension finie.</li>
            <li>Pour réfuter la continuité, trouve des vecteurs <MathTex tex="x_n" /> de norme 1 tels que <MathTex tex="\lVert\varphi(x_n)\rVert\to+\infty" />. Pour la prouver, majore <MathTex tex="\lVert\varphi(x)\rVert" /> par <MathTex tex="M\lVert x\rVert" /> pour <strong>tout</strong> <MathTex tex="x" />.</li>
            <li>Dans la norme <MathTex tex="\sum\lvert a_k\rvert" />, la norme de <MathTex tex="(X+c)^n" /> est la somme des valeurs absolues des coefficients : c’est <MathTex tex="(1+\lvert c\rvert)^n" />.</li>
          </>
        }
      />
    </Cadre>
  );
}
