import React, { useState } from "react";

// For this exercise, we will prove by recurrence that for all n >= 0,
// the sum of integers from 0 to n is n(n+1)/2.
// The property to prove is P(n): sum_{i=0 to n} i = n(n+1)/2.

export default function RaisonnementParRecurrence() {
  // State for user inputs
  const [initialisationValue, setInitialisationValue] = useState("");
  const [herediteStep1, setHerediteStep1] = useState("");
  const [herediteStep2, setHerediteStep2] = useState("");

  // State for feedback
  const [feedback, setFeedback] = useState<null | { correct: boolean; message: React.ReactNode }>(null);

  // Correct answers
  const correctInitialisation = "0";
  const correctHerediteStep1 = "k(k+1)/2";
  const correctHerediteStep2 = "k+1";

  function handleValidate() {
    const isInitialisationCorrect = initialisationValue.replace(/\s/g, "") === correctInitialisation;
    const isHerediteStep1Correct = herediteStep1.replace(/\s/g, "").includes(correctHerediteStep1);
    const isHerediteStep2Correct = herediteStep2.replace(/\s/g, "") === correctHerediteStep2;

    if (isInitialisationCorrect && isHerediteStep1Correct && isHerediteStep2Correct) {
      setFeedback({ correct: true, message: <p>🎉 Bravo Maître, votre raisonnement est parfait !</p> });
    } else {
      let errorMessages = [];
      if (!isInitialisationCorrect) {
        errorMessages.push(<p>❌ L'initialisation est incorrecte. Pour n=0, la somme est 0.</p>);
      }
      if (!isHerediteStep1Correct || !isHerediteStep2Correct) {
         errorMessages.push(<p>❌ L'hérédité contient une erreur. Vérifiez vos calculs.</p>);
         errorMessages.push(<p>Indice : Somme(k+1) = Somme(k) + (k+1) = k(k+1)/2 + (k+1)</p>);
      }
      setFeedback({
        correct: false,
        message: <div>{errorMessages}</div>,
      });
    }
  }

  function handleNewExercise() {
    setInitialisationValue("");
    setHerediteStep1("");
    setHerediteStep2("");
    setFeedback(null);
  }

  return (
    <div className="columns is-centered mt-6">
      <div className="column is-two-thirds">
        <div className="box content">
          <h2 className="title is-4">Raisonnement par Récurrence</h2>
          <p>
            On souhaite démontrer par récurrence la propriété suivante, pour tout entier naturel n ≥ 0 :
          </p>
          <p className="has-text-centered has-text-weight-bold">
            P(n) : 0 + 1 + 2 + ... + n = n(n+1)/2
          </p>

          <hr />

          <h3 className="title is-5">Étape 1 : Initialisation</h3>
          <p>On vérifie que la propriété est vraie pour le premier rang, ici n=0.</p>
          <p>Pour n=0, la somme des entiers de 0 à 0 est :</p>
          <div className="field">
            <div className="control">
              <input
                className="input"
                type="text"
                placeholder="Valeur de la somme"
                value={initialisationValue}
                onChange={(e) => setInitialisationValue(e.target.value)}
              />
            </div>
          </div>
          <p>Et n(n+1)/2 = 0(0+1)/2 = 0. Donc P(0) est vraie.</p>

          <hr />

          <h3 className="title is-5">Étape 2 : Hérédité</h3>
          <p>
            On suppose que P(k) est vraie pour un certain entier k ≥ 0 (Hypothèse de récurrence).
          </p>
          <p>On veut démontrer P(k+1), c'est-à-dire : <strong>0 + 1 + ... + k + (k+1) = (k+1)(k+2)/2</strong></p>
          <p>Complétez le raisonnement :</p>
          <p>0 + 1 + ... + k + (k+1) = (0 + 1 + ... + k) + (k+1)</p>
          <div className="field is-grouped">
            <p className="control is-expanded">= <input
                className="input"
                type="text"
                placeholder="Utiliser l'hypothèse"
                value={herediteStep1}
                onChange={(e) => setHerediteStep1(e.target.value)}
              />
            </p>
            <p className="control"> + </p>
            <p className="control is-expanded"><input
                className="input"
                type="text"
                placeholder="Terme suivant"
                value={herediteStep2}
                onChange={(e) => setHerediteStep2(e.target.value)}
              />
            </p>
          </div>
          <p>Ensuite, on met (k+1) en facteur : (k+1) * (k/2 + 1) = (k+1) * ((k+2)/2) = <strong>(k+1)(k+2)/2</strong></p>
          <p>On a bien démontré P(k+1).</p>

          <hr />

          <h3 className="title is-5">Étape 3 : Conclusion</h3>
          <p>
            P(n) est initialisée pour n=0 et est héréditaire. Donc, par le principe de récurrence, la propriété P(n) est vraie pour tout entier naturel n ≥ 0.
          </p>

          <div className="field is-grouped is-grouped-centered mt-5">
            <div className="control">
              <button className="button is-primary" onClick={handleValidate}>
                Valider
              </button>
            </div>
            <div className="control">
              <button className="button is-light" onClick={handleNewExercise}>
                Recommencer
              </button>
            </div>
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
