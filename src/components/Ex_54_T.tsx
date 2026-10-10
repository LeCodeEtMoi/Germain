import { useState } from 'react';
import MathTex from './MathTex.tsx';
import { Cadre, Chargement, Enonce, Titre, useTirage } from './ExerciceUI.tsx';
import Questions, { type Question } from './Questions.tsx';
import { choisir, entier, nombre } from '../lib/maths.ts';

/**
 * Exercice : lire la convexité d'une fonction sur sa courbe.
 *
 *   f(x) = s·( u³/6 + t·u ) + q   avec u = x − x0,  s = ±1,  t ∈ {−2, 0, 1},  x0 entier dans [−2 ; 2]
 *
 *   f''(x) = s·u  : du signe de s·(x − x0).
 *   s = +1 : concave sur [−4 ; x0], convexe sur [x0 ; 4].   s = −1 : l'inverse.
 *   Le point d'inflexion est (x0 ; q), d'abscisse entière.
 */

/* ===== Logique ===== */

export type Exercice = { s: 1 | -1; t: -2 | 0 | 1; x0: number; q: number };

export function genererExercice(): Exercice {
  return { s: choisir<1 | -1>([1, -1]), t: choisir<-2 | 0 | 1>([-2, 0, 1]), x0: entier(-2, 2), q: entier(-3, 3) };
}

export const f = ({ s, t, x0, q }: Exercice, x: number) => {
  const u = x - x0;
  return s * (u ** 3 / 6 + t * u) + q;
};

/** Côté où f est convexe : 'droite' = [x0 ; 4], 'gauche' = [−4 ; x0]. */
export const coteConvexe = ({ s }: Exercice): 'droite' | 'gauche' => (s === 1 ? 'droite' : 'gauche');

const X_MIN = -4;
const X_MAX = 4;

export const questions = (exo: Exercice): Question[] => {
  const { x0 } = exo;
  const gauche = `[${nombre(X_MIN)}\\,;\\,${nombre(x0)}]`;
  const droite = `[${nombre(x0)}\\,;\\,${X_MAX}]`;
  return [
    {
      type: 'choix', id: 'convexe', libelle: <>La fonction f est convexe sur :</>, attendu: coteConvexe(exo),
      options: [
        { valeur: 'gauche', contenu: <MathTex tex={gauche} /> },
        { valeur: 'droite', contenu: <MathTex tex={droite} /> },
        { valeur: 'tout', contenu: <MathTex tex={`[${nombre(X_MIN)}\\,;\\,${X_MAX}]`} /> },
      ],
    },
    {
      type: 'nombre', id: 'inflexion', libelle: <>Abscisse du point d’inflexion (nombre entier) :</>, attendu: x0, placeholder: 'Ex : -1',
      aide: 'Un nombre entier, négatif si besoin.',
    },
    {
      type: 'choix', id: 'signe', libelle: <>Sur <MathTex tex={droite} />, la dérivée seconde <MathTex tex="f''" /> est :</>, attendu: coteConvexe(exo) === 'droite' ? 'positive' : 'negative', enLigne: true,
      options: [
        { valeur: 'positive', contenu: 'positive' },
        { valeur: 'negative', contenu: 'négative' },
        { valeur: 'nulle', contenu: 'nulle' },
      ],
    },
  ];
};

/* ===== Graphique ===== */

const L = 520;
const H = 320;
const MARGE = { g: 44, d: 14, h: 14, b: 30 };

