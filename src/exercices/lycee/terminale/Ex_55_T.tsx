import { useState } from 'react';
import MathTex from '@/components/math/MathTex.tsx';
import { Cadre, Chargement, Enonce, Titre, useTirage } from '@/components/exercice/ExerciceUI.tsx';
import Questions, { type Question } from '@/components/exercice/Questions.tsx';
import { choisir, entier, nombre } from '@/lib/maths.ts';

/**
 * Exercice : convexité de f à partir du tableau de variations de f'.
 *
 *   f' décroissante sur un intervalle  ⇒  f'' ≤ 0  ⇒  f concave
 *   f' croissante   sur un intervalle  ⇒  f'' ≥ 0  ⇒  f convexe
 *
 * Tableau : x = a < b < c, valeurs f'(a), f'(b), f'(c) avec f' « en V » (décroît puis croît) ou « en Λ » (croît puis décroît).
 * f' change de sens en b : f'' change de signe en b, qui est donc le point d'inflexion.
 */

/* ===== Logique ===== */

export type Exercice = { a: number; b: number; c: number; fa: number; fb: number; fc: number };

export const premiereDecroit = ({ fa, fb }: Exercice) => fb < fa;

export function genererExercice(): Exercice {
  const a = entier(-5, -2);
  const b = a + entier(2, 4);
  const c = b + entier(2, 4);
  const enV = choisir([true, false]);
  for (;;) {
    const fa = entier(-6, 6);
    const fb = entier(-6, 6);
    const fc = entier(-6, 6);
    if (enV ? fb < fa && fb < fc : fb > fa && fb > fc) return { a, b, c, fa, fb, fc };
  }
}

export const forme = (exo: Exercice, intervalle: 1 | 2): 'convexe' | 'concave' => {
  const decroit = intervalle === 1 ? premiereDecroit(exo) : !premiereDecroit(exo);
  return decroit ? 'concave' : 'convexe';
};

export const questions = (exo: Exercice): Question[] => {
  const { a, b, c } = exo;
  // Valeurs distinctes d'une question à l'autre (préfixe i1- / i2-).
  const options = (id: string) => [
    { valeur: `${id}-convexe`, contenu: 'convexe' },
    { valeur: `${id}-concave`, contenu: 'concave' },
    { valeur: `${id}-ni`, contenu: 'ni convexe ni concave' },
  ];
  return [
    { type: 'choix', id: 'i1', libelle: <>Sur <MathTex tex={`[${nombre(a)}\\,;\\,${nombre(b)}]`} />, f est :</>, attendu: `i1-${forme(exo, 1)}`, options: options('i1'), enLigne: true },
    { type: 'choix', id: 'i2', libelle: <>Sur <MathTex tex={`[${nombre(b)}\\,;\\,${nombre(c)}]`} />, f est :</>, attendu: `i2-${forme(exo, 2)}`, options: options('i2'), enLigne: true },
    {
      type: 'nombre', id: 'inflexion', libelle: <>Abscisse du point d’inflexion de la courbe de f :</>, attendu: b, placeholder: 'Ex : 1',
      aide: 'Un nombre entier, négatif si besoin.',
    },
  ];
};

/* ===== Affichage ===== */

export default function ConvexiteTableau() {
  const [exo, regenerer] = useTirage(genererExercice);
  const [essai, setEssai] = useState(0);
  if (!exo) return <Chargement />;

  const { a, b, c, fa, fb, fc } = exo;
  const decroitD = premiereDecroit(exo);
  const fleche = (decroit: boolean) => (decroit ? '↘' : '↗');
  const i1 = `[${nombre(a)}\\,;\\,${nombre(b)}]`;
  const i2 = `[${nombre(b)}\\,;\\,${nombre(c)}]`;
  const phrase = (decroit: boolean) => (decroit ? 'décroissante' : 'croissante');
  const signe = (decroit: boolean) => (decroit ? '\\le 0' : '\\ge 0');

  return (
    <Cadre>
      <Titre />
      <Enonce>
        <p>
          Soit <MathTex tex="f" /> une fonction deux fois dérivable sur <MathTex tex={`[${nombre(a)}\\,;\\,${nombre(c)}]`} />. On donne le tableau de variations de sa dérivée <MathTex tex="f'" /> :
        </p>
        <div className="exercice-tableau-conteneur">
          <table className="exercice-tableau">
            <thead>
              <tr>
                <th scope="row"><MathTex tex="x" /></th>
                <th>{nombre(a)}</th>
                <th aria-hidden="true"></th>
                <th>{nombre(b)}</th>
                <th aria-hidden="true"></th>
                <th>{nombre(c)}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row"><MathTex tex="f'(x)" /></th>
                <td>{nombre(fa)}</td>
                <td aria-label={decroitD ? 'décroît' : 'croît'}>{fleche(decroitD)}</td>
                <td>{nombre(fb)}</td>
                <td aria-label={decroitD ? 'croît' : 'décroît'}>{fleche(!decroitD)}</td>
                <td>{nombre(fc)}</td>
              </tr>
            </tbody>
          </table>
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
            f est {forme(exo, 1)} sur <MathTex tex={i1} />, {forme(exo, 2)} sur <MathTex tex={i2} />, et son point d’inflexion a pour abscisse <MathTex tex={`${nombre(b)}`} />.
          </p>
        }
        correction={
          <>
            <li>
              Le lien entre f et sa dérivée seconde : <MathTex tex="f'' = (f')'" />. Donc si <MathTex tex="f'" /> est croissante, <MathTex tex="f'' \ge 0" /> et f est convexe ; si <MathTex tex="f'" /> est décroissante, <MathTex tex="f'' \le 0" /> et f est concave.
            </li>
            <li>
              Sur <MathTex tex={i1} />, <MathTex tex="f'" /> est {phrase(decroitD)} : <MathTex tex={`f'' ${signe(decroitD)}`} />, donc f est <strong>{forme(exo, 1)}</strong>.
            </li>
            <li>
              Sur <MathTex tex={i2} />, <MathTex tex="f'" /> est {phrase(!decroitD)} : <MathTex tex={`f'' ${signe(!decroitD)}`} />, donc f est <strong>{forme(exo, 2)}</strong>.
            </li>
            <li>
              La convexité change en <MathTex tex={`x = ${nombre(b)}`} /> (là où <MathTex tex="f'" /> change de sens de variation) : c’est l’abscisse du point d’inflexion.
            </li>
          </>
        }
        conseils={
          <>
            <li>Le tableau donne les variations de <MathTex tex="f'" />, pas celles de f : ne conclus pas sur la croissance de f.</li>
            <li><MathTex tex="f'" /> croissante ⇒ f convexe ; <MathTex tex="f'" /> décroissante ⇒ f concave.</li>
            <li>Un point d’inflexion se trouve là où <MathTex tex="f'" /> change de sens de variation (là où <MathTex tex="f''" /> change de signe).</li>
          </>
        }
      />
    </Cadre>
  );
}
