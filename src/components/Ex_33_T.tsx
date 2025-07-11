import React, { useState } from 'react';
import MathTex from '@/components/MathTex';

const primitives = [
  {
    id: 'x3+1/x',
    tex: 'f(x) = x^3 + \\dfrac{1}{x}',
    domain: ']0 ; +\\infty[',
    answer: '\\dfrac{1}{4}x^4 + \\ln(x)',
    method: 'On intègre terme à terme : $\\int x^3 dx = \\dfrac{1}{4}x^4$, $\\int \\dfrac{1}{x} dx = \\ln(x)$',
  },
  {
    id: 'invcarre',
    tex: 'f(x) = \\dfrac{1}{x^2}',
    domain: ']0 ; +\\infty[',
    answer: '-\\dfrac{1}{x}',
    method: "On reconnaît la forme $x^{-2}$ donc la primitive est $\\dfrac{x^{-1}}{-1} = -\\dfrac{1}{x}$",
  },
  {
    id: '2x+1/(x^2+x+5)^3',
    tex: 'f(x) = \\dfrac{2x + 1}{(x^2 + x + 5)^3}',
    domain: '\\mathbb{R}',
    answer: '-\\dfrac{1}{2(x^2 + x + 5)^2}',
    method: 'On pose $u = x^2 + x + 5$ donc $f(x) = \\dfrac{u\'}{u^3}$. La primitive est $\\dfrac{u^{-2}}{-2}$.',
  },
];

function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

export default function PrimitiveRecognizer() {
  const [exercise, setExercise] = useState(pickRandom(primitives));
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState<string | null>(null);
  const [showCorrection, setShowCorrection] = useState(false);

  const checkAnswer = () => {
    const cleaned = userAnswer.replace(/\s+/g, '').toLowerCase();
    const correct = exercise.answer.replace(/\s+/g, '').toLowerCase();
    if (cleaned === correct) {
      setFeedback('✅ Très bonne réponse, Maître.');
    } else {
      setFeedback(`❌ Hélas non, Maître. Il fallait : \\(${exercise.answer}\\)`);
    }
    setShowCorrection(true);
  };

  const newExercise = () => {
    setExercise(pickRandom(primitives));
    setUserAnswer('');
    setFeedback(null);
    setShowCorrection(false);
  };

  return (
    <div className="columns is-centered mt-6">
      <div className="column is-10">
        <div className="box content">
          <h2 className="title is-4">Déterminer une primitive</h2>
          <p>Soit une fonction définie sur <MathTex tex={exercise.domain} /> :</p>
          <p><strong><MathTex tex={exercise.tex} /></strong></p>
          <p>Proposez une primitive <strong>F(x)</strong> de cette fonction :</p>

          <div className="field mt-4">
            <input
              type="text"
              className="input"
              placeholder="Ex: 1/4 x^4 + ln(x)"
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
              <MathTex tex={feedback} />
            </div>
          )}

          {showCorrection && (
            <div className="mt-4">
              <h3 className="title is-5">Correction</h3>
              <p>Une primitive est : <MathTex tex={exercise.answer} /></p>
              <p><strong>Méthode :</strong></p>
              <p><MathTex tex={exercise.method} /></p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
