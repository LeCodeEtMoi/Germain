import { useState, type ReactNode } from 'react';
import { Cadre, Chargement, Enonce, MathTex, Questions, Titre, choisir, melanger, useTirage, type Question } from './_commun.ts';
import { hasard } from './_crypto.ts';

/**
 * Exercice : propagation d'une erreur de transmission selon le mode opératoire.
 *
 *   Un bit du bloc c_i est inversé pendant la transmission. Après déchiffrement :
 *     ECB : m_i entièrement faux, le reste intact.
 *     CBC : m_i entièrement faux + un bit de m_{i+1}.
 *     CFB : un bit de m_i + m_{i+1} entièrement faux.
 *     OFB, CTR : un seul bit de m_i (la suite chiffrante ne dépend pas des c_i).
 *
 *   Q1 : la conséquence exacte (QCM). Q2 : nombre de blocs entièrement brouillés.
 */

/* ===== Logique ===== */

type Mode = 'ECB' | 'CBC' | 'CFB' | 'OFB' | 'CTR';

const FORMULES: Record<Mode, string> = {
  ECB: 'm_i = D_k(c_i)',
  CBC: 'm_i = D_k(c_i)\\oplus c_{i-1}',
  CFB: 'm_i = c_i \\oplus r_i,\\quad r_i = E_k(c_{i-1})',
  OFB: 'm_i = c_i \\oplus r_i,\\quad r_i = E_k(r_{i-1})',
  CTR: 'm_i = c_i \\oplus r_i,\\quad r_i = E_k(cpt+i-1)',
};

/** Nombre de blocs entièrement brouillés. */
const BLOCS_BROUILLES: Record<Mode, number> = { ECB: 1, CBC: 1, CFB: 1, OFB: 0, CTR: 0 };

export type Exercice = { mode: Mode; N: number; i: number };

export function genererExercice(): Exercice {
  const N = hasard(6, 10);
  return { mode: choisir(['ECB', 'CBC', 'CFB', 'OFB', 'CTR'] as const), N, i: hasard(2, N - 1) };
}

export const questions = ({ mode, i }: Exercice): Question[] => {
  const s = i + 1;
  const reponses = {
    bloc: <>Seul <MathTex tex={`m_{${i}}`} /> est entièrement faux ; tous les autres blocs sont corrects.</>,
    cbc: <><MathTex tex={`m_{${i}}`} /> est entièrement faux et <MathTex tex={`m_{${s}}`} /> a un seul bit faux, à la position de l'erreur ; le reste est correct.</>,
    cfb: <><MathTex tex={`m_{${i}}`} /> a un seul bit faux et <MathTex tex={`m_{${s}}`} /> est entièrement faux ; le reste est correct.</>,
    bit: <>Seul <MathTex tex={`m_{${i}}`} /> a un bit faux, à la position de l'erreur ; tous les autres blocs sont corrects.</>,
    tout: <>Tous les blocs à partir de <MathTex tex={`m_{${i}}`} /> sont entièrement faux.</>,
  };
  const bonne = ({ ECB: 'bloc', CBC: 'cbc', CFB: 'cfb', OFB: 'bit', CTR: 'bit' } as const)[mode];
  return [
    {
      type: 'choix',
      id: 'consequence',
      libelle: <>Quelles sont les conséquences sur le message déchiffré ?</>,
      attendu: bonne,
      options: melanger(Object.entries(reponses).map(([valeur, contenu]) => ({ valeur, contenu }))),
    },
    {
      type: 'nombre',
      id: 'brouilles',
      libelle: <>Au total, combien de blocs du message déchiffré sont <em>entièrement</em> brouillés ?</>,
      attendu: BLOCS_BROUILLES[mode],
      placeholder: 'Ex : 0',
      aide: 'Un nombre entier (0 si aucun).',
    },
  ];
};

/* ===== Affichage ===== */

