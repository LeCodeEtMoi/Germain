import { useState } from 'react';
import { Cadre, Chargement, Enonce, MathTex, Questions, Titre, choisir, melanger, useTirage, type Question } from './_commun.ts';
import { MOTS_COURTS, hasard, verifierTexte, versLettre, versNombre } from './_crypto.ts';

/**
 * Exercice : le masque jetable (one-time pad).
 *
 *   Chaque lettre est décalée d'un nombre tiré au hasard, propre à sa position :
 *   y_i = x_i + z_i (mod 26). La suite (z_i) est jetée après usage.
 *
 *   Q1 : chiffrer un mot avec le masque donné.
 *   Q2 : une question de cours tirée au hasard (sécurité, inconvénients, réutilisation).
 */

/* ===== Logique ===== */

const COURS = [
  {
    id: 'sur',
    libelle: <>Pourquoi un message chiffré par masque jetable est-il impossible à décrypter sans la clé ?</>,
    attendu: 'tous',
    options: [
      { valeur: 'tous', contenu: <>Pour tout clair de même longueur, il existe un masque qui donne exactement ce chiffré : tous les messages restent également possibles.</> },
      { valeur: 'secret', contenu: <>Parce que l'algorithme de chiffrement est gardé secret.</> },
      { valeur: 'long', contenu: <>Parce que le chiffré est plus long que le message clair.</> },
      { valeur: 'calcul', contenu: <>Parce que l'analyse des fréquences demanderait trop de calculs.</> },
    ],
    explication: 'Shannon (1949) : le chiffré n’apporte aucune information sur le clair, car chaque clair possible correspond à un masque possible. C’est le seul système inconditionnellement sûr.',
  },
  {
    id: 'inconvenient',
    libelle: <>Quel est le principal inconvénient du masque jetable ?</>,
    attendu: 'cle',
    options: [
      { valeur: 'cle', contenu: <>La clé, aléatoire, doit être aussi longue que le message, transmise de façon sûre, et ne jamais resservir.</> },
      { valeur: 'repetition', contenu: <>Deux lettres identiques du clair sont toujours chiffrées de la même façon.</> },
      { valeur: 'peu', contenu: <>Le nombre de clés possibles est trop petit.</> },
      { valeur: 'binaire', contenu: <>Il ne fonctionne qu'avec des lettres, jamais avec des données binaires.</> },
    ],
    explication: 'Générer, transmettre et stocker une clé aussi longue que le message, pour un seul usage, est très contraignant : c’est ce qui réserve le masque jetable à quelques usages critiques.',
  },
  {
    id: 'reutilisation',
    libelle: <>Que se passe-t-il si l'on réutilise le même masque pour deux messages ?</>,
    attendu: 'elimine',
    options: [
      { valeur: 'elimine', contenu: <>En combinant les deux chiffrés, le masque s'élimine : on obtient une relation entre les deux clairs, et la sécurité est perdue.</> },
      { valeur: 'rien', contenu: <>Rien : le masque jetable reste parfaitement sûr.</> },
      { valeur: 'bloque', contenu: <>Le second message devient indéchiffrable, même pour son destinataire.</> },
      { valeur: 'double', contenu: <>La sécurité double, car l'attaquant a deux chiffrés à analyser.</> },
    ],
    explication: 'y − y′ = x − x′ : la différence des chiffrés égale celle des clairs, et les statistiques de la langue font le reste. D’où le nom : le masque est à usage unique.',
  },
];

export type Exercice = { clair: string; masque: number[]; cours: number };

export function genererExercice(): Exercice {
  const clair = choisir(MOTS_COURTS);
  return { clair, masque: clair.split('').map(() => hasard(0, 25)), cours: hasard(0, COURS.length - 1) };
}

export const chiffre = ({ clair, masque }: Exercice) =>
  clair.split('').map((l, i) => versLettre(versNombre(l) + masque[i])).join('');

export const questions = (exo: Exercice): Question[] => {
  const q = COURS[exo.cours];
  return [
    {
      type: 'expression',
      id: 'chiffre',
      libelle: <>Chiffre le mot M avec ce masque : la lettre n° <MathTex tex="i" /> est décalée de <MathTex tex="z_i" /> rangs.</>,
      verifier: verifierTexte(chiffre(exo)),
      placeholder: 'Ex : QHRTC',
      aide: 'Un mot en lettres, sans espaces.',
    },
    { type: 'choix', id: q.id, libelle: q.libelle, attendu: q.attendu, options: melanger(q.options) },
  ];
};

/* ===== Affichage ===== */

export default function MasqueJetable() {
  const [exo, regenerer] = useTirage(genererExercice);
  const [essai, setEssai] = useState(0);
  if (!exo) return <Chargement />;

  const { clair, masque } = exo;
  const crypte = chiffre(exo);
  const cours = COURS[exo.cours];
  const bonne = cours.options.find((o) => o.valeur === cours.attendu)!;

  return (
    <Cadre>
      <Titre />
      <Enonce>
        <p>
          Le <strong>masque jetable</strong> (one-time pad, Vernam 1926) décale chaque lettre d'un nombre
          tiré au hasard, propre à sa position : <MathTex tex="y_i = x_i + z_i \pmod{26}" />, avec{' '}
          <MathTex tex="A=0,\dots,Z=25" />. La suite <MathTex tex="(z_i)" /> est aussi longue que le
          message et n'est jamais réutilisée.
        </p>
        <p>Mot M et masque <MathTex tex="(z_i)" /> :</p>
        <div className="exercice-formule">
          <span className="exercice-code">{`M      : ${clair.split('').join('  ')}`}</span>
          <br />
          <span className="exercice-code">{`masque : ${masque.join(' ')}`}</span>
        </div>
      </Enonce>
      <Questions
        key={essai}
        questions={questions(exo)}
        onNouveau={() => {
          regenerer();
          setEssai((e) => e + 1);
        }}
        succes={<p>M se chiffre en <span className="exercice-code">{crypte}</span>.</p>}
        correction={
          <>
            <li>
              <strong>Chiffrement.</strong>{' '}
              {clair
                .split('')
                .map((l, i) => {
                  const x = versNombre(l);
                  const somme = x + masque[i];
                  return `${l}(${x}) + ${masque[i]} = ${somme}${somme >= 26 ? ` ≡ ${somme - 26}` : ''} → ${crypte[i]}`;
                })
                .join(' ; ')}
              , d'où <span className="exercice-code">{crypte}</span>.
            </li>
            <li>
              <strong>Question de cours.</strong> {bonne.contenu} {cours.explication}
            </li>
          </>
        }
        conseils={
          <>
            <li>Deux lettres identiques du clair peuvent donner des chiffrés différents : chaque position a son propre décalage.</li>
            <li>La sécurité exige les trois conditions à la fois : masque vraiment aléatoire, aussi long que le message, à usage unique.</li>
            <li>Si la somme dépasse 25, retranche 26 avant de lire la lettre.</li>
          </>
        }
      />
    </Cadre>
  );
}
