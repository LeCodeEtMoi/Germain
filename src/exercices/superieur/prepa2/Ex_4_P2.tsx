import { useState } from 'react';
import { Cadre, Chargement, Enonce, MathTex, Questions, Titre, choisir, entier, nombre, useTirage, type Question } from './_commun.ts';

/**
 * Exercice : position relative de deux boules d'un espace vectoriel normé.
 *
 * Dans un espace vectoriel normé, avec d = ‖a − b‖ > 0 (boules de rayons r et s) :
 *   B(a,r) ⊂ B(b,s)  ⇔  d + r ≤ s                      (boules ouvertes ou fermées)
 *   boules fermées disjointes  ⇔  d > r + s
 *   boules ouvertes disjointes ⇔  d ≥ r + s
 * Sinon les boules se coupent sans qu'aucune ne soit contenue dans l'autre.
 */

/* ===== Logique ===== */

export type Norme = '1' | '2' | 'inf';
export type Relation = 'ab' | 'ba' | 'disjointes' | 'secantes';

export type Exercice = {
  norme: Norme;
  ferme: boolean;
  a: [number, number];
  b: [number, number];
  r: number;
  s: number;
};

const TRIPLETS: [number, number][] = [[3, 4], [5, 12], [6, 8], [8, 15], [9, 12], [4, 3]];

export function distance(norme: Norme, a: [number, number], b: [number, number]): number {
  const dx = Math.abs(a[0] - b[0]);
  const dy = Math.abs(a[1] - b[1]);
  if (norme === '1') return dx + dy;
  if (norme === 'inf') return Math.max(dx, dy);
  return Math.sqrt(dx * dx + dy * dy);
}

export function relation({ norme, ferme, a, b, r, s }: Exercice): Relation {
  const d = distance(norme, a, b);
  if (d + r <= s) return 'ab';
  if (d + s <= r) return 'ba';
  if (ferme ? d > r + s : d >= r + s) return 'disjointes';
  return 'secantes';
}

export const rayonMinimal = (e: Exercice) => distance(e.norme, e.a, e.b) + e.r;

function ecart(norme: Norme): [number, number] {
  if (norme === '2') {
    const [x, y] = choisir(TRIPLETS);
    return [x * choisir([-1, 1]), y * choisir([-1, 1])];
  }
  for (;;) {
    const x = entier(-6, 6);
    const y = entier(-6, 6);
    if (x !== 0 || y !== 0) return [x, y];
  }
}

export function genererExercice(): Exercice {
  const cible = choisir<Relation>(['ab', 'ba', 'disjointes', 'secantes']);
  const tangent = entier(1, 100) <= 40; // cas limites : il faut alors distinguer boules ouvertes et fermées
  for (let essai = 0; ; essai++) {
    const norme = choisir<Norme>(['1', '2', 'inf']);
    const ferme = choisir([true, false]);
    const a: [number, number] = [entier(-4, 4), entier(-4, 4)];
    const w = ecart(norme);
    const b: [number, number] = [a[0] + w[0], a[1] + w[1]];
    const r = entier(1, 9);
    const s = entier(1, 9);
    const exo = { norme, ferme, a, b, r, s };
    const d = distance(norme, a, b);
    const limite = d === r + s || d + r === s || d + s === r;
    if (essai < 4000 && (relation(exo) !== cible || (tangent && !limite))) continue;
    return exo;
  }
}

export const questions = (exo: Exercice): Question[] => [
  {
    type: 'choix', id: 'rel', libelle: <>Quelle est la position relative des deux boules ?</>, attendu: relation(exo),
    options: [
      { valeur: 'ab', contenu: <><MathTex tex="B_1\subset B_2" /></> },
      { valeur: 'ba', contenu: <><MathTex tex="B_2\subset B_1" /></> },
      { valeur: 'disjointes', contenu: <><MathTex tex="B_1\cap B_2=\varnothing" /></> },
      { valeur: 'secantes', contenu: <>elles se coupent, et aucune n’est contenue dans l’autre</> },
    ],
  },
  { type: 'nombre', id: 'd', libelle: <>Calcule <MathTex tex={`d=\\lVert a-b\\rVert${texNorme(exo.norme)}`} />.</>, attendu: distance(exo.norme, exo.a, exo.b), placeholder: 'Ex : 7', aide: 'Un entier.' },
  {
    type: 'nombre', id: 'rmin', libelle: <>Plus petit rayon <MathTex tex="s'" /> tel que <MathTex tex={`B_1\\subset B${exo.ferme ? '_f' : ''}(b,s')`} /> :</>, attendu: rayonMinimal(exo), placeholder: 'Ex : 12',
    aide: 'Un entier.',
  },
];

const texNorme = (n: Norme) => (n === '1' ? '_1' : n === '2' ? '_2' : '_\\infty');
const texVec = (v: [number, number]) => `(${nombre(v[0])}\\,;\\,${nombre(v[1])})`;

/* ===== Affichage ===== */

