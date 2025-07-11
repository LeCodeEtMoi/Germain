import React, { useState } from 'react';

// Génère un entier aléatoire entre min et max inclus
function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Génère les deux fonctions f1 et f2
function generatePiecewiseFunction() {
  const a = randomInt(1, 5);
  const b = randomInt(1, 5);
  const c = randomInt(1, 5);
  const d = randomInt(1, 5);

  const f1 = `${a}x^2 + ${b}`;
  const f2 = `${c}x + ${d}`;

  const f1_derivative = `${2 * a}x`;
  const f2_derivative = `${c}`;

  const f1_at1 = a * 1 ** 2 + b;
  const f2_at1 = c * 1 + d;

  const f1_prime_at1 = 2 * a * 1;
  const f2_prime_at1 = c;

  const isContinuous = f1_at1 === f2_at1;
  const isDerivable = isContinuous && f1_prime_at1 === f2_prime_at1;

  return {
    a, b, c, d,
    f1, f2,
    f1_derivative,
    f2_derivative,
    f1_at1,
    f2_at1,
    f1_prime_at1,
    f2_prime_at1,
    isContinuous,
    isDerivable
  };
}

export default function ContinuityExercise() {
  const [problem, setProblem] = useState(generatePiecewiseFunction());
  const [step, setStep] = useState(0);
  const [feedback, setFeedback] = useState<string | null>(null);

  function handleCheckContinuity(answer: string) {
    const correct = problem.isContinuous ? 'oui' : 'non';
    if (answer.toLowerCase() === correct) {
      setFeedback("✅ Bonne réponse ! Passons à l'étude des dérivées.");
      setStep(1);
    } else {
      setFeedback(`❌ Mauvaise réponse. La fonction est ${correct === 'oui' ? 'continue' : 'non continue'} en x = 1.`);
    }
  }

  function handleNextExercise() {
    setProblem(generatePiecewiseFunction());
    setStep(0);
    setFeedback(null);
  }

  return (
    <div className="columns is-centered mt-6">
      <div className="column is-two-thirds">
        <div className="box content">
          <h2 className="title is-4">Continuité en un point</h2>
          <p>Soit la fonction définie par morceaux :</p>
          <pre>
            f(x) = {"{"} {`  
              ${problem.f1} si x ≤ 1  
              ${problem.f2} si x > 1  
            `}{"}"}
          </pre>

          {step === 0 && (
            <>
              <p>La fonction f est-elle continue en x = 1 ? (oui / non)</p>
              <input
                className="input"
                type="text"
                placeholder="oui ou non"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleCheckContinuity((e.target as HTMLInputElement).value);
                }}
              />
            </>
          )}

          {step === 1 && (
            <>
              <h3 className="title is-5">Correction</h3>
              <p>f(1⁻) = {problem.f1_at1}, f(1⁺) = {problem.f2_at1} → donc f est {problem.isContinuous ? 'continue' : 'non continue'}.</p>
              <p>f₁'(x) = {problem.f1_derivative}, donc f₁'(1) = {problem.f1_prime_at1}</p>
              <p>f₂'(x) = {problem.f2_derivative}, donc f₂'(1) = {problem.f2_prime_at1}</p>
              <p>Conclusion : f est {problem.isDerivable ? 'dérivable' : 'non dérivable'} en x = 1</p>

              <div className="buttons mt-4">
                <button className="button is-primary" onClick={handleNextExercise}>
                  Nouvel exercice
                </button>
              </div>
            </>
          )}

          {feedback && (
            <div className="notification is-light mt-4">
              {feedback}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
