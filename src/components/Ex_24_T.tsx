import React, { useState } from 'react';

// Liste de valeurs remarquables et leurs intervalles de solution
const inequations = [
  {
    type: 'sin',
    operator: '<',
    value: '1/2',
    solution: ']-π, -5π/6[ ∪ ]-π/6, π[',
  },
  {
    type: 'sin',
    operator: '>',
    value: '1/2',
    solution: ']π/6, 5π/6[',
  },
  {
    type: 'cos',
    operator: '<',
    value: '1/2',
    solution: ']2π/3, π] ∪ ]-π, -2π/3[',
  },
  {
    type: 'cos',
    operator: '>',
    value: '1/2',
    solution: ']–π/3, π/3[',
  },
  {
    type: 'cos',
    operator: '<',
    value: '√2/2',
    solution: ']3π/4, π] ∪ ]-π, -3π/4[',
  },
  {
    type: 'cos',
    operator: '>',
    value: '√2/2',
    solution: ']–π/4, π/4[',
  },
  {
    type: 'sin',
    operator: '>',
    value: '√2/2',
    solution: ']π/4, 3π/4[',
  },
  {
    type: 'sin',
    operator: '<',
    value: '√2/2',
    solution: ']–π, π/4[ ∪ ]3π/4, π[',
  },
];

// Génère une inéquation aléatoire
function getRandomInequation() {
  const random = inequations[Math.floor(Math.random() * inequations.length)];
  return random;
}

export default function TrigoInequationExercise() {
  const [ineq, setIneq] = useState(getRandomInequation());
  const [userInput, setUserInput] = useState('');
  const [feedback, setFeedback] = useState<null | string>(null);
  const [showHelp, setShowHelp] = useState(false);

  function handleValidate() {
    const normalized = userInput.replace(/\s/g, '').replace(/\]/g, ']').replace(/\[/g, '[');
    const correct = ineq.solution.replace(/\s/g, '');

    if (normalized === correct) {
      setFeedback('🎯 Bravo ! C’est exact.');
    } else {
      setFeedback(`❌ Ce n’est pas tout à fait juste. La bonne réponse est : ${ineq.solution}`);
    }
  }

  function handleNew() {
    setIneq(getRandomInequation());
    setUserInput('');
    setFeedback(null);
    setShowHelp(false);
  }

  return (
    <div className="columns is-centered mt-6">
      <div className="column is-half">
        <div className="box content">
          <h2 className="title is-4">Inéquation Trigonométrique dans ]–π, π]</h2>
          <p>
            Résolvez l’inéquation suivante dans l’intervalle <strong>]–π, π]</strong> :
          </p>
          <p className="has-text-centered my-4">
            <strong>{`${ineq.type}(x) ${ineq.operator} ${ineq.value}`}</strong>
          </p>

          <div className="field">
            <label className="label">Votre réponse (intervalle en notation mathématique)</label>
            <div className="control">
              <input
                className="input"
                type="text"
                placeholder="Ex: ]–π/3, π/3["
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
              />
            </div>
          </div>

          <div className="buttons is-centered mt-4">
            <button className="button is-primary" onClick={handleValidate}>
              Valider
            </button>
            <button className="button is-light" onClick={handleNew}>
              Nouvel exercice
            </button>
            <button className="button is-info is-light" onClick={() => setShowHelp(true)}>
              Voir les conseils
            </button>
          </div>

          {feedback && (
            <div className={`notification mt-4 ${feedback.includes('❌') ? 'is-danger' : 'is-success'}`}>
              {feedback}
            </div>
          )}

          {showHelp && (
            <div className="notification is-info mt-4">
              <p><strong>Conseils :</strong></p>
              <ul>
                <li>1. Repérez à quelle valeur remarquable correspond <code>{ineq.value}</code>.</li>
                <li>2. Identifiez les zones où la fonction est strictement <strong>{ineq.operator === '>' ? 'au-dessus' : 'en-dessous'}</strong> de cette valeur.</li>
                <li>3. Utilisez le cercle trigonométrique pour visualiser l’intervalle.</li>
                <li>4. Exprimez la réponse en union d’intervalles dans <strong>]–π, π]</strong>.</li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
