import { useState } from 'react';
import { Cadre, Chargement, Enonce, MathTex, Questions, Titre, choisir, useTirage, type Question } from './_commun.ts';
import { PHRASES, lettresSeules, mod, verifierTexte, versNombre } from './_crypto.ts';
import {
  affineChiffrer,
  affineChiffrerLettre,
  cleAffineAleatoire,
  cleInverseAffine,
  couplePourAttaque,
  inverseModulaire,
  texAffine,
} from './_arithmetique.ts';

/**
 * Exercice : casser un chiffrement affine à partir de deux lettres connues.
 *
 *   On connaît f(x₁) = y₁ et f(x₂) = y₂, d'où le système
 *       x₁ a + b ≡ y₁ (mod 26)
 *       x₂ a + b ≡ y₂ (mod 26)
 *   La soustraction élimine b : (x₁ − x₂) a ≡ y₁ − y₂ (mod 26).
 *   Le tirage garantit pgcd(x₁ − x₂, 26) = 1, donc a est unique, puis b s'en déduit.
 */

/* ===== Logique ===== */

export type Exercice = { a: number; b: number; l1: string; l2: string; phrase: string };

export function genererExercice(): Exercice {
  for (;;) {
    const { a, b } = cleAffineAleatoire();
    const [l1, l2] = couplePourAttaque();
    // On écarte les cas où une lettre indice se chiffre en elle-même : l'indice serait trompeur.
    if (affineChiffrerLettre(l1, a, b) === l1) continue;
    if (affineChiffrerLettre(l2, a, b) === l2) continue;
    return { a, b, l1, l2, phrase: choisir(PHRASES) };
  }
}

export const imageDe = (lettre: string, { a, b }: Exercice) => affineChiffrerLettre(lettre, a, b);
export const messageChiffre = ({ phrase, a, b }: Exercice) => affineChiffrer(lettresSeules(phrase), a, b);

export const questions = (exo: Exercice): Question[] => [
  {
    type: 'nombre',
    id: 'a',
    libelle: <>Que vaut le coefficient <MathTex tex="a" /> ?</>,
    attendu: exo.a,
    placeholder: 'Ex : 7',
    aide: 'Un entier entre 0 et 25.',
  },
  {
    type: 'nombre',
    id: 'b',
    libelle: <>Et le coefficient <MathTex tex="b" /> ?</>,
    attendu: exo.b,
    placeholder: 'Ex : 2',
    aide: 'Un entier entre 0 et 25.',
  },
  {
    type: 'expression',
    id: 'message',
    libelle: <>Déchiffre le message intercepté.</>,
    verifier: verifierTexte(exo.phrase),
    placeholder: 'Ex : UN MESSAGE CLAIR',
    aide: 'Les espaces et les accents sont ignorés.',
  },
];

/* ===== Affichage ===== */

