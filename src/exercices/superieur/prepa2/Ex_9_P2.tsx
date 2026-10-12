import { useState } from 'react';
import {
  AIDE_FRACTION, Cadre, Chargement, Enonce, MathTex, Questions, Titre, attenduFraction, entier, fAdd, fraction, melanger, nombre, permuter, texFrac, texMat, useTirage,
  type Fraction, type Question,
} from './_commun.ts';

/**
 * Exercice : limite de la suite (Aᵏ) quand A = λ I + (1 − λ) Π, avec Π projecteur de rang 1.
 *
 *   A = (1/(m s)) · M,   M = p s I + (m − p) u vᵀ,   λ = p/m,   s = u·v > 0
 *   A est diagonalisable, de valeurs propres 1 et λ (|λ| < 1).
 *   tr A = 1 + λ, donc λ = tr A − 1.
 *   Aᵏ = λᵏ I + (1 − λᵏ) Π  →  Π = (A − λ I)/(1 − λ) = u vᵀ / s
 *   La limite L est le projecteur sur Ker(A − I) parallèlement à Ker(A − λ I) : rang 1, trace 1.
 */

/* ===== Logique ===== */

export type Exercice = { m: number; p: number; u: [number, number]; v: [number, number]; ordre: number[] };

export const produitScalaire = ({ u, v }: Exercice) => u[0] * v[0] + u[1] * v[1];

/** Matrice A sous forme de fractions [[a11, a12], [a21, a22]] */
export function matriceA(e: Exercice): Fraction[][] {
  const { m, p, u, v } = e;
  const s = produitScalaire(e);
  return [0, 1].map((i) => [0, 1].map((j) => fraction((i === j ? p * s : 0) + (m - p) * u[i] * v[j], m * s)));
}

/** Entiers de M = ms·A */
export function matriceM(e: Exercice): number[][] {
  const { m, p, u, v } = e;
  const s = produitScalaire(e);
  return [0, 1].map((i) => [0, 1].map((j) => (i === j ? p * s : 0) + (m - p) * u[i] * v[j]));
}

export const lambda = ({ m, p }: Exercice): Fraction => fraction(p, m);

/** Coefficients de la limite L */
export const limite = (e: Exercice): Fraction[][] => {
  const s = produitScalaire(e);
  return [0, 1].map((i) => [0, 1].map((j) => fraction(e.u[i] * e.v[j], s)));
};

export function genererExercice(): Exercice {
  const m = entier(2, 5);
  for (;;) {
    const p = entier(-(m - 1), m - 1);
    const u: [number, number] = [entier(-2, 3), entier(-2, 3)];
    let v: [number, number] = [entier(-2, 3), entier(-2, 3)];
    let s = u[0] * v[0] + u[1] * v[1];
    if (s < 0) {
      v = [-v[0], -v[1]];
      s = -s;
    }
    // tous les coefficients de u et v sont non nuls : la limite L n'a aucun zéro « facile »
    if (s === 0 || u[0] === 0 || u[1] === 0 || v[0] === 0 || v[1] === 0) continue;
    return { m, p, u, v, ordre: melanger([0, 1, 2, 3]) };
  }
}

export const questions = (exo: Exercice): Question[] => {
  const lam = attenduFraction(lambda(exo));
  const L = limite(exo);
  return [
    { type: 'nombre', id: 'lam', libelle: <>Quelle est l’autre valeur propre <MathTex tex="\lambda" /> de <MathTex tex="A" /> ?</>, ...lam, placeholder: 'Ex : 2/5', aide: AIDE_FRACTION },
    { type: 'nombre', id: 'L11', libelle: <>Coefficient en position (1, 1) de <MathTex tex="L=\lim A^k" /> :</>, ...attenduFraction(L[0][0]), placeholder: 'Ex : 1/3', aide: AIDE_FRACTION },
    { type: 'nombre', id: 'L12', libelle: <>Coefficient en position (1, 2) de <MathTex tex="L" /> :</>, ...attenduFraction(L[0][1]), placeholder: 'Ex : -2/3', aide: AIDE_FRACTION },
    {
      type: 'choix', id: 'nature', libelle: <>La matrice <MathTex tex="L" /> est :</>, attendu: 'p1',
      options: permuter(
        [
          { valeur: 'p1', contenu: <>un projecteur de rang 1 (<MathTex tex="L^2=L" />, <MathTex tex="\operatorname{tr}L=1" />)</> },
          { valeur: 'p2', contenu: <>la matrice identité <MathTex tex="I_2" /></> },
          { valeur: 'zero', contenu: <>la matrice nulle</> },
          { valeur: 'diverge', contenu: <>sans objet : la suite <MathTex tex="(A^k)" /> diverge</> },
        ],
        exo.ordre,
      ),
    },
  ];
};

