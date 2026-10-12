import { useState } from 'react';
import {
  AIDE_FRACTION, Cadre, Chargement, Enonce, MathTex, Questions, Titre, attenduFraction, entier, fAdd, fraction, melanger, nombre, permuter, texFrac, texSomme, useTirage,
  type Fraction, type Question,
} from './_commun.ts';

/**
 * Exercice : norme d'une forme linéaire φ(f) = ∫₀¹ f(t) w(t) dt sur (C([0,1]), ‖·‖∞), avec w(t) = a + b t.
 *
 *   |φ(f)| ≤ ‖f‖∞ ∫|w|, donc ‖φ‖ ≤ ∫₀¹ |w|.
 *   Cette borne est la valeur exacte de ‖φ‖ (approcher le signe de w par des fonctions continues).
 *   - w ≥ 0 sur [0,1] (a ≥ 0 et a + b ≥ 0) : φ est positive et ‖φ‖ = φ(1) = a + b/2.
 *   - w change de signe : ∫|w| = (a² + (a + b)²) / (2 (|a| + |a + b|)).
 */

/* ===== Logique ===== */

export type Exercice = { a: number; b: number; k: number; ordre: number[] };

export const estPositive = ({ a, b }: Exercice) => a >= 0 && a + b >= 0;
export const estNegative = ({ a, b }: Exercice) => a <= 0 && a + b <= 0;

/** φ(tᵏ) = a/(k+1) + b/(k+2) */
export const valeurSurMonome = ({ a, b, k }: Exercice): Fraction => fAdd(fraction(a, k + 1), fraction(b, k + 2));

/** ‖φ‖ = ∫₀¹ |a + b t| dt */
export function normeForme({ a, b }: Exercice): Fraction {
  const w0 = a;
  const w1 = a + b;
  if ((w0 >= 0 && w1 >= 0) || (w0 <= 0 && w1 <= 0)) return fraction(Math.abs(2 * a + b), 2);
  return fraction(w0 * w0 + w1 * w1, 2 * (Math.abs(w0) + Math.abs(w1)));
}

export function genererExercice(): Exercice {
  const k = entier(1, 3);
  const genre = entier(1, 100);
  for (;;) {
    const a = entier(-6, 6);
    const b = entier(-8, 8);
    if (a === 0 && b === 0) continue;
    const exo = { a, b, k, ordre: melanger([0, 1]) };
    if (genre <= 45 ? estPositive(exo) && (a > 0 || a + b > 0) : genre <= 60 ? estNegative(exo) : !estPositive(exo) && !estNegative(exo)) return exo;
  }
}

export const questions = (exo: Exercice): Question[] => [
  {
    type: 'nombre', id: 'val', libelle: <>Calcule <MathTex tex={`\\varphi(f_0)`} /> pour <MathTex tex={`f_0(t)=t^{${exo.k}}`} />.</>, ...attenduFraction(valeurSurMonome(exo)),
    placeholder: 'Ex : 7/12', aide: AIDE_FRACTION,
  },
  {
    type: 'choix', id: 'pos', libelle: <>La forme linéaire <MathTex tex="\varphi" /> est-elle positive (<MathTex tex="f\ge0\Rightarrow\varphi(f)\ge0" />) ?</>,
    attendu: estPositive(exo) ? 'oui' : 'non',
    options: permuter(
      [
        { valeur: 'oui', contenu: 'Oui' },
        { valeur: 'non', contenu: 'Non' },
      ],
      exo.ordre,
    ),
    enLigne: true,
  },
  {
    type: 'nombre', id: 'norme', libelle: <>Calcule la norme <MathTex tex="\lVert\varphi\rVert" /> de <MathTex tex="\varphi" /> (norme d’opérateur, pour <MathTex tex="\lVert\cdot\rVert_\infty" />) :</>,
    ...attenduFraction(normeForme(exo)), placeholder: 'Ex : 5/6', aide: AIDE_FRACTION,
  },
];

/* ===== Affichage ===== */

