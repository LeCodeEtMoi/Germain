import { useState } from 'react';
import MathTex from './MathTex.tsx';
import {
  Astuce, Boutons, Cadre, Calcul, Champ, Chargement, Correction, Enonce, Formulaire, MessageIncompris, MessageSucces,
  Retour, Titre, ZoneRetour, useTirage,
} from './ExerciceUI.tsx';
import { analyser, entier, equivalents, valeurDuTexte } from '../lib/maths.ts';

/**
 * Exercice : raisonnement par récurrence sur une somme.
 *
 * Quatre propriétés possibles (chacune avec des coefficients tirés au hasard) :
 *   Σ i, Σ i², Σ (a·i + b), Σ (2i − 1).
 * L'élève complète :
 *   1) l'initialisation : la valeur de la somme au premier rang ;
 *   2) l'hérédité : S(k+1) = S(k) + t(k+1) = [hypothèse de récurrence] + [terme suivant].
 *
 * Correction : les expressions saisies sont lues par un analyseur (maths.ts) et comparées
 * numériquement, en plusieurs valeurs de k, à l'expression attendue. Toute écriture
 * équivalente est acceptée (k(k+1)/2, (k²+k)/2, 0,5k²+0,5k…). Les formules de chaque
 * propriété sont vérifiées par le test automatique (somme calculée terme à terme).
 */

/* ===== Logique ===== */

export type Propriete = {
  rang: number; // premier rang de la récurrence
  sommeTex: (borne: string) => string; // somme de rang → borne, en TeX
  termeTex: string; // terme général en i
  fermee: (v: string) => string; // formule de la somme, saisie ASCII en la variable v
  fermeeTex: string; // idem, en TeX, en n
  fermeeSuivantTex: string; // idem au rang k + 1
  suivant: string; // terme de rang k + 1 en k, saisie ASCII
  suivantTex: string;
  terme: (i: number) => number; // pour les tests
  calculTex: string[]; // lignes de calcul de l'hérédité
};

export function genererExercice(): Propriete {
  const variante = entier(1, 4);
  const sommeDe = (rang: number, terme: string) => (borne: string) => `\\sum_{i=${rang}}^{${borne}} ${terme}`;

  if (variante === 1) {
    return {
      rang: 0,
      sommeTex: sommeDe(0, 'i'),
      termeTex: 'i',
      fermee: (v) => `${v}(${v}+1)/2`,
      fermeeTex: '\\frac{n(n+1)}{2}',
      fermeeSuivantTex: '\\frac{(k+1)(k+2)}{2}',
      suivant: 'k+1',
      suivantTex: 'k+1',
      terme: (i) => i,
      calculTex: ['\\frac{k(k+1)}{2} + (k+1)', '(k+1)\\left(\\frac{k}{2} + 1\\right)', '\\frac{(k+1)(k+2)}{2}'],
    };
  }
  if (variante === 2) {
    return {
      rang: 1,
      sommeTex: sommeDe(1, 'i^2'),
      termeTex: 'i^2',
      fermee: (v) => `${v}(${v}+1)(2${v}+1)/6`,
      fermeeTex: '\\frac{n(n+1)(2n+1)}{6}',
      fermeeSuivantTex: '\\frac{(k+1)(k+2)(2k+3)}{6}',
      suivant: '(k+1)^2',
      suivantTex: '(k+1)^2',
      terme: (i) => i * i,
      calculTex: [
        '\\frac{k(k+1)(2k+1)}{6} + (k+1)^2',
        '\\frac{(k+1)\\left(k(2k+1) + 6(k+1)\\right)}{6}',
        '\\frac{(k+1)(2k^2 + 7k + 6)}{6}',
        '\\frac{(k+1)(k+2)(2k+3)}{6}',
      ],
    };
  }
  if (variante === 3) {
    const a = entier(2, 5);
    const b = entier(1, 5);
    return {
      rang: 1,
      sommeTex: sommeDe(1, `(${a}i + ${b})`),
      termeTex: `${a}i + ${b}`,
      fermee: (v) => `${v}(${a}${v}+${a + 2 * b})/2`,
      fermeeTex: `\\frac{n(${a}n + ${a + 2 * b})}{2}`,
      fermeeSuivantTex: `\\frac{(k+1)(${a}k + ${2 * a + 2 * b})}{2}`,
      suivant: `${a}(k+1)+${b}`,
      suivantTex: `${a}(k+1) + ${b}`,
      terme: (i) => a * i + b,
      calculTex: [
        `\\frac{k(${a}k + ${a + 2 * b})}{2} + ${a}(k+1) + ${b}`,
        `\\frac{${a}k^2 + ${a + 2 * b}k + ${2 * a}k + ${2 * a + 2 * b}}{2}`,
        `\\frac{${a}k^2 + ${3 * a + 2 * b}k + ${2 * a + 2 * b}}{2}`,
        `\\frac{(k+1)(${a}k + ${2 * a + 2 * b})}{2}`,
      ],
    };
  }
  return {
    rang: 1,
    sommeTex: sommeDe(1, '(2i - 1)'),
    termeTex: '2i - 1',
    fermee: (v) => `${v}^2`,
    fermeeTex: 'n^2',
    fermeeSuivantTex: '(k+1)^2',
    suivant: '2(k+1)-1',
    suivantTex: '2(k+1) - 1',
    terme: (i) => 2 * i - 1,
    calculTex: ['k^2 + 2(k+1) - 1', 'k^2 + 2k + 1', '(k+1)^2'],
  };
}

