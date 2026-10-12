import { useState } from 'react';
import { Cadre, Chargement, Enonce, MathTex, Questions, Titre, choisir, entier, nombre, texSomme, useTirage, type Question } from './_commun.ts';

/**
 * Exercice : N(x, y) = √Q(x, y) avec Q(x,y) = a x² + 2b xy + c y² est-elle une norme ?
 *
 *   ac − b² > 0 (a > 0)  →  Q définie positive : N est la norme euclidienne associée au produit scalaire
 *                           ⟨u,v⟩ = a x x' + b (x y' + x' y) + c y y'.
 *   ac − b² = 0          →  Q = (1/a)(ax + by)² : N s'annule sur le vecteur non nul (b, −a) : pas une norme.
 */

/* ===== Logique ===== */

export type Exercice = { a: number; b: number; c: number; u: [number, number]; v: [number, number] };

export const discriminant = ({ a, b, c }: Exercice) => a * c - b * b;
export const estNorme = (e: Exercice) => discriminant(e) > 0;

export const forme = ({ a, b, c }: Exercice, [x, y]: [number, number]) => a * x * x + 2 * b * x * y + c * y * y;

/** Forme bilinéaire associée (polarisation) */
export const bilineaire = ({ a, b, c }: Exercice, [x, y]: [number, number], [xp, yp]: [number, number]) =>
  a * x * xp + b * (x * yp + xp * y) + c * y * yp;

function vecteurAleatoire(): [number, number] {
  for (;;) {
    const x = entier(-3, 3);
    const y = entier(-3, 3);
    if (x !== 0 || y !== 0) return [x, y];
  }
}

export function genererExercice(): Exercice {
  let a: number, b: number, c: number;
  if (choisir([true, false])) {
    // Cas défini positif
    for (;;) {
      a = entier(1, 5);
      c = entier(1, 5);
      b = entier(-3, 3);
      if (a * c - b * b > 0) break;
    }
  } else {
    // Cas dégénéré : Q = m (x + k y)²
    const m = entier(1, 3);
    const k = choisir([-2, -1, 1, 2]);
    a = m;
    b = m * k;
    c = m * k * k;
  }
  return { a, b, c, u: vecteurAleatoire(), v: vecteurAleatoire() };
}

const texQ = ({ a, b, c }: Exercice) => texSomme([[a, 'x^2'], [2 * b, 'xy'], [c, 'y^2']]);
const texVec = ([x, y]: [number, number]) => `(${nombre(x)}\\,;\\,${nombre(y)})`;

export const questions = (exo: Exercice): Question[] => [
  {
    type: 'choix', id: 'norme', libelle: <>La fonction <MathTex tex="N" /> est-elle une norme sur <MathTex tex="\mathbb R^2" /> ?</>,
    attendu: estNorme(exo) ? 'oui' : 'non-def',
    options: [
      { valeur: 'oui', contenu: 'Oui : c’est la norme associée à un produit scalaire.' },
      { valeur: 'non-def', contenu: <>Non : <MathTex tex="N" /> s’annule en un vecteur non nul (la séparation est fausse).</> },
      { valeur: 'non-tri', contenu: 'Non : l’inégalité triangulaire n’est pas vérifiée.' },
      { valeur: 'non-hom', contenu: <>Non : <MathTex tex="N(\lambda u)\neq\lvert\lambda\rvert N(u)" /> en général.</> },
    ],
  },
  {
    type: 'nombre', id: 'Q', libelle: <>Calcule <MathTex tex={`Q${texVec(exo.u)}`} />.</>, attendu: forme(exo, exo.u), placeholder: 'Ex : 12', aide: 'Un entier.',
  },
  {
    type: 'nombre', id: 'B',
    libelle: <>On note <MathTex tex="B" /> la forme bilinéaire symétrique telle que <MathTex tex="B(w,w)=Q(w)" />. Calcule <MathTex tex={`B\\big(${texVec(exo.u)},${texVec(exo.v)}\\big)`} />.</>,
    attendu: bilineaire(exo, exo.u, exo.v), placeholder: 'Ex : -3', aide: 'Un entier (utilise la polarisation ou la formule de B).',
  },
];

/* ===== Affichage ===== */

