import React, { useState } from 'react';
import MathTex from '@/components/MathTex';

type Coeffs = { a: number; b: number; c: number; };

function getRandomInt(min: number, max: number, avoidZero = false): number {
  let n = Math.floor(Math.random() * (max - min + 1)) + min;
  if (avoidZero && n === 0) return getRandomInt(min, max, true);
  return n;
}

function generateEquation(): Coeffs {
  const a = getRandomInt(1, 5, true);
  const b = getRandomInt(-5, 5, true);
  const c = getRandomInt(-5, 5);
  return { a, b, c };
}

function buildEquation({ a, b, c }: Coeffs): string {
  const bTerm = b === 1 ? 'y' : b === -1 ? '-y' : `${b}y`;
  const cTerm = c === 0 ? '' : (c > 0 ? ` + ${c}` : ` - ${-c}`);
  return `${a}y' = ${bTerm}${cTerm}`;
}

function solveEquation({ a, b, c }: Coeffs): string {
  const ratio = b / a;
  const homogeneous = `Ce^{${ratio}x}`;
  if (c === 0) return `y(x) = ${homogeneous}`;
  const constant = (-c / b).toFixed(2).replace('.00', '');
  return `y(x) = ${homogeneous} + ${constant}`;
}

function explanation({ a, b, c }: Coeffs): string {
  const ratio = b / a;
  let text = `On écrit l’équation sous forme canonique : $y' - \\frac{${b}}{${a}}y = \\frac{${c}}{${a}}$.\\\\`;
  text += `C’est une équation différentielle linéaire du 1er ordre.\\\\`;
  text += `La solution générale est : $y(x) = Ce^{${ratio}x}`;
  if (c !== 0) {
    const constant = (-c / b).toFixed(2).replace('.00', '');
    text += ` + ${constant}`;
  }
  text += `$.`;
  return text;
}

export default function EDL1Recognizer() {
  const [coeffs, setCoeffs] = useState(generateEquation());
  const [userAnswer, setUserAnswer] = useState('');
  const [feedback, setFeedback] = useState<string | null>(null);
  const [showCorrection, setShowCorrection] = useState(false);

  const checkAnswer = () => {
    const expected = solveEquation(coeffs).replace(/\s+/g, '').toLowerCase();
    const cleaned = userAnswer.replace(/\s+/g, '').toLowerCase();
    const isCorrect = cleaned.includes('e') && cleaned.includes('x') && cleaned.includes('c');

    if (cleaned === expected) {
      setFeedback('✅ Réponse exacte, Maître.');
    } else if (isCorrect) {
      setFeedback("🟡 C'est une forme acceptable, Maître. Mais la simplification pourrait être améliorée.");
    } else {
      setFeedback(`❌ Hélas, Maître. Une solution correcte est : \\(${solveEquation(coeffs)}\\)`);
    }

    setShowCorrection(true);
  };

  const newExercise = () => {
    setCoeffs(generateEquation());
    setUserAnswer('');
    setFeedback(null);
    setShowCorrection(false);
  };

  return (
    <div className="columns is-centered mt-6">
      <div className="column is-10">
        <div className="box content">
          <h2 className="title is-4">Équation différentielle du 1er ordre</h2>
          <p>Résolvez l'équation suivante :</p>
          <p><strong><MathTex tex={buildEquation(coeffs)} /></strong></p>

          <div className="field mt-4">
            <input
              type="text"
              className="input"
              placeholder="Ex: Ce^{2x} - 3"
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
              <p><strong>Solution générale :</strong></p>
              <MathTex tex={solveEquation(coeffs)} />
              <p><strong>Justification :</strong></p>
              <MathTex tex={explanation(coeffs)} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
