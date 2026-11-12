import { useState } from 'react';
import { Cadre, Chargement, Enonce, MathTex, Questions, Titre, choisir, melanger, useTirage, type Question } from './_commun.ts';
import { hasard, texPuissance10 } from './_crypto.ts';

/**
 * Exercice : entropie (« force ») d'un mot de passe.
 *
 *   N symboles possibles, L caractères tirés au hasard :
 *     combinaisons = N^L ;  entropie = log₂(N^L) = L·log₂(N) bits.
 *   Barème (ANSSI, vu en cours) : < 64 très faible ; 64–80 faible ;
 *   80–100 moyenne ; > 100 forte.
 *
 *   Q1 : nombre de combinaisons. Q2 : entropie en bits. Q3 : force (QCM).
 */

/* ===== Logique ===== */

const JEUX = [
  { taille: 26, description: 'lettres minuscules' },
  { taille: 36, description: 'lettres minuscules et chiffres' },
  { taille: 52, description: 'lettres minuscules et majuscules' },
  { taille: 62, description: 'lettres, majuscules et chiffres' },
  { taille: 70, description: 'lettres, chiffres et 8 caractères spéciaux' },
  { taille: 90, description: 'lettres, chiffres et 28 caractères spéciaux' },
];

const FORCES = [
  { valeur: 'tres-faible', nom: 'Très faible', texte: 'moins de 64 bits' },
  { valeur: 'faible', nom: 'Faible', texte: 'de 64 à 80 bits' },
  { valeur: 'moyenne', nom: 'Moyenne', texte: 'de 80 à 100 bits' },
  { valeur: 'forte', nom: 'Forte', texte: 'plus de 100 bits' },
] as const;

export function force(h: number) {
  if (h < 64) return FORCES[0];
  if (h < 80) return FORCES[1];
  if (h <= 100) return FORCES[2];
  return FORCES[3];
}

export type Exercice = { taille: number; description: string; L: number };

export function genererExercice(): Exercice {
  for (;;) {
    const { taille, description } = choisir(JEUX);
    const L = hasard(8, 20);
    const h = L * Math.log2(taille);
    // On écarte les cas trop proches d'un seuil du barème (± 2 bits).
    if ([64, 80, 100].every((s) => Math.abs(h - s) > 2)) return { taille, description, L };
  }
}

export const combinaisons = ({ taille, L }: Exercice) => Math.pow(taille, L);
export const entropie = ({ taille, L }: Exercice) => L * Math.log2(taille);

export const questions = (exo: Exercice): Question[] => {
  const { taille, L } = exo;
  const h = entropie(exo);
  return [
    {
      type: 'nombre',
      id: 'combinaisons',
      libelle: <>Combien de combinaisons une attaque par force brute doit-elle tester, au pire, pour être certaine de trouver le mot de passe ?</>,
      attendu: combinaisons(exo),
      tolerance: 0.01 * combinaisons(exo),
      placeholder: `Ex : ${taille}^${L}`,
      aide: 'Écris une puissance comme 26^8, ou une valeur approchée comme 2,1*10^11.',
      touches: [
        { label: '^', texte: '^' },
        { label: '×10^', texte: '*10^' },
      ],
    },
    {
      type: 'nombre',
      id: 'entropie',
      libelle: <>Quelle est l'entropie de ce mot de passe, en bits (arrondie à l'unité) ?</>,
      attendu: h,
      tolerance: 1,
      placeholder: 'Ex : 56',
      aide: 'Un nombre de bits.',
    },
    {
      type: 'choix',
      id: 'force',
      libelle: <>D'après le barème, quelle est la force de ce mot de passe ?</>,
      attendu: force(h).valeur,
      options: melanger(FORCES.map((f) => ({ valeur: f.valeur, contenu: <>{f.nom} ({f.texte})</> }))),
    },
  ];
};

/* ===== Affichage ===== */

export default function EntropieMotDePasse() {
  const [exo, regenerer] = useTirage(genererExercice);
  const [essai, setEssai] = useState(0);
  if (!exo) return <Chargement />;

  const { taille, description, L } = exo;
  const h = entropie(exo);
  const logN = Math.log2(taille);
  const arrondi = (x: number) => Math.round(x * 100) / 100;
  const f = force(h);

  return (
    <Cadre>
      <Titre />
      <Enonce>
        <p>
          L'<strong>entropie</strong> d'un mot de passe mesure sa « force » : c'est le logarithme en
          base 2 du nombre de combinaisons qu'une attaque par force brute devrait tester. Barème vu en
          cours : moins de 64 bits, très faible ; de 64 à 80, faible ; de 80 à 100, moyenne ; au-delà,
          forte.
        </p>
        <p>
          Un mot de passe de <strong>{L} caractères</strong> est tiré au hasard parmi{' '}
          <strong>{taille} symboles</strong> ({description}).
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
            <MathTex tex={`${taille}^{${L}}`} /> combinaisons, soit une entropie de{' '}
            <MathTex tex={`${L}\\times\\log_2(${taille})\\approx ${Math.round(h)}`} /> bits : force{' '}
            {f.nom.toLowerCase()}.
          </p>
        }
        correction={
          <>
            <li>
              <strong>Combinaisons.</strong> Chacune des {L} positions peut prendre {taille} valeurs,
              indépendamment des autres : <MathTex tex={`${taille}^{${L}}\\approx ${texPuissance10(combinaisons(exo))}`} /> combinaisons.
            </li>
            <li>
              <strong>Entropie.</strong>{' '}
              <MathTex tex={`\\log_2(${taille}^{${L}}) = ${L}\\times\\log_2(${taille}) \\approx ${L}\\times ${arrondi(logN).toString().replace('.', '{,}')} \\approx ${arrondi(h).toString().replace('.', '{,}')}`} />,
              soit environ {Math.round(h)} bits.
            </li>
            <li>
              <strong>Force.</strong> {Math.round(h)} bits
              {h < 64 ? ' < 64' : h < 80 ? ' est entre 64 et 80' : h <= 100 ? ' est entre 80 et 100' : ' > 100'} :
              d'après le barème, la force est <strong>{f.nom.toLowerCase()}</strong>.
            </li>
            <li>
              <strong>Pour comparer.</strong> L'ANSSI recommande au moins 100 bits (128 pour une clé de
              longue durée). Allonger le mot de passe augmente l'entropie plus vite qu'élargir le jeu de
              symboles : chaque caractère ajoute <MathTex tex={`\\log_2(${taille})\\approx ${arrondi(logN).toString().replace('.', '{,}')}`} /> bits.
            </li>
          </>
        }
        conseils={
          <>
            <li>Sur ta calculatrice : <MathTex tex="\log_2(x) = \ln(x)/\ln(2)" />.</li>
            <li>Erreur fréquente : multiplier la longueur par le nombre de symboles (<MathTex tex="N\times L" />) au lieu de calculer <MathTex tex="N^L" />.</li>
            <li>La formule suppose un tirage au hasard : un mot du dictionnaire a une entropie bien plus faible que son nombre de caractères ne le suggère.</li>
          </>
        }
      />
    </Cadre>
  );
}
