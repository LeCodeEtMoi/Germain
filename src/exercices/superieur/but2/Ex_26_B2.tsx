import { useState } from 'react';
import { Cadre, Chargement, Enonce, MathTex, Questions, Titre, choisir, entier, melanger, useTirage, type Question } from './_commun.ts';
import {
  annulateurDe,
  diviseursDeZero,
  indicatriceEuler,
  inversiblesDe,
  pgcd,
  puissanceMod,
  texClasse,
} from './_arithmetique.ts';

/**
 * Exercice : l'anneau Z/nZ.
 *
 *   Q1 : un produit de deux classes, en réduisant avant de multiplier.
 *   Q2 : une puissance plus une classe.
 *   Q3 : le nombre d'éléments inversibles, φ(n).
 *   Q4 : reconnaître un diviseur de zéro.
 *
 *   Critères : k̄ est inversible ⟺ pgcd(k, n) = 1 ;
 *              k̄ ≠ 0̄ est un diviseur de zéro ⟺ pgcd(k, n) > 1.
 *   Les deux familles et la classe 0̄ partitionnent Z/nZ.
 */

/* ===== Logique ===== */

const MODULES = [6, 8, 9, 10, 12, 14, 15, 16, 18, 20, 21];

export type Exercice = {
  n: number;
  /** Produit : x̄ × ȳ */
  x: number;
  y: number;
  /** Puissance : z̄^p + t̄ */
  z: number;
  p: number;
  t: number;
  /** Le diviseur de zéro à reconnaître, et les leurres (tous inversibles). */
  diviseur: number;
  leurres: number[];
};

export function genererExercice(): Exercice {
  const n = choisir(MODULES);
  const inversibles = inversiblesDe(n).filter((k) => k !== 1);
  const diviseurs = diviseursDeZero(n);
  return {
    n,
    x: entier(4, 9) * 10 + entier(1, 9),
    y: entier(4, 9) * 10 + entier(1, 9),
    z: entier(7, 19),
    p: entier(3, 6),
    t: entier(200, 2500),
    diviseur: choisir(diviseurs),
    leurres: melanger(inversibles).slice(0, 3),
  };
}

export const produit = ({ x, y, n }: Exercice) => (x * y) % n;
export const puissance = ({ z, p, t, n }: Exercice) => (puissanceMod(z, p, n) + (t % n)) % n;

export const questions = (exo: Exercice): Question[] => {
  const { n, x, y, z, p, t, diviseur, leurres } = exo;
  return [
    {
      type: 'nombre',
      id: 'produit',
      libelle: (
        <>
          Calcule <MathTex tex={`${texClasse(x)} \\times ${texClasse(y)}`} /> dans{' '}
          <MathTex tex={`\\mathbb{Z}/${n}\\mathbb{Z}`} />.
        </>
      ),
      attendu: produit(exo),
      placeholder: 'Ex : 2',
      aide: `Le représentant entre 0 et ${n - 1}.`,
    },
    {
      type: 'nombre',
      id: 'puissance',
      libelle: (
        <>
          Calcule <MathTex tex={`${texClasse(z)}^{\\,${p}} + ${texClasse(t)}`} /> dans{' '}
          <MathTex tex={`\\mathbb{Z}/${n}\\mathbb{Z}`} />.
        </>
      ),
      attendu: puissance(exo),
      placeholder: 'Ex : 2',
      aide: `Le représentant entre 0 et ${n - 1}.`,
    },
    {
      type: 'nombre',
      id: 'inversibles',
      libelle: (
        <>
          Combien <MathTex tex={`\\mathbb{Z}/${n}\\mathbb{Z}`} /> compte-t-il d'éléments inversibles ?
        </>
      ),
      attendu: indicatriceEuler(n),
      placeholder: 'Ex : 4',
      aide: 'Un nombre entier.',
    },
    {
      type: 'choix',
      id: 'diviseur',
      libelle: (
        <>
          Laquelle de ces classes est un <strong>diviseur de zéro</strong> de{' '}
          <MathTex tex={`\\mathbb{Z}/${n}\\mathbb{Z}`} /> ?
        </>
      ),
      attendu: String(diviseur),
      enLigne: true,
      options: melanger([diviseur, ...leurres]).map((k) => ({
        valeur: String(k),
        contenu: <MathTex tex={texClasse(k)} />,
      })),
    },
  ];
};

/* ===== Affichage ===== */

