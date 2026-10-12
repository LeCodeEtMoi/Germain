import { useState } from 'react';
import { Cadre, Chargement, Enonce, MathTex, Questions, Titre, choisir, entier, factorielle, melanger, permuter, polyDeriv, texPoly, useTirage, type Poly, type Question } from './_commun.ts';

/**
 * Exercice : la norme N₁(P) = Σₖ |P⁽ᵏ⁾(0)| sur ℝ[X].
 *
 *   P⁽ᵏ⁾(0) = k! aₖ, donc N₁(P) = Σ k! |aₖ| ; N₁(Xⁿ) = n!.
 *   N'(P) = max |aₖ| (ou Σ |aₖ|) vérifie N' ≤ N₁, mais N₁(Xⁿ)/N'(Xⁿ) = n! → +∞ :
 *   pas de constante C telle que N₁ ≤ C N' : les normes ne sont pas équivalentes.
 */

/* ===== Logique ===== */

export type Reference = 'max' | 'somme';
export type Exercice = { P: Poly; n: number; reference: Reference; ordre: number[] };

/** N₁(P) calculée en dérivant P et en évaluant en 0 (indépendante de la formule k!|aₖ|). */
export function normeN1(P: Poly): number {
  let courant = P;
  let total = 0;
  for (let k = 0; k < P.length; k++) {
    total += Math.abs(courant[0]);
    courant = polyDeriv(courant);
  }
  return total;
}

export const normeReference = (P: Poly, ref: Reference) => (ref === 'max' ? Math.max(...P.map(Math.abs)) : P.reduce((s, a) => s + Math.abs(a), 0));

export function genererExercice(): Exercice {
  for (;;) {
    const P = [entier(-4, 4), entier(-4, 4), entier(-4, 4), entier(-4, 4)];
    if (P[3] !== 0 && P.filter((a) => a === 0).length <= 1) return { P, n: entier(4, 7), reference: choisir<Reference>(['max', 'somme']), ordre: melanger([0, 1, 2, 3]) };
  }
}

export const questions = (exo: Exercice): Question[] => [
  { type: 'nombre', id: 'P', libelle: <>Calcule <MathTex tex="N_1(P)" />.</>, attendu: normeN1(exo.P), placeholder: 'Ex : 60', aide: 'Un entier.' },
  { type: 'nombre', id: 'n', libelle: <>Calcule <MathTex tex={`N_1(X^{${exo.n}})`} />.</>, attendu: factorielle(exo.n), placeholder: 'Ex : 120', aide: 'Un entier.' },
  {
    type: 'choix', id: 'equiv', libelle: <>Quelle affirmation est vraie ?</>, attendu: 'sens-unique',
    options: permuter([
      { valeur: 'sens-unique', contenu: <><MathTex tex="N'\le N_1" />, mais il n’existe aucune constante <MathTex tex="C" /> avec <MathTex tex="N_1\le C\,N'" /> : les normes ne sont pas équivalentes.</> },
      { valeur: 'inverse', contenu: <><MathTex tex="N_1\le N'" />, mais il n’existe aucune constante <MathTex tex="C" /> avec <MathTex tex="N'\le C\,N_1" />.</> },
      { valeur: 'equivalentes', contenu: <>Les deux normes sont équivalentes (<MathTex tex="N'\le N_1\le C\,N'" /> pour une constante <MathTex tex="C" />).</> },
      { valeur: 'aucune', contenu: <>Aucune comparaison n’est possible entre <MathTex tex="N_1" /> et <MathTex tex="N'" />.</> },
    ], exo.ordre),
  },
];

/* ===== Affichage ===== */

export default function NormeDerivees() {
  const [exo, regenerer] = useTirage(genererExercice);
  const [essai, setEssai] = useState(0);
  if (!exo) return <Chargement />;

  const { P, n, reference } = exo;
  const termes = P.map((a, k) => ({ k, a, kfact: factorielle(k), valeur: factorielle(k) * Math.abs(a) }));
  const total = normeN1(P);
  const tex = reference === 'max' ? "N'(P)=\\max_k\\lvert a_k\\rvert" : "N'(P)=\\sum_k\\lvert a_k\\rvert";

  return (
    <Cadre>
      <Titre />
      <Enonce>
        <p>
          Sur <MathTex tex="\mathbb R[X]" />, on pose <MathTex tex="N_1(P)=\sum_{k=0}^{+\infty}\lvert P^{(k)}(0)\rvert" /> (la somme est finie : <MathTex tex="P^{(k)}=0" /> dès que <MathTex tex="k>\deg P" />). On admet que <MathTex tex="N_1" /> est une norme. On note aussi, pour <MathTex tex="P=\sum a_kX^k" />, <MathTex tex={tex} />.
        </p>
        <p>
          Soit <MathTex tex={`P=${texPoly(P)}`} />.
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
            <MathTex tex={`N_1(P)=${total}`} />, <MathTex tex={`N_1(X^{${n}})=${n}!=${factorielle(n)}`} />, et <MathTex tex="N'\le N_1" /> sans réciproque : les deux normes ne sont pas équivalentes.
          </p>
        }
        correction={
          <>
            <li>
              Pour <MathTex tex="P=\sum a_kX^k" />, la dérivée <MathTex tex="k" />-ième en 0 vaut <MathTex tex="P^{(k)}(0)=k!\,a_k" />. Donc <MathTex tex="N_1(P)=\sum_k k!\,\lvert a_k\rvert" />.
            </li>
            <li>
              Ici : <MathTex tex={`N_1(P)=${termes.map((t) => `${t.kfact}\\times${Math.abs(t.a)}`).join('+')}=${total}`} />.
            </li>
            <li>
              <MathTex tex={`P=X^{${n}}`} /> : seul <MathTex tex={`a_{${n}}=1`} /> est non nul, donc <MathTex tex={`N_1(X^{${n}})=${n}!=${factorielle(n)}`} />.
            </li>
            <li>
              Comme <MathTex tex="k!\ge 1" />, on a <MathTex tex="\lvert a_k\rvert\le k!\lvert a_k\rvert" /> : <MathTex tex="N'(P)\le N_1(P)" /> (pour le max comme pour la somme).
            </li>
            <li>
              Réciproque fausse : <MathTex tex="N'(X^m)=1" /> pour tout <MathTex tex="m" /> mais <MathTex tex="N_1(X^m)=m!" /> n’est pas borné. Aucune constante <MathTex tex="C" /> ne vérifie <MathTex tex="m!\le C" /> pour tout <MathTex tex="m" />. Les normes ne sont donc <strong>pas équivalentes</strong> (ce qui est possible, car <MathTex tex="\mathbb R[X]" /> est de dimension infinie).
            </li>
          </>
        }
        conseils={
          <>
            <li>Pour montrer que deux normes ne sont pas équivalentes, cherche une <strong>suite de vecteurs</strong> dont le rapport des normes tend vers l’infini.</li>
            <li>N’oublie pas le <MathTex tex="k!" /> : <MathTex tex="P^{(k)}(0)" /> n’est pas <MathTex tex="a_k" /> mais <MathTex tex="k!\,a_k" />.</li>
            <li>En dimension finie toutes les normes sont équivalentes ; sur <MathTex tex="\mathbb R[X]" /> ce n’est plus vrai.</li>
          </>
        }
      />
    </Cadre>
  );
}
