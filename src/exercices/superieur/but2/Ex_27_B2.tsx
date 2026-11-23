import { useState } from 'react';
import { Cadre, Chargement, Enonce, MathTex, Questions, Titre, choisir, useTirage, type Question } from './_commun.ts';
import type { ResultatExpression } from '@/lib/reponses.ts';
import { bezout, inverseModulaire, inversiblesDe, tableauEuclide, type LigneEuclide } from './_arithmetique.ts';
import { parTex } from '@/lib/reponses.ts';

/**
 * Exercice : algorithme d'Euclide étendu, coefficients de Bézout, inverse modulaire.
 *
 *   Chaque ligne du tableau vérifie  n·u + a·v = r.
 *   La dernière ligne de reste non nul donne pgcd(n, a) et un couple (u, v).
 *   Quand le pgcd vaut 1, v est l'inverse de a modulo n.
 *
 *   Q1 : le pgcd.
 *   Q2 : un couple de Bézout — n'importe lequel est accepté, pas seulement celui du tableau.
 *   Q3 : l'inverse de a modulo n, entre 0 et n − 1.
 */

/* ===== Logique ===== */

const MODULES = [91, 115, 119, 123, 133, 141, 143, 155, 161, 169, 177, 187];

export type Exercice = { n: number; a: number };

export function genererExercice(): Exercice {
  for (;;) {
    const n = choisir(MODULES);
    // On veut un a inversible, pas trop petit, et un tableau de 3 à 6 étapes.
    const a = choisir(inversiblesDe(n).filter((k) => k > n / 4 && k < n));
    const etapes = tableauEuclide(n, a).length - 3;
    if (etapes >= 3 && etapes <= 6) return { n, a };
  }
}

/** Accepte tout couple (u, v) d'entiers vérifiant n·u + a·v = pgcd(n, a). */
export function verifierBezout({ n, a }: Exercice) {
  const d = bezout(n, a).d;
  return (saisie: string): ResultatExpression => {
    const nombres = saisie.match(/-?\d+/g)?.map(Number) ?? [];
    if (nombres.length !== 2) {
      return {
        ok: false,
        incompris: 'Donne deux entiers relatifs séparés par un point-virgule, par exemple -3 ; 7.',
      };
    }
    const [u, v] = nombres;
    if (n * u + a * v === d) return { ok: true };
    return { ok: false, indice: `Avec ton couple, ${n} × ${u} + ${a} × ${v} = ${n * u + a * v}, et non ${d}.` };
  };
}

export const questions = (exo: Exercice): Question[] => {
  const { n, a } = exo;
  const { d } = bezout(n, a);
  return [
    {
      type: 'nombre',
      id: 'pgcd',
      libelle: <>Que vaut <MathTex tex={`\\mathrm{pgcd}(${n}, ${a})`} /> ?</>,
      attendu: d,
      placeholder: 'Ex : 1',
      aide: 'Un nombre entier.',
    },
    {
      type: 'expression',
      id: 'bezout',
      libelle: (
        <>
          Donne un couple d'entiers relatifs <MathTex tex="(u, v)" /> tel que{' '}
          <MathTex tex={`${n}\\,u + ${a}\\,v = \\mathrm{pgcd}(${n}, ${a})`} />.
        </>
      ),
      verifier: verifierBezout(exo),
      placeholder: 'Ex : -3 ; 7',
      aide: 'Les deux entiers séparés par un point-virgule. Tout couple qui convient est accepté.',
      touches: [{ label: '−', texte: '-' }, { label: ' ; ', texte: ' ; ' }],
    },
    {
      type: 'nombre',
      id: 'inverse',
      libelle: (
        <>
          En déduire l'inverse de <MathTex tex={String(a)} /> dans{' '}
          <MathTex tex={`\\mathbb{Z}/${n}\\mathbb{Z}`} />.
        </>
      ),
      attendu: inverseModulaire(a, n) as number,
      placeholder: 'Ex : 100',
      aide: `Le représentant entre 0 et ${n - 1}.`,
    },
  ];
};

/* ===== Affichage ===== */

