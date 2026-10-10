import { useState } from 'react';
import MathTex from './MathTex.tsx';
import {
  Astuce, Boutons, Cadre, Champ, Chargement, Correction, Enonce, Formulaire, MessageIncompris, MessageSucces, Retour,
  Titre, ZoneRetour, useTirage,
} from './ExerciceUI.tsx';
import { analyser, choisir, combinaison, deriver, entier, evaluer, fraction, type Fraction } from '../lib/maths.ts';

/**
 * Exercice : résoudre une équation différentielle.
 *
 * Quatre familles, avec des coefficients aléatoires :
 *   y' = f(x)            (on cherche une primitive de f)
 *   y' = a·y             (solutions : C·e^(ax))
 *   y' = a·y + b         (solutions : C·e^(ax) − b/a)
 *   y' = a·y + p·x + q   (solutions : C·e^(ax) + αx + β, avec α = −p/a et β = (α − q)/a)
 *
 * Correction : on ne compare pas à une formule. On LIT la fonction y saisie, on la DÉRIVE exactement,
 * et on vérifie y' = second membre pour plusieurs valeurs de x et plusieurs valeurs de la constante C.
 * Toute solution est donc acceptée (avec ou sans C, écrite sous n'importe quelle forme équivalente).
 */

/* ===== Logique ===== */

type Famille = 'primitive' | 'homogene' | 'constante' | 'affine';

export type Exercice = {
  famille: Famille;
  equationTex: string;
  /** second membre y' = rhs(x, y) */
  rhs: (x: number, y: number) => number;
  /** second membre de l'équation homogène associée (null pour y' = f(x)) */
  homogene: ((x: number, y: number) => number) | null;
  solutionAscii: string; // forme générale, constante notée c
  solutionTex: string;
  etapes: { texte: string; tex?: string }[];
};

const texFraction = ({ n, d }: Fraction) => (d === 1 ? `${Math.abs(n)}` : `\\frac{${Math.abs(n)}}{${d}}`);
const asciiFraction = ({ n, d }: Fraction) => `(${n}/${d})`;
/** « + 3/2 » ou « − 1/4 » (rien si la fraction est nulle) */
const ajoutTex = (f: Fraction) => (f.n === 0 ? '' : ` ${f.n < 0 ? '-' : '+'} ${texFraction(f)}`);
const termeXTex = (f: Fraction) => {
  if (f.n === 0) return '';
  const coef = f.d === 1 && Math.abs(f.n) === 1 ? '' : texFraction(f);
  return ` ${f.n < 0 ? '-' : '+'} ${coef}x`;
};
const expo = (a: number) => (a === 1 ? 'e^{x}' : `e^{${a}x}`);
const expoAscii = (a: number) => (a === 1 ? 'e^x' : `e^(${a}x)`);

