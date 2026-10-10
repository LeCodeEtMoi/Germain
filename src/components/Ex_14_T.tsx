import { useState } from 'react';
import MathTex from './MathTex.tsx';
import {
  Astuce, Boutons, Cadre, ChampAvecTouches, Chargement, Correction, Enonce, Formulaire, MessageIncompris, MessageSucces, Retour,
  Titre, ZoneRetour, useTirage,
} from './ExerciceUI.tsx';
import { type Fraction, choisir, combinaison, entier, fraction, valeurDuTexte } from '../lib/maths.ts';

/**
 * Exercice : limite d'une suite.
 *
 * Six familles tirées au hasard, avec des coefficients aléatoires :
 *   polynôme · quotient de même degré · quotient (numérateur de degré plus petit) ·
 *   quotient (numérateur de degré plus grand) · a·qⁿ + c · a√n + b (ou a/√n + b).
 *
 * La limite attendue (+∞, −∞, un réel ou « pas de limite ») est calculée en même temps que la suite.
 * La réponse de l'élève est lue (+∞, inf, 3/2, 0,5, « pas de limite »…) puis comparée à cette limite.
 */

/* ===== Logique ===== */

export type Limite = { type: 'infini'; signe: 1 | -1 } | { type: 'reel'; valeur: Fraction } | { type: 'aucune' };

export type Exercice = {
  uTex: string;
  /** terme général (sert aux tests : grand n) */
  u: (n: number) => number;
  limite: Limite;
  etapes: { texte: string; tex?: string }[];
};

const puissance = (k: number) => (k === 0 ? '' : k === 1 ? 'n' : `n^{${k}}`);
const termes = (liste: [number, number][]) => combinaison(liste.map(([c, k]) => [c, puissance(k)] as [number, string]), true);
const valeurPoly = (liste: [number, number][], n: number) => liste.reduce((s, [c, k]) => s + c * n ** k, 0);

/** Factorisation par le terme de plus haut degré : n^p ( a + b/n^(p−k) + … ) */
function factorise(liste: [number, number][]): string {
  const [[a, p]] = liste;
  const reste = liste
    .slice(1)
    .map(([c, k]) => `${c < 0 ? '-' : '+'} \\frac{${Math.abs(c)}}{${puissance(p - k)}}`)
    .join(' ');
  return `${puissance(p)}\\left(${a} ${reste}\\right)`;
}

/** Même parenthèse, après simplification par n^p. */
function simplifie(liste: [number, number][]): string {
  const [[a, p]] = liste;
  return `${a} ${liste.slice(1).map(([c, k]) => `${c < 0 ? '-' : '+'} \\frac{${Math.abs(c)}}{${puissance(p - k)}}`).join(' ')}`.trim();
}

const texFraction = ({ n, d }: Fraction) => (d === 1 ? `${n}` : n < 0 ? `-\\frac{${-n}}{${d}}` : `\\frac{${n}}{${d}}`);

const ETAPE_POLYNOME = "Les termes en 1/nᵏ (k ≥ 1) tendent vers 0 quand n tend vers +∞.";