export default function FormeQuadratique() {
  const [exo, regenerer] = useTirage(genererExercice);
  const [essai, setEssai] = useState(0);
  if (!exo) return <Chargement />;

  const { a, b, c, u, v } = exo;
  const d = discriminant(exo);
  const norme = estNorme(exo);
  const m = a;
  const k = b / a;
  const [uPlusVx, uPlusVy] = [u[0] + v[0], u[1] + v[1]];
  const [uMoinsVx, uMoinsVy] = [u[0] - v[0], u[1] - v[1]];

  return (
    <Cadre>
      <Titre />
      <Enonce>
        <p>
          Pour <MathTex tex="(x,y)\in\mathbb R^2" />, on pose <MathTex tex={`Q(x,y)=${texQ(exo)}`} /> et <MathTex tex="N(x,y)=\sqrt{Q(x,y)}" />.
        </p>
        <p>
          On admet que <MathTex tex="Q(x,y)\ge 0" /> pour tout <MathTex tex="(x,y)" />, de sorte que <MathTex tex="N" /> est bien définie.
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
            {norme ? (
              <>
                <MathTex tex="N" /> est la norme euclidienne associée à <MathTex tex="B" />, <MathTex tex={`Q${texVec(u)}=${forme(exo, u)}`} /> et{' '}
                <MathTex tex={`B=${bilineaire(exo, u, v)}`} />.
              </>
            ) : (
              <>
                <MathTex tex="N" /> n’est pas une norme (elle s’annule en <MathTex tex={`(${nombre(k)}\\,;\\,-1)`} />), <MathTex tex={`Q${texVec(u)}=${forme(exo, u)}`} /> et{' '}
                <MathTex tex={`B=${bilineaire(exo, u, v)}`} />.
              </>
            )}
          </p>
        }
        correction={
          <>
            <li>
              <MathTex tex="Q" /> s’écrit <MathTex tex={`Q(x,y)=${a}x^2+${2 * b < 0 ? `(${nombre(2 * b)})` : 2 * b}xy+${c}y^2`} />, de matrice symétrique{' '}
              <MathTex tex={`\\begin{pmatrix}${a}&${nombre(b)}\\\\${nombre(b)}&${c}\\end{pmatrix}`} />. Son déterminant vaut <MathTex tex={`ac-b^2=${a}\\times${c}-${b < 0 ? `(${nombre(b)})` : b}^2=${d}`} />.
            </li>
            {norme ? (
              <li>
                Comme <MathTex tex="a>0" /> et <MathTex tex="ac-b^2>0" />, la forme <MathTex tex="Q" /> est <strong>définie positive</strong> : <MathTex tex="Q(x,y)=0" /> n’a lieu qu’en <MathTex tex="(0,0)" />. C’est donc la forme quadratique d’un produit scalaire, et{' '}
                <MathTex tex="N=\sqrt{Q}" /> est la norme euclidienne associée (l’inégalité triangulaire vient de Cauchy-Schwarz).
              </li>
            ) : (
              <li>
                Ici <MathTex tex="ac-b^2=0" /> : <MathTex tex={`Q(x,y)=${m}\\,(x${k < 0 ? '-' : '+'}${Math.abs(k) === 1 ? '' : Math.abs(k)}y)^2`} />. En <MathTex tex={`(x,y)=(${nombre(k)}\\,;\\,-1)`} />, qui n’est pas nul, on trouve <MathTex tex="Q=0" /> donc <MathTex tex="N=0" /> : l’axiome de <strong>séparation</strong> est faux, ce n’est pas une norme (seulement une semi-norme).
              </li>
            )}
            <li>
              <MathTex tex={`Q${texVec(u)}=${a}\\times${u[0] < 0 ? `(${nombre(u[0])})` : u[0]}^2+${nombre(2 * b)}\\times${u[0] < 0 ? `(${nombre(u[0])})` : u[0]}\\times${u[1] < 0 ? `(${nombre(u[1])})` : u[1]}+${c}\\times${u[1] < 0 ? `(${nombre(u[1])})` : u[1]}^2=${forme(exo, u)}`} />.
            </li>
            <li>
              Polarisation : <MathTex tex="B(u,v)=\tfrac14\big(Q(u+v)-Q(u-v)\big)" />. Ici <MathTex tex={`u+v=${texVec([uPlusVx, uPlusVy])}`} /> et <MathTex tex={`u-v=${texVec([uMoinsVx, uMoinsVy])}`} />, donc{' '}
              <MathTex tex={`B(u,v)=\\tfrac14\\big(${forme(exo, [uPlusVx, uPlusVy])}-${forme(exo, [uMoinsVx, uMoinsVy]) < 0 ? `(${nombre(forme(exo, [uMoinsVx, uMoinsVy]))})` : forme(exo, [uMoinsVx, uMoinsVy])}\\big)=${bilineaire(exo, u, v)}`} />. On retrouve la formule{' '}
              <MathTex tex="B(u,v)=a\,xx'+b\,(xy'+x'y)+c\,yy'" />.
            </li>
          </>
        }
        conseils={
          <>
            <li>Pour <MathTex tex="Q=ax^2+2bxy+cy^2" /> avec <MathTex tex="a>0" /> : définie positive <MathTex tex="\Longleftrightarrow ac-b^2>0" />. Si <MathTex tex="ac-b^2=0" />, cherche le vecteur non nul qui annule <MathTex tex="Q" />.</li>
            <li>Attention au facteur 2 : le coefficient de <MathTex tex="xy" /> est <MathTex tex="2b" />, pas <MathTex tex="b" />.</li>
            <li>Si une racine carrée de forme quadratique positive vérifie l’homogénéité et le triangle, seul l’axiome de séparation peut échouer.</li>
          </>
        }
      />
    </Cadre>
  );
}
