import { useState } from 'react';
import MathTex from '@/components/math/MathTex.tsx';
import {
  Astuce, Boutons, Cadre, Calcul, ChampAvecTouches, Chargement, Correction, Enonce, Formulaire, MessageIncompris, MessageSucces,
  Retour, Titre, ZoneRetour, useTirage,
} from '@/components/exercice/ExerciceUI.tsx';
import { type Fraction, choisir, combinaison, entier, fraction, texteFraction } from '@/lib/maths.ts';
import { type Union, borne, demiDroite, indiceUnion, intersection, memeUnion, texteUnion } from '@/lib/intervalles.ts';
import { type Comparateur, texComparateur } from '@/lib/algo.ts';
import { lireEnsemble, lireSolution, procheNombre } from '@/lib/equations.ts';

/**
 * Exercice : équations et inéquations du type  ln(u(x)) = ln(v(x))  ou  ln(u(x)) ⊳ ln(v(x)),
 * avec u(x) = a₁x + b₁ et v(x) = a₂x + b₂.
 *
 * Résolution (toutes les valeurs sont des fractions exactes) :
 *   1. domaine D : u(x) > 0 et v(x) > 0 ;
 *   2. ln est strictement croissante : ln u ⊳ ln v ⇔ u ⊳ v (sur D) ;
 *   3. on isole x : (a₁ − a₂)x ⊳ b₂ − b₁, en changeant le sens si a₁ − a₂ < 0 ;
 *   4. on garde seulement ce qui est dans D (pour une équation : la solution doit appartenir à D, sinon S = ∅).
 * Le tirage vise environ la moitié d'équations dont la solution est dans D, l'autre moitié sans solution.
 */

/* ===== Logique ===== */

export type Exercice = { a1: number; b1: number; a2: number; b2: number; op: '=' | Comparateur };

export type Resolution = {
  domaine: Union;
  domaineTexte: string[];
  sansDomaine: Union | null;
  sensInverse: Union | null;
  solution: Fraction | null; // équation : x* (même s'il est hors du domaine)
  dansDomaine: boolean;
  reponse: Union; // ∅ = []
  frontiere: Fraction;
};

const demi = (a: number, b: number): { u: Union; texte: string } => {
  const r = fraction(-b, a);
  const bor = borne(r.n / r.d, texteFraction(r));
  return { u: demiDroite(bor, a > 0, false), texte: `x ${a > 0 ? '>' : '<'} ${texteFraction(r)}` };
};

const contraireSens = (op: Comparateur): Comparateur => (op === '<' ? '>' : op === '<=' ? '>=' : op === '>' ? '<' : '<=');

export function resoudre({ a1, b1, a2, b2, op }: Exercice): Resolution {
  const du = demi(a1, b1);
  const dv = demi(a2, b2);
  const domaine = intersection(du.u, dv.u);
  const p = a1 - a2;
  const frontiere = fraction(b2 - b1, p); // p x = b2 − b1
  const borneF = borne(frontiere.n / frontiere.d, texteFraction(frontiere));
  if (op === '=') {
    const x = frontiere.n / frontiere.d;
    const dedans = a1 * x + b1 > 1e-12 && a2 * x + b2 > 1e-12;
    return {
      domaine, domaineTexte: [du.texte, dv.texte], sansDomaine: null, sensInverse: null,
      solution: frontiere, dansDomaine: dedans, reponse: dedans ? [{ lo: borneF, hi: borneF, loFerme: true, hiFerme: true }] : [], frontiere,
    };
  }
  const large = op === '<=' || op === '>=';
  const croissant = op === '>' || op === '>=';
  const versLaDroite = p > 0 ? croissant : !croissant;
  const sansDomaine = demiDroite(borneF, versLaDroite, large);
  return {
    domaine, domaineTexte: [du.texte, dv.texte], sansDomaine, sensInverse: intersection(demiDroite(borneF, !versLaDroite, large), domaine),
    solution: null, dansDomaine: true, reponse: intersection(sansDomaine, domaine), frontiere,
  };
}