export default function Boules() {
  const [exo, regenerer] = useTirage(genererExercice);
  const [essai, setEssai] = useState(0);
  if (!exo) return <Chargement />;

  const { norme, ferme, a, b, r, s } = exo;
  const d = distance(norme, a, b);
  const rel = relation(exo);
  const nom = ferme ? 'fermées' : 'ouvertes';
  const nm = texNorme(norme);
  const dx = Math.abs(a[0] - b[0]);
  const dy = Math.abs(a[1] - b[1]);
  const calculD =
    norme === '1' ? `\\lvert ${dx}\\rvert+\\lvert ${dy}\\rvert=${d}` : norme === 'inf' ? `\\max(${dx},${dy})=${d}` : `\\sqrt{${dx}^2+${dy}^2}=\\sqrt{${dx * dx + dy * dy}}=${d}`;
  const verdict =
    rel === 'ab'
      ? `d+r=${d}+${r}=${d + r}\\le s=${s}`
      : rel === 'ba'
        ? `d+s=${d}+${s}=${d + s}\\le r=${r}`
        : rel === 'disjointes'
          ? `d=${d}${ferme ? '>' : '\\ge '}r+s=${r + s}`
          : `d+r=${d + r}>s=${s},\\quad d+s=${d + s}>r=${r},\\quad d=${d}${ferme ? '\\le ' : '<'}r+s=${r + s}`;

  return (
    <Cadre>
      <Titre />
      <Enonce>
        <p>
          On munit <MathTex tex="\mathbb R^2" /> de la norme <MathTex tex={`\\lVert\\cdot\\rVert${nm}`} />. On considère les deux boules {nom} :
        </p>
        <p style={{ textAlign: 'center' }}>
          <MathTex tex={`B_1=B${ferme ? '_f' : ''}\\big(a,${r}\\big)`} />, <MathTex tex={`B_2=B${ferme ? '_f' : ''}\\big(b,${s}\\big)`} />, avec <MathTex tex={`a=${texVec(a)}`} /> et <MathTex tex={`b=${texVec(b)}`} />.
        </p>
        <p>
          {ferme ? (
            <>La boule fermée est <MathTex tex={`B_f(c,\\rho)=\\{x:\\lVert x-c\\rVert${nm}\\le\\rho\\}`} />.</>
          ) : (
            <>La boule ouverte est <MathTex tex={`B(c,\\rho)=\\{x:\\lVert x-c\\rVert${nm}<\\rho\\}`} />.</>
          )}
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
            <MathTex tex={`d=${d}`} /> :{' '}
            {rel === 'ab' ? 'la boule B₁ est contenue dans B₂' : rel === 'ba' ? 'la boule B₂ est contenue dans B₁' : rel === 'disjointes' ? 'les deux boules sont disjointes' : 'les deux boules se coupent sans inclusion'}, et le plus petit rayon est <MathTex tex={`${rayonMinimal(exo)}`} />.
          </p>
        }
        correction={
          <>
            <li>
              Distance entre les centres : <MathTex tex={`d=\\lVert a-b\\rVert${nm}=${calculD}`} />.
            </li>
            <li>
              Le critère à connaître, valable dans <strong>tout</strong> espace vectoriel normé : <MathTex tex="B(a,r)\subset B(b,s)\iff d+r\le s" /> (on dépasse du côté opposé à <MathTex tex="b" />, le long de la droite <MathTex tex="(ab)" />). Des boules {nom} sont disjointes si et seulement si <MathTex tex={`d${ferme ? '>' : '\\ge '}r+s`} />.
            </li>
            <li>
              Ici : <MathTex tex={verdict} />. {rel === 'secantes' ? 'Aucune inclusion et pas de disjonction : les boules se coupent.' : rel === 'disjointes' ? 'Les boules sont donc disjointes.' : rel === 'ab' ? 'On a donc B₁ ⊂ B₂.' : 'On a donc B₂ ⊂ B₁.'}
            </li>
            {d === r + s && (
              <li>
                Cas limite : <MathTex tex="d=r+s" />. Les boules fermées ont alors un point commun (le point de la droite <MathTex tex="(ab)" /> à distance <MathTex tex="r" /> de <MathTex tex="a" />), tandis que les boules ouvertes n’en ont aucun.
              </li>
            )}
            <li>
              Plus petit rayon : le point de <MathTex tex="B_1" /> le plus éloigné de <MathTex tex="b" /> est à distance <MathTex tex="d+r" />, donc <MathTex tex={`s'=d+r=${d}+${r}=${rayonMinimal(exo)}`} /> (le rayon <MathTex tex="s'" /> est le plus petit qui convienne).
            </li>
          </>
        }
        conseils={
          <>
            <li>Commence toujours par calculer la distance <MathTex tex="d" /> entre les centres, avec <strong>la bonne norme</strong>.</li>
            <li>Inclusion : <MathTex tex="d+r\le s" />. Disjonction : <MathTex tex="d\ge r+s" /> (ouvertes) ou <MathTex tex="d>r+s" /> (fermées).</li>
            <li>Le cas d’égalité <MathTex tex="d=r+s" /> est un piège classique : il distingue boules ouvertes et boules fermées.</li>
          </>
        }
      />
    </Cadre>
  );
}
