import { useState } from 'react';
import { Cadre, Chargement, Enonce, MathTex, Questions, Titre, choisir, melanger, useTirage, type Question } from './_commun.ts';
import { MOTS_CLES, MOTS_MOYENS, verifierTexte, versLettre, versNombre, mod, vigenere } from './_crypto.ts';

/**
 * Exercice : chiffre de Vigenère.
 *
 *   On écrit la clé en boucle sous le message ; chaque lettre est décalée du rang
 *   de la lettre de clé alignée : y_i = x_i + n_i (mod 26).
 *
 *   Q1 : chiffrer un mot avec la clé donnée.
 *   Q2 : traduction dans Z/26Z (QCM sur la formule).
 */

/* ===== Logique ===== */

export type Exercice = { clair: string; cle: string };

export function genererExercice(): Exercice {
  return { clair: choisir(MOTS_MOYENS), cle: choisir(MOTS_CLES) };
}

export const chiffre = ({ clair, cle }: Exercice) => vigenere(clair, cle, 1);
export const cleRepetee = ({ clair, cle }: Exercice) => clair.split('').map((_, i) => cle[i % cle.length]).join('');

export const questions = (exo: Exercice): Question[] => [
  {
    type: 'expression',
    id: 'chiffre',
    libelle: <>Chiffre le mot M avec la clé {exo.cle} (la clé se répète si le mot est plus long qu'elle).</>,
    verifier: verifierTexte(chiffre(exo)),
    placeholder: 'Ex : XVPIXG',
    aide: 'Un mot en lettres majuscules ou minuscules.',
  },
  {
    type: 'choix',
    id: 'formule',
    libelle: (
      <>
        On note <MathTex tex="x_i" /> la lettre claire, <MathTex tex="n_i" /> la lettre de clé alignée et{' '}
        <MathTex tex="y_i" /> la lettre chiffrée, toutes vues dans <MathTex tex="\mathbb{Z}/26\mathbb{Z}" />.
        Quelle formule décrit le chiffrement de Vigenère ?
      </>
    ),
    attendu: 'somme',
    options: melanger([
      { valeur: 'somme', contenu: <MathTex tex="y_i = x_i + n_i \pmod{26}" /> },
      { valeur: 'produit', contenu: <MathTex tex="y_i = x_i \times n_i \pmod{26}" /> },
      { valeur: 'diff', contenu: <MathTex tex="y_i = n_i - x_i \pmod{26}" /> },
      { valeur: 'fixe', contenu: <MathTex tex="y_i = x_i + n_1 \pmod{26}" /> },
    ]),
  },
];

/* ===== Affichage ===== */

export default function ChiffreVigenere() {
  const [exo, regenerer] = useTirage(genererExercice);
  const [essai, setEssai] = useState(0);
  if (!exo) return <Chargement />;

  const { clair, cle } = exo;
  const crypte = chiffre(exo);
  const repetee = cleRepetee(exo);

  return (
    <Cadre>
      <Titre />
      <Enonce>
        <p>
          Le chiffre de <strong>Vigenère</strong> utilise un mot-clé : on l'écrit en boucle sous le
          message, puis chaque lettre du message est décalée du rang de la lettre de clé placée sous
          elle (<MathTex tex="A=0,\dots,Z=25" />).
        </p>
        <p>Mot M à chiffrer, et sa clé :</p>
        <div className="exercice-formule">
          <span className="exercice-code">{`M   : ${clair}`}</span>
          <br />
          <span className="exercice-code">{`clé : ${repetee}`}</span>
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
            M se chiffre en <span className="exercice-code">{crypte}</span> : chaque lettre subit son propre décalage de César,{' '}
            <MathTex tex="y_i = x_i + n_i \pmod{26}" />.
          </p>
        }
        correction={
          <>
            <li>
              <strong>Alignement.</strong> On répète la clé sous le mot : <span className="exercice-code">{clair}</span> /{' '}
              <span className="exercice-code">{repetee}</span>.
            </li>
            <li>
              <strong>Lettre par lettre.</strong>{' '}
              {clair
                .split('')
                .map((l, i) => {
                  const x = versNombre(l);
                  const n = versNombre(repetee[i]);
                  return `${l}(${x}) + ${repetee[i]}(${n}) = ${x + n}${x + n >= 26 ? ` ≡ ${mod(x + n)}` : ''} → ${versLettre(x + n)}`;
                })
                .join(' ; ')}
              .
            </li>
            <li>
              <strong>Résultat.</strong> <span className="exercice-code">{crypte}</span>. En notant les lettres dans{' '}
              <MathTex tex="\mathbb{Z}/26\mathbb{Z}" />, le chiffrement s'écrit{' '}
              <MathTex tex="y_i = x_i + n_i \pmod{26}" /> et le déchiffrement{' '}
              <MathTex tex="x_i = y_i - n_i \pmod{26}" />.
            </li>
          </>
        }
        conseils={
          <>
            <li>Vérifie l'alignement : la lettre n° <MathTex tex="i" /> du mot utilise la lettre n° <MathTex tex="i" /> de la clé répétée.</li>
            <li>Quand la somme dépasse 25, retranche 26 avant de lire la lettre.</li>
            <li>Deux lettres identiques du message peuvent être chiffrées différemment : c'est ce qui déjoue l'analyse des fréquences simple.</li>
          </>
        }
      />
    </Cadre>
  );
}
