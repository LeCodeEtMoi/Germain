import { useState } from 'react';
import { Cadre, Chargement, Enonce, MathTex, Questions, Titre, choisir, useTirage, type Question } from './_commun.ts';
import { MOTS_MOYENS, PHRASES, lettresSeules, mod, verifierTexte, versNombre } from './_crypto.ts';
import { affineChiffrer, cleAffineAleatoire, cleInverseAffine, texAffine } from './_arithmetique.ts';

/**
 * Exercice : chiffrement affine appliqué à un mot et à un message.
 *
 *   Q1 : chiffrer un mot avec f(x) = a x + b.
 *   Q2, Q3 : les coefficients de f⁻¹(y) = a' y + b', avec a' = a⁻¹ (mod 26)
 *            et b' = −a' b (mod 26).
 *   Q4 : déchiffrer un message.
 */

/* ===== Logique ===== */

export type Exercice = { a: number; b: number; mot: string; phrase: string };

export function genererExercice(): Exercice {
  const { a, b } = cleAffineAleatoire();
  return { a, b, mot: choisir(MOTS_MOYENS), phrase: choisir(PHRASES) };
}

export const motChiffre = ({ mot, a, b }: Exercice) => affineChiffrer(mot, a, b);
export const messageChiffre = ({ phrase, a, b }: Exercice) => affineChiffrer(lettresSeules(phrase), a, b);

export const questions = (exo: Exercice): Question[] => {
  const { a, b, mot } = exo;
  const inv = cleInverseAffine(a, b);
  return [
    {
      type: 'expression',
      id: 'chiffrer',
      libelle: <>Chiffre le mot <strong>{mot}</strong>.</>,
      verifier: verifierTexte(motChiffre(exo)),
      placeholder: 'Ex : XAZXZS',
      aide: 'Un mot en lettres, sans espaces.',
    },
    {
      type: 'nombre',
      id: 'aprime',
      libelle: (
        <>
          La fonction de déchiffrement s'écrit <MathTex tex="f^{-1}(y) = a'y + b'" />. Que vaut{' '}
          <MathTex tex="a'" /> ?
        </>
      ),
      attendu: inv.a,
      placeholder: 'Ex : 19',
      aide: 'Un entier entre 0 et 25.',
    },
    {
      type: 'nombre',
      id: 'bprime',
      libelle: <>Et que vaut <MathTex tex="b'" /> ?</>,
      attendu: inv.b,
      placeholder: 'Ex : 7',
      aide: 'Un entier entre 0 et 25.',
    },
    {
      type: 'expression',
      id: 'dechiffrer',
      libelle: <>Déchiffre le message C.</>,
      verifier: verifierTexte(exo.phrase),
      placeholder: 'Ex : UN MESSAGE CLAIR',
      aide: 'Les espaces et les accents sont ignorés.',
    },
  ];
};

/* ===== Affichage ===== */

export default function AffineMotEtMessage() {
  const [exo, regenerer] = useTirage(genererExercice);
  const [essai, setEssai] = useState(0);
  if (!exo) return <Chargement />;

  const { a, b, mot, phrase } = exo;
  const inv = cleInverseAffine(a, b);
  const chiffre = motChiffre(exo);
  const message = messageChiffre(exo);
  const clair = lettresSeules(phrase);

  return (
    <Cadre>
      <Titre />
      <Enonce>
        <p>
          On chiffre avec la fonction affine ci-dessous, en numérotant les lettres{' '}
          <MathTex tex="A = 0,\; B = 1,\; \dots,\; Z = 25" /> et en gardant le reste modulo 26.
        </p>
        <div className="exercice-formule">
          <MathTex tex={texAffine(a, b)} />
        </div>
        <p>Message chiffré C :</p>
        <div className="exercice-formule">
          <span className="exercice-code">{message}</span>
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
            {mot} se chiffre en <span className="exercice-code">{chiffre}</span>,{' '}
            <MathTex tex={texAffine(inv.a, inv.b, 'f^{-1}', 'y')} />, et C cachait « {phrase} ».
          </p>
        }
        correction={
          <>
            <li>
              <strong>Chiffrer {mot}.</strong> Lettre par lettre :{' '}
              {mot
                .split('')
                .map((l, i) => `${l}(${versNombre(l)}) → ${a}×${versNombre(l)}${b === 0 ? '' : `+${b}`} = ${a * versNombre(l) + b} ≡ ${mod(a * versNombre(l) + b)} → ${chiffre[i]}`)
                .join(' ; ')}
              . D'où <span className="exercice-code">{chiffre}</span>.
            </li>
            <li>
              <strong>Le coefficient <MathTex tex="a'" />.</strong> C'est l'inverse de {a} modulo 26 :{' '}
              <MathTex tex={`${a} \\times ${inv.a} = ${a * inv.a} = ${Math.round((a * inv.a - 1) / 26)} \\times 26 + 1`} />,
              donc <MathTex tex={`a' = ${inv.a}`} />.
            </li>
            <li>
              <strong>Le coefficient <MathTex tex="b'" />.</strong> De{' '}
              <MathTex tex={`y \\equiv ${a}x + ${b}`} /> on tire{' '}
              <MathTex tex={`x \\equiv ${inv.a}(y - ${b}) \\equiv ${inv.a}y - ${inv.a * b} \\pmod{26}`} />. Comme{' '}
              <MathTex tex={`-${inv.a * b} \\equiv ${inv.b} \\pmod{26}`} />, on obtient{' '}
              <MathTex tex={texAffine(inv.a, inv.b, 'f^{-1}', 'y')} />.
            </li>
            <li>
              <strong>Déchiffrer C.</strong> On applique <MathTex tex="f^{-1}" /> à chaque lettre. Les premières :{' '}
              {message
                .slice(0, 6)
                .split('')
                .map((l, i) => `${l}(${versNombre(l)}) → ${inv.a}×${versNombre(l)}+${inv.b} = ${inv.a * versNombre(l) + inv.b} ≡ ${mod(inv.a * versNombre(l) + inv.b)} → ${clair[i]}`)
                .join(' ; ')}
              … On lit finalement « {phrase} ».
            </li>
          </>
        }
        conseils={
          <>
            <li>
              Calcule <MathTex tex="a'" /> une seule fois, au début : tout le déchiffrement en découle.
            </li>
            <li>
              Vérifie <MathTex tex="f^{-1}" /> sur une lettre déjà chiffrée avant de traiter tout le message : une
              erreur sur <MathTex tex="b'" /> décale toutes les lettres.
            </li>
            <li>
              Le chiffrement affine garde la fréquence des lettres : il se casse comme une substitution, par
              analyse des fréquences, même sans connaître <MathTex tex="a" /> ni <MathTex tex="b" />.
            </li>
          </>
        }
      />
    </Cadre>
  );
}
