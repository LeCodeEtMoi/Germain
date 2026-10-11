import { useState } from 'react';
import MathTex from '@/components/math/MathTex.tsx';
import { Cadre, Chargement, Enonce, Titre, useTirage } from '@/components/exercice/ExerciceUI.tsx';
import Questions, { type Question } from '@/components/exercice/Questions.tsx';
import { choisir, fraction, type Fraction } from '@/lib/maths.ts';
import { AIDE_FRACTION, attenduFraction } from '@/lib/reponses.ts';

/**
 * Exercice : tarif d'un grossiste, continuité d'une fonction définie par morceaux.
 *
 * Deux variantes (tirées au hasard) :
 *   « totalité » : jusqu'à s litres, chaque litre coûte p₁ ; au-delà de s litres, TOUS les litres coûtent p₂.
 *                  f(x) = p₁x si x ≤ s, f(x) = p₂x si x > s     → saut en s : f est discontinue.
 *   « tranches » : les s premiers litres coûtent p₁, chaque litre suivant coûte p₂.
 *                  f(x) = p₁x si x ≤ s, f(x) = p₁s + p₂(x − s) si x > s     → f est continue.
 * Prix en centimes (entiers) : toutes les réponses sont des décimaux exacts.
 *
 * (Dans l'énoncé d'origine, les prix de l'énoncé et ceux de la correction ne correspondaient pas.)
 */

/* ===== Logique ===== */

export type Variante = 'totalite' | 'tranches';
export type Exercice = { variante: Variante; s: number; p1: number; p2: number; x2: number };

export function genererExercice(): Exercice {
  const s = choisir([50, 100, 150, 200]);
  const p1 = choisir([50, 60, 70, 80]);
  return { variante: choisir<Variante>(['totalite', 'tranches']), s, p1, p2: p1 - choisir([5, 10, 15, 20]), x2: s + choisir([25, 50, 100, 150]) };
}

/** Prix en centimes pour x litres. */
export const prixCentimes = ({ variante, s, p1, p2 }: Exercice, x: number) =>
  x <= s ? p1 * x : variante === 'totalite' ? p2 * x : p1 * s + p2 * (x - s);

/** Limite à droite en s, en centimes. */
export const limiteDroite = ({ variante, s, p1, p2 }: Exercice) => (variante === 'totalite' ? p2 * s : p1 * s);

export const continue_ = (exo: Exercice) => limiteDroite(exo) === prixCentimes(exo, exo.s);
export const euros = (c: number): Fraction => fraction(c, 100);
export const eur = (c: number) => String(c / 100).replace('.', '{,}');

export const questions = (exo: Exercice): Question[] => {
  const a = attenduFraction(euros(prixCentimes(exo, exo.x2)));
  const b = attenduFraction(euros(prixCentimes(exo, exo.s)));
  const c = attenduFraction(euros(limiteDroite(exo)));
  return [
    { type: 'nombre', id: 'x2', libelle: <>Prix <MathTex tex={`f(${exo.x2})`} /> de {exo.x2} litres (en €) :</>, attendu: a.attendu, tolerance: a.tolerance, placeholder: 'Ex : 52,5', aide: AIDE_FRACTION },
    { type: 'nombre', id: 's', libelle: <>Prix <MathTex tex={`f(${exo.s})`} /> de {exo.s} litres (en €) :</>, attendu: b.attendu, tolerance: b.tolerance, placeholder: 'Ex : 40', aide: AIDE_FRACTION },
    {
      type: 'nombre', id: 'lim', libelle: <>Limite à droite <MathTex tex={`\\lim_{x \\to ${exo.s}^{+}} f(x)`} /> (en €) :</>,
      attendu: c.attendu, tolerance: c.tolerance, placeholder: 'Ex : 38', aide: AIDE_FRACTION,
    },
    {
      type: 'choix', id: 'continue', libelle: <>La fonction <MathTex tex="f" /> est-elle continue en <MathTex tex={`x = ${exo.s}`} /> ?</>, attendu: continue_(exo) ? 'oui' : 'non', enLigne: true,
      options: [{ valeur: 'oui', contenu: 'oui' }, { valeur: 'non', contenu: 'non' }],
    },
  ];
};

