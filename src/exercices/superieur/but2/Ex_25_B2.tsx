import { useState } from 'react';
import { Cadre, Chargement, Enonce, MathTex, Questions, Titre, choisir, useTirage, type Question } from './_commun.ts';
import { texPuissance10 } from './_crypto.ts';

/**
 * Exercice : coût d'une attaque par force brute sur une clé de b bits.
 *
 *   temps pour une clé = facteur / (Mips × 10⁶) secondes
 *   nombre moyen d'essais = 2^(b−1)
 *   durée moyenne avec M machines = facteur × 2^(b−1) / (M × Mips × 10⁶) secondes
 *   (une année ≈ 3,156 × 10⁷ s)
 *
 *   Q1 : temps pour tester une clé. Q2 : nombre moyen de clés. Q3 : durée en années.
 */

/* ===== Logique ===== */

const SECONDES_PAR_AN = 365.25 * 24 * 3600;

export type Exercice = { bits: number; mips: number; facteur: number; machines: number };

export function genererExercice(): Exercice {
  return {
    bits: choisir([56, 64, 80, 128]),
    mips: choisir([1800, 5000, 20000, 100000]),
    facteur: choisir([800, 1200, 2000]),
    machines: choisir([1e6, 3e8, 1e9]),
  };
}

export const tempsParCle = ({ facteur, mips }: Exercice) => facteur / (mips * 1e6);
export const essaisMoyens = ({ bits }: Exercice) => Math.pow(2, bits - 1);
export const dureeAnnees = (exo: Exercice) =>
  (exo.facteur * essaisMoyens(exo)) / (exo.machines * exo.mips * 1e6) / SECONDES_PAR_AN;

const TOUCHES = [
  { label: '^', texte: '^' },
  { label: '×10^', texte: '*10^' },
];

export const questions = (exo: Exercice): Question[] => [
  {
    type: 'nombre',
    id: 'temps',
    libelle: <>En combien de secondes une machine teste-t-elle une seule clé ?</>,
    attendu: tempsParCle(exo),
    tolerance: 0.02 * tempsParCle(exo),
    placeholder: 'Ex : 6,7*10^-7',
    aide: 'Un nombre de secondes ; écris les puissances de 10 comme 6,7*10^-7.',
    touches: TOUCHES,
  },
  {
    type: 'nombre',
    id: 'essais',
    libelle: <>Combien de clés faut-il tester en moyenne avant de trouver la bonne ?</>,
    attendu: essaisMoyens(exo),
    tolerance: 0.02 * essaisMoyens(exo),
    placeholder: `Ex : 2^${exo.bits - 1}`,
    aide: 'Écris une puissance comme 2^55, ou une valeur approchée comme 3,6*10^16.',
    touches: TOUCHES,
  },
  {
    type: 'nombre',
    id: 'duree',
    libelle: <>En mobilisant les <MathTex tex={texPuissance10(exo.machines, 1)} /> machines, quelle est la durée moyenne du calcul, en années ?</>,
    attendu: dureeAnnees(exo),
    tolerance: 0.05 * dureeAnnees(exo),
    placeholder: 'Ex : 1,5*10^12',
    aide: 'Un nombre d\'années (une année ≈ 3,156*10^7 secondes) ; une tolérance de 5 % est acceptée.',
    touches: TOUCHES,
  },
];

/* ===== Affichage ===== */

