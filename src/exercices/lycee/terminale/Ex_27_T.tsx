import { useState } from 'react';
import MathTex from '@/components/math/MathTex.tsx';
import {
  Astuce, Boutons, Cadre, Calcul, ChampAvecTouches, Chargement, Correction, Enonce, Formulaire, MessageIncompris, MessageSucces,
  Retour, Titre, ZoneRetour, useTirage,
} from '@/components/exercice/ExerciceUI.tsx';
import { MOINS, choisir, combinaison, entier, fraction, texteFraction } from '@/lib/maths.ts';
import { type Union, borne, demiDroite, indiceUnion, intersection, memeUnion, texteUnion } from '@/lib/intervalles.ts';
import { type Comparateur, texComparateur } from '@/lib/algo.ts';
import { lireEnsemble, lireSolution, procheNombre } from '@/lib/equations.ts';

/**
 * Exercice : équations et inéquations avec ln ou exp.
 *
 *   ln(ax + b) = k            e^(ax + b) = m
 *   ln(ax + b) ⊳ k            e^(ax + b) ⊳ m          (⊳ : <, ≤, >, ≥ ; a peut être négatif)
 *
 * La solution exacte est CALCULÉE :
 *   · ln est définie pour ax + b > 0 (domaine) et croissante : ln(ax + b) ⊳ k ⇔ ax + b ⊳ eᵏ (et ax + b > 0) ;
 *   · exp est croissante : e^(ax + b) ⊳ m ⇔ ax + b ⊳ ln m ;
 *   · on isole x en changeant le sens de l'inégalité quand a < 0, puis on intersecte avec le domaine.
 * Réponse de l'élève : un nombre ou une expression (e^2, ln(5)…) pour une équation ; « x > … » ou un intervalle pour
 * une inéquation. Les bornes sont comparées par leur valeur.
 */

/* ===== Logique ===== */

export type Type = 'ln-eq' | 'exp-eq' | 'ln-ineq' | 'exp-ineq';
export type Op = '=' | Comparateur;

export type Exercice = {
  type: Type;
  a: number;
  b: number;
  op: Op;
  /** second membre : k pour ln (on obtient eᵏ), m pour exp (on obtient ln m) */
  second: number;
};

export type Resolution = {
  /** x₀ = (c − b)/a, avec c = eᵏ ou ln m */
  x0: { v: number; texte: string; tex: string };
  c: { v: number; texte: string; tex: string };
  domaine: Union | null; // pour ln
  domaineTexte: string | null;
  sansDomaine: Union | null; // ensemble {ax + b ⊳ c}, avant intersection
  reponseEquation: number | null;
  reponse: Union | null; // inéquation
  /** pour a < 0, l'ensemble obtenu en oubliant de changer le sens */
  sensInverse: Union | null;
};

export function genererExercice(): Exercice {
  const type = choisir<Type>(['ln-eq', 'exp-eq', 'ln-ineq', 'exp-ineq']);
  const a = choisir([-1, 1]) * entier(1, 4);
  const b = entier(-5, 5);
  const ineq = type.endsWith('ineq');
  return {
    type,
    a,
    b,
    op: ineq ? choisir<Comparateur>(['<', '<=', '>', '>=']) : '=',
    second: type.startsWith('ln') ? entier(1, 3) : entier(2, 9),
  };
}

const moinsTexte = (s: string) => s.replace(/-/g, MOINS);

/** (c − b)/a, écrit en TeX et en texte, sans dénominateur négatif. */
function quotient(a: number, b: number, c: { tex: string; texte: string; v: number }) {
  const num = (tex: boolean) => {
    const x = tex ? c.tex : c.texte;
    if (a > 0) return b > 0 ? `${x} - ${b}` : b < 0 ? `${x} + ${-b}` : x;
    return b === 0 ? `-${x}` : `${b} - ${x}`;
  };
  const d = Math.abs(a);
  return {
    v: (c.v - b) / a,
    tex: d === 1 ? num(true) : `\\frac{${num(true)}}{${d}}`,
    texte: moinsTexte(d === 1 ? num(false) : `(${num(false)})/${d}`),
  };
}