/* ===== Affichage ===== */

export default function TarifContinuite() {
  const [exo, regenerer] = useTirage(genererExercice);
  const [essai, setEssai] = useState(0);
  if (!exo) return <Chargement />;

  const { variante, s, p1, p2, x2 } = exo;
  const fx2 = prixCentimes(exo, x2);
  const fs = prixCentimes(exo, s);
  const lim = limiteDroite(exo);
  const cont = continue_(exo);
  const droite =
    variante === 'totalite' ? `${eur(p2)}\\,x` : `${eur(p1 * s)} + ${eur(p2)}(x - ${s})`;

  return (
    <Cadre>
      <Titre />
      <Enonce>
        <p>Un grossiste vend de l’huile en vrac. Le prix <MathTex tex="f(x)" /> (en euros) de x litres, pour x entre 0 et 500, suit ce tarif :</p>
        {variante === 'totalite' ? (
          <ul>
            <li>jusqu’à {s} litres inclus, chaque litre coûte <strong>{eur(p1).replace('{,}', ',')} €</strong> ;</li>
            <li>au-delà de {s} litres, <strong>tous</strong> les litres achetés coûtent <strong>{eur(p2).replace('{,}', ',')} €</strong> l’unité.</li>
          </ul>
        ) : (
          <ul>
            <li>les {s} premiers litres coûtent <strong>{eur(p1).replace('{,}', ',')} €</strong> le litre ;</li>
            <li>chaque litre au-delà des {s} premiers coûte <strong>{eur(p2).replace('{,}', ',')} €</strong>.</li>
          </ul>
        )}
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
            <MathTex tex={`f(${x2}) = ${eur(fx2)}`} /> €, et f est {cont ? 'continue' : 'discontinue'} en {s} litres.
          </p>
        }
        correction={
          <>
            <li>
              Expression de f : <MathTex tex={`f(x) = ${eur(p1)}\\,x`} /> pour <MathTex tex={`0 \\le x \\le ${s}`} />, et <MathTex tex={`f(x) = ${droite}`} /> pour <MathTex tex={`${s} < x \\le 500`} />.
            </li>
            <li>
              <MathTex tex={`f(${x2}) = ${variante === 'totalite' ? `${eur(p2)} \\times ${x2}` : `${eur(p1 * s)} + ${eur(p2)} \\times ${x2 - s}`} = ${eur(fx2)}`} /> €.
            </li>
            <li>
              Comme {s} ≤ {s}, c’est la première formule qui s’applique : <MathTex tex={`f(${s}) = ${eur(p1)} \\times ${s} = ${eur(fs)}`} /> €.
            </li>
            <li>
              Limite à droite : on utilise la deuxième formule, <MathTex tex={`\\lim_{x \\to ${s}^{+}} f(x) = ${variante === 'totalite' ? `${eur(p2)} \\times ${s}` : `${eur(p1 * s)} + ${eur(p2)} \\times 0`} = ${eur(lim)}`} /> €.
            </li>
            <li>
              Continuité en {s} : <MathTex tex={`f(${s}) = ${eur(fs)}`} /> et la limite à droite vaut <MathTex tex={eur(lim)} />. {cont ? 'Elles sont égales (et la limite à gauche aussi) : f est continue en ' + s + '.' : 'Elles sont différentes : f présente un saut, elle n’est pas continue en ' + s + '.'}
            </li>
          </>
        }
        conseils={
          <>
            <li>Pour une fonction définie par morceaux, calcule la valeur en s avec la formule qui contient s, puis les limites à gauche et à droite avec chaque formule.</li>
            <li>f est continue en s si et seulement si la limite à gauche, la limite à droite et f(s) sont égales.</li>
            <li>Un tarif « par tranches » est continu ; un tarif qui change pour tous les litres à partir d’un seuil provoque un saut.</li>
          </>
        }
      />
    </Cadre>
  );
}
