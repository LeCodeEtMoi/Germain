import { useState } from 'react';
import MathTex from '@/components/math/MathTex.tsx';
import {
  Astuce, Boutons, Cadre, Calcul, ChampAvecTouches, Chargement, Correction, Enonce, Formulaire, MessageIncompris, MessageSucces,
  Retour, Titre, ZoneRetour, useTirage,
} from '@/components/exercice/ExerciceUI.tsx';
import { choisir } from '@/lib/maths.ts';
import { type Union, type VerdictUnion, comparerUnion, texteUnion } from '@/lib/intervalles.ts';
import { texComparateur } from '@/lib/algo.ts';
import {
  type Comparaison, type Domaine, type FonctionTrig, type ValeurTrig, DOMAINE_2PI, DOMAINE_PI, VALEURS_COURANTES, fonction, racines,
  resoudre, signes, symbole, texteAng,
} from '@/lib/trigo.ts';

/**
 * Exercice : résoudre une inéquation trigonométrique sin(x) ⊳ v ou cos(x) ⊳ v dans ]−π ; π] ou [0 ; 2π].
 *
 * v est tirée parmi ±1/2, ±√2/2, ±√3/2 ; le symbole parmi <, >, ≤, ≥. L'ensemble des solutions est CALCULÉ :
 *   1. on résout l'équation t(x) = v (racines) ;
 *   2. on étudie le signe de t(x) − v sur chaque intervalle délimité par ces racines (valeur au milieu) ;
 *   3. on assemble les intervalles, avec les bons crochets (extrémités du domaine comprises).
 *
 * Correction : la saisie (]-π/3 ; π/3[, [0 ; π/6] ∪ [5π/6 ; 2π]…) est lue comme une réunion d'intervalles ; les bornes
 * sont comparées par leur valeur. On signale des crochets mal orientés ou un intervalle oublié.
 */

/* ===== Logique ===== */

export type Exercice = {
  t: FonctionTrig;
  v: ValeurTrig;
  op: Comparaison;
  domaine: Domaine;
  reponse: Union;
};

export function genererExercice(): Exercice {
  for (;;) {
    const t = choisir<FonctionTrig>(['sin', 'cos']);
    const v = choisir(VALEURS_COURANTES);
    const op = choisir<Comparaison>(['<', '>', '<=', '>=']);
    const domaine = choisir([DOMAINE_PI, DOMAINE_2PI]);
    const f = fonction(t);
    const reponse = resoudre((x) => f(x) - v.num, racines(t, v, domaine), domaine, op);
    if (reponse) return { t, v, op, domaine, reponse };
  }
}

export type Verdict = VerdictUnion;

export const verifier = (exo: Exercice, saisie: string): Verdict => comparerUnion(saisie, exo.reponse);

/* ===== Affichage ===== */

const TOUCHES = [
  { label: ']', texte: ']' },
  { label: '[', texte: '[' },
  { label: ';', texte: ' ; ' },
  { label: '∪', texte: ' ∪ ' },
  { label: 'π', texte: 'π' },
  { label: '÷', texte: '/' },
  { label: '−', texte: '-' },
  { label: '∅', texte: '∅' },
];

export default function InequationTrigo() {
  const [exo, regenerer] = useTirage(genererExercice);
  const [saisie, setSaisie] = useState('');
  const [verdict, setVerdict] = useState<Verdict | null>(null);

  if (!exo) return <Chargement />;

  const { t, v, op, domaine, reponse } = exo;
  const nom = t === 'sin' ? '\\sin' : '\\cos';
  const f = fonction(t);
  const zeros = racines(t, v, domaine);
  const g = (x: number) => f(x) - v.num;
  const morceaux = signes(g, zeros, domaine);

  function valider() {
    setVerdict(verifier(exo as Exercice, saisie));
  }

  function nouvelExercice() {
    regenerer();
    setSaisie('');
    setVerdict(null);
  }

  return (
    <Cadre>
      <Titre />
      <Enonce>
        <p>
          Résous dans l'intervalle <Calcul>{domaine.texte}</Calcul> l'inéquation :
        </p>
        <div className="exercice-formule">
          <MathTex tex={`${nom}(x) ${texComparateur(op)} ${v.tex}`} />
        </div>
      </Enonce>

      <Formulaire onValider={valider}>
        <ChampAvecTouches
          libelle="Ensemble des solutions"
          valeur={saisie}
          onChange={setSaisie}
          maxLength={100}
          placeholder="Ex : ]-π/3 ; π/3["
          aide="Écris des intervalles avec leurs crochets, séparés par ∪ s'il y en a plusieurs (ou la lettre U). Les bornes s'écrivent avec π : 5π/6, -π/4…"
          touches={TOUCHES}
        />
        <Boutons onNouveau={nouvelExercice} />
      </Formulaire>

      <ZoneRetour>
        {verdict?.type === 'incompris' && <MessageIncompris raison={verdict.raison} />}
        {verdict?.type === 'correct' && (
          <MessageSucces>
            <p>
              L'ensemble des solutions est bien <Calcul>{texteUnion(reponse)}</Calcul>.
            </p>
          </MessageSucces>
        )}
        {verdict?.type === 'faux' && (
          <Retour type="faux">
            <p>Oups, une erreur s'est glissée. {verdict.indice}</p>
            <Correction>
              <li>
                On résout d'abord l'équation <MathTex tex={`${nom}(x) = ${v.tex}`} /> dans {domaine.texte} : les solutions sont{' '}
                <Calcul>{zeros.map(texteAng).join(' ; ')}</Calcul>. Elles découpent le domaine en intervalles.
              </li>
              <li>
                On regarde, sur chaque intervalle, si <MathTex tex={`${nom}(x)`} /> est au-dessus ou en dessous de <MathTex tex={v.tex} /> (avec le cercle
                trigonométrique ou la courbe) :
                <ul>
                  {morceaux.map((m, i) => (
                    <li key={i}>
                      sur <Calcul>{`${texteAng(m.gauche)} ; ${texteAng(m.droite)}`}</Calcul> : {nom === '\\sin' ? 'sin' : 'cos'}(x) est{' '}
                      {m.positif ? 'supérieur' : 'inférieur'} à {v.texte}.
                    </li>
                  ))}
                </ul>
              </li>
              <li>
                On garde les intervalles où l'inégalité « {t}(x) {symbole(op)} {v.texte} » est vraie, et on règle les crochets : une borne est
                incluse seulement si l'inégalité est large (≤ ou ≥) ou si elle est une extrémité fermée du domaine où l'inégalité est vraie.
              </li>
              <li>
                Ensemble des solutions : <Calcul>{texteUnion(reponse)}</Calcul>.
              </li>
            </Correction>
            <Astuce titre="Pour réussir la prochaine fois">
              <ul>
                <li>Résous d'abord l'équation associée : ses solutions sont les bornes des intervalles.</li>
                <li>Pour chaque intervalle, teste un point (ou lis le cercle) pour savoir si l'inégalité est vraie.</li>
                <li>Inégalité stricte : crochets ouverts sur les bornes issues de l'équation. Inégalité large : crochets fermés.</li>
                <li>Dans ]−π ; π], −π est exclu et π est inclus (si l'inégalité y est vraie).</li>
              </ul>
            </Astuce>
          </Retour>
        )}
      </ZoneRetour>
    </Cadre>
  );
}

