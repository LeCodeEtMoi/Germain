import { useState } from 'react';
import MathTex from './MathTex.tsx';
import {
  Astuce, Boutons, Cadre, Calcul, ChampAvecTouches, Chargement, Correction, Enonce, Formulaire, MessageIncompris, MessageSucces,
  Retour, Titre, ZoneRetour, useTirage,
} from './ExerciceUI.tsx';
import { choisir, valeurDuTexte } from '../lib/maths.ts';
import {
  type Ang, type Domaine, type FonctionTrig, type ValeurTrig, DOMAINE_2PI, DOMAINE_PI, VALEURS, dansDomaineNum, fonction, racines,
  texAng, texteAng, valeur,
} from '../lib/trigo.ts';

/**
 * Exercice : résoudre une équation trigonométrique sin(x) = v ou cos(x) = v dans ]−π ; π] ou dans [0 ; 2π].
 *
 * v est tirée parmi 0, ±1/2, ±√2/2, ±√3/2, ±1. Les solutions sont calculées par racines() (arcsin / arccos et leurs
 * symétriques, ramenées dans le domaine), pas écrites à la main.
 *
 * Correction : la saisie est une liste (π/3 ; −π/3, ou « x = π/3 ou x = −π/3 ») ; chaque nombre est lu comme une
 * expression et comparé par sa valeur aux solutions exactes. On signale une solution oubliée, une valeur qui n'est
 * pas solution, ou une solution hors du domaine (par exemple −π dans ]−π ; π]).
 */

/* ===== Logique ===== */

export type Exercice = { t: FonctionTrig; v: ValeurTrig; domaine: Domaine; solutions: Ang[] };

export function genererExercice(): Exercice {
  const t = choisir<FonctionTrig>(['sin', 'cos']);
  const v = choisir(VALEURS);
  const domaine = choisir([DOMAINE_PI, DOMAINE_2PI]);
  return { t, v, domaine, solutions: racines(t, v, domaine) };
}

const proche = (x: number, y: number) => Math.abs(x - y) < 1e-9;

export type LectureListe = { ok: true; valeurs: { texte: string; v: number }[] } | { ok: false; message: string };

/** Lit « π/3 ; −π/3 », « x = π/3 ou x = -π/3 », « {π/3, -π/3} »… */
export function lireListe(saisie: string): LectureListe {
  const brut = saisie.replace(/[−–—]/g, '-').replace(/[{}]/g, ' ').replace(/^\s*s\s*=/i, '').trim();
  if (brut === '') return { ok: false, message: 'Écris tes solutions avant de valider.' };
  if (/^(∅|vide|aucune?(\s+solution)?)$/i.test(brut)) return { ok: true, valeurs: [] };
  const morceaux = brut
    .split(/\s*(?:;|,|\bet\b|\bou\b)\s*/i)
    .map((m) => m.replace(/^\s*x\s*=\s*/i, '').trim())
    .filter((m) => m !== '');
  const valeurs: { texte: string; v: number }[] = [];
  for (const m of morceaux) {
    const v = valeurDuTexte(m);
    if (v === null) return { ok: false, message: `Je ne comprends pas « ${m} ». Écris des angles comme π/3, -π/6 ou 5π/6, séparés par des points-virgules.` };
    if (!valeurs.some((x) => proche(x.v, v))) valeurs.push({ texte: m, v });
  }
  return { ok: true, valeurs };
}

export type Verdict =
  | { type: 'incompris'; raison: string }
  | { type: 'correct' }
  | { type: 'faux'; manquantes: number; horsDomaine: string[]; fausses: string[] };

export function verifier(exo: Exercice, saisie: string): Verdict {
  const lue = lireListe(saisie);
  if (!lue.ok) return { type: 'incompris', raison: lue.message };
  const attendues = exo.solutions.map(valeur);
  const f = fonction(exo.t);
  const manquantes = attendues.filter((a) => !lue.valeurs.some((l) => proche(l.v, a))).length;
  const inutiles = lue.valeurs.filter((l) => !attendues.some((a) => proche(l.v, a)));
  if (manquantes === 0 && inutiles.length === 0) return { type: 'correct' };
  const horsDomaine = inutiles.filter((l) => proche(f(l.v), exo.v.num) && !dansDomaineNum(l.v, exo.domaine)).map((l) => l.texte);
  const fausses = inutiles.filter((l) => !proche(f(l.v), exo.v.num)).map((l) => l.texte);
  return { type: 'faux', manquantes, horsDomaine, fausses };
}

