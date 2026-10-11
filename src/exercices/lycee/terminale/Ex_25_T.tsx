import { useState } from 'react';
import MathTex from '@/components/math/MathTex.tsx';
import {
  Astuce, Boutons, Cadre, Champ, Chargement, Choix, Correction, Enonce, Formulaire, MessageIncompris, MessageSucces, Retour, Titre,
  ZoneRetour, useTirage,
} from '@/components/exercice/ExerciceUI.tsx';
import { type Fraction, choisir, combinaison, entier, fraction, texteFraction, valeurDuTexte } from '@/lib/maths.ts';
import type { FonctionTrig } from '@/lib/trigo.ts';

/**
 * Exercice : étudier une fonction trigonométrique du second degré  f(x) = a·t(x)² + b·t(x),  t = cos ou sin.
 *
 * Trois questions :
 *   1. la période de f (2π : f(x + π) = a·t² − b·t ≠ f(x) car b ≠ 0) ;
 *   2. la valeur maximale de f sur ℝ ;
 *   3. la valeur minimale de f sur ℝ.
 * On pose u = t(x) : u décrit tout [−1 ; 1], donc le maximum et le minimum de f sont ceux de g(u) = a·u² + b·u sur
 * [−1 ; 1]. Ils sont atteints en u = −1, en u = 1 ou au sommet u = −b/(2a) s'il est dans [−1 ; 1] : on compare ces
 * valeurs EXACTES (fractions). Les réponses sont lues comme des nombres (fractions, décimaux) et comparées par leur valeur.
 */

/* ===== Logique ===== */

export type Exercice = { t: FonctionTrig; a: number; b: number };

export type Extrema = {
  max: Fraction;
  min: Fraction;
  sommet: { u: Fraction; valeur: Fraction } | null; // sommet de la parabole s'il est dans [−1 ; 1]
  gMoins1: number;
  gPlus1: number;
};

export function genererExercice(): Exercice {
  return { t: choisir<FonctionTrig>(['cos', 'sin']), a: entier(1, 3), b: choisir([-1, 1]) * entier(1, 6) };
}

/** Maximum et minimum de g(u) = a·u² + b·u sur [−1 ; 1], exacts. */
export function extrema({ a, b }: Exercice): Extrema {
  const gMoins1 = a - b;
  const gPlus1 = a + b;
  const candidats: Fraction[] = [fraction(gMoins1), fraction(gPlus1)];
  const u = fraction(-b, 2 * a);
  let sommet: Extrema['sommet'] = null;
  if (Math.abs(u.n) <= u.d) {
    sommet = { u, valeur: fraction(-b * b, 4 * a) };
    candidats.push(sommet.valeur);
  }
  const num = (f: Fraction) => f.n / f.d;
  const max = candidats.reduce((m, c) => (num(c) > num(m) ? c : m));
  const min = candidats.reduce((m, c) => (num(c) < num(m) ? c : m));
  return { max, min, sommet, gMoins1, gPlus1 };
}

export const PERIODES = [
  { valeur: 'pi', texte: 'π' },
  { valeur: '2pi', texte: '2π' },
  { valeur: '4pi', texte: '4π' },
  { valeur: 'aucune', texte: "f n'est pas périodique" },
];

export type Verdict =
  | { type: 'incompris'; raison: string }
  | { type: 'resultat'; periode: boolean; max: boolean; min: boolean };

const proche = (v: number, f: Fraction) => Math.abs(v - f.n / f.d) < 1e-9;

export function verifier(exo: Exercice, periode: string | null, saisieMax: string, saisieMin: string): Verdict {
  if (periode === null) return { type: 'incompris', raison: 'Choisis la période de f.' };
  const lire = (s: string, nom: string) => {
    if (s.trim() === '') return { erreur: `Écris la valeur ${nom} de f.` };
    const v = valeurDuTexte(s.replace(/[−–—]/g, '-'));
    return v === null ? { erreur: `Je ne comprends pas la valeur ${nom} : écris un nombre (3, -1/2, 2,5).` } : { v };
  };
  const m = lire(saisieMax, 'maximale');
  if ('erreur' in m) return { type: 'incompris', raison: m.erreur as string };
  const n = lire(saisieMin, 'minimale');
  if ('erreur' in n) return { type: 'incompris', raison: n.erreur as string };
  const e = extrema(exo);
  return { type: 'resultat', periode: periode === '2pi', max: proche(m.v as number, e.max), min: proche(n.v as number, e.min) };
}

/* ===== Affichage ===== */

