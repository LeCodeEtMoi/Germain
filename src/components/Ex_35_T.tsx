import { useState } from 'react';
import MathTex from './MathTex.tsx';
import { Cadre, Chargement, Enonce, Titre, useTirage } from './ExerciceUI.tsx';
import Questions, { apercuExpression, type Question } from './Questions.tsx';
import { analyser, deriver, entier, evaluer } from '../lib/maths.ts';
import type { ResultatExpression } from '../lib/reponses.ts';

/**
 * Exercice : médicament injecté en continu. Q′(t) = A − k·Q(t) avec Q(0) = 0.
 *
 *   A = k·L   (L entier, pour des nombres lisibles)
 *   Q(t) = L(1 − e^(−kt))        limite en +∞ : L        Q(t) = L/2  ⇔  t = ln(2)/k
 *
 * Q(t) est vérifiée par substitution (Q′ = A − kQ en plusieurs t, et Q(0) = 0), pas par comparaison à une formule.
 */

/* ===== Logique ===== */

export type Exercice = { k: number; L: number; A: number };

export function genererExercice(): Exercice {
  const k = entier(1, 4);
  const L = entier(2, 9);
  return { k, L, A: k * L };
}

const POINTS = [0.2, 0.5, 1, 1.7, 2.5];

export function verifierQ({ k, A }: Exercice, saisie: string): ResultatExpression {
  const lu = analyser(saisie.replace(/^\s*Q\s*(\(t\))?\s*=/i, ''), { variables: ['t'] });
  if (!lu.ok) return { ok: false, incompris: lu.message };
  const dQ = deriver(lu.noeud, 't');
  const equation = POINTS.every((t) => {
    const q = evaluer(lu.noeud, { t });
    const d = evaluer(dQ, { t });
    return Number.isFinite(q) && Number.isFinite(d) && Math.abs(d - (A - k * q)) <= 1e-7 * Math.max(1, Math.abs(q), Math.abs(d));
  });
  if (!equation) return { ok: false, indice: `En remplaçant Q et Q′ par ta fonction et sa dérivée, l’égalité Q′(t) = ${A} − ${k}Q(t) n’est pas vérifiée.` };
  if (Math.abs(evaluer(lu.noeud, { t: 0 })) > 1e-9) {
    return { ok: false, indice: 'Ta fonction vérifie l’équation, mais pas la condition Q(0) = 0 : la constante doit être choisie pour que Q(0) = 0.' };
  }
  return { ok: true };
}

export const questions = (exo: Exercice): Question[] => [
  {
    type: 'expression',
    id: 'Q',
    libelle: 'Donne l’expression de Q(t) :',
    placeholder: 'Ex : 5(1 - e^(-2t))',
    aide: 'Écris Q(t) au clavier, sans constante inconnue : 5*(1 - e^(-2t)). La variable est t.',
    verifier: (s) => verifierQ(exo, s),
    apercu: (s) => apercuExpression(s, 'Q(t)', { variables: ['t'], retirer: /^\s*Q\s*(\(t\))?\s*=/i }),
  },
  {
    type: 'nombre',
    id: 'limite',
    libelle: <>Limite de <MathTex tex="Q(t)" /> quand t tend vers +∞ (en mg) :</>,
    attendu: exo.L,
    placeholder: 'Ex : 4',
  },
  {
    type: 'nombre',
    id: 'moitie',
    libelle: 'Au bout de combien d’heures la quantité atteint-elle la moitié de cette limite ?',
    attendu: Math.LN2 / exo.k,
    tolerance: 0.0051,
    placeholder: 'Ex : ln(2)/3 ou 0,23',
    aide: 'Valeur exacte (comme ln(2)/3) ou valeur arrondie au centième.',
  },
];

/* ===== Affichage ===== */

export default function Medicament() {
  const [exo, regenerer] = useTirage(genererExercice);
  const [essai, setEssai] = useState(0);
  if (!exo) return <Chargement />;

  const { k, L, A } = exo;
  const kt = k === 1 ? 't' : `${k}t`;
  const kk = k === 1 ? '' : String(k);

  return (
    <Cadre>
      <Titre />
      <Enonce>
        <p>
          Un médicament est injecté en continu. La quantité <MathTex tex="Q(t)" /> (en mg) présente dans le sang au bout de t heures vérifie :
        </p>
        <div className="exercice-formule">
          <MathTex tex={`Q'(t) = ${A} - ${kk}Q(t) \\qquad \\text{et} \\qquad Q(0) = 0`} />
        </div>
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
            <MathTex tex={`Q(t) = ${L}\\left(1 - e^{-${kt}}\\right)`} />, la quantité se stabilise à {L} mg.
          </p>
        }
        correction={
          <>
            <li>
              L’équation s’écrit <MathTex tex={`Q' = -${k}Q + ${A}`} /> : sans second membre, les solutions sont <MathTex tex={`Ce^{-${kt}}`} />.
            </li>
            <li>
              Solution constante <MathTex tex="Q = q" /> : alors <MathTex tex="Q' = 0" />, donc <MathTex tex={`0 = ${A} - ${k}q`} />, d’où <MathTex tex={`q = \\frac{${A}}{${k}} = ${L}`} />.
            </li>
            <li>
              Solutions générales : <MathTex tex={`Q(t) = Ce^{-${kt}} + ${L}`} />.
            </li>
            <li>
              <MathTex tex="Q(0) = 0" /> donne <MathTex tex={`C + ${L} = 0`} />, donc <MathTex tex={`C = -${L}`} /> et <MathTex tex={`Q(t) = ${L}\\left(1 - e^{-${kt}}\\right)`} />.
            </li>
            <li>
              Limite : <MathTex tex={`e^{-${kt}} \\to 0`} /> quand <MathTex tex="t \to +\infty" />, donc <MathTex tex={`Q(t) \\to ${L}`} /> mg (c’est <MathTex tex={`\\frac{A}{k} = \\frac{${A}}{${k}}`} />).
            </li>
            <li>
              <MathTex tex={`Q(t) = \\frac{${L}}{2}`} /> équivaut à <MathTex tex={`e^{-${kt}} = \\frac{1}{2}`} />, soit <MathTex tex={`${kt} = \\ln(2)`} />, donc{' '}
              <MathTex tex={`t = \\frac{\\ln(2)}{${k}} \\approx ${(Math.LN2 / k).toFixed(2).replace('.', '{,}')}`} /> heure.
            </li>
          </>
        }
        conseils={
          <>
            <li>
              Pour <MathTex tex="y' = ay + b" />, la solution constante est <MathTex tex="-\frac{b}{a}" /> : ici a = −{k}, donc elle vaut +{A}/{k}.
            </li>
            <li>La condition initiale sert à trouver C en dernier, une fois la solution générale écrite.</li>
            <li>
              Pour passer de <MathTex tex="e^{-kt} = \frac{1}{2}" /> à t, prends le logarithme : <MathTex tex="-kt = \ln(\tfrac12) = -\ln 2" />.
            </li>
          </>
        }
      />
    </Cadre>
  );
}
