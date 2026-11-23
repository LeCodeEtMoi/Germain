import { useState } from 'react';
import { Cadre, Chargement, Enonce, MathTex, Questions, Titre, choisir, melanger, useTirage, type Question } from './_commun.ts';
import { bezout, diviseursStricts, inverseModulaire, inversiblesDe, pgcd, texClasse } from './_arithmetique.ts';
import { parTex } from '@/lib/reponses.ts';

/**
 * Exercice : le pgcd décide de l'inversibilité.
 *
 *   Deux candidats dans Z/nZ : l'un premier avec n (inversible), l'autre non.
 *   Q1, Q2 : les deux pgcd.
 *   Q3 : lequel est inversible.
 *   Q4 : l'inverse de celui qui l'est.
 *
 *   Point clé : a est inversible modulo n ⟺ pgcd(a, n) = 1, car Bézout donne
 *   alors n·u + a·v = 1, donc a·v ≡ 1 (mod n). Si le pgcd vaut d > 1, aucun
 *   multiple de a n'est congru à 1, puisque tout n·u + a·v est multiple de d.
 */

/* ===== Logique ===== */

const MODULES = [84, 90, 98, 102, 105, 110, 114, 117, 120, 126, 132, 135];

export type Exercice = { n: number; bon: number; mauvais: number };

export function genererExercice(): Exercice {
  for (;;) {
    const n = choisir(MODULES);
    const bon = choisir(inversiblesDe(n).filter((k) => k > 10 && k < n));
    // Un candidat non inversible, qui partage un facteur avec n sans être un diviseur évident.
    const facteurs = diviseursStricts(n);
    const candidats: number[] = [];
    for (let k = 10; k < n; k++) {
      const d = pgcd(k, n);
      if (d > 1 && d < k && !facteurs.includes(k)) candidats.push(k);
    }
    if (candidats.length === 0) continue;
    return { n, bon, mauvais: choisir(candidats) };
  }
}

export const questions = (exo: Exercice): Question[] => {
  const { n, bon, mauvais } = exo;
  const options = melanger([
    { valeur: 'bon', contenu: <>Seul <MathTex tex={texClasse(bon)} /></> },
    { valeur: 'mauvais', contenu: <>Seul <MathTex tex={texClasse(mauvais)} /></> },
    { valeur: 'deux', contenu: <>Les deux</> },
    { valeur: 'aucun', contenu: <>Aucun des deux</> },
  ]);
  return [
    {
      type: 'nombre',
      id: 'pgcd1',
      libelle: <>Calcule <MathTex tex={`\\mathrm{pgcd}(${n}, ${bon})`} />.</>,
      attendu: pgcd(n, bon),
      placeholder: 'Ex : 1',
      aide: 'Un nombre entier.',
    },
    {
      type: 'nombre',
      id: 'pgcd2',
      libelle: <>Calcule <MathTex tex={`\\mathrm{pgcd}(${n}, ${mauvais})`} />.</>,
      attendu: pgcd(n, mauvais),
      placeholder: 'Ex : 1',
      aide: 'Un nombre entier.',
    },
    {
      type: 'choix',
      id: 'lequel',
      libelle: (
        <>
          Lequel de <MathTex tex={texClasse(bon)} /> et <MathTex tex={texClasse(mauvais)} /> est inversible dans{' '}
          <MathTex tex={`\\mathbb{Z}/${n}\\mathbb{Z}`} /> ?
        </>
      ),
      attendu: 'bon',
      options,
    },
    {
      type: 'nombre',
      id: 'inverse',
      libelle: <>Donne l'inverse de celui qui est inversible.</>,
      attendu: inverseModulaire(bon, n) as number,
      placeholder: 'Ex : 29',
      aide: `Le représentant entre 0 et ${n - 1}.`,
    },
  ];
};

/* ===== Affichage ===== */