export function genererExercice(): Exercice {
  for (;;) {
    const a1 = choisir([-1, 1]) * entier(1, 4);
    const a2 = choisir([-1, 1]) * entier(1, 4);
    const b1 = entier(-6, 6);
    const b2 = entier(-6, 6);
    if (a1 === a2) continue;
    const equation = Math.random() < 0.5;
    const op: Exercice['op'] = equation ? '=' : choisir<Comparateur>(['<', '<=', '>', '>=']);
    const exo = { a1, b1, a2, b2, op };
    const r = resoudre(exo);
    if (equation) {
      // une fois sur deux, la solution est hors du domaine
      if (r.dansDomaine !== (Math.random() < 0.5)) continue;
    } else if (r.reponse.length === 0 && Math.random() < 0.7) continue; // peu d'ensembles vides
    return exo;
  }
}

export type Verdict = { type: 'incompris'; raison: string } | { type: 'correct' } | { type: 'faux'; indice: string };

export function verifier(exo: Exercice, saisie: string): Verdict {
  const sol = resoudre(exo);
  if (exo.op === '=') {
    const lue = lireSolution(saisie);
    if (!lue.ok) return { type: 'incompris', raison: lue.message };
    if (sol.dansDomaine) {
      if (lue.vide) return { type: 'faux', indice: "Tu as conclu à l'absence de solution, mais la valeur trouvée appartient bien au domaine." };
      return procheNombre(lue.v, (sol.solution as Fraction).n / (sol.solution as Fraction).d)
        ? { type: 'correct' }
        : { type: 'faux', indice: 'Vérifie ta résolution de u(x) = v(x).' };
    }
    if (lue.vide) return { type: 'correct' };
    return { type: 'faux', indice: "La valeur obtenue en résolvant u(x) = v(x) n'appartient pas au domaine : elle doit être rejetée." };
  }
  const lue = lireEnsemble(saisie);
  if (!lue.ok) return { type: 'incompris', raison: lue.message };
  if (memeUnion(lue.union, sol.reponse)) return { type: 'correct' };
  if (sol.sansDomaine && memeUnion(lue.union, sol.sansDomaine)) {
    return { type: 'faux', indice: "N'oublie pas le domaine : il faut u(x) > 0 et v(x) > 0." };
  }
  if (sol.sensInverse && memeUnion(lue.union, sol.sensInverse)) {
    return { type: 'faux', indice: 'Attention au sens de l’inégalité quand on divise par un nombre négatif.' };
  }
  return { type: 'faux', indice: indiceUnion(lue.union, sol.reponse) };
}

/* ===== Affichage ===== */

const TOUCHES = [
  { label: '÷', texte: '/' },
  { label: ']', texte: ']' },
  { label: '[', texte: '[' },
  { label: ';', texte: ' ; ' },
  { label: '∪', texte: ' ∪ ' },
  { label: '+∞', texte: '+∞' },
  { label: '−∞', texte: '-∞' },
  { label: '∅', texte: '∅' },
];