/* ===== Affichage ===== */

const TOUCHES = [
  { label: 'π', texte: 'π' },
  { label: '÷', texte: '/' },
  { label: '−', texte: '-' },
  { label: ';', texte: ' ; ' },
];

const ensemble = (liste: Ang[]) => `\\left\\{ ${liste.map(texAng).join(' \\, ; \\, ')} \\right\\}`;

export default function EquationTrigo() {
  const [exo, regenerer] = useTirage(genererExercice);
  const [saisie, setSaisie] = useState('');
  const [verdict, setVerdict] = useState<Verdict | null>(null);

  if (!exo) return <Chargement />;

  const { t, v, domaine, solutions } = exo;
  const tex = `\\${t}(x) = ${v.tex}`;
  const alpha = t === 'sin' ? v.asin : v.acos;

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
          Résous dans l'intervalle <Calcul>{domaine.texte}</Calcul> l'équation :
        </p>
        <div className="exercice-formule">
          <MathTex tex={tex} />
        </div>
      </Enonce>

      <Formulaire onValider={valider}>
        <ChampAvecTouches
          libelle="Solutions (séparées par des points-virgules)"
          valeur={saisie}
          onChange={setSaisie}
          maxLength={80}
          placeholder="Ex : π/3 ; -π/3"
          aide="Écris les solutions exactes avec π (π/6, 5π/6, -π/4…). Une seule solution : écris-la seule."
          touches={TOUCHES}
        />
        <Boutons onNouveau={nouvelExercice} />
      </Formulaire>

      <ZoneRetour>
        {verdict?.type === 'incompris' && <MessageIncompris raison={verdict.raison} />}
        {verdict?.type === 'correct' && (
          <MessageSucces>
            <p>
              L'ensemble des solutions est bien <MathTex tex={`S = ${ensemble(solutions)}`} />.
            </p>
          </MessageSucces>
        )}
        {verdict?.type === 'faux' && (
          <Retour type="faux">
            <p>
              Oups, une erreur s'est glissée.
              {verdict.manquantes > 0 && ` Il manque ${verdict.manquantes === 1 ? 'une solution' : `${verdict.manquantes} solutions`}.`}
              {verdict.fausses.length > 0 && ` Ce n'est pas une solution : ${verdict.fausses.join(' ; ')}.`}
              {verdict.horsDomaine.length > 0 && ` ${verdict.horsDomaine.join(' ; ')} est solution de l'équation mais n'est pas dans ${domaine.texte}.`}
            </p>
            <Correction>
              <li>
                On reconnaît une valeur remarquable : <MathTex tex={`${t === 'sin' ? '\\sin' : '\\cos'}\\left(${texAng(alpha)}\\right) = ${v.tex}`} />.
              </li>
              <li>
                {t === 'sin' ? (
                  <>
                    <MathTex tex="\sin(x) = \sin(\alpha)" /> équivaut à <MathTex tex="x = \alpha + 2k\pi" /> ou{' '}
                    <MathTex tex="x = \pi - \alpha + 2k\pi" />, avec <MathTex tex={`\\alpha = ${texAng(alpha)}`} /> et k entier.
                  </>
                ) : (
                  <>
                    <MathTex tex="\cos(x) = \cos(\alpha)" /> équivaut à <MathTex tex="x = \alpha + 2k\pi" /> ou{' '}
                    <MathTex tex="x = -\alpha + 2k\pi" />, avec <MathTex tex={`\\alpha = ${texAng(alpha)}`} /> et k entier.
                  </>
                )}
              </li>
              <li>
                On garde les valeurs de k pour lesquelles x est dans <Calcul>{domaine.texte}</Calcul>
                {domaine.hiFerme && domaine.lo.n !== 0 ? ' (attention : −π est exclu, π est inclus)' : ''}.
              </li>
              <li>
                Solutions : <MathTex tex={`S = ${ensemble(solutions)}`} /> ({solutions.map(texteAng).join(' ; ')}).
              </li>
            </Correction>
            <Astuce titre="Pour réussir la prochaine fois">
              <ul>
                <li>Pense aux deux familles de solutions : pour sin, α et π − α ; pour cos, α et −α.</li>
                <li>Ajoute 2kπ puis garde seulement les solutions situées dans l'intervalle demandé.</li>
                <li>Regarde les bornes : −π n'appartient pas à ]−π ; π], π y appartient.</li>
              </ul>
            </Astuce>
          </Retour>
        )}
      </ZoneRetour>
    </Cadre>
  );
}