export default function AnneauZnZ() {
  const [exo, regenerer] = useTirage(genererExercice);
  const [essai, setEssai] = useState(0);
  if (!exo) return <Chargement />;

  const { n, x, y, z, p, t, diviseur } = exo;
  const xr = x % n;
  const yr = y % n;
  const zp = puissanceMod(z, p, n);
  const tr = t % n;
  const m = annulateurDe(diviseur, n);
  const phi = indicatriceEuler(n);
  const inversibles = inversiblesDe(n);
  const diviseurs = diviseursDeZero(n);

  return (
    <Cadre>
      <Titre />
      <Enonce>
        <p>
          Dans <MathTex tex={`\\mathbb{Z}/${n}\\mathbb{Z}`} />, on travaille sur les classes de congruence{' '}
          <MathTex tex={`${texClasse(0)}, ${texClasse(1)}, \\dots, ${texClasse(n - 1)}`} /> : deux entiers sont
          dans la même classe quand ils ont le même reste dans la division par {n}.
        </p>
        <p>
          On rappelle qu'une classe <MathTex tex={texClasse('k')} /> est <strong>inversible</strong> s'il existe{' '}
          <MathTex tex={texClasse('m')} /> telle que <MathTex tex={`${texClasse('k')} \\times ${texClasse('m')} = ${texClasse(1)}`} />,
          et que c'est un <strong>diviseur de zéro</strong> si elle est non nulle et s'il existe{' '}
          <MathTex tex={`${texClasse('m')} \\neq ${texClasse(0)}`} /> telle que{' '}
          <MathTex tex={`${texClasse('k')} \\times ${texClasse('m')} = ${texClasse(0)}`} />.
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
            <MathTex tex={`${texClasse(x)} \\times ${texClasse(y)} = ${texClasse(produit(exo))}`} />,{' '}
            <MathTex tex={`${texClasse(z)}^{\\,${p}} + ${texClasse(t)} = ${texClasse(puissance(exo))}`} />, il y a {phi}{' '}
            inversibles, et <MathTex tex={texClasse(diviseur)} /> est bien un diviseur de zéro.
          </p>
        }
        correction={
          <>
            <li>
              <strong>Le produit.</strong> On réduit <em>avant</em> de multiplier :{' '}
              <MathTex tex={`${x} \\equiv ${xr}`} /> et <MathTex tex={`${y} \\equiv ${yr} \\pmod{${n}}`} />, donc{' '}
              <MathTex tex={`${texClasse(x)} \\times ${texClasse(y)} = ${texClasse(xr)} \\times ${texClasse(yr)} = ${texClasse(xr * yr)} = ${texClasse(produit(exo))}`} />.
            </li>
            <li>
              <strong>La puissance.</strong> On élève au carré de proche en proche, en réduisant à chaque étape :{' '}
              <MathTex tex={`${z}^{\\,${p}} \\equiv ${zp} \\pmod{${n}}`} />. Par ailleurs{' '}
              <MathTex tex={`${t} \\equiv ${tr} \\pmod{${n}}`} />. La somme vaut{' '}
              <MathTex tex={`${zp} + ${tr} = ${zp + tr} \\equiv ${puissance(exo)} \\pmod{${n}}`} />.
            </li>
            <li>
              <strong>Les inversibles.</strong> <MathTex tex={texClasse('k')} /> est inversible si et seulement si{' '}
              <MathTex tex={`\\mathrm{pgcd}(k, ${n}) = 1`} /> (l'identité de Bézout fournit alors l'inverse). Ici :{' '}
              <MathTex tex={inversibles.map((k) => texClasse(k)).join(',\\; ')} />, soit{' '}
              <strong>{phi}</strong> éléments — c'est <MathTex tex={`\\varphi(${n})`} />, l'indicatrice d'Euler.
            </li>
            <li>
              <strong>Les diviseurs de zéro.</strong> Ce sont les classes non nulles avec{' '}
              <MathTex tex={`\\mathrm{pgcd}(k, ${n}) > 1`} /> :{' '}
              <MathTex tex={diviseurs.map((k) => texClasse(k)).join(',\\; ')} />. Pour{' '}
              <MathTex tex={texClasse(diviseur)} />, on a <MathTex tex={`\\mathrm{pgcd}(${diviseur}, ${n}) = ${pgcd(diviseur, n)}`} />{' '}
              et <MathTex tex={`${texClasse(diviseur)} \\times ${texClasse(m)} = ${texClasse(diviseur * m)} = ${texClasse(0)}`} />.
            </li>
            <li>
              <strong>Au passage.</strong> {phi} inversibles, {diviseurs.length} diviseurs de zéro et la classe{' '}
              <MathTex tex={texClasse(0)} /> : {phi} + {diviseurs.length} + 1 = {n}. Chaque classe non nulle est
              inversible ou diviseur de zéro, jamais les deux.
            </li>
          </>
        }
        conseils={
          <>
            <li>Réduis toujours modulo {n} avant de multiplier : <MathTex tex={`${x} \\times ${y}`} /> est inutilement gros.</li>
            <li>
              Pour une puissance, ne calcule jamais <MathTex tex={`${z}^{\\,${p}}`} /> en entier : élève au carré en
              réduisant à chaque étape.
            </li>
            <li>
              Un entier inversible modulo {n} n'a aucun facteur commun avec {n}. Comme {n} ={' '}
              {(() => {
                const f: number[] = [];
                let r = n;
                for (let d = 2; d <= r; d++) while (r % d === 0) { f.push(d); r /= d; }
                return f.join(' × ');
              })()}
              , il suffit de repérer les multiples de ses facteurs premiers.
            </li>
          </>
        }
      />
    </Cadre>
  );
}
