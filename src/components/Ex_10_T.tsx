import { useState } from 'react';
import MathTex from './MathTex.tsx';
import {
  Astuce, Boutons, Cadre, Calcul, ChampAvecTouches, Chargement, Correction, Enonce, Formulaire, MessageIncompris, MessageSucces,
  Retour, Titre, ZoneRetour, useTirage,
} from './ExerciceUI.tsx';
import { analyser, deriver, entier, equivalents, rapportConstant, versTex } from '../lib/maths.ts';

/**
 * Exercice : trouver une primitive.
 *
 * Une fonction f est tirée au hasard parmi sept familles (constante, puissance, 1/x, 1/√x,
 * e^(ax), cos(ax), sin(ax)) avec des coefficients aléatoires.
 *
 * Correction : F est une primitive de f ⇔ F' = f. On ne compare donc PAS la réponse à une
 * formule écrite : on lit la saisie (analyseur de maths.ts), on la DÉRIVE exactement
 * (dérivation symbolique), et on compare la dérivée à f en plusieurs valeurs de x.
 * Ainsi x^3/3, (1/3)x^3 + 7, 0,5·x^3·(2/3)… sont tous acceptés, la constante « + C » est facultative,
 * et une mauvaise réponse n'est jamais acceptée par hasard.
 */

/* ===== Logique ===== */

export type Exercice = {
  f: string; // fonction, saisie ASCII (pour la correction)
  fTex: string;
  FTex: string; // une primitive, en TeX
  domaine: string;
  regle: string;
  verifTex: string; // vérification par dérivation
};

export function genererExercice(): Exercice {
  const a = entier(1, 5);
  const coef = a === 1 ? '' : String(a);
  switch (entier(0, 6)) {
    case 0: {
      const c = entier(1, 10);
      return {
        f: `${c}`, fTex: `${c}`, FTex: `${c}x`, domaine: 'ℝ',
        regle: `Une primitive de la fonction constante c est c·x. Ici c = ${c}.`,
        verifTex: `(${c}x)' = ${c}`,
      };
    }
    case 1: {
      const n = entier(2, 5);
      return {
        f: `x^${n}`, fTex: `x^{${n}}`, FTex: `\\frac{x^{${n + 1}}}{${n + 1}}`, domaine: 'ℝ',
        regle: `Une primitive de xⁿ est xⁿ⁺¹/(n + 1). Ici n = ${n}, donc n + 1 = ${n + 1}.`,
        verifTex: `\\left(\\frac{x^{${n + 1}}}{${n + 1}}\\right)' = \\frac{${n + 1}x^{${n}}}{${n + 1}} = x^{${n}}`,
      };
    }
    case 2:
      return {
        f: '1/x', fTex: '\\frac{1}{x}', FTex: '\\ln(x)', domaine: ']0 ; +∞[',
        regle: 'Sur ]0 ; +∞[, une primitive de 1/x est ln(x).',
        verifTex: "(\\ln x)' = \\frac{1}{x}",
      };
    case 3:
      return {
        f: '1/sqrt(x)', fTex: '\\frac{1}{\\sqrt{x}}', FTex: '2\\sqrt{x}', domaine: ']0 ; +∞[',
        regle: "On sait que (√x)' = 1/(2√x). Donc 1/√x = 2 × (√x)' a pour primitive 2√x.",
        verifTex: "(2\\sqrt{x})' = 2 \\times \\frac{1}{2\\sqrt{x}} = \\frac{1}{\\sqrt{x}}",
      };
    case 4:
      return {
        f: `e^(${a}x)`, fTex: `e^{${coef}x}`, FTex: a === 1 ? 'e^{x}' : `\\frac{e^{${a}x}}{${a}}`, domaine: 'ℝ',
        regle: `Une primitive de e^(ax) est e^(ax)/a. Ici a = ${a}.`,
        verifTex: a === 1 ? "(e^{x})' = e^{x}" : `\\left(\\frac{e^{${a}x}}{${a}}\\right)' = \\frac{${a}e^{${a}x}}{${a}} = e^{${a}x}`,
      };
    case 5:
      return {
        f: `cos(${coef}x)`, fTex: `\\cos(${coef}x)`, FTex: a === 1 ? '\\sin(x)' : `\\frac{\\sin(${a}x)}{${a}}`, domaine: 'ℝ',
        regle: `Une primitive de cos(ax) est sin(ax)/a. Ici a = ${a}.`,
        verifTex: a === 1 ? "(\\sin x)' = \\cos x" : `\\left(\\frac{\\sin(${a}x)}{${a}}\\right)' = \\frac{${a}\\cos(${a}x)}{${a}} = \\cos(${a}x)`,
      };
    default:
      return {
        f: `sin(${coef}x)`, fTex: `\\sin(${coef}x)`, FTex: a === 1 ? '-\\cos(x)' : `-\\frac{\\cos(${a}x)}{${a}}`, domaine: 'ℝ',
        regle: `Une primitive de sin(ax) est −cos(ax)/a. Ici a = ${a}.`,
        verifTex: a === 1 ? "(-\\cos x)' = \\sin x" : `\\left(-\\frac{\\cos(${a}x)}{${a}}\\right)' = \\frac{${a}\\sin(${a}x)}{${a}} = \\sin(${a}x)`,
      };
  }
}

const POINTS = [0.7, 1.3, 1.9, 2.6, 3.4]; // dans ]0 ; +∞[, donc valables pour toutes les familles

export type Verdict =
  | { type: 'incompris'; raison: string }
  | { type: 'correct' }
  | { type: 'faux'; indice: string };

