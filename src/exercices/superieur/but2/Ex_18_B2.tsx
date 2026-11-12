import { useState } from 'react';
import { Cadre, Chargement, Enonce, MathTex, Questions, Titre, choisir, useTirage, type Question } from './_commun.ts';
import { MOTS_COURTS, MOTS_MOYENS, cbcChiffrer, cbcDechiffrer, hasard, verifierTexte, versLettre } from './_crypto.ts';

/**
 * Exercice : chiffre de César utilisé en mode CBC, blocs d'une lettre.
 *
 *   E_k(x) = x + k (mod 26), ⊕ = somme modulo 26, c_0 = IV.
 *   Chiffrement   : c_i = E_k(m_i ⊕ c_{i−1}) = m_i + c_{i−1} + k
 *   Déchiffrement : m_i = D_k(c_i) ⊖ c_{i−1} = c_i − k − c_{i−1}
 *
 *   Q1 : chiffrer un mot. Q2 : déchiffrer un cryptogramme (mêmes k et IV).
 */

/* ===== Logique ===== */

export type Exercice = { k: number; iv: number; motA: string; motB: string };

export function genererExercice(): Exercice {
  return { k: hasard(1, 25), iv: hasard(0, 25), motA: choisir(MOTS_COURTS), motB: choisir(MOTS_MOYENS) };
}

export const chiffreA = ({ motA, k, iv }: Exercice) => cbcChiffrer(motA, k, iv).map((e) => versLettre(e.c)).join('');
export const chiffreB = ({ motB, k, iv }: Exercice) => cbcChiffrer(motB, k, iv).map((e) => versLettre(e.c)).join('');

export const questions = (exo: Exercice): Question[] => [
  {
    type: 'expression',
    id: 'chiffrer',
    libelle: <>Chiffre le mot M en mode CBC.</>,
    verifier: verifierTexte(chiffreA(exo)),
    placeholder: 'Ex : QHRTC',
    aide: 'Un mot en lettres, sans espaces.',
  },
  {
    type: 'expression',
    id: 'dechiffrer',
    libelle: <>Déchiffre le cryptogramme C, chiffré avec la même clé et le même vecteur d'initialisation.</>,
    verifier: verifierTexte(exo.motB),
    placeholder: 'Ex : VECTEUR',
    aide: 'Un mot en lettres, sans espaces.',
  },
];

/* ===== Affichage ===== */

export default function CesarModeCBC() {
  const [exo, regenerer] = useTirage(genererExercice);
  const [essai, setEssai] = useState(0);
  if (!exo) return <Chargement />;

  const { k, iv, motA, motB } = exo;
  const cA = chiffreA(exo);
  const cB = chiffreB(exo);
  const etapesA = cbcChiffrer(motA, k, iv);
  const etapesB = cbcDechiffrer(cB, k, iv);

  return (
    <Cadre>
      <Titre />
      <Enonce>
        <p>
          On chiffre lettre par lettre (blocs de taille 1, <MathTex tex="A=0,\dots,Z=25" />) avec le
          décalage de César <MathTex tex={`E_k(x)=x+k`} /> en <strong>mode CBC</strong> :{' '}
          <MathTex tex="c_i = E_k(m_i \oplus c_{i-1})" />, où <MathTex tex="\oplus" /> est la somme
          modulo 26 et <MathTex tex="c_0" /> le vecteur d'initialisation.
        </p>
        <p>
          Ici <MathTex tex={`k=${k}`} /> (lettre {versLettre(k)}) et <MathTex tex={`IV=${iv}`} /> (lettre {versLettre(iv)}).
        </p>
        <p>Mot M à chiffrer, et cryptogramme C à déchiffrer :</p>
        <div className="exercice-formule">
          <span className="exercice-code">{`M : ${motA}`}</span>
          <br />
          <span className="exercice-code">{`C : ${cB}`}</span>
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
            M se chiffre en <span className="exercice-code">{cA}</span> et C se déchiffre en <span className="exercice-code">{motB}</span>.
          </p>
        }
        correction={
          <>
            <li>
              <strong>Chiffrement.</strong> <MathTex tex={`c_i = m_i + c_{i-1} + ${k} \\pmod{26}`} />, en
              partant de <MathTex tex={`c_0 = ${iv}`} /> :{' '}
              {etapesA.map((e, i) => `${motA[i]} : ${e.m} + ${e.precedent} + ${k} ≡ ${e.c} → ${versLettre(e.c)}`).join(' ; ')}
              , d'où <span className="exercice-code">{cA}</span>.
            </li>
            <li>
              <strong>Déchiffrement.</strong> On isole <MathTex tex="m_i" /> :{' '}
              <MathTex tex={`m_i = c_i - ${k} - c_{i-1} \\pmod{26}`} /> :{' '}
              {etapesB.map((e, i) => `${cB[i]} : ${e.c} − ${k} − ${e.precedent} ≡ ${e.m} → ${versLettre(e.m)}`).join(' ; ')}
              , d'où <span className="exercice-code">{motB}</span>.
            </li>
            <li>
              <strong>À remarquer.</strong> Au chiffrement, chaque calcul dépend du chiffré précédent ; au
              déchiffrement, les <MathTex tex="c_{i-1}" /> sont déjà connus, donc les blocs se déchiffrent
              indépendamment les uns des autres.
            </li>
          </>
        }
        conseils={
          <>
            <li>Au chiffrement, enchaîne avec le <em>chiffré</em> précédent, pas avec la lettre claire précédente.</li>
            <li>Une erreur sur une lettre chiffrée se propage à toute la suite du chiffrement : vérifie chaque étape avant de continuer.</li>
            <li>Quand un résultat est négatif, ajoute 26 autant de fois que nécessaire.</li>
          </>
        }
      />
    </Cadre>
  );
}