export default function EtudeTrig() {
  const [exo, regenerer] = useTirage(genererExercice);
  const [periode, setPeriode] = useState<string | null>(null);
  const [max, setMax] = useState('');
  const [min, setMin] = useState('');
  const [verdict, setVerdict] = useState<Verdict | null>(null);

  if (!exo) return <Chargement />;

  const { t, a, b } = exo;
  const nom = t === 'cos' ? '\\cos' : '\\sin';
  const fTex = combinaison([[a, `${nom}^{2}(x)`], [b, `${nom}(x)`]], true);
  const e = extrema(exo);
  const gTex = combinaison([[a, 'u^{2}'], [b, 'u']], true);

  function valider() {
    setVerdict(verifier(exo as Exercice, periode, max, min));
  }

  function nouvelExercice() {
    regenerer();
    setPeriode(null);
    setMax('');
    setMin('');
    setVerdict(null);
  }

  const reussi = verdict?.type === 'resultat' && verdict.periode && verdict.max && verdict.min;

  return (
    <Cadre>
      <Titre />
      <Enonce>
        <p>On considère la fonction f définie sur ℝ par :</p>
        <div className="exercice-formule">
          <MathTex tex={`f(x) = ${fTex}`} />
        </div>
      </Enonce>

      <Formulaire onValider={valider}>
        <Choix
          legende="1. La période de f (la plus petite période positive) est :"
          enLigne
          valeur={periode}
          onChange={setPeriode}
          options={PERIODES.map((p) => ({ valeur: p.valeur, contenu: p.texte }))}
        />
        <Champ
          libelle="2. Valeur maximale de f sur ℝ"
          valeur={max}
          onChange={setMax}
          maxLength={20}
          placeholder="Ex : 3 ou -1/2"
          aide="Un nombre : entier, fraction (-9/4) ou décimal."
        />
        <Champ libelle="3. Valeur minimale de f sur ℝ" valeur={min} onChange={setMin} maxLength={20} placeholder="Ex : -9/4" />
        <Boutons onNouveau={nouvelExercice} />
      </Formulaire>

      <ZoneRetour>
        {verdict?.type === 'incompris' && <MessageIncompris raison={verdict.raison} />}
        {reussi && (
          <MessageSucces>
            <p>
              f a pour période 2π, un maximum de {texteFraction(e.max)} et un minimum de {texteFraction(e.min)}.
            </p>
          </MessageSucces>
        )}
        {verdict?.type === 'resultat' && !reussi && (
          <Retour type="faux">
            <p>
              Oups, une erreur s'est glissée :{' '}
              {[!verdict.periode && 'la période', !verdict.max && 'le maximum', !verdict.min && 'le minimum'].filter(Boolean).join(', ')} {' '}
              {[verdict.periode, verdict.max, verdict.min].filter((x) => !x).length > 1 ? 'sont à revoir' : 'est à revoir'}.
            </p>
            <Correction>
              <li>
                <strong>Période.</strong> {nom === '\\cos' ? 'cos' : 'sin'} a pour période 2π, donc f(x + 2π) = f(x) : 2π est une période. Mais f(x + π) ={' '}
                <MathTex tex={`${combinaison([[a, `${nom}^{2}(x)`], [-b, `${nom}(x)`]], true)}`} />, différent de f(x) puisque b = {b} n'est pas nul :
                π n'est pas une période. La plus petite période est 2π.
              </li>
              <li>
                <strong>Changement de variable.</strong> On pose <MathTex tex={`u = ${nom}(x)`} />. Quand x décrit ℝ, u prend toutes les valeurs de [−1 ; 1], et{' '}
                <MathTex tex={`f(x) = g(u)`} /> avec <MathTex tex={`g(u) = ${gTex}`} />.
              </li>
              <li>
                <strong>Étude de g sur [−1 ; 1].</strong> Les valeurs aux bornes sont <MathTex tex={`g(-1) = ${e.gMoins1}`} /> et <MathTex tex={`g(1) = ${e.gPlus1}`} />.{' '}
                {e.sommet ? (
                  <>
                    Le sommet de la parabole est en <MathTex tex={`u = -\\frac{b}{2a} = ${e.sommet.u.d === 1 ? e.sommet.u.n : `${e.sommet.u.n < 0 ? '-' : ''}\\frac{${Math.abs(e.sommet.u.n)}}{${e.sommet.u.d}}`}`} />, qui est dans [−1 ; 1] :{' '}
                    <MathTex tex={`g\\left(-\\frac{b}{2a}\\right) = -\\frac{b^{2}}{4a} = ${e.sommet.valeur.d === 1 ? e.sommet.valeur.n : `${e.sommet.valeur.n < 0 ? '-' : ''}\\frac{${Math.abs(e.sommet.valeur.n)}}{${e.sommet.valeur.d}}`}`} />{' '}
                    (c'est un minimum, car a &gt; 0).
                  </>
                ) : (
                  <>
                    Le sommet de la parabole <MathTex tex={`u = ${-b}/${2 * a}`} /> n'est pas dans [−1 ; 1] : g est monotone sur [−1 ; 1] et ses extrema sont aux bornes.
                  </>
                )}
              </li>
              <li>
                En comparant les valeurs, le maximum de f est <strong>{texteFraction(e.max)}</strong> et son minimum est <strong>{texteFraction(e.min)}</strong>.
              </li>
            </Correction>
            <Astuce titre="Pour réussir la prochaine fois">
              <ul>
                <li>Pose u = cos(x) ou u = sin(x) : tu te ramènes à un trinôme sur [−1 ; 1].</li>
                <li>Un trinôme avec a &gt; 0 a son minimum au sommet −b/(2a), et son maximum à une borne de l'intervalle.</li>
                <li>Compare toujours les valeurs aux bornes et au sommet (s'il est dans l'intervalle).</li>
                <li>Pour la période, teste f(x + π) : si le résultat est différent de f(x), π n'est pas une période.</li>
              </ul>
            </Astuce>
          </Retour>
        )}
      </ZoneRetour>
    </Cadre>
  );
}
