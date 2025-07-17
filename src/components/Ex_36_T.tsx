import React, { useState } from 'react';
import MathTex from '@/components/MathTex';

function getRandomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function computeIntegral(a: number, b: number): number {
  return (1 / 2) * (b ** 2 - a ** 2);
}

export default function DefiniteIntegralExercise() {
  const generateProblem = () => {
    const a = getRandomInt(0, 5);
    const b = getRandomInt(a + 1, a + 6); // garantit que b > a
    const result = computeIntegral(a, b);
    return { a, b, result };
  };

  const [problem, setProblem] = useState(generateProblem());
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState<string | null>(null);
  const [showCorrection, setShowCorrection] = useState(false);

  const checkAnswer = () => {
    const parsed = parseFloat(userAnswer.replace(',', '.'));
    const epsilon = 0.01;
    if (Math.abs(parsed - problem.result) < epsilon) {
      setFeedback('✅ Bonne réponse, Maître.');
    } else {
      setFeedback(`❌ Le résultat exact est ${problem.result.toFixed(2)}`);
    }
    setShowCorrection(true);
  };

  const newExercise = () => {
    setProblem(generateProblem());
    setUserAnswer('');
    setFeedback(null);
    setShowCorrection(false);
  };

  return (
    <div className="box">
      <h2 className="title is-4">Calcul d’une intégrale définie</h2>
      <p>Calculez l'intégrale suivante :</p>
      <MathTex tex={`\\int_{${problem.a}}^{${problem.b}} x \\, dx`} />

      <div className="field mt-4">
        <input
          type="text"
          className="input"
          placeholder="Votre réponse (ex: 12.5)"
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
          <p>{feedback}</p>
        </div>
      )}

      {showCorrection && (
        <div className="mt-4">
          <h3 className="title is-5">Correction</h3>
          <p>
            On utilise la formule : <MathTex tex="\int_a^b x\,dx = \frac{1}{2}(b^2 - a^2)" />
          </p>
          <p>
            Ici, <MathTex tex={`a = ${problem.a}, \\quad b = ${problem.b}`} />
          </p>
          <p>
            Donc&nbsp;: <MathTex tex={`\\int_{${problem.a}}^{${problem.b}} x \\, dx = \\frac{1}{2}(${problem.b}^2 - ${problem.a}^2) = ${problem.result.toFixed(2)}`} />
          </p>
        </div>
      )}
    </div>
  );
}