function TableauEuclide({ lignes, n, a }: { lignes: LigneEuclide[]; n: number; a: number }) {
  return (
    <div className="exercice-tableau-conteneur">
      <table className="exercice-tableau">
        <caption className="exercice-donnee__legende">
          Chaque ligne vérifie {n} × u + {a} × v = r.
        </caption>
        <thead>
          <tr>
            <th scope="col">i</th>
            <th scope="col">a</th>
            <th scope="col">b</th>
            <th scope="col">q</th>
            <th scope="col">r</th>
            <th scope="col">u</th>
            <th scope="col">v</th>
          </tr>
        </thead>
        <tbody>
          {lignes.map((l) => (
            <tr key={l.i}>
              <th scope="row">{l.i}</th>
              <td>{l.a ?? ''}</td>
              <td>{l.b ?? ''}</td>
              <td>{l.q ?? ''}</td>
              <td>{l.r}</td>
              <td>{l.u}</td>
              <td>{l.v}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function EuclideBezout() {
  const [exo, regenerer] = useTirage(genererExercice);
  const [essai, setEssai] = useState(0);
  if (!exo) return <Chargement />;

  const { n, a } = exo;
  const { d, u, v, lignes } = bezout(n, a);
  const inverse = inverseModulaire(a, n) as number;
  const derniere = lignes[lignes.length - 2];
  const premiere = lignes[2];

  return (
    <Cadre>
      <Titre />
      <Enonce>
        <p>
          On cherche l'inverse de <strong>{a}</strong> dans{' '}
          <MathTex tex={`\\mathbb{Z}/${n}\\mathbb{Z}`} /> par l'algorithme d'Euclide étendu.
        </p>
        <p>
          On construit un tableau où chaque ligne porte un reste <MathTex tex="r" /> et deux coefficients{' '}
          <MathTex tex="u" /> et <MathTex tex="v" /> tels que <MathTex tex={`${n}\\,u + ${a}\\,v = r`} />. On part de{' '}
          <MathTex tex={`r_{-1} = ${n}`} /> (avec <MathTex tex="u = 1, v = 0" />) et{' '}
          <MathTex tex={`r_{0} = ${a}`} /> (avec <MathTex tex="u = 0, v = 1" />), puis chaque ligne se déduit des
          deux précédentes par la division euclidienne :
        </p>
        <div className="exercice-formule">
          <MathTex tex="r_i = r_{i-2} - q_i\,r_{i-1},\qquad u_i = u_{i-2} - q_i\,u_{i-1},\qquad v_i = v_{i-2} - q_i\,v_{i-1}" />
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
            <MathTex tex={`\\mathrm{pgcd}(${n}, ${a}) = ${d}`} />, le tableau donne{' '}
            <MathTex tex={`${n} \\times ${parTex(u)} + ${a} \\times ${parTex(v)} = ${d}`} />, et l'inverse de {a} vaut{' '}
            <strong>{inverse}</strong>.
          </p>
        }
        correction={
          <>
            <li>
              <strong>Le tableau d'Euclide-Bézout.</strong>
              <TableauEuclide lignes={lignes} n={n} a={a} />
            </li>
            <li>
              <strong>Première étape, pour lire le tableau.</strong> On divise {n} par {a} :{' '}
              <MathTex tex={`${n} = ${premiere.q} \\times ${a} + ${premiere.r}`} />. Les coefficients suivent la même
              combinaison : <MathTex tex={`u_1 = 1 - ${premiere.q} \\times 0 = ${premiere.u}`} /> et{' '}
              <MathTex tex={`v_1 = 0 - ${premiere.q} \\times 1 = ${premiere.v}`} />. On vérifie bien{' '}
              <MathTex tex={`${n} \\times ${parTex(premiere.u)} + ${a} \\times ${parTex(premiere.v)} = ${premiere.r}`} />.
            </li>
            <li>
              <strong>Le pgcd.</strong> On s'arrête au dernier reste non nul : c'est{' '}
              <MathTex tex={`\\mathrm{pgcd}(${n}, ${a}) = ${d}`} /> (ligne <MathTex tex={`i = ${derniere.i}`} />).
            </li>
            <li>
              <strong>Le couple de Bézout.</strong> La même ligne donne <MathTex tex={`u = ${u}`} /> et{' '}
              <MathTex tex={`v = ${v}`} /> :{' '}
              <MathTex tex={`${n} \\times ${parTex(u)} + ${a} \\times ${parTex(v)} = ${d}`} />. Ce couple n'est pas unique :{' '}
              <MathTex tex={`(u + k\\,${a},\\; v - k\\,${n})`} /> convient pour tout entier{' '}
              <MathTex tex="k" />.
            </li>
            <li>
              <strong>L'inverse.</strong> On réduit l'identité modulo {n} : le terme{' '}
              <MathTex tex={`${n}\\,u`} /> disparaît, donc <MathTex tex={`${a} \\times ${parTex(v)} \\equiv 1 \\pmod{${n}}`} />.
              L'inverse est donc <MathTex tex={`${parTex(v)} \\equiv ${inverse} \\pmod{${n}}`} />. Vérification :{' '}
              <MathTex tex={`${a} \\times ${inverse} = ${a * inverse} = ${Math.round((a * inverse - 1) / n)} \\times ${n} + 1`} />.
            </li>
          </>
        }
        conseils={
          <>
            <li>
              Les colonnes <MathTex tex="u" /> et <MathTex tex="v" /> suivent exactement la même règle que la colonne{' '}
              <MathTex tex="r" /> : c'est le même <MathTex tex="q_i" /> dans les trois cas.
            </li>
            <li>
              Vérifie chaque ligne au fur et à mesure avec <MathTex tex={`${n}\\,u + ${a}\\,v = r`} /> : une erreur
              de signe se repère tout de suite.
            </li>
            <li>
              L'inverse existe uniquement quand le pgcd vaut 1 ; pense à ramener{' '}
              <MathTex tex="v" /> entre 0 et {n - 1} en ajoutant {n} s'il est négatif.
            </li>
          </>
        }
      />
    </Cadre>
  );
}
