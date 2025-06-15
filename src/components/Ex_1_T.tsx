import React, { useState } from "react";

type Coord = [number, number, number];

// Fonction pour générer une équation cartésienne d’un plan
function equationCartesienne(A: Coord, V: Coord): string {
  const [a, b, c] = V;
  const [x, y, z] = A;
  const d = -(a * x + b * y + c * z);

  const terms: string[] = [];
  if (a !== 0) terms.push(`${a}x`);
  if (b !== 0) terms.push(`${b > 0 && terms.length > 0 ? "+" : ""}${b}y`);
  if (c !== 0) terms.push(`${c > 0 && terms.length > 0 ? "+" : ""}${c}z`);
  if (d !== 0 || terms.length === 0) {
    terms.push(`${d > 0 && terms.length > 0 ? "+" : ""}${d}`);
  }
  return terms.join(" ") + " = 0";
}

// Génération aléatoire de coordonnées entre -5 et 5
function randomCoord(): Coord {
  return [
    Math.floor(Math.random() * 11) - 5,
    Math.floor(Math.random() * 11) - 5,
    Math.floor(Math.random() * 11) - 5,
  ];
}

export default function EquationCartesienne() {
  const [A, setA] = useState<Coord>(randomCoord());
  const [V, setV] = useState<Coord>(randomCoord());
  const [userInput, setUserInput] = useState("");
  const [feedback, setFeedback] = useState<null | { correct: boolean; message: React.ReactNode }>(null);

  const correctEq = equationCartesienne(A, V);

  function handleValidate() {
    const normalizedUser = userInput.replace(/\s+/g, "").toLowerCase();
    const normalizedCorrect = correctEq.replace(/\s+/g, "").toLowerCase();

    if (normalizedUser === normalizedCorrect) {
      setFeedback({ correct: true, message: <p>🎉 Bravo Maître, la réponse est correcte !</p> });
    } else {
      setFeedback({
        correct: false,
        message: (
          <div className="content">
            <p>❌ Oups, une erreur s'est glissée, Maître.</p>
            <p>Le vecteur normal n⃗ = ({V.join(", ")}) est normal au plan.</p>
            <p>La formule du plan est : ax + by + cz + d = 0</p>
            <p>
              Avec a = {V[0]}, b = {V[1]}, c = {V[2]} et le point A({A.join(", ")})
            </p>
            <p>
              d = - (a × x + b × y + c × z) = -(
              {V[0]}×{A[0]} + {V[1]}×{A[1]} + {V[2]}×{A[2]}) = {-(V[0] * A[0] + V[1] * A[1] + V[2] * A[2])}
            </p>
            <p>
              <strong>Équation correcte :</strong> {correctEq}
            </p>
          </div>
        ),
      });
    }
  }

  function handleNewExercise() {
    setA(randomCoord());
    setV(randomCoord());
    setUserInput("");
    setFeedback(null);
  }

  return (
    <div className="columns is-centered mt-6">
      <div className="column is-two-thirds">
        <div className="box content">
          <h2 className="title is-4">Détermine une équation cartésienne du plan passant par A et de vecteur normal n⃗</h2>

          <div className="mb-4">
            <p>
              <strong>Point A :</strong> ({A.join(", ")})
            </p>
            <p>
              <strong>Vecteur normal n⃗ :</strong> ({V.join(", ")})
            </p>
          </div>

          <div className="field">
            <label htmlFor="userInput" className="label">
              Écris ton équation cartésienne
            </label>
            <div className="control">
              <input
                id="userInput"
                className="input"
                type="text"
                placeholder="Ex: 2x - 3y + 4z + 1 = 0"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
              />
            </div>
          </div>

          <div className="field is-grouped is-grouped-centered">
            <div className="control">
              <button className="button is-primary" onClick={handleValidate}>
                Valider
              </button>
            </div>
            <div className="control">
              <button className="button is-light" onClick={handleNewExercise}>
                Nouvel exercice
              </button>
            </div>
          </div>

          {feedback && (
            <div className={`notification ${feedback.correct ? "is-success" : "is-danger"} is-light`}>
              <button className="delete" onClick={() => setFeedback(null)}></button>
              {feedback.message}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