export default function ErreursTransmission() {
  const [exo, regenerer] = useTirage(genererExercice);
  const [essai, setEssai] = useState(0);
  if (!exo) return <Chargement />;

  const { mode, N, i } = exo;
  const s = i + 1;
  const nb = BLOCS_BROUILLES[mode];

  const explications: Record<Mode, ReactNode[]> = {
    ECB: [
      <li key="1"><strong>Lecture de la formule.</strong> En ECB, chaque bloc se déchiffre seul. Le bloc erroné passe dans <MathTex tex="D_k" /> : par effet d'avalanche, <MathTex tex={`m_{${i}}`} /> est entièrement brouillé.</li>,
      <li key="2"><strong>Les autres blocs.</strong> Aucun autre calcul n'utilise <MathTex tex={`c_{${i}}`} /> : le reste du message est intact. Un seul bloc entièrement faux.</li>,
    ],
    CBC: [
      <li key="1"><strong>Bloc touché.</strong> <MathTex tex={`c_{${i}}`} /> passe dans <MathTex tex="D_k" /> : <MathTex tex={`m_{${i}}`} /> est entièrement brouillé (effet d'avalanche).</li>,
      <li key="2"><strong>Bloc suivant.</strong> <MathTex tex={`c_{${i}}`} /> sert aussi dans <MathTex tex={`m_{${s}} = D_k(c_{${s}})\\oplus c_{${i}}`} />, mais seulement à travers un <MathTex tex="\oplus" /> : un seul bit de <MathTex tex={`m_{${s}}`} /> est inversé, à la position de l'erreur.</li>,
      <li key="3"><strong>La suite.</strong> <MathTex tex={`m_{${s + 1}}`} /> n'utilise que <MathTex tex={`c_{${s}}`} /> et <MathTex tex={`c_{${s + 1}}`} />, corrects : un seul bloc entièrement faux.</li>,
    ],
    CFB: [
      <li key="1"><strong>Bloc touché.</strong> <MathTex tex={`m_{${i}} = c_{${i}} \\oplus r_{${i}}`} /> : l'erreur ne passe que par le <MathTex tex="\oplus" />, un seul bit de <MathTex tex={`m_{${i}}`} /> est inversé.</li>,
      <li key="2"><strong>Bloc suivant.</strong> <MathTex tex={`r_{${s}} = E_k(c_{${i}})`} /> est entièrement brouillé par l'effet d'avalanche, donc <MathTex tex={`m_{${s}}`} /> est entièrement faux.</li>,
      <li key="3"><strong>La suite.</strong> <MathTex tex={`r_{${s + 1}} = E_k(c_{${s}})`} /> redevient correct : un seul bloc entièrement faux.</li>,
    ],
    OFB: [
      <li key="1"><strong>La suite chiffrante est autonome.</strong> Les <MathTex tex="r_i" /> ne dépendent que de la clé et de l'IV, jamais des blocs transmis.</li>,
      <li key="2"><strong>Conséquence.</strong> L'erreur ne traverse que le <MathTex tex="\oplus" /> : un seul bit de <MathTex tex={`m_{${i}}`} /> est inversé, aucun bloc n'est entièrement brouillé.</li>,
    ],
    CTR: [
      <li key="1"><strong>La suite chiffrante est autonome.</strong> <MathTex tex="r_i = E_k(cpt+i-1)" /> ne dépend que de la clé et du compteur, jamais des blocs transmis.</li>,
      <li key="2"><strong>Conséquence.</strong> L'erreur ne traverse que le <MathTex tex="\oplus" /> : un seul bit de <MathTex tex={`m_{${i}}`} /> est inversé, aucun bloc n'est entièrement brouillé.</li>,
    ],
  };

  return (
    <Cadre>
      <Titre />
      <Enonce>
        <p>
          Un message de <MathTex tex={`N=${N}`} /> blocs est chiffré par blocs en mode{' '}
          <strong>{mode}</strong>. Pendant la transmission, <strong>un seul bit</strong> du bloc{' '}
          <MathTex tex={`c_{${i}}`} /> est inversé. Le destinataire déchiffre tout le message.
        </p>
        <p>Rappel du déchiffrement en {mode} :</p>
        <div className="exercice-formule">
          <MathTex tex={FORMULES[mode]} />
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
            En {mode}, {nb === 0 ? 'aucun bloc n\'est entièrement brouillé : un seul bit du message est faux' : `un seul bloc est entièrement brouillé`}
            {mode === 'CBC' ? ', plus un bit du bloc suivant' : mode === 'CFB' ? ', plus un bit du bloc précédent l\'avalanche' : ''}.
          </p>
        }
        correction={
          <>
            {explications[mode]}
            <li>
              <strong>Méthode générale.</strong> Regarde où <MathTex tex={`c_{${i}}`} /> apparaît dans la
              formule : dans <MathTex tex="E_k" /> ou <MathTex tex="D_k" />, tout le résultat est brouillé ;
              dans un simple <MathTex tex="\oplus" />, un seul bit change.
            </li>
          </>
        }
        conseils={
          <>
            <li>Vérifie aussi si <MathTex tex={`c_{${i}}`} /> sert au calcul du bloc suivant : c'est là que l'erreur se propage.</li>
            <li>OFB et CTR transforment le chiffrement par blocs en chiffrement à flot : les erreurs ne se propagent pas.</li>
            <li>Aucun mode classique ne fait tout échouer après l'erreur : si tu as répondu « tous les blocs suivants », relis la formule de déchiffrement.</li>
          </>
        }
      />
    </Cadre>
  );
}
