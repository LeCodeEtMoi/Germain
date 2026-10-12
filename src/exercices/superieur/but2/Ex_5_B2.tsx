import { useState, type ReactNode } from 'react';
import { Cadre, Chargement, Enonce, MathTex, Questions, Titre, choisir, entier, melanger, permuter, useTirage, type Question } from './_commun.ts';

/**
 * Exercice : intégration par parties.
 *
 *   A : ∫₀¹ x e^(kx) dx          = ((k − 1) e^k + 1) / k²          (k ∈ {−2, −1, 2, 3})
 *   B : ∫₁^e xⁿ ln x dx          = (n e^(n+1) + 1) / (n + 1)²       (n ∈ {1, 2, 3})
 *   C : ∫₀^b x sin x dx          = [−x cos x + sin x]               (b = π ou π/2)
 *   D : ∫₀^b x cos x dx          = [x sin x + cos x]
 *   G : ∫₀¹ (x + a) e^x dx       = a e − a + 1
 */

/* ===== Logique ===== */

export type Exercice =
  | { famille: 'A'; k: number; ordre: number[] }
  | { famille: 'B'; n: number; ordre: number[] }
  | { famille: 'C' | 'D'; demi: boolean; ordre: number[] }
  | { famille: 'G'; a: number; ordre: number[] };

export function genererExercice(): Exercice {
  const famille = choisir(['A', 'B', 'C', 'D', 'G'] as const);
  const ordre = melanger([0, 1, 2]);
  switch (famille) {
    case 'A': return { famille, k: choisir([-2, -1, 2, 3]), ordre };
    case 'B': return { famille, n: entier(1, 3), ordre };
    case 'C':
    case 'D': return { famille, demi: choisir([true, false]), ordre };
    case 'G': return { famille, a: entier(1, 4), ordre };
  }
}

/** Valeur exacte (en flottant). */
export function valeur(e: Exercice): number {
  switch (e.famille) {
    case 'A': return ((e.k - 1) * Math.exp(e.k) + 1) / (e.k * e.k);
    case 'B': return (e.n * Math.exp(e.n + 1) + 1) / (e.n + 1) ** 2;
    case 'C': return e.demi ? 1 : Math.PI;
    case 'D': return e.demi ? Math.PI / 2 - 1 : -2;
    case 'G': return e.a * Math.E - e.a + 1;
  }
}

/** Intégrande et bornes (pour vérifier numériquement la valeur dans les tests). */
export function integrale(e: Exercice): { f: (x: number) => number; lo: number; hi: number } {
  switch (e.famille) {
    case 'A': return { f: (x) => x * Math.exp(e.k * x), lo: 0, hi: 1 };
    case 'B': return { f: (x) => x ** e.n * Math.log(x), lo: 1, hi: Math.E };
    case 'C': return { f: (x) => x * Math.sin(x), lo: 0, hi: e.demi ? Math.PI / 2 : Math.PI };
    case 'D': return { f: (x) => x * Math.cos(x), lo: 0, hi: e.demi ? Math.PI / 2 : Math.PI };
    case 'G': return { f: (x) => (x + e.a) * Math.exp(x), lo: 0, hi: 1 };
  }
}

/* ===== TeX ===== */

const coefE = (c: number, ex: string) => `${c === 1 ? '' : c === -1 ? '-' : c}e^{${ex}}`;
const kx = (k: number) => (k === -1 ? '-x' : `${k}x`);
const borne = (e: Exercice) => (e.famille === 'C' || e.famille === 'D') && e.demi ? '\\frac{\\pi}{2}' : '\\pi';

type Choix = { u: string; v: string };

