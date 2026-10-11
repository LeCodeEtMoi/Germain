import { useState } from 'react';
import MathTex from '@/components/math/MathTex.tsx';
import {
  Astuce, Boutons, Cadre, Champ, Chargement, Correction, Enonce, Formulaire, MessageIncompris, MessageSucces, Retour, Titre,
  ZoneRetour, useTirage,
} from '@/components/exercice/ExerciceUI.tsx';
import { type Fraction, choisir, entier, fraction, texteFraction, valeurDuTexte } from '@/lib/maths.ts';

/**
 * Exercice : simplifier une expression avec les propriétés algébriques de ln.
 *
 * Six types, avec des nombres aléatoires, et dans chaque cas une ou deux valeurs à trouver (nombres exacts) :
 *   somme       ln a + ln b = ln(N)                       N = a·b
 *   différence  ln a − ln b = ln(N)                       N = a/b  (a multiple de b)
 *   puissance   n·ln a = ln(N)                            N = aⁿ
 *   facteur     ln(pᵏ) = k·ln(p)                          k à trouver
 *   racine      ln(√(pᵐ)) = k·ln(p)                       k = m/2 (fraction)
 *   décomposition  ln(N) = α·ln 2 + β·ln 3                N = 2^α · 3^β (α, β entiers relatifs)
 * Les réponses sont lues comme des nombres (5/2, 2,5, 60, 6*10…) et comparées exactement par leur valeur.
 */

/* ===== Logique ===== */

export type Type = 'somme' | 'difference' | 'puissance' | 'facteur' | 'racine' | 'decomposition';

export type Champ_ = { libelle: string; reponse: Fraction };

export type Exercice = {
  type: Type;
  expressionTex: string; // A = …
  consigne: string;
  champs: Champ_[];
  /** valeur de A (sert aux tests) */
  valeur: number;
  /** égalité finale, en TeX */
  resultatTex: string;
  etapes: { texte: string; tex?: string }[];
};

const texFraction = ({ n, d }: Fraction) => (d === 1 ? `${n}` : `${n < 0 ? '-' : ''}\\frac{${Math.abs(n)}}{${d}}`);

