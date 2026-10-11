import { Fragment, useState } from 'react';
import MathTex from '@/components/math/MathTex.tsx';
import { Cadre, Chargement, Enonce, Titre, useTirage } from '@/components/exercice/ExerciceUI.tsx';
import Questions, { type Question } from '@/components/exercice/Questions.tsx';
import { choisir, entier, signeAleatoire } from '@/lib/maths.ts';

/**
 * Exercice : combien de solutions pour f(x) = 0 d'après un tableau de variations ?
 *
 * f est continue et strictement monotone sur chaque « morceau » du tableau (de 0 à +∞).
 * Sur un morceau qui va de la valeur u à la valeur v (v peut être une limite en +∞) :
 *   - exactement UNE solution si u et v sont de signes contraires (théorème des valeurs intermédiaires + stricte monotonie) ;
 *   - AUCUNE sinon.
 * Le nombre de solutions est la somme sur les morceaux. Les valeurs du tableau ne sont jamais nulles.
 */

/* ===== Logique ===== */

export type Exercice = {
  /** Valeurs successives (en 0, éventuellement en x0, puis la limite en +∞). */
  valeurs: number[];
  /** Abscisse du changement de sens (si le tableau a 3 colonnes de valeurs), sinon null. */
  x0: number | null;
};

const nonNul = (max: number) => signeAleatoire() * entier(1, max);

function tirer(): Exercice {
  const type = choisir(['dec', 'inc', 'dec_inc', 'inc_dec']);
  for (;;) {
    const P = nonNul(6);
    const m = nonNul(6);
    const L = nonNul(6);
    if (type === 'dec' && L < P) return { valeurs: [P, L], x0: null };
    if (type === 'inc' && L > P) return { valeurs: [P, L], x0: null };
    if (type === 'dec_inc' && m < P && m < L) return { valeurs: [P, m, L], x0: entier(1, 4) };
    if (type === 'inc_dec' && m > P && m > L) return { valeurs: [P, m, L], x0: entier(1, 4) };
  }
}

/** Nombre de solutions de f(x) = 0 sur [0 ; +∞[ . */
export function nombreSolutions({ valeurs }: Exercice): number {
  let total = 0;
  for (let i = 0; i + 1 < valeurs.length; i++) if (valeurs[i] * valeurs[i + 1] < 0) total += 1;
  return total;
}

/** On tire d'abord le nombre de solutions voulu (0, 1 ou 2), puis un tableau qui y correspond : les trois cas sont équilibrés. */
export function genererExercice(): Exercice {
  const voulu = entier(0, 2);
  for (;;) {
    const exo = tirer();
    if (nombreSolutions(exo) === voulu) return exo;
  }
}

export const questions = (exo: Exercice): Question[] => [
  {
    type: 'choix',
    id: 'nb',
    libelle: <>Combien de solutions l’équation <MathTex tex="f(x) = 0" /> admet-elle sur <MathTex tex="[0\,;\,+\infty[" /> ?</>,
    attendu: String(nombreSolutions(exo)),
    enLigne: true,
    options: [
      { valeur: '0', contenu: 'aucune' },
      { valeur: '1', contenu: 'exactement une' },
      { valeur: '2', contenu: 'exactement deux' },
    ],
  },
];

/* ===== Affichage ===== */

const signe = (v: number) => (v > 0 ? 'positif' : 'négatif');

export default function TableauVariations() {
  const [exo, regenerer] = useTirage(genererExercice);
  const [essai, setEssai] = useState(0);
  if (!exo) return <Chargement />;

  const { valeurs, x0 } = exo;
  const nb = nombreSolutions(exo);
  const abscisses = x0 === null ? ['0', '+\\infty'] : ['0', String(x0), '+\\infty'];
  const flechesTex = valeurs.slice(0, -1).map((v, i) => (valeurs[i + 1] > v ? '\\nearrow' : '\\searrow'));
  const fleches = valeurs.slice(0, -1).map((v, i) => (valeurs[i + 1] > v ? 'croissante' : 'décroissante'));

  return (
    <Cadre>
      <Titre />
      <Enonce>
        <p>
          Soit <MathTex tex="f" /> une fonction continue sur <MathTex tex="[0\,;\,+\infty[" /> dont voici le tableau de variations (la valeur en <MathTex tex="+\infty" /> est la limite de f).
        </p>
        <div className="exercice-tableau-conteneur">
          <table className="exercice-tableau">
            <tbody>
              <tr>
                <th scope="row"><MathTex tex="x" /></th>
                {abscisses.map((x, i) => (
                  <Fragment key={i}>
                    {i > 0 && <td />}
                    <td><MathTex tex={x} /></td>
                  </Fragment>
                ))}
              </tr>
              <tr>
                <th scope="row"><MathTex tex="f(x)" /></th>
                {valeurs.map((v, i) => (
                  <Fragment key={i}>
                    {i > 0 && <td><MathTex tex={flechesTex[i - 1]} /></td>}
                    <td><MathTex tex={String(v)} /></td>
                  </Fragment>
                ))}
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
            L’équation <MathTex tex="f(x) = 0" /> a {nb === 0 ? 'aucune solution' : nb === 1 ? 'exactement une solution' : 'exactement deux solutions'} sur <MathTex tex="[0\,;\,+\infty[" />.
          </p>
        }
        correction={
          <>
            <li>f est continue et strictement monotone sur chaque intervalle du tableau : on étudie les intervalles un par un.</li>
            {valeurs.slice(0, -1).map((v, i) => {
              const w = valeurs[i + 1];
              const oppose = v * w < 0;
              const intervalle = i === valeurs.length - 2 ? `[${abscisses[i]}\\,;\\,+\\infty[` : `[${abscisses[i]}\\,;\\,${abscisses[i + 1]}]`;
              return (
                <li key={i}>
                  Sur <MathTex tex={intervalle} />, f est {fleches[i]}, avec <MathTex tex={`${v}`} /> ({signe(v)}) au début et {i === valeurs.length - 2 ? 'pour limite ' : ''}
                  <MathTex tex={`${w}`} /> ({signe(w)}) à la fin :{' '}
                  {oppose
                    ? 'les signes sont contraires, donc 0 est atteint une fois et une seule (théorème des valeurs intermédiaires, f strictement monotone) : 1 solution.'
                    : 'les deux valeurs ont le même signe, et f est monotone : elle ne s’annule pas sur cet intervalle : 0 solution.'}
                </li>
              );
            })}
            <li>
              Au total : <strong>{nb}</strong> solution{nb > 1 ? 's' : ''} de <MathTex tex="f(x) = 0" /> sur <MathTex tex="[0\,;\,+\infty[" />.
            </li>
          </>
        }
        conseils={
          <>
            <li>Étudie chaque colonne du tableau séparément : un intervalle sur lequel f est strictement monotone contient au plus une solution.</li>
            <li>Pour qu’il y ait une solution sur un intervalle, les valeurs aux deux extrémités doivent être de signes contraires.</li>
            <li>N’oublie pas le dernier intervalle, vers +∞ : sa « valeur d’arrivée » est la limite de f.</li>
          </>
        }
      />
    </Cadre>
  );
}
