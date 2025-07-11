
import React, { useState } from 'react';

const angleValues = [
  { x: '0', sin: '0', cos: '1' },
  { x: 'π/6', sin: '1/2', cos: '√3/2' },
  { x: 'π/4', sin: '√2/2', cos: '√2/2' },
  { x: 'π/3', sin: '√3/2', cos: '1/2' },
  { x: 'π/2', sin: '1', cos: '0' },
  { x: 'π', sin: '0', cos: '-1' },
];

// Mélange aléatoire des lignes (pour éviter apprentissage pur par position)

function shuffleArray<T>(array: T[]): T[] {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

type TrigRow = {
  x: string;
  sin: string;
  cos: string;
};

export default function TrigTableExercise() {
  const [rows, setRows] = useState<TrigRow[]>(shuffleArray(angleValues));
  const [inputs, setInputs] = useState<{ [key: number]: { sin: string; cos: string } }>(
    Object.fromEntries(rows.map((_, i) => [i, { sin: '', cos: '' }]))
  );
  const [feedback, setFeedback] = useState<string | null>(null);
  const [showCorrection, setShowCorrection] = useState(false);

  function handleChange(rowIndex: number, field: 'sin' | 'cos', value: string) {
    setInputs((prev) => ({
      ...prev,
      [rowIndex]: {
        ...prev[rowIndex],
        [field]: value,
      },
    }));
  }

  function handleCheck() {
    let allCorrect = true;
    rows.forEach((row, i) => {
      const sinCorrect = inputs[i]?.sin.replace(/\s/g, '') === row.sin.replace(/\s/g, '');
      const cosCorrect = inputs[i]?.cos.replace(/\s/g, '') === row.cos.replace(/\s/g, '');
      if (!sinCorrect || !cosCorrect) allCorrect = false;
    });

    setFeedback(
      allCorrect
        ? '🎉 Bravo, toutes les valeurs sont correctes !'
        : '❌ Certaines valeurs sont incorrectes. Réessayez ou affichez la correction.'
    );
  }

  function handleNewExercise() {
    const newRows = shuffleArray(angleValues);
    setRows(newRows);
    setInputs(Object.fromEntries(newRows.map((_, i) => [i, { sin: '', cos: '' }])));
    setFeedback(null);
    setShowCorrection(false);
  }

  return (
    <div className="columns is-centered mt-6">
      <div className="column is-two-thirds">
        <div className="box content">
          <h2 className="title is-4">Tableau des Valeurs Remarquables (sin et cos)</h2>
          <p>Complétez les valeurs de sin(x) et cos(x) pour les valeurs remarquables de x :</p>

          <table className="table is-bordered is-striped is-fullwidth has-text-centered mt-4">
            <thead>
              <tr>
                <th>x</th>
                <th>sin(x)</th>
                <th>cos(x)</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr key={i}>
                  <td>{row.x}</td>
                  <td>
                    {showCorrection ? (
                      <strong>{row.sin}</strong>
                    ) : (
                      <input
                        className="input is-small"
                        value={inputs[i]?.sin || ''}
                        onChange={(e) => handleChange(i, 'sin', e.target.value)}
                        placeholder="Ex: 1/2"
                      />
                    )}
                  </td>
                  <td>
                    {showCorrection ? (
                      <strong>{row.cos}</strong>
                    ) : (
                      <input
                        className="input is-small"
                        value={inputs[i]?.cos || ''}
                        onChange={(e) => handleChange(i, 'cos', e.target.value)}
                        placeholder="Ex: √3/2"
                      />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="buttons is-centered mt-4">
            {!showCorrection && (
              <button className="button is-primary" onClick={handleCheck}>
                Vérifier mes réponses
              </button>
            )}
            {!showCorrection && (
              <button className="button is-light" onClick={() => setShowCorrection(true)}>
                Afficher la correction
              </button>
            )}
            <button className="button is-link is-light" onClick={handleNewExercise}>
              Nouvel exercice
            </button>
          </div>

          {feedback && (
            <div className={`notification mt-4 ${feedback.includes('❌') ? 'is-danger' : 'is-success'}`}>
              {feedback}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
