import { useState } from 'react';
import {
  AIDE_FRACTION, Cadre, Chargement, Enonce, MathTex, Questions, Titre, attenduFraction, entier, fraction, melanger, nombre, permuter, texFrac, texMat, useTirage,
  type Fraction, type Question,
} from './_commun.ts';

/**
 * Exercice : série géométrique de matrices Σ Aᵏ = (I − A)⁻¹.
 *
 *   A = (1/m) [[p, q], [0, r]]     triangulaire supérieure, valeurs propres p/m et r/m
 *
 *   ρ(A) = max(|p|, |r|) / m < 1  ⇒  Σ Aᵏ converge et vaut (I − A)⁻¹.
 *   (I − A)⁻¹ = [[1/(1−a), b/((1−a)(1−d))], [0, 1/(1−d)]]   avec a = p/m, b = q/m, d = r/m
 *   Coefficient (1,2) : q m / ((m − p)(m − r)).
 *   Le critère ‖A‖∞ < 1 (plus grande somme de |coefficients| par ligne) ne suffit pas toujours.
 */

/* ===== Logique ===== */

export type Exercice = { m: number; p: number; q: number; r: number; ordre: number[] };
export type Critere = 'oui' | 'non-converge' | 'diverge';

export const rayonSpectral = ({ m, p, r }: Exercice): Fraction => fraction(Math.max(Math.abs(p), Math.abs(r)), m);

/** ‖A‖∞ = plus grande somme des |coefficients| d'une ligne */
export const normeInfini = ({ m, p, q, r }: Exercice): Fraction => fraction(Math.max(Math.abs(p) + Math.abs(q), Math.abs(r)), m);

export const critereSuffit = (e: Exercice) => {
  const n = normeInfini(e);
  return n.n < n.d;
};

/** Coefficient (1,2) de (I − A)⁻¹ */
export const sommeCoefficient12 = ({ m, p, q, r }: Exercice): Fraction => fraction(q * m, (m - p) * (m - r));

export function genererExercice(): Exercice {
  const m = entier(3, 8);
  for (;;) {
    const p = entier(-(m - 1), m - 1);
    const r = entier(-(m - 1), m - 1);
    const q = entier(-6, 6);
    if (q === 0) continue;
    // moitié des cas : le critère ‖A‖∞ < 1 est inconclusif (mais ρ(A) < 1)
    const inconclusif = Math.abs(p) + Math.abs(q) >= m;
    if (inconclusif === (entier(1, 100) <= 50)) return { m, p, q, r, ordre: melanger([0, 1, 2]) };
  }
}

export const questions = (exo: Exercice): Question[] => {
  const rho = attenduFraction(rayonSpectral(exo));
  const s = attenduFraction(sommeCoefficient12(exo));
  return [
    { type: 'nombre', id: 'rho', libelle: <>Rayon spectral <MathTex tex="\rho(A)" /> :</>, ...rho, placeholder: 'Ex : 3/5', aide: AIDE_FRACTION },
    {
      type: 'choix', id: 'critere', libelle: <>Le critère « <MathTex tex="\lVert A\rVert_\infty<1" /> » permet-il de conclure à la convergence de <MathTex tex="\sum A^k" /> ?</>,
      attendu: critereSuffit(exo) ? 'oui' : 'non-converge',
      options: permuter(
        [
          { valeur: 'oui', contenu: <>Oui : <MathTex tex="\lVert A\rVert_\infty<1" />, donc la série converge.</> },
          { valeur: 'non-converge', contenu: <>Non : <MathTex tex="\lVert A\rVert_\infty\ge1" />, mais la série converge quand même car <MathTex tex="\rho(A)<1" />.</> },
          { valeur: 'diverge', contenu: <>Non : <MathTex tex="\lVert A\rVert_\infty\ge1" />, donc la série diverge.</> },
        ],
        exo.ordre,
      ),
    },
    { type: 'nombre', id: 'S12', libelle: <>Coefficient en position (1, 2) de <MathTex tex="\sum_{k=0}^{+\infty}A^k" /> :</>, ...s, placeholder: 'Ex : 10/21', aide: AIDE_FRACTION },
  ];
};

/* ===== Affichage ===== */

