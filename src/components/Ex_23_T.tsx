import React, { useState } from 'react';

type Equation = {
  type: 'sin' | 'cos';
  value: string;
  solutions: string[]; // solutions exactes dans ]-π, π]
};

const possibleValues: Equation[] = [
  { type: 'sin', value: '0', solutions: ['0'] },
  { type: 'sin', value: '1/2', solutions: ['π/6', '5π/6'] },
  { type: 'sin', value: '√2/2', solutions: ['π/4', '3π/4'] },
  { type: 'sin', value: '√3/2', solutions: ['π/3', '2π/3'] },
  { type: 'sin', value: '1', solutions: ['π/2'] },
  { type: 'sin', value: '-1/2', solutions: ['-π/6', '-5π/6'] },
  { type: 'sin', value: '-√2/2', solutions: ['-π/4', '-3π/4'] },
  { type: 'sin', value: '-√3/2', solutions: ['-π/3', '-2π/3'] },
  { type: 'sin', value: '-1', solutions: ['-π/2'] },
  { type: 'cos', value: '0', solutions: ['-π/2', 'π/2'] },
  { type: 'cos', value: '1/2', solutions: ['-π/3', 'π/3'] },
  { type: 'cos', value: '√2/2', solutions: ['-π/4', 'π/4'] },
  { type: 'cos', value: '√3/2', solutions: ['-π/6', 'π/6'] },
  { type: 'cos', value: '1', solutions: ['0'] },
  { type: 'cos', value: '-1/2', solutions: ['2π/3', '-2π/3'] },
  { type: 'cos', value: '-√2/2', solutions: ['3π/4', '-3π/4'] },
  { type: 'cos', value: '-√3/2', solutions: ['5π/6', '-5π/6'] },
  { type: 'cos', value: '-1', solutions: ['π', '-π'] }, // on affichera uniquement π
];

// Mélange aléatoire
function getRandomEquation(): Equation {
  const eq = possibleValues[Math.floor(Math.random() * possibleValues.length)];
  const cleaned = {
    ...eq,
    solutions: eq.solutions.map((s) => (s === '-π' ? 'π' : s)), // unique forme
  };
  return cleaned;
}

export default function TrigoEquationExercise() {
  const [equation, setEquation] = useState<Equation>(getRandomEquation());
  const [userInput, setUserInput] = useState('');
  const [feedback, setFeedback] = useState<null | string>(null);
  const [showHelp, setShowHelp] = useState(false);

  function handleValidate() {
    const userSolutions = userInput
      .split(',')
      .map((s) => s.trim().replace(/\s/g, ''));

    const correctSet = new Set(equation.solutions);
    const userSet = new Set(userSolutions);

    const allCorrect = equation.solutions.every((sol) => userSet.has(sol));
    const noExtra = [...userSet].every((sol) => correctSet.has(sol));

    if (allCorrect && noExtra) {
      setFeedback('🎉 Bravo ! Toutes les solutions sont correctes !');
    } else {
      setFeedback(
        `❌ Certaines solutions sont incorrectes ou manquantes. Les bonnes réponses sont : ${equation.solutions.join(', ')}`
      );
    }
  }

  function handleNew() {
    setEquation(getRandomEquation());
    setUserInput('');
    setFeedback(null);
    setShowHelp(false);
  }

  return (
    <div className="columns is-centered mt-6">
      <div className="column is-half">
        <div className="box content">
          <h2 className="title is-4">Équation Trigonométrique dans ]-π, π]</h2>
          <p>
            Résolvez l’équation suivante dans l’intervalle{' '}
            <strong>]–π, π]</strong> :
          </p>
          <p className="has-text-centered my-4">
            <strong>{`${equation.type}(x) = ${equation.value}`}</strong>
          </p>

          <div className="field">
            <label className="label">Vos solutions (séparées par une virgule)</label>
            <div className="control">
              <input
                className="input"
                type="text"
                placeholder="Ex: π/3, -π/3"
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
                <li>1. Cherchez à quelle valeur remarquable correspond {equation.type}(x) = {equation.value}.</li>
                <li>2. Trouvez les solutions générales avec <code>x = a + 2kπ</code> ou <code>x = -a + 2kπ</code>.</li>
                <li>3. Déterminez quelles valeurs de k donnent des solutions dans ]–π, π].</li>
                <li>4. Écrivez les solutions exactes séparées par des virgules.</li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