export function genererExercice(): Exercice {
  const famille = choisir<Famille>(['primitive', 'homogene', 'constante', 'affine']);

  if (famille === 'primitive') {
    const k = entier(1, 4);
    const kx = k === 1 ? 'x' : `${k}x`;
    const cas = choisir(['cos', 'sin', 'exp', 'poly']);
    if (cas === 'cos') {
      return {
        famille, equationTex: `y' = \\cos(${kx})`, rhs: (x) => Math.cos(k * x), homogene: null,
        solutionAscii: `sin(${kx})/${k}+c`, solutionTex: k === 1 ? '\\sin(x) + C' : `\\frac{\\sin(${kx})}{${k}} + C`,
        etapes: [
          { texte: "L'équation y' = f(x) se résout en cherchant une primitive de f : y = F(x) + C." },
          { texte: `Une primitive de x ↦ cos(${kx}) est`, tex: k === 1 ? '\\sin(x)' : `\\frac{\\sin(${kx})}{${k}}` },
        ],
      };
    }
    if (cas === 'sin') {
      return {
        famille, equationTex: `y' = \\sin(${kx})`, rhs: (x) => Math.sin(k * x), homogene: null,
        solutionAscii: `-cos(${kx})/${k}+c`, solutionTex: k === 1 ? '-\\cos(x) + C' : `-\\frac{\\cos(${kx})}{${k}} + C`,
        etapes: [
          { texte: "L'équation y' = f(x) se résout en cherchant une primitive de f : y = F(x) + C." },
          { texte: `Une primitive de x ↦ sin(${kx}) est`, tex: k === 1 ? '-\\cos(x)' : `-\\frac{\\cos(${kx})}{${k}}` },
        ],
      };
    }
    if (cas === 'exp') {
      return {
        famille, equationTex: `y' = ${expo(k)}`, rhs: (x) => Math.exp(k * x), homogene: null,
        solutionAscii: `${expoAscii(k)}/${k}+c`, solutionTex: k === 1 ? 'e^{x} + C' : `\\frac{e^{${k}x}}{${k}} + C`,
        etapes: [
          { texte: "L'équation y' = f(x) se résout en cherchant une primitive de f : y = F(x) + C." },
          { texte: `Une primitive de x ↦ e^(${kx}) est`, tex: k === 1 ? 'e^{x}' : `\\frac{e^{${k}x}}{${k}}` },
        ],
      };
    }
    const p = entier(1, 6);
    const q = entier(-5, 5);
    const demi = fraction(p, 2);
    return {
      famille, equationTex: `y' = ${combinaison([[p, 'x'], [q, '']], true)}`, rhs: (x) => p * x + q, homogene: null,
      solutionAscii: `${p}/2*x^2+${q}*x+c`,
      solutionTex: `${demi.d === 1 ? (demi.n === 1 ? '' : demi.n) : texFraction(demi)}x^{2}${q === 0 ? '' : ` ${q < 0 ? '-' : '+'} ${Math.abs(q) === 1 ? '' : Math.abs(q)}x`} + C`,
      etapes: [
        { texte: "L'équation y' = f(x) se résout en cherchant une primitive de f : y = F(x) + C." },
        { texte: 'On primitive terme à terme (x ↦ x donne x²/2) :', tex: `\\frac{${p}}{2}x^{2}${q === 0 ? '' : ` ${q < 0 ? '-' : '+'} ${Math.abs(q)}x`}` },
      ],
    };
  }

  const a = famille === 'homogene' ? choisir([1, 2, 3, 4, 5, -1, -2, -3]) : choisir([1, 2, 3, -1, -2]);
  const eq = (reste: string) => `y' = ${combinaison([[a, 'y']], true)}${reste}`;

  if (famille === 'homogene') {
    return {
      famille, equationTex: eq(''), rhs: (_x, y) => a * y, homogene: (_x, y) => a * y,
      solutionAscii: `c*${expoAscii(a)}`, solutionTex: `C${expo(a)}`,
      etapes: [
        { texte: "Les solutions de y' = a·y sont les fonctions y = C·e^(ax), avec C réel." },
        { texte: `Ici a = ${a}, donc`, tex: `y = C${expo(a)}` },
      ],
    };
  }

  if (famille === 'constante') {
    const b = choisir([-1, 1]) * entier(1, 6);
    const yp = fraction(-b, a);
    return {
      famille, equationTex: eq(` ${b < 0 ? '-' : '+'} ${Math.abs(b)}`), rhs: (_x, y) => a * y + b, homogene: (_x, y) => a * y,
      solutionAscii: `c*${expoAscii(a)}+${asciiFraction(yp)}`, solutionTex: `C${expo(a)}${ajoutTex(yp)}`,
      etapes: [
        { texte: "Équation homogène associée y' = a·y : ses solutions sont", tex: `C${expo(a)}` },
        { texte: `Solution particulière constante y = k : y' = 0 donc 0 = ${a}k ${b < 0 ? '-' : '+'} ${Math.abs(b)}, soit`, tex: `k = ${yp.n < 0 ? '-' : ''}${texFraction(yp)}` },
        { texte: 'Solutions générales : somme des deux,', tex: `y = C${expo(a)}${ajoutTex(yp)}` },
      ],
    };
  }

  const p = entier(1, 4);
  const q = entier(-3, 3);
  const alpha = fraction(-p, a);
  const beta = fraction(-p - q * a, a * a);
  return {
    famille,
    equationTex: `y' = ${combinaison([[a, 'y'], [p, 'x'], [q, '']], true)}`,
    rhs: (x, y) => a * y + p * x + q,
    homogene: (_x, y) => a * y,
    solutionAscii: `c*${expoAscii(a)}+${asciiFraction(alpha)}*x+${asciiFraction(beta)}`,
    solutionTex: `C${expo(a)}${termeXTex(alpha)}${ajoutTex(beta)}`,
    etapes: [
      { texte: "Équation homogène associée y' = a·y : ses solutions sont", tex: `C${expo(a)}` },
      { texte: "On cherche une solution particulière affine y = αx + β. Alors y' = α, et l'équation donne α = aαx + aβ + px + q pour tout x." },
      { texte: `En identifiant : ${a}α + ${p} = 0 donc`, tex: `\\alpha = ${alpha.n < 0 ? '-' : ''}${texFraction(alpha)}` },
      { texte: `puis α = ${a}β + ${q}, donc`, tex: `\\beta = ${beta.n < 0 ? '-' : ''}${texFraction(beta)}` },
      { texte: 'Solutions générales :', tex: `y = C${expo(a)}${termeXTex(alpha)}${ajoutTex(beta)}` },
    ],
  };
}

