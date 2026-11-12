import { useState } from 'react';
import { Cadre, Chargement, Enonce, MathTex, Questions, Titre, choisir, melanger, useTirage, type Question } from './_commun.ts';
import { hasard } from './_crypto.ts';

/**
 * Exercice : mode CBC avec vol de chiffré (CBC-CTS), utilisé pour les noms de fichiers.
 *
 *   Un nom de L caractères (1 octet chacun) fait 8L bits ; avec des blocs de n bits :
 *   l = ⌈8L/n⌉ blocs, le dernier de r = 8L − (l−1)n bits (on choisit L pour que r < n).
 *
 *   Q1/Q2 : calculer l et r.  Q3 : une étape du protocole de déchiffrement (QCM).
 */

/* ===== Logique ===== */

const PROTOCOLE = [
  {
    id: 'premier',
    libelle: <>Pour retrouver les deux derniers blocs clairs, quel bloc reçu doit-on passer en premier dans <MathTex tex="D_K" /> ?</>,
    attendu: 'avant-dernier',
    options: [
      { valeur: 'avant-dernier', contenu: <><MathTex tex="c_{l-1}" />, le bloc complet de <MathTex tex="n" /> bits (c'est lui qui a été chiffré en dernier)</> },
      { valeur: 'dernier', contenu: <><MathTex tex="c_l" />, le bloc incomplet de <MathTex tex="r" /> bits</> },
      { valeur: 'premier', contenu: <><MathTex tex="c_1" />, le premier bloc, comme en CBC classique</> },
      { valeur: 'iv', contenu: <>Le vecteur d'initialisation <MathTex tex="IV" /></> },
    ],
  },
  {
    id: 'ml',
    libelle: <>On a calculé <MathTex tex="Z = D_K(c_{l-1}) = P \oplus c'_{l-1}" />. Comment obtient-on le dernier bloc clair <MathTex tex="m_l" /> ?</>,
    attendu: 'msb',
    options: [
      { valeur: 'msb', contenu: <MathTex tex="m_l = \mathrm{MSB}_r(Z) \oplus c_l" /> },
      { valeur: 'prec', contenu: <MathTex tex="m_l = Z \oplus c_{l-2}" /> },
      { valeur: 'direct', contenu: <MathTex tex="m_l = D_K(c_l)" /> },
      { valeur: 'lsb', contenu: <MathTex tex="m_l = \mathrm{LSB}_r(Z)" /> },
    ],
  },
  {
    id: 'reconstruire',
    libelle: <>Toujours avec <MathTex tex="Z = D_K(c_{l-1})" />, comment reconstruit-on le bloc complet <MathTex tex="c'_{l-1}" /> ?</>,
    attendu: 'concat',
    options: [
      { valeur: 'concat', contenu: <><MathTex tex="c'_{l-1} = c_l \,\Vert\, \mathrm{LSB}_{n-r}(Z)" /> (les bits volés, puis la fin de <MathTex tex="Z" />)</> },
      { valeur: 'tel-quel', contenu: <><MathTex tex="c'_{l-1} = c_{l-1}" />, il est transmis tel quel</> },
      { valeur: 'zeros', contenu: <MathTex tex="c'_{l-1} = c_l \,\Vert\, 0^{\,n-r}" /> },
      { valeur: 'xor', contenu: <MathTex tex="c'_{l-1} = Z \oplus c_{l-2}" /> },
    ],
  },
];

export type Exercice = { n: number; caracteres: number; cours: number };

export function genererExercice(): Exercice {
  const n = choisir([64, 128]);
  const octetsParBloc = n / 8;
  let caracteres = hasard(octetsParBloc + 1, 5 * octetsParBloc);
  if (caracteres % octetsParBloc === 0) caracteres += 1;
  return { n, caracteres, cours: hasard(0, PROTOCOLE.length - 1) };
}

export const bits = ({ caracteres }: Exercice) => 8 * caracteres;
export const nbBlocs = (exo: Exercice) => Math.ceil(bits(exo) / exo.n);
export const bitsDernier = (exo: Exercice) => bits(exo) - (nbBlocs(exo) - 1) * exo.n;

export const questions = (exo: Exercice): Question[] => {
  const q = PROTOCOLE[exo.cours];
  return [
    {
      type: 'nombre',
      id: 'l',
      libelle: <>Combien de blocs <MathTex tex="l" /> obtient-on en découpant ce nom de fichier ?</>,
      attendu: nbBlocs(exo),
      placeholder: 'Ex : 3',
      aide: 'Un nombre entier.',
    },
    {
      type: 'nombre',
      id: 'r',
      libelle: <>Combien de bits <MathTex tex="r" /> contient le dernier bloc, incomplet ?</>,
      attendu: bitsDernier(exo),
      placeholder: 'Ex : 40',
      aide: 'Un nombre entier (en bits).',
    },
    { type: 'choix', id: q.id, libelle: q.libelle, attendu: q.attendu, options: melanger(q.options) },
  ];
};

/* ===== Affichage ===== */

export default function ModeCTS() {
  const [exo, regenerer] = useTirage(genererExercice);
  const [essai, setEssai] = useState(0);
  if (!exo) return <Chargement />;

  const { n, caracteres } = exo;
  const b = bits(exo);
  const l = nbBlocs(exo);
  const r = bitsDernier(exo);
  const q = PROTOCOLE[exo.cours];
  const bonne = q.options.find((o) => o.valeur === q.attendu)!;

  return (
    <Cadre>
      <Titre />
      <Enonce>
        <p>
          Le mode <strong>CBC-CTS</strong> (CipherText Stealing) sert à chiffrer les noms de fichiers :
          le chiffré garde exactement la longueur du clair, sans bourrage transmis. On chiffre un nom de{' '}
          <strong>{caracteres} caractères</strong>, codés sur un octet chacun, avec des blocs de{' '}
          <MathTex tex={`n=${n}`} /> bits.
        </p>
        <p>Rappel du chiffrement (vu en cours) :</p>
        <div className="exercice-formule">
          <MathTex tex="c_i = E_K(m_i \oplus c_{i-1}),\quad P = m_l\,\Vert\,0^{\,n-r},\quad c'_l = E_K(P \oplus c'_{l-1})" />
          <br />
          <MathTex tex="\text{on transmet } c_{l-1} = c'_l \text{ (}n\text{ bits) et } c_l = \mathrm{MSB}_r(c'_{l-1}) \text{ (}r\text{ bits)}" />
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
            <MathTex tex={`l=${l}`} /> blocs, dont le dernier de <MathTex tex={`r=${r}`} /> bits, et le
            déchiffrement commence bien par <MathTex tex="c_{l-1}" />.
          </p>
        }
        correction={
          <>
            <li>
              <strong>Taille du nom.</strong> {caracteres} caractères × 8 bits = {b} bits.
            </li>
            <li>
              <strong>Découpage.</strong> <MathTex tex={`${b} = ${l - 1}\\times${n} + ${r}`} /> : il y a{' '}
              {l - 1} bloc{l - 1 > 1 ? 's' : ''} complet{l - 1 > 1 ? 's' : ''} et un dernier bloc de {r} bits,
              donc <MathTex tex={`l=${l}`} /> et <MathTex tex={`r=${r}`} />.
            </li>
            <li>
              <strong>Protocole.</strong> Bonne réponse : {bonne.contenu}. Le déchiffrement enchaîne :{' '}
              <MathTex tex="Z = D_K(c_{l-1})" />, puis <MathTex tex="m_l = \mathrm{MSB}_r(Z) \oplus c_l" /> ;
              comme le bourrage de <MathTex tex="P" /> est fait de zéros,{' '}
              <MathTex tex="\mathrm{LSB}_{n-r}(Z) = \mathrm{LSB}_{n-r}(c'_{l-1})" />, ce qui permet de
              reconstruire <MathTex tex="c'_{l-1} = c_l \Vert \mathrm{LSB}_{n-r}(Z)" /> et d'obtenir{' '}
              <MathTex tex="m_{l-1} = D_K(c'_{l-1}) \oplus c_{l-2}" />. Les blocs 1 à <MathTex tex="l-2" /> se
              déchiffrent comme en CBC.
            </li>
          </>
        }
        conseils={
          <>
            <li>Pose la division euclidienne du nombre de bits par <MathTex tex="n" /> : le reste (s'il n'est pas nul) est <MathTex tex="r" />.</li>
            <li>Les deux derniers blocs transmis sont échangés par rapport au CBC : c'est le « vol » qui donne son nom au mode.</li>
            <li>Le bourrage par des zéros n'est jamais transmis : il se reconstruit au déchiffrement.</li>
          </>
        }
      />
    </Cadre>
  );
}