export function genererExercice(): Exercice {
  const type = choisir<Type>(['somme', 'difference', 'puissance', 'facteur', 'racine', 'decomposition']);

  if (type === 'somme') {
    let a = entier(2, 12);
    let b = entier(2, 12);
    while (b === a) b = entier(2, 12);
    const N = a * b;
    return {
      type, expressionTex: `A = \\ln(${a}) + \\ln(${b})`, consigne: 'Écris A sous la forme ln(N), où N est un nombre entier.',
      champs: [{ libelle: 'N =', reponse: fraction(N) }], valeur: Math.log(a) + Math.log(b), resultatTex: `A = \\ln(${N})`,
      etapes: [
        { texte: 'Propriété : ln(a) + ln(b) = ln(a × b).', tex: '\\ln(a) + \\ln(b) = \\ln(ab)' },
        { texte: 'Ici :', tex: `A = \\ln(${a} \\times ${b}) = \\ln(${N})` },
      ],
    };
  }

  if (type === 'difference') {
    const b = entier(2, 9);
    const m = entier(2, 9);
    const a = b * m;
    return {
      type, expressionTex: `A = \\ln(${a}) - \\ln(${b})`, consigne: 'Écris A sous la forme ln(N), où N est un nombre entier.',
      champs: [{ libelle: 'N =', reponse: fraction(m) }], valeur: Math.log(a) - Math.log(b), resultatTex: `A = \\ln(${m})`,
      etapes: [
        { texte: 'Propriété : ln(a) − ln(b) = ln(a / b).', tex: '\\ln(a) - \\ln(b) = \\ln\\left(\\frac{a}{b}\\right)' },
        { texte: 'Ici :', tex: `A = \\ln\\left(\\frac{${a}}{${b}}\\right) = \\ln(${m})` },
      ],
    };
  }

  if (type === 'puissance') {
    const a = entier(2, 5);
    const n = entier(2, 4);
    const N = a ** n;
    return {
      type, expressionTex: `A = ${n}\\ln(${a})`, consigne: 'Écris A sous la forme ln(N), où N est un nombre entier.',
      champs: [{ libelle: 'N =', reponse: fraction(N) }], valeur: n * Math.log(a), resultatTex: `A = \\ln(${N})`,
      etapes: [
        { texte: 'Propriété : n × ln(a) = ln(aⁿ).', tex: 'n\\ln(a) = \\ln(a^{n})' },
        { texte: 'Ici :', tex: `A = \\ln(${a}^{${n}}) = \\ln(${N})` },
      ],
    };
  }

  if (type === 'facteur') {
    const p = choisir([2, 3, 5]);
    const k = entier(2, 5);
    const N = p ** k;
    return {
      type, expressionTex: `A = \\ln(${N})`, consigne: `Sachant que ${N} est une puissance de ${p}, écris A sous la forme k × ln(${p}), où k est un entier.`,
      champs: [{ libelle: 'k =', reponse: fraction(k) }], valeur: Math.log(N), resultatTex: `A = ${k}\\ln(${p})`,
      etapes: [
        { texte: `On reconnaît une puissance de ${p} :`, tex: `${N} = ${p}^{${k}}` },
        { texte: 'Propriété : ln(aⁿ) = n × ln(a). Donc :', tex: `A = \\ln(${p}^{${k}}) = ${k}\\ln(${p})` },
      ],
    };
  }

  if (type === 'racine') {
    const p = choisir([2, 3, 5]);
    const m = choisir([3, 5, 7, 9]);
    const N = p ** m;
    const k = fraction(m, 2);
    return {
      type, expressionTex: `A = \\ln\\left(\\sqrt{${N}}\\right)`, consigne: `Sachant que ${N} est une puissance de ${p}, écris A sous la forme k × ln(${p}), où k est un nombre (entier ou fraction).`,
      champs: [{ libelle: 'k =', reponse: k }], valeur: Math.log(Math.sqrt(N)), resultatTex: `A = ${texFraction(k)}\\ln(${p})`,
      etapes: [
        { texte: `On reconnaît une puissance de ${p}, et √x = x^(1/2) :`, tex: `\\sqrt{${N}} = (${p}^{${m}})^{\\frac{1}{2}} = ${p}^{\\frac{${m}}{2}}` },
        { texte: 'Propriété : ln(aˣ) = x × ln(a). Donc :', tex: `A = \\ln\\left(${p}^{\\frac{${m}}{2}}\\right) = \\frac{${m}}{2}\\ln(${p})` },
      ],
    };
  }

  // décomposition en ln 2 et ln 3
  for (;;) {
    const alpha = entier(-3, 4);
    const beta = entier(-3, 3);
    if (alpha === 0 || beta === 0) continue;
    const haut = (alpha > 0 ? 2 ** alpha : 1) * (beta > 0 ? 3 ** beta : 1);
    const bas = (alpha < 0 ? 2 ** -alpha : 1) * (beta < 0 ? 3 ** -beta : 1);
    const arg = bas === 1 ? `${haut}` : `\\frac{${haut}}{${bas}}`;
    const decompHaut = [alpha > 0 ? `2^{${alpha}}` : '', beta > 0 ? `3^{${beta}}` : ''].filter(Boolean).join(' \\times ') || '1';
    const decompBas = [alpha < 0 ? `2^{${-alpha}}` : '', beta < 0 ? `3^{${-beta}}` : ''].filter(Boolean).join(' \\times ') || '1';
    const decomp = bas === 1 ? decompHaut : `\\frac{${decompHaut}}{${decompBas}}`;
    return {
      type: 'decomposition', expressionTex: `A = \\ln\\left(${arg}\\right)`,
      consigne: 'Écris A sous la forme α × ln(2) + β × ln(3), où α et β sont des entiers relatifs.',
      champs: [{ libelle: 'α =', reponse: fraction(alpha) }, { libelle: 'β =', reponse: fraction(beta) }],
      valeur: Math.log(haut / bas),
      resultatTex: `A = ${alpha}\\ln(2) ${beta < 0 ? '-' : '+'} ${Math.abs(beta)}\\ln(3)`,
      etapes: [
        { texte: 'On décompose le nombre avec des puissances de 2 et de 3 :', tex: `${arg} = ${decomp}` },
        { texte: 'Propriétés : ln(ab) = ln(a) + ln(b), ln(a/b) = ln(a) − ln(b), ln(aⁿ) = n × ln(a). Donc :', tex: `A = ${alpha}\\ln(2) ${beta < 0 ? '-' : '+'} ${Math.abs(beta)}\\ln(3)` },
      ],
    };
  }
}

