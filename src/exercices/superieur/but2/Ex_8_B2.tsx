import { useState } from 'react';
import { Cadre, Chargement, Enonce, MathTex, Questions, Titre, arrondi, choisir, entier, melanger, permuter, txtDec, useTirage, type Question } from './_commun.ts';

/**
 * Exercice : durée de vie exponentielle, d'espérance m (λ = 1/m).
 *
 *   P(T > t)            = e^(−t/m)
 *   P(T > s+t | T > s)  = P(T > t)   (absence de mémoire)
 *   médiane             = m ln 2
 */

/* ===== Logique ===== */

export type Exercice = { m: number; t1: number; t2: number; ordre: number[] };

/** Espérances dont l'inverse est un décimal exact. */
const MOYENNES = [200, 250, 400, 500, 800, 1000, 1250, 2000];

export function genererExercice(): Exercice {
  const m = choisir(MOYENNES);
  const pas = m >= 800 ? 100 : 50;
  const choix = (): number => {
    for (;;) {
      const t = pas * entier(1, 40);
      if (t / m >= 0.2 && t / m <= 2) return t;
    }
  };
  const t1 = choix();
  let t2 = choix();
  while (t2 === t1) t2 = choix();
  return { m, t1, t2, ordre: melanger([0, 1, 2, 3]) };
}

export const lambda = (e: Exercice) => 1 / e.m;
export const survie = (e: Exercice, t: number) => Math.exp(-t / e.m);
export const conditionnelle = (e: Exercice) => survie(e, e.t2);
export const mediane = (e: Exercice) => e.m * Math.LN2;

export const questions = (exo: Exercice): Question[] => {
  const { t1, t2 } = exo;
  return [
    { type: 'nombre', id: 'lambda', libelle: <>Quel est le paramètre <MathTex tex="\lambda" /> de la loi de <MathTex tex="T" /> ?</>, attendu: lambda(exo), placeholder: 'Ex : 0,004', aide: 'Un nombre décimal (ou une fraction comme 1/250).' },
    {
      type: 'nombre', id: 'surv', libelle: <>Calcule <MathTex tex={`P(T>${t1})`} /> (arrondi au millième).</>, attendu: survie(exo, t1), tolerance: 0.0011,
      placeholder: 'Ex : 0,368', aide: 'Valeur approchée à 0,001 près.',
    },
    {
      type: 'choix', id: 'memoire', libelle: <>La probabilité que l’appareil fonctionne encore <MathTex tex={`${t2}`} /> heures de plus, sachant qu’il a déjà fonctionné <MathTex tex={`${t1}`} /> heures, est égale à :</>, attendu: 'memoire',
      options: permuter(
        [
          { valeur: 'memoire', contenu: <MathTex tex={`P(T>${t2})`} /> },
          { valeur: 'somme', contenu: <MathTex tex={`P(T>${t1 + t2})`} /> },
          { valeur: 'deja', contenu: <MathTex tex={`P(T>${t1})`} /> },
          { valeur: 'produit', contenu: <MathTex tex={`1-P(T>${t2})`} /> },
        ],
        exo.ordre,
      ),
    },
    {
      type: 'nombre', id: 'cond', libelle: <>Calcule <MathTex tex={`P_{(T>${t1})}(T>${t1 + t2})`} /> (arrondi au millième).</>, attendu: conditionnelle(exo), tolerance: 0.0011,
      placeholder: 'Ex : 0,247', aide: 'Valeur approchée à 0,001 près.',
    },
    {
      type: 'nombre', id: 'med', libelle: <>Quelle est la durée médiane <MathTex tex="t_{1/2}" /> (telle que <MathTex tex="P(T>t_{1/2})=\frac12" />) ? Réponse en heures, à une heure près.</>, attendu: mediane(exo), tolerance: 1,
      placeholder: 'Ex : 693', aide: 'Valeur approchée à une heure près.',
    },
  ];
};

/* ===== Affichage ===== */