function Courbe({ exo }: { exo: Exercice }) {
  const pas = 0.05;
  const xs: number[] = [];
  for (let x = X_MIN; x <= X_MAX + 1e-9; x += pas) xs.push(Math.round(x * 100) / 100);
  const ys = xs.map((x) => f(exo, x));
  const lo = Math.min(...ys);
  const hi = Math.max(...ys);
  const marge = (hi - lo) * 0.08;
  const yMin = lo - marge;
  const yMax = hi + marge;
  const X = (x: number) => MARGE.g + ((x - X_MIN) / (X_MAX - X_MIN)) * (L - MARGE.g - MARGE.d);
  const Y = (y: number) => H - MARGE.b - ((y - yMin) / (yMax - yMin)) * (H - MARGE.b - MARGE.h);
  const graduations = [1, 2, 5, 10].find((p) => (yMax - yMin) / p <= 8) ?? 10;
  const ys0 = Math.ceil(yMin / graduations);
  const ys1 = Math.floor(yMax / graduations);
  const lignesY: number[] = [];
  for (let k = ys0; k <= ys1; k++) lignesY.push(k * graduations);
  const points = xs.map((x, i) => `${X(x).toFixed(1)},${Y(ys[i]).toFixed(1)}`).join(' ');
  const zeroX = X(0);
  const zeroY = yMin < 0 && yMax > 0 ? Y(0) : null;

  return (
    <figure className="exercice-graphique">
      <svg viewBox={`0 0 ${L} ${H}`} role="img" aria-label="Courbe représentative de la fonction f sur l’intervalle de −4 à 4" style={{ width: '100%', height: 'auto', maxWidth: '36rem' }}>
        <rect x={MARGE.g} y={MARGE.h} width={L - MARGE.g - MARGE.d} height={H - MARGE.h - MARGE.b} fill="none" stroke="currentColor" strokeOpacity="0.35" />
        {Array.from({ length: X_MAX - X_MIN + 1 }, (_, i) => X_MIN + i).map((x) => (
          <g key={`x${x}`}>
            <line x1={X(x)} x2={X(x)} y1={MARGE.h} y2={H - MARGE.b} stroke="currentColor" strokeOpacity="0.12" />
            <text x={X(x)} y={H - MARGE.b + 16} textAnchor="middle" fontSize="12" fill="currentColor">{nombre(x)}</text>
          </g>
        ))}
        {lignesY.map((y) => (
          <g key={`y${y}`}>
            <line x1={MARGE.g} x2={L - MARGE.d} y1={Y(y)} y2={Y(y)} stroke="currentColor" strokeOpacity="0.12" />
            <text x={MARGE.g - 6} y={Y(y) + 4} textAnchor="end" fontSize="12" fill="currentColor">{nombre(y)}</text>
          </g>
        ))}
        <line x1={zeroX} x2={zeroX} y1={MARGE.h} y2={H - MARGE.b} stroke="currentColor" strokeOpacity="0.55" />
        {zeroY !== null && <line x1={MARGE.g} x2={L - MARGE.d} y1={zeroY} y2={zeroY} stroke="currentColor" strokeOpacity="0.55" />}
        <polyline points={points} fill="none" stroke="#6528d9" strokeWidth="2.5" strokeLinejoin="round" />
      </svg>
      <figcaption className="help">Courbe représentative de f sur [−4 ; 4].</figcaption>
    </figure>
  );
}

/* ===== Affichage ===== */

export default function ConvexiteGraphique() {
  const [exo, regenerer] = useTirage(genererExercice);
  const [essai, setEssai] = useState(0);
  if (!exo) return <Chargement />;

  const { x0, q } = exo;
  const convexeDroite = coteConvexe(exo) === 'droite';
  const gauche = `[${nombre(X_MIN)}\\,;\\,${nombre(x0)}]`;
  const droite = `[${nombre(x0)}\\,;\\,${X_MAX}]`;
  const [cvx, ccv] = convexeDroite ? [droite, gauche] : [gauche, droite];

  return (
    <Cadre>
      <Titre />
      <Enonce>
        <p>
          On donne ci-dessous la courbe représentative d’une fonction <MathTex tex="f" /> définie sur <MathTex tex="[-4\,;\,4]" />. Elle change une seule fois de convexité, en un point dont l’abscisse est un nombre entier.
        </p>
        <Courbe exo={exo} />
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
            La courbe change de convexité en <MathTex tex={`x = ${nombre(x0)}`} /> : f est convexe sur <MathTex tex={cvx} /> et concave sur <MathTex tex={ccv} />.
          </p>
        }
        correction={
          <>
            <li>
              Une fonction est <strong>convexe</strong> là où sa courbe est au-dessus de ses tangentes (elle a la forme d’une « coupe » ouverte vers le haut) et <strong>concave</strong> là où elle est en dessous (forme de « dôme »).
            </li>
            <li>
              Sur le graphique, la courbe passe de la forme {convexeDroite ? '« dôme »' : '« coupe »'} à la forme {convexeDroite ? '« coupe »' : '« dôme »'} au point de coordonnées{' '}
              <MathTex tex={`(${nombre(x0)}\\,;\\,${nombre(q)})`} /> : c’est le <strong>point d’inflexion</strong>, d’abscisse <MathTex tex={`x = ${nombre(x0)}`} />. En ce point, la courbe traverse sa tangente.
            </li>
            <li>
              Donc f est convexe sur <MathTex tex={cvx} /> et concave sur <MathTex tex={ccv} />.
            </li>
            <li>
              Le signe de la dérivée seconde donne la convexité : <MathTex tex="f'' \ge 0" /> où f est convexe, <MathTex tex="f'' \le 0" /> où f est concave. Sur <MathTex tex={droite} />, f est {convexeDroite ? 'convexe' : 'concave'}, donc <MathTex tex="f''" /> est {convexeDroite ? 'positive' : 'négative'}.
            </li>
          </>
        }
        conseils={
          <>
            <li>Ne confonds pas convexité et croissance : une fonction peut être décroissante et convexe.</li>
            <li>Repère le point où la courbe « change de courbure » : la dérivée seconde y change de signe.</li>
            <li>Convexe ⇔ <MathTex tex="f'' \ge 0" /> ; concave ⇔ <MathTex tex="f'' \le 0" />.</li>
          </>
        }
      />
    </Cadre>
  );
}
