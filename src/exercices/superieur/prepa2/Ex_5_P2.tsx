import { useState, type ReactNode } from 'react';
import { Cadre, Chargement, Enonce, MathTex, Questions, Titre, choisir, entier, melanger, nombre, useTirage, type Question } from './_commun.ts';

/**
 * Exercice : intérieur, adhérence et frontière d'une partie de ℝ.
 *
 * Trois familles de parties A :
 *   - « intervalles » : A = ]a,b[ ∪ ]b,c[ ∪ (a et/ou c éventuellement ajoutés) ∪ {d}, avec a < b < c < d
 *        int A = ]a,b[ ∪ ]b,c[      adh A = [a,c] ∪ {d}      Fr A = {a,b,c,d}
 *   - « rationnels » : A = [a,b] ∩ ℚ
 *        int A = ∅                  adh A = [a,b]            Fr A = [a,b]
 *   - « suite » : A = { a + 1/n , n ∈ ℕ* }
 *        int A = ∅                  adh A = A ∪ {a}          Fr A = A ∪ {a}
 */

/* ===== Logique ===== */

export type Famille = 'intervalles' | 'rationnels' | 'suite';

export type Exercice = {
  famille: Famille;
  a: number;
  b: number;
  c: number;
  d: number;
  /** pour « intervalles » : a ∈ A ? c ∈ A ? */
  aDansA: boolean;
  cDansA: boolean;
};

export type Reponse = { juste: string; faux: string[] };
export type Reponses = { adherence: Reponse; interieur: Reponse; frontiere: Reponse };

export function genererExercice(): Exercice {
  const famille = choisir<Famille>(['intervalles', 'intervalles', 'rationnels', 'suite']);
  if (famille === 'intervalles') {
    const a = entier(-6, 0);
    const b = a + entier(1, 3);
    const c = b + entier(1, 3);
    const d = c + entier(1, 3);
    return { famille, a, b, c, d, aDansA: choisir([true, false]), cDansA: choisir([true, false]) };
  }
  const a = entier(-5, 3);
  return { famille, a, b: a + entier(1, 4), c: 0, d: 0, aDansA: false, cDansA: false };
}

const pt = (x: number) => nombre(x);
const ouvert = (x: number, y: number) => `]${pt(x)}\\,;\\,${pt(y)}[`;
const ferme = (x: number, y: number) => `[${pt(x)}\\,;\\,${pt(y)}]`;
const singleton = (x: number) => `\\{${pt(x)}\\}`;
const ensemble = (...xs: number[]) => `\\{${xs.map(pt).join(' ; ')}\\}`;

/** La partie A en TeX. */
export function texA(e: Exercice): string {
  const { famille, a, b, c, d } = e;
  if (famille === 'intervalles') {
    const g = e.aDansA ? `[${pt(a)}\\,;\\,${pt(b)}[` : ouvert(a, b);
    const m = e.cDansA ? `]${pt(b)}\\,;\\,${pt(c)}]` : ouvert(b, c);
    return `${g}\\cup${m}\\cup${singleton(d)}`;
  }
  if (famille === 'rationnels') return `[${pt(a)}\\,;\\,${pt(b)}]\\cap\\mathbb Q`;
  return `\\left\\{${pt(a)}+\\dfrac1n\\;:\\;n\\in\\mathbb N^*\\right\\}`;
}

