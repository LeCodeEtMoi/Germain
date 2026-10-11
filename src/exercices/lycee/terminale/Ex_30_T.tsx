import { useState } from 'react';
import MathTex from '@/components/math/MathTex.tsx';
import {
  Astuce, Boutons, Cadre, Champ, Chargement, Choix, Correction, Enonce, Formulaire, MessageIncompris, MessageSucces, Retour, Titre,
  ZoneRetour, useTirage,
} from '@/components/exercice/ExerciceUI.tsx';
import { combinaison, entier, valeurDuTexte } from '@/lib/maths.ts';

/**
 * Exercice : étudier une fonction à l'aide d'une fonction auxiliaire.
 *
 *   f(x) = (x² − a·x − b − c·ln x) / x          sur ]0 ; +∞[
 *   φ(x) = x² + (b − c) + c·ln x                 (la fonction auxiliaire)
 *
 * Le lien est f'(x) = φ(x) / x² (quotient u/v avec u = x² − ax − b − c·ln x et v = x : u'v − uv' = x² + b − c + c·ln x).
 * (L'énoncé d'origine donnait φ(x) = x² − b + c·ln x, qui n'est PAS le numérateur de f' : l'exercice était faux.)
 *
 * Trois questions auto-corrigées :
 *   1. φ(1) = 1 + b − c ;
 *   2. φ est strictement croissante (φ' = 2x + c/x > 0), de limite −∞ en 0 et +∞ en +∞ : elle s'annule une seule fois,
 *      en α. Où se trouve α par rapport à 1 ? (α < 1 si φ(1) > 0, α = 1 si φ(1) = 0, α > 1 si φ(1) < 0) ;
 *   3. f(1) = 1 − a − b.
 * La correction détaille aussi les limites de f et son tableau de variations (décroissante sur ]0 ; α], croissante après).
 */

/* ===== Logique ===== */

export type Exercice = { a: number; b: number; c: number };

export const genererExercice = (): Exercice => ({ a: entier(2, 4), b: entier(1, 3), c: entier(1, 4) });

export const phi = ({ b, c }: Exercice, x: number) => x * x + b - c + c * Math.log(x);
export const f = ({ a, b, c }: Exercice, x: number) => (x * x - a * x - b - c * Math.log(x)) / x;

export type Position = 'avant' | 'egal' | 'apres';

export function reponses(exo: Exercice) {
  const phi1 = 1 + exo.b - exo.c;
  const position: Position = phi1 > 0 ? 'avant' : phi1 === 0 ? 'egal' : 'apres';
  return { phi1, position, f1: 1 - exo.a - exo.b };
}

export type Verdict =
  | { type: 'incompris'; raison: string }
  | { type: 'resultat'; phi1: boolean; position: boolean; f1: boolean };

export function verifier(exo: Exercice, saisiePhi1: string, position: string | null, saisieF1: string): Verdict {
  const lire = (s: string, nom: string) => {
    if (s.trim() === '') return { erreur: `Écris la valeur de ${nom}.` };
    const v = valeurDuTexte(s.replace(/[−–—]/g, '-'));
    return v === null ? { erreur: `Je ne comprends pas la valeur de ${nom} : écris un nombre entier (par exemple -2).` } : { v };
  };
  const p = lire(saisiePhi1, 'φ(1)');
  if ('erreur' in p) return { type: 'incompris', raison: p.erreur as string };
  if (position === null) return { type: 'incompris', raison: 'Choisis où se trouve α par rapport à 1.' };
  const g = lire(saisieF1, 'f(1)');
  if ('erreur' in g) return { type: 'incompris', raison: g.erreur as string };
  const r = reponses(exo);
  return {
    type: 'resultat',
    phi1: Math.abs((p.v as number) - r.phi1) < 1e-9,
    position: position === r.position,
    f1: Math.abs((g.v as number) - r.f1) < 1e-9,
  };
}

const LIBELLE_POSITION: Record<Position, string> = {
  avant: 'α < 1 (α appartient à ]0 ; 1[)',
  egal: 'α = 1',
  apres: 'α > 1',
};

/* ===== Affichage ===== */

