import React, { useState } from 'react';
import { simplify, derivative } from 'mathjs';
import MathTex from './MathTex.tsx';

const randomNumber = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

const edTypes = [
  {
    type: "y' = f(x)",
    generate: () => {
      const f = 'cos(x)';
      return { equation: `y' = ${f}`, solution: 'sin(x) + C' };
    }
  },
  {
    type: "y' = a*y",
    generate: () => {
      const a = randomNumber(1, 4);
      return { equation: `y' = ${a}y`, solution: `Ce^{${a}x}` };
    }
  },
  {
    type: "y' = a*y + b",
    generate: () => {
      const a = randomNumber(1, 3);
      const b = randomNumber(1, 5);
      return {
        equation: `y' = ${a}y + ${b}`,
        solution: `Ce^{${a}x} - ${b}/${a}`
      };
    }
  },
  {
    type: "y' = a*y + f(x)",
    generate: () => {
      const a = 1;
      const f = 'x';
      return {
        equation: `y' = ${a}y + ${f}`,
        solution: 'Ce^{x} - x - 1'
      };
    }
  }
];

const normalizeMath = (expression: string) =>
  expression
    .replace(/\s+/g, '')
    .replace(/\*\*/g, '^')
    .replace(/\*/g, '')
    .replace(/\+C$/i, '')
    .replace(/^-/g, 'neg')
    .toLowerCase();

const expressionsEquivalent = (a: string, b: string) => {
  const normalize = (expr: string) =>
    normalizeMath(expr)
      .replace(/([a-z0-9])([a-z])/gi, '$1*$2');
  return normalize(a) === normalize(b);
};

const generateRandomED = (validated: boolean[]) => {
  const remaining = edTypes
    .map((_, i) => i)
    .filter(i => !validated[i]);
  const index = remaining[Math.floor(Math.random() * remaining.length)];
  return {
    index,
    ...edTypes[index].generate()
  };
};

const EquationDifferentiale: React.FC = () => {
  const [validated, setValidated] = useState<boolean[]>(Array(edTypes.length).fill(false));
  const [current, setCurrent] = useState(() => generateRandomED(validated));
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState<string | null>(null);

  const estSolutionED = (reponse: string, ed: string) => {
    try {
      const derivée = simplify(derivative(reponse, 'x'));
      const partieDroite = ed.split('=')[1];
      return derivée.equals(simplify(partieDroite));
    } catch (e) {
      console.error('Erreur dans la dérivation', e);
      return false;
    }
  };

  const handleSubmit = () => {
    if (estSolutionED(userAnswer, current.equation)) {
      const updated = [...validated];
      updated[current.index] = true;
      setValidated(updated);

      if (updated.every(v => v)) {
        setFeedback("🎉 Bravo Maître, toutes les équations différentielles sont résolues !");
      } else {
        setFeedback("✅ Juste, Maître !");
        setCurrent(generateRandomED(updated));
      }
    } else {
      setFeedback(`❌ Non Maître. Une solution possible était \\(${current.solution}\\)`);
    }
    setUserAnswer('');
  };

  return (
    <div style={{ maxWidth: 600, margin: 'auto', padding: '1rem' }}>
      <h3>📘 Résolvez l'équation différentielle :</h3>
      <MathTex tex={current.equation} />

      <input
        type="text"
        value={userAnswer}
        onChange={(e) => setUserAnswer(e.target.value)}
        placeholder="Entrez la solution y(x)"
        style={{
          padding: '0.5rem',
          fontSize: '1rem',
          width: '100%',
          margin: '1rem 0',
        }}
      />

      {userAnswer && (
        <div>
          <strong>Prévisualisation :</strong>
          <MathTex tex={userAnswer} />
        </div>
      )}

      <button
        onClick={handleSubmit}
        style={{
          backgroundColor: '#2196f3',
          color: 'white',
          border: 'none',
          padding: '0.5rem 1rem',
          fontSize: '1rem',
          cursor: 'pointer',
          borderRadius: '0.5rem',
        }}
      >
        Valider
      </button>

      {feedback && (
        <div style={{ marginTop: '1rem' }}>
          <p>{feedback.includes('\\') ? <MathTex tex={feedback} /> : feedback}</p>
        </div>
      )}
    </div>
  );
};

export default EquationDifferentiale;
