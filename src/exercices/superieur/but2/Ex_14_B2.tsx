import { useState } from 'react';
import { Cadre, Chargement, Enonce, MathTex, Questions, Titre, choisir, melanger, useTirage, type Question } from './_commun.ts';
import { ALPHABET, PHRASES, cleSubstitutionAleatoire, lettresSeules, substituer, verifierTexte } from './_crypto.ts';

/**
 * Exercice : substitution mono-alphabétique.
 *
 *   La clé associe à chaque lettre de A à Z une image, toutes distinctes.
 *
 *   Q1 : chiffrer un message avec la clé affichée.
 *   Q2 : nombre de clés possibles → 26! (QCM).
 */

/* ===== Logique ===== */

export type Exercice = { cle: string; phrase: string };

export function genererExercice(): Exercice {
  return { cle: cleSubstitutionAleatoire(), phrase: choisir(PHRASES) };
}

export const questions = (exo: Exercice): Question[] => [
  {
    type: 'expression',
    id: 'chiffre',
    libelle: <>Chiffre le message avec la clé <MathTex tex="K" />.</>,
    verifier: verifierTexte(substituer(exo.phrase, exo.cle)),
    placeholder: 'Ex : QSDFGH…',
    aide: 'Les espaces sont ignorés.',
  },
  {
    type: 'choix',
    id: 'nb',
    libelle: <>Combien existe-t-il de clés de substitution possibles ?</>,
    attendu: 'fact',
    options: melanger([
      { valeur: 'fact', contenu: <MathTex tex="26!\approx 4{,}03\times10^{26}" /> },
      { valeur: 'carre', contenu: <MathTex tex="26^2=676" /> },
      { valeur: 'puiss', contenu: <MathTex tex="2^{26}\approx 6{,}7\times10^{7}" /> },
      { valeur: 'alphabet', contenu: <MathTex tex="26" /> },
    ]),
  },
];

/* ===== Affichage ===== */

export default function SubstitutionMono() {
  const [exo, regenerer] = useTirage(genererExercice);
  const [essai, setEssai] = useState(0);
  if (!exo) return <Chargement />;

  const { cle, phrase } = exo;
  const chiffre = substituer(phrase, cle);
  const premierMot = phrase.split(' ')[0];

  return (
    <Cadre>
      <Titre />
      <Enonce>
        <p>
          Une <strong>substitution mono-alphabétique</strong> remplace chaque lettre du message par la
          lettre écrite sous elle dans la clé, sans changer sa place. Deux lettres différentes ont
          toujours des images différentes.
        </p>
        <pre className="exercice-code" aria-label="Clé de substitution">
          {`clair   : ${ALPHABET.split('').join(' ')}\nchiffré : ${cle.split('').join(' ')}`}
        </pre>
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
            Message chiffré : <span className="exercice-code">{chiffre}</span>, parmi <MathTex tex="26!\approx 4{,}03\times10^{26}" /> clés possibles.
          </p>
        }
        correction={
          <>
            <li>
              <strong>Chiffrement.</strong> On lit l'image de chaque lettre dans la clé. Premier mot :{' '}
              {lettresSeules(premierMot)
                .split('')
                .map((l) => `${l} → ${substituer(l, cle)}`)
                .join(', ')}
              . Message complet : <span className="exercice-code">{chiffre}</span>.
            </li>
            <li>
              <strong>Nombre de clés.</strong> Une clé est une permutation des 26 lettres : 26 images possibles
              pour A, puis 25 pour B, 24 pour C… soit <MathTex tex="26!=26\times25\times\dots\times1\approx 4{,}03\times10^{26}" /> clés.
            </li>
            <li>
              <strong>À retenir.</strong> Ce nombre est énorme (presque <MathTex tex="2^{88}" />), et pourtant ce
              chiffrement se casse en quelques minutes par l'analyse des fréquences : beaucoup de clés ne
              suffit pas à faire un bon chiffrement.
            </li>
          </>
        }
        conseils={
          <>
            <li>Une même lettre claire donne toujours la même lettre chiffrée : vérifie que tes lettres répétées sont cohérentes.</li>
            <li>Ne confonds pas avec le décalage de César : ici l'ordre des images est quelconque, d'où <MathTex tex="26!" /> clés au lieu de 26.</li>
          </>
        }
      />
    </Cadre>
  );
}