/** Écrit un rapport sous forme de fraction simple quand c'est possible (2, 1/3, −0,5 → −1/2…). */
export function texteRapport(k: number): string {
  for (let d = 1; d <= 12; d++) {
    const n = Math.round(k * d);
    if (Math.abs(k - n / d) < 1e-7) return d === 1 ? String(n) : `${n}/${d}`;
  }
  return String(Math.round(k * 1000) / 1000);
}

export function verifier(f: string, saisie: string): Verdict {
  if (saisie.trim() === '') return { type: 'incompris', raison: 'Écris ta primitive avant de valider.' };
  const lu = analyser(saisie, { variables: ['x'], constantes: ['c'] });
  if (!lu.ok) return { type: 'incompris', raison: lu.message };
  const ref = analyser(f, { variables: ['x'] });
  if (!ref.ok) throw new Error(`Fonction illisible : ${f}`);

  const derivee = deriver(lu.noeud, 'x');
  if (equivalents(derivee, ref.noeud, 'x', POINTS)) return { type: 'correct' };

  const k = rapportConstant(derivee, ref.noeud, 'x', POINTS);
  if (k !== null && Math.abs(k) < 1e-9) {
    return { type: 'faux', indice: "Ta réponse est une constante : sa dérivée est nulle, ce n'est pas f(x)." };
  }
  if (k !== null) {
    return {
      type: 'faux',
      indice: `En dérivant ta réponse, on obtient ${texteRapport(k)} × f(x) au lieu de f(x) : il faut corriger le coefficient (divise ta réponse par ${texteRapport(k)}).`,
    };
  }
  return { type: 'faux', indice: "En dérivant ta réponse, on ne retrouve pas f(x) : ce n'est pas une primitive de f." };
}

/* ===== Affichage ===== */

const TOUCHES = [
  { label: 'xⁿ', texte: '^()', recul: 1 },
  { label: '÷', texte: '/', recul: 0 },
  { label: '√', texte: 'sqrt()', recul: 1 },
  { label: 'e^', texte: 'e^()', recul: 1 },
  { label: 'ln', texte: 'ln|x|', recul: 0 },
  { label: 'sin', texte: 'sin()', recul: 1 },
  { label: 'cos', texte: 'cos()', recul: 1 },
  { label: '+ C', texte: '+C', recul: 0 },
];

export default function Primitive() {
  const [exo, regenerer] = useTirage(genererExercice);
  const [saisie, setSaisie] = useState('');
  const [verdict, setVerdict] = useState<Verdict | null>(null);

  if (!exo) return <Chargement />;

  function valider() {
    setVerdict(verifier((exo as Exercice).f, saisie));
  }

  function nouvelExercice() {
    regenerer();
    setSaisie('');
    setVerdict(null);
  }

  const lu = saisie.trim() === '' ? null : analyser(saisie, { variables: ['x'], constantes: ['c'] });
  const apercu = lu && lu.ok ? versTex(lu.noeud) : null;

  return (
    <Cadre>
      <Titre />
      <Enonce>
        <p>Détermine une primitive F de la fonction f définie sur {exo.domaine} par :</p>
        <div className="exercice-formule">
          <MathTex tex={`f(x) = ${exo.fTex}`} />
        </div>
      </Enonce>

      <Formulaire onValider={valider}>
        <ChampAvecTouches
          libelle="F(x) ="
          valeur={saisie}
          onChange={setSaisie}
          maxLength={80}
          placeholder="Ex : x^4/4"
          aide="Écris ta réponse au clavier : x^3/3, 2sqrt(x), e^(2x)/2, sin(3x)… Le « + C » est facultatif."
          touches={TOUCHES}
          apercu={
            apercu && (
              <div className="exercice-apercu" aria-live="off">
                <span className="exercice-apercu__legende">Ce que j'ai compris :</span>
                <MathTex tex={`F(x) = ${apercu}`} />
              </div>
            )
          }
        />
        <Boutons onNouveau={nouvelExercice} />
      </Formulaire>

      <ZoneRetour>
        {verdict?.type === 'incompris' && <MessageIncompris raison={verdict.raison} />}
        {verdict?.type === 'correct' && (
          <MessageSucces>
            <p>
              Sa dérivée est bien f(x). Par exemple, <MathTex tex={`F(x) = ${exo.FTex} + C`} /> convient.
            </p>
          </MessageSucces>
        )}
        {verdict?.type === 'faux' && (
          <Retour type="faux">
            <p>Oups, une erreur s'est glissée. {verdict.indice}</p>
            <Correction>
              <li>
                F est une primitive de f si <Calcul>F′ = f</Calcul>. Il suffit donc de trouver une fonction dont la dérivée est{' '}
                <MathTex tex={`f(x) = ${exo.fTex}`} />.
              </li>
              <li>{exo.regle}</li>
              <li>
                On obtient <MathTex tex={`F(x) = ${exo.FTex} + C`} /> (C est une constante réelle quelconque).
              </li>
              <li>
                Vérification en dérivant : <MathTex tex={exo.verifTex} />.
              </li>
            </Correction>
            <Astuce titre="Pour réussir la prochaine fois">
              <ul>
                <li>Vérifie toujours ta réponse en la dérivant : tu dois retrouver f(x).</li>
                <li>Pour e^(ax), cos(ax) et sin(ax), n’oublie pas de diviser par a (la dérivée fait apparaître un facteur a).</li>
                <li>Pour sin(ax), le signe est négatif : la primitive est −cos(ax)/a.</li>
              </ul>
            </Astuce>
          </Retour>
        )}
      </ZoneRetour>
    </Cadre>
  );
}