export function resoudre({ type, a, b, op, second }: Exercice): Resolution {
  const estLn = type.startsWith('ln');
  const c = estLn
    ? { v: Math.exp(second), texte: second === 1 ? 'e' : `e^${second}`, tex: second === 1 ? 'e' : `e^{${second}}` }
    : { v: Math.log(second), texte: `ln(${second})`, tex: `\\ln(${second})` };
  const x0 = quotient(a, b, c);
  const frontiere = borne(x0.v, x0.texte);

  let domaine: Union | null = null;
  let domaineTexte: string | null = null;
  if (estLn) {
    const bord = fraction(-b, a);
    const bordB = borne(-b / a, texteFraction(bord));
    domaine = a > 0 ? demiDroite(bordB, true, false) : demiDroite(bordB, false, false);
    domaineTexte = `x ${a > 0 ? '>' : '<'} ${texteFraction(bord)}`;
  }

  if (op === '=') {
    return { x0, c, domaine, domaineTexte, sansDomaine: null, reponseEquation: x0.v, reponse: null, sensInverse: null };
  }
  const large = op === '<=' || op === '>=';
  const croissant = op === '>' || op === '>='; // ax + b ⊳ c vers la droite ?
  // a < 0 : on change le sens en divisant
  const versLaDroite = a > 0 ? croissant : !croissant;
  const sansDomaine = demiDroite(frontiere, versLaDroite, large);
  const sensInverse = demiDroite(frontiere, !versLaDroite, large);
  const reponse = domaine ? intersection(sansDomaine, domaine) : sansDomaine;
  return {
    x0,
    c,
    domaine,
    domaineTexte,
    sansDomaine,
    reponseEquation: null,
    reponse,
    sensInverse: domaine ? intersection(sensInverse, domaine) : sensInverse,
  };
}

export type Verdict =
  | { type: 'incompris'; raison: string }
  | { type: 'correct' }
  | { type: 'faux'; indice: string };

export function verifier(exo: Exercice, saisie: string): Verdict {
  const sol = resoudre(exo);
  if (exo.op === '=') {
    const lue = lireSolution(saisie);
    if (!lue.ok) return { type: 'incompris', raison: lue.message };
    if (lue.vide) return { type: 'faux', indice: "L'équation a bien une solution." };
    return procheNombre(lue.v, sol.reponseEquation as number)
      ? { type: 'correct' }
      : { type: 'faux', indice: 'Vérifie ta résolution : isole d’abord ax + b, puis x.' };
  }
  const lue = lireEnsemble(saisie);
  if (!lue.ok) return { type: 'incompris', raison: lue.message };
  const reponse = sol.reponse as Union;
  if (memeUnion(lue.union, reponse)) return { type: 'correct' };
  if (sol.domaine && sol.sansDomaine && memeUnion(lue.union, sol.sansDomaine)) {
    return { type: 'faux', indice: "N'oublie pas le domaine de définition de ln : il faut aussi que ax + b soit strictement positif." };
  }
  if (exo.a < 0 && sol.sensInverse && memeUnion(lue.union, sol.sensInverse)) {
    return { type: 'faux', indice: 'Quand on divise par un nombre négatif, le sens de l’inégalité change.' };
  }
  return { type: 'faux', indice: indiceUnion(lue.union, reponse) };
}


/* ===== Affichage ===== */

const TOUCHES = [
  { label: 'ln', texte: 'ln()', recul: 1 },
  { label: 'e^', texte: 'e^()', recul: 1 },
  { label: '÷', texte: '/' },
  { label: ']', texte: ']' },
  { label: '[', texte: '[' },
  { label: ';', texte: ' ; ' },
  { label: '+∞', texte: '+∞' },
  { label: '−∞', texte: '-∞' },
];

const SYMBOLE: Record<Comparateur, string> = { '<': '<', '<=': '≤', '>': '>', '>=': '≥' };

