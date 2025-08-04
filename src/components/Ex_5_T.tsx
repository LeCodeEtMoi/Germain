  import React, { useState, useRef, useEffect } from "react";
  import "mathlive"; // importe et initialise le web component <math-field>


function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Génération d'une fonction simple : a x^b
function generateFunction() {
  const a = randomInt(2, 10);
  const b = randomInt(2, 5);
  // On écrit la fonction en LaTeX
  const funcLatex = `${a}x^{${b}}`;
  const derivativeLatex = `${a * b}x^{${b - 1}}`;

  return {
    funcLatex,
    derivativeLatex,
  };
}

export default function DerivativeExercice() {
  const [problem, setProblem] = useState(generateFunction());
  const [userInput, setUserInput] = useState("");
  const [feedback, setFeedback] = useState(null);

  // Référence pour le champ de saisie MathLive (non contrôlé)
  const mathfieldRef = useRef(null);

  // Synchroniser le champ MathLive avec userInput (contrôle semi-contrôlé)
  useEffect(() => {
    if (mathfieldRef.current && userInput !== mathfieldRef.current.getValue("latex")) {
      mathfieldRef.current.setValue(userInput);
    }
  }, [userInput]);

  // Validation (compare LaTeX sans espaces ni symboles superflus)
  function handleValidate() {
    const normalize = (str) => str.replace(/\s+/g, "").toLowerCase();
    if (normalize(userInput) === normalize(problem.derivativeLatex)) {
      setFeedback({ correct: true, message: <p>🎉 Excellent! C'est la bonne dérivée.</p> });
    } else {
      setFeedback({
        correct: false,
        message: (
          <div>
            <p>❌ Ce n'est pas tout à fait ça. Essayez encore !</p>
            <p>Rappel : La dérivée de <strong>ax^n</strong> est <strong>anx^(n-1)</strong>.</p>
            <p>La bonne réponse est : <strong>{problem.derivativeLatex}</strong></p>
          </div>
        ),
      });
    }
  }

  function handleNewExercise() {
    setProblem(generateFunction());
    setUserInput("");
    setFeedback(null);
  }

  return (
    <div className="columns is-centered mt-6">
      <div className="column is-two-thirds">
        <div className="box content">
          <h2 className="title is-4">Exercice de Dérivation</h2>
          <p>Trouvez la fonction dérivée de la fonction suivante :</p>

          <p className="has-text-centered has-text-weight-bold">
            {/* Affichage de la fonction originale en LaTeX */}
            <math-field
              read-only
              static
              value={problem.funcLatex}
              style={{ fontSize: "1.5rem" }}
            />
          </p>

          <label className="label" htmlFor="userInput">
            f'(x) =
          </label>
          <math-field
            id="userInput"
            ref={mathfieldRef}
            virtual-keyboard-mode="manual"
            style={{ width: "100%", minHeight: "3rem", fontSize: "1.3rem" }}
            onInput={(e) => setUserInput(e.target.getValue("latex"))}
          ></math-field>

          <div className="field is-grouped is-grouped-centered mt-4">
            <button className="button is-primary" onClick={handleValidate}>
              Valider
            </button>
            <button className="button is-light" onClick={handleNewExercise}>
              Nouvel exercice
            </button>
          </div>

          {feedback && (
            <div className={`notification ${feedback.correct ? "is-success" : "is-danger"} is-light mt-4`}>
              <button className="delete" onClick={() => setFeedback(null)}></button>
              {feedback.message}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}