export type Verdict =
  | { type: 'incompris'; raison: string }
  | { type: 'resultat'; justes: boolean[] };

export function verifier(exo: Exercice, saisies: string[]): Verdict {
  const justes: boolean[] = [];
  for (let i = 0; i < exo.champs.length; i++) {
    const s = saisies[i] ?? '';
    const nom = exo.champs[i].libelle.replace(' =', '');
    if (s.trim() === '') return { type: 'incompris', raison: `Écris la valeur de ${nom}.` };
    if (/ln|log/i.test(s)) return { type: 'incompris', raison: `Écris seulement le nombre ${nom} (sans « ln »).` };
    const v = valeurDuTexte(s.replace(/[−–—]/g, '-'));
    if (v === null) return { type: 'incompris', raison: `Je ne comprends pas la valeur de ${nom} : écris un nombre (12, -3, 5/2).` };
    const att = exo.champs[i].reponse;
    justes.push(Math.abs(v - att.n / att.d) < 1e-9);
  }
  return { type: 'resultat', justes };
}

/* ===== Affichage ===== */

export default function ProprietesLn() {
  const [exo, regenerer] = useTirage(genererExercice);
  const [saisies, setSaisies] = useState<string[]>(['', '']);
  const [verdict, setVerdict] = useState<Verdict | null>(null);

  if (!exo) return <Chargement />;

  function valider() {
    setVerdict(verifier(exo as Exercice, saisies));
  }

  function nouvelExercice() {
    regenerer();
    setSaisies(['', '']);
    setVerdict(null);
  }

  const reussi = verdict?.type === 'resultat' && verdict.justes.every(Boolean);

  return (
    <Cadre>
      <Titre />
      <Enonce>
        <p>Simplifie l'expression suivante à l'aide des propriétés algébriques du logarithme népérien :</p>
        <div className="exercice-formule">
          <MathTex tex={exo.expressionTex} />
        </div>
        <p>{exo.consigne}</p>
      </Enonce>

      <Formulaire onValider={valider}>
        {exo.champs.map((c, i) => (
          <Champ
            key={c.libelle}
            libelle={c.libelle}
            valeur={saisies[i]}
            onChange={(v) => setSaisies((prec) => prec.map((x, j) => (j === i ? v : x)))}
            maxLength={20}
            placeholder={exo.champs.length === 2 ? 'Ex : -2' : 'Ex : 12'}
            aide={i === 0 ? 'Un nombre : entier, fraction (5/2) ou décimal.' : undefined}
          />
        ))}
        <Boutons onNouveau={nouvelExercice} />
      </Formulaire>

      <ZoneRetour>
        {verdict?.type === 'incompris' && <MessageIncompris raison={verdict.raison} />}
        {reussi && (
          <MessageSucces>
            <p>
              Bien joué : <MathTex tex={exo.resultatTex} />.
            </p>
          </MessageSucces>
        )}
        {verdict?.type === 'resultat' && !reussi && (
          <Retour type="faux">
            <p>
              Oups, une erreur s'est glissée.{' '}
              {exo.champs.length === 2
                ? `${verdict.justes[0] ? '' : 'α'}${!verdict.justes[0] && !verdict.justes[1] ? ' et ' : ''}${verdict.justes[1] ? '' : 'β'} ${!verdict.justes[0] && !verdict.justes[1] ? 'sont' : 'est'} à revoir.`
                : `Réponse attendue : ${exo.champs[0].libelle} ${texteFraction(exo.champs[0].reponse)}.`}
            </p>
            <Correction>
              {exo.etapes.map((e, i) => (
                <li key={i}>
                  {e.texte} {e.tex && <MathTex tex={e.tex} />}
                </li>
              ))}
              <li>
                Résultat : <MathTex tex={exo.resultatTex} />.
              </li>
            </Correction>
            <Astuce titre="Pour réussir la prochaine fois">
              <ul>
                <li>ln(a × b) = ln(a) + ln(b) et ln(a / b) = ln(a) − ln(b) (a et b strictement positifs).</li>
                <li>ln(aⁿ) = n × ln(a), et ln(√a) = ½ × ln(a).</li>
                <li>Pour décomposer un nombre, cherche ses facteurs premiers (2, 3, 5…) avant d'appliquer les propriétés.</li>
              </ul>
            </Astuce>
          </Retour>
        )}
      </ZoneRetour>
    </Cadre>
  );
}