export default function ForceBrute() {
  const [exo, regenerer] = useTirage(genererExercice);
  const [essai, setEssai] = useState(0);
  if (!exo) return <Chargement />;

  const { bits, mips, facteur, machines } = exo;
  const t = tempsParCle(exo);
  const essais = essaisMoyens(exo);
  const travail = facteur * essais;
  const puissanceTotale = machines * mips * 1e6;
  const secondes = travail / puissanceTotale;
  const annees = dureeAnnees(exo);

  return (
    <Cadre>
      <Titre />
      <Enonce>
        <p>
          On connaît un couple clair/chiffré et on cherche la clé, un mot de{' '}
          <strong>{bits} bits</strong>, en essayant toutes les clés (toutes équiprobables). Tester une
          clé demande <strong>{facteur.toLocaleString('fr-FR')} instructions</strong> élémentaires, et
          chaque machine exécute <strong>{mips.toLocaleString('fr-FR')} Mips</strong> (millions
          d'instructions par seconde).
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
            Une clé se teste en <MathTex tex={texPuissance10(t)} /> s, il en faut en moyenne{' '}
            <MathTex tex={`2^{${bits - 1}}`} />, et le calcul durerait{' '}
            <MathTex tex={`\\approx ${texPuissance10(annees, 2)}`} /> années
            {annees > 1e4 ? ' — autant dire : jamais' : ''}.
          </p>
        }
        correction={
          <>
            <li>
              <strong>Temps par clé.</strong> {mips.toLocaleString('fr-FR')} Mips ={' '}
              <MathTex tex={texPuissance10(mips * 1e6, 2)} /> instructions par seconde, donc une clé se teste
              en <MathTex tex={`${facteur}/(${texPuissance10(mips * 1e6, 2)}) \\approx ${texPuissance10(t)}`} /> s.
            </li>
            <li>
              <strong>Nombre moyen d'essais.</strong> Il y a <MathTex tex={`2^{${bits}}`} /> clés, et la bonne
              a autant de chances d'être au début qu'à la fin de la recherche : en moyenne, on la trouve à
              mi-parcours, après <MathTex tex={`2^{${bits}}/2 = 2^{${bits - 1}} \\approx ${texPuissance10(essais)}`} /> essais.
            </li>
            <li>
              <strong>Facteur de travail moyen.</strong>{' '}
              <MathTex tex={`${facteur}\\times 2^{${bits - 1}} \\approx ${texPuissance10(travail)}`} /> instructions.
            </li>
            <li>
              <strong>Durée.</strong> Les <MathTex tex={texPuissance10(machines, 1)} /> machines fournissent{' '}
              <MathTex tex={`${texPuissance10(puissanceTotale, 2)}`} /> instructions par seconde :{' '}
              <MathTex tex={`${texPuissance10(travail)}/${texPuissance10(puissanceTotale, 2)} \\approx ${texPuissance10(secondes, 2)}`} /> s,
              soit, à raison de <MathTex tex="3{,}156\times10^{7}" /> s par année,{' '}
              <MathTex tex={`\\approx ${texPuissance10(annees, 2)}`} /> années.
            </li>
            <li>
              <strong>Morale.</strong> {bits >= 128
                ? 'Pour 128 bits, la durée dépasse de très loin l\'âge de l\'Univers (≈ 1,4 × 10¹⁰ années) : la force brute est sans espoir, c\'est tout le sens des recommandations de l\'ANSSI.'
                : bits >= 80
                  ? 'Autour de 80 bits, la durée reste énorme pour un attaquant ordinaire, mais des moyens étatiques s\'en approchent : c\'est la zone grise identifiée par l\'ANSSI.'
                  : 'Pour une clé aussi courte, un attaquant bien équipé aboutit en un temps raisonnable : le DES (56 bits) a été cassé dès 1998 par une machine dédiée.'}
            </li>
          </>
        }
        conseils={
          <>
            <li>Garde les puissances de 10 séparées des mantisses pendant tout le calcul : c'est là que se glissent les erreurs.</li>
            <li>Le nombre <em>moyen</em> d'essais est la moitié du nombre total de clés : <MathTex tex="2^{b-1}" />, pas <MathTex tex="2^{b}" />.</li>
            <li>Chaque bit de clé supplémentaire double le travail de l'attaquant : c'est la lecture concrète de « b bits de sécurité ».</li>
          </>
        }
      />
    </Cadre>
  );
}
