import { useState } from 'react';
import { Cadre, Chargement, Enonce, MathTex, Questions, Titre, choisir, melanger, useTirage, type Question } from './_commun.ts';
import { TEXTES_FREQUENCES, cleSubstitutionAleatoire, frequences, substituer } from './_crypto.ts';

/**
 * Exercice : cryptanalyse par analyse des fréquences.
 *
 *   Les textes de _crypto.ts sont choisis pour que E y soit toujours, de loin,
 *   la lettre la plus fréquente : son image est donc la lettre la plus fréquente
 *   du cryptogramme.
 *
 *   Q1 : pourquoi la méthode fonctionne (QCM).
 *   Q2 : repérer la lettre chiffrée qui remplace E (QCM parmi les 4 plus fréquentes).
 */

/* ===== Logique ===== */

export type Exercice = { texte: string; cle: string };

export function genererExercice(): Exercice {
  return { texte: choisir(TEXTES_FREQUENCES), cle: cleSubstitutionAleatoire() };
}

export const cryptogramme = ({ texte, cle }: Exercice) => substituer(texte, cle);
export const imageDeE = ({ cle }: Exercice) => cle[4];

export const questions = (exo: Exercice): Question[] => {
  const top = frequences(cryptogramme(exo)).slice(0, 4);
  return [
    {
      type: 'choix',
      id: 'pourquoi',
      libelle: <>Pourquoi l'analyse des fréquences permet-elle de casser une substitution mono-alphabétique ?</>,
      attendu: 'conserve',
      options: melanger([
        { valeur: 'conserve', contenu: <>Une même lettre claire est toujours remplacée par la même lettre chiffrée : les fréquences du français se retrouvent dans le cryptogramme.</> },
        { valeur: 'place', contenu: <>Parce que les lettres changent de place mais gardent leur valeur.</> },
        { valeur: 'courte', contenu: <>Parce que la clé, trop courte, se répète le long du message.</> },
        { valeur: 'peu', contenu: <>Parce qu'il n'y a que 26 clés possibles à essayer.</> },
      ]),
    },
    {
      type: 'choix',
      id: 'e',
      libelle: (
        <>
          Les quatre lettres ci-dessous sont les plus fréquentes du cryptogramme. Laquelle remplace très
          probablement le E ?
        </>
      ),
      attendu: imageDeE(exo),
      options: melanger(top.map(([l]) => ({ valeur: l, contenu: <>{l}</> }))),
      enLigne: true,
    },
  ];
};

/* ===== Affichage ===== */

export default function AnalyseFrequences() {
  const [exo, regenerer] = useTirage(genererExercice);
  const [essai, setEssai] = useState(0);
  if (!exo) return <Chargement />;

  const crypto = cryptogramme(exo);
  const freq = frequences(crypto);
  const [l1, n1] = freq[0];
  const total = crypto.replace(/[^A-Z]/g, '').length;

  return (
    <Cadre>
      <Titre />
      <Enonce>
        <p>
          Ce texte en français (accents supprimés) a été chiffré par une substitution mono-alphabétique
          dont la clé est inconnue. En français, les lettres les plus fréquentes sont, dans l'ordre :
          E, S, A, N, T, I… et le E dépasse souvent 15 % du texte.
        </p>
        <div className="exercice-formule">
          <span className="exercice-code">{crypto}</span>
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
            La lettre {l1} apparaît {n1} fois sur {total} : c'est l'image du E. De proche en proche, tout le
            message peut être reconstruit ainsi.
          </p>
        }
        correction={
          <>
            <li>
              <strong>Pourquoi ça marche.</strong> La substitution remplace toujours une lettre claire par la
              même lettre chiffrée : elle ne masque pas les statistiques. La lettre la plus fréquente du
              cryptogramme correspond donc à la plus fréquente du français, le E.
            </li>
            <li>
              <strong>Comptage.</strong> Dans ce cryptogramme :{' '}
              {freq.slice(0, 4).map(([l, n]) => `${l} apparaît ${n} fois`).join(', ')} (sur {total} lettres).
            </li>
            <li>
              <strong>Conclusion.</strong> La plus fréquente est {l1} : le E est très probablement chiffré
              par <strong>{l1}</strong>.
            </li>
            <li>
              <strong>Pour continuer.</strong> On confirmerait avec les mots courts (LE, DE, LA…) et les lettres
              doublées (LL, SS, EE…), puis on devinerait les autres lettres de proche en proche.
            </li>
          </>
        }
        conseils={
          <>
            <li>Commence toujours par compter les lettres du cryptogramme : c'est la partie mécanique de l'attaque.</li>
            <li>Un texte trop court fausse les statistiques : l'analyse des fréquences a besoin de matière.</li>
            <li>C'est pour résister à cette attaque que Vigenère fait varier le décalage à chaque lettre.</li>
          </>
        }
      />
    </Cadre>
  );
}
