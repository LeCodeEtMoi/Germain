import { useState } from 'react';
import { Cadre, Chargement, Enonce, MathTex, Questions, Titre, choisir, useTirage, type Question } from './_commun.ts';
import { MOTS_LONGS, PHRASES, decaler, hasard, verifierTexte, versLettre, versNombre } from './_crypto.ts';

/**
 * Exercice : chiffre de César (décalage).
 *
 *   A = 0, …, Z = 25 ; chiffrer avec la clé k : y = x + k (mod 26).
 *
 *   Q1 : nombre de clés distinctes → 26 (décalage nul compris).
 *   Q2 : déchiffrer un message dont la clé k est donnée.
 *   Q3 : force brute → retrouver la clé d'un mot chiffré.
 */

/* ===== Logique ===== */

export type Exercice = { k: number; phrase: string; k2: number; mot: string };

export function genererExercice(): Exercice {
  return { k: hasard(2, 24), phrase: choisir(PHRASES), k2: hasard(1, 25), mot: choisir(MOTS_LONGS) };
}

export const questions = (exo: Exercice): Question[] => [
  {
    type: 'nombre',
    id: 'nb',
    libelle: <>Combien existe-t-il de clés distinctes pour le chiffrement par décalage (décalage nul compris) ?</>,
    attendu: 26,
    placeholder: 'Ex : 2',
    aide: 'Un nombre entier.',
  },
  {
    type: 'expression',
    id: 'clair',
    libelle: <>Le message M a été chiffré avec la clé <MathTex tex={`k=${exo.k}`} />. Déchiffre-le.</>,
    verifier: verifierTexte(exo.phrase),
    placeholder: 'Ex : LE MESSAGE CLAIR',
    aide: 'Les espaces et les accents sont ignorés.',
  },
  {
    type: 'nombre',
    id: 'force',
    libelle: <>Le mot C a été chiffré par décalage avec une clé inconnue. Essaie tous les décalages (attaque par force brute) et donne la clé utilisée.</>,
    attendu: exo.k2,
    placeholder: 'Ex : 2',
    aide: 'Un entier entre 1 et 25.',
  },
];

/* ===== Affichage ===== */

export default function ChiffreCesar() {
  const [exo, regenerer] = useTirage(genererExercice);
  const [essai, setEssai] = useState(0);
  if (!exo) return <Chargement />;

  const { k, phrase, k2, mot } = exo;
  const chiffre = decaler(phrase, k);
  const chiffre2 = decaler(mot, k2);
  const c0 = chiffre.replace(/ /g, '')[0];
  const x0 = versNombre(c0);

  return (
    <Cadre>
      <Titre />
      <Enonce>
        <p>
          On numérote les lettres <MathTex tex="A=0,\;B=1,\;\dots,\;Z=25" />. Chiffrer par décalage avec
          la clé <MathTex tex="k" />, c'est calculer <MathTex tex="y=x+k\pmod{26}" />.
        </p>
        <p>Message M (chiffré avec <MathTex tex={`k=${k}`} />) :</p>
        <div className="exercice-formule">
          <span className="exercice-code">{chiffre}</span>
        </div>
        <p>Mot C (clé inconnue) :</p>
        <div className="exercice-formule">
          <span className="exercice-code">{chiffre2}</span>
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
            Il y a 26 clés, M = « {phrase} » et C a été chiffré avec <MathTex tex={`k=${k2}`} /> (c'est le mot {mot}).
          </p>
        }
        correction={
          <>
            <li>
              <strong>Nombre de clés.</strong> Décaler de <MathTex tex="k" /> ou de <MathTex tex="k+26" /> donne le
              même chiffré : les clés distinctes sont <MathTex tex="0,1,\dots,25" />, soit <strong>26</strong> clés
              (dont le décalage nul, qui ne chiffre rien).
            </li>
            <li>
              <strong>Déchiffrement de M.</strong> On décale dans l'autre sens : <MathTex tex={`x=y-${k}\\pmod{26}`} />.
              Par exemple {c0} <MathTex tex={`(${x0})`} /> donne <MathTex tex={`${x0}-${k}\\equiv${versNombre(decaler(c0, -k))}\\pmod{26}`} />,
              soit {decaler(c0, -k)}. Lettre par lettre, on lit « {phrase} ».
            </li>
            <li>
              <strong>Force brute sur C.</strong> On essaie les 25 clés :{' '}
              {Array.from({ length: 25 }, (_, i) => i + 1)
                .map((t) => `k=${t} → ${decaler(chiffre2, -t)}`)
                .join(' · ')}
              . Seule <MathTex tex={`k=${k2}`} /> donne un mot français : {mot}.
            </li>
          </>
        }
        conseils={
          <>
            <li>Si <MathTex tex="y-k" /> est négatif, ajoute 26 avant de lire la lettre.</li>
            <li>Écris l'alphabet sur deux lignes décalées de <MathTex tex="k" /> : le déchiffrement devient une simple lecture.</li>
            <li>La force brute ne teste que 25 clés utiles : c'est toute la faiblesse du chiffre de César.</li>
          </>
        }
      />
    </Cadre>
  );
}
