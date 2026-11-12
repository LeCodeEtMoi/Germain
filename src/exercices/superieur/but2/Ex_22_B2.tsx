import { useState } from 'react';
import { Cadre, Chargement, Enonce, MathTex, Questions, Titre, melanger, useTirage, type Question } from './_commun.ts';
import { hasard } from './_crypto.ts';

/**
 * Exercice : un mode opératoire à analyser — c_i = E_k(m_i) ⊕ c_{i−1}, c_0 = IV
 *   (le chaînage est fait APRÈS le chiffrement, contrairement au CBC).
 *
 *   Déchiffrement : m_i = D_k(c_i ⊕ c_{i−1}).
 *   Faiblesse : c_i ⊕ c_{i−1} = E_k(m_i) est calculable par tout observateur :
 *   c'est exactement le chiffré ECB, les blocs clairs identiques se voient.
 *
 *   Q1 : formule de déchiffrement (QCM). Q2 : la faiblesse (QCM).
 */

/* ===== Logique ===== */

export type Exercice = { graine: number };

export function genererExercice(): Exercice {
  return { graine: hasard(1, 1000) };
}

export const questions = (_exo: Exercice): Question[] => [
  {
    type: 'choix',
    id: 'dechiffrement',
    libelle: <>Comment retrouve-t-on <MathTex tex="m_i" /> à partir des blocs chiffrés ?</>,
    attendu: 'bonne',
    options: melanger([
      { valeur: 'bonne', contenu: <MathTex tex="m_i = D_k(c_i \oplus c_{i-1})" /> },
      { valeur: 'cbc', contenu: <MathTex tex="m_i = D_k(c_i) \oplus c_{i-1}" /> },
      { valeur: 'iv', contenu: <MathTex tex="m_i = D_k(c_i \oplus IV)" /> },
      { valeur: 'croise', contenu: <MathTex tex="m_i = c_i \oplus D_k(c_{i-1})" /> },
    ]),
  },
  {
    type: 'choix',
    id: 'faiblesse',
    libelle: <>Quel est le principal défaut de ce mode ?</>,
    attendu: 'ecb',
    options: melanger([
      { valeur: 'ecb', contenu: <>N'importe quel observateur calcule <MathTex tex="c_i \oplus c_{i-1} = E_k(m_i)" /> : on retombe sur le mode ECB, et les blocs clairs identiques restent visibles.</> },
      { valeur: 'iv-secret', contenu: <>Le déchiffrement est impossible sans garder le vecteur d'initialisation secret.</> },
      { valeur: 'propagation', contenu: <>Une erreur de transmission sur un bloc rend faux tout le reste du message.</> },
      { valeur: 'taille', contenu: <>Le chiffré est deux fois plus long que le message clair.</> },
    ]),
  },
];

/* ===== Affichage ===== */

export default function ModeOperatoireFragile() {
  const [exo, regenerer] = useTirage(genererExercice);
  const [essai, setEssai] = useState(0);
  if (!exo) return <Chargement />;

  return (
    <Cadre>
      <Titre />
      <Enonce>
        <p>
          On te propose un nouveau mode opératoire, décrit ici pour le chiffrement : le bloc clair est
          d'abord chiffré, <em>puis</em> combiné avec le bloc chiffré précédent.
        </p>
        <div className="exercice-formule">
          <MathTex tex="c_0 = IV,\qquad c_i = E_k(m_i) \oplus c_{i-1}" />
        </div>
        <p>Indique son déchiffrement, puis juge sa sécurité.</p>
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
            <MathTex tex="m_i = D_k(c_i \oplus c_{i-1})" />, et ce mode n'apporte rien : il équivaut à de
            l'ECB maquillé.
          </p>
        }
        correction={
          <>
            <li>
              <strong>Déchiffrement.</strong> On part de <MathTex tex="c_i = E_k(m_i) \oplus c_{i-1}" />.
              On applique <MathTex tex="\oplus\, c_{i-1}" /> des deux côtés :{' '}
              <MathTex tex="c_i \oplus c_{i-1} = E_k(m_i)" />, puis <MathTex tex="D_k" /> :{' '}
              <MathTex tex="m_i = D_k(c_i \oplus c_{i-1})" />, avec <MathTex tex="c_0 = IV" />.
            </li>
            <li>
              <strong>Faiblesse.</strong> Les blocs <MathTex tex="c_i" /> et <MathTex tex="c_{i-1}" /> sont
              publics : tout observateur peut calculer <MathTex tex="c_i \oplus c_{i-1} = E_k(m_i)" />.
              C'est exactement le chiffré du mode ECB : deux blocs clairs identiques se repèrent, les motifs
              du message transparaissent. Le chaînage n'a rien masqué.
            </li>
            <li>
              <strong>Comparaison avec CBC.</strong> En CBC, le <MathTex tex="\oplus" /> est fait{' '}
              <em>avant</em> <MathTex tex="E_k" /> : <MathTex tex="c_i = E_k(m_i \oplus c_{i-1})" />.
              L'observateur ne peut plus éliminer le chaînage, et les répétitions sont masquées. L'ordre des
              opérations fait toute la sécurité.
            </li>
            <li>
              <strong>Un avantage, quand même.</strong> Comme les <MathTex tex="E_k(m_i)" /> se calculent
              indépendamment, le chiffrement est parallélisable — mais cela ne compense pas la perte de
              confidentialité.
            </li>
          </>
        }
        conseils={
          <>
            <li>Pour inverser un mode, défais les opérations dans l'ordre inverse du chiffrement.</li>
            <li>Pour juger un mode, demande-toi ce qu'un attaquant peut calculer avec les seuls blocs chiffrés.</li>
            <li>Un bon mode doit masquer les blocs clairs identiques : c'est le critère vu en cours.</li>
          </>
        }
      />
    </Cadre>
  );
}