const POINTS = [-1.3, -0.4, 0.3, 0.9, 1.7];
const VALEURS_C = [1.2345, 0.7, -2.1];

export type Verdict =
  | { type: 'incompris'; raison: string }
  | { type: 'correct'; avecConstante: boolean }
  | { type: 'faux'; indice: string };

/** y est-elle solution de y' = second membre, pour tout C ? */
function verifieEquation(y: ReturnType<typeof analyser> & { ok: true }, rhs: (x: number, y: number) => number): boolean {
  const dy = deriver(y.noeud, 'x');
  return VALEURS_C.every((c) =>
    POINTS.every((x) => {
      const yv = evaluer(y.noeud, { x, c });
      const lhs = evaluer(dy, { x, c });
      const droite = rhs(x, yv);
      return Number.isFinite(lhs) && Number.isFinite(droite) && Math.abs(lhs - droite) <= 1e-7 * Math.max(1, Math.abs(lhs), Math.abs(droite));
    })
  );
}

export function verifier(exo: Exercice, saisie: string): Verdict {
  if (saisie.trim() === '') return { type: 'incompris', raison: 'Écris ta solution y(x) avant de valider.' };
  const y = analyser(saisie.replace(/^\s*y\s*(\(x\))?\s*=/i, ''), { variables: ['x'], constantes: ['c'] });
  if (!y.ok) return { type: 'incompris', raison: y.message };

  if (verifieEquation(y, exo.rhs)) {
    const avecConstante = evaluer(y.noeud, { x: 0.5, c: 1 }) !== evaluer(y.noeud, { x: 0.5, c: 2 });
    return { type: 'correct', avecConstante };
  }
  if (exo.homogene && (exo.famille === 'constante' || exo.famille === 'affine') && verifieEquation(y, exo.homogene)) {
    return { type: 'faux', indice: "Ta fonction résout l'équation sans second membre, mais pas l'équation complète : il manque une solution particulière." };
  }
  if (exo.famille === 'primitive') {
    return { type: 'faux', indice: "Dérive ta fonction : tu dois retrouver exactement le second membre f(x)." };
  }
  return { type: 'faux', indice: "En dérivant ta fonction, y' n'est pas égal au second membre de l'équation (avec y remplacé par ta fonction)." };
}

/* ===== Affichage ===== */

export default function EquationDifferentielle() {
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
        <p>Détermine une fonction y, dérivable sur ℝ, solution de l'équation différentielle :</p>
        <div className="exercice-formule">
          <MathTex tex={exo.equationTex} />
        </div>
      </Enonce>

      <Formulaire onValider={valider}>
        <Champ
          libelle="y(x) ="
          valeur={saisie}
          onChange={setSaisie}
          maxLength={80}
          placeholder="Ex : c*e^(2x) + 3"
          aide="Écris la fonction au clavier (e^(2x), sin(3x), cos(x)…). Note la constante C simplement c."
        />
        <Boutons onNouveau={nouvelExercice} />
      </Formulaire>

      <ZoneRetour>
        {verdict?.type === 'incompris' && <MessageIncompris raison={verdict.raison} />}
        {verdict?.type === 'correct' && (
          <MessageSucces>
            <p>
              Ta fonction vérifie bien l'équation. Les solutions générales sont <MathTex tex={`y = ${exo.solutionTex}`} />
              {verdict.avecConstante ? '.' : ' (la tienne en est un cas particulier).'}
            </p>
          </MessageSucces>
        )}
        {verdict?.type === 'faux' && (
          <Retour type="faux">
            <p>Oups, une erreur s'est glissée. {verdict.indice}</p>
            <Correction>
              {exo.etapes.map((e, i) => (
                <li key={i}>
                  {e.texte} {e.tex && <MathTex tex={e.tex} />}
                </li>
              ))}
              <li>
                Vérification : en dérivant la solution trouvée et en remplaçant y dans l'équation, on retrouve bien le second
                membre.
              </li>
            </Correction>
            <div className="exercice-formule">
              <MathTex tex={`y = ${exo.solutionTex}`} />
            </div>
            <Astuce titre="Pour réussir la prochaine fois">
              <ul>
                <li>Pour tout contrôler, dérive ta réponse et remplace y dans l'équation : les deux membres doivent être égaux.</li>
                <li>La solution générale d'une équation y' = ay + b est la somme de C·e^(ax) et d'une solution particulière.</li>
                <li>Pour y' = ay + b, une solution particulière constante est y = −b/a.</li>
              </ul>
            </Astuce>
          </Retour>
        )}
      </ZoneRetour>
    </Cadre>
  );
}