export default function SerieGeometriqueMatrices() {
  const [exo, regenerer] = useTirage(genererExercice);
  const [essai, setEssai] = useState(0);
  if (!exo) return <Chargement />;

  const { m, p, q, r } = exo;
  const rho = rayonSpectral(exo);
  const ninf = normeInfini(exo);
  const s12 = sommeCoefficient12(exo);
  const suffit = critereSuffit(exo);
  const sommeLigne1 = Math.abs(p) + Math.abs(q);

  return (
    <Cadre>
      <Titre />
      <Enonce>
        <p>On considère la matrice :</p>
        <p style={{ textAlign: 'center' }}>
          <MathTex tex={`A=\\dfrac1{${m}}${texMat([[nombre(p), nombre(q)], [0, nombre(r)]])}`} />
        </p>
        <p>
          On munit <MathTex tex="\mathcal M_2(\mathbb R)" /> de la norme subordonnée à <MathTex tex="\lVert\cdot\rVert_\infty" /> : <MathTex tex="\lVert A\rVert_\infty=\max_i\sum_j\lvert a_{ij}\rvert" />. On rappelle que <MathTex tex="\sum_{k\ge0}A^k" /> converge si et seulement si <MathTex tex="\rho(A)<1" />, et vaut alors <MathTex tex="(I_2-A)^{-1}" />.
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
            <MathTex tex={`\\rho(A)=${texFrac(rho)}`} />, la série converge vers <MathTex tex="(I-A)^{-1}" /> dont le coefficient (1, 2) vaut <MathTex tex={texFrac(s12)} />.
          </p>
        }
        correction={
          <>
            <li>
              <MathTex tex="A" /> est triangulaire : ses valeurs propres sont ses coefficients diagonaux <MathTex tex={`\\dfrac{${nombre(p)}}{${m}}`} /> et <MathTex tex={`\\dfrac{${nombre(r)}}{${m}}`} />. Donc{' '}
              <MathTex tex={`\\rho(A)=\\max\\left(\\dfrac{${Math.abs(p)}}{${m}},\\dfrac{${Math.abs(r)}}{${m}}\\right)=${texFrac(rho)}`} />, qui est <strong>&lt; 1</strong> : la série converge.
            </li>
            <li>
              <MathTex tex={`\\lVert A\\rVert_\\infty=\\dfrac1{${m}}\\max(\\lvert ${p}\\rvert+\\lvert ${q}\\rvert,\\ \\lvert ${r}\\rvert)=\\dfrac{${Math.max(sommeLigne1, Math.abs(r))}}{${m}}=${texFrac(ninf)}`} />.{' '}
              {suffit ? (
                <>Cette valeur est <MathTex tex="<1" /> : le critère suffit déjà.</>
              ) : (
                <>
                  Cette valeur est <MathTex tex="\ge 1" /> : le critère de la norme ne permet pas de conclure. On sait pourtant que <MathTex tex="\rho(A)\le\lVert A\rVert" /> pour toute norme subordonnée, mais la réciproque n’est pas vraie, et c’est <MathTex tex="\rho(A)<1" /> qui décide.
                </>
              )}
            </li>
            <li>
              Somme : <MathTex tex="\sum_k A^k=(I-A)^{-1}" />. Avec <MathTex tex={`I-A=\\dfrac1{${m}}${texMat([[m - p, nombre(-q)], [0, m - r]])}`} />, on inverse une matrice triangulaire : le coefficient (1, 2) de l’inverse de <MathTex tex="\begin{pmatrix}\alpha&\beta\\0&\delta\end{pmatrix}" /> est <MathTex tex="-\beta/(\alpha\delta)" />.
            </li>
            <li>
              Ici <MathTex tex={`\\alpha=\\dfrac{${m - p}}{${m}}`} />, <MathTex tex={`\\beta=\\dfrac{${nombre(-q)}}{${m}}`} />, <MathTex tex={`\\delta=\\dfrac{${m - r}}{${m}}`} />, donc le coefficient (1, 2) vaut{' '}
              <MathTex tex={`\\dfrac{${q}/${m}}{(${m - p}/${m})(${m - r}/${m})}=\\dfrac{${q}\\times${m}}{${m - p}\\times${m - r}}=${texFrac(s12)}`} />.
            </li>
          </>
        }
        conseils={
          <>
            <li>Pour une série <MathTex tex="\sum A^k" /> : la bonne condition est <MathTex tex="\rho(A)<1" />. Une norme subordonnée <MathTex tex="<1" /> est une condition <em>suffisante</em>, pas nécessaire.</li>
            <li>Le rayon spectral d’une matrice triangulaire se lit sur sa diagonale.</li>
            <li>Vérifie ton résultat : le coefficient (1, 2) a le signe de <MathTex tex="q" />, car <MathTex tex="m-p>0" /> et <MathTex tex="m-r>0" />.</li>
          </>
        }
      />
    </Cadre>
  );
}