const d3 = (x: number) => arrondi(x, 3).toFixed(3).replace('.', '{,}');

export default function DureeDeVie() {
  const [exo, regenerer] = useTirage(genererExercice);
  const [essai, setEssai] = useState(0);
  if (!exo) return <Chargement />;

  const { m, t1, t2 } = exo;
  const lam = lambda(exo);

  return (
    <Cadre>
      <Titre />
      <Enonce>
        <p>
          La durée de vie, en heures, d’un composant électronique est une variable aléatoire <MathTex tex="T" /> qui suit une loi exponentielle de paramètre <MathTex tex="\lambda" />. Sa durée de vie moyenne est <MathTex tex="E(T)" /> = <strong>{m} heures</strong>.
        </p>
        <p>
          On rappelle que <MathTex tex="P(T>t)=e^{-\lambda t}" /> pour <MathTex tex="t\ge0" /> et que <MathTex tex="E(T)=\frac1\lambda" />.
        </p>
      </Enonce>
      <Questions
        key={essai}
        questions={questions(exo)}
        onNouveau={() => {
          regenerer();
          setEssai((x) => x + 1);
        }}
        succes={
          <p>
            <MathTex tex={`\\lambda=${txtDec(lam).replace(',', '{,}')}`} />, <MathTex tex={`P(T>${t1})\\approx ${d3(survie(exo, t1))}`} />, <MathTex tex={`P_{(T>${t1})}(T>${t1 + t2})=P(T>${t2})\\approx ${d3(conditionnelle(exo))}`} /> et la médiane vaut environ {Math.round(mediane(exo))} heures.
          </p>
        }
        correction={
          <>
            <li>
              <strong>Paramètre.</strong> <MathTex tex={`E(T)=\\dfrac1\\lambda=${m}`} />, donc <MathTex tex={`\\lambda=\\dfrac1{${m}}=${txtDec(lam).replace(',', '{,}')}`} />.
            </li>
            <li>
              <strong>Probabilité.</strong> <MathTex tex={`P(T>${t1})=e^{-\\lambda\\times${t1}}=e^{-\\frac{${t1}}{${m}}}\\approx ${d3(survie(exo, t1))}`} />.
            </li>
            <li>
              <strong>Absence de mémoire.</strong> La loi exponentielle « ne vieillit pas » : <MathTex tex="P_{(T>s)}(T>s+t)=P(T>t)" />. Ici <MathTex tex={`P_{(T>${t1})}(T>${t1 + t2})=P(T>${t2})`} />. En effet <MathTex tex={`\\dfrac{P(T>${t1 + t2})}{P(T>${t1})}=\\dfrac{e^{-\\lambda(${t1 + t2})}}{e^{-\\lambda\\times${t1}}}=e^{-\\lambda\\times${t2}}`} />.
            </li>
            <li>
              <strong>Valeur.</strong> <MathTex tex={`P(T>${t2})=e^{-\\frac{${t2}}{${m}}}\\approx ${d3(conditionnelle(exo))}`} />.
            </li>
            <li>
              <strong>Médiane.</strong> <MathTex tex="e^{-\lambda t}=\frac12" /> donne <MathTex tex={`t=\\dfrac{\\ln2}{\\lambda}=${m}\\ln2\\approx ${mediane(exo).toFixed(1).replace('.', '{,}')}`} /> heures.
            </li>
          </>
        }
        conseils={
          <>
            <li>Espérance et paramètre sont inverses l’un de l’autre : <MathTex tex="E(T)=1/\lambda" />.</li>
            <li>« Sachant qu’il a déjà fonctionné <MathTex tex="s" /> heures » ne change rien pour une loi exponentielle : on ne garde que la durée supplémentaire.</li>
            <li>Erreur fréquente : écrire <MathTex tex="P(T>t)=1-e^{-\lambda t}" />. C’est la fonction de répartition <MathTex tex="P(T\le t)" />.</li>
          </>
        }
      />
    </Cadre>
  );
}
