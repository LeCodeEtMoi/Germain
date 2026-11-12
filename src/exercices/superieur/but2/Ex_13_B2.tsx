import { useState } from 'react';
import { Cadre, Chargement, Enonce, MathTex, Questions, Titre, choisir, useTirage, type Question } from './_commun.ts';
import { MOTS_LONGS, decaler, verifierTexte } from './_crypto.ts';

/**
 * Exercice : la clé de décalage qui est son propre inverse.
 *
 *   Chiffrer deux fois avec k revient à décaler de 2k : on veut 2k ≡ 0 (mod taille),
 *   soit k = taille/2 (pour une taille paire). Sur 26 lettres : k = 13 (ROT13).
 *
 *   Q1 : trouver cette clé sur un alphabet de taille donnée.
 *   Q2 : déchiffrer un mot codé en ROT13.
 */

/* ===== Logique ===== */

export type Exercice = { taille: number; mot: string };

export function genererExercice(): Exercice {
  return { taille: choisir([26, 36, 40, 52]), mot: choisir(MOTS_LONGS) };
}

export const questions = (exo: Exercice): Question[] => [
  {
    type: 'nombre',
    id: 'cle',
    libelle: (
      <>
        Sur un alphabet de {exo.taille} symboles, quelle clé de décalage <MathTex tex="k" /> non nulle donne un
        chiffrement qui est son propre déchiffrement ?
      </>
    ),
    attendu: exo.taille / 2,
    placeholder: 'Ex : 2',
    aide: 'Un nombre entier.',
  },
  {
    type: 'expression',
    id: 'mot',
    libelle: <>Le mot ci-dessous a été chiffré avec cette clé sur l'alphabet latin (26 lettres, donc <MathTex tex="k=13" />, le fameux ROT13). Déchiffre-le.</>,
    verifier: verifierTexte(exo.mot),
    placeholder: 'Ex : UNMOTCLAIR',
    aide: 'Un mot en lettres, sans accents.',
  },
];

/* ===== Affichage ===== */

export default function CleInvolutive() {
  const [exo, regenerer] = useTirage(genererExercice);
  const [essai, setEssai] = useState(0);
  if (!exo) return <Chargement />;

  const { taille, mot } = exo;
  const chiffre = decaler(mot, 13);

  return (
    <Cadre>
      <Titre />
      <Enonce>
        <p>
          Sur des forums, un chiffrement par décalage a longtemps servi à rendre un texte non
          immédiatement lisible (la solution d'une énigme, par exemple). Sa clé est choisie pour que{' '}
          <strong>chiffrer une seconde fois déchiffre le message</strong> : le même bouton code et décode.
        </p>
        <p>Mot chiffré avec la version à 26 lettres :</p>
        <div className="exercice-formule">
          <span className="exercice-code">{chiffre}</span>
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
            <MathTex tex={`k=${taille / 2}`} /> sur {taille} symboles, et le mot était {mot}.
          </p>
        }
        correction={
          <>
            <li>
              <strong>Équation.</strong> Chiffrer deux fois avec <MathTex tex="k" />, c'est décaler de{' '}
              <MathTex tex="2k" />. On veut retomber sur le texte de départ :{' '}
              <MathTex tex={`2k\\equiv 0\\pmod{${taille}}`} />.
            </li>
            <li>
              <strong>Résolution.</strong> Avec <MathTex tex={`0<k<${taille}`} />, la seule solution est{' '}
              <MathTex tex={`2k=${taille}`} />, donc <MathTex tex={`k=${taille / 2}`} />.
            </li>
            <li>
              <strong>Déchiffrement.</strong> Sur 26 lettres, <MathTex tex="k=13" /> : les lettres s'échangent
              deux par deux (<MathTex tex="A\leftrightarrow N" />, <MathTex tex="B\leftrightarrow O" />…).
              En rechiffrant <span className="exercice-code">{chiffre}</span>, on lit {mot}.
            </li>
          </>
        }
        conseils={
          <>
            <li>Une clé égale à son inverse vérifie <MathTex tex="k\equiv -k" />, c'est-à-dire <MathTex tex="2k\equiv 0" /> modulo la taille de l'alphabet.</li>
            <li>Sur un alphabet de taille impaire, aucune clé non nulle ne convient : il faut que la taille soit paire.</li>
            <li>ROT13 ne protège rien : c'est un cache-regard, pas un chiffrement sûr.</li>
          </>
        }
      />
    </Cadre>
  );
}