function description(e: Exercice): { f: string; bornes: [string, string]; bon: Choix; echange: Choix; exact: string; etapes: ReactNode } {
  switch (e.famille) {
    case 'A': return {
      f: `x\\,e^{${kx(e.k)}}`, bornes: ['0', '1'],
      bon: { u: 'x', v: `e^{${kx(e.k)}}` }, echange: { u: `e^{${kx(e.k)}}`, v: 'x' },
      exact: `\\dfrac{${coefE(e.k - 1, String(e.k))}+1}{${e.k * e.k}}`,
      etapes: (
        <>
          <li>
            On pose <MathTex tex="u(x)=x" /> et <MathTex tex={`v'(x)=e^{${kx(e.k)}}`} />, donc <MathTex tex="u'(x)=1" /> et <MathTex tex={`v(x)=\\dfrac{1}{${e.k}}e^{${kx(e.k)}}`} />.
          </li>
          <li>
            <MathTex tex={`I=\\Big[\\dfrac{x}{${e.k}}e^{${kx(e.k)}}\\Big]_0^1-\\dfrac1{${e.k}}\\int_0^1e^{${kx(e.k)}}\\,\\mathrm dx=\\dfrac{e^{${e.k}}}{${e.k}}-\\dfrac{e^{${e.k}}-1}{${e.k * e.k}}`} />.
          </li>
        </>
      ),
    };
    case 'B': return {
      f: `x^{${e.n}}\\ln x`, bornes: ['1', 'e'],
      bon: { u: '\\ln x', v: `x^{${e.n}}` }, echange: { u: `x^{${e.n}}`, v: '\\ln x' },
      exact: `\\dfrac{${coefE(e.n, String(e.n + 1))}+1}{${(e.n + 1) ** 2}}`,
      etapes: (
        <>
          <li>
            On dérive le logarithme (qu’on ne sait pas primitiver directement) : <MathTex tex="u(x)=\ln x" />, <MathTex tex={`v'(x)=x^{${e.n}}`} />, donc <MathTex tex="u'(x)=\frac1x" /> et <MathTex tex={`v(x)=\\dfrac{x^{${e.n + 1}}}{${e.n + 1}}`} />.
          </li>
          <li>
            <MathTex tex={`I=\\Big[\\dfrac{x^{${e.n + 1}}}{${e.n + 1}}\\ln x\\Big]_1^e-\\dfrac1{${e.n + 1}}\\int_1^e x^{${e.n}}\\,\\mathrm dx=\\dfrac{e^{${e.n + 1}}}{${e.n + 1}}-\\dfrac{e^{${e.n + 1}}-1}{${(e.n + 1) ** 2}}`} />.
          </li>
        </>
      ),
    };
    case 'C': return {
      f: 'x\\sin x', bornes: ['0', borne(e)],
      bon: { u: 'x', v: '\\sin x' }, echange: { u: '\\sin x', v: 'x' },
      exact: e.demi ? '1' : '\\pi',
      etapes: (
        <>
          <li>
            <MathTex tex="u(x)=x" />, <MathTex tex="v'(x)=\sin x" />, donc <MathTex tex="u'(x)=1" /> et <MathTex tex="v(x)=-\cos x" />.
          </li>
          <li>
            <MathTex tex={`I=\\big[-x\\cos x\\big]_0^{${borne(e)}}+\\int_0^{${borne(e)}}\\cos x\\,\\mathrm dx=\\big[-x\\cos x+\\sin x\\big]_0^{${borne(e)}}=${e.demi ? '0+1' : '\\pi+0'}`} />.
          </li>
        </>
      ),
    };
    case 'D': return {
      f: 'x\\cos x', bornes: ['0', borne(e)],
      bon: { u: 'x', v: '\\cos x' }, echange: { u: '\\cos x', v: 'x' },
      exact: e.demi ? '\\dfrac\\pi2-1' : '-2',
      etapes: (
        <>
          <li>
            <MathTex tex="u(x)=x" />, <MathTex tex="v'(x)=\cos x" />, donc <MathTex tex="u'(x)=1" /> et <MathTex tex="v(x)=\sin x" />.
          </li>
          <li>
            <MathTex tex={`I=\\big[x\\sin x\\big]_0^{${borne(e)}}-\\int_0^{${borne(e)}}\\sin x\\,\\mathrm dx=\\big[x\\sin x+\\cos x\\big]_0^{${borne(e)}}=${e.demi ? '\\dfrac\\pi2+0-(0+1)' : '(0-1)-(0+1)'}`} />.
          </li>
        </>
      ),
    };
    case 'G': return {
      f: `(x+${e.a})\\,e^{x}`, bornes: ['0', '1'],
      bon: { u: `x+${e.a}`, v: 'e^{x}' }, echange: { u: 'e^{x}', v: `x+${e.a}` },
      exact: `${e.a === 1 ? '' : e.a}e${e.a > 1 ? `-${e.a - 1}` : ''}`,
      etapes: (
        <>
          <li>
            <MathTex tex={`u(x)=x+${e.a}`} />, <MathTex tex="v'(x)=e^{x}" />, donc <MathTex tex="u'(x)=1" /> et <MathTex tex="v(x)=e^{x}" />.
          </li>
          <li>
            <MathTex tex={`I=\\big[(x+${e.a})e^{x}\\big]_0^1-\\int_0^1e^{x}\\,\\mathrm dx=${e.a + 1}e-${e.a}-(e-1)`} />.
          </li>
        </>
      ),
    };
  }
}

