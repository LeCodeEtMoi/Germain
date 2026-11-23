import { useState } from 'react';
import { Cadre, Chargement, Enonce, MathTex, Questions, Titre, entier, useTirage, type Question } from './_commun.ts';
import { ALPHABET, mod, verifierTexte, versLettre, versNombre } from './_crypto.ts';
import { affineChiffrerLettre, cleAffineAleatoire, cleInverseAffine, inverseModulaire, texAffine } from './_arithmetique.ts';

/**
 * Exercice : chiffrement affine, lettre par lettre, et construction de f⁻¹.
 *
 *   f(x) = a x + b (mod 26), avec a inversible modulo 26.
 *   Le cœur de l'exercice est l'équivalence  a x ≡ j (mod 26) ⟺ x ≡ a' j (mod 26),
 *   où a' est l'inverse de a : elle donne f⁻¹(y) = a'(y − b) = a' y + b'.
 *
 *   Q1 : chiffrer une lettre.
 *   Q2 : l'inverse de a modulo 26.
 *   Q3 : déchiffrer une lettre.
 */

/* ===== Logique ===== */

export type Exercice = { a: number; b: number; lettreClaire: string; lettreChiffree: string };

export function genererExercice(): Exercice {
  const { a, b } = cleAffineAleatoire();
  for (;;) {
    const lettreClaire = ALPHABET[entier(0, 25)];
    const lettreChiffree = ALPHABET[entier(0, 25)];
    // On évite les lettres qui se chiffrent ou se déchiffrent en elles-mêmes : la réponse serait trop simple.
    if (affineChiffrerLettre(lettreClaire, a, b) === lettreClaire) continue;
    const inv = cleInverseAffine(a, b);
    if (affineChiffrerLettre(lettreChiffree, inv.a, inv.b) === lettreChiffree) continue;
    return { a, b, lettreClaire, lettreChiffree };
  }
}

export const chiffreDe = ({ lettreClaire, a, b }: Exercice) => affineChiffrerLettre(lettreClaire, a, b);
export const clairDe = ({ lettreChiffree, a, b }: Exercice) => {
  const inv = cleInverseAffine(a, b);
  return affineChiffrerLettre(lettreChiffree, inv.a, inv.b);
};

export const questions = (exo: Exercice): Question[] => {
  const { a, b, lettreClaire, lettreChiffree } = exo;
  return [
    {
      type: 'expression',
      id: 'chiffrer',
      libelle: <>Chiffre la lettre <strong>{lettreClaire}</strong>.</>,
      verifier: verifierTexte(chiffreDe(exo)),
      placeholder: 'Ex : K',
      aide: 'Une seule lettre.',
    },
    {
      type: 'nombre',
      id: 'inverse',
      libelle: (
        <>
          Pour inverser <MathTex tex={`${a}x`} />, on cherche l'entier <MathTex tex="a'" /> compris entre 0 et 25 tel
          que <MathTex tex={`${a}x \\equiv j \\iff x \\equiv a'\\,j \\pmod{26}`} /> pour tous entiers{' '}
          <MathTex tex="x" /> et <MathTex tex="j" />. Que vaut <MathTex tex="a'" /> ?
        </>
      ),
      attendu: inverseModulaire(a, 26) as number,
      placeholder: 'Ex : 3',
      aide: 'Un entier entre 0 et 25.',
    },
    {
      type: 'expression',
      id: 'dechiffrer',
      libelle: <>Déchiffre la lettre <strong>{lettreChiffree}</strong>.</>,
      verifier: verifierTexte(clairDe(exo)),
      placeholder: 'Ex : K',
      aide: 'Une seule lettre.',
    },
  ];
};

/* ===== Affichage ===== */