export default function FonctionAuxiliaire() {
  const [exo, regenerer] = useTirage(genererExercice);
  const [phi1, setPhi1] = useState('');
  const [position, setPosition] = useState<string | null>(null);
  const [f1, setF1] = useState('');
  const [verdict, setVerdict] = useState<Verdict | null>(null);

  if (!exo) return <Chargement />;

  const { a, b, c } = exo;
  const r = reponses(exo);
  const numerateur = combinaison([[1, 'x^{2}'], [-a, 'x'], [-b, ''], [-c, '\\ln(x)']], true);
  const fTex = `f(x) = \\frac{${numerateur}}{x}`;
    const phiTex = `\\varphi(x) = ${combinaison([[1, 'x^{2}'], [b - c, ''], [c, '\\ln(x)']], true)}`;

  function valider() {
    setVerdict(verifier(exo as Exercice, phi1, position, f1));
  }

  function nouvelExercice() {
    regenerer();
    setPhi1('');
    setPosition(null);
    setF1('');
    setVerdict(null);
  }

  const reussi = verdict?.type === 'resultat' && verdict.phi1 && verdict.position && verdict.f1;

  return (
    <Cadre>
      <Titre />
      <Enonce>
        <p>
          Soit f la fonction définie sur ]0 ; +∞[ par :
        </p>
        <div className="exercice-formule">
          <MathTex tex={fTex} />
        </div>
        <p>
          On note φ la fonction définie sur ]0 ; +∞[ par :
        </p>
        <div className="exercice-formule">
          <MathTex tex={phiTex} />
        </div>
      </Enonce>

      <Formulaire onValider={valider}>
        <Champ libelle={<>1. Calcule <MathTex tex="\varphi(1)" /></>} valeur={phi1} onChange={setPhi1} maxLength={10} placeholder="Ex : -2" />
        <Choix
          legende={
            <>
              2. La fonction φ est strictement croissante sur ]0 ; +∞[, de limite −∞ en 0 et +∞ en +∞ : elle s'annule une seule fois, en un réel α. Où se trouve α ?
            </>
          }
          valeur={position}
          onChange={setPosition}
          options={(Object.keys(LIBELLE_POSITION) as Position[]).map((valeur) => ({ valeur, contenu: LIBELLE_POSITION[valeur] }))}
        />
        <Champ libelle={<>3. Calcule <MathTex tex="f(1)" /></>} valeur={f1} onChange={setF1} maxLength={10} placeholder="Ex : -4" />
        <Boutons onNouveau={nouvelExercice} />
      </Formulaire>

      <ZoneRetour>
        {verdict?.type === 'incompris' && <MessageIncompris raison={verdict.raison} />}
        {reussi && (
          <MessageSucces>
            <p>
              φ(1) = {r.phi1}, {LIBELLE_POSITION[r.position].split(' (')[0]} et f(1) = {r.f1}. Comme f'(x) = φ(x)/x², f est décroissante sur ]0 ; α] puis croissante sur [α ; +∞[.
            </p>
          </MessageSucces>
        )}
        {verdict?.type === 'resultat' && !reussi && (
          <Retour type="faux">
            <p>
              Oups, une erreur s'est glissée :{' '}
              {[!verdict.phi1 && 'φ(1)', !verdict.position && 'la position de α', !verdict.f1 && 'f(1)'].filter(Boolean).join(', ')} à revoir.
            </p>
            <Correction>
              <li>
                <strong>φ(1).</strong> <MathTex tex={`\\varphi(1) = 1^{2} + ${b - c < 0 ? `(${b - c})` : b - c} + ${c}\\ln(1) = 1 ${b - c < 0 ? '-' : '+'} ${Math.abs(b - c)} + 0 = ${r.phi1}`} />{' '}
                (car ln(1) = 0).
              </li>
              <li>
                <strong>Variations de φ.</strong> <MathTex tex={`\\varphi'(x) = 2x + \\frac{${c}}{x}`} /> est strictement positive sur ]0 ; +∞[ : φ est strictement croissante.{' '}
                Comme <MathTex tex={`\\lim_{x\\to 0^+} \\varphi(x) = -\\infty`} /> (car {c} × ln(x) tend vers −∞) et{' '}
                <MathTex tex={`\\lim_{x\\to +\\infty} \\varphi(x) = +\\infty`} />, φ s'annule une seule fois, en α.
              </li>
              <li>
                <strong>Position de α.</strong> φ(1) = {r.phi1}
                {r.position === 'avant'
                  ? " est positif : φ(1) > φ(α) = 0, et φ est croissante, donc 1 > α."
                  : r.position === 'egal'
                    ? ' est nul : α = 1.'
                    : " est négatif : φ(1) < φ(α) = 0, et φ est croissante, donc 1 < α."}{' '}
                Donc φ est négative sur ]0 ; α[ et positive sur ]α ; +∞[.
              </li>
              <li>
                <strong>f(1).</strong> <MathTex tex={`f(1) = \\frac{1 - ${a} - ${b} - ${c}\\ln(1)}{1} = ${r.f1}`} />.
              </li>
              <li>
                <strong>Variations de f.</strong> En posant <MathTex tex={`u(x) = ${numerateur}`} /> et v(x) = x :{' '}
                <MathTex tex={`f'(x) = \\frac{u'(x)\\,x - u(x)}{x^{2}} = \\frac{x^{2} + ${b - c < 0 ? `(${b - c})` : b - c} + ${c}\\ln(x)}{x^{2}} = \\frac{\\varphi(x)}{x^{2}}`} />.{' '}
                f' a le signe de φ : f est décroissante sur ]0 ; α], croissante sur [α ; +∞[. Ses limites en 0 et en +∞ valent +∞ : f admet un minimum en α.
              </li>
            </Correction>
            <Astuce titre="Pour réussir la prochaine fois">
              <ul>
                <li>Pour comparer α à 1, calcule φ(1) : si φ est croissante, φ(1) &gt; 0 signifie que 1 est après la racine.</li>
                <li>ln(1) = 0 : cela simplifie beaucoup les calculs en x = 1.</li>
                <li>Quand f' a un signe compliqué, une fonction auxiliaire (ici φ) permet d'étudier ce signe.</li>
              </ul>
            </Astuce>
          </Retour>
        )}
      </ZoneRetour>
    </Cadre>
  );
}
