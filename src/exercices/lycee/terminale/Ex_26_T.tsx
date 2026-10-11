import { useState } from 'react';
import MathTex from '@/components/math/MathTex.tsx';
import {
  Astuce, Boutons, Cadre, Calcul, ChampAvecTouches, Chargement, Correction, Enonce, Formulaire, MessageIncompris, MessageSucces,
  Retour, Titre, ZoneRetour, useTirage,
} from '@/components/exercice/ExerciceUI.tsx';
import { type Fraction, choisir, combinaison, fraction, texteFraction } from '@/lib/maths.ts';
import { type Union, type VerdictUnion, comparerUnion, texteUnion } from '@/lib/intervalles.ts';
import { texComparateur } from '@/lib/algo.ts';
import {
  type Ang, type Comparaison, type FonctionTrig, DOMAINE_2PI, VALEURS, fonction, racines, resoudre, signes, symbole, texteAng,
} from '@/lib/trigo.ts';

/**
 * Exercice : inéquation trigonométrique du second degré dans [0 ; 2π].
 *
 *   A·t(x)² + B·t(x) + C  ⊳  0,    t = cos ou sin.
 *
 * Le trinôme est construit à partir de DEUX racines rationnelles choisies parmi −1, −1/2, 0, 1/2, 1 :
 * A·u² + B·u + C = k(q₁u − p₁)(q₂u − p₂) avec uᵢ = pᵢ/qᵢ et k = ±1. Les racines sont donc exactes, et chacune
 * correspond à une valeur remarquable de cos ou de sin.
 * L'ensemble des solutions est calculé par resoudre() (racines en x, signe au milieu de chaque intervalle) ;
 * les tirages qui donneraient un point isolé sont écartés.
 */

/* ===== Logique ===== */

const RACINES: Fraction[] = [fraction(-1), fraction(-1, 2), fraction(0), fraction(1, 2), fraction(1)];

export type Exercice = {
  t: FonctionTrig;
  A: number;
  B: number;
  C: number;
  u1: Fraction;
  u2: Fraction;
  op: Comparaison;
  zeros: Ang[];
  reponse: Union;
};

export function genererExercice(): Exercice {
  for (;;) {
    const t = choisir<FonctionTrig>(['cos', 'sin']);
    const i = choisir([0, 1, 2, 3]);
    const j = choisir([1, 2, 3, 4].filter((x) => x > i));
    const u1 = RACINES[i];
    const u2 = RACINES[j];
    const k = choisir([-1, 1]);
    const A = k * u1.d * u2.d;
    const B = -k * (u1.d * u2.n + u2.d * u1.n);
    const C = k * u1.n * u2.n;
    const op = choisir<Comparaison>(['<', '>', '<=', '>=']);
    const f = fonction(t);
    const zeros = [u1, u2].flatMap((u) => racines(t, VALEURS.find((v) => Math.abs(v.num - u.n / u.d) < 1e-12) as (typeof VALEURS)[number], DOMAINE_2PI));
    const reponse = resoudre((x) => A * f(x) ** 2 + B * f(x) + C, zeros, DOMAINE_2PI, op);
    if (reponse) return { t, A, B, C, u1, u2, op, zeros: zeros.sort((p, q) => p.n * q.d - q.n * p.d), reponse };
  }
}

export type Verdict = VerdictUnion;
export const verifier = (exo: Exercice, saisie: string): Verdict => comparerUnion(saisie, exo.reponse);

/** Condition sur u pour que A·u² + B·u + C ⊳ 0, écrite en toutes lettres. */
export function conditionSurU({ A, u1, u2, op }: Pick<Exercice, 'A' | 'u1' | 'u2' | 'op'>): string {
  const large = op === '<=' || op === '>=';
  const veutPositif = op === '>' || op === '>=';
  const dehors = A > 0 === veutPositif;
  const [r1, r2] = [texteFraction(u1), texteFraction(u2)];
  if (dehors) return `u ${large ? '≤' : '<'} ${r1}  ou  u ${large ? '≥' : '>'} ${r2}`;
  return `${r1} ${large ? '≤' : '<'} u ${large ? '≤' : '<'} ${r2}`;
}

/* ===== Affichage ===== */