export default function AttaqueAffine() {
  const [exo, regenerer] = useTirage(genererExercice);
  const [essai, setEssai] = useState(0);
  if (!exo) return <Chargement />;

  const { a, b, l1, l2, phrase } = exo;
  const c1 = imageDe(l1, exo);
  const c2 = imageDe(l2, exo);
  const x1 = versNombre(l1);
  const x2 = versNombre(l2);
  const y1 = versNombre(c1);
  const y2 = versNombre(c2);
  const dx = mod(x1 - x2);
  const dy = mod(y1 - y2);
  const dxInv = inverseModulaire(dx, 26) as number;
  const inv = cleInverseAffine(a, b);
  const message = messageChiffre(exo);
  const clair = lettresSeules(phrase);

  return (
    <Cadre>
      <Titre />
      <Enonce>
        <p>
          On intercepte le message ci-dessous. On sait qu'il a été chiffré par une fonction affine{' '}
          <MathTex tex="f(x) = ax + b" />, où <MathTex tex="a" /> et <MathTex tex="b" /> sont deux entiers compris
          entre 0 et 25, avec la numérotation <MathTex tex="A = 0,\; B = 1,\; \dots,\; Z = 25" />.
        </p>
        <div className="exercice-formule">
          <span className="exercice-code">{message}</span>
        </div>
        <p>
          Un informateur a donné deux correspondances : la lettre <strong>{l1}</strong> est chiffrée par{' '}
          <strong>{c1}</strong>, et la lettre <strong>{l2}</strong> est chiffrée par <strong>{c2}</strong>.
        </p>
        <p>Ces deux renseignements donnent un système de deux congruences :</p>
        <div className="exercice-formule">
          <MathTex
            tex={`\\begin{cases} ${x1}\\,a + b \\equiv ${y1} \\pmod{26} \\\\[2pt] ${x2}\\,a + b \\equiv ${y2} \\pmod{26} \\end{cases}`}
          />
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
            <MathTex tex={texAffine(a, b)} />, et le message disait « {phrase} ».
          </p>
        }
        correction={
          <>
            <li>
              <strong>Le système.</strong> {l1} a pour rang {x1} et {c1} pour rang {y1}, donc{' '}
              <MathTex tex={`${x1}a + b \\equiv ${y1} \\pmod{26}`} />. De même {l2} a pour rang {x2} et {c2} pour
              rang {y2}, d'où <MathTex tex={`${x2}a + b \\equiv ${y2} \\pmod{26}`} />.
            </li>
            <li>
              <strong>Éliminer <MathTex tex="b" />.</strong> En soustrayant les deux lignes :{' '}
              <MathTex tex={`(${x1} - ${x2})\\,a \\equiv ${y1} - ${y2} \\pmod{26}`} />, soit{' '}
              <MathTex tex={`${dx}\\,a \\equiv ${dy} \\pmod{26}`} />.
            </li>
            <li>
              <strong>Trouver <MathTex tex="a" />.</strong> Comme{' '}
              <MathTex tex={`\\mathrm{pgcd}(${dx}, 26) = 1`} />, le coefficient {dx} est inversible modulo 26, et son
              inverse est {dxInv} (car{' '}
              <MathTex tex={`${dx} \\times ${dxInv} = ${dx * dxInv} \\equiv 1 \\pmod{26}`} />). En multipliant :{' '}
              <MathTex tex={`a \\equiv ${dxInv} \\times ${dy} = ${dxInv * dy} \\equiv ${a} \\pmod{26}`} />.
            </li>
            <li>
              <strong>Trouver <MathTex tex="b" />.</strong> On reporte dans la première équation :{' '}
              <MathTex tex={`b \\equiv ${y1} - ${x1} \\times ${a} = ${y1 - x1 * a} \\equiv ${b} \\pmod{26}`} />. La
              fonction de chiffrement est donc <MathTex tex={texAffine(a, b)} />.
            </li>
            <li>
              <strong>Déchiffrer.</strong> L'inverse de {a} modulo 26 est {inv.a}, donc{' '}
              <MathTex tex={texAffine(inv.a, inv.b, 'f^{-1}', 'y')} />. Les premières lettres :{' '}
              {message
                .slice(0, 6)
                .split('')
                .map((l, i) => `${l}(${versNombre(l)}) → ${mod(inv.a * versNombre(l) + inv.b)} → ${clair[i]}`)
                .join(' ; ')}
              … Le message était « {phrase} ».
            </li>
          </>
        }
        conseils={
          <>
            <li>
              Soustraire les deux équations est le bon réflexe : <MathTex tex="b" /> disparaît et il ne reste qu'une
              inconnue.
            </li>
            <li>
              L'écart <MathTex tex="x_1 - x_2" /> doit être inversible modulo 26 pour conclure. S'il était pair ou
              multiple de 13, il faudrait un troisième couple de lettres.
            </li>
            <li>
              Deux lettres connues suffisent à casser le chiffrement : c'est pourquoi le chiffrement affine ne
              résiste pas à une attaque à clair connu.
            </li>
          </>
        }
      />
    </Cadre>
  );
}