export default function LnEgalite() {
  const [exo, regenerer] = useTirage(genererExercice);
  const [saisie, setSaisie] = useState('');
  const [verdict, setVerdict] = useState<Verdict | null>(null);

  if (!exo) return <Chargement />;

  const { a1, b1, a2, b2, op } = exo;
  const sol = resoudre(exo);
  const u = combinaison([[a1, 'x'], [b1, '']], true);
  const v = combinaison([[a2, 'x'], [b2, '']], true);
  const p = a1 - a2;
  const sensChange = op !== '=' && p < 0;
  const opFinal: Comparateur | null = op === '=' ? null : sensChange ? contraireSens(op) : op;

  function valider() {
    setVerdict(verifier(exo as Exercice, saisie));
  }

  function nouvelExercice() {
    regenerer();
    setSaisie('');
    setVerdict(null);
  }

  const reponseTexte = op === '=' ? (sol.dansDomaine ? `S = {${texteFraction(sol.frontiere)}}` : 'S = ∅') : `S = ${texteUnion(sol.reponse)}`;

  return (
    <Cadre>
      <Titre />
      <Enonce>
        <p>
          Résous {op === '=' ? "l'équation" : "l'inéquation"} suivante (après avoir déterminé son domaine) :
        </p>
        <div className="exercice-formule">
          <MathTex tex={`\\ln(${u}) ${op === '=' ? '=' : texComparateur(op)} \\ln(${v})`} />
        </div>
      </Enonce>

      <Formulaire onValider={valider}>
        <ChampAvecTouches
          libelle="Ensemble des solutions"
          valeur={saisie}
          onChange={setSaisie}
          maxLength={80}
          placeholder={op === '=' ? 'Ex : 3/2 ou ∅' : 'Ex : ]1/2 ; +∞['}
          aide={
            op === '='
              ? "Écris la solution (un nombre ou une fraction), ou ∅ si l'équation n'a pas de solution."
              : 'Écris une inégalité (x > 2) ou un intervalle avec ses crochets (]2 ; 5/2[). ∅ si aucune solution.'
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
              Ensemble des solutions : <Calcul>{reponseTexte}</Calcul>.
            </p>
          </MessageSucces>
        )}
        {verdict?.type === 'faux' && (
          <Retour type="faux">
            <p>Oups, une erreur s'est glissée. {verdict.indice}</p>
            <Correction>
              <li>
                <strong>Domaine.</strong> Il faut <MathTex tex={`${u} > 0`} /> et <MathTex tex={`${v} > 0`} />, c'est-à-dire{' '}
                <Calcul>{sol.domaineTexte[0]}</Calcul> et <Calcul>{sol.domaineTexte[1]}</Calcul>. Le domaine est <Calcul>D = {texteUnion(sol.domaine)}</Calcul>.
              </li>
              <li>
                La fonction ln est strictement croissante : sur D, <MathTex tex={`\\ln(u) ${op === '=' ? '=' : texComparateur(op)} \\ln(v)`} /> équivaut à{' '}
                <MathTex tex={`${u} ${op === '=' ? '=' : texComparateur(op)} ${v}`} />.
              </li>
              <li>
                On isole x : <MathTex tex={`${combinaison([[p, 'x']], true)} ${op === '=' ? '=' : texComparateur(op)} ${b2 - b1}`} />, donc{' '}
                <MathTex tex={`x ${op === '=' ? '=' : texComparateur(opFinal as Comparateur)} ${texteFraction(sol.frontiere).replace('−', '-')}`} />
                {sensChange ? ' (on a divisé par un nombre négatif : le sens change)' : ''}.
              </li>
              {op === '=' ? (
                <li>
                  {sol.dansDomaine ? (
                    <>
                      Cette valeur appartient à D : <Calcul>{reponseTexte}</Calcul>.
                    </>
                  ) : (
                    <>
                      Cette valeur n'appartient pas à D (elle ne rend pas u(x) et v(x) strictement positifs) : elle est rejetée et <Calcul>S = ∅</Calcul>.
                    </>
                  )}
                </li>
              ) : (
                <li>
                  On garde ce qui est dans D : <Calcul>{reponseTexte}</Calcul>.
                </li>
              )}
            </Correction>
            <Astuce titre="Pour réussir la prochaine fois">
              <ul>
                <li>Commence par le domaine : les deux arguments des ln doivent être strictement positifs.</li>
                <li>Résoudre u(x) = v(x) ne suffit pas : vérifie que la solution est dans le domaine.</li>
                <li>Diviser par un nombre négatif change le sens de l'inégalité.</li>
              </ul>
            </Astuce>
          </Retour>
        )}
      </ZoneRetour>
    </Cadre>
  );
}
