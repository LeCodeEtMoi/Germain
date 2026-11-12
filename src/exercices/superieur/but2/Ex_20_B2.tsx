import { useState } from 'react';
import { Cadre, Chargement, Enonce, MathTex, Questions, Titre, melanger, useTirage, type Question } from './_commun.ts';
import { hasard } from './_crypto.ts';

/**
 * Exercice : mode XTS (chiffrement de disques, utilisé par fscrypt).
 *
 *   Secteur j : T_1 = E_{K2}(j), T_i = α^{i−1}·T_1.
 *   Chiffrement : c_i = E_{K1}(m_i ⊕ T_i) ⊕ T_i.
 *   Déchiffrement : m_i = D_{K1}(c_i ⊕ T_i) ⊕ T_i — bloc par bloc, sans lire les autres.
 *
 *   Q1 : la valeur T_i d'un bloc donné (QCM). Q2 : la formule de déchiffrement (QCM).
 *   Q3 : l'accès direct aux blocs (QCM).
 */

/* ===== Logique ===== */

export type Exercice = { j: number; i: number };

export function genererExercice(): Exercice {
  return { j: hasard(2, 999), i: hasard(2, 9) };
}

export const questions = ({ j, i }: Exercice): Question[] => [
  {
    type: 'choix',
    id: 'tweak',
    libelle: <>On déchiffre le bloc <MathTex tex={`i=${i}`} /> du secteur <MathTex tex={`j=${j}`} />. Quelle valeur <MathTex tex={`T_{${i}}`} /> utilise-t-on ?</>,
    attendu: 'bonne',
    options: melanger([
      { valeur: 'bonne', contenu: <MathTex tex={`T_{${i}} = \\alpha^{${i - 1}}\\cdot E_{K_2}(${j})`} /> },
      { valeur: 'exposant', contenu: <MathTex tex={`T_{${i}} = \\alpha^{${i}}\\cdot E_{K_2}(${j})`} /> },
      { valeur: 'dechiffre', contenu: <MathTex tex={`T_{${i}} = \\alpha^{${i - 1}}\\cdot D_{K_2}(${j})`} /> },
      { valeur: 'mauvaise-cle', contenu: <MathTex tex={`T_{${i}} = \\alpha^{${i - 1}}\\cdot E_{K_1}(${j})`} /> },
    ]),
  },
  {
    type: 'choix',
    id: 'formule',
    libelle: <>Quelle formule redonne le bloc clair <MathTex tex={`m_{${i}}`} /> ?</>,
    attendu: 'bonne',
    options: melanger([
      { valeur: 'bonne', contenu: <MathTex tex={`m_{${i}} = D_{K_1}(c_{${i}} \\oplus T_{${i}}) \\oplus T_{${i}}`} /> },
      { valeur: 'sans-premier', contenu: <MathTex tex={`m_{${i}} = D_{K_1}(c_{${i}}) \\oplus T_{${i}}`} /> },
      { valeur: 'chiffrement', contenu: <MathTex tex={`m_{${i}} = E_{K_1}(c_{${i}} \\oplus T_{${i}}) \\oplus T_{${i}}`} /> },
      { valeur: 'cle-2', contenu: <MathTex tex={`m_{${i}} = D_{K_2}(c_{${i}} \\oplus T_{${i}}) \\oplus T_{${i}}`} /> },
    ]),
  },
  {
    type: 'choix',
    id: 'acces',
    libelle: <>Pour déchiffrer ce bloc <MathTex tex={`i=${i}`} />, faut-il d'abord déchiffrer les blocs <MathTex tex={`1`} /> à <MathTex tex={`${i - 1}`} /> du secteur ?</>,
    attendu: 'non',
    options: melanger([
      { valeur: 'non', contenu: <>Non : <MathTex tex={`T_{${i}}`} /> se calcule directement à partir de <MathTex tex="j" /> et de <MathTex tex="i" />, chaque bloc est indépendant.</> },
      { valeur: 'cbc', contenu: <>Oui : il faut le bloc chiffré précédent, comme en CBC.</> },
      { valeur: 'clair', contenu: <>Oui : <MathTex tex={`T_{${i}}`} /> dépend du bloc clair précédent.</> },
      { valeur: 'secteur', contenu: <>Non, mais il faut avoir déchiffré tout le secteur précédent.</> },
    ]),
  },
];

