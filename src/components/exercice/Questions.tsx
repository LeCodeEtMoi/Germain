import { useState, type ReactNode } from 'react';
import {
  Astuce, Boutons, Champ, ChampAvecTouches, Choix, Correction, Formulaire, MessageIncompris, MessageSucces, Retour, ZoneRetour,
  type Touche,
} from './ExerciceUI.tsx';
import MathTex from '@/components/math/MathTex.tsx';
import { analyser, valeurDuTexte, versTex } from '@/lib/maths.ts';
import type { ResultatExpression } from '@/lib/reponses.ts';

/**
 * Bloc « questions + Valider + Nouvel exercice + retour » partagé par les exercices 31 à 50.
 *
 * Trois sortes de questions :
 *   - nombre      : la saisie est lue comme un nombre (3, −2,5, 1/3, 2*pi…) puis comparée à la valeur attendue ;
 *   - choix       : boutons radio ;
 *   - expression  : la saisie est vérifiée par une fonction fournie par l'exercice (fonction, équation…).
 *
 * Règles de retour :
 *   - une question vide ou illisible → message « je n'ai pas compris », rien n'est corrigé ;
 *   - tout est juste → message de réussite ;
 *   - sinon → correction détaillée (étapes, erreurs fréquentes, conseils).
 *
 * L'exercice doit être monté avec une `key` qui change à chaque « Nouvel exercice » : l'état est alors remis à zéro.
 */

export type { ResultatExpression };

type Commun = { id: string; libelle: ReactNode; aide?: ReactNode };

export type Question =
  | (Commun & { type: 'nombre'; attendu: number; tolerance?: number; placeholder?: string; touches?: Touche[] })
  | (Commun & { type: 'choix'; attendu: string; options: { valeur: string; contenu: ReactNode }[]; enLigne?: boolean })
  | (Commun & {
      type: 'expression';
      verifier: (saisie: string) => ResultatExpression;
      placeholder?: string;
      touches?: Touche[];
      apercu?: (saisie: string) => ReactNode;
    });

export type ResultatQuestion =
  | { etat: 'vide' }
  | { etat: 'illisible'; raison: string }
  | { etat: 'juste' }
  | { etat: 'faux'; indice?: string };

/** Vérifie un nombre saisi. `tolerance` : écart absolu accepté (0 → égalité à 10⁻⁹ près en relatif). */
export function verifierNombre(saisie: string, attendu: number, tolerance = 0): ResultatQuestion {
  if (saisie.trim() === '') return { etat: 'vide' };
  const v = valeurDuTexte(saisie);
  if (v === null) return { etat: 'illisible', raison: `Je n'ai pas compris « ${saisie.trim()} » : écris un nombre (3, −2,5 ou 1/3).` };
  const marge = tolerance > 0 ? tolerance : 1e-9 * Math.max(1, Math.abs(attendu));
  return Math.abs(v - attendu) <= marge ? { etat: 'juste' } : { etat: 'faux' };
}

export function evaluerQuestion(q: Question, saisie: string | null): ResultatQuestion {
  if (q.type === 'choix') {
    if (saisie === null) return { etat: 'vide' };
    return saisie === q.attendu ? { etat: 'juste' } : { etat: 'faux' };
  }
  const texte = saisie ?? '';
  if (q.type === 'nombre') return verifierNombre(texte, q.attendu, q.tolerance);
  if (texte.trim() === '') return { etat: 'vide' };
  const r = q.verifier(texte);
  if (r.ok) return { etat: 'juste' };
  if (r.incompris) return { etat: 'illisible', raison: r.incompris };
  return { etat: 'faux', indice: r.indice };
}

type Props = {
  questions: Question[];
  /** Phrase(s) affichée(s) sous « Bravo ». */
  succes?: ReactNode;
  /** Étapes de la correction (des <li>). */
  correction: ReactNode;
  /** Erreurs fréquentes et conseils (des <li>). */
  conseils: ReactNode;
  onNouveau: () => void;
};

