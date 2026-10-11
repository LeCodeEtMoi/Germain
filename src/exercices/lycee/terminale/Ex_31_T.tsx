import { useState } from 'react';
import MathTex from '@/components/math/MathTex.tsx';
import { Cadre, Chargement, Enonce, Titre, useTirage } from '@/components/exercice/ExerciceUI.tsx';
import Questions, { apercuExpression, type Question, type ResultatExpression } from '@/components/exercice/Questions.tsx';
import { analyser, combinaison, entier, evaluer, signeAleatoire } from '@/lib/maths.ts';

/**
 * Exercice : tangente à la courbe de f(x) = a·ln(x) + b·x au point d'abscisse 1, puis position de la courbe.
 *
 *   f'(x) = a/x + b          f(1) = b          f'(1) = a + b
 *   T : y = (a + b)(x − 1) + b = (a + b)x − a
 *   f''(x) = −a/x²  →  a > 0 : f concave, la courbe est SOUS ses tangentes ;  a < 0 : f convexe, elle est AU-DESSUS.
 *
 * La tangente saisie est lue par l'analyseur, puis comparée en plusieurs points : toute écriture équivalente est acceptée.
 */

/* ===== Logique ===== */

export type Exercice = { a: number; b: number };

export function genererExercice(): Exercice {
  for (;;) {
    const a = signeAleatoire() * entier(1, 5);
    const b = signeAleatoire() * entier(1, 4);
    if (a + b !== 0) return { a, b };
  }
}

export const pente = ({ a, b }: Exercice) => a + b;
export const ordonnee = ({ a }: Exercice) => -a;
export const positionAttendue = ({ a }: Exercice) => (a > 0 ? 'dessous' : 'dessus');

const proche = (x: number, y: number) => Math.abs(x - y) <= 1e-9 * Math.max(1, Math.abs(x), Math.abs(y));

export function verifierTangente(exo: Exercice, saisie: string): ResultatExpression {
  const lu = analyser(saisie.replace(/^\s*y\s*=/i, ''), { variables: ['x'] });
  if (!lu.ok) return { ok: false, incompris: lu.message };
  const g = (x: number) => evaluer(lu.noeud, { x });
  const g0 = g(0);
  const m = g(1) - g0;
  if (![2, -3, 0.5, 7].every((x) => proche(g(x), g0 + m * x))) {
    return { ok: false, indice: 'Une tangente est une droite : ta réponse doit pouvoir s’écrire mx + p.' };
  }
  const mT = pente(exo);
  const pT = ordonnee(exo);
  if (proche(m, mT) && proche(g0, pT)) return { ok: true };
  if (proche(m, mT)) return { ok: false, indice: 'Le coefficient directeur est bon, mais pas l’ordonnée à l’origine : pense à ajouter f(1) puis à développer.' };
  if (proche(m, exo.a) || proche(m, exo.b)) return { ok: false, indice: 'Le coefficient directeur doit être f′(1) en entier : n’oublie aucun des deux termes de f′.' };
  return { ok: false, indice: 'Le coefficient directeur d’une tangente en 1 est f′(1).' };
}

export function questions(exo: Exercice): Question[] {
  return [
    {
      type: 'expression',
      id: 'tangente',
      libelle: <>Équation réduite de la tangente T à la courbe <MathTex tex="\mathcal{C}_f" /> au point d'abscisse 1 : y =</>,
      placeholder: 'Ex : 3x - 2',
      aide: 'Écris le second membre : 3x - 2, -x/2 + 1…',
      verifier: (s) => verifierTangente(exo, s),
      apercu: (s) => apercuExpression(s, 'y', { retirer: /^\s*y\s*=/i }),
    },
    {
      type: 'choix',
      id: 'position',
      libelle: <>Sur ]0 ; +∞[, la courbe <MathTex tex="\mathcal{C}_f" /> est :</>,
      attendu: positionAttendue(exo),
      options: [
        { valeur: 'dessus', contenu: 'au-dessus de T' },
        { valeur: 'dessous', contenu: 'en dessous de T' },
        { valeur: 'traverse', contenu: 'de part et d’autre de T (elle traverse T)' },
      ],
    },
  ];
}

