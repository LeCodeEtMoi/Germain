// Cadre commun des exercices : énoncé, saisie, boutons et retours.
// Il n'utilise que les classes de src/styles/exercice.css (importé par la page, jamais ici).
import { useId, useRef, useState, type FormEvent, type ReactNode } from "react";
import type { Verdict } from "@/lib/verification";
import { melanger } from "@/lib/crypto";

export type Reponse =
  | {
      type: "texte";
      label: string;
      aide?: string;
      touches?: string[];
      verifier: (saisie: string) => Verdict;
    }
  | { type: "choix"; label: string; options: string[]; bonne: number };

export interface Question {
  consigne: ReactNode;
  donnees?: { libelle: string; valeur: ReactNode }[];
  formule?: ReactNode;
  reponse: Reponse;
  /** Correction pas à pas, affichée si la réponse est fausse. */
  etapes: ReactNode[];
  /** Conseils « Pour réussir la prochaine fois ». */
  astuces: string[];
}

type Etat = "neutre" | Verdict;

export default function CadreExercice({ generer }: { generer: () => Question }) {
  const [question, setQuestion] = useState<Question>(generer);
  const [saisie, setSaisie] = useState("");
  const [choix, setChoix] = useState<number | null>(null);
  const [etat, setEtat] = useState<Etat>("neutre");
  const champ = useRef<HTMLInputElement>(null);
  const id = useId();
  const { reponse } = question;

  function valider(e: FormEvent) {
    e.preventDefault();
    if (reponse.type === "texte") {
      setEtat(saisie.trim() === "" ? "incompris" : reponse.verifier(saisie));
    } else {
      setEtat(choix === null ? "incompris" : choix === reponse.bonne ? "correct" : "faux");
    }
  }

  function nouvelExercice() {
    setQuestion(generer());
    setSaisie("");
    setChoix(null);
    setEtat("neutre");
  }

  function inserer(texte: string) {
    const el = champ.current;
    const debut = el?.selectionStart ?? saisie.length;
    const fin = el?.selectionEnd ?? saisie.length;
    setSaisie(saisie.slice(0, debut) + texte + saisie.slice(fin));
    setEtat("neutre");
    requestAnimationFrame(() => {
      el?.focus();
      el?.setSelectionRange(debut + texte.length, debut + texte.length);
    });
  }

  return (
    <section className="exercice" aria-labelledby={`${id}-titre`}>
      <h2 className="exercice-titre righteous" id={`${id}-titre`}>
        <span aria-hidden="true">// </span>Énoncé
      </h2>

      <div className="exercice-enonce">{question.consigne}</div>

      {question.donnees && (
        <dl className="exercice-donnees">
          {question.donnees.map((d, i) => (
            <div className="exercice-donnee" key={i}>
              <dt>{d.libelle}</dt>
              <dd>{d.valeur}</dd>
            </div>
          ))}
        </dl>
      )}

      {question.formule && <div className="exercice-formule">{question.formule}</div>}

      <form onSubmit={valider} noValidate>
        {reponse.type === "texte" ? (
          <>
            <label className="exercice-label" htmlFor={`${id}-champ`}>
              {reponse.label}
            </label>
            <input
              ref={champ}
              id={`${id}-champ`}
              className="exercice-champ"
              type="text"
              autoComplete="off"
              spellCheck={false}
              value={saisie}
              onChange={(e) => {
                setSaisie(e.target.value);
                setEtat("neutre");
              }}
              aria-describedby={reponse.aide ? `${id}-aide` : undefined}
            />
            {reponse.touches && (
              <div className="exercice-touches" role="group" aria-label="Aide à la saisie">
                {reponse.touches.map((t) => (
                  <button type="button" className="exercice-touche" key={t} onClick={() => inserer(t)}>
                    {t}
                  </button>
                ))}
              </div>
            )}
            {reponse.aide && (
              <p className="exercice-aide" id={`${id}-aide`}>
                {reponse.aide}
              </p>
            )}
          </>
        ) : (
          <fieldset className="exercice-choix">
            <legend className="exercice-label">{reponse.label}</legend>
            {reponse.options.map((option, i) => (
              <label key={i}>
                <input
                  type="radio"
                  name={`${id}-choix`}
                  checked={choix === i}
                  onChange={() => {
                    setChoix(i);
                    setEtat("neutre");
                  }}
                />
                <span>{option}</span>
              </label>
            ))}
          </fieldset>
        )}

        <div>
          <button type="submit" className="exercice-bouton exercice-bouton--principal">
            Valider
          </button>
          <button
            type="button"
            className="exercice-bouton exercice-bouton--secondaire"
            onClick={nouvelExercice}
          >
            Nouvel exercice
          </button>
        </div>
      </form>

      <div aria-live="polite">
        {etat === "correct" && (
          <div className="exercice-retour exercice-retour--correct">
            <p><strong>Correct</strong></p>
            <p>Bravo, vous avez réussi cet exercice !</p>
          </div>
        )}

        {etat === "faux" && (
          <div className="exercice-retour exercice-retour--faux">
            <p><strong>Pas tout à fait</strong></p>
            <p>Une erreur s'est glissée. Voici la correction étape par étape.</p>
            <ol className="exercice-correction">
              {question.etapes.map((etape, i) => (
                <li key={i}>{etape}</li>
              ))}
            </ol>
            {question.astuces.length > 0 && (
              <div className="exercice-astuce">
                <p><strong>Pour réussir la prochaine fois</strong></p>
                <ul>
                  {question.astuces.map((a, i) => (
                    <li key={i}>{a}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {etat === "incompris" && (
          <div className="exercice-retour exercice-retour--incompris">
            <p><strong>Je n'ai pas compris</strong></p>
            <p>
              {reponse.type === "texte"
                ? "La saisie est illisible : rien n'est compté comme faux. Vérifiez le format demandé sous le champ."
                : "Choisissez une réponse avant de valider."}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

/** Construit une question à choix unique en mélangeant la bonne réponse parmi les distracteurs. */
export function qcm(label: string, bonne: string, distracteurs: string[]): Reponse {
  const options = melanger([bonne, ...distracteurs]);
  return { type: "choix", label, options, bonne: options.indexOf(bonne) };
}