export default function AffineLettre() {
  const [exo, regenerer] = useTirage(genererExercice);
  const [essai, setEssai] = useState(0);
  if (!exo) return <Chargement />;

  const { a, b, lettreClaire, lettreChiffree } = exo;
  const inv = cleInverseAffine(a, b);
  const x = versNombre(lettreClaire);
  const brut = a * x + b;
  const y = mod(brut);
  const yc = versNombre(lettreChiffree);
  const brutInverse = inv.a * yc + inv.b;
  const xc = mod(brutInverse);
  const produit = a * inv.a;

  return (
    <Cadre>
      <Titre />
      <Enonce>
        <p>
          Dans un <strong>chiffrement affine</strong>, on numérote les lettres{' '}
          <MathTex tex="A = 0,\; B = 1,\; \dots,\; Z = 25" />. À une lettre de rang <MathTex tex="x" />, on associe
          le reste <MathTex tex="y" /> de la division de <MathTex tex="f(x)" /> par 26, puis on retraduit{' '}
          <MathTex tex="y" /> en lettre. Ici :
        </p>
        <div className="exercice-formule">
          <MathTex tex={texAffine(a, b)} />
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
            {lettreClaire} se chiffre en <strong>{chiffreDe(exo)}</strong>, l'inverse de {a} modulo 26 est{' '}
            <strong>{inv.a}</strong>, et {lettreChiffree} se déchiffre en <strong>{clairDe(exo)}</strong>.
          </p>
        }
        correction={
          <>
            <li>
              <strong>Chiffrer {lettreClaire}.</strong> Son rang est <MathTex tex={`x = ${x}`} />, donc{' '}
              <MathTex tex={`f(${x}) = ${a} \\times ${x} ${b === 0 ? '' : `+ ${b}`} = ${brut}`} />. Le reste de{' '}
              {brut} dans la division par 26 vaut{' '}
              <MathTex tex={`${brut} - ${Math.floor(brut / 26)} \\times 26 = ${y}`} />, ce qui donne la lettre{' '}
              <strong>{versLettre(y)}</strong>.
            </li>
            <li>
              <strong>L'inverse de {a}.</strong> On cherche <MathTex tex="a'" /> tel que{' '}
              <MathTex tex={`${a}\\,a' \\equiv 1 \\pmod{26}`} /> : c'est possible car{' '}
              <MathTex tex={`\\mathrm{pgcd}(${a}, 26) = 1`} />. Ici{' '}
              <MathTex tex={`${a} \\times ${inv.a} = ${produit} = ${Math.round((produit - 1) / 26)} \\times 26 + 1`} />,
              donc <MathTex tex={`a' = ${inv.a}`} />. En multipliant par <MathTex tex="a'" /> les deux membres de{' '}
              <MathTex tex={`${a}x \\equiv j`} />, on obtient bien{' '}
              <MathTex tex={`x \\equiv ${inv.a}\\,j \\pmod{26}`} />, et réciproquement en multipliant par {a}.
            </li>
            <li>
              <strong>La fonction de déchiffrement.</strong> De{' '}
              <MathTex tex={`y \\equiv ${a}x ${b === 0 ? '' : `+ ${b}`}`} /> on tire{' '}
              <MathTex tex={`${a}x \\equiv y - ${b}`} />, puis{' '}
              <MathTex tex={`x \\equiv ${inv.a}(y - ${b}) \\equiv ${inv.a}y - ${inv.a * b} \\pmod{26}`} />. Comme{' '}
              <MathTex tex={`-${inv.a * b} \\equiv ${inv.b} \\pmod{26}`} />, on obtient{' '}
              <MathTex tex={texAffine(inv.a, inv.b, 'f^{-1}', 'y')} />.
            </li>
            <li>
              <strong>Déchiffrer {lettreChiffree}.</strong> Son rang est <MathTex tex={`y = ${yc}`} />, donc{' '}
              <MathTex tex={`f^{-1}(${yc}) = ${inv.a} \\times ${yc} ${inv.b === 0 ? '' : `+ ${inv.b}`} = ${brutInverse} \\equiv ${xc} \\pmod{26}`} />,
              soit la lettre <strong>{versLettre(xc)}</strong>. On vérifie en rechiffrant :{' '}
              <MathTex tex={`f(${xc}) = ${a * xc + b} \\equiv ${yc} \\pmod{26}`} />.
            </li>
          </>
        }
        conseils={
          <>
            <li>
              Ne divise jamais par {a} : dans <MathTex tex="\mathbb{Z}/26\mathbb{Z}" />, on multiplie par l'inverse{' '}
              <MathTex tex="a'" />.
            </li>
            <li>
              Le chiffrement n'est réversible que si <MathTex tex="\mathrm{pgcd}(a, 26) = 1" /> : avec un{' '}
              <MathTex tex="a" /> pair ou multiple de 13, deux lettres différentes auraient le même chiffré.
            </li>
            <li>Ramène toujours le résultat entre 0 et 25 avant de retraduire en lettre.</li>
          </>
        }
      />
    </Cadre>
  );
}