const POINTS = [1, 2, 3, 4, 5.5, 7];

/** Compare l'expression saisie (variable k) à l'expression attendue. */
function lireEtComparer(saisie: string, attendu: string): { ok: boolean } | { message: string } {
  const lu = analyser(saisie, { variables: ['k'] });
  if (!lu.ok) return { message: lu.message };
  const ref = analyser(attendu, { variables: ['k'] });
  if (!ref.ok) throw new Error(`Expression attendue illisible : ${attendu}`);
  return { ok: equivalents(lu.noeud, ref.noeud, 'k', POINTS) };
}

type Verdict =
  | { type: 'incompris'; raison: string }
  | { type: 'resultat'; init: boolean; heredite1: boolean; heredite2: boolean };

export function verifier(p: Propriete, init: string, h1: string, h2: string): Verdict {
  if ([init, h1, h2].some((s) => s.trim() === '')) {
    return { type: 'incompris', raison: 'Complète les trois champs avant de valider.' };
  }
  // Valeur de la somme au premier rang = terme général pris en ce rang
  const valeur = valeurDuTexte(init);
  if (valeur === null) {
    return { type: 'incompris', raison: "Initialisation : écris un nombre (par exemple 0, 3 ou 1/2)." };
  }
  const r1 = lireEtComparer(h1, p.fermee('k'));
  if ('message' in r1) return { type: 'incompris', raison: `Premier champ de l'hérédité : ${r1.message}` };
  const r2 = lireEtComparer(h2, p.suivant);
  if ('message' in r2) return { type: 'incompris', raison: `Second champ de l'hérédité : ${r2.message}` };

  return {
    type: 'resultat',
    init: Math.abs(valeur - p.terme(p.rang)) < 1e-9,
    heredite1: r1.ok,
    heredite2: r2.ok,
  };
}

/* ===== Affichage ===== */