/** Réponses justes et distracteurs (toujours distincts de la bonne réponse). */
export function reponses(e: Exercice): Reponses {
  const { famille, a, b, c, d } = e;
  const A = texA(e);
  let r: { adh: [string, string[]]; int: [string, string[]]; fr: [string, string[]] };
  if (famille === 'intervalles') {
    const ouvA = `${ouvert(a, b)}\\cup${ouvert(b, c)}`;
    r = {
      adh: [`${ferme(a, c)}\\cup${singleton(d)}`, [ferme(a, c), `${ouvert(a, c)}\\cup${singleton(d)}`, A, ferme(a, d)]],
      int: [ouvA, [ouvert(a, c), `${ouvA}\\cup${singleton(d)}`, ferme(a, c), A]],
      fr: [ensemble(a, b, c, d), [ensemble(a, c, d), ensemble(a, c), ensemble(a, b, c), ensemble(b, d)]],
    };
  } else if (famille === 'rationnels') {
    r = {
      adh: [ferme(a, b), [`${ferme(a, b)}\\cap\\mathbb Q`, ouvert(a, b), '\\mathbb R', `${ouvert(a, b)}\\cap\\mathbb Q`]],
      int: ['\\varnothing', [ouvert(a, b), ferme(a, b), `${ouvert(a, b)}\\cap\\mathbb Q`, singleton(a)]],
      fr: [ferme(a, b), [ensemble(a, b), '\\varnothing', `${ferme(a, b)}\\cap\\mathbb Q`, `\\mathbb R\\setminus${ouvert(a, b)}`]],
    };
  } else {
    const AUa = `${A}\\cup${singleton(a)}`;
    r = {
      adh: [AUa, [A, ferme(a, a + 1), singleton(a), '\\varnothing']],
      int: ['\\varnothing', [A, singleton(a), ouvert(a, a + 1), ferme(a, a + 1)]],
      fr: [AUa, [singleton(a), A, '\\varnothing', ferme(a, a + 1)]],
    };
  }
  const fabrique = ([juste, pool]: [string, string[]]): Reponse => {
    const faux: string[] = [];
    for (const p of pool) if (p !== juste && !faux.includes(p)) faux.push(p);
    return { juste, faux: faux.slice(0, 3) };
  };
  return { adherence: fabrique(r.adh), interieur: fabrique(r.int), frontiere: fabrique(r.fr) };
}

/** Options mélangées une seule fois par tirage (ordre stable entre deux affichages). */
function options(id: string, rep: Reponse, ordre: number[]) {
  const toutes = [rep.juste, ...rep.faux];
  return ordre.slice(0, toutes.length).map((i) => ({ valeur: `${id}-${i}`, texte: toutes[i] }));
}

export const questions = (exo: Exercice, ordres: number[][]): Question[] => {
  const rep = reponses(exo);
  const fabrique = (id: string, libelle: ReactNode, r: Reponse, ordre: number[]): Question => {
    const opts = options(id, r, ordre);
    return {
      type: 'choix', id, libelle, attendu: opts.find((o) => o.texte === r.juste)!.valeur,
      options: opts.map((o) => ({ valeur: o.valeur, contenu: <MathTex tex={o.texte} /> })), enLigne: false,
    };
  };
  return [
    fabrique('adh', <>L’adhérence <MathTex tex="\overline{A}" /> est :</>, rep.adherence, ordres[0]),
    fabrique('int', <>L’intérieur <MathTex tex="\mathring{A}" /> est :</>, rep.interieur, ordres[1]),
    fabrique('fr', <>La frontière <MathTex tex="\mathrm{Fr}(A)" /> est :</>, rep.frontiere, ordres[2]),
  ];
};

type Tirage = Exercice & { ordres: number[][] };
export const tirer = (): Tirage => ({ ...genererExercice(), ordres: [0, 1, 2].map(() => melanger([0, 1, 2, 3])) });

/* ===== Affichage ===== */