export default function FormeLineairePositive() {
  const [exo, regenerer] = useTirage(genererExercice);
  const [essai, setEssai] = useState(0);
  if (!exo) return <Chargement />;

  const { a, b, k } = exo;
  const wTex = texSomme([[a, ''], [b, 't']]);
  const positive = estPositive(exo);
  const negative = estNegative(exo);
  const norme = normeForme(exo);
  const val = valeurSurMonome(exo);
  const w1 = a + b;

  return (
    <Cadre>
      <Titre />
      <Enonce>
        <p>
          Soit <MathTex tex="E=\mathcal C([0,1],\mathbb R)" /> muni de la norme <MathTex tex="\lVert f\rVert_\infty=\sup_{[0,1]}\lvert f\rvert" />. On définit :
        </p>
        <p style={{ textAlign: 'center' }}>
          <MathTex tex={`\\varphi(f)=\\int_0^1 f(t)\\,(${wTex})\\,\\mathrm dt`} />
        </p>
        <p>
          <MathTex tex="\varphi" /> est une forme linéaire continue sur <MathTex tex="E" />.
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
            <MathTex tex={`\\varphi(t^{${k}})=${texFrac(val)}`} />, <MathTex tex="\varphi" /> {positive ? 'est positive' : 'n’est pas positive'} et <MathTex tex={`\\lVert\\varphi\\rVert=${texFrac(norme)}`} />.
          </p>
        }
        correction={
          <>
            <li>
              <MathTex tex={`\\varphi(t^{${k}})=\\int_0^1 t^{${k}}(${wTex})\\,\\mathrm dt=\\dfrac{${nombre(a)}}{${k + 1}}+\\dfrac{${nombre(b)}}{${k + 2}}=${texFrac(val)}`} />.
            </li>
            <li>
              Le poids <MathTex tex={`w(t)=${wTex}`} /> est affine : ses valeurs en 0 et en 1 sont <MathTex tex={`w(0)=${nombre(a)}`} /> et <MathTex tex={`w(1)=${nombre(w1)}`} />.{' '}
              {positive
                ? 'Ces deux valeurs sont positives : w ≥ 0 sur [0 ; 1], donc f ≥ 0 entraîne φ(f) ≥ 0. La forme φ est positive.'
                : negative
                  ? 'Ces deux valeurs sont négatives : w ≤ 0 sur [0 ; 1]. Pour f = 1 on obtient φ(1) < 0 alors que f ≥ 0 : φ n’est pas positive.'
                  : 'Elles sont de signes opposés : w s’annule sur ]0 ; 1[ et change de signe. Pour une fonction f ≥ 0 concentrée là où w < 0, φ(f) < 0 : φ n’est pas positive.'}
            </li>
            <li>
              Majoration : <MathTex tex="\lvert\varphi(f)\rvert\le\int_0^1\lvert f\rvert\lvert w\rvert\le\lVert f\rVert_\infty\int_0^1\lvert w\rvert" />, donc <MathTex tex="\lVert\varphi\rVert\le\int_0^1\lvert w\rvert" />.
            </li>
            {positive || negative ? (
              <li>
                Ici <MathTex tex="w" /> garde un signe constant : <MathTex tex={`\\int_0^1\\lvert w\\rvert=\\Big\\lvert\\int_0^1 w\\Big\\rvert=\\Big\\lvert ${nombre(a)}+\\dfrac{${nombre(b)}}2\\Big\\rvert=${texFrac(norme)}`} />. L’égalité est atteinte avec la fonction constante <MathTex tex={`f=${positive ? 1 : -1}`} /> (de norme 1) : <MathTex tex={`\\lvert\\varphi(${positive ? 1 : -1})\\rvert=${texFrac(norme)}`} />. Donc <MathTex tex={`\\lVert\\varphi\\rVert=${texFrac(norme)}`} />.
              </li>
            ) : (
              <li>
                Ici <MathTex tex="w" /> change de signe en <MathTex tex={`t_0=\\dfrac{${Math.abs(a)}}{${Math.abs(a)}+${Math.abs(w1)}}`} />. Les deux morceaux sont des triangles d’aires <MathTex tex={`\\dfrac{${Math.abs(a)}t_0}{2}`} /> et <MathTex tex={`\\dfrac{${Math.abs(w1)}(1-t_0)}{2}`} />, d’où{' '}
                <MathTex tex={`\\int_0^1\\lvert w\\rvert=\\dfrac{${a * a}+${w1 * w1}}{2(${Math.abs(a)}+${Math.abs(w1)})}=${texFrac(norme)}`} />. Cette borne est la valeur exacte de <MathTex tex="\lVert\varphi\rVert" /> : elle n’est pas atteinte par une fonction continue, mais en prenant des fonctions continues de norme 1 qui approchent <MathTex tex="\operatorname{signe}(w)" />, on s’en approche autant qu’on veut.
              </li>
            )}
          </>
        }
        conseils={
          <>
            <li>Pour une forme intégrale <MathTex tex="\varphi(f)=\int fw" />, on a toujours <MathTex tex="\lVert\varphi\rVert=\int\lvert w\rvert" /> pour la norme sup (poids continu).</li>
            <li>Si <MathTex tex="w\ge0" />, la forme est positive et sa norme se lit simplement : <MathTex tex="\lVert\varphi\rVert=\varphi(1)=\int w" />.</li>
            <li>Signe de <MathTex tex="w" /> affine : regarde seulement ses valeurs en 0 et en 1.</li>
          </>
        }
      />
    </Cadre>
  );
}