export function genererExercice(): Exercice {
  const famille = entier(0, 5);

  /* ----- polynôme ----- */
  if (famille === 0) {
    const k = entier(2, 6);
    const a = choisir([-1, 1]) * entier(1, 4);
    const liste: [number, number][] = [[a, k], [choisir([-1, 1]) * entier(1, 5), entier(1, k - 1)]];
    if (Math.random() < 0.5) liste.push([choisir([-1, 1]) * entier(1, 9), 0]);
    liste.sort((p, q) => q[1] - p[1]);
    const signe = a > 0 ? 1 : -1;
    return {
      uTex: `u_n = ${termes(liste)}`,
      u: (n) => valeurPoly(liste, n),
      limite: { type: 'infini', signe },
      etapes: [
        { texte: 'On factorise par le terme de plus haut degré :', tex: `u_n = ${factorise(liste)}` },
        { texte: ETAPE_POLYNOME + ` Donc la parenthèse tend vers ${a}.` },
        { texte: `De plus ${a > 0 ? '' : '−'}n^${k} tend vers ${a > 0 ? '+∞' : '−∞'}. Par produit :`, tex: `\\lim_{n\\to+\\infty} u_n = ${signe > 0 ? '+' : '-'}\\infty` },
      ],
    };
  }

  /* ----- quotients ----- */
  if (famille >= 1 && famille <= 3) {
    // 1 : même degré · 2 : numérateur de degré plus petit · 3 : numérateur de degré plus grand
    const q = famille === 1 ? entier(1, 2) : famille === 2 ? entier(2, 3) : entier(1, 2);
    const p = famille === 1 ? q : famille === 2 ? q - entier(1, q - 1) : q + entier(1, 2);
    const num: [number, number][] = [[choisir([-1, 1]) * entier(1, 5), p], [choisir([-1, 1]) * entier(1, 6), entier(0, p - 1)]];
    const den: [number, number][] = [[entier(1, 4), q], [entier(1, 6), 0]]; // jamais nul, même pour n = 0
    const dominant = num[0][0];
    let limite: Limite;
    if (p === q) {
      const val = fraction(num[0][0], den[0][0]);
      limite = { type: 'reel', valeur: val };
      return {
        uTex: `u_n = \\frac{${termes(num)}}{${termes(den)}}`,
        u: (n) => valeurPoly(num, n) / valeurPoly(den, n),
        limite,
        etapes: [
          { texte: 'On factorise le numérateur et le dénominateur par leur terme de plus haut degré :', tex: `u_n = \\frac{${factorise(num)}}{${factorise(den)}}` },
          { texte: `Comme les degrés sont égaux, les puissances de n se simplifient :`, tex: `u_n = \\frac{${simplifie(num)}}{${simplifie(den)}}` },
          { texte: ETAPE_POLYNOME + ' Donc :', tex: `\\lim_{n\\to+\\infty} u_n = \\frac{${num[0][0]}}{${den[0][0]}} = ${texFraction(val)}` },
        ],
      };
    }
    if (p < q) {
      limite = { type: 'reel', valeur: fraction(0) };
      return {
        uTex: `u_n = \\frac{${termes(num)}}{${termes(den)}}`,
        u: (n) => valeurPoly(num, n) / valeurPoly(den, n),
        limite,
        etapes: [
          { texte: 'On factorise le numérateur et le dénominateur par leur terme de plus haut degré :', tex: `u_n = \\frac{${factorise(num)}}{${factorise(den)}}` },
          { texte: `Le dénominateur est de plus haut degré : on simplifie par ${puissance(p)} et il reste ${q - p === 1 ? 'un facteur 1/n' : `un facteur 1/${puissance(q - p)}`} :`, tex: `u_n = \\frac{1}{${puissance(q - p)}} \\times \\frac{${simplifie(num)}}{${simplifie(den)}}` },
          { texte: 'Le premier facteur tend vers 0, le second vers un réel (' + `${num[0][0]}/${den[0][0]}` + '). Par produit :', tex: '\\lim_{n\\to+\\infty} u_n = 0' },
        ],
      };
    }
    const signe = dominant > 0 ? 1 : -1;
    limite = { type: 'infini', signe };
    return {
      uTex: `u_n = \\frac{${termes(num)}}{${termes(den)}}`,
      u: (n) => valeurPoly(num, n) / valeurPoly(den, n),
      limite,
      etapes: [
        { texte: 'On factorise le numérateur et le dénominateur par leur terme de plus haut degré :', tex: `u_n = \\frac{${factorise(num)}}{${factorise(den)}}` },
        { texte: `Le numérateur est de plus haut degré : on simplifie et il reste un facteur ${puissance(p - q)} :`, tex: `u_n = ${puissance(p - q)} \\times \\frac{${simplifie(num)}}{${simplifie(den)}}` },
        { texte: `Le facteur ${puissance(p - q)} tend vers +∞ et le quotient tend vers ${num[0][0]}/${den[0][0]}, de signe ${dominant > 0 ? 'positif' : 'négatif'}. Par produit :`, tex: `\\lim_{n\\to+\\infty} u_n = ${signe > 0 ? '+' : '-'}\\infty` },
      ],
    };
  }

  /* ----- a·qⁿ + c ----- */
  if (famille === 4) {
    const q = choisir<Fraction>([
      fraction(1, 2), fraction(1, 3), fraction(2, 3), fraction(3, 4), fraction(-1, 2), fraction(-2, 3),
      fraction(3, 2), fraction(2), fraction(3), fraction(5, 4), fraction(-2), fraction(-3, 2), fraction(-1),
    ]);
    const a = choisir([-1, 1]) * entier(1, 4);
    const c = Math.random() < 0.5 ? 0 : choisir([-1, 1]) * entier(1, 5);
    const v = q.n / q.d;
    const base = q.d === 1 ? (q.n < 0 ? `(${q.n})` : `${q.n}`) : `\\left(${texFraction(q)}\\right)`;
    const facteur = a === 1 ? '' : a === -1 ? '-' : `${a}\\times `;
    const ajout = c === 0 ? '' : ` ${c < 0 ? '-' : '+'} ${Math.abs(c)}`;
    let limite: Limite;
    let conclusion: string;
    if (Math.abs(v) < 1) {
      limite = { type: 'reel', valeur: fraction(c) };
      conclusion = `Comme −1 < q < 1, qⁿ tend vers 0 (q = ${q.n}${q.d === 1 ? '' : '/' + q.d}), donc ${a}·qⁿ tend vers 0.`;
    } else if (v > 1) {
      limite = { type: 'infini', signe: a > 0 ? 1 : -1 };
      conclusion = `Comme q > 1, qⁿ tend vers +∞ (q = ${q.n}${q.d === 1 ? '' : '/' + q.d}) ; avec le coefficient ${a}, ${a}·qⁿ tend vers ${a > 0 ? '+∞' : '−∞'}.`;
    } else {
      limite = { type: 'aucune' };
      conclusion =
        v === -1
          ? 'Pour q = −1, qⁿ vaut alternativement 1 et −1 : la suite ne converge pas et ne tend pas vers ±∞.'
          : `Comme q ≤ −1 (q = ${q.n}${q.d === 1 ? '' : '/' + q.d}), les termes qⁿ changent de signe et leur valeur absolue ne tend pas vers 0 : la suite n'a pas de limite.`;
    }
    const lim = limite.type === 'infini' ? `${limite.signe > 0 ? '+' : '-'}\\infty` : limite.type === 'reel' ? texFraction(limite.valeur) : '';
    return {
      uTex: `u_n = ${facteur}${base}^{n}${ajout}`,
      u: (n) => a * Math.pow(v, n) + c,
      limite,
      etapes: [
        { texte: `La suite est de la forme ${a}·qⁿ ${c === 0 ? '' : (c < 0 ? '− ' : '+ ') + Math.abs(c)}, avec la raison`, tex: `q = ${texFraction(q)}` },
        { texte: conclusion },
        limite.type === 'aucune'
          ? { texte: 'Conclusion : la suite (uₙ) n’a pas de limite.' }
          : { texte: 'Conclusion :', tex: `\\lim_{n\\to+\\infty} u_n = ${lim}` },
      ],
    };
  }

  /* ----- racine carrée ----- */
  const decroit = Math.random() < 0.5;
  const a = choisir([-1, 1]) * entier(1, 4);
  const b = Math.random() < 0.5 ? 0 : choisir([-1, 1]) * entier(1, 5);
  if (!decroit) {
    const ajout = b === 0 ? '' : ` ${b < 0 ? '-' : '+'} ${Math.abs(b)}`;
    const facteur = a === 1 ? '' : a === -1 ? '-' : `${a}`;
    const signe = a > 0 ? 1 : -1;
    return {
      uTex: `u_n = ${facteur}\\sqrt{n}${ajout}`,
      u: (n) => a * Math.sqrt(n) + b,
      limite: { type: 'infini', signe },
      etapes: [
        { texte: '√n tend vers +∞ quand n tend vers +∞.' },
        { texte: `On multiplie par ${a}${a < 0 ? ' (négatif : la limite change de signe)' : ''}${b === 0 ? '.' : `, puis on ajoute ${b}, ce qui ne change pas une limite infinie.`}` },
        { texte: 'Conclusion :', tex: `\\lim_{n\\to+\\infty} u_n = ${signe > 0 ? '+' : '-'}\\infty` },
      ],
    };
  }
  const ajout = b === 0 ? '' : ` ${b < 0 ? '-' : '+'} ${Math.abs(b)}`;
  return {
    uTex: `u_n = \\frac{${a}}{\\sqrt{n}}${ajout}`,
    u: (n) => a / Math.sqrt(n) + b,
    limite: { type: 'reel', valeur: fraction(b) },
    etapes: [
      { texte: '√n tend vers +∞, donc son inverse tend vers 0 :', tex: `\\lim_{n\\to+\\infty} \\frac{1}{\\sqrt{n}} = 0` },
      { texte: `Donc ${a}/√n tend vers 0${b === 0 ? '.' : `, et on ajoute la constante ${b}.`}` },
      { texte: 'Conclusion :', tex: `\\lim_{n\\to+\\infty} u_n = ${b}` },
    ],
  };
}