export default function Topologie() {
  const [tirage, regenerer] = useTirage(tirer);
  const [essai, setEssai] = useState(0);
  if (!tirage) return <Chargement />;

  const exo = tirage;
  const { famille, a, b, c, d } = exo;
  const rep = reponses(exo);

  return (
    <Cadre>
      <Titre />
      <Enonce>
        <p>
          Dans <MathTex tex="\mathbb R" /> muni de la valeur absolue, on considère la partie :
        </p>
        <p style={{ textAlign: 'center' }}>
          <MathTex tex={`A=${texA(exo)}`} />
        </p>
        <p>
          Détermine son adhérence, son intérieur et sa frontière (<MathTex tex="\mathrm{Fr}(A)=\overline{A}\setminus\mathring{A}" />).
        </p>
      </Enonce>
      <Questions
        key={essai}
        questions={questions(exo, tirage.ordres)}
        onNouveau={() => {
          regenerer();
          setEssai((e) => e + 1);
        }}
        succes={
          <p>
            <MathTex tex={`\\overline{A}=${rep.adherence.juste}`} />, <MathTex tex={`\\mathring{A}=${rep.interieur.juste}`} /> et <MathTex tex={`\\mathrm{Fr}(A)=${rep.frontiere.juste}`} />.
          </p>
        }
        correction={
          <>
            {famille === 'intervalles' && (
              <>
                <li>
                  L’<strong>adhérence</strong> ajoute à <MathTex tex="A" /> les points qui en sont limites. Les bornes <MathTex tex={`${pt(a)}`} />, <MathTex tex={`${pt(b)}`} /> et <MathTex tex={`${pt(c)}`} /> sont limites de points de <MathTex tex="A" />, qu’elles appartiennent à <MathTex tex="A" /> ou non ; le point isolé <MathTex tex={`${pt(d)}`} /> appartient à <MathTex tex="A" />. Donc <MathTex tex={`\\overline{A}=${rep.adherence.juste}`} />.
                </li>
                <li>
                  L’<strong>intérieur</strong> est l’ensemble des points autour desquels tout un intervalle est contenu dans <MathTex tex="A" />. On garde les points des intervalles ouverts ; on perd <MathTex tex={`${pt(b)}`} /> (absent de <MathTex tex="A" />), les bornes, et le point isolé <MathTex tex={`${pt(d)}`} />. Donc <MathTex tex={`\\mathring{A}=${rep.interieur.juste}`} />.
                </li>
                <li>
                  <MathTex tex={`\\mathrm{Fr}(A)=\\overline{A}\\setminus\\mathring{A}=${rep.frontiere.juste}`} />.
                </li>
              </>
            )}
            {famille === 'rationnels' && (
              <>
                <li>
                  Tout intervalle ouvert non vide contient des rationnels <strong>et</strong> des irrationnels (densité de <MathTex tex="\mathbb Q" /> et de <MathTex tex="\mathbb R\setminus\mathbb Q" />). Donc tout point de <MathTex tex={ferme(a, b)} /> est limite de rationnels de <MathTex tex={ferme(a, b)} /> : <MathTex tex={`\\overline{A}=${rep.adherence.juste}`} />, et aucun point hors de ce segment n’est adhérent.
                </li>
                <li>
                  Aucun intervalle ouvert non vide n’est contenu dans <MathTex tex="A" /> (il contiendrait des irrationnels) : <MathTex tex="\mathring{A}=\varnothing" />.
                </li>
                <li>
                  <MathTex tex={`\\mathrm{Fr}(A)=\\overline{A}\\setminus\\mathring{A}=${rep.frontiere.juste}`} /> : la frontière est ici « grosse ».
                </li>
              </>
            )}
            {famille === 'suite' && (
              <>
                <li>
                  <MathTex tex="A" /> est l’ensemble des termes de la suite <MathTex tex={`u_n=${pt(a)}+1/n`} />, qui converge vers <MathTex tex={`${pt(a)}`} />. La limite est adhérente à <MathTex tex="A" /> mais n’en fait pas partie : <MathTex tex={`\\overline{A}=A\\cup${singleton(a)}`} />. (Chaque terme est un point isolé de <MathTex tex="A" />.)
                </li>
                <li>
                  Autour d’un point <MathTex tex="u_n" /> il y a des réels qui ne sont pas dans <MathTex tex="A" /> (<MathTex tex="A" /> est dénombrable, un intervalle ne l’est pas) : <MathTex tex="\mathring{A}=\varnothing" />.
                </li>
                <li>
                  Comme l’intérieur est vide, <MathTex tex="\mathrm{Fr}(A)=\overline{A}=A\cup\{a\}" />, c’est-à-dire ici <MathTex tex={`\\mathrm{Fr}(A)=${rep.frontiere.juste}`} />.
                </li>
              </>
            )}
          </>
        }
        conseils={
          <>
            <li><MathTex tex="x" /> est adhérent à <MathTex tex="A" /> si <strong>tout</strong> intervalle ouvert autour de <MathTex tex="x" /> rencontre <MathTex tex="A" /> ; <MathTex tex="x" /> est intérieur si <strong>un</strong> intervalle ouvert autour de <MathTex tex="x" /> est inclus dans <MathTex tex="A" />.</li>
            <li>Que les bornes appartiennent ou non à <MathTex tex="A" /> ne change <strong>ni</strong> l’adhérence, <strong>ni</strong> l’intérieur, <strong>ni</strong> la frontière d’un intervalle.</li>
            <li>Un point isolé de <MathTex tex="A" /> est adhérent mais jamais intérieur. Et toujours : <MathTex tex="\mathring{A}\subset A\subset\overline{A}" />.</li>
          </>
        }
      />
    </Cadre>
  );
}