/* ===== Affichage ===== */

export default function LimitePuissancesMatrice() {
  const [exo, regenerer] = useTirage(genererExercice);
  const [essai, setEssai] = useState(0);
  if (!exo) return <Chargement />;

  const { m, p } = exo;
  const s = produitScalaire(exo);
  const M = matriceM(exo);
  const lam = lambda(exo);
  const L = limite(exo);
  const A = matriceA(exo);
  const tr = fAdd(A[0][0], A[1][1]);
  const denominateur = m * s;

  return (
    <Cadre>
      <Titre />
      <Enonce>
        <p>On considère la matrice :</p>
        <p style={{ textAlign: 'center' }}>
          <MathTex tex={`A=\\dfrac1{${denominateur}}${texMat(M.map((l) => l.map(nombre)))}`} />
        </p>
        <p>
          On admet que <MathTex tex="A" /> est diagonalisable, que <MathTex tex="1" /> est valeur propre de <MathTex tex="A" /> et que son autre valeur propre <MathTex tex="\lambda" /> vérifie <MathTex tex="\lvert\lambda\rvert<1" />. On admet aussi que la suite <MathTex tex="(A^k)" /> converge vers une matrice <MathTex tex="L" />.
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
            <MathTex tex={`\\lambda=${texFrac(lam)}`} /> et <MathTex tex={`L=${texMat(L.map((l) => l.map(texFrac)))}`} />, un projecteur de rang 1.
          </p>
        }
        correction={
          <>
            <li>
              La trace est la somme des valeurs propres : <MathTex tex={`\\operatorname{tr}A=\\dfrac{${nombre(M[0][0])}+${nombre(M[1][1])}}{${denominateur}}=${texFrac(tr)}`} />, donc <MathTex tex={`\\lambda=\\operatorname{tr}A-1=${texFrac(lam)}`} />.
            </li>
            <li>
              Dans une base de diagonalisation, <MathTex tex="A^k" /> a pour valeurs propres <MathTex tex="1" /> et <MathTex tex="\lambda^k\to0" />. La limite <MathTex tex="L" /> est donc le <strong>projecteur</strong> sur <MathTex tex="\operatorname{Ker}(A-I)" /> parallèlement à <MathTex tex="\operatorname{Ker}(A-\lambda I)" /> : <MathTex tex="L^2=L" />, de rang 1 et de trace 1.
            </li>
            <li>
              Astuce : <MathTex tex="A=1\cdot L+\lambda\,(I-L)" />, donc <MathTex tex="A-\lambda I=(1-\lambda)L" /> et <MathTex tex="L=\dfrac{A-\lambda I}{1-\lambda}" />. Ici <MathTex tex={`1-\\lambda=${texFrac(fraction(m - p, m))}`} />.
            </li>
            <li>
              Coefficient (1, 1) : <MathTex tex={`L_{11}=\\dfrac{${texFrac(A[0][0])}-${texFrac(lam)}}{${texFrac(fraction(m - p, m))}}=${texFrac(L[0][0])}`} />.
            </li>
            <li>
              Coefficient (1, 2) : <MathTex tex={`L_{12}=\\dfrac{${texFrac(A[0][1])}}{${texFrac(fraction(m - p, m))}}=${texFrac(L[0][1])}`} /> (le terme <MathTex tex="-\lambda I" /> ne touche que la diagonale).
            </li>
            <li>
              Vérification : <MathTex tex={`\\operatorname{tr}L=${texFrac(L[0][0])}+${texFrac(L[1][1])}=1`} />, comme il se doit pour un projecteur de rang 1.
            </li>
          </>
        }
        conseils={
          <>
            <li>Quand <MathTex tex="A" /> est diagonalisable avec des valeurs propres <MathTex tex="1" /> et <MathTex tex="\lambda" />, <MathTex tex="\lvert\lambda\rvert<1" /> : <MathTex tex="A^k\to" /> le projecteur associé à la valeur propre 1.</li>
            <li>Un projecteur a pour trace son rang. C’est un excellent test de vérification de ton calcul de <MathTex tex="L" />.</li>
            <li>Si <MathTex tex="A=\lambda I+(1-\lambda)L" /> avec <MathTex tex="L^2=L" />, alors <MathTex tex="A^k=\lambda^kI+(1-\lambda^k)L" /> (les puissances se calculent comme si <MathTex tex="L" /> était le nombre 1).</li>
          </>
        }
      />
    </Cadre>
  );
}
