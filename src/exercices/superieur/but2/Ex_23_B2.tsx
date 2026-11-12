import { useState } from 'react';
import { Cadre, Chargement, Enonce, MathTex, Questions, Titre, melanger, useTirage, type Question } from './_commun.ts';
import { MOTS2, estBijective, feistel, fonctionAleatoire2, motAleatoire4, verifierBits, xor, type Fonction2 } from './_crypto.ts';

/**
 * Exercice : schéma de Feistel sur des mots de 4 bits (n = 2) et mini-DES à 2 tours.
 *
 *   m = g‖d ;  F(g‖d) = d ‖ (g ⊕ f(d))  ;  F⁻¹(g′‖d′) = (d′ ⊕ f(g′)) ‖ g′.
 *   F est bijective même quand f ne l'est pas.
 *   Mini-DES : c = F₂(F₁(m)).
 *
 *   Q1 : f₁ est-elle bijective ? (QCM)
 *   Q2 : calculer F₁(m).
 *   Q3 : chiffrer m avec le mini-DES à deux tours.
 */

/* ===== Logique ===== */

export type Exercice = { f1: Fonction2; f2: Fonction2; m: string };

export function genererExercice(): Exercice {
  return { f1: fonctionAleatoire2(), f2: fonctionAleatoire2(), m: motAleatoire4() };
}

export const intermediaire = ({ m, f1 }: Exercice) => feistel(m, f1);
export const chiffre = (exo: Exercice) => feistel(intermediaire(exo), exo.f2);

export const questions = (exo: Exercice): Question[] => [
  {
    type: 'choix',
    id: 'bijective',
    libelle: <>La fonction <MathTex tex="f_1" /> est-elle bijective ?</>,
    attendu: estBijective(exo.f1) ? 'oui' : 'non',
    enLigne: true,
    options: [
      { valeur: 'oui', contenu: <>Oui</> },
      { valeur: 'non', contenu: <>Non</> },
    ],
  },
  {
    type: 'expression',
    id: 'un-tour',
    libelle: <>Calcule <MathTex tex={`F_1(${exo.m})`} />, l'image de <MathTex tex="m" /> par la fonction de Feistel associée à <MathTex tex="f_1" />.</>,
    verifier: verifierBits(intermediaire(exo)),
    placeholder: 'Ex : 0110',
    aide: 'Quatre bits, sans espaces.',
  },
  {
    type: 'expression',
    id: 'deux-tours',
    libelle: <>Chiffre <MathTex tex="m" /> avec le mini-DES à deux tours : <MathTex tex="c = F_2(F_1(m))" />.</>,
    verifier: verifierBits(chiffre(exo)),
    placeholder: 'Ex : 1001',
    aide: 'Quatre bits, sans espaces.',
  },
];

/* ===== Affichage ===== */

function TableF({ f, nom }: { f: Fonction2; nom: string }) {
  return (
    <MathTex
      tex={`\\begin{array}{c|cccc} x & ${MOTS2.join(' & ')} \\\\ \\hline ${nom}(x) & ${MOTS2.map((x) => f[x]).join(' & ')} \\end{array}`}
    />
  );
}