export default function Recurrence() {
  const [p, regenerer] = useTirage(genererExercice);
  const [init, setInit] = useState('');
  const [h1, setH1] = useState('');
  const [h2, setH2] = useState('');
  const [verdict, setVerdict] = useState<Verdict | null>(null);

  if (!p) return <Chargement />;

  const tout = (v: Verdict | null) => v?.type === 'resultat' && v.init && v.heredite1 && v.heredite2;

  function valider() {
    setVerdict(verifier(p as Propriete, init, h1, h2));
  }

  function nouvelExercice() {
    regenerer();
    setInit('');
    setH1('');
    setH2('');
    setVerdict(null);
  }

  const proprieteTex = `P(n) : \\; ${p.sommeTex('n')} = ${p.fermeeTex}`;
  const premier = p.terme(p.rang);

  return (
    <Cadre>
      <Titre />
      <Enonce>
        <p>
          On démontre par récurrence, pour tout entier naturel n ≥ {p.rang}, la propriété suivante. Complète les deux étapes.
        </p>
        <div className="exercice-formule">
          <MathTex tex={proprieteTex} />
        </div>
      </Enonce>

      <Formulaire onValider={valider}>
        <h3 className="exercice-sous-titre">1. Initialisation (n = {p.rang})</h3>
        <p>
          Pour n = {p.rang}, la somme <MathTex tex={p.sommeTex(String(p.rang))} /> se réduit à un seul terme.
        </p>
        <Champ libelle="Valeur de la somme" valeur={init} onChange={setInit} placeholder="Un nombre" maxLength={20} />

        <h3 className="exercice-sous-titre">2. Hérédité</h3>
        <p>
          On suppose P(k) vraie pour un entier k ≥ {p.rang}, et on écrit la somme au rang k + 1 :
        </p>
        <div className="exercice-formule">
          <MathTex tex={`${p.sommeTex('k+1')} = ${p.sommeTex('k')} + \\left(${p.termeTex.replace(/i/g, '(k+1)')}\\right)`} />
        </div>
        <p>En utilisant l'hypothèse de récurrence, cette somme vaut donc : (premier champ) + (second champ).</p>
        <div className="exercice-champs">
          <Champ
            libelle="Premier champ (hypothèse de récurrence)"
            valeur={h1}
            onChange={setH1}
            placeholder="Expression en k"
            aide="Écris avec la lettre k, par exemple 3k+2 ou k(k+1)."
          />
          <Champ
            libelle="Second champ (terme suivant)"
            valeur={h2}
            onChange={setH2}
            placeholder="Expression en k"
            aide="Le terme général au rang k + 1."
          />
        </div>

        <Boutons onNouveau={nouvelExercice} />
      </Formulaire>

      <ZoneRetour>
        {verdict?.type === 'incompris' && <MessageIncompris raison={verdict.raison} />}
        {tout(verdict) && (
          <MessageSucces>
            <p>Ta récurrence est complète : initialisation et hérédité sont justes.</p>
          </MessageSucces>
        )}
        {verdict?.type === 'resultat' && !tout(verdict) && (
          <Retour type="faux">
            <p>Oups, une erreur s'est glissée.</p>
            <ul className="exercice-bilan">
              <li>
                {verdict.init ? '✓' : '✗'} Initialisation {verdict.init ? 'juste' : 'à revoir'}
              </li>
              <li>
                {verdict.heredite1 ? '✓' : '✗'} Hypothèse de récurrence {verdict.heredite1 ? 'juste' : 'à revoir'}
              </li>
              <li>
                {verdict.heredite2 ? '✓' : '✗'} Terme suivant {verdict.heredite2 ? 'juste' : 'à revoir'}
              </li>
            </ul>
            <Correction>
              <li>
                <strong>Initialisation.</strong> Pour n = {p.rang}, la somme n'a qu'un terme : celui de rang {p.rang}, soit{' '}
                <Calcul>{premier}</Calcul>. Et la formule donne bien la même valeur :{' '}
                <MathTex tex={`${p.fermeeTex.replace(/n/g, `(${p.rang})`)} = ${premier}`} />.
              </li>
              <li>
                <strong>Hypothèse de récurrence.</strong> On suppose que la somme jusqu'à k vaut la formule en k :{' '}
                <MathTex tex={p.fermeeTex.replace(/n/g, 'k')} />. C'est le premier champ.
              </li>
              <li>
                <strong>Terme suivant.</strong> La somme au rang k + 1 contient un terme de plus : le terme général{' '}
                <MathTex tex={p.termeTex} /> pris en i = k + 1, soit <MathTex tex={p.suivantTex} />. C'est le second champ.
              </li>
              <li>
                <strong>Calcul.</strong> On additionne et on factorise :
                <div className="exercice-formule">
                  <MathTex tex={p.calculTex.join(' = ')} />
                </div>
                On retrouve la formule au rang k + 1, <MathTex tex={p.fermeeSuivantTex} /> : P(k + 1) est vraie.
              </li>
            </Correction>
            <Astuce titre="Pour réussir la prochaine fois">
              <ul>
                <li>Dans l'hérédité, on remplace la somme jusqu'à k par sa formule, on ne la recalcule pas.</li>
                <li>Le terme à ajouter est le terme général pris en k + 1 : remplace toutes les occurrences de i par k + 1.</li>
                <li>Pour terminer, factorise par (k + 1) : c'est lui qui apparaît dans la formule au rang k + 1.</li>
              </ul>
            </Astuce>
          </Retour>
        )}
      </ZoneRetour>
    </Cadre>
  );
}
