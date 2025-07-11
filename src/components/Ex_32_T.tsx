import React, { useState } from 'react';
import MathTex from '@/components/MathTex';

const functions = [
  {
    id: 'ln',
    tex: 'f(x) = \\ln(x)',
    deriv: 'f\'(x) = \\frac{1}{x}',
    value: 'f(1) = 0',
    growth: 'f est strictement croissante sur ]0 ; +\\infty[',
    answer: 'ln(x)'
  },
  {
    id: 'exp',
    tex: 'f(x) = e^x',
    deriv: "f'(x) = e^x",
    value: 'f(0) = 1',
    growth: 'f est strictement croissante sur R',
    answer: 'e^x'
  },
  {
    id: 'inv',
    tex: 'f(x) = 1/x',
    deriv: "f'(x) = -1/x^2",
    value: 'f(1) = 1',
    growth: 'f est strictement décroissante sur ]0 ; +\\infty[',
    answer: '1/x'
  },
  {
    id: 'sqrt',
    tex: 'f(x) = \\sqrt{x}',
    deriv: "f'(x) = 1/(2\\sqrt{x})",
    value: 'f(4) = 2',
    growth: 'f est strictement croissante sur [0 ; +\\infty[',
    answer: 'sqrt(x)'
  },
  {
    id: 'cos',
    tex: 'f(x) = \\cos(x)',
    deriv: "f'(x) = -\\sin(x)",
    value: 'f(0) = 1',
    growth: 'f est périodique de période 2\\pi',
    answer: 'cos(x)'
  },
  {
    id: 'sin',
    tex: 'f(x) = \\sin(x)',
    deriv: "f'(x) = \\cos(x)",
    value: 'f(0) = 0',
    growth: 'f est périodique de période 2\\pi',
    answer: 'sin(x)'
  }
];

function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

export default function IdentifyFunction() {
  const [problem, setProblem] = useState(pickRandom(functions));
  const [userAnswer, setUserAnswer] = useState('');
  const [showCorrection, setShowCorrection] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  const checkAnswer = () => {
    const cleaned = userAnswer.replace(/\s+/g, '').toLowerCase();
    if (cleaned === problem.answer.replace(/\s+/g, '').toLowerCase()) {
      setFeedback('✅ Bonne réponse, Maître.');
    } else {
      setFeedback(`❌ Non Maître. Il fallait \(${problem.tex}\)`);
    }
    setShowCorrection(true);
  };

  const newExercise = () => {
    setProblem(pickRandom(functions));
    setUserAnswer('');
    setFeedback(null);
    setShowCorrection(false);
  };

  return (
    <div className="columns is-centered mt-6">
      <div className="column is-10">
        <div className="box content">
          <h2 className="title is-4">Reconnaissance d'une fonction usuelle</h2>
          <p>
            On considère une fonction <strong>f</strong> telle que :
          </p>
          <ul>
            <li><MathTex tex={problem.deriv} /></li>
            <li><MathTex tex={problem.value} /></li>
            <li>{problem.growth}</li>
          </ul>
          <p>Déterminez l'expression de la fonction <strong>f</strong>(x).</p>

          <div className="field mt-4">
            <input
              type="text"
              className="input"
              placeholder="Ex: ln(x), e^x, 1/x..."
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
            />
          </div>

          <div className="buttons mt-3">
            <button className="button is-primary" onClick={checkAnswer}>Valider</button>
            <button className="button is-light" onClick={newExercise}>Nouvel exercice</button>
          </div>

          {feedback && (
            <div className="notification is-info mt-4">
              {feedback.includes('\\') ? <MathTex tex={feedback} /> : <p>{feedback}</p>}
            </div>
          )}

          {showCorrection && (
            <div className="mt-4">
              <h3 className="title is-5">Correction</h3>
              <p>La fonction était <MathTex tex={problem.tex} /></p>
              <ul>
                <li><strong>Dérivée :</strong> <MathTex tex={problem.deriv} /></li>
                <li><strong>Valeur :</strong> <MathTex tex={problem.value} /></li>
                <li><strong>Variation :</strong> {problem.growth}</li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