export default function SchemaFeistel() {
  const [exo, regenerer] = useTirage(genererExercice);
  const [essai, setEssai] = useState(0);
  if (!exo) return <Chargement />;

  const { f1, f2, m } = exo;
  const g = m.slice(0, 2);
  const d = m.slice(2);
  const inter = intermediaire(exo);
  const c = chiffre(exo);
  const images1 = MOTS2.map((x) => f1[x]);
  const doublon = images1.find((v, i) => images1.indexOf(v) !== i);

  return (
    <Cadre>
      <Titre />
      <Enonce>
        <p>
          Un mot <MathTex tex="m" /> de 4 bits s'écrit <MathTex tex="m = g\,\Vert\,d" /> (moitiés gauche
          et droite de 2 bits). La <strong>fonction de Feistel</strong> associée à{' '}
          <MathTex tex="f" /> est :
        </p>
        <div className="exercice-formule">
          <MathTex tex="F(g\,\Vert\,d) = d \,\Vert\, (g \oplus f(d))" />
        </div>
        <p>
          Un mini-DES à deux tours chiffre <MathTex tex="m" /> par <MathTex tex="c = F_2(F_1(m))" />, où{' '}
          <MathTex tex="F_1" /> et <MathTex tex="F_2" /> sont associées à <MathTex tex="f_1" /> et{' '}
          <MathTex tex="f_2" /> (calculées à partir de la clé). Ici <MathTex tex={`m = ${m}`} /> et :
        </p>
        <div className="exercice-formule">
          <TableF f={f1} nom="f_1" />
          <br />
          <TableF f={f2} nom="f_2" />
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
            <MathTex tex={`F_1(${m}) = ${inter}`} /> et <MathTex tex={`c = ${c}`} /> — et <MathTex tex="F" /> est
            bijective même quand <MathTex tex="f" /> ne l'est pas : c'est toute l'élégance du schéma de Feistel.
          </p>
        }
        correction={
          <>
            <li>
              <strong>Bijectivité de <MathTex tex="f_1" />.</strong> Sur un ensemble fini, il suffit de
              regarder si les 4 images sont toutes différentes. Ici : {images1.join(', ')} —{' '}
              {estBijective(f1) ? (
                <>toutes distinctes, <MathTex tex="f_1" /> est bijective.</>
              ) : (
                <>{doublon} apparaît deux fois, <MathTex tex="f_1" /> n'est pas bijective. Peu importe : <MathTex tex="F_1" /> le sera quand même.</>
              )}
            </li>
            <li>
              <strong>Un tour.</strong> <MathTex tex={`m = ${m}`} /> donne <MathTex tex={`g = ${g}`} />,{' '}
              <MathTex tex={`d = ${d}`} />. Alors <MathTex tex={`f_1(${d}) = ${f1[d]}`} /> et{' '}
              <MathTex tex={`g \\oplus f_1(d) = ${g} \\oplus ${f1[d]} = ${xor(g, f1[d])}`} />, d'où{' '}
              <MathTex tex={`F_1(${m}) = ${d}\\,\\Vert\\,${xor(g, f1[d])} = ${inter}`} />.
            </li>
            <li>
              <strong>Deuxième tour.</strong> On recommence sur <MathTex tex={`${inter}`} /> :{' '}
              <MathTex tex={`g = ${inter.slice(0, 2)}`} />, <MathTex tex={`d = ${inter.slice(2)}`} />,{' '}
              <MathTex tex={`f_2(${inter.slice(2)}) = ${f2[inter.slice(2)]}`} />, d'où{' '}
              <MathTex tex={`c = ${inter.slice(2)}\\,\\Vert\\,${xor(inter.slice(0, 2), f2[inter.slice(2)])} = ${c}`} />.
            </li>
            <li>
              <strong>Pourquoi <MathTex tex="F" /> est toujours bijective.</strong> Si{' '}
              <MathTex tex="F(g\Vert d) = g'\Vert d'" />, alors <MathTex tex="g' = d" /> et{' '}
              <MathTex tex="d' = g \oplus f(d)" /> : on retrouve <MathTex tex="d = g'" /> puis{' '}
              <MathTex tex="g = d' \oplus f(g')" />. La formule{' '}
              <MathTex tex="F^{-1}(g'\Vert d') = (d' \oplus f(g'))\,\Vert\, g'" /> inverse <MathTex tex="F" />{' '}
              sans jamais inverser <MathTex tex="f" />. Pour déchiffrer le mini-DES, on défait les tours à
              l'envers : <MathTex tex={`F_1^{-1}(F_2^{-1}(${c})) = ${m}`} />.
            </li>
          </>
        }
        conseils={
          <>
            <li><MathTex tex="f" /> s'applique à la moitié <em>droite</em>, et cette moitié droite passe telle quelle à gauche.</li>
            <li>Note le résultat du premier tour avant d'attaquer le second : c'est lui qu'on redécoupe en <MathTex tex="g\,\Vert\,d" />.</li>
            <li>Au déchiffrement, les tours se défont dans l'ordre inverse — comme dans le vrai DES et ses 16 tours.</li>
          </>
        }
      />
    </Cadre>
  );
}
