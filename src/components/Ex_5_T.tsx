import React, { useState } from 'react';

// Function to generate a random integer between min and max (inclusive)
function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Function to generate a simple function and its derivative
function generateFunction() {
  const a = randomInt(2, 10);
  const b = randomInt(2, 5); // power

  const funcString = `${a}x^${b}`;
  const derivativeString = `${a * b}x^${b - 1}`;
  
  return {
    func: funcString,
    derivative: derivativeString,
  };
}

export default function DerivativeExercice() {
  const [problem, setProblem] = useState(generateFunction());
  const [userInput, setUserInput] = useState('');
  const [feedback, setFeedback] = useState<null | { correct: boolean; message: React.ReactNode }>(null);

  function handleValidate() {
    // Normalize both user input and correct answer
    const normalizedUser = userInput.replace(/\s+|\*/g, '').toLowerCase();
    const normalizedCorrect = problem.derivative.replace(/\s+|\*/g, '').toLowerCase();

    if (normalizedUser === normalizedCorrect) {
      setFeedback({ correct: true, message: <p>🎉 Excellent! C'est la bonne dérivée.</p> });
    } else {
      setFeedback({
        correct: false,
        message: (
          <div>
            <p>❌ Ce n'est pas tout à fait ça. Essayez encore !</p>
            <p>Rappel : La dérivée de <strong>ax^n</strong> est <strong>anx^(n-1)</strong>.</p>
            <p>La bonne réponse est : <strong>{problem.derivative}</strong></p>
          </div>
        ),
      });
    }
  }

  function handleNewExercise() {
    setProblem(generateFunction());
    setUserInput('');
    setFeedback(null);
  }

  return (
    <div className="columns is-centered mt-6">
      <div className="column is-two-thirds">
        <div className="box content">
          <h2 className="title is-4">Exercice de Dérivation</h2>
          <p>Trouvez la fonction dérivée de la fonction suivante :</p>
          <p className="has-text-centered has-text-weight-bold">
            f(x) = {problem.func}
          </p>

          <div className="field">
            <label htmlFor="userInput" className="label">
              f'(x) =
            </label>
            <div className="control">
              <input
                id="userInput"
                className="input"
                type="text"
                placeholder="Ex: 4x^3"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
              />
            </div>
          </div>

          <div className="field is-grouped is-grouped-centered">
            <div className="control">
              <button className="button is-primary" onClick={handleValidate}>
                Valider
              </button>
            </div>
            <div className="control">
              <button className="button is-light" onClick={handleNewExercise}>
                Nouvel exercice
              </button>
            </div>
          </div>

          {feedback && (
            <div className={`notification ${feedback.correct ? 'is-success' : 'is-danger'} is-light mt-4`}>
              <button className="delete" onClick={() => setFeedback(null)}></button>
              {feedback.message}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
