import React, { useState } from 'react';
import MathTex from '@/components/MathTex';

function getRandomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function computeIntegral(m: number, p: number, a: number, b: number): number {
  const primitive = (x: number) => (m / 2) * x ** 2 + p * x;
  return primitive(b) - primitive(a);
}

export default function AdvancedIntegralExercise() {
  const generateProblem = () => {
    const m = getRandomInt(1, 5);
    const p = getRandomInt(-4, 4);
    const a = getRandomInt(0, 4);
    const b = getRandomInt(a + 1, a + 5);
    const result = computeIntegral(m, p, a, b);
    return { m, p, a, b, result };
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
      setFeedback(`❌ Non Maître. Le résultat exact est ${problem.result.toFixed(2)}`);
    }
    setShowCorrection(true);
  };

  const newExercise = () => {
    setProblem(generateProblem());
    setUserAnswer('');
    setFeedback(null);
    setShowCorrection(false);
  };

  const { m, p, a, b, result } = problem;
  const functionTex = `${m}x${p >= 0 ? `+${p}` : p}`;

  return (
    <div className="box">
      <h2 className="title is-4">Intégrale définie (fonction affine)</h2>
      <p>Calculez l'intégrale suivante :</p>
      <MathTex tex={`\\int_{${a}}^{${b}} (${functionTex}) \\, dx`} />

      <div className="field mt-4">
        <input
          type="text"
          className="input"
          placeholder="Votre réponse (ex: 17.5)"
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
          <p>On pose \( f(x) = ${m}x ${p >= 0 ? '+' : ''}${p} \)</p>
          <p>Une primitive de \( f \) est :
            <MathTex tex={`F(x) = \\frac{${m}}{2}x^2 + ${p}x`} />
          </p>
          <p>Donc :</p>
          <MathTex tex={`\\int_{${a}}^{${b}} (${functionTex}) \\, dx = F(${b}) - F(${a})`} />
          <p>
            <MathTex tex={`= \\left(\\frac{${m}}{2} \\times ${b}^2 + ${p} \\times ${b}\\right) - \\left(\\frac{${m}}{2} \\times ${a}^2 + ${p} \\times ${a}\\right) = ${result.toFixed(2)}`} />
          </p>
        </div>
      )}
    </div>
  );
}