export default function Questions({ questions, succes, correction, conseils, onNouveau }: Props) {
  const [saisies, setSaisies] = useState<Record<string, string | null>>({});
  const [resultats, setResultats] = useState<ResultatQuestion[] | null>(null);

  const regler = (id: string, valeur: string) => setSaisies((s) => ({ ...s, [id]: valeur }));

  function valider() {
    setResultats(questions.map((q) => evaluerQuestion(q, saisies[q.id] ?? null)));
  }

  const vide = resultats?.findIndex((r) => r.etat === 'vide') ?? -1;
  const illisible = resultats?.find((r) => r.etat === 'illisible');
  const toutJuste = resultats !== null && resultats.every((r) => r.etat === 'juste');
  const numero = (i: number) => (questions.length > 1 ? `Question ${i + 1}` : 'Ta réponse');

  return (
    <>
      <Formulaire onValider={valider}>
        {questions.map((q, i) => {
          const valeur = saisies[q.id] ?? '';
          const etiquette = (
            <>
              {questions.length > 1 && <strong>{i + 1}. </strong>}
              {q.libelle}
            </>
          );
          if (q.type === 'choix') {
            return (
              <Choix
                key={q.id}
                legende={etiquette}
                options={q.options}
                valeur={saisies[q.id] ?? null}
                onChange={(v) => regler(q.id, v)}
                enLigne={q.enLigne}
              />
            );
          }
          if (q.type === 'nombre') {
            const commun = {
              libelle: etiquette,
              valeur,
              onChange: (v: string) => regler(q.id, v),
              placeholder: q.placeholder ?? 'Ex : 12 ou 3/4',
              aide: q.aide ?? 'Un entier, une décimale (virgule ou point) ou une fraction comme 3/4.',
            };
            return q.touches ? <ChampAvecTouches key={q.id} {...commun} touches={q.touches} /> : <Champ key={q.id} {...commun} />;
          }
          return (
            <ChampAvecTouches
              key={q.id}
              libelle={etiquette}
              valeur={valeur}
              onChange={(v) => regler(q.id, v)}
              placeholder={q.placeholder}
              aide={q.aide}
              touches={q.touches ?? []}
              apercu={q.apercu && valeur.trim() !== '' ? q.apercu(valeur) : undefined}
            />
          );
        })}
        <Boutons onNouveau={onNouveau} />
      </Formulaire>

      <ZoneRetour>
        {resultats && vide >= 0 && (
          <MessageIncompris raison={questions.length > 1 ? `Réponds à toutes les questions avant de valider (il manque la question ${vide + 1}).` : 'Écris ou choisis une réponse avant de valider.'} />
        )}
        {resultats && vide < 0 && illisible && illisible.etat === 'illisible' && <MessageIncompris raison={illisible.raison} />}
        {resultats && vide < 0 && !illisible && toutJuste && <MessageSucces>{succes}</MessageSucces>}
        {resultats && vide < 0 && !illisible && !toutJuste && (
          <Retour type="faux">
            <p>Oups, une erreur s'est glissée.</p>
            {questions.length > 1 && (
              <ul>
                {resultats.map((r, i) => (
                  <li key={questions[i].id}>
                    {numero(i)} : {r.etat === 'juste' ? 'juste.' : `à revoir.${r.etat === 'faux' && r.indice ? ' ' + r.indice : ''}`}
                  </li>
                ))}
              </ul>
            )}
            {questions.length === 1 && resultats[0].etat === 'faux' && resultats[0].indice && <p>{resultats[0].indice}</p>}
            <Correction>{correction}</Correction>
            <Astuce titre="Pour réussir la prochaine fois">
              <ul>{conseils}</ul>
            </Astuce>
          </Retour>
        )}
      </ZoneRetour>
    </>
  );
}

/** « Ce que j'ai compris : prefixe = … » sous un champ d'expression (rien si la saisie est illisible). */
export function apercuExpression(saisie: string, prefixe: string, options: { variables?: string[]; constantes?: string[]; retirer?: RegExp } = {}): ReactNode {
  const { variables = ['x'], constantes = [], retirer } = options;
  const texte = retirer ? saisie.replace(retirer, '') : saisie;
  const lu = analyser(texte, { variables, constantes });
  if (!lu.ok) return null;
  return (
    <div className="exercice-apercu" aria-live="off">
      <span className="exercice-apercu__legende">Ce que j'ai compris :</span>
      <MathTex tex={`${prefixe} = ${versTex(lu.noeud)}`} />
    </div>
  );
}
