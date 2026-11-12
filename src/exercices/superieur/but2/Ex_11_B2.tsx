import { useState } from 'react';
import { Cadre, Chargement, Enonce, MathTex, Questions, Titre, choisir, factorielle, texMat, useTirage, type Question } from './_commun.ts';
import { PHRASES, decouperBlocs, hasard, inverserPermutation, permutationAleatoire, permuterBloc, verifierTexte } from './_crypto.ts';

/**
 * Exercice : chiffrement par permutation de blocs.
 *
 *   Le message (espaces notés _) est découpé en blocs de n symboles, le dernier
 *   complété par des _. Dans chaque bloc, la case i du chiffré reçoit la lettre
 *   n° K(i) du clair.
 *
 *   Q1 : chiffrer le message avec la clé K affichée.
 *   Q2 : nombre de clés possibles pour des blocs de n symboles → n!.
 */

/* ===== Logique ===== */

export type Exercice = { phrase: string; n: number; cle: number[] };

export function genererExercice(): Exercice {
  const n = hasard(4, 6);
  return { phrase: choisir(PHRASES), n, cle: permutationAleatoire(n) };
}

export const blocsClairs = ({ phrase, n }: Exercice) => decouperBlocs(phrase, n);
export const blocsChiffres = (exo: Exercice) => blocsClairs(exo).map((b) => permuterBloc(b, exo.cle));

export const questions = (exo: Exercice): Question[] => [
  {
    type: 'expression',
    id: 'chiffre',
    libelle: <>Chiffre le message avec la clé <MathTex tex="K" />.</>,
    verifier: verifierTexte(blocsChiffres(exo).join(''), { espaces: true, bourrage: true }),
    placeholder: 'Ex : SEL_B AHT_M …',
    aide: 'Note l’espace avec _ ; les espaces entre les blocs sont ignorés.',
    touches: [{ label: '␣ → _', texte: '_' }],
  },
  {
    type: 'nombre',
    id: 'nb',
    libelle: <>Combien existe-t-il de clés possibles pour des blocs de {exo.n} symboles (la permutation identité comprise) ?</>,
    attendu: factorielle(exo.n),
    placeholder: 'Ex : 24',
    aide: 'Un nombre entier.',
  },
];

/* ===== Affichage ===== */

export default function ChiffrementPermutation() {
  const [exo, regenerer] = useTirage(genererExercice);
  const [essai, setEssai] = useState(0);
  if (!exo) return <Chargement />;

  const { phrase, n, cle } = exo;
  const clairs = blocsClairs(exo);
  const chiffres = blocsChiffres(exo);
  const premier = clairs[0];
  const inverse = inverserPermutation(cle);

  return (
    <Cadre>
      <Titre />
      <Enonce>
        <p>
          Pour chiffrer par permutation, on remplace les espaces par <strong>_</strong>, on découpe le
          message en blocs de {n} symboles (le dernier est complété par des <strong>_</strong>), puis on
          réordonne chaque bloc : la case <MathTex tex="i" /> du bloc chiffré reçoit la lettre
          n° <MathTex tex="K(i)" /> du bloc clair.
        </p>
        <div className="exercice-formule">
          <MathTex tex={`K=${texMat([cle.map((_, i) => i + 1), cle])}`} />
        </div>
        <p>Message clair :</p>
        <div className="exercice-formule">
          <span className="exercice-code">{phrase}</span>
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
            Message chiffré : <span className="exercice-code">{chiffres.join(' ')}</span>, et il y a <MathTex tex={`${n}!=${factorielle(n)}`} /> clés possibles.
          </p>
        }
        correction={
          <>
            <li>
              <strong>Découpage.</strong> On remplace les espaces par _ puis on coupe tous les {n} symboles :{' '}
              <span className="exercice-code">{clairs.join(' | ')}</span>.
            </li>
            <li>
              <strong>Premier bloc.</strong> Dans <span className="exercice-code">{premier}</span>, {cle.map((k, i) => `la case ${i + 1} reçoit la lettre n° ${k} (${premier[k - 1] === '_' ? '_' : premier[k - 1]})`).join(', ')} :
              on obtient <span className="exercice-code">{chiffres[0]}</span>.
            </li>
            <li>
              <strong>Tous les blocs.</strong> La même clé s'applique à chaque bloc :{' '}
              <span className="exercice-code">{chiffres.join(' | ')}</span>.
            </li>
            <li>
              <strong>Nombre de clés.</strong> Une clé est une permutation des {n} positions : la case 1 peut
              recevoir {n} lettres, la case 2 en a {n - 1} au choix, etc. Il y a donc{' '}
              <MathTex tex={`${n}!=${factorielle(n)}`} /> clés.
            </li>
          </>
        }
        conseils={
          <>
            <li>Complète le dernier bloc avec des _ avant de permuter, sinon il manque des symboles.</li>
            <li>
              Lis la clé colonne par colonne : « en case <MathTex tex="i" />, je mets la lettre n°{' '}
              <MathTex tex="K(i)" /> », sans inverser les deux lignes.
            </li>
            <li>
              Pour déchiffrer, il faudrait la permutation réciproque <MathTex tex={`K^{-1}=${texMat([inverse.map((_, i) => i + 1), inverse])}`} /> : vérifie ton chiffré en lui appliquant <MathTex tex="K^{-1}" />.
            </li>
          </>
        }
      />
    </Cadre>
  );
}