const TOUCHES = [
  { label: ']', texte: ']' },
  { label: '[', texte: '[' },
  { label: ';', texte: ' ; ' },
  { label: '∪', texte: ' ∪ ' },
  { label: 'π', texte: 'π' },
  { label: '÷', texte: '/' },
  { label: '∅', texte: '∅' },
];

export default function InequationTrigoDegre2() {
  const [exo, regenerer] = useTirage(genererExercice);
  const [saisie, setSaisie] = useState('');
  const [verdict, setVerdict] = useState<Verdict | null>(null);

  if (!exo) return <Chargement />;

  const { t, A, B, C, u1, u2, op, zeros, reponse } = exo;
  const nom = t === 'cos' ? '\\cos' : '\\sin';
  const trinome = combinaison([[A, 'u^{2}'], [B, 'u'], [C, '']], true);
  const fTex = combinaison([[A, `${nom}^{2}(x)`], [B, `${nom}(x)`], [C, '']], true);
  const delta = B * B - 4 * A * C;
  const f = fonction(t);
  const morceaux = signes((x) => A * f(x) ** 2 + B * f(x) + C, zeros, DOMAINE_2PI);

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
          Résous dans l'intervalle <Calcul>[0 ; 2π]</Calcul> l'inéquation :
        </p>
        <div className="exercice-formule">
          <MathTex tex={`${fTex} ${texComparateur(op)} 0`} />
        </div>
        <p>
          <em>Indication : pose u = {t}(x) et étudie d'abord le signe du trinôme en u.</em>
        </p>
      </Enonce>

      <Formulaire onValider={valider}>
        <ChampAvecTouches
          libelle="Ensemble des solutions"
          valeur={saisie}
          onChange={setSaisie}
          maxLength={120}
          placeholder="Ex : [0 ; π/3[ ∪ ]5π/3 ; 2π]"
          aide="Écris des intervalles avec leurs crochets, séparés par ∪. Les bornes s'écrivent avec π : 2π/3, 5π/6…"
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
                On pose <MathTex tex={`u = ${nom}(x)`} />. L'inéquation devient <MathTex tex={`${trinome} ${texComparateur(op)} 0`} /> avec u ∈ [−1 ; 1].
              </li>
              <li>
                Discriminant : <MathTex tex={`\\Delta = ${B < 0 ? `(${B})` : B}^{2} - 4 \\times ${A < 0 ? `(${A})` : A} \\times ${C < 0 ? `(${C})` : C} = ${delta}`} />, donc deux racines :{' '}
                <Calcul>
                  u₁ = {texteFraction(u1)} et u₂ = {texteFraction(u2)}
                </Calcul>
                .
              </li>
              <li>
                Le coefficient de u² vaut {A}, {A > 0 ? 'positif' : 'négatif'} : le trinôme est du signe de {A} à l'extérieur des racines et du signe contraire entre
                les racines. Donc {symbole(op)} 0 pour <Calcul>{conditionSurU({ A, u1, u2, op })}</Calcul>.
              </li>
              <li>
                On revient à x dans [0 ; 2π]. Les racines en x sont les solutions de {t}(x) = {texteFraction(u1)} et de {t}(x) = {texteFraction(u2)} :{' '}
                <Calcul>{zeros.map(texteAng).join(' ; ')}</Calcul>. Signe du trinôme sur chaque intervalle :
                <ul>
                  {morceaux.map((m, i) => (
                    <li key={i}>
                      sur <Calcul>{`${texteAng(m.gauche)} ; ${texteAng(m.droite)}`}</Calcul> : {m.positif ? 'positif' : 'négatif'}
                    </li>
                  ))}
                </ul>
              </li>
              <li>
                Ensemble des solutions : <Calcul>{texteUnion(reponse)}</Calcul>.
              </li>
            </Correction>
            <Astuce titre="Pour réussir la prochaine fois">
              <ul>
                <li>Le changement de variable u = cos(x) ou u = sin(x) ramène l'inéquation à un trinôme ordinaire.</li>
                <li>N'oublie pas que u reste dans [−1 ; 1] : une racine hors de cet intervalle ne donne aucune solution en x.</li>
                <li>Revenir à x : résous t(x) = racine dans [0 ; 2π], puis vérifie le signe sur chaque intervalle obtenu.</li>
              </ul>
            </Astuce>
          </Retour>
        )}
      </ZoneRetour>
    </Cadre>
  );
}