export default function LnExp() {
  const [exo, regenerer] = useTirage(genererExercice);
  const [saisie, setSaisie] = useState('');
  const [verdict, setVerdict] = useState<Verdict | null>(null);

  if (!exo) return <Chargement />;

  const { type, a, b, op, second } = exo;
  const sol = resoudre(exo);
  const estLn = type.startsWith('ln');
  const affine = combinaison([[a, 'x'], [b, '']], true);
  const symbole = op === '=' ? '=' : texComparateur(op);
  const enonce = estLn ? `\\ln(${affine}) ${symbole} ${second}` : `e^{${affine}} ${symbole} ${second}`;
  const mot = op === '=' ? 'équation' : 'inéquation';

  function valider() {
    setVerdict(verifier(exo as Exercice, saisie));
  }

  function nouvelExercice() {
    regenerer();
    setSaisie('');
    setVerdict(null);
  }

  const reponseTexte = op === '=' ? `x = ${sol.x0.texte}` : texteUnion(sol.reponse as Union);
  const sensChange = a < 0 && op !== '=';
  const opTex = op === '=' ? '=' : texComparateur(op);
  const opFinal = op === '=' ? '=' : sensChange ? SYMBOLE[contrairesSens(op)] : SYMBOLE[op];

  return (
    <Cadre>
      <Titre />
      <Enonce>
        <p>
          Résous l'{mot} suivante{estLn ? ' (après avoir déterminé son ensemble de définition)' : ''} :
        </p>
        <div className="exercice-formule">
          <MathTex tex={enonce} />
        </div>
      </Enonce>

      <Formulaire onValider={valider}>
        <ChampAvecTouches
          libelle={op === '=' ? 'Solution exacte' : 'Ensemble des solutions'}
          valeur={saisie}
          onChange={setSaisie}
          maxLength={80}
          placeholder={op === '=' ? 'Ex : (e^2-1)/3' : 'Ex : ]ln(3)/2 ; +∞['}
          aide={
            op === '=' ? (
              <>Écris la valeur exacte (e^2, ln(5)… sont acceptés) ; un nombre décimal approché ne suffit pas toujours.</>
            ) : (
              <>Écris une inégalité (x &gt; 2) ou un intervalle avec ses crochets (]2 ; +∞[). Les bornes peuvent contenir e^ ou ln().</>
            )
          }
          touches={TOUCHES}
        />
        <Boutons onNouveau={nouvelExercice} />
      </Formulaire>

      <ZoneRetour>
        {verdict?.type === 'incompris' && <MessageIncompris raison={verdict.raison} />}
        {verdict?.type === 'correct' && (
          <MessageSucces>
            <p>
              {op === '=' ? 'La solution est bien' : "L'ensemble des solutions est bien"} <Calcul>{reponseTexte}</Calcul>.
            </p>
          </MessageSucces>
        )}
        {verdict?.type === 'faux' && (
          <Retour type="faux">
            <p>Oups, une erreur s'est glissée. {verdict.indice}</p>
            <Correction>
              {estLn ? (
                <li>
                  <strong>Domaine.</strong> ln(ax + b) existe si <MathTex tex={`${affine} > 0`} />, c'est-à-dire <Calcul>{sol.domaineTexte}</Calcul>.
                </li>
              ) : (
                <li>
                  <strong>Domaine.</strong> La fonction exponentielle est définie sur ℝ : pas de condition sur x.
                </li>
              )}
              <li>
                {estLn ? (
                  <>
                    On applique la fonction exponentielle (croissante) aux deux membres : <MathTex tex={`${affine} ${opTex} e^{${second}}`} />
                    {op === '=' ? '' : ' (le sens de l’inégalité est conservé)'}.
                  </>
                ) : (
                  <>
                    On applique la fonction ln (croissante) aux deux membres : <MathTex tex={`${affine} ${opTex} \\ln(${second})`} />
                    {op === '=' ? '' : ' (le sens de l’inégalité est conservé)'}.
                  </>
                )}
              </li>
              <li>
                On isole x : <MathTex tex={`x ${op === '=' ? '=' : texComparateur(sensChange ? contrairesSens(op) : op)} ${sol.x0.tex}`} />
                {sensChange ? ' (on divise par un nombre négatif : le sens de l’inégalité change)' : ''}.
              </li>
              {estLn && op !== '=' && (
                <li>
                  On intersecte avec le domaine <Calcul>{sol.domaineTexte}</Calcul>.
                </li>
              )}
              <li>
                {op === '=' ? (
                  <>
                    Solution : <Calcul>{reponseTexte}</Calcul>
                    {estLn ? ' (elle respecte bien le domaine, car eᵏ > 0).' : '.'}
                  </>
                ) : (
                  <>
                    Ensemble des solutions : <Calcul>{reponseTexte}</Calcul> (symbole final : x {opFinal} …).
                  </>
                )}
              </li>
            </Correction>
            <Astuce titre="Pour réussir la prochaine fois">
              <ul>
                <li>Avec ln, détermine toujours le domaine en premier : l'argument doit être strictement positif.</li>
                <li>ln et exp sont croissantes : elles conservent le sens des inégalités.</li>
                <li>Diviser par un nombre négatif change le sens de l'inégalité.</li>
              </ul>
            </Astuce>
          </Retour>
        )}
      </ZoneRetour>
    </Cadre>
  );
}

function contrairesSens(op: Comparateur): Comparateur {
  return op === '<' ? '>' : op === '<=' ? '>=' : op === '>' ? '<' : '<=';
}