export default function PgcdEtInversibilite() {
  const [exo, regenerer] = useTirage(genererExercice);
  const [essai, setEssai] = useState(0);
  if (!exo) return <Chargement />;

  const { n, bon, mauvais } = exo;
  const d = pgcd(n, mauvais);
  const { u, v } = bezout(n, bon);
  const inverse = inverseModulaire(bon, n) as number;

  return (
    <Cadre>
      <Titre />
      <Enonce>
        <p>
          On travaille dans <MathTex tex={`\\mathbb{Z}/${n}\\mathbb{Z}`} /> et on se demande lesquelles des deux
          classes <MathTex tex={texClasse(bon)} /> et <MathTex tex={texClasse(mauvais)} /> sont inversibles.
        </p>
        <p>
          Calcule d'abord les pgcd avec l'algorithme d'Euclide, puis conclus : l'inverse existe exactement quand le
          pgcd vaut 1, et l'identité de Bézout le fournit.
        </p>
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
            <MathTex tex={`\\mathrm{pgcd}(${n}, ${bon}) = 1`} /> donc {bon} est inversible, d'inverse{' '}
            <strong>{inverse}</strong> ; <MathTex tex={`\\mathrm{pgcd}(${n}, ${mauvais}) = ${d}`} /> donc{' '}
            {mauvais} ne l'est pas.
          </p>
        }
        correction={
          <>
            <li>
              <strong>Les deux pgcd.</strong> L'algorithme d'Euclide donne{' '}
              <MathTex tex={`\\mathrm{pgcd}(${n}, ${bon}) = 1`} /> et{' '}
              <MathTex tex={`\\mathrm{pgcd}(${n}, ${mauvais}) = ${d}`} />.
            </li>
            <li>
              <strong>Le critère.</strong> <MathTex tex={texClasse('a')} /> est inversible dans{' '}
              <MathTex tex={`\\mathbb{Z}/${n}\\mathbb{Z}`} /> si et seulement si{' '}
              <MathTex tex={`\\mathrm{pgcd}(a, ${n}) = 1`} />. Seul {bon} remplit la condition.
            </li>
            <li>
              <strong>Pourquoi {mauvais} échoue.</strong> Tout nombre de la forme{' '}
              <MathTex tex={`${n}\\,u + ${mauvais}\\,v`} /> est un multiple de {d}. Comme 1 n'est pas multiple de{' '}
              {d}, aucun <MathTex tex="v" /> ne donne <MathTex tex={`${mauvais}\\,v \\equiv 1 \\pmod{${n}}`} /> :
              la classe <MathTex tex={texClasse(mauvais)} /> est un diviseur de zéro, pas un inversible.
            </li>
            <li>
              <strong>L'inverse de {bon}.</strong> Bézout donne{' '}
              <MathTex tex={`${n} \\times ${parTex(u)} + ${bon} \\times ${parTex(v)} = 1`} />. En réduisant modulo {n}, le
              premier terme disparaît : <MathTex tex={`${bon} \\times ${parTex(v)} \\equiv 1 \\pmod{${n}}`} />, soit un
              inverse égal à <MathTex tex={`${parTex(v)} \\equiv ${inverse} \\pmod{${n}}`} />. Vérification :{' '}
              <MathTex tex={`${bon} \\times ${inverse} = ${bon * inverse} = ${Math.round((bon * inverse - 1) / n)} \\times ${n} + 1`} />.
            </li>
          </>
        }
        conseils={
          <>
            <li>Calcule le pgcd avant de chercher un inverse : s'il ne vaut pas 1, il n'y a rien à chercher.</li>
            <li>
              Ne confonds pas « {mauvais} n'a pas d'inverse » et « {mauvais} est nul » : c'est un diviseur de zéro,
              une classe non nulle qu'on peut multiplier par une autre classe non nulle pour obtenir{' '}
              <MathTex tex={texClasse(0)} />.
            </li>
            <li>
              Un inverse se ramène toujours entre 0 et {n - 1} : si Bézout donne un <MathTex tex="v" /> négatif,
              ajoute {n}.
            </li>
          </>
        }
      />
    </Cadre>
  );
}