export const questions = (exo: Exercice): Question[] => {
  const d = description(exo);
  return [
    {
      type: 'choix', id: 'choix', libelle: <>Quel choix de <MathTex tex="u" /> et <MathTex tex="v'" /> simplifie le calcul ?</>, attendu: 'bon',
      options: permuter(
        [
          { valeur: 'bon', contenu: <><MathTex tex={`u=${d.bon.u}`} /> et <MathTex tex={`v'=${d.bon.v}`} /></> },
          { valeur: 'echange', contenu: <><MathTex tex={`u=${d.echange.u}`} /> et <MathTex tex={`v'=${d.echange.v}`} /></> },
          { valeur: 'tout', contenu: <><MathTex tex={`u=${d.f}`} /> et <MathTex tex="v'=1" /></> },
        ],
        exo.ordre,
      ),
    },
    {
      type: 'nombre', id: 'val', libelle: <>Calcule <MathTex tex="I" /> (valeur décimale arrondie au centième).</>, attendu: valeur(exo), tolerance: 0.0051,
      placeholder: 'Ex : 1,72', aide: 'Donne une valeur approchée à 0,01 près (avec une virgule ou un point).',
    },
  ];
};

/* ===== Affichage ===== */

export default function IntegrationParties() {
  const [exo, regenerer] = useTirage(genererExercice);
  const [essai, setEssai] = useState(0);
  if (!exo) return <Chargement />;

  const d = description(exo);
  const v = valeur(exo);

  return (
    <Cadre>
      <Titre />
      <Enonce>
        <p>On considère l’intégrale :</p>
        <div className="exercice-formule">
          <MathTex tex={`I=\\int_{${d.bornes[0]}}^{${d.bornes[1]}} ${d.f}\\,\\mathrm dx`} />
        </div>
        <p>
          On rappelle la formule d’intégration par parties : <MathTex tex="\int_a^b u\,v'=\big[uv\big]_a^b-\int_a^b u'\,v" />.
        </p>
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
            <MathTex tex={`I=${d.exact}\\approx ${v.toFixed(4).replace('.', '{,}')}`} />.
          </p>
        }
        correction={
          <>
            <li>
              Choix : on prend pour <MathTex tex="u" /> la partie qui se simplifie en dérivant, et pour <MathTex tex="v'" /> celle qu’on sait primitiver.
            </li>
            {d.etapes}
            <li>
              Résultat : <MathTex tex={`I=${d.exact}\\approx ${v.toFixed(4).replace('.', '{,}')}`} />, soit {v.toFixed(2).replace('.', ',')} au centième.
            </li>
          </>
        }
        conseils={
          <>
            <li>Dans un produit « polynôme × (exponentielle, sinus, cosinus) », on dérive le polynôme. Avec un logarithme, c’est le logarithme qu’on dérive.</li>
            <li>N’oublie pas le crochet <MathTex tex="[uv]_a^b" /> évalué aux deux bornes, ni le signe moins devant la nouvelle intégrale.</li>
            <li>Contrôle d’ordre de grandeur : sur l’intervalle, estime le signe de l’intégrande pour savoir si le résultat doit être positif ou négatif.</li>
          </>
        }
      />
    </Cadre>
  );
}