/* ===== Affichage ===== */

const par = (n: number) => (n < 0 ? `(${n})` : `${n}`);

export default function TangenteLn() {
  const [exo, regenerer] = useTirage(genererExercice);
  const [essai, setEssai] = useState(0);
  if (!exo) return <Chargement />;

  const { a, b } = exo;
  const m = pente(exo);
  const p = ordonnee(exo);
  const fTex = combinaison([[a, '\\ln(x)'], [b, 'x']], true);
  const dTex = `${a < 0 ? '-' : ''}\\frac{${Math.abs(a)}}{x} ${b < 0 ? '-' : '+'} ${Math.abs(b)}`;
  const secondeTex = `${a > 0 ? '-' : ''}\\frac{${Math.abs(a)}}{x^{2}}`;

  return (
    <Cadre>
      <Titre />
      <Enonce>
        <p>
          Soit <MathTex tex="f" /> la fonction définie sur ]0 ; +∞[ par :
        </p>
        <div className="exercice-formule">
          <MathTex tex={`f(x) = ${fTex}`} />
        </div>
        <p>
          On note <MathTex tex="\mathcal{C}_f" /> sa courbe représentative et T sa tangente au point d'abscisse 1.
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
            <MathTex tex={`T : y = ${combinaison([[m, 'x'], [p, '']], true)}`} /> et la courbe est {a > 0 ? 'en dessous' : 'au-dessus'} de T.
          </p>
        }
        correction={
          <>
            <li>
              La tangente en 1 a pour équation <MathTex tex="y = f'(1)(x - 1) + f(1)" />.
            </li>
            <li>
              On dérive (<MathTex tex="\ln'(x) = \frac{1}{x}" />) : <MathTex tex={`f'(x) = ${dTex}`} />.
            </li>
            <li>
              En 1 : <MathTex tex={`f(1) = ${a === 1 ? '' : a === -1 ? '-' : par(a) + ' \\times '}\\ln(1) ${b < 0 ? '-' : '+'} ${Math.abs(b)} = ${b}`} /> car{' '}
              <MathTex tex="\ln(1) = 0" />, et <MathTex tex={`f'(1) = ${par(a)} + ${par(b)} = ${m}`} />.
            </li>
            <li>
              Donc <MathTex tex={`y = ${par(m)}(x - 1) ${b < 0 ? '-' : '+'} ${Math.abs(b)}`} />, soit{' '}
              <MathTex tex={`y = ${combinaison([[m, 'x'], [p, '']], true)}`} />.
            </li>
            <li>
              Pour la position, on étudie le signe de <MathTex tex={`f''(x) = ${secondeTex}`} /> sur ]0 ; +∞[ : il est{' '}
              {a > 0 ? 'strictement négatif, f est concave' : 'strictement positif, f est convexe'}.
            </li>
            <li>
              Une fonction {a > 0 ? 'concave' : 'convexe'} a sa courbe {a > 0 ? 'en dessous' : 'au-dessus'} de ses tangentes : ici{' '}
              <strong>{a > 0 ? 'en dessous de T' : 'au-dessus de T'}</strong> (et elle ne la traverse nulle part).
            </li>
          </>
        }
        conseils={
          <>
            <li>
              Retiens la formule <MathTex tex="y = f'(a)(x - a) + f(a)" /> et calcule séparément <MathTex tex="f(1)" /> et <MathTex tex="f'(1)" />.
            </li>
            <li>
              <MathTex tex="\ln(1) = 0" /> : le terme en ln disparaît dans f(1), mais pas dans f′(1) (il devient <MathTex tex="\frac{a}{1}" />).
            </li>
            <li>Ne confonds pas f(1) et f′(1) : l’un est l’ordonnée du point, l’autre la pente.</li>
            <li>
              Concave (<MathTex tex="f'' < 0" />) : courbe sous ses tangentes. Convexe (<MathTex tex="f'' > 0" />) : courbe au-dessus.
            </li>
          </>
        }
      />
    </Cadre>
  );
}
