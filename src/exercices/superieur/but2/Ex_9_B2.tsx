import { Fragment, useState } from 'react';
import { Cadre, Chargement, Enonce, MathTex, Questions, QUANTILES, Titre, arrondi, choisir, entier, phi, texDec, txtDec, useTirage, type Question } from './_commun.ts';

/**
 * Exercice : loi normale N(μ ; σ), lecture de la table de Φ.
 *
 *   P(X < x) = Φ((x − μ)/σ)         P(X > x) = 1 − Φ(z)        P(x₃ < X < x₄) = Φ(z₄) − Φ(z₃)
 *   P(X < u) = p                    →  u = μ + σ·z_p           (z_p = quantile de N(0 ; 1))
 * Les écarts z sont des multiples de 0,1 : la table fournie suffit (Φ(−z) = 1 − Φ(z)).
 */

/* ===== Logique ===== */

export type Exercice = { mu: number; sigma: number; z1: number; z2: number; z3: number; z4: number; qi: number };

const MUS = [12, 20, 50, 75, 100, 150, 170, 200, 500];
const SIGMAS = [2, 4, 5, 10, 20];

export const valeurX = (mu: number, sigma: number, z: number) => arrondi(mu + sigma * z, 2);
const dixieme = () => entier(-25, 25) / 10;

export function genererExercice(): Exercice {
  const mu = choisir(MUS);
  const sigma = choisir(SIGMAS);
  const z1 = dixieme();
  let z2 = dixieme();
  while (z2 === 0 || Math.abs(z2 - z1) < 0.01) z2 = dixieme();
  const a = entier(-25, 24) / 10;
  const b = Math.min(a + entier(5, 20) / 10, 3);
  return { mu, sigma, z1: z1 === 0 ? 0.3 : z1, z2, z3: a, z4: arrondi(b, 1), qi: entier(0, QUANTILES.length - 1) };
}

export const x1 = (e: Exercice) => valeurX(e.mu, e.sigma, e.z1);
export const x2 = (e: Exercice) => valeurX(e.mu, e.sigma, e.z2);
export const x3 = (e: Exercice) => valeurX(e.mu, e.sigma, e.z3);
export const x4 = (e: Exercice) => valeurX(e.mu, e.sigma, e.z4);
export const p1 = (e: Exercice) => phi(e.z1);
export const p2 = (e: Exercice) => 1 - phi(e.z2);
export const p3 = (e: Exercice) => phi(e.z4) - phi(e.z3);
export const seuil = (e: Exercice) => e.mu + e.sigma * QUANTILES[e.qi].zExact;

export const questions = (exo: Exercice): Question[] => [
  { type: 'nombre', id: 'p1', libelle: <>Calcule <MathTex tex={`P(X<${texDec(x1(exo))})`} /> (au millième).</>, attendu: p1(exo), tolerance: 0.0011, placeholder: 'Ex : 0,841', aide: 'Valeur approchée à 0,001 près.' },
  { type: 'nombre', id: 'p2', libelle: <>Calcule <MathTex tex={`P(X>${texDec(x2(exo))})`} /> (au millième).</>, attendu: p2(exo), tolerance: 0.0011, placeholder: 'Ex : 0,159', aide: 'Valeur approchée à 0,001 près.' },
  { type: 'nombre', id: 'p3', libelle: <>Calcule <MathTex tex={`P(${texDec(x3(exo))}<X<${texDec(x4(exo))})`} /> (au millième).</>, attendu: p3(exo), tolerance: 0.0021, placeholder: 'Ex : 0,683', aide: 'Valeur approchée à 0,002 près.' },
  {
    type: 'nombre', id: 'u', libelle: <>Trouve le réel <MathTex tex="u" /> tel que <MathTex tex={`P(X<u)=${texDec(QUANTILES[exo.qi].p)}`} /> (valeur décimale).</>, attendu: seuil(exo), tolerance: exo.sigma * 0.006,
    placeholder: 'Ex : 112,8', aide: 'Utilise les valeurs de z fournies sous la table.',
  },
];

/* ===== Affichage ===== */

const d3 = (x: number) => x.toFixed(3).replace('.', '{,}');
const d4 = (x: number) => x.toFixed(4).replace('.', '{,}');
const z = (v: number) => texDec(v, 1).replace('-', '-');