export type Verdict = { type: 'incompris'; raison: string } | { type: 'correct' } | { type: 'faux' };

/** Lit la limite écrite par l'élève. null si illisible. */
export function lireLimite(saisie: string): Limite | null {
  const t = saisie
    .toLowerCase()
    .replace(/[−–—]/g, '-')
    .replace(/[\s'’]/g, '');
  if (t === '') return null;
  if (/^(\+|plus)?(l)?(∞|inf|infini|infinity)$/.test(t)) return { type: 'infini', signe: 1 };
  if (/^(-|moins)(l)?(∞|inf|infini|infinity)$/.test(t)) return { type: 'infini', signe: -1 };
  if (/(paslimite|pasdelimite|aucunelimite|nexistepas|existepas|inexistant|nonexistant|pasconverg|nelimite|n[aà]paslimite)/.test(t)) return { type: 'aucune' };
  const v = valeurDuTexte(saisie.replace(/[−–—]/g, '-'));
  if (v === null) return null;
  // un réel : on le garde sous forme de fraction approchée (pour comparaison par valeur)
  return { type: 'reel', valeur: { n: v, d: 1 } };
}

const memeLimite = (a: Limite, b: Limite) =>
  a.type === b.type &&
  (a.type === 'infini' ? a.signe === (b as typeof a).signe : a.type === 'reel' ? Math.abs(a.valeur.n / a.valeur.d - (b as typeof a).valeur.n / (b as typeof a).valeur.d) < 1e-9 : true);

export function verifier(exo: Exercice, saisie: string): Verdict {
  if (saisie.trim() === '') return { type: 'incompris', raison: 'Écris la limite avant de valider.' };
  const lue = lireLimite(saisie);
  if (!lue) return { type: 'incompris', raison: "Je ne comprends pas cette limite. Écris +∞, -∞, un nombre (3, 1/2, 0,5) ou « pas de limite »." };
  return memeLimite(lue, exo.limite) ? { type: 'correct' } : { type: 'faux' };
}

const texteLimite = (l: Limite) =>
  l.type === 'infini' ? (l.signe > 0 ? '+∞' : '−∞') : l.type === 'reel' ? (l.valeur.d === 1 ? String(l.valeur.n) : `${l.valeur.n}/${l.valeur.d}`).replace('-', '−') : "la suite n'a pas de limite";

/* ===== Affichage ===== */

const TOUCHES = [
  { label: '+∞', texte: '+∞' },
  { label: '−∞', texte: '-∞' },
  { label: '÷', texte: '/' },
  { label: 'pas de limite', texte: 'pas de limite' },
];

export default function LimiteSuite() {
  const [exo, regenerer] = useTirage(genererExercice);
  const [saisie, setSaisie] = useState('');
  const [verdict, setVerdict] = useState<Verdict | null>(null);

  if (!exo) return <Chargement />;

  function valider() {
    setVerdict(verifier(exo as Exercice, saisie));
  }

  function nouvelExercice() {
    regenerer();
    setSaisie('');
    setVerdict(null);
  }

  return (
    <Cadre>
      <Titre />
      <Enonce>
        <p>
          Détermine la limite de la suite <MathTex tex="(u_n)" /> définie pour tout entier n ≥ 1 par :
        </p>
        <div className="exercice-formule">
          <MathTex tex={exo.uTex} />
        </div>
      </Enonce>

      <Formulaire onValider={valider}>
        <ChampAvecTouches
          libelle={<MathTex tex="\lim_{n\to+\infty} u_n =" />}
          valeur={saisie}
          onChange={setSaisie}
          maxLength={40}
          placeholder="Ex : +∞, 0, 3/2…"
          aide="Écris +∞, -∞, un nombre (3, 1/2, 0,5) ou « pas de limite » si la suite n'a pas de limite."
          touches={TOUCHES}
        />
        <Boutons onNouveau={nouvelExercice} />
      </Formulaire>

      <ZoneRetour>
        {verdict?.type === 'incompris' && <MessageIncompris raison={verdict.raison} />}
        {verdict?.type === 'correct' && (
          <MessageSucces>
            <p>La limite de la suite est bien {texteLimite(exo.limite)}.</p>
          </MessageSucces>
        )}
        {verdict?.type === 'faux' && (
          <Retour type="faux">
            <p>Oups, une erreur s'est glissée. Réponse attendue : {texteLimite(exo.limite)}.</p>
            <Correction>
              {exo.etapes.map((e, i) => (
                <li key={i}>
                  {e.texte} {e.tex && <MathTex tex={e.tex} />}
                </li>
              ))}
            </Correction>
            <Astuce titre="Pour réussir la prochaine fois">
              <ul>
                <li>Pour un polynôme ou un quotient, factorise par le terme de plus haut degré : tout le reste tend vers 0.</li>
                <li>Pour qⁿ : limite 0 si −1 &lt; q &lt; 1, +∞ si q &gt; 1, pas de limite si q ≤ −1.</li>
                <li>Une limite infinie change de signe quand on multiplie par un nombre négatif.</li>
              </ul>
            </Astuce>
          </Retour>
        )}
      </ZoneRetour>
    </Cadre>
  );
}