/* ===== Affichage ===== */

export default function ModeXTS() {
  const [exo, regenerer] = useTirage(genererExercice);
  const [essai, setEssai] = useState(0);
  if (!exo) return <Chargement />;

  const { j, i } = exo;

  return (
    <Cadre>
      <Titre />
      <Enonce>
        <p>
          Le mode <strong>XTS</strong> chiffre le contenu des disques (c'est le réglage{' '}
          <span className="exercice-code">AES_256_XTS</span> de fscrypt). Chaque secteur <MathTex tex="j" /> du disque est chiffré
          par blocs, avec deux clés <MathTex tex="K_1" /> et <MathTex tex="K_2" />.
        </p>
        <p>Rappel du chiffrement (vu en cours) :</p>
        <div className="exercice-formule">
          <MathTex tex="T_1 = E_{K_2}(j),\qquad T_i = \alpha^{\,i-1}\cdot T_1,\qquad c_i = E_{K_1}(m_i \oplus T_i) \oplus T_i" />
        </div>
        <p>Explique le protocole de déchiffrement en répondant aux questions.</p>
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
            Le déchiffrement garde la structure « <MathTex tex="\oplus\,T" />, bloc, <MathTex tex="\oplus\,T" /> » :{' '}
            <MathTex tex="m_i = D_{K_1}(c_i \oplus T_i) \oplus T_i" />, avec des <MathTex tex="T_i" /> recalculés
            à partir du numéro de secteur.
          </p>
        }
        correction={
          <>
            <li>
              <strong>Les valeurs <MathTex tex="T_i" />.</strong> <MathTex tex="T_1 = E_{K_2}(j)" /> se{' '}
              <em>recalcule</em> au déchiffrement (toujours avec le chiffrement sous <MathTex tex="K_2" /> :{' '}
              <MathTex tex="T_1" /> n'est jamais transmis), puis chaque multiplication par{' '}
              <MathTex tex="\alpha" /> donne le suivant : <MathTex tex={`T_{${i}} = \\alpha^{${i - 1}}\\cdot E_{K_2}(${j})`} />.
            </li>
            <li>
              <strong>La formule.</strong> On défait les opérations du chiffrement dans l'ordre inverse :
              on retire le <MathTex tex="T_i" /> extérieur, on applique <MathTex tex="D_{K_1}" />, on retire
              le <MathTex tex="T_i" /> intérieur : <MathTex tex="m_i = D_{K_1}(c_i \oplus T_i) \oplus T_i" />.
            </li>
            <li>
              <strong>Accès direct.</strong> <MathTex tex="T_i" /> ne dépend que de <MathTex tex="j" /> et{' '}
              de <MathTex tex="i" /> : on peut déchiffrer n'importe quel bloc du disque sans toucher aux
              autres. C'est indispensable pour un disque, où l'on lit et écrit au milieu des fichiers.
            </li>
          </>
        }
        conseils={
          <>
            <li>La clé <MathTex tex="K_2" /> ne sert qu'à fabriquer les <MathTex tex="T_i" /> : elle s'utilise toujours en chiffrement, même pour déchiffrer.</li>
            <li>Retiens la forme « sandwich » : <MathTex tex="\oplus\,T_i" />, chiffrement ou déchiffrement sous <MathTex tex="K_1" />, <MathTex tex="\oplus\,T_i" />.</li>
            <li>Compare avec CBC : en CBC, modifier un bloc oblige à rechiffrer toute la suite ; en XTS, chaque bloc vit sa vie.</li>
          </>
        }
      />
    </Cadre>
  );
}