function TableauPhi() {
  const groupes = [0, 1, 2];
  return (
    <details className="exercice-astuce">
      <summary>Table de la loi normale centrée réduite : valeurs de Φ(z)</summary>
      <div className="exercice-tableau-conteneur">
        <table className="exercice-tableau">
          <thead>
            <tr>
              {groupes.map((g) => (
                <Fragment key={g}>
                  <th>z</th>
                  <th>Φ(z)</th>
                </Fragment>
              ))}
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 10 }, (_, i) => (
              <tr key={i}>
                {groupes.map((g) => {
                  const v = g + i / 10;
                  return (
                    <Fragment key={g}>
                      <td>{txtDec(v, 1)}</td>
                      <td>{phi(v).toFixed(4).replace('.', ',')}</td>
                    </Fragment>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p>
        <MathTex tex={`\\Phi(3{,}0)=${d4(phi(3))}`} />. Pour <MathTex tex="z<0" /> : <MathTex tex="\Phi(-z)=1-\Phi(z)" />.
      </p>
      <p>
        Quantiles utiles : {QUANTILES.map((q, i) => (
          <span key={q.p}>
            <MathTex tex={`\\Phi(${texDec(q.z)})\\approx ${texDec(q.p)}`} />{i < QUANTILES.length - 1 ? ' ; ' : '.'}
          </span>
        ))}
      </p>
    </details>
  );
}

export default function LoiNormale() {
  const [exo, regenerer] = useTirage(genererExercice);
  const [essai, setEssai] = useState(0);
  if (!exo) return <Chargement />;

  const { mu, sigma, z1, z2, z3, z4, qi } = exo;
  const q = QUANTILES[qi];
  const lib = (x: number) => texDec(x);
  const zz = (v: number) => (v < 0 ? `(${z(v)})` : z(v));

  return (
    <Cadre>
      <Titre />
      <Enonce>
        <p>
          Soit <MathTex tex="X" /> une variable aléatoire qui suit la loi normale <MathTex tex={`\\mathcal N(${mu}\\,;\\,${sigma})`} /> de moyenne <MathTex tex={`\\mu=${mu}`} /> et d’écart-type <MathTex tex={`\\sigma=${sigma}`} />. On note <MathTex tex="\Phi" /> la fonction de répartition de la loi <MathTex tex="\mathcal N(0\,;1)" />.
        </p>
        <TableauPhi />
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
            <MathTex tex={`P(X<${lib(x1(exo))})\\approx ${d3(p1(exo))}`} />, <MathTex tex={`P(X>${lib(x2(exo))})\\approx ${d3(p2(exo))}`} />, <MathTex tex={`P(${lib(x3(exo))}<X<${lib(x4(exo))})\\approx ${d3(p3(exo))}`} /> et <MathTex tex={`u\\approx ${texDec(arrondi(seuil(exo), 2))}`} />.
          </p>
        }
        correction={
          <>
            <li>
              <strong>Centrer et réduire.</strong> Si <MathTex tex={`X\\sim\\mathcal N(${mu};${sigma})`} />, alors <MathTex tex={`Z=\\dfrac{X-${mu}}{${sigma}}`} /> suit <MathTex tex="\mathcal N(0\,;1)" /> et <MathTex tex="P(X<x)=\Phi\!\left(\frac{x-\mu}\sigma\right)" />.
            </li>
            <li>
              <MathTex tex={`P(X<${lib(x1(exo))})=\\Phi\\!\\left(\\dfrac{${lib(x1(exo))}-${mu}}{${sigma}}\\right)=\\Phi(${z(z1)})=${d4(p1(exo))}`} />{z1 < 0 && <> (car <MathTex tex={`\\Phi(${z(z1)})=1-\\Phi(${z(-z1)})`} />)</>}.
            </li>
            <li>
              <MathTex tex={`P(X>${lib(x2(exo))})=1-\\Phi\\!\\left(\\dfrac{${lib(x2(exo))}-${mu}}{${sigma}}\\right)=1-\\Phi(${z(z2)})=${d4(p2(exo))}`} />.
            </li>
            <li>
              <MathTex tex={`P(${lib(x3(exo))}<X<${lib(x4(exo))})=\\Phi(${zz(z4)})-\\Phi(${zz(z3)})=${d4(phi(z4))}-${d4(phi(z3))}=${d4(p3(exo))}`} />.
            </li>
            <li>
              <strong>Seuil.</strong> <MathTex tex={`P(X<u)=${texDec(q.p)}`} /> équivaut à <MathTex tex={`\\Phi\\!\\left(\\dfrac{u-${mu}}{${sigma}}\\right)=${texDec(q.p)}`} />, donc <MathTex tex={`\\dfrac{u-${mu}}{${sigma}}\\approx ${texDec(q.z)}`} /> et <MathTex tex={`u\\approx ${mu}+${sigma}\\times${texDec(q.z)}=${texDec(arrondi(mu + sigma * q.z, 2))}`} />.
            </li>
          </>
        }
        conseils={
          <>
            <li>Toujours se ramener à la loi centrée réduite : <MathTex tex="z=\frac{x-\mu}{\sigma}" />. Ne jamais lire la table avec <MathTex tex="x" />.</li>
            <li>La table donne <MathTex tex="P(Z<z)" />. Pour une probabilité « supérieure à », passe au complémentaire ; pour un <MathTex tex="z" /> négatif, utilise <MathTex tex="\Phi(-z)=1-\Phi(z)" />.</li>
            <li>Pour un intervalle, soustrais les deux valeurs de <MathTex tex="\Phi" /> (la plus grande moins la plus petite).</li>
          </>
        }
      />
    </Cadre>
  );
}
