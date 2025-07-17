import React, { useState } from 'react';
import MathTex from '@/components/MathTex';

function getRandomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateProblem() {
  const a = getRandomInt(0, 2);
  const b = getRandomInt(3, 5);
  const k = getRandomInt(1, 4);
  return { a, b, k };
}

function computeExact(a: number, b: number, k: number): string {
  const F = (x: number) => (1 / k ** 2) * (k * x - 1) * Math.exp(k * x);
  const val = F(b) - F(a);
  return val.toFixed(3);
}

export default function IntegrationByPartsExercise() {
  const [problem, setProblem] = useState(generateProblem());
  const [userAnswer, setUserAnswer] = useState('');
  const [showCorrection, setShowCorrection] = useState(false);
  const [feedback, setFeedback] = useState('');

  const handleCheck = () => {
    setShowCorrection(true);
    const expected = computeExact(problem.a, problem.b, problem.k);
    const given = parseFloat(userAnswer.replace(',', '.')).toFixed(3);
    if (given === expected) {
      setFeedback("✅ Exact, Maître. Vous dominez l'intégration par parties.");
    } else {
      setFeedback(`❌ Faux, Maître. Il fallait environ ${expected}`);
    }
  };

  const handleNew = () => {
    setProblem(generateProblem());
    setUserAnswer('');
    setShowCorrection(false);
    setFeedback('');
  };

  const { a, b, k } = problem;

  return (
    <div className="box content">
      <h2 className="title is-4">Intégration par parties</h2>
      <p>Soit l'intégrale suivante :</p>
      <MathTex tex={`\\int_{${a}}^{${b}} x \\cdot e^{${k}x} \\, dx`} />

      <div className="field mt-4">
        <label className="label">Votre réponse (valeur approchée à 10⁻³ près)</label>
        <input
          type="text"
          className="input"
          placeholder="Ex: 12.345"
          value={userAnswer}
          onChange={(e) => setUserAnswer(e.target.value)}
        />
      </div>

      <div className="buttons mt-3">
        <button className="button is-primary" onClick={handleCheck}>
          Valider
        </button>
        <button className="button is-light" onClick={handleNew}>
          Nouvel exercice
        </button>
      </div>

      {showCorrection && (
        <>
          <div className="notification is-info mt-4">
            <p>{feedback}</p>
          </div>
          <h3 className="title is-5">Correction</h3>
          <p>On pose :</p>
          <ul>
            <li><MathTex tex={`u(x) = x \\Rightarrow u'(x) = 1`} /></li>
            <li><MathTex tex={`v'(x) = e^{${k}x} \\Rightarrow v(x) = \\frac{1}{${k}} e^{${k}x}`} /></li>
          </ul>
          <p>Alors :</p>
          <MathTex tex={`\\int x \\cdot e^{${k}x} dx = \\frac{x}{${k}} e^{${k}x} - \\int \\frac{1}{${k}} e^{${k}x} dx = \\frac{x}{${k}} e^{${k}x} - \\frac{1}{${k}^2} e^{${k}x} + C`} />
          <p>Donc :</p>
          <MathTex tex={`\\int_{${a}}^{${b}} x e^{${k}x} dx = \\left[ \\frac{1}{${k}^2} ( ${k}x - 1 ) e^{${k}x} \\right]_{${a}}^{${b}}`} />
          <p>Valeur approchée : <strong>{computeExact(a, b, k)}</strong></p>
        </>
      )}
    </div>
  );
}
